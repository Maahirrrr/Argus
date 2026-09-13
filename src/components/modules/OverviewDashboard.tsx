import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Layers,
  FileText,
  SlidersHorizontal,
  Terminal,
  Activity
} from 'lucide-react';
import type { NavigationTab } from '../../types/tapwise';

interface OverviewDashboardProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onInvestigateSignal: (signalId: string) => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  onNavigateTab,
  onInvestigateSignal,
}) => {
  const [streamFilter, setStreamFilter] = useState<'ALL' | 'CRITICAL' | 'RESOLVED'>('ALL');

  const streamEvents = [
    { time: '10:42', title: 'Payment failure spike detected (+7.4% on ₹10k+)', category: 'GATEWAY', status: 'CRITICAL', signalId: 'sig-001' },
    { time: '09:58', title: 'Retention anomaly detected (Day-7 up +2.4%)', category: 'COHORT', status: 'RESOLVED', signalId: 'sig-005' },
    { time: '09:31', title: 'Refund complaints clustered in new users (<30d)', category: 'SUPPORT', status: 'CRITICAL', signalId: 'sig-002' },
    { time: '08:47', title: 'New experiment reached significance (Smart Failover)', category: 'EXPERIMENT', status: 'RESOLVED', signalId: 'sig-003' },
    { time: '07:15', title: 'UIDAI eKYC SMS delivery latency exceeding 45s', category: 'IDENTITY', status: 'CRITICAL', signalId: 'sig-004' },
  ];

  const filteredStream = streamEvents.filter(ev => {
    if (streamFilter === 'ALL') return true;
    return ev.status === streamFilter;
  });

  return (
    <div className="flex flex-col gap-6 sm:gap-8 max-w-7xl mx-auto py-5 sm:py-8 px-4 sm:px-6 select-none pb-24 md:pb-8">
      {/* Editorial Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-5 border-b border-[#1D1D1D] gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono-tech uppercase tracking-[0.2em] text-[#8A8A8A]">
              PRODUCT INTELLIGENCE COCKPIT
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono-tech px-2 py-0.2 rounded-[2px] bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/25">
              ACTIVE SURVEILLANCE
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#F5F5F0] tracking-tight font-display">
            Good morning. Here's what changed.
          </h1>
          <p className="text-xs text-[#8A8A8A] font-mono-tech mt-1">
            Overall product health is stable, but checkout reliability has deteriorated over the last 7 days.
          </p>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-4 text-xs font-mono-tech text-[#525252] pt-1 sm:pt-0">
          <span>SYNCED: <strong className="text-[#8A8A8A]">8 MIN AGO</strong></span>
          <button
            onClick={() => onNavigateTab('signals')}
            className="text-[#0066FF] hover:text-[#1A75FF] transition-colors cursor-pointer py-1"
          >
            All Signals (5) →
          </button>
        </div>
      </div>

      {/* Quick Actions Bar - Optimized Touch Targets */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 font-mono-tech text-xs">
        <button
          onClick={() => onInvestigateSignal('sig-001')}
          className="p-3 sm:p-3.5 bg-[#0A0A0A] hover:bg-[#141414] border border-[#1D1D1D] hover:border-[#0066FF]/40 rounded-[3px] flex items-center justify-between text-[#8A8A8A] hover:text-[#F5F5F0] cursor-pointer transition-all group min-h-[48px] active:scale-98"
        >
          <div className="flex items-center gap-2 min-w-0">
            <ShieldAlert className="w-3.5 h-3.5 text-[#EF4444] flex-shrink-0" />
            <span className="truncate text-[11px] sm:text-xs">Investigate Anomaly</span>
          </div>
          <ArrowRight className="w-3 h-3 text-[#525252] group-hover:text-[#0066FF] flex-shrink-0 ml-1" />
        </button>

        <button
          onClick={() => onNavigateTab('opportunities')}
          className="p-3 sm:p-3.5 bg-[#0A0A0A] hover:bg-[#141414] border border-[#1D1D1D] hover:border-[#0066FF]/40 rounded-[3px] flex items-center justify-between text-[#8A8A8A] hover:text-[#F5F5F0] cursor-pointer transition-all group min-h-[48px] active:scale-98"
        >
          <div className="flex items-center gap-2 min-w-0">
            <Layers className="w-3.5 h-3.5 text-[#0066FF] flex-shrink-0" />
            <span className="truncate text-[11px] sm:text-xs">Opportunities</span>
          </div>
          <ArrowRight className="w-3 h-3 text-[#525252] group-hover:text-[#0066FF] flex-shrink-0 ml-1" />
        </button>

        <button
          onClick={() => onNavigateTab('prioritize')}
          className="p-3 sm:p-3.5 bg-[#0A0A0A] hover:bg-[#141414] border border-[#1D1D1D] hover:border-[#0066FF]/40 rounded-[3px] flex items-center justify-between text-[#8A8A8A] hover:text-[#F5F5F0] cursor-pointer transition-all group min-h-[48px] active:scale-98"
        >
          <div className="flex items-center gap-2 min-w-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" />
            <span className="truncate text-[11px] sm:text-xs">Prioritize RICE</span>
          </div>
          <ArrowRight className="w-3 h-3 text-[#525252] group-hover:text-[#0066FF] flex-shrink-0 ml-1" />
        </button>

        <button
          onClick={() => onNavigateTab('prds')}
          className="p-3 sm:p-3.5 bg-[#0A0A0A] hover:bg-[#141414] border border-[#1D1D1D] hover:border-[#0066FF]/40 rounded-[3px] flex items-center justify-between text-[#8A8A8A] hover:text-[#F5F5F0] cursor-pointer transition-all group min-h-[48px] active:scale-98"
        >
          <div className="flex items-center gap-2 min-w-0">
            <FileText className="w-3.5 h-3.5 text-[#8A8A8A] flex-shrink-0" />
            <span className="truncate text-[11px] sm:text-xs">PRD Workspace</span>
          </div>
          <ArrowRight className="w-3 h-3 text-[#525252] group-hover:text-[#0066FF] flex-shrink-0 ml-1" />
        </button>

        <button
          onClick={() => onNavigateTab('ai_copilot')}
          className="p-3 sm:p-3.5 bg-[#0A0A0A] hover:bg-[#141414] border border-[#1D1D1D] hover:border-[#0066FF]/40 rounded-[3px] flex items-center justify-between text-[#8A8A8A] hover:text-[#F5F5F0] cursor-pointer transition-all group col-span-2 sm:col-span-1 min-h-[48px] active:scale-98"
        >
          <div className="flex items-center gap-2 min-w-0">
            <Terminal className="w-3.5 h-3.5 text-[#0066FF] flex-shrink-0" />
            <span className="truncate text-[11px] sm:text-xs">AI Copilot</span>
          </div>
          <ArrowRight className="w-3 h-3 text-[#525252] group-hover:text-[#0066FF] flex-shrink-0 ml-1" />
        </button>
      </div>

      {/* Editorial Metric Strip */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#1D1D1D] bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px]">
        {/* Metric 1 */}
        <div className="p-4 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[10px] font-mono-tech text-[#8A8A8A] mb-2">
              <span>PAYMENT SUCCESS RATE</span>
              <span className="text-[#EF4444] font-semibold flex items-center gap-1">
                <TrendingDown className="w-3 h-3" /> -4.1%
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-bold font-mono-tech text-[#F5F5F0]">94.2%</span>
              <span className="text-xs font-mono-tech text-[#525252]">target: 98.5%</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#161616] text-[10px] sm:text-[11px] font-mono-tech text-[#8A8A8A] flex items-center justify-between">
            <span>DROP ON ₹10K+ TRANS</span>
            <span className="text-[#EF4444]">U30 TIMEOUT</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-4 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[10px] font-mono-tech text-[#8A8A8A] mb-2">
              <span>DAY-7 RETENTION</span>
              <span className="text-[#10B981] font-semibold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +2.4%
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-bold font-mono-tech text-[#F5F5F0]">41.8%</span>
              <span className="text-xs font-mono-tech text-[#525252]">steady benchmark</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#161616] text-[10px] sm:text-[11px] font-mono-tech text-[#8A8A8A] flex items-center justify-between">
            <span>P2P TRANS BOOST</span>
            <span className="text-[#10B981]">+1,200 USERS</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-4 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[10px] font-mono-tech text-[#8A8A8A] mb-2">
              <span>TRANSACTION VOLUME (7D)</span>
              <span className="text-[#10B981] font-semibold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +12.6%
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-bold font-mono-tech text-[#F5F5F0]">₹18.4Cr</span>
              <span className="text-xs font-mono-tech text-[#525252]">GMV velocity</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#161616] text-[10px] sm:text-[11px] font-mono-tech text-[#8A8A8A] flex items-center justify-between">
            <span>₹18.4L IMPACTED</span>
            <span className="text-[#0066FF]">OPP #014</span>
          </div>
        </div>
      </div>

      {/* Dominant AI Anomaly Hero - Mobile Stacked */}
      <div className="p-5 sm:p-8 bg-[#0D0E12] border border-[#0066FF]/35 rounded-[4px] relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6 shadow-2xl">
        <div className="flex flex-col gap-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-[2px] bg-[#0066FF]/15 border border-[#0066FF]/30 text-[#0066FF] text-[9px] sm:text-[10px] font-mono-tech font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              AI ANOMALY HERO
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono-tech text-[#8A8A8A]">
              HIGH PRIORITY · 14 MIN AGO
            </span>
          </div>

          <h2 className="text-lg sm:text-2xl font-bold text-[#F5F5F0] tracking-tight font-display leading-tight">
            Payment failures increased <span className="text-[#EF4444]">7.4%</span> in high-value checkouts.
          </h2>

          <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-1.5 text-[11px] sm:text-xs font-mono-tech text-[#8A8A8A] mt-1">
            <span><strong>18,421</strong> users affected</span>
            <span>•</span>
            <span><strong>₹18.4L</strong> GMV at risk</span>
            <span>•</span>
            <span className="text-[#0066FF]"><strong>91%</strong> AI confidence</span>
          </div>
        </div>

        <div className="w-full sm:w-auto flex-shrink-0 pt-2 sm:pt-0">
          <button
            onClick={() => onInvestigateSignal('sig-001')}
            className="btn-magnetic w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-[3px] bg-[#0066FF] hover:bg-[#1A75FF] text-white text-xs font-semibold cursor-pointer shadow-lg shadow-[#0066FF]/25 min-h-[44px]"
          >
            <span>Investigate signal →</span>
          </button>
        </div>
      </div>

      {/* Live Intelligence Stream */}
      <div className="p-4 sm:p-6 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#1D1D1D] gap-2">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#0066FF]" />
            <span className="text-xs font-mono-tech font-bold uppercase text-[#F5F5F0]">
              REAL-TIME INTELLIGENCE STREAM
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono-tech">
            {(['ALL', 'CRITICAL', 'RESOLVED'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setStreamFilter(tab)}
                className={`px-2.5 py-1.5 rounded-[2px] cursor-pointer transition-colors min-h-[36px] min-w-[44px] ${
                  streamFilter === tab
                    ? 'bg-[#141414] text-[#0066FF] border border-[#0066FF]/40 font-bold'
                    : 'text-[#8A8A8A] hover:text-[#F5F5F0]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col divide-y divide-[#141414]">
          {filteredStream.map((item, idx) => (
            <div
              key={idx}
              onClick={() => onInvestigateSignal(item.signalId)}
              className="py-3 px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[#121214] rounded-[3px] transition-colors cursor-pointer group"
            >
              <div className="flex items-start sm:items-center gap-2.5">
                <span className="text-[10px] font-mono-tech text-[#525252] w-12 flex-shrink-0 pt-0.5 sm:pt-0">
                  {item.time}
                </span>
                <span className={`text-[9px] font-mono-tech px-1.5 py-0.2 rounded-[2px] font-bold flex-shrink-0 ${
                  item.status === 'CRITICAL'
                    ? 'bg-[#EF4444]/20 text-[#EF4444]'
                    : 'bg-[#10B981]/20 text-[#10B981]'
                }`}>
                  {item.category}
                </span>
                <span className="text-xs text-[#F5F5F0] group-hover:text-white transition-colors line-clamp-2 sm:line-clamp-1">
                  {item.title}
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 text-xs font-mono-tech text-[#0066FF] opacity-80 group-hover:opacity-100 self-end sm:self-center">
                <span>View</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
