import React from 'react';
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
  Settings
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
        { id: 'signals', label: 'Telemetry Signals', icon: Activity, badge: unresolvedSignalsCount, badgeColor: 'bg-[#FF3333]' },
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
        { id: 'ai_lab', label: 'AI Product Lab', icon: Cpu, badge: 'EVALS', badgeColor: 'bg-[#00CC66]', isAiPmOnly: true },
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
    <aside className="hidden md:flex flex-col w-60 bg-[#050505] border-r border-[#1D1D1D] h-[calc(100vh-3.5rem)] sticky top-14 select-none overflow-y-auto">
      <div className="p-3 space-y-5 flex-1">
        {groups.map((group) => {
          // Filter items based on user settings
          const visibleItems = group.items.filter((item) => {
            if (item.id === 'home' || item.id === 'settings') return true;
            return enabledModules.includes(item.id);
          });

          if (visibleItems.length === 0) return null;

          return (
            <div key={group.label} className="space-y-1">
              <div className="px-2.5 py-1 text-[10px] font-mono-tech font-bold text-[#555] tracking-wider uppercase">
                {group.label}
              </div>

              <div className="space-y-0.5">
                {visibleItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id ||
                    (item.id === 'home' && activeTab === 'overview') ||
                    (item.id === 'customers' && activeTab === 'feedback') ||
                    (item.id === 'settings' && activeTab === 'data_sources');

                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelectTab(item.id)}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-[2px] text-xs font-mono-tech transition-all ${
                        isActive
                          ? 'bg-[#0066FF]/10 text-[#0066FF] border border-[#0066FF]/30 font-semibold'
                          : 'text-[#8A8A8A] hover:text-[#F5F5F0] hover:bg-[#0E0E0E] border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-[#0066FF]' : 'text-[#666]'}`} />
                        <span className="truncate">{item.label}</span>
                      </div>

                      {item.badge !== undefined && (
                        <span className={`text-[9px] font-mono-tech font-bold px-1.5 py-0.2 rounded-[2px] text-white flex-shrink-0 ${
                          item.badgeColor || 'bg-[#1D1D1D]'
                        }`}>
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
      <div className="p-3 border-t border-[#1D1D1D] bg-[#080808]">
        <div className="flex items-center justify-between text-[10px] font-mono-tech text-[#8A8A8A]">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00CC66] animate-pulse" />
            <span>ARGUS OS v2.4</span>
          </div>
          <span className="text-[#555]">PROD-IN-01</span>
        </div>
      </div>
    </aside>
  );
};
