import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  ArrowRight,
  Lightbulb,
  FileText,
  FlaskConical,
  LayoutDashboard,
  Radar,
  Settings,
  Layers,
  Terminal,
  Users,
  MessageSquare,
  GitBranch,
  BarChart3,
  CalendarDays,
  Plus
} from 'lucide-react';
import type { NavigationTab } from '../../types/argus';

interface GlobalCommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: NavigationTab) => void;
}

interface CommandItem {
  category: 'Navigate' | 'Create' | 'AI Action' | 'Entities' | 'Settings';
  label: string;
  detail?: string;
  tab: NavigationTab;
  icon: React.FC<{ className?: string }>;
}

export const GlobalCommandPalette: React.FC<GlobalCommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const baseCommands: CommandItem[] = [
    // Navigate
    { category: 'Navigate', label: 'Cockpit Home', detail: 'Central command telemetry', tab: 'home', icon: LayoutDashboard },
    { category: 'Navigate', label: "Today's Priorities", detail: 'Critical items and daily standup', tab: 'signals', icon: CalendarDays },
    { category: 'Navigate', label: 'Opportunities Tree', detail: 'Backlog and conviction scoring', tab: 'opportunities', icon: Lightbulb },
    { category: 'Navigate', label: 'PRDs & Specifications', detail: 'Product requirements documents', tab: 'prds', icon: FileText },
    { category: 'Navigate', label: 'Intelligence Radar', detail: 'Cross-channel signal correlation', tab: 'intelligence', icon: Radar },
    { category: 'Navigate', label: 'Customer Feedback', detail: 'Raw feedback and sentiment', tab: 'feedback', icon: MessageSquare },
    { category: 'Navigate', label: 'Customer Personas', detail: 'Profiles and account cohorts', tab: 'customers', icon: Users },
    { category: 'Navigate', label: 'Experiments Lab', detail: 'A/B hypothesis validation', tab: 'experiments', icon: FlaskConical },
    { category: 'Navigate', label: 'Decisions Log', detail: 'Architectural and product choices', tab: 'decisions', icon: GitBranch },
    { category: 'Navigate', label: 'Analytics Telemetry', detail: 'Pillar metrics & funnel health', tab: 'analytics', icon: BarChart3 },

    // Create
    { category: 'Create', label: 'New Opportunity', detail: 'Turn signals into product bets', tab: 'opportunities', icon: Plus },
    { category: 'Create', label: 'Draft PRD Spec', detail: 'Initialize AI-assisted specification', tab: 'prds', icon: Plus },
    { category: 'Create', label: 'Log Incident Signal', detail: 'Inject manual anomaly into pipeline', tab: 'signals', icon: Plus },
    { category: 'Create', label: 'Record Product Decision', detail: 'Document architectural consensus', tab: 'decisions', icon: Plus },

    // AI Action
    { category: 'AI Action', label: "Summarize This Week's Feedback", detail: 'Run cluster sentiment synthesis', tab: 'feedback', icon: Layers },
    { category: 'AI Action', label: 'Show High-Impact Signals', detail: 'Filter anomalies > 85% conviction', tab: 'signals', icon: Layers },
    { category: 'AI Action', label: 'Analyze Conversion Bottlenecks', detail: 'Deep funnel diagnostic', tab: 'analytics', icon: Terminal },

    // Settings
    { category: 'Settings', label: 'Workspace Configuration', detail: 'Team, API keys, integrations', tab: 'settings', icon: Settings },
  ];

  const filtered = baseCommands.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase()) ||
    (a.detail && a.detail.toLowerCase().includes(query.toLowerCase()))
  );

  // Dynamic "Ask AI" item if query is present
  const showAskAI = query.trim().length > 2;

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      const totalItems = filtered.length + (showAskAI ? 1 : 0);

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < totalItems - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : totalItems - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (showAskAI && selectedIndex === 0) {
          onNavigateTab('ai_lab');
          onClose();
        } else {
          const itemIdx = showAskAI ? selectedIndex - 1 : selectedIndex;
          if (filtered[itemIdx]) {
            onNavigateTab(filtered[itemIdx].tab);
            onClose();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, showAskAI, onNavigateTab, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-[3px] animate-fade-in-scale">
      <div className="w-full max-w-xl bg-[#080808] border border-[rgba(255,255,255,0.12)] rounded-[8px] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center gap-2 px-3.5 py-3 border-b border-[rgba(255,255,255,0.08)] bg-[#050505]">
          <Search className="w-4 h-4 text-[#666666]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command, ask ARGUS AI, or search..."
            className="w-full bg-transparent text-sm text-[#EDEDED] placeholder-[#666666] outline-none font-mono-tech"
          />
          <kbd className="px-1.5 py-0.5 rounded-[3px] bg-[#141414] border border-[#222222] text-[10px] font-mono-tech text-[#8A8A8A]">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-1.5 space-y-0.5 scrollbar-none flex-1">
          {/* Ask AI Dynamic Row */}
          {showAskAI && (
            <div
              onClick={() => {
                onNavigateTab('ai_lab');
                onClose();
              }}
              onMouseEnter={() => setSelectedIndex(0)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-[6px] cursor-pointer transition-colors border ${
                selectedIndex === 0
                  ? 'bg-[#0066FF]/10 border-[#0066FF]/30 text-[#FFFFFF]'
                  : 'border-transparent text-[#A1A1A1] hover:bg-[#0F0F0F]'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Terminal className="w-4 h-4 text-[#0066FF] flex-shrink-0" />
                <span className="text-xs font-mono-tech text-[#EDEDED]">
                  Ask ARGUS: <span className="text-[#0066FF] font-semibold">"{query}"</span>
                </span>
              </div>
              <span className="text-[10px] font-mono-tech text-[#0066FF] uppercase">SYNTHESIS</span>
            </div>
          )}

          {filtered.length === 0 && !showAskAI ? (
            <div className="p-6 text-center text-xs text-[#666666] font-mono-tech">
              No matching commands or workspace entities found.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const actualIdx = showAskAI ? idx + 1 : idx;
              const isSelected = selectedIndex === actualIdx;
              const Icon = item.icon;
              return (
                <div
                  key={`${item.category}-${item.label}`}
                  onClick={() => {
                    onNavigateTab(item.tab);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(actualIdx)}
                  className={`flex items-center justify-between px-3 py-2 rounded-[6px] cursor-pointer transition-colors ${
                    isSelected ? 'bg-[#141414] text-[#EDEDED]' : 'text-[#A1A1A1] hover:bg-[#0C0C0C]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isSelected ? 'text-[#0066FF]' : 'text-[#666666]'}`} />
                    <div className="flex flex-col truncate">
                      <span className="text-xs truncate text-[#EDEDED]">{item.label}</span>
                      {item.detail && (
                        <span className="text-[10px] text-[#666666] font-mono-tech truncate">{item.detail}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-[9px] font-mono-tech text-[#666666] uppercase px-1.5 py-0.5 rounded bg-[#101010] border border-[rgba(255,255,255,0.06)]">
                      {item.category}
                    </span>
                    {isSelected && <ArrowRight className="w-3 h-3 text-[#0066FF]" />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-3 py-2 border-t border-[rgba(255,255,255,0.08)] bg-[#050505] flex items-center justify-between text-[10px] font-mono-tech text-[#666666]">
          <span>Navigate with ↑ ↓ · Select with ↵</span>
          <span>ARGUS Intelligence Command</span>
        </div>
      </div>
    </div>
  );
};
