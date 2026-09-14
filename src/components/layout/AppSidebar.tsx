import React, { useState } from 'react';
import {
  LayoutDashboard,
  Inbox,
  Users,
  FlaskConical,
  Radar,
  Activity,
  Lightbulb,
  GitFork,
  Target,
  CalendarRange,
  FileText,
  Boxes,
  Cpu,
  TestTube2,
  BarChart3,
  Bot,
  Rocket,
  History,
  BookOpen,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import type { NavigationTab } from '../../types/argus';

interface AppSidebarProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  unresolvedSignalsCount?: number;
  unresolvedOpportunitiesCount?: number;
  enabledModules: NavigationTab[];
  aiPmMode: boolean;
}

interface NavItem {
  id: NavigationTab;
  label: string;
  icon: React.FC<{ className?: string }>;
  badge?: number | string;
  badgeColor?: string;
  isAiPmOnly?: boolean;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  activeTab,
  onSelectTab,
  unresolvedSignalsCount = 2,
  unresolvedOpportunitiesCount = 4,
  enabledModules,
  aiPmMode: _aiPmMode,
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    return localStorage.getItem('argus_sidebar_collapsed') === 'true';
  });

  const toggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('argus_sidebar_collapsed', String(next));
      return next;
    });
  };

  const groups: NavGroup[] = [
    {
      label: 'WORK',
      items: [
        { id: 'home', label: 'PM Cockpit', icon: LayoutDashboard },
        { id: 'inbox', label: 'Triage Inbox', icon: Inbox, badge: 4, badgeColor: 'bg-[#0066FF]' },
      ],
    },
    {
      label: 'DISCOVER',
      items: [
        { id: 'customers', label: 'Feedback Engine', icon: Users },
        { id: 'research', label: 'Research Lab', icon: FlaskConical },
        { id: 'intelligence', label: 'Competitive Radar', icon: Radar },
        { id: 'signals', label: 'Telemetry Signals', icon: Activity, badge: unresolvedSignalsCount, badgeColor: 'bg-[#EF4444]' },
        { id: 'insights', label: 'Causal Insights', icon: Lightbulb },
      ],
    },
    {
      label: 'DECIDE',
      items: [
        { id: 'opportunities', label: 'Opportunity Trees', icon: GitFork, badge: unresolvedOpportunitiesCount, badgeColor: 'bg-[#0066FF]' },
        { id: 'prioritize', label: 'RICE Workbench', icon: Target },
        { id: 'roadmap', label: 'Product Roadmap', icon: CalendarRange },
      ],
    },
    {
      label: 'BUILD',
      items: [
        { id: 'prds', label: 'PRD & BDD Studio', icon: FileText },
        { id: 'prototypes', label: 'Prototype Studio', icon: Boxes },
        { id: 'ai_lab', label: 'AI Product Lab', icon: Cpu, badge: 'EVALS', badgeColor: 'bg-[#10B981]', isAiPmOnly: true },
      ],
    },
    {
      label: 'MEASURE',
      items: [
        { id: 'experiments', label: 'A/B Experiments', icon: TestTube2 },
        { id: 'analytics', label: 'Telemetry SQL', icon: BarChart3 },
        { id: 'ai_copilot', label: 'Contextual Copilot', icon: Bot },
        { id: 'launch', label: 'Release Center', icon: Rocket },
      ],
    },
    {
      label: 'WORKSPACE',
      items: [
        { id: 'decisions', label: 'Decision Log (ADR)', icon: History },
        { id: 'documents', label: 'Knowledge Hub', icon: BookOpen },
        { id: 'settings', label: 'Settings', icon: Settings },
      ],
    },
  ];

  return (
    <aside
      className={`hidden md:flex flex-col bg-[#050505] border-r border-[#1D1D1D] h-[calc(100vh-3.5rem)] sticky top-14 select-none transition-all duration-200 ${
        isCollapsed ? 'w-14' : 'w-60'
      }`}
    >
      {/* Collapse / Expand Toggle Button */}
      <div className="flex items-center justify-end px-2 py-2 border-b border-[#1D1D1D]">
        <button
          onClick={toggleCollapse}
          className="p-1 text-[#525252] hover:text-[#F5F5F0] hover:bg-[#121212] rounded-[2px] transition-colors"
          title={isCollapsed ? 'Expand Sidebar (Ctrl+B)' : 'Collapse Sidebar (Ctrl+B)'}
        >
          {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
      </div>

      <div className="p-2 space-y-4 flex-1 overflow-y-auto overflow-x-hidden">
        {groups.map((group) => {
          const visibleItems = group.items.filter((item) => {
            if (item.id === 'home' || item.id === 'settings') return true;
            return enabledModules.includes(item.id);
          });

          if (visibleItems.length === 0) return null;

          return (
            <div key={group.label} className="space-y-0.5">
              {!isCollapsed && (
                <div className="px-2 py-1 text-[9px] font-mono-tech font-bold text-[#525252] tracking-wider uppercase">
                  {group.label}
                </div>
              )}

              <div className="space-y-0.5">
                {visibleItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    activeTab === item.id ||
                    (item.id === 'home' && activeTab === 'overview') ||
                    (item.id === 'customers' && activeTab === 'feedback') ||
                    (item.id === 'settings' && activeTab === 'data_sources');

                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelectTab(item.id)}
                      title={isCollapsed ? item.label : undefined}
                      className={`w-full flex items-center ${
                        isCollapsed ? 'justify-center p-2' : 'justify-between px-2.5 py-1.5'
                      } rounded-[2px] text-xs font-mono-tech transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#121212] text-[#F5F5F0] border border-[#262626] font-semibold'
                          : 'text-[#8A8A8A] hover:text-[#F5F5F0] hover:bg-[#0D0D0D] border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon
                          className={`w-3.5 h-3.5 flex-shrink-0 ${
                            isActive ? 'text-white' : 'text-[#666]'
                          }`}
                        />
                        {!isCollapsed && <span className="truncate">{item.label}</span>}
                      </div>

                      {!isCollapsed && item.badge !== undefined && (
                        <span
                          className={`text-[9px] font-mono-tech font-bold px-1.5 py-0.2 rounded-[2px] text-white flex-shrink-0 ${
                            item.badgeColor || 'bg-[#1D1D1D]'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer System Status */}
      <div className="p-2.5 border-t border-[#1D1D1D] bg-[#070707]">
        {isCollapsed ? (
          <div className="flex justify-center" title="ARGUS OS v2.4 · PROD-IN-01">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          </div>
        ) : (
          <div className="flex items-center justify-between text-[10px] font-mono-tech text-[#8A8A8A]">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              <span>ARGUS OS v2.4</span>
            </div>
            <span className="text-[#525252]">PROD-IN-01</span>
          </div>
        )}
      </div>
    </aside>
  );
};
