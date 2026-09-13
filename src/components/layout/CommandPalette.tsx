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
  AlertTriangle
} from 'lucide-react';
import type { NavigationTab } from '../../types/finpilot';

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // 33 Exact Questions & Suggestions from prompt
  const suggestions = [
    {
      id: 'cmd-why',
      icon: AlertTriangle,
      title: 'Why did payment success drop?',
      subtitle: 'Analyze +7.4% failures in ₹10k+ transactions and bank timeout clusters',
      tab: 'insights' as NavigationTab,
    },
    {
      id: 'cmd-opp',
      icon: Inbox,
      title: 'Find my biggest opportunity.',
      subtitle: 'Open Opportunity #014: High-Value Payment Routing (₹18.4L GMV/wk)',
      tab: 'opportunities' as NavigationTab,
    },
    {
      id: 'cmd-prioritize',
      icon: SlidersHorizontal,
      title: 'What should we prioritize?',
      subtitle: 'Simulate RICE ranking scenarios and sensitivity trade-offs',
      tab: 'prioritize' as NavigationTab,
    },
    {
      id: 'cmd-challenge',
      icon: Sparkles,
      title: 'Challenge my roadmap.',
      subtitle: 'Examine missing assumptions, device regressions, and confidence limits',
      tab: 'prioritize' as NavigationTab,
    },
    {
      id: 'cmd-prd',
      icon: FileText,
      title: 'Generate engineering-ready PRD.',
      subtitle: 'Open PRD Workspace with Gherkin user stories & rollout criteria',
      tab: 'prds' as NavigationTab,
    },
    {
      id: 'cmd-experiment',
      icon: FlaskConical,
      title: 'Create an experiment.',
      subtitle: 'Design A/B test with sample size, MDE, and circuit breaker guardrails',
      tab: 'experiments' as NavigationTab,
    },
    {
      id: 'cmd-analytics',
      icon: BarChart3,
      title: 'Query ClickHouse Telemetry.',
      subtitle: 'Natural language to ClickHouse SQL across 4.2M transactions',
      tab: 'analytics' as NavigationTab,
    },
    {
      id: 'cmd-case-study',
      icon: BookOpen,
      title: 'Read AI PM Portfolio Case Study.',
      subtitle: 'Architecture, trade-offs, metrics, and multi-agent system design',
      tab: 'landing' as NavigationTab,
    },
  ];

  const filtered = suggestions.filter(
    (s) =>
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/85 backdrop-blur-sm select-none">
      <div className="w-full max-w-2xl bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px] shadow-2xl overflow-hidden flex flex-col">
        {/* Centered Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#1D1D1D] bg-[#0A0A0A]">
          <Search className="w-4 h-4 text-[#8A8A8A] flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything about your product..."
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
            RECOMMENDED ACTIONS & INTELLIGENCE QUERIES
          </span>
          {filtered.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectAction(item.tab);
                  onClose();
                }}
                className="flex items-start gap-3 p-3 rounded-[3px] hover:bg-[#141414] text-left cursor-pointer transition-colors group"
              >
                <div className="w-7 h-7 rounded-[2px] bg-[#101010] border border-[#1D1D1D] flex items-center justify-center flex-shrink-0 text-[#8A8A8A] group-hover:text-[#0066FF] group-hover:border-[#0066FF]/30 transition-colors mt-0.5">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0 font-mono-tech">
                  <p className="text-xs font-bold text-[#F5F5F0] group-hover:text-white transition-colors">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-[#8A8A8A] truncate mt-0.5">{item.subtitle}</p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#525252] group-hover:text-[#F5F5F0] flex-shrink-0 mt-1" />
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-[#050505] border-t border-[#1D1D1D] flex items-center justify-between text-[10px] font-mono-tech text-[#525252]">
          <span>Navigate with ↵ or click</span>
          <span>TAPWISE PRODUCT INTELLIGENCE OS</span>
        </div>
      </div>
    </div>
  );
};
