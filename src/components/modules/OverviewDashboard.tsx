import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import type { NavigationTab } from '../../types/finpilot';
import { DEMO_SIGNALS } from '../../data/demoData';

interface OverviewDashboardProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onInvestigateSignal: (signalId: string) => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  onNavigateTab,
  onInvestigateSignal,
}) => {
  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto py-8 px-4 sm:px-6 select-none">
      {/* 21 Editorial Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-[#1D1D1D] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono-tech uppercase tracking-[0.2em] text-[#8A8A8A]">
              PRODUCT INTELLIGENCE COCKPIT
            </span>
            <span className="text-[10px] font-mono-tech px-2 py-0.2 rounded-[2px] bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/25">
              ACTIVE SURVEILLANCE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F5F0] tracking-tight font-display">
            Good evening. Here's what changed across your product.
          </h1>
          <p className="text-xs text-[#8A8A8A] font-mono-tech mt-1">
            September 13, 2026 · Analyzing 4.2M events across ClickHouse & NPCI
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono-tech text-[#525252]">
          <span>LAST SYNCED: <strong className="text-[#8A8A8A]">8 MIN AGO</strong></span>
          <button
            onClick={() => onNavigateTab('insights')}
            className="text-[#0066FF] hover:text-[#3385FF] transition-colors cursor-pointer"
          >
            All Signals (5) →
          </button>
        </div>
      </div>

      {/* 21 Editorial Metric Layout with Horizontal Divisions (No generic round card grids) */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#1D1D1D] bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px]">
        {/* Metric 1 */}
        <div className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[10px] font-mono-tech text-[#8A8A8A] mb-2">
              <span>PAYMENT SUCCESS RATE</span>
              <span className="text-[#EF4444] font-semibold flex items-center gap-1">
                <TrendingDown className="w-3 h-3" /> -4.1%
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold font-mono-tech text-[#F5F5F0]">94.2%</span>
              <span className="text-xs font-mono-tech text-[#525252]">target: 98.5%</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#161616] text-[11px] font-mono-tech text-[#8A8A8A] flex items-center justify-between">
            <span>DROP ON ₹10K+ TRANS</span>
            <span className="text-[#EF4444]">U30 TIMEOUT</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[10px] font-mono-tech text-[#8A8A8A] mb-2">
              <span>DAY-7 RETENTION</span>
              <span className="text-[#10B981] font-semibold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +2.4%
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold font-mono-tech text-[#F5F5F0]">41.8%</span>
              <span className="text-xs font-mono-tech text-[#525252]">steady benchmark</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#161616] text-[11px] font-mono-tech text-[#8A8A8A] flex items-center justify-between">
            <span>P2P TRANS BOOST</span>
            <span className="text-[#10B981]">+1,200 USERS</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[10px] font-mono-tech text-[#8A8A8A] mb-2">
              <span>TRANSACTION VALUE (7D)</span>
              <span className="text-[#10B981] font-semibold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +12.6%
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold font-mono-tech text-[#F5F5F0]">₹18.4Cr</span>
              <span className="text-xs font-mono-tech text-[#525252]">GMV velocity</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#161616] text-[11px] font-mono-tech text-[#8A8A8A] flex items-center justify-between">
            <span>₹18.4L IMPACTED</span>
            <span className="text-[#0066FF]">OPP #014</span>
          </div>
        </div>
      </div>

      {/* 22 Dominant Dashboard Hero: AI FOUND SOMETHING */}
      <div className="p-8 bg-[#0D0E12] border border-[#0066FF]/35 rounded-[4px] relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
        <div className="flex flex-col gap-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-[2px] bg-[#0066FF]/15 border border-[#0066FF]/30 text-[#0066FF] text-[10px] font-mono-tech font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              AI FOUND SOMETHING
            </span>
            <span className="text-[10px] font-mono-tech text-[#8A8A8A]">
              HIGH PRIORITY ANOMALY · DETECTED 14 MIN AGO
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-[#F5F5F0] tracking-tight font-display">
            Payment failures increased <span className="text-[#EF4444]">7.4%</span> in high-value transactions.
          </h2>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono-tech text-[#8A8A8A] mt-1">
            <span><strong>18,421</strong> users affected</span>
            <span>•</span>
            <span><strong>₹18.4L</strong> estimated GMV at risk</span>
            <span>•</span>
            <span className="text-[#0066FF]"><strong>91%</strong> AI confidence</span>
          </div>
        </div>

        <button
          onClick={() => onInvestigateSignal('sig-001')}
          className="btn-magnetic flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-[3px] bg-[#0066FF] hover:bg-[#1A75FF] text-white text-xs font-semibold cursor-pointer shadow-lg shadow-[#0066FF]/25"
        >
          <span>Investigate signal →</span>
        </button>
      </div>

      {/* Triage Queue: Active Product Signals */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between text-xs font-mono-tech text-[#8A8A8A]">
          <span className="uppercase tracking-wider">ACTIVE PRODUCT SIGNALS QUEUE (5)</span>
          <span>SORTED BY ESTIMATED USER IMPACT</span>
        </div>

        <div className="flex flex-col divide-y divide-[#1D1D1D] bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px]">
          {DEMO_SIGNALS.map((sig) => (
            <div
              key={sig.id}
              className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#0E0E0E] transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-[3px] bg-[#141414] border border-[#1D1D1D] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ShieldAlert className={`w-4 h-4 ${sig.severity === 'HIGH' ? 'text-[#EF4444]' : 'text-[#F59E0B]'}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-[#F5F5F0]">{sig.title}</span>
                    <span className="text-[10px] font-mono-tech px-1.5 py-0.2 rounded-[2px] bg-[#141414] border border-[#1D1D1D] text-[#8A8A8A]">
                      {sig.metric} {sig.delta}
                    </span>
                  </div>
                  <p className="text-xs text-[#8A8A8A] font-mono-tech">
                    {sig.usersAffected} users affected · {sig.likelyCause}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-xs font-mono-tech text-[#8A8A8A]">
                  {sig.timestamp}
                </span>
                <button
                  onClick={() => onInvestigateSignal(sig.id)}
                  className="btn-magnetic flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] bg-[#141414] hover:bg-[#1A1A1A] border border-[#2E2E2E] text-xs font-mono-tech text-[#F5F5F0] cursor-pointer"
                >
                  <span>Investigate</span>
                  <ArrowRight className="w-3 h-3 text-[#0066FF]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
