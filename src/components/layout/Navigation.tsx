import React from 'react';
import {
  LayoutDashboard,
  Activity,
  Inbox,
  SlidersHorizontal,
  FileText,
  FlaskConical,
  BarChart3,
  Bot,
  Database,
  Settings
} from 'lucide-react';
import type { NavigationTab } from '../../types/tapwise';

interface NavigationProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  unresolvedSignalsCount?: number;
  unresolvedOpportunitiesCount?: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onSelectTab,
  unresolvedSignalsCount = 5,
  unresolvedOpportunitiesCount = 3,
}) => {
  const tabs: {
    id: NavigationTab;
    label: string;
    icon: React.FC<{ className?: string }>;
    badge?: number | string;
    isPrimary?: boolean;
  }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'insights', label: 'Insights', icon: Activity, badge: unresolvedSignalsCount },
    { id: 'opportunities', label: 'Opportunities', icon: Inbox, badge: unresolvedOpportunitiesCount },
    { id: 'prioritize', label: 'Prioritize', icon: SlidersHorizontal, isPrimary: true },
    { id: 'prds', label: 'PRDs', icon: FileText },
    { id: 'experiments', label: 'Experiments', icon: FlaskConical },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'weekly_review', label: 'Weekly Review', icon: Bot },
    { id: 'data_sources', label: 'Data Sources', icon: Database },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="border-b border-white/[0.08] bg-[#090a0d] overflow-x-auto scrollbar-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-1 py-1.5 min-w-max">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-white/[0.08] text-white border border-white/[0.12] shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03] border border-transparent'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-400' : 'text-zinc-500'}`} />
              <span>{tab.label}</span>

              {tab.badge !== undefined && (
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                  isActive
                    ? 'bg-blue-500/20 text-blue-300'
                    : 'bg-white/[0.06] text-zinc-400'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
