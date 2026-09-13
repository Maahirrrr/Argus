import React, { useState, useEffect } from 'react';
import {
  X,
  Zap,
  ShieldCheck,
  RotateCcw,
  ArrowRight,
  TrendingDown,
  CheckCircle2,
  Server
} from 'lucide-react';
import type { NavigationTab } from '../../types/argus';

interface ChaosSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: NavigationTab) => void;
  onShowToast: (msg: string) => void;
}

interface Scenario {
  id: string;
  name: string;
  bank: string;
  baselineRate: number;
  outageRate: number;
  recoveredRate: number;
  gmvAtRiskPerSec: number;
  description: string;
  ruleAction: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'hdfc_latency',
    name: 'HDFC Core Gateway Latency Spike (+1,400ms)',
    bank: 'HDFC Bank',
    baselineRate: 94.8,
    outageRate: 77.2,
    recoveredRate: 95.4,
    gmvAtRiskPerSec: 14200,
    description: 'P99 latency exceeding 6,200ms on high-value (₹10k+) UPI mandates. Gateway timeouts causing user drop-off.',
    ruleAction: 'Dynamically reroute 85% of ₹10k+ volume to ICICI direct acquiring switch with 1,200ms timeout cap.',
  },
  {
    id: 'android_biometric',
    name: 'Android 15 Biometric Callback Timeout (v4.19)',
    bank: 'Multi-Bank UPI',
    baselineRate: 93.6,
    outageRate: 81.4,
    recoveredRate: 94.9,
    gmvAtRiskPerSec: 9800,
    description: 'Biometric prompt hang on newly upgraded Android 15 devices during payment authorization.',
    ruleAction: 'Gracefully fall back to device PIN authentication if biometric callback fails to respond within 3,500ms.',
  },
  {
    id: 'npci_switch',
    name: 'NPCI Central Switch Intermittent Choke (U30 Timeout)',
    bank: 'NPCI Rail',
    baselineRate: 95.1,
    outageRate: 69.8,
    recoveredRate: 93.2,
    gmvAtRiskPerSec: 22500,
    description: 'State bank network choke causing cascading retries and gateway thread pool exhaustion.',
    ruleAction: 'Enforce circuit breaker on failed routing attempts and redirect transactions to Visa/Mastercard debit backup rails.',
  },
];

