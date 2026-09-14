import React, { useState } from 'react';
import {
  CalendarRange,
  Kanban,
  List,
  AlertTriangle,
  ExternalLink,
  Plus,
  User
} from 'lucide-react';
import type { RoadmapItem, NavigationTab } from '../../types/argus';
import { DEMO_ROADMAP } from '../../data/demoData';

interface RoadmapModuleProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onShowToast: (msg: string) => void;
}

export const RoadmapModule: React.FC<RoadmapModuleProps> = ({
  onNavigateTab,
  onShowToast,
}) => {
  const [roadmapItems, setRoadmapItems] = useState<RoadmapItem[]>(DEMO_ROADMAP);
  const [viewMode, setViewMode] = useState<'KANBAN' | 'TIMELINE' | 'LIST'>('KANBAN');
  const [selectedItem, setSelectedItem] = useState<RoadmapItem | null>(null);
  const [quarterFilter, setQuarterFilter] = useState<string>('ALL');

  const quarters = ['ALL', 'Q3 2026', 'Q4 2026', 'Q1 2027'];
  const columns: RoadmapItem['status'][] = ['Now', 'Next', 'Later', 'Shipped'];

  const filteredItems = quarterFilter === 'ALL'
    ? roadmapItems
    : roadmapItems.filter((it) => it.quarter === quarterFilter);

  const handleMoveStatus = (id: string, newStatus: RoadmapItem['status']) => {
    setRoadmapItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, status: newStatus } : it))
    );
    onShowToast(`Initiative moved to "${newStatus}". Roadmaps synced.`);
  };

  const getItemProgress = (item: RoadmapItem) => {
    if (item.status === 'Shipped') return 100;
    if (item.status === 'Now') return item.progress ? Math.max(40, Math.min(item.progress, 70)) : 65;
    if (item.status === 'Next') return item.progress ? Math.max(10, Math.min(item.progress, 25)) : 20;
    return 0; // Later
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 animate-fade-in text-[#F5F5F0]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1D1D1D]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-[4px] bg-[#0066FF]/10 border border-[#0066FF]/30 flex items-center justify-center text-[#0066FF]">
            <CalendarRange className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-display tracking-tight text-[#F5F5F0]">Strategic Product Roadmap</h1>
            <p className="text-xs font-sans text-[#8A8A8A] mt-0.5">
              Delivery forecasting, automated dependency graphs, and linked PRD execution
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* Quarter filter flat tabs */}
          <div className="flex items-center gap-1 border-b border-[#1D1D1D]">
            {quarters.map((q) => (
              <button
                key={q}
                onClick={() => setQuarterFilter(q)}
                className={`px-3 py-1.5 text-xs font-sans font-medium transition-colors cursor-pointer ${
                  quarterFilter === q
                    ? 'text-[#FFFFFF] border-b-2 border-[#0066FF] font-semibold'
                    : 'text-[#8A8A8A] hover:text-[#FFFFFF] border-b-2 border-transparent'
                }`}
              >
                {q}
              </button>
            ))}
          </div>

          {/* View Mode */}
          <div className="flex items-center bg-[#0D0D0D] p-1 rounded-[4px] border border-[#1D1D1D]">
            <button
              onClick={() => setViewMode('KANBAN')}
              className={`p-1.5 rounded-[4px] transition-colors cursor-pointer ${
                viewMode === 'KANBAN' ? 'bg-[#1D1D1D] text-[#0066FF]' : 'text-[#8A8A8A] hover:text-[#F5F5F0]'
              }`}
              title="Kanban Board"
            >
              <Kanban className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('TIMELINE')}
              className={`p-1.5 rounded-[4px] transition-colors cursor-pointer ${
                viewMode === 'TIMELINE' ? 'bg-[#1D1D1D] text-[#0066FF]' : 'text-[#8A8A8A] hover:text-[#F5F5F0]'
              }`}
              title="Timeline Overview"
            >
              <CalendarRange className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('LIST')}
              className={`p-1.5 rounded-[4px] transition-colors cursor-pointer ${
                viewMode === 'LIST' ? 'bg-[#1D1D1D] text-[#0066FF]' : 'text-[#8A8A8A] hover:text-[#F5F5F0]'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => onNavigateTab('prds')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-display font-semibold bg-[#0066FF] hover:bg-[#0052CC] text-white rounded-[4px] transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Draft PRD</span>
          </button>
        </div>
      </div>

      {/* Dependency conflict notice banner */}
      <div className="bg-[#F59E0B]/5 border-y border-r border-[#1D1D1D] border-l-[3px] border-l-[#F59E0B] rounded-r-[4px] p-3.5 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-[#F59E0B] flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-display text-[13px] font-semibold text-[#F0F0F0]">Critical Dependency Warning</div>
            <p className="font-sans text-[12px] text-[#8A8A8A] mt-0.5">
              Autonomous Dispute Auto-Refund depends on NPCI UPI Latency &lt; 250ms. Launch risk elevated if Settlement SLA slips past Sep 28.
            </p>
          </div>
        </div>
        <button
          onClick={() => onShowToast('Conflict flagged to Lead Systems Architect.')}
          className="font-sans text-[12px] font-medium text-[#0066FF] hover:underline whitespace-nowrap self-center cursor-pointer bg-transparent border-0"
        >
          Flag to architect
        </button>
      </div>

      {/* Main View Area */}
      {viewMode === 'KANBAN' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((colStatus) => {
            const colItems = filteredItems.filter((i) => i.status === colStatus);
            return (
              <div key={colStatus} className="bg-[#0A0A0A] border border-[#1D1D1D] rounded-[8px] flex flex-col min-h-[480px]">
                {/* Column header */}
                <div className="p-3 border-b border-[#1D1D1D] flex items-center justify-between bg-[#080808] rounded-t-[8px]">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      colStatus === 'Now' ? 'bg-[#0066FF]' :
                      colStatus === 'Next' ? 'bg-[#8A8A8A]' :
                      colStatus === 'Later' ? 'bg-[#555555]' : 'bg-[#00FF88]'
                    }`} />
                    <span className="text-[12px] font-sans font-semibold uppercase tracking-wider text-[#F0F0F0]">
                      {colStatus}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#8A8A8A] px-1.5 py-0.5 bg-[#141414] rounded-[4px]">
                    {colItems.length}
                  </span>
                </div>

                {/* Column items */}
                <div className="p-2 space-y-2.5 flex-1 overflow-y-auto">
                  {colItems.map((item) => {
                    const progressVal = getItemProgress(item);
                    return (
                      <div
                        key={item.id}
                        onClick={() => setSelectedItem(item)}
                        className={`p-3 bg-[#0D0D0D] border rounded-[4px] hover:border-[#0066FF]/60 cursor-pointer transition-all group ${
                          selectedItem?.id === item.id ? 'border-[#0066FF] bg-[#0066FF]/5' : 'border-[#1D1D1D]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <span className="text-[10px] font-mono text-[#0066FF] bg-[#0066FF]/10 px-1.5 py-0.5 rounded-[4px]">
                            {item.quarter}
                          </span>
                          {item.risk === 'HIGH' && (
                            <span className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded-[4px] bg-[#FF3B30]/15 text-[#FF3B30] border border-[#FF3B30]/30">
                              HIGH RISK
                            </span>
                          )}
                          {item.risk === 'MEDIUM' && (
                            <span className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded-[4px] bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30">
                              BLOCKED
                            </span>
                          )}
                        </div>

                        <h4 className="text-xs font-semibold text-[#F5F5F0] leading-snug mb-1 font-display">
                          {item.title}
                        </h4>
                        <p className="text-[11px] font-sans text-[#8A8A8A] line-clamp-2 mb-2.5">
                          {item.description || item.problem}
                        </p>

                        {/* Dependencies */}
                        {item.dependencies && item.dependencies.length > 0 && (
                          <div className="flex items-center gap-1.5 mb-2.5 text-[#F59E0B] text-[11px] font-sans">
                            <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                            <span>Blocked by: {item.dependencies.join(', ')}</span>
                          </div>
                        )}

                        {/* Progress bar */}
                        <div className="space-y-1 mb-2">
                          <div className="flex justify-between text-[10px] font-mono text-[#8A8A8A]">
                            <span>Progress</span>
                            <span>{progressVal}%</span>
                          </div>
                          <div className="w-full h-1 bg-[#1A1A1A] rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all duration-300 ${
                                item.status === 'Shipped' ? 'bg-[#00FF88]' : 'bg-[#0066FF]'
                              }`}
                              style={{ width: `${progressVal}%` }}
                            />
                          </div>
                        </div>

                        {/* Footer actions */}
                        <div className="flex items-center justify-between pt-2 border-t border-[#1D1D1D] text-[10px] font-sans text-[#8A8A8A]">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {item.owner}
                          </span>
                          <div className="flex items-center gap-1">
                            {colStatus === 'Now' && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMoveStatus(item.id, 'Next');
                                }}
                                className="text-[11px] font-sans text-[#8A8A8A] hover:text-[#0066FF] transition-opacity opacity-0 group-hover:opacity-100 cursor-pointer"
                                title="Move to Next"
                              >
                                Move to Next
                              </button>
                            )}
                            {colStatus === 'Next' && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMoveStatus(item.id, 'Now');
                                }}
                                className="text-[11px] font-sans text-[#8A8A8A] hover:text-[#0066FF] transition-opacity opacity-0 group-hover:opacity-100 cursor-pointer"
                                title="Promote to Now"
                              >
                                Promote to Now
                              </button>
                            )}
                            {colStatus === 'Later' && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMoveStatus(item.id, 'Next');
                                }}
                                className="text-[11px] font-sans text-[#8A8A8A] hover:text-[#0066FF] transition-opacity opacity-0 group-hover:opacity-100 cursor-pointer"
                                title="Move to Next"
                              >
                                Move to Next
                              </button>
                            )}
                            {colStatus === 'Shipped' && (
                              <span className="text-[10px] font-mono text-[#00FF88]">
                                Shipped
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {colItems.length === 0 && (
                    <div className="text-center py-10 text-xs font-mono text-[#555]">
                      No initiatives in this lane
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {viewMode === 'TIMELINE' && (
        <div className="bg-[#0A0A0A] border border-[#1D1D1D] rounded-[8px] p-4 space-y-4">
          <div className="grid grid-cols-12 gap-2 text-[11px] font-sans font-medium text-[#8A8A8A] pb-2 border-b border-[#1D1D1D]">
            <div className="col-span-4">INITIATIVE & QUARTER</div>
            <div className="col-span-2">OWNER</div>
            <div className="col-span-2">STATUS</div>
            <div className="col-span-3">PROGRESS GANTT</div>
            <div className="col-span-1 text-right">PRD</div>
          </div>
          <div className="space-y-3">
            {filteredItems.map((item) => {
              const progressVal = getItemProgress(item);
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="grid grid-cols-12 gap-2 items-center p-2.5 bg-[#0D0D0D] border border-[#1D1D1D] hover:border-[#0066FF]/50 rounded-[4px] cursor-pointer transition-all text-xs"
                >
                  <div className="col-span-4">
                    <div className="font-semibold text-[#F5F5F0] font-display">{item.title}</div>
                    <div className="text-[10px] font-sans text-[#6B7280] mt-0.5">
                      <span className="text-[#0066FF] font-mono">{item.quarter}</span>
                      {item.risk === 'HIGH' && <span className="ml-2 text-[#FF3B30] font-mono">HIGH RISK</span>}
                      {item.risk === 'MEDIUM' && <span className="ml-2 text-[#F59E0B] font-mono">BLOCKED</span>}
                    </div>
                  </div>
                  <div className="col-span-2 font-sans text-[#8A8A8A]">{item.owner}</div>
                  <div className="col-span-2">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-[4px] ${
                      item.status === 'Now' ? 'bg-[#0066FF]/15 text-[#0066FF]' :
                      item.status === 'Next' ? 'bg-[#8A8A8A]/15 text-[#8A8A8A]' :
                      item.status === 'Shipped' ? 'bg-[#00FF88]/15 text-[#00FF88]' :
                      'bg-[#1D1D1D] text-[#555555]'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="col-span-3 space-y-1">
                    <div className="w-full h-1.5 bg-[#1A1A1A] rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.status === 'Shipped' ? 'bg-[#00FF88]' : 'bg-[#0066FF]'}`}
                        style={{ width: `${progressVal}%` }}
                      />
                    </div>
                    <div className="text-[9px] font-mono text-[#8A8A8A] text-right">{progressVal}% complete</div>
                  </div>
                  <div className="col-span-1 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigateTab('prds');
                      }}
                      className="p-1 hover:text-[#0066FF] text-[#8A8A8A] transition-colors inline-flex cursor-pointer"
                      title="View linked PRD"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {viewMode === 'LIST' && (
        <div className="bg-[#0A0A0A] border border-[#1D1D1D] rounded-[8px] p-4">
          <div className="divide-y divide-[#1D1D1D]">
            {filteredItems.map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#F5F5F0] font-display">{item.title}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 bg-[#1D1D1D] text-[#8A8A8A] rounded-[4px]">
                      {item.quarter}
                    </span>
                  </div>
                  <p className="text-xs text-[#8A8A8A]">{item.description || item.problem}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-sans text-[#8A8A8A]">{item.owner}</span>
                  <button
                    onClick={() => onNavigateTab('prds')}
                    className="px-2.5 py-1 text-xs font-sans border border-[#1D1D1D] hover:border-[#0066FF] text-[#F5F5F0] rounded-[4px] cursor-pointer"
                  >
                    Open PRD
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Details drawer/card if selected */}
      {selectedItem && (
        <div className="bg-[#0A0A0A] border border-[#0066FF]/40 rounded-[8px] p-5 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 text-[11px] font-mono text-[#0066FF]">
                <span>{selectedItem.quarter}</span>
                <span className="text-[#1D1D1D]">/</span>
                <span>{selectedItem.status}</span>
                <span className="text-[#1D1D1D]">/</span>
                <span className="text-[#8A8A8A] font-sans">Owner: {selectedItem.owner}</span>
              </div>
              <h3 className="text-base font-bold font-display text-[#F5F5F0] mt-1">{selectedItem.title}</h3>
            </div>
            <button
              onClick={() => setSelectedItem(null)}
              className="text-xs font-sans text-[#8A8A8A] hover:text-[#F5F5F0] cursor-pointer"
            >
              Close [ESC]
            </button>
          </div>

          <p className="text-xs text-[#CCCCCC] leading-relaxed max-w-3xl">
            {selectedItem.description || selectedItem.problem}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            <div className="p-3 bg-[#0D0D0D] border border-[#1D1D1D] rounded-[4px]">
              <div className="text-[10px] font-sans text-[#8A8A8A]">ESTIMATED COMPLETION</div>
              <div className="text-sm font-semibold font-mono text-[#F5F5F0] mt-1">End of {selectedItem.quarter}</div>
            </div>
            <div className="p-3 bg-[#0D0D0D] border border-[#1D1D1D] rounded-[4px]">
              <div className="text-[10px] font-sans text-[#8A8A8A]">DEPENDENCY RISK RATING</div>
              <div className={`text-sm font-semibold font-mono mt-1 ${
                selectedItem.risk === 'HIGH' ? 'text-[#FF3B30]' :
                selectedItem.risk === 'MEDIUM' ? 'text-[#F59E0B]' : 'text-[#8A8A8A]'
              }`}>
                {selectedItem.risk || 'STANDARD'} SEVERITY
              </div>
            </div>
            <div className="p-3 bg-[#0D0D0D] border border-[#1D1D1D] rounded-[4px] flex items-center justify-between">
              <div>
                <div className="text-[10px] font-sans text-[#8A8A8A]">SPECIFICATION DOC</div>
                <div className="text-xs font-mono text-[#0066FF] mt-1">PRD-{selectedItem.id.toUpperCase()}</div>
              </div>
              <button
                onClick={() => onNavigateTab('prds')}
                className="px-2.5 py-1 text-xs font-sans font-medium bg-[#0066FF] text-white rounded-[4px] hover:bg-[#0052CC] cursor-pointer"
              >
                Inspect PRD
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



