import React from 'react';
import {
  LayoutDashboard,
  Radio,
  Sparkles,
  Inbox,
  SlidersHorizontal,
  FileText,
  FlaskConical,
  BarChart3,
  Terminal,
  Database,
  Settings,
  Calendar
} from 'lucide-react';
import type { NavigationTab } from '../../types/tapwise';

interface AppSidebarProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  unresolvedSignalsCount?: number;
  unresolvedOpportunitiesCount?: number;
}

interface NavItem {
  id: NavigationTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  shortcut?: string;
  badge?: number | string;
  badgeColor?: string;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  activeTab,
  onSelectTab,
  unresolvedSignalsCount = 5,
  unresolvedOpportunitiesCount = 3,
}) => {
  const intelligenceNav: NavItem[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, shortcut: 'G O' },
    { id: 'signals', label: 'Signals', icon: Radio, badge: unresolvedSignalsCount, badgeColor: '#EF4444', shortcut: 'G S' },
    { id: 'insights', label: 'Insights', icon: Sparkles, shortcut: 'G I' },
    { id: 'opportunities', label: 'Opportunities', icon: Inbox, badge: unresolvedOpportunitiesCount, badgeColor: '#0066FF' },
  ];

  const executionNav: NavItem[] = [
    { id: 'prioritize', label: 'Prioritize', icon: SlidersHorizontal, shortcut: 'G P' },
    { id: 'prds', label: 'PRDs', icon: FileText, shortcut: 'G R' },
    { id: 'experiments', label: 'Experiments', icon: FlaskConical, shortcut: 'G E' },
  ];

  const deepSystemsNav: NavItem[] = [
    { id: 'analytics', label: 'Analytics', icon: BarChart3, shortcut: 'G A' },
    { id: 'ai_copilot', label: 'AI Copilot', icon: Terminal, shortcut: 'G C' },
    { id: 'weekly_review', label: 'Weekly Review', icon: Calendar },
  ];

  const configNav: NavItem[] = [
    { id: 'data_sources', label: 'Data Sources', icon: Database },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderNavGroup = (title: string, items: NavItem[]) => (
    <div className="flex flex-col gap-0.5">
      <span className="px-3 py-1 text-[10px] font-mono-tech text-[#525252] uppercase tracking-wider font-bold">
        {title}
      </span>
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            className={`group relative w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-[3px] transition-all duration-150 cursor-pointer ${
              isActive
                ? 'bg-[#141414] text-[#F5F5F0]'
                : 'text-[#8A8A8A] hover:text-[#F5F5F0] hover:bg-[#101010]'
            }`}
          >
            {/* Left active line */}
            {isActive && (
              <span className="absolute left-0 top-1 bottom-1 w-[2px] bg-[#0066FF] rounded-r" />
            )}

            <div className="flex items-center gap-2.5 transition-transform duration-150 group-hover:translate-x-[2px]">
              <Icon
                className={`w-4 h-4 transition-colors ${
                  isActive ? 'text-[#0066FF]' : 'text-[#525252] group-hover:text-[#8A8A8A]'
                }`}
              />
              <span>{item.label}</span>
            </div>

            <div className="flex items-center gap-1.5">
              {'badge' in item && item.badge !== undefined && (
                <span
                  className="text-[9px] font-mono-tech px-1.5 py-0.2 rounded-[2px]"
                  style={{
                    backgroundColor: `${item.badgeColor || '#0066FF'}18`,
                    color: item.badgeColor || '#0066FF',
                    border: `1px solid ${item.badgeColor || '#0066FF'}30`,
                  }}
                >
                  {item.badge}
                </span>
              )}

              {'shortcut' in item && (
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[9px] font-mono-tech text-[#525252]">
                  {item.shortcut}
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );

  return (
    <aside className="hidden md:flex w-60 flex-shrink-0 bg-[#0A0A0A] border-r border-[#1D1D1D] flex-col justify-between select-none min-h-[calc(100vh-68px)]">
      {/* Navigation groups */}
      <div className="py-4 px-3 flex flex-col gap-4 overflow-y-auto">
        {renderNavGroup('Core Intelligence', intelligenceNav)}
        {renderNavGroup('Execution Engine', executionNav)}
        {renderNavGroup('Deep Systems', deepSystemsNav)}
        {renderNavGroup('Configuration', configNav)}
      </div>

      {/* Bottom Status Feed */}
      <div className="p-3 border-t border-[#1D1D1D] text-[10px] font-mono-tech text-[#525252] flex flex-col gap-1.5 bg-[#080808]">
        <div className="flex items-center justify-between">
          <span>ENVIRONMENT</span>
          <span className="text-[#8A8A8A]">DEMO WORKSPACE</span>
        </div>
        <div className="flex items-center justify-between">
          <span>TELEMETRY FEED</span>
          <span className="text-[#10B981] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse-dot" />
            STREAMING (4.2M)
          </span>
        </div>
      </div>
    </aside>
  );
};
