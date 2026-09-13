import React from 'react';
import {
  Search,
  BookOpen,
  Layers,
  ChevronDown,
  ArrowUpRight
} from 'lucide-react';
import type { NavigationTab } from '../../types/finpilot';

interface AppHeaderProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onOpenCommandPalette: () => void;
  onOpenCaseStudy: () => void;
  isLandingMode: boolean;
  onToggleMode: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  onSelectTab,
  onOpenCommandPalette,
  onOpenCaseStudy,
  isLandingMode,
  onToggleMode,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#07080a]/95 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Brand & Workspace */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => onSelectTab(isLandingMode ? 'landing' : 'overview')}
            className="flex items-center gap-2.5 cursor-pointer group text-left"
          >
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center font-mono font-bold text-xs text-white shadow-sm shadow-blue-600/30">
              FP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm tracking-tight text-white group-hover:text-blue-400 transition-colors">
                  FinPilot
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 border border-white/[0.08] px-1.5 py-0.2 rounded">
                  OS v2.4
                </span>
              </div>
            </div>
          </button>

          <div className="hidden md:flex items-center gap-1.5 pl-3 border-l border-white/[0.08] text-xs text-zinc-400">
            <span className="text-zinc-500">Pod:</span>
            <span className="font-medium text-zinc-200">UPI Acquiring & Core Banking</span>
            <ChevronDown className="w-3 h-3 text-zinc-600" />
          </div>
        </div>

        {/* Center: System Ingestion Status */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.02] border border-white/[0.06] text-[11px] font-mono text-zinc-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>ClickHouse Live · 4.2M events/day ingested</span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Global Search Command Bar Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-xs text-zinc-400 hover:text-zinc-200 cursor-pointer transition-colors"
          >
            <Search className="w-3.5 h-3.5 text-zinc-500" />
            <span className="hidden sm:inline">Search & Actions</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-mono bg-white/[0.06] px-1.5 py-0.5 rounded text-zinc-400">
              ⌘K
            </kbd>
          </button>

          {/* PM Portfolio Case Study Button */}
          <button
            onClick={onOpenCaseStudy}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-xs text-zinc-300 hover:text-white cursor-pointer transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            <span>AI PM Case Study</span>
          </button>

          {/* Toggle between Product Landing Story & Interactive App */}
          <button
            onClick={onToggleMode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold cursor-pointer shadow-sm shadow-blue-600/30 transition-all"
          >
            {isLandingMode ? (
              <>
                <span>Open FinPilot OS</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                <Layers className="w-3.5 h-3.5" />
                <span>Product Tour</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
