import React, { useState } from 'react';
import {
  Activity,
  SlidersHorizontal,
  FileText,
  FlaskConical,
  BarChart3,
  Bot,
  Layers,
  ChevronDown
} from 'lucide-react';
import type { ModuleType, ProductProblem } from '../types/finpilot';
import { FINTECH_PROBLEMS } from '../data/fintechScenarios';

interface HeaderProps {
  activeModule: ModuleType;
  onSelectModule: (m: ModuleType) => void;
  selectedProblem: ProductProblem;
  onSelectProblem: (p: ProductProblem) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeModule,
  onSelectModule,
  selectedProblem,
  onSelectProblem,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navItems: { id: ModuleType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'intelligence', label: 'Intelligence', icon: Activity },
    { id: 'prioritization', label: 'Prioritize', icon: SlidersHorizontal },
    { id: 'prd', label: 'PRD Copilot', icon: FileText },
    { id: 'experiment', label: 'Experiment', icon: FlaskConical },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'weekly_agent', label: 'Weekly Agent', icon: Bot },
    { id: 'brain_feed', label: 'Brain Feed', icon: Layers },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#07080b]/95 backdrop-blur-xl border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-gradient-to-br from-indigo-500/20 via-cyan-500/20 to-indigo-600/30 border border-indigo-500/40 flex items-center justify-center shadow-md shadow-indigo-500/10">
            <span className="font-mono font-black text-xs text-cyan-300 tracking-wider">FP</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-syne font-extrabold text-base tracking-tight text-white">FinPilot</span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 font-semibold">
                Cursor for Fintech PMs
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 hidden sm:block">AI Product Intelligence & Decision Engine</p>
          </div>
        </div>

        {/* Center: Module Navigation Pills */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.08]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectModule(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Problem Scenario Dropdown Selector */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs text-zinc-200 cursor-pointer transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
            <span className="font-medium truncate max-w-[150px] sm:max-w-[200px]">
              {selectedProblem.metric}: {selectedProblem.current}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#0b0c12] border border-white/10 shadow-2xl p-2 z-50 flex flex-col gap-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 px-3 py-1">
                Simulated Fintech Incidents
              </span>
              {FINTECH_PROBLEMS.map((prob) => (
                <button
                  key={prob.id}
                  onClick={() => {
                    onSelectProblem(prob);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl text-xs transition-all cursor-pointer ${
                    selectedProblem.id === prob.id
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 font-semibold'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-syne font-bold text-white text-xs">{prob.metric}</span>
                    <span className="font-mono text-[10px] text-rose-400">{prob.delta}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 truncate mt-0.5">{prob.title}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
