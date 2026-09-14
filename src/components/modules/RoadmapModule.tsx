import React, { useState } from 'react';
import {
  CalendarRange,
  Kanban,
  List,
  AlertTriangle,
  ExternalLink,
  Plus,
  ShieldAlert,
  User,
  Filter
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

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 animate-fade-in text-[#F5F5F0]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1D1D1D]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-[2px] bg-[#0066FF]/10 border border-[#0066FF]/30 flex items-center justify-center text-[#0066FF]">
            <CalendarRange className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-display tracking-tight text-[#F5F5F0]">Strategic Product Roadmap</h1>
            <p className="text-xs font-mono-tech text-[#8A8A8A]">
              Delivery forecasting, automated dependency graphs, and linked PRD execution
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Quarter filter */}
          <div className="flex items-center bg-[#0D0D0D] p-1 rounded-[2px] border border-[#1D1D1D]">
            <Filter className="w-3 h-3 text-[#8A8A8A] ml-1.5 mr-1" />
            {quarters.map((q) => (
              <button
                key={q}
                onClick={() => setQuarterFilter(q)}
                className={`px-2 py-1 text-[11px] font-mono-tech rounded-[2px] transition-colors ${
                  quarterFilter === q
                    ? 'bg-[#0066FF] text-white font-medium'
                    : 'text-[#8A8A8A] hover:text-[#F5F5F0]'
                }`}
              >
                {q}
              </button>
            ))}
          </div>

          {/* View Mode */}
          <div className="flex items-center bg-[#0D0D0D] p-1 rounded-[2px] border border-[#1D1D1D]">
            <button
              onClick={() => setViewMode('KANBAN')}
              className={`p-1.5 rounded-[2px] transition-colors ${
                viewMode === 'KANBAN' ? 'bg-[#1D1D1D] text-[#0066FF]' : 'text-[#8A8A8A] hover:text-[#F5F5F0]'
              }`}
              title="Kanban Board"
            >
              <Kanban className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('TIMELINE')}
              className={`p-1.5 rounded-[2px] transition-colors ${
                viewMode === 'TIMELINE' ? 'bg-[#1D1D1D] text-[#0066FF]' : 'text-[#8A8A8A] hover:text-[#F5F5F0]'
              }`}
              title="Timeline Overview"
            >
              <CalendarRange className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('LIST')}
              className={`p-1.5 rounded-[2px] transition-colors ${
                viewMode === 'LIST' ? 'bg-[#1D1D1D] text-[#0066FF]' : 'text-[#8A8A8A] hover:text-[#F5F5F0]'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => onNavigateTab('prds')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-tech font-medium bg-[#0066FF] hover:bg-[#0052CC] text-white rounded-[2px] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Draft PRD</span>
          </button>
        </div>
      </div>

      {/* Dependency conflict notice banner */}
      <div className="bg-[#0A0A0A] border border-[#FF3333]/30 rounded-[2px] p-3.5 flex items-start gap-3">
        <ShieldAlert className="w-4 h-4 text-[#FF3333] flex-shrink-0 mt-0.5" />
        <div className="flex-1 text-xs">
          <div className="font-semibold text-[#F5F5F0]">Critical Dependency Warning</div>
          <p className="text-[#8A8A8A] mt-0.5">
            <span className="text-[#F5F5F0] font-mono-tech">Autonomous Dispute Auto-Refund</span> depends on{' '}
            <span className="text-[#0066FF] font-mono-tech">NPCI UPI Latency &lt; 250ms</span>. Launch risk elevated if Settlement SLA slips past Sep 28.
          </p>
        </div>
        <button
          onClick={() => onShowToast('Conflict flagged to Lead Systems Architect.')}
          className="text-[11px] font-mono-tech text-[#FF3333] hover:underline whitespace-nowrap self-center"
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
              <div key={colStatus} className="bg-[#0A0A0A] border border-[#1D1D1D] rounded-[2px] flex flex-col min-h-[480px]">
                {/* Column header */}
                <div className="p-3 border-b border-[#1D1D1D] flex items-center justify-between bg-[#080808]">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      colStatus === 'Now' ? 'bg-[#0066FF] animate-pulse-dot' :
                      colStatus === 'Next' ? 'bg-[#FF9900]' :
                      colStatus === 'Later' ? 'bg-[#8A8A8A]' : 'bg-[#00CC66]'
                    }`} />
                    <span className="text-xs font-bold font-mono-tech tracking-wider uppercase text-[#F5F5F0]">
                      {colStatus}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono-tech text-[#8A8A8A] px-1.5 py-0.5 bg-[#141414] rounded-[2px]">
                    {colItems.length}
                  </span>
                </div>

                {/* Column items */}
                <div className="p-2 space-y-2.5 flex-1 overflow-y-auto">
                  {colItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className={`p-3 bg-[#0D0D0D] border rounded-[2px] hover:border-[#0066FF]/60 cursor-pointer transition-all ${
                        selectedItem?.id === item.id ? 'border-[#0066FF] bg-[#0066FF]/5' : 'border-[#1D1D1D]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <span className="text-[10px] font-mono-tech text-[#0066FF] bg-[#0066FF]/10 px-1.5 py-0.5 rounded-[2px]">
                          {item.quarter}
                        </span>
                        <span className={`text-[9px] font-mono-tech px-1.5 py-0.2 rounded-[2px] ${
                          (item.risk || 'LOW') === 'HIGH' ? 'bg-[#FF3333]/15 text-[#FF3333]' :
                          (item.risk || 'LOW') === 'MEDIUM' ? 'bg-[#FF9900]/15 text-[#FF9900]' :
                          'bg-[#00CC66]/15 text-[#00CC66]'
                        }`}>
                          {item.risk || 'LOW'} RISK
                        </span>
                      </div>

                      <h4 className="text-xs font-semibold text-[#F5F5F0] leading-snug mb-1 font-display">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#8A8A8A] line-clamp-2 mb-2.5">
                        {item.description || item.problem}
                      </p>

                      {/* Dependencies */}
                      {item.dependencies && item.dependencies.length > 0 && (
                        <div className="text-[10px] font-mono-tech text-[#FF9900] bg-[#FF9900]/10 p-1.5 rounded-[2px] mb-2 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">Blocked by: {item.dependencies.join(', ')}</span>
                        </div>
                      )}

                      {/* Progress bar */}
                      <div className="space-y-1 mb-2">
                        <div className="flex justify-between text-[10px] font-mono-tech text-[#8A8A8A]">
                          <span>Progress</span>
                          <span>{item.progress || 40}%</span>
                        </div>
                        <div className="w-full h-1 bg-[#1A1A1A] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#0066FF] transition-all duration-300"
                            style={{ width: `${item.progress || 40}%` }}
                          />
                        </div>
                      </div>

                      {/* Footer actions */}
                      <div className="flex items-center justify-between pt-2 border-t border-[#1D1D1D] text-[10px] font-mono-tech text-[#8A8A8A]">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {item.owner}
                        </span>
                        <div className="flex items-center gap-1">
                          {colStatus !== 'Now' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMoveStatus(item.id, 'Now');
                              }}
                              className="hover:text-[#0066FF] px-1"
                              title="Move to Now"
                            >
                              ← Now
                            </button>
                          )}
                          {colStatus !== 'Shipped' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const nextIndex = columns.indexOf(colStatus) + 1;
                                handleMoveStatus(item.id, columns[nextIndex]);
                              }}
                              className="hover:text-[#0066FF] px-1"
                              title="Advance Status"
                            >
                              Advance
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {colItems.length === 0 && (
                    <div className="text-center py-10 text-xs font-mono-tech text-[#555]">
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
        <div className="bg-[#0A0A0A] border border-[#1D1D1D] rounded-[2px] p-4 space-y-4">
          <div className="grid grid-cols-12 gap-2 text-[11px] font-mono-tech text-[#8A8A8A] pb-2 border-b border-[#1D1D1D]">
            <div className="col-span-4">INITIATIVE & QUARTER</div>
            <div className="col-span-2">OWNER</div>
            <div className="col-span-2">STATUS</div>
            <div className="col-span-3">PROGRESS GANTT</div>
            <div className="col-span-1 text-right">PRD</div>
          </div>
          <div className="space-y-3">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="grid grid-cols-12 gap-2 items-center p-2.5 bg-[#0D0D0D] border border-[#1D1D1D] hover:border-[#0066FF]/50 rounded-[2px] cursor-pointer transition-all text-xs"
              >
                <div className="col-span-4">
                  <div className="font-semibold text-[#F5F5F0] font-display">{item.title}</div>
                  <div className="text-[10px] font-mono-tech text-[#0066FF]">{item.quarter} · {item.risk || 'LOW'} Risk</div>
                </div>
                <div className="col-span-2 font-mono-tech text-[#8A8A8A]">{item.owner}</div>
                <div className="col-span-2">
                  <span className={`text-[10px] font-mono-tech px-2 py-0.5 rounded-[2px] ${
                    item.status === 'Now' ? 'bg-[#0066FF]/15 text-[#0066FF]' :
                    item.status === 'Next' ? 'bg-[#FF9900]/15 text-[#FF9900]' :
                    item.status === 'Shipped' ? 'bg-[#00CC66]/15 text-[#00CC66]' :
                    'bg-[#1D1D1D] text-[#8A8A8A]'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <div className="col-span-3 space-y-1">
                  <div className="w-full h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
                    <div className="h-full bg-[#0066FF]" style={{ width: `${item.progress || 40}%` }} />
                  </div>
                  <div className="text-[9px] font-mono-tech text-[#8A8A8A] text-right">{item.progress || 40}% complete</div>
                </div>
                <div className="col-span-1 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigateTab('prds');
                    }}
                    className="p-1 hover:text-[#0066FF] text-[#8A8A8A] transition-colors inline-flex"
                    title="View linked PRD"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {viewMode === 'LIST' && (
        <div className="bg-[#0A0A0A] border border-[#1D1D1D] rounded-[2px] p-4">
          <div className="divide-y divide-[#1D1D1D]">
            {filteredItems.map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#F5F5F0] font-display">{item.title}</span>
                    <span className="text-[10px] font-mono-tech px-1.5 py-0.2 bg-[#1D1D1D] text-[#8A8A8A] rounded-[2px]">
                      {item.quarter}
                    </span>
                  </div>
                  <p className="text-xs text-[#8A8A8A]">{item.description || item.problem}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono-tech text-[#8A8A8A]">{item.owner}</span>
                  <button
                    onClick={() => onNavigateTab('prds')}
                    className="px-2.5 py-1 text-xs font-mono-tech border border-[#1D1D1D] hover:border-[#0066FF] text-[#F5F5F0] rounded-[2px]"
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
        <div className="bg-[#0A0A0A] border border-[#0066FF]/40 rounded-[2px] p-5 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono-tech text-[#0066FF]">
                <span>{selectedItem.quarter}</span>
                <span>•</span>
                <span>{selectedItem.status}</span>
                <span>•</span>
                <span>OWNER: {selectedItem.owner}</span>
              </div>
              <h3 className="text-base font-bold font-display text-[#F5F5F0] mt-1">{selectedItem.title}</h3>
            </div>
            <button
              onClick={() => setSelectedItem(null)}
              className="text-xs font-mono-tech text-[#8A8A8A] hover:text-[#F5F5F0]"
            >
              Close [ESC]
            </button>
          </div>

          <p className="text-xs text-[#CCCCCC] leading-relaxed max-w-3xl">
            {selectedItem.description || selectedItem.problem}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            <div className="p-3 bg-[#0D0D0D] border border-[#1D1D1D] rounded-[2px]">
              <div className="text-[10px] font-mono-tech text-[#8A8A8A]">ESTIMATED COMPLETION</div>
              <div className="text-sm font-semibold font-mono-tech text-[#F5F5F0] mt-1">End of {selectedItem.quarter}</div>
            </div>
            <div className="p-3 bg-[#0D0D0D] border border-[#1D1D1D] rounded-[2px]">
              <div className="text-[10px] font-mono-tech text-[#8A8A8A]">DEPENDENCY RISK RATING</div>
              <div className={`text-sm font-semibold font-mono-tech mt-1 ${
                (selectedItem.risk || 'LOW') === 'HIGH' ? 'text-[#FF3333]' : 'text-[#00CC66]'
              }`}>
                {selectedItem.risk || 'LOW'} SEVERITY
              </div>
            </div>
            <div className="p-3 bg-[#0D0D0D] border border-[#1D1D1D] rounded-[2px] flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono-tech text-[#8A8A8A]">SPECIFICATION DOC</div>
                <div className="text-xs font-mono-tech text-[#0066FF] mt-1">PRD-{selectedItem.id.toUpperCase()}</div>
              </div>
              <button
                onClick={() => onNavigateTab('prds')}
                className="px-2.5 py-1 text-xs font-mono-tech bg-[#0066FF] text-white rounded-[2px] hover:bg-[#0052CC]"
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
