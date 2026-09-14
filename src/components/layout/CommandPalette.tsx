import React, { useState, useEffect } from 'react';
import {
  Search,
  ArrowRight,
  FileText,
  Boxes,
  Cpu,
  CalendarRange,
  Target,
  Inbox,
  FlaskConical,
  Rocket,
  Flame,
  HelpCircle,
  X
} from 'lucide-react';
import type { NavigationTab } from '../../types/argus';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (tab: NavigationTab, actionId?: string) => void;
}

interface PaletteAction {
  id: string;
  title: string;
  description: string;
  tab: NavigationTab;
  icon: React.FC<{ className?: string }>;
  group: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectAction,
}) => {
  const [query, setQuery] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const actions: PaletteAction[] = [
    { id: 'act-inbox', title: 'Triage Unified Inbox', description: 'Review raw customer complaints, anomalies, and competitive moves', tab: 'inbox', icon: Inbox, group: 'WORK' },
    { id: 'act-opps', title: 'Open Opportunity Tree', description: 'Teresa Torres hierarchical tree of user pain points and bets', tab: 'opportunities', icon: Target, group: 'DECIDE' },
    { id: 'act-rice', title: 'RICE & WSJF Prioritization', description: 'Calculate Reach, Impact, Confidence & Effort scores', tab: 'prioritize', icon: Target, group: 'DECIDE' },
    { id: 'act-roadmap', title: 'Strategic Roadmap & Kanban', description: 'Multi-quarter roadmap with dependency conflict detection', tab: 'roadmap', icon: CalendarRange, group: 'DECIDE' },
    { id: 'act-prds', title: 'PRD Studio & BDD Spec Writer', description: 'Autonomous PRD synthesis with executable Gherkin scenarios', tab: 'prds', icon: FileText, group: 'BUILD' },
    { id: 'act-proto', title: 'Interactive Prototype Studio', description: 'Low-code UI sandbox with live semantic POS parser', tab: 'prototypes', icon: Boxes, group: 'BUILD' },
    { id: 'act-evals', title: 'AI Product Lab & LLM Evals', description: 'Benchmark Claude vs Groq, prompt versioning & batch test runner', tab: 'ai_lab', icon: Cpu, group: 'BUILD' },
    { id: 'act-exps', title: 'A/B Experiment Lab', description: 'Bayesian sequential analysis and automated rollback breakers', tab: 'experiments', icon: FlaskConical, group: 'MEASURE' },
    { id: 'act-launch', title: 'Release Center & Canary Sliders', description: 'Multi-team sign-offs, canary percentage allocation', tab: 'launch', icon: Rocket, group: 'MEASURE' },
    { id: 'act-adr', title: 'Decision Log (ADR)', description: 'Architectural decision records and tradeoff documentation', tab: 'decisions', icon: FileText, group: 'WORKSPACE' },
    { id: 'cmd-chaos', title: 'Simulate Production Chaos / Outage', description: 'Trigger NPCI switch latency spike to test automated circuit breaker', tab: 'home', icon: Flame, group: 'SYSTEM SIMULATION' },
    { id: 'cmd-tutorial', title: 'Open Interactive Guided Tutorial', description: '5-minute deep walkthrough of every core workspace feature', tab: 'home', icon: HelpCircle, group: 'SYSTEM SIMULATION' },
  ];

  const filtered = actions.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.description.toLowerCase().includes(query.toLowerCase()) ||
    a.group.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          const act = filtered[selectedIndex];
          onSelectAction(act.tab, act.id);
          onClose();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onSelectAction, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4 animate-fade-in">
      <div className="bg-[#0A0A0A] border border-[#1D1D1D] rounded-[3px] w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#1D1D1D]">
          <Search className="w-4 h-4 text-[#0066FF] mr-3" />
          <input
            autoFocus
            type="text"
            placeholder="Type a command or workspace (e.g. 'PRD', 'Evals', 'Chaos')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm font-mono-tech text-[#F5F5F0] placeholder-[#666] outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-[#8A8A8A] hover:text-[#F5F5F0]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {filtered.map((act, idx) => {
            const Icon = act.icon;
            const isSelected = idx === selectedIndex;
            return (
              <div
                key={act.id}
                onClick={() => {
                  onSelectAction(act.tab, act.id);
                  onClose();
                }}
                className={`p-3 rounded-[2px] flex items-center justify-between cursor-pointer transition-all ${
                  isSelected ? 'bg-[#0066FF] text-white' : 'hover:bg-[#121212] text-[#F5F5F0]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-[2px] flex items-center justify-center ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-[#141414] text-[#0066FF]'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold font-display">{act.title}</span>
                      <span className={`text-[9px] font-mono-tech px-1 py-0.2 rounded-[2px] ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-[#181818] text-[#8A8A8A]'
                      }`}>
                        {act.group}
                      </span>
                    </div>
                    <p className={`text-[11px] ${isSelected ? 'text-white/80' : 'text-[#8A8A8A]'}`}>
                      {act.description}
                    </p>
                  </div>
                </div>

                <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-[#444]'}`} />
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-8 text-xs font-mono-tech text-[#666]">
              No matching commands found.
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-[#080808] border-t border-[#1D1D1D] flex items-center justify-between text-[10px] font-mono-tech text-[#8A8A8A]">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span>ARGUS UNIVERSAL PALETTE</span>
        </div>
      </div>
    </div>
  );
};
