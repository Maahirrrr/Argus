import React from 'react';
import {
  LayoutDashboard,
  Inbox,
  Activity,
  MessageSquare,
  Zap,
  Compass,
  Scale,
  Milestone,
  FileText,
  CheckSquare,
  FlaskConical,
  Terminal,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Columns,
  BookOpen,
} from 'lucide-react';
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
  label?: string; // If undefined, no label or divider shown (e.g. Cockpit)
  items: {
    id: NavigationTab;
    label: string;
    icon: React.FC<{ className?: string }>;
    badge?: number | string;
    badgeType?: 'inbox' | 'opportunities' | 'today';
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
      // Cockpit group: no label, just items
      items: [
        { id: 'overview', label: 'Cockpit', icon: LayoutDashboard },
        { id: 'inbox', label: 'Inbox', icon: Inbox, badge: 4, badgeType: 'inbox' },
      ],
    },
    {
      label: 'Discover',
      items: [
        { id: 'signals', label: 'Signals', icon: Activity },
        { id: 'feedback', label: 'Feedback', icon: MessageSquare },
        { id: 'chaos', label: 'Chaos Lab', icon: Zap },
      ],
    },
    {
      label: 'Decide',
      items: [
        { id: 'opportunities', label: 'Opportunities', icon: Compass, badge: 19, badgeType: 'opportunities' },
        { id: 'prioritize', label: 'Prioritize', icon: Scale },
        { id: 'roadmap', label: 'Roadmap', icon: Milestone },
      ],
    },
    {
      label: 'Build',
      items: [
        { id: 'sprints', label: 'Sprints', icon: Columns, badge: 6 },
        { id: 'prds', label: 'PRD Studio', icon: FileText },
        { id: 'documents', label: 'Specs & Docs', icon: BookOpen },
        { id: 'decisions', label: 'Decisions', icon: CheckSquare },
      ],
    },
    {
      label: 'Measure',
      items: [
        { id: 'experiments', label: 'Experiments', icon: FlaskConical },
        { id: 'analytics', label: 'Telemetry', icon: Terminal },
      ],
    },
  ];

  return (
    <aside
      className={`h-screen hidden md:flex flex-col flex-shrink-0 justify-between bg-[var(--surface-1)] border-r border-[var(--border-subtle)] transition-[width] duration-200 ease-out select-none z-30 ${
        isCollapsed ? 'w-[44px]' : 'w-[220px]'
      }`}
    >
      {/* Top Section */}
      <div className="flex-1 flex flex-col min-h-0 overflow-y-auto scrollbar-none">
        {/* Workspace Selector (Top) */}
        <div className="h-11 px-2 border-b border-[var(--border-subtle)] flex items-center justify-between">
          <WorkspaceSelector isCollapsed={isCollapsed} />
        </div>

        {/* Search Bar */}
        <div className="px-2 pt-2 pb-1">
          {isCollapsed ? (
            <button
              onClick={onOpenCommandPalette}
              className="w-7 h-7 mx-auto rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] flex items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              title="Search (⌘K)"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={onOpenCommandPalette}
              className="w-full h-8 px-2.5 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] flex items-center justify-between text-left transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-2 text-[var(--text-tertiary)] group-hover:text-[var(--text-secondary)]">
                <Search className="w-3.5 h-3.5" />
                <span className="text-[12px] font-sans font-normal text-[var(--text-tertiary)]">
                  Search
                </span>
              </div>
              <kbd className="text-[11px] font-sans font-normal text-[var(--text-tertiary)]">
                ⌘K
              </kbd>
            </button>
          )}
        </div>

        {/* Nav Groups */}
        <nav className="py-1 px-1.5 space-y-1">
          {groups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-0.5">
              {group.label && !isCollapsed && (
                <div className="pt-2 pb-1 px-3">
                  <div className="h-px bg-[var(--border-subtle)] mb-2" />
                  <span className="text-[11px] font-medium text-[var(--text-tertiary)] font-sans">
                    {group.label}
                  </span>
                </div>
              )}
              {group.label && isCollapsed && (
                <div className="my-1.5 mx-2 h-px bg-[var(--border-subtle)]" />
              )}

              {group.items.map((item) => {
                const isActive =
                  activeTab === item.id ||
                  (item.id === 'overview' && activeTab === 'home') ||
                  (item.id === 'feedback' && activeTab === 'customers');
                return (
                  <SidebarItem
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    icon={item.icon}
                    isActive={isActive}
                    isCollapsed={isCollapsed}
                    badge={item.badge}
                    badgeType={item.badgeType}
                    onClick={() => onNavigateTab(item.id)}
                  />
                );
              })}
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-1.5 border-t border-[var(--border-subtle)] space-y-0.5">
        <SidebarItem
          id="settings"
          label="Settings"
          icon={Settings}
          isActive={activeTab === 'settings'}
          isCollapsed={isCollapsed}
          onClick={() => onNavigateTab('settings')}
        />

        <button
          onClick={onToggleCollapse}
          className={`w-full h-8 flex items-center ${
            isCollapsed ? 'justify-center' : 'justify-between px-3'
          } rounded-[var(--radius-sm)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-2)] transition-colors cursor-pointer`}
          title={isCollapsed ? 'Expand sidebar (220px)' : 'Collapse sidebar (44px)'}
        >
          <span className="flex items-center gap-2">
            {isCollapsed ? (
              <PanelLeftOpen className="w-4 h-4" />
            ) : (
              <>
                <PanelLeftClose className="w-4 h-4" />
                <span className="text-[12px] font-sans">Collapse</span>
              </>
            )}
          </span>
        </button>
      </div>
    </aside>
  );
};
