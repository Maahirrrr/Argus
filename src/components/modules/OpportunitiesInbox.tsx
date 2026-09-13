import React from 'react';
import {
  SlidersHorizontal
} from 'lucide-react';
import type { NavigationTab, Opportunity } from '../../types/finpilot';

interface OpportunitiesInboxProps {
  opportunities: Opportunity[];
  onNavigateTab: (tab: NavigationTab) => void;
  onPrioritizeOpportunity: (oppId: string) => void;
  onDismissOpportunity: (oppId: string) => void;
}

export const OpportunitiesInbox: React.FC<OpportunitiesInboxProps> = ({
  opportunities,
  onNavigateTab,
  onPrioritizeOpportunity,
  onDismissOpportunity,
}) => {
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto py-6 px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.08] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-400">
              DISCOVERY PIPELINE
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/25">
              {opportunities.filter(o => o.status === 'inbox').length} New in Inbox
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Opportunity Inbox
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Synthesized product opportunities ready for evaluation and roadmap prioritization.
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('prioritize')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold cursor-pointer shadow-sm shadow-blue-600/30 transition-all"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Open Prioritization Workbench →</span>
        </button>
      </div>

      {/* Opportunities List */}
      <div className="flex flex-col gap-4">
        {opportunities.map((opp) => (
          <div
            key={opp.id}
            className="p-6 rounded-2xl bg-[#090a0d] border border-white/[0.08] relative overflow-hidden flex flex-col gap-4 shadow-xl"
          >
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-white/[0.06]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-blue-400">
                    Opportunity {opp.number}
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.2 rounded ${
                    opp.potentialImpact === 'HIGH'
                      ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {opp.potentialImpact} IMPACT
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">
                    Confidence: {opp.confidence}%
                  </span>
                </div>

                <h2 className="text-base sm:text-lg font-bold text-white">
                  {opp.title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onDismissOpportunity(opp.id)}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-xs font-mono text-zinc-400 cursor-pointer"
                >
                  Dismiss
                </button>
                <button
                  onClick={() => onPrioritizeOpportunity(opp.id)}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold cursor-pointer shadow-sm shadow-blue-600/30"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Prioritize →</span>
                </button>
              </div>
            </div>

            {/* Details & Source Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">Source Signals</span>
                <div className="flex flex-wrap gap-1">
                  {opp.source.map((src, i) => (
                    <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-zinc-300 border border-white/[0.06]">
                      {src}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">Users Affected</span>
                <p className="text-sm font-mono font-bold text-white">{opp.usersAffected} transactors</p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">Estimated Opportunity</span>
                <p className="text-sm font-mono font-bold text-emerald-400">{opp.estimatedOpportunity}</p>
              </div>
            </div>

            {/* Evidence List */}
            <div>
              <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block mb-1.5">
                Correlated Evidence:
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-zinc-300">
                {opp.evidence.map((ev, i) => (
                  <li key={i} className="flex items-start gap-2 bg-white/[0.01] p-2 rounded-lg border border-white/[0.03]">
                    <span className="text-blue-400 font-bold">•</span>
                    <span>{ev}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* AI Recommendation */}
            <div className="p-3.5 rounded-xl bg-blue-950/20 border border-blue-500/30">
              <span className="text-[10px] font-mono uppercase tracking-wider text-blue-300 font-bold block mb-0.5">
                AI Recommendation:
              </span>
              <p className="text-xs text-zinc-200 font-mono leading-relaxed">
                {opp.aiRecommendation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
