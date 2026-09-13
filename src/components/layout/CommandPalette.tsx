import React, { useState, useEffect } from 'react';
import {
  Search,
  Sparkles,
  SlidersHorizontal,
  FileText,
  FlaskConical,
  BarChart3,
  BookOpen,
  ArrowRight,
  Inbox,
  AlertTriangle,
  Radio,
  Terminal,
  Database,
  Settings,
  LayoutDashboard
} from 'lucide-react';
import type { NavigationTab } from '../../types/tapwise';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (tab: NavigationTab, actionPayload?: any) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectAction,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const actions = [
    {
      id: 'cmd-why',
      icon: AlertTriangle,
      title: 'Why did payment success drop?',
      subtitle: 'Analyze +7.4% failures in ₹10k+ transactions and bank timeout clusters',
      tab: 'insights' as NavigationTab,
      category: 'Intelligence',
    },
    {
      id: 'cmd-overview',
      icon: LayoutDashboard,
      title: 'Go to Overview Cockpit',
      subtitle: 'Executive metrics, product health scorecard, and telemetry feed',
      tab: 'overview' as NavigationTab,
      category: 'Navigation',
    },
    {
      id: 'cmd-signals',
      icon: Radio,
      title: 'View Active Product Signals',
      subtitle: '5 active signals in triage queue across ClickHouse & NPCI',
      tab: 'signals' as NavigationTab,
      category: 'Navigation',
    },
    {
      id: 'cmd-opp',
      icon: Inbox,
      title: 'Find my biggest opportunity.',
      subtitle: 'Open Opportunity #014: High-Value Payment Routing (₹18.4L GMV/wk)',
      tab: 'opportunities' as NavigationTab,
      category: 'Intelligence',
    },
    {
      id: 'cmd-prioritize',
      icon: SlidersHorizontal,
      title: 'Prioritize roadmap with RICE / ICE.',
      subtitle: 'Simulate RICE ranking scenarios and sensitivity trade-offs',
      tab: 'prioritize' as NavigationTab,
      category: 'Execution',
    },
    {
      id: 'cmd-challenge',
      icon: Sparkles,
      title: 'Challenge my roadmap assumptions.',
      subtitle: 'Examine missing assumptions, device regressions, and confidence limits',
      tab: 'prioritize' as NavigationTab,
      category: 'Execution',
    },
    {
      id: 'cmd-prd',
      icon: FileText,
      title: 'Generate engineering-ready PRD.',
      subtitle: 'Open PRD Workspace with Gherkin user stories & rollout criteria',
      tab: 'prds' as NavigationTab,
      category: 'Execution',
    },
    {
      id: 'cmd-experiment',
      icon: FlaskConical,
      title: 'Design A/B Causal Experiment.',
      subtitle: 'Design A/B test with sample size, MDE, and circuit breaker guardrails',
      tab: 'experiments' as NavigationTab,
      category: 'Execution',
    },
    {
      id: 'cmd-analytics',
      icon: BarChart3,
      title: 'Query ClickHouse Telemetry.',
      subtitle: 'Natural language to ClickHouse SQL across 4.2M transactions',
      tab: 'analytics' as NavigationTab,
      category: 'Deep Systems',
    },
    {
      id: 'cmd-copilot',
      icon: Terminal,
      title: 'Open Contextual AI Copilot.',
      subtitle: 'Ask TapWise anything: decisions, trade-offs, metrics, or causal factors',
      tab: 'ai_copilot' as NavigationTab,
      category: 'Deep Systems',
    },
    {
      id: 'cmd-data',
      icon: Database,
      title: 'Inspect Data Sources.',
      subtitle: '5 active telemetry feeds: ClickHouse, NPCI, Zendesk, Segment, Statsig',
      tab: 'data_sources' as NavigationTab,
      category: 'Configuration',
    },
    {
      id: 'cmd-settings',
      icon: Settings,
      title: 'Configure Sentry Settings.',
      subtitle: 'Anomaly sensitivity, confidence floors, and alert webhooks',
      tab: 'settings' as NavigationTab,
      category: 'Configuration',
    },
    {
      id: 'cmd-case-study',
      icon: BookOpen,
      title: 'Read AI PM Portfolio Case Study.',
      subtitle: 'Architecture, trade-offs, metrics, and multi-agent system design',
      tab: 'landing' as NavigationTab,
      category: 'Portfolio',
    },
  ];

  const filtered = actions.filter(
    (s) =>
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      s.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          onSelectAction(filtered[selectedIndex].tab);
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, filtered, selectedIndex, onSelectAction]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/85 backdrop-blur-sm select-none">
      <div className="w-full max-w-2xl bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px] shadow-2xl overflow-hidden flex flex-col">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#1D1D1D] bg-[#0A0A0A]">
          <Search className="w-4 h-4 text-[#8A8A8A] flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search actions..."
            className="flex-1 bg-transparent text-sm text-[#F5F5F0] placeholder:text-[#525252] outline-none font-mono-tech"
          />
          <button
            onClick={onClose}
            className="text-[#8A8A8A] hover:text-[#F5F5F0] text-xs font-mono-tech px-2 py-0.5 rounded-[2px] border border-[#2E2E2E] cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Suggestion list */}
        <div className="max-h-96 overflow-y-auto p-2 flex flex-col gap-1">
          <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[#525252] px-3 py-1.5">
            COMMANDS & SHORTCUT ACTIONS ({filtered.length})
          </span>
          {filtered.map((item, idx) => {
            const Icon = item.icon;
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectAction(item.tab);
                  onClose();
                }}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`flex items-start gap-3 p-3 rounded-[3px] text-left cursor-pointer transition-colors ${
                  isSelected ? 'bg-[#141414] border-l-2 border-[#0066FF]' : 'hover:bg-[#0E0E0E]'
                }`}
              >
                <div className={`w-7 h-7 rounded-[2px] border flex items-center justify-center flex-shrink-0 transition-colors mt-0.5 ${
                  isSelected
                    ? 'bg-[#141414] border-[#0066FF]/40 text-[#0066FF]'
                    : 'bg-[#101010] border-[#1D1D1D] text-[#8A8A8A]'
                }`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0 font-mono-tech">
                  <div className="flex items-center gap-2">
                    <p className={`text-xs font-bold transition-colors ${
                      isSelected ? 'text-[#F5F5F0]' : 'text-[#8A8A8A]'
                    }`}>
                      {item.title}
                    </p>
                    <span className="text-[9px] px-1.5 py-0.2 rounded-[2px] bg-[#141414] text-[#525252]">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8A8A8A] truncate mt-0.5">{item.subtitle}</p>
                </div>
                <ArrowRight className={`w-3.5 h-3.5 flex-shrink-0 mt-1 ${
                  isSelected ? 'text-[#F5F5F0]' : 'text-[#525252]'
                }`} />
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-[#050505] border-t border-[#1D1D1D] flex items-center justify-between text-[10px] font-mono-tech text-[#525252]">
          <span>Navigate with ↑ ↓ and ↵ to execute</span>
          <span className="text-[#8A8A8A]">TAPWISE COMMAND PALETTE</span>
        </div>
      </div>
    </div>
  );
};
