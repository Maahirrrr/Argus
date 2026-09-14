import React from 'react';
import {
  LayoutDashboard,
  CalendarDays,
  Inbox,
  Users,
  MessageSquare,
  Search as SearchIcon,
  Radar,
  Lightbulb,
  Target,
  Map,
  FileText,
  PanelsTopLeft,
  FlaskConical,
  BarChart3,
  Rocket,
  TrendingUp,
  Video,
  Files,
  GitBranch,
  Sparkles,
  Settings,
  HelpCircle,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import { ArgusLogo } from '../ui/ArgusLogo';
import { WorkspaceSelector } from './WorkspaceSelector';
import { SidebarItem } from './SidebarItem';
import type { NavigationTab } from '../../types/argus';

interface SidebarProps {
  activeTab: NavigationTab;
  onNavigateTab: (tab: NavigationTab) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onOpenCommandPalette: () => void;
}

interface NavGroup {
  label: string;
  items: {
    id: NavigationTab;
    label: string;
    icon: React.FC<{ className?: string }>;
    badge?: number | string;
    badgeColor?: string;
  }[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onNavigateTab,
  isCollapsed,
  onToggleCollapse,
  onOpenCommandPalette,
}) => {
  const groups: NavGroup[] = [
    {
      label: 'OVERVIEW',
      items: [
        { id: 'home', label: 'Cockpit', icon: LayoutDashboard },
        { id: 'signals', label: 'Today', icon: CalendarDays, badge: 'NEW', badgeColor: 'bg-[#0070F3]' },
      ],
    },
    {
      label: 'DISCOVER',
      items: [
        { id: 'inbox', label: 'Inbox', icon: Inbox, badge: 4, badgeColor: 'bg-[#1D1D1D]' },
        { id: 'customers', label: 'Customers', icon: Users },
        { id: 'feedback', label: 'Feedback', icon: MessageSquare },
        { id: 'research', label: 'Research', icon: SearchIcon },
        { id: 'intelligence', label: 'Intelligence', icon: Radar },
      ],
    },
    {
      label: 'DECIDE',
      items: [
        { id: 'opportunities', label: 'Opportunities', icon: Lightbulb, badge: 19, badgeColor: 'bg-[#10B981]' },
        { id: 'prioritize', label: 'Prioritization', icon: Target },
        { id: 'roadmap', label: 'Roadmap', icon: Map },
      ],
    },
    {
      label: 'BUILD',
      items: [
        { id: 'prds', label: 'PRDs', icon: FileText },
        { id: 'prototypes', label: 'Prototypes', icon: PanelsTopLeft },
        { id: 'experiments', label: 'Experiments', icon: FlaskConical },
      ],
    },
    {
      label: 'MEASURE',
      items: [
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'launch', label: 'Launch', icon: Rocket },
        { id: 'ai_copilot', label: 'Outcomes', icon: TrendingUp },
      ],
    },
    {
      label: 'WORKSPACE',
      items: [
        { id: 'documents', label: 'Documents', icon: Files },
        { id: 'decisions', label: 'Decisions', icon: GitBranch },
        { id: 'data_sources', label: 'Meetings', icon: Video },
      ],
    },
    {
      label: 'AI',
      items: [
        { id: 'ai_lab', label: 'AI Lab', icon: Sparkles },
      ],
    },
  ];

  return (
    <aside
      className={`h-screen hidden md:flex flex-col flex-shrink-0 justify-between bg-[#050505] border-r border-[rgba(255,255,255,0.08)] transition-all duration-200 select-none z-30 ${
        isCollapsed ? 'w-16' : 'w-[248px]'
      }`}
    >
      {/* 1. Header: Monogram Logo & Workspace Selector */}
      <div className="p-3 border-b border-[rgba(255,255,255,0.08)] space-y-2.5">
        <div className="flex items-center justify-between">
          <div
            onClick={() => onNavigateTab('home')}
            className="flex items-center gap-2 cursor-pointer no-underline text-inherit group"
          >
            <ArgusLogo size="sm" variant="default" withText={!isCollapsed} />
          </div>

          <button
            onClick={onToggleCollapse}
            className="p-1 text-[#666666] hover:text-[#EDEDED] rounded-[4px] hover:bg-[#121212] transition-colors cursor-pointer"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <PanelLeftOpen className="w-3.5 h-3.5" />
            ) : (
              <PanelLeftClose className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Workspace Selector */}
        <WorkspaceSelector isCollapsed={isCollapsed} />

        {/* Compact Search Trigger (⌘K) */}
        {!isCollapsed ? (
          <button
            onClick={onOpenCommandPalette}
            className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-[6px] bg-[#0A0A0A] hover:bg-[#121212] border border-[rgba(255,255,255,0.08)] text-xs text-[#666666] hover:text-[#EDEDED] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <SearchIcon className="w-3.5 h-3.5" />
              <span className="text-[12px]">Search</span>
            </div>
            <kbd className="px-1.5 py-0.5 rounded-[3px] bg-[#141414] border border-[#222222] text-[10px] font-mono-tech text-[#8A8A8A]">
              ⌘K
            </kbd>
          </button>
        ) : (
          <div className="flex justify-center">
            <button
              onClick={onOpenCommandPalette}
              className="p-1.5 text-[#666666] hover:text-[#EDEDED] hover:bg-[#121212] rounded-[4px] transition-colors cursor-pointer"
              title="Search (⌘K)"
            >
              <SearchIcon className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* 2. Navigation List */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-4 scrollbar-none">
        {groups.map((g) => (
          <div key={g.label} className="space-y-0.5">
            {!isCollapsed && (
              <div className="px-2.5 py-1 text-[10px] font-mono-tech uppercase tracking-wider text-[#666666] font-semibold">
                {g.label}
              </div>
            )}
            {g.items.map((item) => {
              const isActive =
                activeTab === item.id ||
                (item.id === 'home' && activeTab === 'overview') ||
                (item.id === 'customers' && activeTab === 'feedback');
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
          </div>
        ))}
      </div>

      {/* 3. Footer: Help, Settings, & Account */}
      <div className="p-2 border-t border-[rgba(255,255,255,0.08)] bg-[#050505] space-y-0.5">
        <SidebarItem
          id={'settings' as NavigationTab}
          label="Settings"
          icon={Settings}
          isActive={activeTab === 'settings'}
          isCollapsed={isCollapsed}
          onClick={() => onNavigateTab('settings')}
        />
        <SidebarItem
          id={'data_sources' as NavigationTab}
          label="Help & Docs"
          icon={HelpCircle}
          isActive={false}
          isCollapsed={isCollapsed}
          onClick={() => window.open('https://github.com/Maahirrrr/Argus', '_blank')}
        />
      </div>
    </aside>
  );
};
