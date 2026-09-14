import React from 'react';
import {
  LayoutDashboard,
  Activity,
  Zap,
  Scale,
  FileText,
  FlaskConical,
  Terminal,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  Command
} from 'lucide-react';
import { ArgusLogo } from '../ui/ArgusLogo';
import { SidebarItem } from './SidebarItem';
import type { NavigationTab } from '../../types/argus';

interface SidebarProps {
  activeTab: NavigationTab;
  onNavigateTab: (tab: NavigationTab) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onOpenCommandPalette: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onNavigateTab,
  isCollapsed,
  onToggleCollapse,
  onOpenCommandPalette,
}) => {
  // The 7 Core Operational Modules specified for Fintech Product Management
  const coreModules = [
    { id: 'home' as NavigationTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'signals' as NavigationTab, label: 'Anomaly Sentry', icon: Activity, badge: 'LIVE', badgeColor: 'bg-[#FF3B30]/20 text-[#FF3B30] border border-[#FF3B30]/30' },
    { id: 'chaos' as NavigationTab, label: 'Chaos Lab', icon: Zap },
    { id: 'prioritize' as NavigationTab, label: 'RICE Workbench', icon: Scale },
    { id: 'prds' as NavigationTab, label: 'PRD Studio', icon: FileText },
    { id: 'experiments' as NavigationTab, label: 'Experiment Lab', icon: FlaskConical },
    { id: 'analytics' as NavigationTab, label: 'Telemetry Copilot', icon: Terminal },
  ];

  return (
    <aside
      className={`h-screen hidden md:flex flex-col flex-shrink-0 justify-between bg-[#0A0A0A] border-r border-[#1A1A1A] transition-[width] duration-200 ease-out select-none z-30 ${
        isCollapsed ? 'w-[48px]' : 'w-[240px]'
      }`}
    >
      {/* 1. Brand Header */}
      <div>
        <div className="h-[48px] px-3 border-b border-[#1A1A1A] flex items-center justify-between">
          <div
            onClick={() => onNavigateTab('home')}
            className="flex items-center gap-2 cursor-pointer no-underline text-inherit group"
          >
            <ArgusLogo size="sm" variant="default" withText={!isCollapsed} />
          </div>

          <button
            onClick={onToggleCollapse}
            className="p-1 text-[#6B7280] hover:text-[#FFFFFF] rounded hover:bg-[#111111] transition-colors cursor-pointer"
            title={isCollapsed ? 'Expand sidebar (240px)' : 'Collapse sidebar (48px)'}
          >
            {isCollapsed ? (
              <PanelLeftOpen className="w-3.5 h-3.5" />
            ) : (
              <PanelLeftClose className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* 2. Primary Navigation - 7 Core Modules */}
        <nav className="py-3 space-y-0.5">
          {!isCollapsed && (
            <div className="px-3 pb-2 text-[11px] font-medium text-[#6B7280] font-sans">
              Operational Modules
            </div>
          )}
          {coreModules.map((item) => {
            const isActive =
              activeTab === item.id ||
              (item.id === 'home' && activeTab === 'overview');
            return (
              <SidebarItem
                key={item.id}
                id={item.id}
                label={item.label}
                icon={item.icon}
                isActive={isActive}
                isCollapsed={isCollapsed}
                badge={item.badge}
                badgeColor={item.badgeColor}
                onClick={() => onNavigateTab(item.id)}
              />
            );
          })}
        </nav>
      </div>

      {/* 3. Footer: Command Palette Trigger & Settings */}
      <div className="p-2 border-t border-[#1A1A1A] space-y-1">
        {!isCollapsed ? (
          <button
            onClick={onOpenCommandPalette}
            className="w-full flex items-center justify-between px-2.5 py-1.5 rounded bg-[#111111] hover:bg-[#161616] border border-[#1A1A1A] text-xs text-[#6B7280] hover:text-[#FFFFFF] transition-colors cursor-pointer"
          >
            <span className="text-[12px] font-sans">Quick search</span>
            <kbd className="px-1.5 py-0.5 rounded bg-[#0A0A0A] border border-[#1A1A1A] text-[10px] font-mono text-[#9CA3AF]">
              ⌘K
            </kbd>
          </button>
        ) : (
          <button
            onClick={onOpenCommandPalette}
            className="w-full flex justify-center p-2 text-[#6B7280] hover:text-[#FFFFFF] rounded hover:bg-[#111111] transition-colors cursor-pointer"
            title="Search (⌘K)"
          >
            <Command className="w-4 h-4" />
          </button>
        )}

        <SidebarItem
          id={'settings' as NavigationTab}
          label="Settings"
          icon={Settings}
          isActive={activeTab === 'settings'}
          isCollapsed={isCollapsed}
          onClick={() => onNavigateTab('settings')}
        />
      </div>
    </aside>
  );
};
