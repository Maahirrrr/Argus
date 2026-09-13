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
    <div className="flex flex-col gap-8 max-w-7xl mx-auto py-8 px-4 sm:px-6 select-none">
      {/* Editorial Dashboard Header */}
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
            Good morning. Here's what changed across your product.
          </h1>
          <p className="text-xs text-[#8A8A8A] font-mono-tech mt-1">
            Overall product health is stable, but checkout reliability has deteriorated over the last 7 days.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono-tech text-[#525252]">
          <span>LAST SYNCED: <strong className="text-[#8A8A8A]">8 MIN AGO</strong></span>
          <button
            onClick={() => onNavigateTab('signals')}
            className="text-[#0066FF] hover:text-[#1A75FF] transition-colors cursor-pointer"
          >
            All Signals (5) →
          </button>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono-tech text-xs">
        <button
          onClick={() => onInvestigateSignal('sig-001')}
          className="p-3 bg-[#0A0A0A] hover:bg-[#141414] border border-[#1D1D1D] hover:border-[#0066FF]/40 rounded-[3px] flex items-center justify-between text-[#8A8A8A] hover:text-[#F5F5F0] cursor-pointer transition-all group"
        >
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-3.5 h-3.5 text-[#EF4444]" />
            <span className="truncate">Investigate Anomaly</span>
          </div>
          <ArrowRight className="w-3 h-3 text-[#525252] group-hover:text-[#0066FF]" />
        </button>

        <button
          onClick={() => onNavigateTab('opportunities')}
          className="p-3 bg-[#0A0A0A] hover:bg-[#141414] border border-[#1D1D1D] hover:border-[#0066FF]/40 rounded-[3px] flex items-center justify-between text-[#8A8A8A] hover:text-[#F5F5F0] cursor-pointer transition-all group"
        >
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-[#0066FF]" />
            <span className="truncate">Review Opportunities</span>
          </div>
          <ArrowRight className="w-3 h-3 text-[#525252] group-hover:text-[#0066FF]" />
        </button>

        <button
          onClick={() => onNavigateTab('prioritize')}
          className="p-3 bg-[#0A0A0A] hover:bg-[#141414] border border-[#1D1D1D] hover:border-[#0066FF]/40 rounded-[3px] flex items-center justify-between text-[#8A8A8A] hover:text-[#F5F5F0] cursor-pointer transition-all group"
        >
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#10B981]" />
            <span className="truncate">Prioritize Backlog</span>
          </div>
          <ArrowRight className="w-3 h-3 text-[#525252] group-hover:text-[#0066FF]" />
        </button>

        <button
          onClick={() => onNavigateTab('prds')}
          className="p-3 bg-[#0A0A0A] hover:bg-[#141414] border border-[#1D1D1D] hover:border-[#0066FF]/40 rounded-[3px] flex items-center justify-between text-[#8A8A8A] hover:text-[#F5F5F0] cursor-pointer transition-all group"
        >
          <div className="flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-[#8A8A8A]" />
            <span className="truncate">Create PRD</span>
          </div>
          <ArrowRight className="w-3 h-3 text-[#525252] group-hover:text-[#0066FF]" />
        </button>

        <button
          onClick={() => onNavigateTab('ai_copilot')}
          className="p-3 bg-[#0A0A0A] hover:bg-[#141414] border border-[#1D1D1D] hover:border-[#0066FF]/40 rounded-[3px] flex items-center justify-between text-[#8A8A8A] hover:text-[#F5F5F0] cursor-pointer transition-all group col-span-2 sm:col-span-1"
        >
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-[#0066FF]" />
            <span className="truncate">Ask AI Copilot</span>
          </div>
          <ArrowRight className="w-3 h-3 text-[#525252] group-hover:text-[#0066FF]" />
        </button>
      </div>

      {/* Editorial Metric Strip */}
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
              <span>TRANSACTION VOLUME (7D)</span>
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

      {/* Dominant AI Anomaly Hero */}
      <div className="p-8 bg-[#0D0E12] border border-[#0066FF]/35 rounded-[4px] relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
        <div className="flex flex-col gap-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-[2px] bg-[#0066FF]/15 border border-[#0066FF]/30 text-[#0066FF] text-[10px] font-mono-tech font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              AI ANOMALY HERO
            </span>
            <span className="text-[10px] font-mono-tech text-[#8A8A8A]">
              HIGH PRIORITY · DETECTED 14 MIN AGO
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-[#F5F5F0] tracking-tight font-display">
            Payment failures increased <span className="text-[#EF4444]">7.4%</span> in high-value checkouts.
          </h2>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono-tech text-[#8A8A8A] mt-1">
            <span><strong>18,421</strong> users affected</span>
            <span>•</span>
            <span><strong>₹18.4L</strong> estimated GMV at risk</span>
            <span>•</span>
            <span className="text-[#0066FF]"><strong>91%</strong> AI confidence</span>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => onInvestigateSignal('sig-001')}
            className="btn-magnetic flex items-center gap-2 px-6 py-3 rounded-[3px] bg-[#0066FF] hover:bg-[#1A75FF] text-white text-xs font-semibold cursor-pointer shadow-lg shadow-[#0066FF]/25"
          >
            <span>Investigate signal →</span>
          </button>
        </div>
      </div>

      {/* Live Intelligence Stream */}
      <div className="p-6 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#1D1D1D] gap-2">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#0066FF]" />
            <span className="text-xs font-mono-tech font-bold uppercase text-[#F5F5F0]">
              REAL-TIME INTELLIGENCE STREAM
            </span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-mono-tech">
            {(['ALL', 'CRITICAL', 'RESOLVED'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setStreamFilter(tab)}
                className={`px-2 py-0.5 rounded-[2px] transition-colors cursor-pointer ${
                  streamFilter === tab ? 'bg-[#141414] text-[#F5F5F0] font-bold border border-[#2E2E2E]' : 'text-[#8A8A8A]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2 font-mono-tech text-xs">
          {filteredStream.map((item, idx) => (
            <div
              key={idx}
              onClick={() => onInvestigateSignal(item.signalId)}
              className="p-3 rounded-[3px] bg-[#050505] border border-[#161616] hover:border-[#2E2E2E] flex items-center justify-between gap-3 cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-[#525252] w-12">{item.time}</span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded-[2px] font-bold ${
                  item.status === 'CRITICAL' ? 'bg-[#EF4444]/20 text-[#EF4444]' : 'bg-[#10B981]/20 text-[#10B981]'
                }`}>
                  {item.category}
                </span>
                <span className="text-[#F5F5F0] group-hover:text-white transition-colors">
                  {item.title}
                </span>
              </div>
              <ArrowRight className="w-3 h-3 text-[#525252] group-hover:text-[#0066FF] flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
