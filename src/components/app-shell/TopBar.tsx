import React from 'react';
import { Breadcrumbs } from './Breadcrumbs';
import { Command } from 'lucide-react';
import type { NavigationTab } from '../../types/argus';

interface TopBarProps {
  activeTab: NavigationTab;
  onNavigateTab: (tab: NavigationTab) => void;
  onOpenCommandPalette: () => void;
  onOpenShortcuts?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  onNavigateTab,
  onOpenCommandPalette,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full h-[48px] bg-[#050505] border-b border-[#1A1A1A] px-4 sm:px-6 flex items-center justify-between select-none">
      {/* Left: Breadcrumbs showing current module + sub-view */}
      <div className="flex items-center gap-3">
        <Breadcrumbs activeTab={activeTab} onNavigateTab={onNavigateTab} />
      </div>

      {/* Center/Right: Live System Status Indicator & ⌘K Trigger. Nothing else. */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Live system status indicator: 7px dot with 3s subtle pulse + label */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#0A0A0A] border border-[#1A1A1A] text-xs font-mono text-[#D1D5DB]">
          <span className="argus-status-dot bg-[#00FF88] argus-status-dot-pulse" />
          <span className="text-[11px] text-[#9CA3AF]">UPI Gateway Nominal</span>
        </div>

        {/* Command palette trigger (⌘K) */}
        <button
          onClick={onOpenCommandPalette}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0A0A0A] hover:bg-[#111111] border border-[#1A1A1A] hover:border-[rgba(255,255,255,0.16)] text-xs text-[#9CA3AF] hover:text-[#FFFFFF] transition-colors cursor-pointer"
          title="Command Palette (⌘K)"
        >
          <span className="text-[11px] font-sans">Command</span>
          <kbd className="text-[10px] font-mono text-[#6B7280] flex items-center">
            <Command className="w-2.5 h-2.5 inline mr-0.5" />K
          </kbd>
        </button>
      </div>
    </header>
  );
};
