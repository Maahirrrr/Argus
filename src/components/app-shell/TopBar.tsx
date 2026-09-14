import React, { useState } from 'react';
import { Breadcrumbs } from './Breadcrumbs';
import { QuickCreateMenu } from './QuickCreateMenu';
import { NotificationCenter } from './NotificationCenter';
import { AccountMenu } from './AccountMenu';
import { ChevronDown, Search, Command } from 'lucide-react';
import type { NavigationTab } from '../../types/argus';

interface TopBarProps {
  activeTab: NavigationTab;
  onNavigateTab: (tab: NavigationTab) => void;
  onOpenCommandPalette: () => void;
  onOpenShortcuts: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  onNavigateTab,
  onOpenCommandPalette,
  onOpenShortcuts,
}) => {
  const [selectedProject, setSelectedProject] = useState('All Projects');
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);

  const projects = ['All Projects', 'Core Checkout Switch', 'Android Instant Intent', 'Merchant Analytics V2'];

  return (
    <header className="sticky top-0 z-40 w-full h-14 bg-[#000000] border-b border-[rgba(255,255,255,0.08)] px-4 sm:px-6 flex items-center justify-between select-none">
      {/* Left: Breadcrumbs & Project Scope */}
      <div className="flex items-center gap-3">
        <Breadcrumbs activeTab={activeTab} onNavigateTab={onNavigateTab} />

        <span className="text-[#333333] hidden sm:inline">|</span>

        {/* Project Context Selector */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
            className="flex items-center gap-1 px-2 py-1 rounded-[4px] bg-[#0A0A0A] hover:bg-[#121212] border border-[rgba(255,255,255,0.08)] text-xs text-[#A1A1A1] hover:text-[#EDEDED] font-mono-tech transition-colors cursor-pointer"
          >
            <span className="truncate max-w-[130px]">{selectedProject}</span>
            <ChevronDown className="w-3 h-3 text-[#666666]" />
          </button>

          {isProjectDropdownOpen && (
            <div className="absolute left-0 top-full mt-1 z-50 w-48 p-1 bg-[#0A0A0A] border border-[rgba(255,255,255,0.10)] rounded-[6px] shadow-xl animate-fade-in-scale">
              <div className="px-2 py-1 text-[10px] uppercase font-mono-tech text-[#666666]">
                Scope Project
              </div>
              {projects.map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setSelectedProject(p);
                    setIsProjectDropdownOpen(false);
                  }}
                  className={`w-full text-left px-2 py-1 text-xs rounded-[3px] truncate transition-colors cursor-pointer ${
                    selectedProject === p ? 'bg-[#141414] text-[#EDEDED] font-medium' : 'text-[#A1A1A1] hover:text-[#EDEDED] hover:bg-[#101010]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Honest Simulation State Pill */}
        <div className="hidden lg:flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-[#121212] border border-[rgba(255,255,255,0.08)] text-[9px] font-mono-tech text-[#F59E0B]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
          <span>SIMULATION MODE</span>
        </div>
      </div>

      {/* Right: Quick Action, Search, Notifications, Account */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Quick Create Action */}
        <QuickCreateMenu onNavigateTab={onNavigateTab} />

        {/* Search button */}
        <button
          onClick={onOpenCommandPalette}
          className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-[6px] bg-[#0A0A0A] hover:bg-[#121212] border border-[rgba(255,255,255,0.08)] text-xs text-[#A1A1A1] hover:text-[#EDEDED] transition-colors cursor-pointer"
          title="Search or command (⌘K)"
        >
          <Search className="w-3.5 h-3.5 text-[#666666]" />
          <span className="text-[11px] font-mono-tech">Find</span>
          <kbd className="text-[10px] font-mono-tech text-[#666666] flex items-center">
            <Command className="w-2.5 h-2.5 inline mr-0.5" />K
          </kbd>
        </button>

        {/* Notifications */}
        <NotificationCenter onNavigateTab={onNavigateTab} />

        {/* User Account Menu */}
        <AccountMenu onNavigateTab={onNavigateTab} onOpenShortcuts={onOpenShortcuts} />
      </div>
    </header>
  );
};
