import React, { useState } from 'react';
import {
  SlidersHorizontal,
  ArrowRight,
  Search,
  Filter
} from 'lucide-react';
import type { NavigationTab, Opportunity } from '../../types/tapwise';

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
  const [filterImpact, setFilterImpact] = useState<'ALL' | 'HIGH' | 'MEDIUM'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOpps = opportunities.filter((opp) => {
    const matchesImpact = filterImpact === 'ALL' || opp.potentialImpact === filterImpact;
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.aiRecommendation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.number.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesImpact && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto py-8 px-4 sm:px-6 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-[#1D1D1D] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono-tech uppercase tracking-[0.2em] text-[#0066FF] font-bold">
              DISCOVERY PIPELINE
            </span>
            <span className="text-[10px] font-mono-tech px-2 py-0.2 rounded-[2px] bg-[#0066FF]/15 text-[#0066FF] border border-[#0066FF]/30">
              {opportunities.filter((o) => o.status === 'inbox').length} OPPORTUNITIES IN INBOX
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F5F0] tracking-tight font-display">
            OPPORTUNITIES INBOX
          </h1>
          <p className="text-xs text-[#8A8A8A] font-mono-tech mt-1">
            Problems worth solving. Synthesized from live ClickHouse telemetry & support queues.
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('prioritize')}
          className="btn-magnetic flex items-center gap-2 px-5 py-2.5 rounded-[3px] bg-[#0066FF] hover:bg-[#1A75FF] text-white text-xs font-semibold cursor-pointer shadow-lg shadow-[#0066FF]/20"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Open Prioritization Workbench →</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#525252]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search opportunities..."
            className="w-full bg-[#0A0A0A] border border-[#1D1D1D] focus:border-[#0066FF] rounded-[3px] pl-9 pr-3 py-2 text-xs font-mono-tech text-[#F5F5F0] placeholder:text-[#525252] outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[3px]">
          <Filter className="w-3 h-3 text-[#525252] ml-1.5 hidden sm:block" />
          {(['ALL', 'HIGH', 'MEDIUM'] as const).map((imp) => (
            <button
              key={imp}
              onClick={() => setFilterImpact(imp)}
              className={`px-2.5 py-1 rounded-[2px] text-xs font-mono-tech transition-colors cursor-pointer ${
                filterImpact === imp
                  ? 'bg-[#141414] text-[#F5F5F0] font-bold border border-[#2E2E2E]'
                  : 'text-[#8A8A8A] hover:text-[#F5F5F0]'
              }`}
            >
              {imp === 'ALL' ? 'ALL IMPACT' : `${imp} IMPACT`}
            </button>
          ))}
        </div>
      </div>

      {/* Opportunities List */}
      <div className="flex flex-col divide-y divide-[#1D1D1D] bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px]">
        {filteredOpps.length > 0 ? (
          filteredOpps.map((opp) => (
            <div
              key={opp.id}
              className="group p-5 sm:p-6 flex flex-col gap-4 hover:bg-[#0E0E0E] transition-all duration-150"
            >
              {/* Main Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-4">
                  <span className="font-mono-tech text-xs font-bold text-[#525252] w-7">
                    {opp.number}
                  </span>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h2 className="text-sm font-bold text-[#F5F5F0] group-hover:text-white">
                        {opp.title}
                      </h2>
                      <span
                        className={`text-[9px] font-mono-tech px-1.5 py-0.2 rounded-[2px] font-bold ${
                          opp.potentialImpact === 'HIGH'
                            ? 'bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/25'
                            : 'bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/25'
                        }`}
                      >
                        {opp.potentialImpact} IMPACT
                      </span>
                      <span className="text-[10px] font-mono-tech text-[#8A8A8A]">
                        {opp.confidence}% confidence
                      </span>
                    </div>
                    <p className="text-xs text-[#8A8A8A] font-mono-tech line-clamp-1">
                      {opp.aiRecommendation}
                    </p>
                  </div>
                </div>

                {/* Metrics & Action Buttons */}
                <div className="flex items-center gap-4 flex-shrink-0 self-end sm:self-center font-mono-tech">
                  <div className="text-right">
                    <span className="text-xs font-bold text-[#10B981]">{opp.estimatedOpportunity}</span>
                    <span className="text-[10px] text-[#525252] block">{opp.usersAffected} users</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onDismissOpportunity(opp.id)}
                      className="px-2.5 py-1.5 rounded-[3px] bg-[#141414] hover:bg-[#1A1A1A] border border-[#2E2E2E] text-xs font-mono-tech text-[#8A8A8A] hover:text-[#F5F5F0] cursor-pointer"
                    >
                      Dismiss
                    </button>
                    <button
                      onClick={() => {
                        onPrioritizeOpportunity(opp.id);
                        onNavigateTab('prioritize');
                      }}
                      className="btn-magnetic flex items-center gap-1.5 px-3.5 py-1.5 rounded-[3px] bg-[#0066FF] hover:bg-[#1A75FF] text-white text-xs font-semibold cursor-pointer"
                    >
                      <span>Prioritize</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Evidence Details */}
              <div className="pt-3 border-t border-[#141414] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono-tech text-[#8A8A8A]">
                <div>
                  <span className="text-[10px] text-[#525252] uppercase block mb-1">CORRELATED EVIDENCE</span>
                  <ul className="space-y-1">
                    {opp.evidence.map((ev, i) => (
                      <li key={i} className="flex items-center gap-2 text-[#8A8A8A]">
                        <span className="w-1 h-1 rounded-full bg-[#0066FF]" />
                        <span>{ev}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-[10px] text-[#525252] uppercase block mb-1">DATA SOURCES</span>
                  <div className="flex flex-wrap gap-1.5">
                    {opp.source.map((src, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-[2px] bg-[#141414] border border-[#1D1D1D] text-[#8A8A8A]">
                        {src}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center flex flex-col items-center justify-center gap-2 font-mono-tech">
            <span className="text-xs text-[#8A8A8A]">No opportunities matching the current filter.</span>
            <button
              onClick={() => { setFilterImpact('ALL'); setSearchQuery(''); }}
              className="text-xs text-[#0066FF] hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
