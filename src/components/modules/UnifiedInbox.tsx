import React, { useState } from 'react';
import {
  Inbox,
  Search,
  Users,
  Clock,
  Layers,
  ArrowRight,
  Archive,
  Tag
} from 'lucide-react';
import type { InboxItem, NavigationTab } from '../../types/argus';
import { DEMO_INBOX_ITEMS } from '../../data/demoData';

interface UnifiedInboxProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onShowToast: (msg: string) => void;
}

export const UnifiedInbox: React.FC<UnifiedInboxProps> = ({
  onNavigateTab,
  onShowToast,
}) => {
  const [items, setItems] = useState<InboxItem[]>(DEMO_INBOX_ITEMS);
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'UNREAD' | 'P0' | 'FEEDBACK' | 'ALERT'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<InboxItem>(items[0]);

  const filteredItems = items.filter((item) => {
    if (selectedFilter === 'UNREAD' && item.status !== 'unread') return false;
    if (selectedFilter === 'P0' && item.urgency !== 'P0') return false;
    if (selectedFilter === 'FEEDBACK' && item.type !== 'Customer Feedback' && item.type !== 'Support Ticket') return false;
    if (selectedFilter === 'ALERT' && item.type !== 'Competitor Alert' && item.type !== 'Analytics Anomaly') return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.snippet.toLowerCase().includes(q) ||
        item.source.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleMarkAsRead = (id: string) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, status: 'read' as const } : it))
    );
    if (selectedItem?.id === id) {
      setSelectedItem((prev) => ({ ...prev, status: 'read' as const }));
    }
    onShowToast('Marked item as read.');
  };

  const handleConvertToOpportunity = (item: InboxItem) => {
    setItems((prev) =>
      prev.map((it) => (it.id === item.id ? { ...it, status: 'converted' as const } : it))
    );
    onShowToast(`Converted "${item.title.slice(0, 32)}..." into a new Opportunity in DECIDE queue.`);
    onNavigateTab('opportunities');
  };

  const handleAddToRoadmap = (item: InboxItem) => {
    onShowToast(`Linked "${item.title.slice(0, 32)}..." as a candidate item on Q4 Roadmap.`);
    onNavigateTab('roadmap');
  };

  const handleArchive = (id: string) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, status: 'archived' as const } : it))
    );
    onShowToast('Item archived.');
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-5 animate-fade-in text-[#F5F5F0]">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1D1D1D]">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[2px] bg-[#0066FF]/10 border border-[#0066FF]/30 flex items-center justify-center text-[#0066FF]">
              <Inbox className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-display tracking-tight text-[#F5F5F0]">Unified Product Inbox</h1>
              <p className="text-xs font-mono-tech text-[#8A8A8A]">
                Multi-stream signal aggregator: Feedback, tickets, crash logs, competitor shifts & anomalies
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-[2px] bg-[#0A0A0A] border border-[#1D1D1D] text-[11px] font-mono-tech text-[#8A8A8A]">
            UNREAD: <strong className="text-[#0066FF]">{items.filter((i) => i.status === 'unread').length}</strong>
          </span>
          <span className="px-2 py-0.5 rounded-[2px] bg-[#0066FF]/10 border border-[#0066FF]/20 text-[10px] font-mono-tech text-[#0066FF] uppercase">
            AI Triage Engine Active
          </span>
        </div>
      </div>

      {/* Filter Bar & Search */}
      <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(['ALL', 'UNREAD', 'P0', 'FEEDBACK', 'ALERT'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3 py-1.5 rounded-[2px] text-xs font-mono-tech uppercase transition-colors cursor-pointer whitespace-nowrap ${
                selectedFilter === filter
                  ? 'bg-[#0066FF] text-white font-bold'
                  : 'bg-[#101010] text-[#8A8A8A] hover:text-[#F5F5F0] border border-[#1D1D1D]'
              }`}
            >
              {filter === 'ALL' ? `All Items (${items.length})` : filter}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-[#525252] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search signals & tickets..."
            className="w-full bg-[#0A0A0A] border border-[#1D1D1D] rounded-[2px] pl-8 pr-3 py-1.5 text-xs text-[#F5F5F0] placeholder:text-[#525252] focus:border-[#0066FF] focus:outline-none font-mono-tech"
          />
        </div>
      </div>

      {/* Split Pane: List & Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Inbox Stream */}
        <div className="lg:col-span-6 space-y-2 max-h-[640px] overflow-y-auto pr-1">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center bg-[#0A0A0A] border border-[#1D1D1D] rounded-[2px]">
              <p className="text-xs font-mono-tech text-[#525252]">No signals match your filter criteria.</p>
            </div>
          ) : (
            filteredItems.map((item) => {
              const isSelected = selectedItem?.id === item.id;
              const isUnread = item.status === 'unread';

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedItem(item);
                    if (isUnread) handleMarkAsRead(item.id);
                  }}
                  className={`p-3.5 rounded-[2px] border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-[#121212] border-[#0066FF]'
                      : 'bg-[#0A0A0A] border-[#1D1D1D] hover:border-[#2E2E2E] hover:bg-[#0E0E0E]'
                  }`}
                >
                  {isUnread && (
                    <span className="absolute top-3.5 right-3.5 w-2 h-2 rounded-full bg-[#0066FF] animate-pulse-dot" />
                  )}

                  <div className="flex items-center gap-2 mb-1.5 flex-wrap pr-4">
                    <span
                      className={`text-[9px] font-mono-tech px-1.5 py-0.5 rounded-[2px] font-bold ${
                        item.urgency === 'P0'
                          ? 'bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30'
                          : 'bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30'
                      }`}
                    >
                      {item.urgency}
                    </span>
                    <span className="text-[10px] font-mono-tech text-[#8A8A8A] bg-[#141414] px-1.5 py-0.5 rounded-[2px]">
                      {item.type}
                    </span>
                    <span className="text-[10px] font-mono-tech text-[#525252]">{item.source}</span>
                  </div>

                  <h3 className="text-xs font-bold text-[#F5F5F0] mb-1 line-clamp-1">{item.title}</h3>
                  <p className="text-[11px] text-[#8A8A8A] line-clamp-2 leading-relaxed mb-2">{item.snippet}</p>

                  <div className="flex items-center justify-between text-[10px] font-mono-tech text-[#525252]">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-[#0066FF]" />
                      {item.usersAffected}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.timestamp}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Selected Item Detail Inspector */}
        <div className="lg:col-span-6 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[2px] p-5 flex flex-col justify-between">
          {selectedItem ? (
            <div className="space-y-4">
              {/* Header */}
              <div className="pb-3 border-b border-[#1D1D1D]">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded-[2px] bg-[#0066FF]/10 text-[#0066FF] border border-[#0066FF]/30 font-bold uppercase">
                      {selectedItem.type}
                    </span>
                    <span className="text-[10px] font-mono-tech text-[#8A8A8A]">{selectedItem.category}</span>
                  </div>
                  <span className="text-[10px] font-mono-tech text-[#525252]">{selectedItem.timestamp}</span>
                </div>
                <h2 className="text-base font-bold font-display text-white leading-snug">{selectedItem.title}</h2>
              </div>

              {/* Source & Affected Cohort */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono-tech">
                <div className="p-2.5 rounded-[2px] bg-[#070707] border border-[#161616]">
                  <span className="text-[10px] text-[#525252] uppercase block">Ingested From</span>
                  <span className="text-[#F5F5F0] font-medium">{selectedItem.source}</span>
                </div>
                <div className="p-2.5 rounded-[2px] bg-[#070707] border border-[#161616]">
                  <span className="text-[10px] text-[#525252] uppercase block">Impacted Cohort</span>
                  <span className="text-[#0066FF] font-bold">{selectedItem.usersAffected}</span>
                </div>
              </div>

              {/* Telemetry Snippet */}
              <div className="p-3 rounded-[2px] bg-[#050505] border border-[#161616]">
                <span className="text-[10px] font-mono-tech text-[#525252] uppercase block mb-1">Signal Telemetry & Context</span>
                <p className="text-xs text-[#CCCCCC] leading-relaxed font-sans">{selectedItem.snippet}</p>
                {selectedItem.evidenceQuote && (
                  <div className="mt-2.5 pt-2.5 border-t border-[#141414] text-[11px] font-mono-tech text-[#3B82F6] italic">
                    "{selectedItem.evidenceQuote}"
                  </div>
                )}
              </div>

              {/* AI Trust Layer Analysis */}
              <div className="p-3.5 rounded-[2px] bg-[#091528] border border-[#0066FF]/30 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-mono-tech text-[#0066FF] font-bold uppercase">
                  <Layers className="w-3.5 h-3.5" />
                  Argus Causal Deduction
                </div>
                <p className="text-xs text-[#8AB4F8] leading-relaxed">
                  <strong className="text-white font-mono-tech">[FACT]:</strong> Transaction drop-off correlates with bank node timeouts.<br />
                  <strong className="text-white font-mono-tech">[INFERENCE]:</strong> A sub-second circuit breaker routing to backup bank nodes would salvage an estimated ₹18.4L in weekly volume.<br />
                  <strong className="text-white font-mono-tech">[RECOMMENDATION]:</strong> Convert this signal into Opportunity #014 for RICE scoring.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#1D1D1D] flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handleConvertToOpportunity(selectedItem)}
                  className="btn-magnetic flex items-center gap-1.5 px-3.5 py-2 rounded-[2px] bg-[#0066FF] hover:bg-[#1A75FF] text-white text-xs font-bold font-mono-tech cursor-pointer transition-colors shadow-sm shadow-[#0066FF]/30"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>Convert to Opportunity →</span>
                </button>

                <button
                  onClick={() => handleAddToRoadmap(selectedItem)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-[2px] bg-[#141414] hover:bg-[#1C1C1C] border border-[#242424] text-xs font-mono-tech text-[#CCCCCC] hover:text-white cursor-pointer transition-colors"
                >
                  <Tag className="w-3.5 h-3.5 text-[#0066FF]" />
                  <span>Link to Roadmap</span>
                </button>

                <button
                  onClick={() => handleArchive(selectedItem.id)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-[2px] bg-[#101010] hover:bg-[#141414] border border-[#1D1D1D] text-xs font-mono-tech text-[#8A8A8A] hover:text-[#EF4444] cursor-pointer transition-colors ml-auto"
                  title="Archive Signal"
                >
                  <Archive className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Archive</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-xs font-mono-tech text-[#525252]">
              Select a signal from the inbox to inspect details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