export const ChaosSimulatorModal: React.FC<ChaosSimulatorModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
  onShowToast,
}) => {
  const [activeScenario, setActiveScenario] = useState<Scenario>(SCENARIOS[0]);
  const [simulationState, setSimulationState] = useState<'idle' | 'outage' | 'recovered'>('idle');
  const [salvagedGmv, setSalvagedGmv] = useState<number>(0);
  const [elapsedSec, setElapsedSec] = useState<number>(0);

  // Live timer for ticking GMV loss/salvage
  useEffect(() => {
    let timer: any;
    if (simulationState === 'outage') {
      timer = setInterval(() => {
        setElapsedSec((prev) => prev + 1);
      }, 1000);
    } else if (simulationState === 'recovered') {
      // Accumulate salvaged GMV
      timer = setInterval(() => {
        setSalvagedGmv((prev) => prev + activeScenario.gmvAtRiskPerSec);
      }, 800);
    }

    return () => clearInterval(timer);
  }, [simulationState, activeScenario]);

  if (!isOpen) return null;

  const handleInjectChaos = () => {
    setSimulationState('outage');
    setElapsedSec(0);
    setSalvagedGmv(0);
    onShowToast(`Chaos injected: ${activeScenario.name}`);
  };

  const handleApplyFailover = () => {
    setSimulationState('recovered');
    setSalvagedGmv(activeScenario.gmvAtRiskPerSec * 8);
    onShowToast('Argus Smart Failover deployed. Checkout success restored!');
  };

  const handleReset = () => {
    setSimulationState('idle');
    setElapsedSec(0);
    setSalvagedGmv(0);
  };

  const handleExportPrd = () => {
    onNavigateTab('prds');
    onClose();
    onShowToast('Incident post-mortem exported to PRD Workspace');
  };

  const currentSuccessRate =
    simulationState === 'idle'
      ? activeScenario.baselineRate
      : simulationState === 'outage'
      ? activeScenario.outageRate
      : activeScenario.recoveredRate;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fade-in select-none">
      <div
        className="w-full max-w-2xl bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-[#1D1D1D] flex items-center justify-between bg-[#080808]">
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-[2px] bg-[#EF4444] flex items-center justify-center text-white text-[10px] font-bold">
              <Zap className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-bold text-xs tracking-wider text-[#F5F5F0] font-display">
                ARGUS CHAOS & FAILOVER SIMULATOR
              </span>
              <span className="text-[10px] font-mono-tech text-[#8A8A8A] ml-2">
                Live Disaster Recovery Sentry
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-[2px] text-[#8A8A8A] hover:text-[#F5F5F0] border border-transparent hover:border-[#1D1D1D] hover:bg-[#141414] cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scenario Selection Tabs */}
        <div className="px-4 sm:px-6 py-2.5 border-b border-[#1D1D1D] bg-[#070707] flex items-center gap-2 overflow-x-auto no-scrollbar">
          {SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => {
                setActiveScenario(sc);
                handleReset();
              }}
              className={`px-3 py-1.5 rounded-[2px] text-xs font-mono-tech whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1.5 ${
                activeScenario.id === sc.id
                  ? 'bg-[#141414] text-[#F5F5F0] border border-[#0066FF] font-bold shadow-sm shadow-[#0066FF]/20'
                  : 'bg-[#0D0D0D] text-[#8A8A8A] hover:text-[#F5F5F0] border border-[#1D1D1D]'
              }`}
            >
              <Server className="w-3 h-3 text-[#0066FF]" />
              <span>{sc.bank}</span>
            </button>
          ))}
        </div>

        {/* Simulator Cockpit */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-5 bg-[#0A0A0A]">
          {/* Active Scenario Banner */}
          <div className="p-4 rounded-[3px] bg-[#101010] border border-[#1D1D1D]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono-tech text-[#EF4444] uppercase tracking-wider font-bold block mb-1">
                  DISASTER SCENARIO
                </span>
                <h3 className="text-sm sm:text-base font-bold text-[#F5F5F0] font-display">
                  {activeScenario.name}
                </h3>
                <p className="text-xs text-[#8A8A8A] font-mono-tech mt-1">
                  {activeScenario.description}
                </p>
              </div>

              {/* Status Badge */}
              <div className="flex-shrink-0">
                {simulationState === 'idle' && (
                  <span className="px-2.5 py-1 rounded-[2px] bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/25 text-[10px] font-mono-tech font-bold">
                    SYSTEM NORMAL
                  </span>
                )}
                {simulationState === 'outage' && (
                  <span className="px-2.5 py-1 rounded-[2px] bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/40 text-[10px] font-mono-tech font-bold animate-pulse">
                    OUTAGE ACTIVE
                  </span>
                )}
                {simulationState === 'recovered' && (
                  <span className="px-2.5 py-1 rounded-[2px] bg-[#0066FF]/20 text-[#0066FF] border border-[#0066FF]/40 text-[10px] font-mono-tech font-bold">
                    FAILOVER ACTIVE
                  </span>
                )}
              </div>
            </div>

            {/* Metrics Live Display */}
            <div className="grid grid-cols-3 gap-3 mt-4 pt-3 border-t border-[#1D1D1D]">
              <div className="p-2.5 rounded-[2px] bg-[#0A0A0A] border border-[#1D1D1D]">
                <span className="text-[9px] font-mono-tech text-[#525252] uppercase tracking-wider block">
                  SUCCESS RATE
                </span>
                <span
                  className={`text-lg font-bold font-mono-tech ${
                    simulationState === 'outage'
                      ? 'text-[#EF4444]'
                      : simulationState === 'recovered'
                      ? 'text-[#10B981]'
                      : 'text-[#F5F5F0]'
                  }`}
                >
                  {currentSuccessRate.toFixed(1)}%
                </span>
              </div>

              <div className="p-2.5 rounded-[2px] bg-[#0A0A0A] border border-[#1D1D1D]">
                <span className="text-[9px] font-mono-tech text-[#525252] uppercase tracking-wider block">
                  DETECTION LATENCY
                </span>
                <span className="text-lg font-bold font-mono-tech text-[#0066FF]">
                  {simulationState === 'idle' ? '0ms' : '420ms'}
                </span>
              </div>

              <div className="p-2.5 rounded-[2px] bg-[#0A0A0A] border border-[#1D1D1D]">
                <span className="text-[9px] font-mono-tech text-[#525252] uppercase tracking-wider block">
                  {simulationState === 'recovered' ? 'SALVAGED GMV' : 'GMV AT RISK'}
                </span>
                <span
                  className={`text-lg font-bold font-mono-tech ${
                    simulationState === 'recovered' ? 'text-[#10B981]' : 'text-[#EF4444]'
                  }`}
                >
                  {simulationState === 'idle'
                    ? '₹0'
                    : simulationState === 'outage'
                    ? `₹${(elapsedSec * activeScenario.gmvAtRiskPerSec).toLocaleString('en-IN')}`
                    : `₹${salvagedGmv.toLocaleString('en-IN')}`}
                </span>
              </div>
            </div>
          </div>

          {/* Argus Intelligent Counter-Measure */}
          {simulationState !== 'idle' && (
            <div
              className={`p-4 rounded-[3px] border ${
                simulationState === 'outage'
                  ? 'bg-[#120808] border-[#EF4444]/30'
                  : 'bg-[#06140E] border-[#10B981]/30'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {simulationState === 'outage' ? (
                  <TrendingDown className="w-4 h-4 text-[#EF4444]" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                )}
                <span
                  className={`text-[10px] font-mono-tech uppercase font-bold tracking-wider ${
                    simulationState === 'outage' ? 'text-[#EF4444]' : 'text-[#10B981]'
                  }`}
                >
                  {simulationState === 'outage'
                    ? 'ARGUS SENTRY RECOMMENDATION'
                    : 'ROUTING FAILOVER COMMITTED'}
                </span>
              </div>
              <p className="text-xs text-[#E5E5E0] leading-relaxed font-mono-tech">
                {activeScenario.ruleAction}
              </p>
            </div>
          )}

          {/* Action Triggers */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {simulationState === 'idle' && (
              <button
                onClick={handleInjectChaos}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-[3px] bg-[#EF4444] hover:bg-[#DC2626] text-white text-xs font-semibold cursor-pointer shadow-lg shadow-[#EF4444]/25 transition-colors min-h-[44px]"
              >
                <Zap className="w-4 h-4" />
                <span>Inject Outage Event</span>
              </button>
            )}

            {simulationState === 'outage' && (
              <button
                onClick={handleApplyFailover}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-[3px] bg-[#0066FF] hover:bg-[#1A75FF] text-white text-xs font-semibold cursor-pointer shadow-lg shadow-[#0066FF]/25 transition-colors min-h-[44px] animate-pulse"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Apply Smart Failover Rule</span>
              </button>
            )}

            {simulationState === 'recovered' && (
              <div className="flex-1 flex items-center gap-2">
                <button
                  onClick={handleExportPrd}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-[3px] bg-[#10B981] hover:bg-[#059669] text-white text-xs font-semibold cursor-pointer shadow-lg shadow-[#10B981]/25 transition-colors min-h-[44px]"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>Export Incident Post-Mortem PRD</span>
                </button>
                <button
                  onClick={handleReset}
                  className="p-3 rounded-[3px] bg-[#141414] hover:bg-[#1D1D1D] text-[#8A8A8A] hover:text-[#F5F5F0] border border-[#1D1D1D] cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
                  title="Reset Simulator"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 border-t border-[#1D1D1D] bg-[#080808] flex items-center justify-between text-[10px] font-mono-tech text-[#525252]">
          <span>TELEMETRY INGESTION: 4.2M EVENTS/DAY</span>
          <span>SUB-SECOND SENTINEL ACTIVE</span>
        </div>
      </div>
    </div>
  );
};
