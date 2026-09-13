import React, { useState } from 'react';
import {
  Sparkles,
  Inbox,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  X
} from 'lucide-react';
import type { NavigationTab } from '../../types/argus';

interface InsightsModuleProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onCreateOpportunityFromInsight: (insightId: string) => void;
}

export const InsightsModule: React.FC<InsightsModuleProps> = ({
  onNavigateTab,
  onCreateOpportunityFromInsight,
}) => {
  const curvePoints = [
    { amount: '₹500', failureRate: 2.1, bank: 'HDFC', device: 'Android 14', time: '14:20', status: 'Healthy' },
    { amount: '₹1,500', failureRate: 2.8, bank: 'ICICI', device: 'iOS 18', time: '16:05', status: 'Healthy' },
    { amount: '₹3,500', failureRate: 3.4, bank: 'SBI', device: 'Android 14', time: '18:15', status: 'Nominal' },
    { amount: '₹7,500', failureRate: 4.8, bank: 'Axis', device: 'Android 15', time: '19:40', status: 'Warning' },
    { amount: '₹12,500', failureRate: 11.6, bank: 'Bank X', device: 'Android 15', time: '20:15', status: 'Critical Surge' },
    { amount: '₹25,000', failureRate: 16.2, bank: 'Bank X', device: 'Android 15', time: '21:10', status: 'Critical Surge' },
    { amount: '₹50,000', failureRate: 22.4, bank: 'Bank X', device: 'Android 15', time: '21:45', status: 'Severe Failure' },
  ];

  const [hoveredDataPoint, setHoveredDataPoint] = useState<any | null>(curvePoints[4]);
  const [isTrustLayerOpen, setIsTrustLayerOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6 sm:gap-8 max-w-7xl mx-auto py-5 sm:py-8 px-4 sm:px-6 select-none pb-24 md:pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-5 border-b border-[#1D1D1D] gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono-tech uppercase tracking-[0.2em] text-[#0066FF] font-bold">
              PAYMENT FAILURE / SIGNAL 014
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono-tech px-2 py-0.2 rounded-[2px] bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30">
              HIGH PRIORITY
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono-tech text-[#8A8A8A]">
              91% CONFIDENCE
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#F5F5F0] tracking-tight font-display">
            Payment failures clustering around high-value checkouts.
          </h1>
          <p className="text-xs text-[#8A8A8A] font-mono-tech mt-1">
            Empirical synthesis across 4.2M ClickHouse telemetry events & NPCI gateway logs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2 sm:pt-0">
          <button
            onClick={() => onNavigateTab('signals')}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-[3px] bg-[#101010] hover:bg-[#141414] border border-[#1D1D1D] text-xs font-mono-tech text-[#8A8A8A] hover:text-[#F5F5F0] cursor-pointer transition-colors min-h-[42px]"
          >
            ← Signals
          </button>
          <button
            onClick={() => setIsTrustLayerOpen(true)}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-[3px] bg-[#101010] hover:bg-[#141414] border border-[#1D1D1D] text-xs font-mono-tech text-[#8A8A8A] hover:text-[#F5F5F0] cursor-pointer transition-colors min-h-[42px]"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#0066FF]" />
            <span>Model Card</span>
          </button>

          <button
            onClick={() => onCreateOpportunityFromInsight('ins-001')}
            className="btn-magnetic w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-[3px] bg-[#0066FF] hover:bg-[#1A75FF] text-white text-xs font-semibold cursor-pointer shadow-lg shadow-[#0066FF]/20 min-h-[44px]"
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>Create Opportunity →</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        <div className="p-3.5 sm:p-4 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[3px]">
          <span className="text-[10px] font-mono-tech text-[#8A8A8A] uppercase block mb-1">FAILURE SURGE</span>
          <p className="text-xl sm:text-2xl font-bold font-mono-tech text-[#EF4444]">+7.4%</p>
          <p className="text-[9px] sm:text-[10px] font-mono-tech text-[#525252] mt-0.5">94.2% → 90.1%</p>
        </div>
        <div className="p-3.5 sm:p-4 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[3px]">
          <span className="text-[10px] font-mono-tech text-[#8A8A8A] uppercase block mb-1">USERS AFFECTED</span>
          <p className="text-xl sm:text-2xl font-bold font-mono-tech text-[#F5F5F0]">18,421</p>
          <p className="text-[9px] sm:text-[10px] font-mono-tech text-[#525252] mt-0.5">active transactors</p>
        </div>
        <div className="p-3.5 sm:p-4 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[3px]">
          <span className="text-[10px] font-mono-tech text-[#8A8A8A] uppercase block mb-1">ESTIMATED VALUE</span>
          <p className="text-xl sm:text-2xl font-bold font-mono-tech text-[#0066FF]">₹18.4L</p>
          <p className="text-[9px] sm:text-[10px] font-mono-tech text-[#525252] mt-0.5">volume at risk</p>
        </div>
        <div className="p-3.5 sm:p-4 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[3px]">
          <span className="text-[10px] font-mono-tech text-[#8A8A8A] uppercase block mb-1">CONFIDENCE</span>
          <p className="text-xl sm:text-2xl font-bold font-mono-tech text-[#10B981]">91%</p>
          <p className="text-[9px] sm:text-[10px] font-mono-tech text-[#525252] mt-0.5">Bayesian validation</p>
        </div>
      </div>

      {/* Interactive Failure Curve (Touch & Hover Friendly) */}
      <div className="p-4 sm:p-6 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px] flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#1D1D1D] text-xs font-mono-tech text-[#8A8A8A] gap-1">
          <span>CORRELATION: TRANSACTION AMOUNT VS FAILURE PROBABILITY</span>
          <span className="text-[11px] text-[#0066FF]">TAP OR HOVER BARS TO INSPECT TELEMETRY</span>
        </div>

        <div className="relative h-56 w-full flex items-end justify-between pt-8 pb-4 px-2 sm:px-4 bg-[#050505] border border-[#161616] rounded-[3px]">
          <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none opacity-20">
            <div className="border-b border-[#2E2E2E] w-full text-[9px] font-mono-tech text-[#8A8A8A]">25% Failure</div>
            <div className="border-b border-[#2E2E2E] w-full text-[9px] font-mono-tech text-[#8A8A8A]">15% Failure</div>
            <div className="border-b border-[#2E2E2E] w-full text-[9px] font-mono-tech text-[#8A8A8A]">5% Failure</div>
          </div>

          {curvePoints.map((pt, i) => {
            const heightPercent = (pt.failureRate / 25) * 100;
            const isCritical = pt.failureRate > 10;
            const isSelected = hoveredDataPoint?.amount === pt.amount;

            return (
              <div
                key={i}
                onClick={() => setHoveredDataPoint(pt)}
                onMouseEnter={() => setHoveredDataPoint(pt)}
                className="relative z-10 flex flex-col items-center group cursor-pointer h-full justify-end px-1 flex-1 max-w-[48px]"
              >
                <div
                  className={`w-full max-w-[28px] sm:max-w-[34px] rounded-[2px] transition-all duration-200 ${
                    isSelected
                      ? 'ring-2 ring-[#0066FF] shadow-lg shadow-[#0066FF]/40'
                      : ''
                  } ${
                    isCritical
                      ? 'bg-[#EF4444]/80 group-hover:bg-[#EF4444]'
                      : 'bg-[#1D1D1D] group-hover:bg-[#0066FF]'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />
                <span className={`text-[9px] sm:text-[10px] font-mono-tech mt-2 text-center truncate w-full ${
                  isSelected ? 'text-[#0066FF] font-bold' : 'text-[#8A8A8A] group-hover:text-[#F5F5F0]'
                }`}>
                  {pt.amount}
                </span>
                <span className="text-[8px] sm:text-[9px] font-mono-tech text-[#525252]">
                  {pt.failureRate}%
                </span>
              </div>
            );
          })}
        </div>

        {/* Telemetry Inspection readout */}
        <div className="p-3.5 bg-[#101010] border border-[#1D1D1D] rounded-[3px] text-xs font-mono-tech">
          {hoveredDataPoint ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-[#F5F5F0]">
              <div>
                <span className="text-[10px] text-[#8A8A8A] block">TIER:</span>
                <strong className="text-[#0066FF]">{hoveredDataPoint.amount}</strong>
              </div>
              <div>
                <span className="text-[10px] text-[#8A8A8A] block">FAIL RATE:</span>
                <strong className="text-[#EF4444]">{hoveredDataPoint.failureRate}%</strong>
              </div>
              <div>
                <span className="text-[10px] text-[#8A8A8A] block">BANK SWITCH:</span>
                <strong>{hoveredDataPoint.bank}</strong>
              </div>
              <div>
                <span className="text-[10px] text-[#8A8A8A] block">DEVICE OS:</span>
                <strong>{hoveredDataPoint.device}</strong>
              </div>
              <div>
                <span className="text-[10px] text-[#8A8A8A] block">WINDOW:</span>
                <strong>{hoveredDataPoint.time}</strong>
              </div>
              <div>
                <span className="text-[10px] text-[#8A8A8A] block">STATUS:</span>
                <strong className="text-[#EF4444]">{hoveredDataPoint.status}</strong>
              </div>
            </div>
          ) : (
            <span className="text-[#525252]">
              Tap any amount tier above to inspect correlated bank switch, device OS, and failure telemetry.
            </span>
          )}
        </div>
      </div>

      {/* 4 Structured Evidence Pillars */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#0066FF]">
            WHY ARGUS THINKS THIS MATTERS
          </span>
          <span className="text-xs text-[#525252]">· Telemetry Decomposition</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-4 sm:p-5 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[3px] flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono-tech text-[#0066FF] font-bold block mb-1">01 · TICKET SIZE</span>
              <h3 className="text-sm font-bold text-[#F5F5F0] mb-2">HIGH-VALUE TRANSACTIONS</h3>
              <p className="text-xs text-[#8A8A8A] font-mono-tech leading-relaxed">
                Failure probability is <strong>2.4× higher</strong> for amounts exceeding ₹10,000.
              </p>
            </div>
            <span className="text-[10px] font-mono-tech text-[#525252] mt-4 pt-2 border-t border-[#141414]">
              SHARE: 15% OF LOST VOLUME
            </span>
          </div>

          <div className="p-4 sm:p-5 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[3px] flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono-tech text-[#0066FF] font-bold block mb-1">02 · ROUTING NODE</span>
              <h3 className="text-sm font-bold text-[#F5F5F0] mb-2">BANK CONCENTRATION</h3>
              <p className="text-xs text-[#8A8A8A] font-mono-tech leading-relaxed">
                <strong>48% of failures</strong> originate specifically from Bank X core switch timeout U30.
              </p>
            </div>
            <span className="text-[10px] font-mono-tech text-[#525252] mt-4 pt-2 border-t border-[#141414]">
              SHARE: 52% OF LOST VOLUME
            </span>
          </div>

          <div className="p-4 sm:p-5 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[3px] flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono-tech text-[#0066FF] font-bold block mb-1">03 · TEMPORAL CLUSTER</span>
              <h3 className="text-sm font-bold text-[#F5F5F0] mb-2">TIME CONCENTRATION</h3>
              <p className="text-xs text-[#8A8A8A] font-mono-tech leading-relaxed">
                <strong>62% of failures</strong> occur in evening peak between 8:00 PM and 10:30 PM.
              </p>
            </div>
            <span className="text-[10px] font-mono-tech text-[#525252] mt-4 pt-2 border-t border-[#141414]">
              SHARE: 9% OF LOST VOLUME
            </span>
          </div>

          <div className="p-4 sm:p-5 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[3px] flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono-tech text-[#0066FF] font-bold block mb-1">04 · OS REGRESSION</span>
              <h3 className="text-sm font-bold text-[#F5F5F0] mb-2">DEVICE CLUSTER</h3>
              <p className="text-xs text-[#8A8A8A] font-mono-tech leading-relaxed">
                Android 15 users are <strong>1.7× more affected</strong> due to background intent kills.
              </p>
            </div>
            <span className="text-[10px] font-mono-tech text-[#525252] mt-4 pt-2 border-t border-[#141414]">
              SHARE: 24% OF LOST VOLUME
            </span>
          </div>
        </div>
      </div>

      {/* AI Strategic Recommendation Banner */}
      <div className="p-5 sm:p-6 bg-[#0E1017] border border-[#0066FF]/35 rounded-[4px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-[#0066FF] flex-shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] font-mono-tech uppercase font-bold text-[#0066FF] block mb-0.5">
              AI STRATEGIC RECOMMENDATION
            </span>
            <p className="text-xs sm:text-sm font-bold text-[#F5F5F0] leading-snug">
              Prioritize multi-bank retry & dynamic routing over frontend checkout changes.
            </p>
            <p className="text-xs text-[#8A8A8A] font-mono-tech mt-1">
              Checkout UI conversion remains steady at 88.4%. The failure drop is 91% attributable to backend bank switches.
            </p>
          </div>
        </div>

        <button
          onClick={() => onCreateOpportunityFromInsight('ins-001')}
          className="btn-magnetic w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-[3px] bg-[#0066FF] hover:bg-[#1A75FF] text-white text-xs font-semibold cursor-pointer flex-shrink-0 min-h-[44px]"
        >
          <span>Create Opportunity</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* AI Trust Layer Modal */}
      {isTrustLayerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm select-none">
          <div className="w-full max-w-2xl bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px] shadow-2xl p-5 sm:p-6 flex flex-col gap-4 max-h-[90vh] overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between pb-3 border-b border-[#1D1D1D]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                <h3 className="text-sm font-bold text-[#F5F5F0] font-display">
                  ARGUS AI TRUST LAYER · MODEL CARD
                </h3>
              </div>
              <button
                onClick={() => setIsTrustLayerOpen(false)}
                className="p-1.5 text-[#8A8A8A] hover:text-[#F5F5F0] rounded cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono-tech text-[#8A8A8A] leading-relaxed">
              <p>
                <strong>Confidence Rating (91%):</strong> Computed using Bayesian causal estimation across 4.2M ClickHouse event traces and NPCI switch telemetry.
              </p>
              <div className="p-3 rounded bg-[#101010] border border-[#1D1D1D] space-y-1.5">
                <span className="text-[#F5F5F0] font-bold block">Confounder Safeguards:</span>
                <p>• Ruled out frontend JavaScript crashes (Sentry error rate &lt; 0.02%).</p>
                <p>• Isolated Bank X switch response latency (P99 increased from 420ms to 4,890ms).</p>
                <p>• Verified device correlation across 18,421 affected transactors.</p>
              </div>
              <p className="text-[11px] text-[#525252]">
                Audit ID: TW-INS-014-VERIFIED · Model: CausalFin-v3 · Zero KYC data stored.
              </p>
            </div>

            <button
              onClick={() => setIsTrustLayerOpen(false)}
              className="mt-2 w-full py-2.5 rounded-[3px] bg-[#141414] hover:bg-[#1A1A1A] border border-[#2E2E2E] text-xs font-mono-tech text-[#F5F5F0] cursor-pointer min-h-[44px]"
            >
              Close Model Card
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
