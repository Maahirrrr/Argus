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
        else onClose(); // parent handles toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const suggestions = [
    {
      id: 'cmd-failures',
      icon: AlertTriangle,
      title: 'Analyze payment failure surge (+7.4%)',
      subtitle: 'View ClickHouse telemetry decomposition & bank timeout cluster',
      tab: 'insights' as NavigationTab,
    },
    {
      id: 'cmd-opp',
      icon: Inbox,
      title: 'Find product opportunities',
      subtitle: 'Open Opportunity Inbox (Opportunity #014: High-Value Failures)',
      tab: 'opportunities' as NavigationTab,
    },
    {
      id: 'cmd-prioritize',
      icon: SlidersHorizontal,
      title: 'Prioritize roadmap & run Decision Simulator',
      subtitle: 'Simulate engineering effort 5 → 8 sprints and examine RICE shifts',
      tab: 'prioritize' as NavigationTab,
    },
    {
      id: 'cmd-prd',
      icon: FileText,
      title: 'Create PRD: Dynamic Multi-Bank Routing',
      subtitle: 'Generate engineering-ready specs with Gherkin acceptance criteria',
      tab: 'prds' as NavigationTab,
    },
    {
      id: 'cmd-challenge',
      icon: Sparkles,
      title: 'Challenge PRD assumptions with AI Critic',
      subtitle: 'Identify unverified assumptions, device edge cases, and test hypotheses',
      tab: 'prds' as NavigationTab,
    },
    {
      id: 'cmd-experiment',
      icon: FlaskConical,
      title: 'Design A/B experiment for real-time failover',
      subtitle: 'Configure sample size, MDE, and automated circuit breaker guardrails',
      tab: 'experiments' as NavigationTab,
    },
    {
      id: 'cmd-analytics',
      icon: BarChart3,
      title: 'Ask ClickHouse: Why did payment success drop?',
      subtitle: 'Query 4.2M event warehouse in natural language',
      tab: 'analytics' as NavigationTab,
    },
    {
      id: 'cmd-case-study',
      icon: BookOpen,
      title: 'Read AI PM Portfolio Case Study',
      subtitle: 'Product design, architecture, metrics, and ethical trade-offs',
      tab: 'landing' as NavigationTab,
      isCaseStudy: true,
    },
  ];

  const filtered = suggestions.filter((s) =>
    s.title.toLowerCase().includes(query.toLowerCase()) ||
    s.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl rounded-xl bg-[#0b0c10] border border-white/[0.12] shadow-2xl overflow-hidden flex flex-col">
        {/* Input bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.08] bg-white/[0.01]">
          <Search className="w-4 h-4 text-zinc-400 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What are you trying to understand? (e.g. 'payment failures', 'prioritize', 'PRD')..."
            className="flex-1 bg-transparent text-sm text-white placeholder:text-zinc-500 outline-none font-medium"
          />
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-300 text-xs font-mono px-1.5 py-0.5 rounded border border-white/[0.08] cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Suggestion list */}
        <div className="max-h-96 overflow-y-auto p-2 flex flex-col gap-1">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 px-3 py-1.5">
            Suggested Actions
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
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/[0.04] text-left cursor-pointer transition-colors group"
              >
                <div className="w-7 h-7 rounded-md bg-white/[0.04] border border-white/[0.08] flex items-center justify-center flex-shrink-0 text-zinc-400 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-colors mt-0.5">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white group-hover:text-blue-300 transition-colors">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-zinc-400 truncate mt-0.5">{item.subtitle}</p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-300 flex-shrink-0 mt-1" />
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-black/40 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span>Navigate with ↵ or click</span>
          <span>FinPilot Decision Copilot</span>
        </div>
      </div>
    </div>
  );
};
