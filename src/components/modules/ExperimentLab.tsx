import React, { useState, useEffect } from 'react';
import type { NavigationTab } from '../../types/argus';

interface ExperimentLabProps {
  onNavigateTab: (tab: NavigationTab) => void;
}

export const ExperimentLab: React.FC<ExperimentLabProps> = () => {
  const [nullHypothesis, setNullHypothesis] = useState(
    'H0: Dynamic circuit-breaker routing will produce no statistically significant change in high-value UPI checkout success rate compared to default bank switch retry rules.'
  );
  const [altHypothesis, setAltHypothesis] = useState(
    'H1: Intercepting switch timeouts at 1,200ms and rerouting to direct acquiring rails will increase >=₹10,000 checkout success rate by >= 3.8pp without elevating bank chargeback rates.'
  );

  const [trafficSplit, setTrafficSplit] = useState<number>(50); // % Treatment
  const [isLiveOnFlag, setIsLiveOnFlag] = useState<boolean>(true);

  // 2-click rollback kill switch state: 'idle' | 'confirming' | 'rolled_back'
  const [rollbackState, setRollbackState] = useState<'idle' | 'confirming' | 'rolled_back'>('idle');

  // Guardrails editable table data
  const [guardrails, setGuardrails] = useState([
    { id: 'lat', metric: 'P99 Checkout Latency', threshold: '< 2,800ms', current: '2,140ms', isPassing: true },
    { id: 'chg', metric: 'Chargeback Dispute Rate', threshold: '< 0.08%', current: '0.03%', isPassing: true },
    { id: 'u30', metric: 'NPCI U30 Gateway Error Share', threshold: '< 1.5%', current: '0.9%', isPassing: true },
    { id: 'deb', metric: 'Double-Debit Customer Tickets', threshold: '< 10/hour', current: '3/hour', isPassing: true },
  ]);

  // Rollback confirmation timeout (reverts to idle if second click not received within 4s)
  useEffect(() => {
    if (rollbackState === 'confirming') {
      const timer = setTimeout(() => {
        setRollbackState('idle');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [rollbackState]);

  const handleRollbackClick = () => {
    if (rollbackState === 'idle') {
      setRollbackState('confirming');
    } else if (rollbackState === 'confirming') {
      setRollbackState('rolled_back');
      setTrafficSplit(0);
      setIsLiveOnFlag(false);
    }
  };

  const handleUpdateGuardrail = (id: string, field: 'threshold' | 'current', val: string) => {
    setGuardrails((prev) =>
      prev.map((g) => (g.id === id ? { ...g, [field]: val } : g))
    );
  };

  return (
    <div className="space-y-8 select-none">
      {/* Header */}
      <div className="border-b border-[#1A1A1A] pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="argus-section-label">Measure</span>
          <span className="text-[#1A1A1A]">/</span>
          <span className="argus-section-label text-[#0066FF]">Experiment Lab</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="argus-module-title">Experiment Lab · Statistical Inference</h1>
              <span
                className={`px-2 py-0.5 rounded font-mono text-[10px] font-medium border ${
                  rollbackState === 'rolled_back'
                    ? 'bg-[#FF3B30]/15 text-[#FF3B30] border-[#FF3B30]/30'
                    : isLiveOnFlag
                    ? 'bg-[#00FF88]/15 text-[#00FF88] border-[#00FF88]/30'
                    : 'bg-[#111111] text-[#9CA3AF] border-[#1A1A1A]'
                }`}
              >
                {rollbackState === 'rolled_back'
                  ? 'KILLED / 100% CONTROL'
                  : isLiveOnFlag
                  ? 'EVALUATING IN PRODUCTION'
                  : 'DRAFT'}
              </span>
            </div>
            <p className="argus-prose text-xs text-[#6B7280] mt-0.5">
              Two-sided A/B significance test with real-time traffic split visualization and guardrail enforcement.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Rollback Kill Switch per specification:
                A single button with a #FF3B30 border, idle state.
                When clicked, transitions to confirmation state (requires second click).
                Never shown as a big decorative CTA element. */}
            <button
              onClick={handleRollbackClick}
              disabled={rollbackState === 'rolled_back'}
              className={`px-3 py-1.5 rounded text-xs font-mono border transition-colors cursor-pointer ${
                rollbackState === 'confirming'
                  ? 'bg-[#FF3B30] text-[#FFFFFF] border-[#FF3B30] font-bold animate-pulse'
                  : rollbackState === 'rolled_back'
                  ? 'bg-transparent text-[#6B7280] border-[#1A1A1A] cursor-not-allowed'
                  : 'bg-transparent text-[#FF3B30] border-[#FF3B30] hover:bg-[#FF3B30]/10'
              }`}
            >
              {rollbackState === 'confirming'
                ? 'Confirm Kill Switch (Click Again)'
                : rollbackState === 'rolled_back'
                ? 'Killed (100% Control)'
                : 'Emergency Rollback Switch'}
            </button>
          </div>
        </div>
      </div>

      {/* 1. Hypothesis Section: Two text inputs (Null & Alternative) with minimum sample size */}
      <section className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-[6px] p-5 space-y-4">
        <h2 className="argus-module-title text-[15px]">Causal Hypotheses & Power Calculation</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Null Hypothesis */}
          <div className="space-y-1.5">
            <label className="argus-section-label block">Null Hypothesis (H0)</label>
            <textarea
              rows={3}
              value={nullHypothesis}
              onChange={(e) => setNullHypothesis(e.target.value)}
              className="w-full bg-[#050505] border border-[#1A1A1A] focus:border-[#0066FF] rounded-[4px] p-3 text-xs font-mono text-[#D1D5DB] outline-none leading-relaxed"
            />
          </div>

          {/* Alternative Hypothesis */}
          <div className="space-y-1.5">
            <label className="argus-section-label block">Alternative Hypothesis (H1)</label>
            <textarea
              rows={3}
              value={altHypothesis}
              onChange={(e) => setAltHypothesis(e.target.value)}
              className="w-full bg-[#050505] border border-[#1A1A1A] focus:border-[#0066FF] rounded-[4px] p-3 text-xs font-mono text-[#FFFFFF] outline-none leading-relaxed"
            />
          </div>
        </div>

        {/* Auto-calculated Minimum Sample Size in JetBrains Mono */}
        <div className="p-3 bg-[#050505] border border-[#1A1A1A] rounded-[4px] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="argus-section-label">Calculated Minimum Sample Size:</span>
            <span className="font-mono text-xs font-bold text-[#00FF88]">
              142,000 users at 80% power (MDE: 2.0pp, α = 0.05, β = 0.20)
            </span>
          </div>
          <span className="text-[11px] font-mono text-[#6B7280]">
            Estimated runtime: 4.8 days at 30k transactors/day
          </span>
        </div>
      </section>

      {/* 2. Traffic Allocation: Slider with Live Resizing Horizontal Bars */}
      <section className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-[6px] p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="argus-module-title text-[15px]">Traffic Allocation Split</h2>
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-[#9CA3AF]">Control: {100 - trafficSplit}%</span>
            <span className="text-[#1A1A1A]">|</span>
            <span className="text-[#0066FF] font-bold">Variant: {trafficSplit}%</span>
          </div>
        </div>

        {/* Live Visualization: Two Horizontal Bars that resize as slider moves */}
        <div className="w-full h-10 bg-[#050505] border border-[#1A1A1A] rounded-[4px] overflow-hidden flex transition-all">
          {/* Control Bar */}
          <div
            style={{ width: `${100 - trafficSplit}%` }}
            className="h-full bg-[#161616] border-r border-[#1A1A1A] flex items-center justify-start px-3 text-xs font-mono text-[#9CA3AF] transition-all duration-150 overflow-hidden whitespace-nowrap"
          >
            Control ({100 - trafficSplit}%)
          </div>

          {/* Variant Bar */}
          <div
            style={{ width: `${trafficSplit}%` }}
            className="h-full bg-[#0066FF] flex items-center justify-end px-3 text-xs font-mono font-bold text-[#FFFFFF] transition-all duration-150 overflow-hidden whitespace-nowrap"
          >
            Variant ({trafficSplit}%)
          </div>
        </div>

        {/* Range Slider */}
        <div>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            disabled={rollbackState === 'rolled_back'}
            value={trafficSplit}
            onChange={(e) => setTrafficSplit(Number(e.target.value))}
            className="w-full cursor-pointer disabled:cursor-not-allowed"
          />
          <div className="flex justify-between text-[10px] font-mono text-[#6B7280] mt-1">
            <span>0% (100% Control)</span>
            <span>50/50 Split</span>
            <span>100% (Full Rollout)</span>
          </div>
        </div>
      </section>

      {/* 3. Guardrails: Small Editable Table */}
      <section className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-[6px] p-5 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#1A1A1A]">
          <div>
            <h2 className="argus-module-title text-[15px]">Automated Health Guardrails</h2>
            <span className="argus-section-label text-[11px]">Directly editable inline thresholds</span>
          </div>
          <span className="argus-data-sm text-[11px] text-[#00FF88] flex items-center gap-1.5">
            <span className="argus-status-dot bg-[#00FF88]" />
            <span>All Guardrails Healthy</span>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-[#1A1A1A] text-[#6B7280]">
                <th className="py-2.5 px-3 font-normal">Metric</th>
                <th className="py-2.5 px-3 font-normal">Threshold</th>
                <th className="py-2.5 px-3 font-normal">Current Value</th>
                <th className="py-2.5 px-3 font-normal">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1A1A]">
              {guardrails.map((g) => (
                <tr key={g.id} className="hover:bg-[#111111]/50 transition-colors">
                  <td className="py-3 px-3 text-[#FFFFFF] font-medium">{g.metric}</td>
                  <td className="py-3 px-3">
                    <input
                      type="text"
                      value={g.threshold}
                      onChange={(e) => handleUpdateGuardrail(g.id, 'threshold', e.target.value)}
                      className="bg-[#050505] border border-[#1A1A1A] px-2 py-1 rounded text-xs text-[#9CA3AF] focus:text-[#FFFFFF] focus:border-[#0066FF] outline-none"
                    />
                  </td>
                  <td className="py-3 px-3">
                    <input
                      type="text"
                      value={g.current}
                      onChange={(e) => handleUpdateGuardrail(g.id, 'current', e.target.value)}
                      className="bg-[#050505] border border-[#1A1A1A] px-2 py-1 rounded text-xs text-[#00FF88] focus:text-[#FFFFFF] focus:border-[#0066FF] outline-none"
                    />
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#00FF88]" />
                      <span className="text-[11px] text-[#9CA3AF]">Passing</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
