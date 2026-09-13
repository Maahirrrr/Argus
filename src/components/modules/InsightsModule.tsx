import React from 'react';
import {
  Sparkles,
  Inbox
} from 'lucide-react';
import type { NavigationTab } from '../../types/finpilot';
import { DEMO_INSIGHTS } from '../../data/demoData';

interface InsightsModuleProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onCreateOpportunityFromInsight: (insightId: string) => void;
}

export const InsightsModule: React.FC<InsightsModuleProps> = ({
  onNavigateTab,
  onCreateOpportunityFromInsight,
}) => {
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto py-6 px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.08] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-400">
              AI TELEMETRY DECOMPOSITION
            </span>
            <span className="text-[10px] font-mono text-zinc-500 border border-white/[0.08] px-1.5 py-0.2 rounded">
              Active Sentry
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            AI Product Insights
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            FinPilot identified 7 product signals this week across 4.2M telemetry events.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateTab('opportunities')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-semibold text-zinc-300 cursor-pointer"
          >
            <Inbox className="w-3.5 h-3.5 text-blue-400" />
            <span>Opportunity Inbox</span>
          </button>
        </div>
      </div>

      {/* Insights Cards */}
      <div className="flex flex-col gap-5">
        {DEMO_INSIGHTS.map((insight) => (
          <div
            key={insight.id}
            className="p-6 rounded-2xl bg-[#090a0d] border border-white/[0.08] relative overflow-hidden flex flex-col gap-4 shadow-xl"
          >
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-white/[0.06]">
              <div>
                <span className="text-[10px] font-mono uppercase text-blue-400 font-bold block mb-1">
                  Validated Signal
                </span>
                <h2 className="text-base sm:text-lg font-bold text-white">
                  {insight.signalTitle}
                </h2>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-xs font-bold">
                  {insight.confidence}% Confidence
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-zinc-300 font-mono text-xs">
                  Impact: {insight.impactGmv}
                </span>
              </div>
            </div>

            {/* Evidence Breakdown */}
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold block mb-2">
                Empirical Evidence (ClickHouse Event Warehouse):
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {insight.evidence.map((ev, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-zinc-300 font-medium">{ev.label}</span>
                      <span className="font-mono text-blue-400 font-bold text-[11px]">{ev.value}</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${ev.sharePercent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Recommendation Box */}
            <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-300 block mb-0.5">
                    AI Strategic Recommendation
                  </span>
                  <p className="text-xs text-zinc-200 font-mono leading-relaxed">
                    {insight.recommendation}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => onCreateOpportunityFromInsight(insight.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold cursor-pointer shadow-sm shadow-blue-600/30 transition-all"
                >
                  <Inbox className="w-3.5 h-3.5" />
                  <span>Create Opportunity →</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
