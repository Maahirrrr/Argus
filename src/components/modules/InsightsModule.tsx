import React, { useState } from 'react';
import {
  Sparkles,
  Inbox,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  X
} from 'lucide-react';
import type { NavigationTab } from '../../types/tapwise';

interface InsightsModuleProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onCreateOpportunityFromInsight: (insightId: string) => void;
}

export const InsightsModule: React.FC<InsightsModuleProps> = ({
  onNavigateTab,
  onCreateOpportunityFromInsight,
}) => {
  const [hoveredDataPoint, setHoveredDataPoint] = useState<any | null>(null);
  const [isTrustLayerOpen, setIsTrustLayerOpen] = useState(false);

  const curvePoints = [
    { amount: '₹500', failureRate: 2.1, bank: 'HDFC', device: 'Android 14', time: '14:20', status: 'Healthy' },
    { amount: '₹1,500', failureRate: 2.8, bank: 'ICICI', device: 'iOS 18', time: '16:05', status: 'Healthy' },
    { amount: '₹3,500', failureRate: 3.4, bank: 'SBI', device: 'Android 14', time: '18:15', status: 'Nominal' },
    { amount: '₹7,500', failureRate: 4.8, bank: 'Axis', device: 'Android 15', time: '19:40', status: 'Warning' },
    { amount: '₹12,500', failureRate: 11.6, bank: 'Bank X', device: 'Android 15', time: '20:15', status: 'Critical Surge' },
    { amount: '₹25,000', failureRate: 16.2, bank: 'Bank X', device: 'Android 15', time: '21:10', status: 'Critical Surge' },
    { amount: '₹50,000', failureRate: 22.4, bank: 'Bank X', device: 'Android 15', time: '21:45', status: 'Severe Failure' },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto py-8 px-4 sm:px-6 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-[#1D1D1D] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono-tech uppercase tracking-[0.2em] text-[#0066FF] font-bold">
              PAYMENT FAILURE / SIGNAL 014
            </span>
            <span className="text-[10px] font-mono-tech px-2 py-0.2 rounded-[2px] bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30">
              HIGH PRIORITY
            </span>
            <span className="text-[10px] font-mono-tech text-[#8A8A8A]">
              91% CONFIDENCE · 8 MIN AGO
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F5F0] tracking-tight font-display">
            Payment failures are clustering around high-value transactions.
          </h1>
          <p className="text-xs text-[#8A8A8A] font-mono-tech mt-1">
            Empirical synthesis across 4.2M ClickHouse telemetry events & NPCI gateway logs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateTab('signals')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-[3px] bg-[#101010] hover:bg-[#141414] border border-[#1D1D1D] text-xs font-mono-tech text-[#8A8A8A] hover:text-[#F5F5F0] cursor-pointer transition-colors"
          >
            ← Signals Queue
          </button>
          <button
            onClick={() => setIsTrustLayerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-[3px] bg-[#101010] hover:bg-[#141414] border border-[#1D1D1D] text-xs font-mono-tech text-[#8A8A8A] hover:text-[#F5F5F0] cursor-pointer transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#0066FF]" />
            <span>Why am I seeing this?</span>
          </button>

          <button
            onClick={() => onCreateOpportunityFromInsight('ins-001')}
            className="btn-magnetic flex items-center gap-2 px-5 py-2 rounded-[3px] bg-[#0066FF] hover:bg-[#1A75FF] text-white text-xs font-semibold cursor-pointer shadow-lg shadow-[#0066FF]/20"
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>Create Opportunity →</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[3px]">
          <span className="text-[10px] font-mono-tech text-[#8A8A8A] uppercase block mb-1">FAILURE SURGE</span>
          <p className="text-2xl font-bold font-mono-tech text-[#EF4444]">+7.4%</p>
          <p className="text-[10px] font-mono-tech text-[#525252] mt-0.5">94.2% → 90.1%</p>
        </div>
        <div className="p-4 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[3px]">
          <span className="text-[10px] font-mono-tech text-[#8A8A8A] uppercase block mb-1">USERS AFFECTED</span>
          <p className="text-2xl font-bold font-mono-tech text-[#F5F5F0]">18,421</p>
          <p className="text-[10px] font-mono-tech text-[#525252] mt-0.5">active transactors</p>
        </div>
        <div className="p-4 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[3px]">
          <span className="text-[10px] font-mono-tech text-[#8A8A8A] uppercase block mb-1">ESTIMATED VALUE</span>
          <p className="text-2xl font-bold font-mono-tech text-[#0066FF]">₹18.4L</p>
          <p className="text-[10px] font-mono-tech text-[#525252] mt-0.5">weekly volume at risk</p>
        </div>
        <div className="p-4 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[3px]">
          <span className="text-[10px] font-mono-tech text-[#8A8A8A] uppercase block mb-1">CONFIDENCE</span>
          <p className="text-2xl font-bold font-mono-tech text-[#10B981]">91%</p>
          <p className="text-[10px] font-mono-tech text-[#525252] mt-0.5">Bayesian validation</p>
        </div>
      </div>

      {/* Interactive Failure Curve */}
      <div className="p-6 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px] flex flex-col gap-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#1D1D1D] text-xs font-mono-tech text-[#8A8A8A]">
          <span>CORRELATION: TRANSACTION AMOUNT VS FAILURE PROBABILITY</span>
          <span>HOVER BARS TO INSPECT TELEMETRY BUCKET</span>
        </div>

        <div className="relative h-56 w-full flex items-end justify-between pt-8 pb-4 px-4 bg-[#050505] border border-[#161616] rounded-[3px]">
          <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none opacity-20">
            <div className="border-b border-[#2E2E2E] w-full text-[9px] font-mono-tech text-[#8A8A8A]">25% Failure</div>
            <div className="border-b border-[#2E2E2E] w-full text-[9px] font-mono-tech text-[#8A8A8A]">15% Failure</div>
            <div className="border-b border-[#2E2E2E] w-full text-[9px] font-mono-tech text-[#8A8A8A]">5% Failure</div>
          </div>

          {curvePoints.map((pt, i) => {
            const heightPercent = (pt.failureRate / 25) * 100;
            const isCritical = pt.failureRate > 10;

            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredDataPoint(pt)}
                onMouseLeave={() => setHoveredDataPoint(null)}
                className="relative z-10 flex flex-col items-center group cursor-pointer h-full justify-end"
              >
                <div
                  className={`w-8 rounded-[2px] transition-all duration-200 ${
                    isCritical
                      ? 'bg-[#EF4444]/80 group-hover:bg-[#EF4444]'
                      : 'bg-[#1D1D1D] group-hover:bg-[#0066FF]'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />
                <span className="text-[10px] font-mono-tech text-[#8A8A8A] mt-2 group-hover:text-[#F5F5F0]">
                  {pt.amount}
                </span>
                <span className="text-[9px] font-mono-tech text-[#525252]">
                  {pt.failureRate}%
                </span>
              </div>
            );
          })}
        </div>

        {/* Telemetry Inspection readout */}
        <div className="p-3 bg-[#101010] border border-[#1D1D1D] rounded-[3px] flex items-center justify-between text-xs font-mono-tech">
          {hoveredDataPoint ? (
            <div className="flex flex-wrap items-center gap-4 text-[#F5F5F0]">
              <span>TIER: <strong className="text-[#0066FF]">{hoveredDataPoint.amount}</strong></span>
              <span>FAILURE RATE: <strong className="text-[#EF4444]">{hoveredDataPoint.failureRate}%</strong></span>
              <span>BANK: <strong>{hoveredDataPoint.bank}</strong></span>
              <span>OS: <strong>{hoveredDataPoint.device}</strong></span>
              <span>WINDOW: <strong>{hoveredDataPoint.time}</strong></span>
              <span>STATUS: <strong className="text-[#EF4444]">{hoveredDataPoint.status}</strong></span>
            </div>
          ) : (
            <span className="text-[#525252]">
              Hover over any amount tier above to inspect correlated bank switch, device OS, and failure telemetry.
            </span>
          )}
        </div>
      </div>

      {/* 4 Structured Evidence Pillars */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#0066FF]">
            WHY TAPWISE THINKS THIS MATTERS
          </span>
          <span className="text-xs text-[#525252]">· Structured Telemetry Decomposition</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-5 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[3px] flex flex-col justify-between">
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

          <div className="p-5 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[3px] flex flex-col justify-between">
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

          <div className="p-5 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[3px] flex flex-col justify-between">
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

          <div className="p-5 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[3px] flex flex-col justify-between">
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
      <div className="p-6 bg-[#0E1017] border border-[#0066FF]/35 rounded-[4px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-[#0066FF] flex-shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] font-mono-tech uppercase font-bold text-[#0066FF] block mb-0.5">
              AI STRATEGIC RECOMMENDATION
            </span>
            <p className="text-xs sm:text-sm font-mono-tech text-[#F5F5F0]">
              Investigate payment routing before changing the checkout UI. The vast majority of lost volume stems from bank-specific timeout queues, not customer friction.
            </p>
          </div>
        </div>

        <button
          onClick={() => onCreateOpportunityFromInsight('ins-001')}
          className="btn-magnetic flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-[3px] bg-[#0066FF] hover:bg-[#1A75FF] text-white text-xs font-semibold cursor-pointer"
        >
          <span>Push to Opportunity Inbox</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* "Why am I seeing this?" AI Trust Layer Modal */}
      {isTrustLayerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm select-none">
          <div className="w-full max-w-xl bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px] p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#1D1D1D]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0066FF]" />
                <h2 className="text-sm font-bold text-[#F5F5F0] font-mono-tech uppercase tracking-wider">
                  AI TRUST LAYER: MODEL AUDIT TRAIL
                </h2>
              </div>
              <button onClick={() => setIsTrustLayerOpen(false)} className="text-[#8A8A8A] hover:text-[#F5F5F0]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono-tech">
              <div className="p-3 bg-[#050505] border border-[#161616] rounded-[3px]">
                <span className="text-[10px] text-[#525252] uppercase block">EVALUATED TELEMETRY WINDOW</span>
                <p className="text-[#F5F5F0] mt-0.5">Last 7 Calendar Days · 4,281,940 events across ClickHouse, NPCI Gateway & Zendesk</p>
              </div>

              <div className="p-3 bg-[#050505] border border-[#161616] rounded-[3px]">
                <span className="text-[10px] text-[#525252] uppercase block">MODEL REASONING METHODOLOGY</span>
                <p className="text-[#F5F5F0] mt-0.5">Multivariate Poisson variance decomposition isolates Bank X response latency &gt;30s from frontend crash rates.</p>
              </div>

              <div className="p-3 bg-[#050505] border border-[#161616] rounded-[3px]">
                <span className="text-[10px] text-[#EF4444] uppercase block font-bold">ALTERNATIVE HYPOTHESES REJECTED</span>
                <p className="text-[#8A8A8A] mt-0.5">Checkout UI crash ruled out with 98% confidence (app crash rate stayed flat at 0.02%).</p>
              </div>

              <div className="p-3 bg-[#050505] border border-[#161616] rounded-[3px]">
                <span className="text-[10px] text-[#10B981] uppercase block font-bold">BAYESIAN CONFIDENCE SCORE</span>
                <p className="text-[#F5F5F0] mt-0.5">91% Posterior Probability that routing patch will recover ≥ ₹14.5L/wk GMV.</p>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setIsTrustLayerOpen(false)}
                className="px-4 py-1.5 rounded-[3px] bg-[#141414] hover:bg-[#1A1A1A] border border-[#2E2E2E] text-xs font-mono-tech text-[#F5F5F0] cursor-pointer"
              >
                Close Audit Trail
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
