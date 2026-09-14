import React, { useState } from 'react';
import {
  Search,
  Users,
  Brain,
} from 'lucide-react';
import type { InboxItem, NavigationTab } from '../../types/argus';
import { DEMO_INBOX_ITEMS } from '../../data/demoData';

interface UnifiedInboxProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onShowToast: (msg: string) => void;
}

type InboxFilter = 'ALL' | 'UNREAD' | 'P0' | 'FEEDBACK' | 'ALERT';

export const UnifiedInbox: React.FC<UnifiedInboxProps> = ({
  onNavigateTab,
  onShowToast,
}) => {
  const [items, setItems] = useState<InboxItem[]>(DEMO_INBOX_ITEMS);
  const [selectedFilter, setSelectedFilter] = useState<InboxFilter>('ALL');
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
  };

  const handleConvertToOpportunity = (item: InboxItem) => {
    setItems((prev) =>
      prev.map((it) => (it.id === item.id ? { ...it, status: 'converted' as const } : it))
    );
    onShowToast(`Converted to Opportunity #014 in Decide queue.`);
    onNavigateTab('opportunities');
  };

  const handleAddToRoadmap = (_item: InboxItem) => {
    onShowToast(`Added to Roadmap candidate queue.`);
    onNavigateTab('roadmap');
  };

  const handleArchive = (id: string) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, status: 'archived' as const } : it))
    );
    onShowToast('Item archived.');
  };

  const getPriorityColor = (urgency: string) => {
    switch (urgency) {
      case 'P0':
        return 'text-[var(--signal-red)]';
      case 'P1':
        return 'text-[var(--signal-amber)]';
      default:
        return 'text-[var(--text-tertiary)]';
    }
  };

  const getPriorityBorderClass = (urgency: string) => {
    switch (urgency) {
      case 'P0':
        return 'border-l-[3px] border-l-[var(--signal-red)]';
      case 'P1':
        return 'border-l-[3px] border-l-[var(--signal-amber)]';
      default:
        return 'border-l-[3px] border-l-[var(--border-default)]';
    }
  };

  const filterTabs: { id: InboxFilter; label: string }[] = [
    { id: 'ALL', label: `All (${items.length})` },
    { id: 'UNREAD', label: 'Unread' },
    { id: 'P0', label: 'P0' },
    { id: 'FEEDBACK', label: 'Feedback' },
    { id: 'ALERT', label: 'Alert' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-4 select-none">
      {/* 1. Header with Flat Tabs & 220px Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
        {/* Flat Tabs */}
        <div className="flex items-center gap-4 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
          {filterTabs.map((tab) => {
            const isActive = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`pb-1 text-[13px] transition-colors cursor-pointer border-b-2 whitespace-nowrap ${
                  isActive
                    ? 'font-semibold font-["Space_Grotesk",sans-serif] text-[var(--text-primary)] border-[var(--signal-blue)]'
                    : 'font-normal font-sans text-[var(--text-tertiary)] hover:text-[var(--text-primary)] border-transparent'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search input: 220px width, var(--surface-2) background, 1px border */}
        <div className="relative w-full sm:w-[220px]">
          <Search className="w-3.5 h-3.5 text-[var(--text-tertiary)] absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full bg-[var(--surface-2)] border border-[var(--border-subtle)] rounded-[var(--radius-sm)] pl-8 pr-3 py-1 text-[12px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--border-strong)] focus:outline-none font-sans"
          />
        </div>
      </div>

      {/* 2. Split Pane: List (~55%) & Detail (~45%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* List Panel (~55% = 7 cols) */}
        <div className="lg:col-span-7 divide-y divide-[var(--border-subtle)] border border-[var(--border-subtle)] rounded-[var(--radius-md)] bg-[var(--surface-0)] overflow-hidden">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-[12px] text-[var(--text-tertiary)] font-sans">
              No items match your filter criteria.
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
                  className={`p-3 sm:px-4 sm:py-3 transition-colors cursor-pointer relative ${getPriorityBorderClass(
                    item.urgency
                  )} ${
                    isSelected
                      ? 'bg-[var(--surface-2)]'
                      : 'bg-transparent hover:bg-[var(--surface-2)]'
                  }`}
                >
                  {/* Top line: Priority colored text (no box) + Source tag + Unread dot */}
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono font-bold ${getPriorityColor(item.urgency)}`}>
                        {item.urgency}
                      </span>
                      <span className="text-[11px] font-normal text-[var(--text-tertiary)] font-sans">
                        {item.source}
                      </span>
                    </div>

                    {isUnread && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal-blue)] flex-shrink-0" />
                    )}
                  </div>

                  {/* Title: Space Grotesk 14px/600 */}
                  <h3 className="text-[14px] font-semibold font-['Space_Grotesk',sans-serif] text-[var(--text-primary)] mb-1 leading-snug">
                    {item.title}
                  </h3>

                  {/* Description: Inter 12px/400, 2 lines max */}
                  <p className="text-[12px] font-normal text-[var(--text-secondary)] font-sans line-clamp-2 leading-relaxed mb-2">
                    {item.snippet}
                  </p>

                  {/* Footer row: Users left, Time right */}
                  <div className="flex items-center justify-between text-[11px] font-sans text-[var(--text-tertiary)]">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3 h-3 text-[var(--text-tertiary)]" />
                      <span>{item.usersAffected}</span>
                    </span>
                    <span>{item.timestamp}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Detail Panel (~45% = 5 cols) */}
        <div className="lg:col-span-5 bg-[var(--surface-1)] border border-[var(--border-subtle)] rounded-[var(--radius-md)] p-5 space-y-4">
          {selectedItem ? (
            <>
              {/* Header: Category dot + name, timestamp right */}
              <div className="pb-3 border-b border-[var(--border-subtle)]">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5 text-[12px] font-medium font-sans text-[var(--text-tertiary)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal-blue)]" />
                    <span>Analytics anomaly</span>
                  </div>
                  <span className="text-[11px] font-sans text-[var(--text-tertiary)]">
                    {selectedItem.timestamp}
                  </span>
                </div>

                <h2 className="text-[20px] font-bold font-['Space_Grotesk',sans-serif] text-[var(--text-primary)] leading-snug">
                  {selectedItem.title}
                </h2>
              </div>

              {/* Flush 2-column metadata strip (no borders between) */}
              <div className="grid grid-cols-2 gap-4 py-1">
                <div>
                  <div className="text-[11px] font-normal text-[var(--text-tertiary)] font-sans">
                    Ingested from
                  </div>
                  <div className="text-[13px] font-medium text-[var(--text-primary)] font-sans mt-0.5">
                    {selectedItem.source}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-normal text-[var(--text-tertiary)] font-sans">
                    Impacted cohort
                  </div>
                  <div className="text-[13px] font-medium text-[var(--signal-blue)] font-sans mt-0.5 cursor-pointer hover:underline">
                    {selectedItem.usersAffected}
                  </div>
                </div>
              </div>

              {/* Signal Telemetry: No label, body text + code-style error block */}
              <div className="space-y-2 pt-1">
                <p className="text-[13px] font-normal text-[var(--text-secondary)] font-sans leading-[1.6]">
                  {selectedItem.snippet}
                </p>

                {/* Quoted error string in JetBrains Mono code-style block */}
                <div className="p-2.5 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--border-subtle)] text-[12px] font-mono text-[var(--text-primary)] leading-relaxed">
                  Bank node latency exceeded 4,500ms; gateway returned U30 Switch Timeout.
                </div>
              </div>

              {/* Structured Causal Deduction: TYPE C style card with left border in --signal-blue */}
              <div className="p-4 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border-l-2 border-l-[var(--signal-blue)] space-y-3">
                {/* Header row: Lucide Brain + "Argus analysis" */}
                <div className="flex items-center gap-1.5 text-[var(--text-accent)]">
                  <Brain className="w-3.5 h-3.5 text-[var(--signal-blue)]" />
                  <span className="text-[12px] font-semibold font-['Space_Grotesk',sans-serif]">
                    Argus analysis
                  </span>
                </div>

                {/* Row 1: Observation */}
                <div>
                  <div className="text-[10px] font-medium font-sans text-[var(--text-tertiary)]">
                    Observation
                  </div>
                  <div className="text-[13px] font-normal font-sans text-[var(--text-secondary)] mt-0.5">
                    Transaction drop-off correlates with bank node timeouts.
                  </div>
                </div>

                <div className="h-px bg-[var(--border-subtle)]" />

                {/* Row 2: Inference */}
                <div>
                  <div className="text-[10px] font-medium font-sans text-[var(--text-tertiary)]">
                    Inference
                  </div>
                  <div className="text-[13px] font-normal font-sans text-[var(--text-primary)] mt-0.5">
                    A sub-second circuit breaker routing to backup bank nodes would salvage an estimated{' '}
                    <span className="font-mono font-semibold text-[var(--signal-green)]">
                      ₹18.4L in weekly volume
                    </span>
                    .
                  </div>
                </div>

                <div className="h-px bg-[var(--border-subtle)]" />

                {/* Row 3: Action */}
                <div>
                  <div className="text-[10px] font-medium font-sans text-[var(--signal-blue)]">
                    Action
                  </div>
                  <div className="text-[13px] font-semibold font-['Space_Grotesk',sans-serif] text-[var(--text-primary)] mt-0.5">
                    Convert this signal into Opportunity #014 for RICE scoring.
                  </div>
                </div>
              </div>

              {/* Action Buttons: Left-aligned, no arrows */}
              <div className="pt-3 border-t border-[var(--border-subtle)] flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handleConvertToOpportunity(selectedItem)}
                  className="px-4 py-2 rounded-[var(--radius-sm)] bg-[var(--signal-blue)] hover:bg-[var(--signal-blue-dim)] text-white text-[13px] font-semibold font-sans transition-colors cursor-pointer"
                >
                  Convert to opportunity
                </button>

                <button
                  onClick={() => handleAddToRoadmap(selectedItem)}
                  className="px-4 py-2 rounded-[var(--radius-sm)] bg-transparent hover:bg-[var(--surface-2)] border border-[var(--border-default)] text-[var(--text-primary)] text-[13px] font-medium font-sans transition-colors cursor-pointer"
                >
                  Add to roadmap
                </button>

                <button
                  onClick={() => handleArchive(selectedItem.id)}
                  className="px-2 py-2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] text-[13px] font-normal font-sans transition-colors cursor-pointer bg-transparent border-0"
                >
                  Archive
                </button>
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-[12px] text-[var(--text-tertiary)] font-sans">
              Select a signal from the inbox to inspect details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
