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
  Settings
} from 'lucide-react';
import type { NavigationTab } from '../../types/finpilot';

interface AppSidebarProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  unresolvedSignalsCount?: number;
  unresolvedOpportunitiesCount?: number;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  activeTab,
  onSelectTab,
  unresolvedSignalsCount = 5,
  unresolvedOpportunitiesCount = 1,
}) => {
  const primaryNavItems: {
    id: NavigationTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number | string;
    badgeColor?: string;
  }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'insights', label: 'Signals', icon: Radio, badge: unresolvedSignalsCount, badgeColor: '#EF4444' },
    { id: 'insights', label: 'Insights', icon: Sparkles },
    { id: 'opportunities', label: 'Opportunities', icon: Inbox, badge: unresolvedOpportunitiesCount, badgeColor: '#0066FF' },
    { id: 'prioritize', label: 'Prioritize', icon: SlidersHorizontal },
    { id: 'prds', label: 'PRDs', icon: FileText },
    { id: 'experiments', label: 'Experiments', icon: FlaskConical },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'weekly_review', label: 'AI Copilot', icon: Terminal },
  ];

  const secondaryNavItems: {
    id: NavigationTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { id: 'data_sources', label: 'Data', icon: Database },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-60 flex-shrink-0 bg-[#0A0A0A] border-r border-[#1D1D1D] flex flex-col justify-between select-none min-h-[calc(100vh-68px)]">
      {/* Top Navigation */}
      <div className="py-4 px-3 flex flex-col gap-1">
        <div className="px-3 pb-3 mb-2 border-b border-[#1D1D1D] flex items-center justify-between text-[10px] font-mono-tech text-[#525252]">
          <span>NAVIGATION</span>
          <span>v2.4</span>
        </div>

        {primaryNavItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id && (item.label !== 'Signals' || activeTab === 'insights');

          return (
            <button
              key={`${item.id}-${idx}`}
              onClick={() => onSelectTab(item.id)}
              className={`group relative w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-[3px] transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-[#141414] text-[#F5F5F0]'
                  : 'text-[#8A8A8A] hover:text-[#F5F5F0] hover:bg-[#101010]'
              }`}
            >
              {/* Thin left active indicator line */}
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

              {item.badge !== undefined && (
                <span
                  className="text-[10px] font-mono-tech px-1.5 py-0.2 rounded-[2px]"
                  style={{
                    backgroundColor: `${item.badgeColor || '#0066FF'}18`,
                    color: item.badgeColor || '#0066FF',
                    border: `1px solid ${item.badgeColor || '#0066FF'}30`,
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Divider */}
        <div className="my-3 border-t border-[#1D1D1D]" />

        {/* Secondary items */}
        {secondaryNavItems.map((item) => {
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
            </button>
          );
        })}
      </div>

      {/* Bottom Status / System Info */}
      <div className="p-3 border-t border-[#1D1D1D] text-[10px] font-mono-tech text-[#525252] flex flex-col gap-1.5 bg-[#080808]">
        <div className="flex items-center justify-between">
          <span>ENVIRONMENT</span>
          <span className="text-[#8A8A8A]">DEMO DATA</span>
        </div>
        <div className="flex items-center justify-between">
          <span>TELEMETRY FEED</span>
          <span className="text-[#10B981]">CONNECTED</span>
        </div>
      </div>
    </aside>
  );
};
