import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from './Breadcrumbs';
import { ChevronDown, Bell } from 'lucide-react';
import type { NavigationTab } from '../../types/argus';
import { demoSignalProvider } from '../argus/ArgusSignalFabric/simulationEngine';

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
  const [isSimulating, setIsSimulating] = useState(() => demoSignalProvider.isSimulating());
  const [hasAlerts] = useState(true);

  useEffect(() => {
    const unsubscribe = demoSignalProvider.subscribe(() => {
      setIsSimulating(demoSignalProvider.isSimulating());
    });
    return () => unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full h-[44px] bg-[var(--surface-0)] border-b border-[var(--border-subtle)] px-4 sm:px-6 flex items-center justify-between select-none">
      {/* Left: Breadcrumbs */}
      <div className="flex items-center gap-3">
        <Breadcrumbs activeTab={activeTab} onNavigateTab={onNavigateTab} />
      </div>

      {/* Center: Project Selector & Simulation Indicator */}
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenCommandPalette}
          className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-[var(--radius-sm)] text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-2)] transition-colors cursor-pointer"
        >
          <span>All Projects</span>
          <ChevronDown className="w-3 h-3 text-[var(--text-tertiary)]" />
        </button>

        {/* Simulation mode indicator: small 6px dot + text, no pulse, only visible when running */}
        {isSimulating && (
          <div className="flex items-center gap-1.5 text-[11px] font-sans text-[var(--signal-amber)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal-amber)]" />
            <span>Simulation</span>
          </div>
        )}
      </div>

      {/* Right Cluster: "New" button, Bell icon, 28px avatar */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onNavigateTab('prds')}
          className="px-3 py-1.5 rounded-[var(--radius-sm)] bg-[var(--signal-blue)] hover:bg-[var(--signal-blue-dim)] text-white text-[13px] font-medium font-sans transition-colors cursor-pointer"
        >
          New
        </button>

        <button
          onClick={() => onNavigateTab('inbox')}
          className="p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer relative"
          title="Alerts"
        >
          <Bell className="w-4 h-4" />
          {hasAlerts && (
            <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-[var(--signal-red)]" />
          )}
        </button>

        <div
          onClick={() => onNavigateTab('settings')}
          className="w-7 h-7 rounded-full bg-[var(--surface-3)] border border-[var(--border-default)] flex items-center justify-center text-[11px] font-medium text-[var(--text-primary)] font-sans cursor-pointer hover:border-[var(--border-strong)] transition-colors"
          title="Account Settings"
        >
          PM
        </div>
      </div>
    </header>
  );
};
