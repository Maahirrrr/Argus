import React, { useState } from 'react';
import {
  ShieldAlert,
  Search,
  ArrowRight,
  Filter
} from 'lucide-react';
import type { NavigationTab } from '../../types/argus';
import { DEMO_SIGNALS } from '../../data/demoData';

interface SignalsModuleProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onInvestigateSignal: (signalId: string) => void;
}

export const SignalsModule: React.FC<SignalsModuleProps> = ({
  onNavigateTab: _onNavigateTab,
  onInvestigateSignal,
}) => {
  const [filterSeverity, setFilterSeverity] = useState<'ALL' | 'HIGH' | 'MEDIUM' | 'LOW'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSignals = DEMO_SIGNALS.filter((s) => {
    const matchesSeverity = filterSeverity === 'ALL' || s.severity === filterSeverity;
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.metric.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.likelyCause.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto py-8 px-4 sm:px-6 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-[#1D1D1D] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-mono-tech text-[#8A8A8A]">
              Signals / Ingestion Pipeline
            </span>
            <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded-[3px] bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30 font-semibold">
              {DEMO_SIGNALS.filter(s => s.severity === 'HIGH').length} CRITICAL
            </span>
            <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded-[3px] bg-[#141414] text-[#8A8A8A] border border-[#222]">
              SIMULATION
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold text-[#EDEDED] tracking-tight">
            Signals Triage Queue
          </h1>
          <p className="text-xs text-[#8A8A8A] font-mono-tech mt-1">
            Simulated ingestion of 4.2M daily transactional events across ClickHouse, NPCI, and Zendesk.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono-tech text-[#666666]">
          <span>FEED: <strong className="text-[#F59E0B]">SIMULATION STREAM</strong></span>
          <span>·</span>
          <span>LATENCY: <strong className="text-[#8A8A8A]">28ms</strong></span>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#525252]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search signals by title, metric, or failure code..."
            className="w-full bg-[#0A0A0A] border border-[#1D1D1D] focus:border-[#0066FF] rounded-[3px] pl-9 pr-3 py-2 text-xs font-mono-tech text-[#F5F5F0] placeholder:text-[#525252] outline-none"
          />
        </div>

        {/* Severity Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[3px] overflow-x-auto">
          <Filter className="w-3 h-3 text-[#525252] ml-1.5 hidden sm:block" />
          {(['ALL', 'HIGH', 'MEDIUM', 'LOW'] as const).map((sev) => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-2.5 py-1 rounded-[2px] text-xs font-mono-tech transition-colors cursor-pointer ${
                filterSeverity === sev
                  ? 'bg-[#141414] text-[#F5F5F0] font-bold border border-[#2E2E2E]'
                  : 'text-[#8A8A8A] hover:text-[#F5F5F0]'
              }`}
            >
              {sev === 'ALL' ? 'ALL SIGNALS' : `${sev} SEVERITY`}
            </button>
          ))}
        </div>
      </div>

      {/* Signals List */}
      <div className="flex flex-col divide-y divide-[#1D1D1D] bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px]">
        {filteredSignals.length > 0 ? (
          filteredSignals.map((sig) => (
            <div
              key={sig.id}
              className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#0E0E0E] transition-colors group"
            >
              <div className="flex items-start gap-3">
                <ShieldAlert
                  className={`w-4 h-4 flex-shrink-0 mt-1 ${
                    sig.severity === 'HIGH'
                      ? 'text-[#EF4444]'
                      : sig.severity === 'MEDIUM'
                      ? 'text-[#F59E0B]'
                      : 'text-[#10B981]'
                  }`}
                />

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-sm font-bold text-[#F5F5F0] group-hover:text-white">
                      {sig.title}
                    </h2>
                    <span
                      className={`text-[9px] font-mono-tech px-1.5 py-0.2 rounded-[2px] font-bold ${
                        sig.severity === 'HIGH'
                          ? 'bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/25'
                          : sig.severity === 'MEDIUM'
                          ? 'bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/25'
                          : 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/25'
                      }`}
                    >
                      {sig.severity}
                    </span>
                    <span className="text-[10px] font-mono-tech px-1.5 py-0.2 rounded-[2px] bg-[#141414] border border-[#1D1D1D] text-[#8A8A8A]">
                      {sig.metric} {sig.delta}
                    </span>
                  </div>

                  <p className="text-xs text-[#8A8A8A] font-mono-tech leading-relaxed">
                    {sig.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono-tech text-[#525252] pt-1">
                    <span>{sig.usersAffected}</span>
                    <span>•</span>
                    <span>Likely cause: <strong className="text-[#8A8A8A]">{sig.likelyCause}</strong></span>
                    <span>•</span>
                    <span>{sig.timestamp}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center gap-3 flex-shrink-0 self-end sm:self-center">
                <button
                  onClick={() => onInvestigateSignal(sig.id)}
                  className="btn-magnetic flex items-center gap-2 px-4 py-2 rounded-[3px] bg-[#141414] hover:bg-[#1A1A1A] border border-[#2E2E2E] text-xs font-mono-tech text-[#F5F5F0] cursor-pointer"
                >
                  <span>Investigate</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#0066FF]" />
                </button>
              </div>
            </div>
          ))
        ) : (
          /* Empty State */
          <div className="p-12 text-center flex flex-col items-center justify-center gap-2">
            <span className="text-xs font-mono-tech text-[#8A8A8A]">No product signals match the current filter.</span>
            <button
              onClick={() => { setFilterSeverity('ALL'); setSearchQuery(''); }}
              className="text-xs font-mono-tech text-[#0066FF] hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
