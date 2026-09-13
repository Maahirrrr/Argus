import React from 'react';
import {
  LayoutDashboard,
  Radio,
  Sparkles,
  SlidersHorizontal,
  Terminal,
  Menu,
  X,
  Inbox,
  FileText,
  FlaskConical,
  Settings,
  BookOpen
} from 'lucide-react';
import type { NavigationTab } from '../../types/argus';

interface MobileNavigationProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  isDrawerOpen: boolean;
  onToggleDrawer: () => void;
  onOpenCaseStudy: () => void;
  unresolvedSignalsCount?: number;
  unresolvedOpportunitiesCount?: number;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  activeTab,
  onSelectTab,
  isDrawerOpen,
  onToggleDrawer,
  onOpenCaseStudy,
  unresolvedSignalsCount = 5,
  unresolvedOpportunitiesCount = 3,
}) => {
  const quickTabs: { id: NavigationTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'signals', label: 'Signals', icon: Radio },
    { id: 'insights', label: 'Insights', icon: Sparkles },
    { id: 'prioritize', label: 'Prioritize', icon: SlidersHorizontal },
    { id: 'ai_copilot', label: 'Copilot', icon: Terminal },
  ];

  const drawerGroups: { title: string; items: { id: NavigationTab; label: string; icon: React.ComponentType<{ className?: string }>; badge?: number; badgeColor?: string }[] }[] = [
    {
      title: 'Core Intelligence',
      items: [
        { id: 'overview', label: 'Overview Cockpit', icon: LayoutDashboard },
        { id: 'signals', label: 'Signals Queue', icon: Radio, badge: unresolvedSignalsCount, badgeColor: '#EF4444' },
        { id: 'insights', label: 'Causal Root-Cause Insights', icon: Sparkles },
        { id: 'opportunities', label: 'Opportunities Inbox', icon: Inbox, badge: unresolvedOpportunitiesCount, badgeColor: '#0066FF' },
      ],
    },
    {
      title: 'Execution Engine',
      items: [
        { id: 'prioritize', label: 'Prioritization Workbench', icon: SlidersHorizontal },
        { id: 'prds', label: 'PRD Workspace & Spec Editor', icon: FileText },
        { id: 'experiments', label: 'Causal Experiment Lab', icon: FlaskConical },
      ],
    },
    {
      title: 'Copilot & Configuration',
      items: [
        { id: 'ai_copilot', label: 'AI Copilot & SQL Studio', icon: Terminal },
        { id: 'settings', label: 'Settings & Data Sources', icon: Settings },
      ],
    },
  ];

  return (
    <>
      {/* Fixed Bottom Quick Bar for Mobile Devices */}
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-[#1D1D1D] px-1 pt-1 pb-safe flex items-center justify-around select-none shadow-2xl"
      >
        {quickTabs.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1.5 min-h-[48px] rounded-[3px] transition-all cursor-pointer active:scale-95 ${
                isActive ? 'text-[#0066FF]' : 'text-[#8A8A8A] hover:text-[#F5F5F0]'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-[#0066FF]' : 'text-[#8A8A8A]'}`} />
                {item.id === 'signals' && unresolvedSignalsCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-[#EF4444] ring-2 ring-[#0A0A0A]" />
                )}
              </div>
              <span className={`text-[10px] font-mono-tech mt-1 tracking-tight ${isActive ? 'font-bold text-[#F5F5F0]' : ''}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="w-4 h-[2px] bg-[#0066FF] rounded-full mt-0.5" />
              )}
            </button>
          );
        })}

        {/* Menu drawer trigger */}
        <button
          onClick={onToggleDrawer}
          className="flex-1 flex flex-col items-center justify-center py-1.5 min-h-[48px] rounded-[3px] text-[#8A8A8A] hover:text-[#F5F5F0] transition-all cursor-pointer active:scale-95"
        >
          <Menu className="w-4 h-4" />
          <span className="text-[10px] font-mono-tech mt-1">Menu</span>
        </button>
      </nav>

      {/* Full Mobile Slide-Over Drawer */}
      {isDrawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col bg-[#050505]/98 backdrop-blur-2xl p-5 select-none overflow-hidden pb-safe">
          <div className="flex items-center justify-between pb-4 border-b border-[#1D1D1D]">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-[#0066FF] rounded-[2px] flex items-center justify-center font-bold text-xs text-white tracking-wider shadow-sm shadow-[#0066FF]/30">A</div>
              <div>
                <span className="font-bold text-sm tracking-wider text-[#F5F5F0] font-display block">
                  ARGUS OS
                </span>
                <span className="text-[9px] font-mono-tech text-[#8A8A8A]">
                  AI PRODUCT INTELLIGENCE
                </span>
              </div>
            </div>
            <button
              onClick={onToggleDrawer}
              className="p-2 rounded-[3px] text-[#8A8A8A] hover:text-[#F5F5F0] border border-[#1D1D1D] bg-[#0A0A0A] cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 space-y-5 font-mono-tech no-scrollbar">
            {drawerGroups.map((grp) => (
              <div key={grp.title} className="space-y-1">
                <span className="px-2 text-[10px] text-[#525252] uppercase tracking-wider font-bold block mb-1">
                  {grp.title}
                </span>
                {grp.items.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        onSelectTab(tab.id);
                        onToggleDrawer();
                      }}
                      className={`w-full text-left p-3 rounded-[3px] text-xs transition-all flex items-center justify-between min-h-[44px] cursor-pointer active:scale-98 ${
                        isActive
                          ? 'bg-[#141414] text-[#0066FF] border border-[#0066FF]/35 font-bold'
                          : 'text-[#8A8A8A] hover:text-[#F5F5F0] hover:bg-[#101010]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-[#0066FF]' : 'text-[#525252]'}`} />
                        <span>{tab.label}</span>
                      </div>
                      {tab.badge !== undefined && (
                        <span
                          className="text-[9px] px-1.5 py-0.2 rounded-[2px]"
                          style={{
                            backgroundColor: `${tab.badgeColor || '#0066FF'}20`,
                            color: tab.badgeColor || '#0066FF',
                            border: `1px solid ${tab.badgeColor || '#0066FF'}40`,
                          }}
                        >
                          {tab.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}

            <div className="pt-2 border-t border-[#1D1D1D]">
              <button
                onClick={() => {
                  onOpenCaseStudy();
                  onToggleDrawer();
                }}
                className="w-full text-left p-3.5 rounded-[3px] text-xs bg-[#101010] hover:bg-[#141414] border border-[#1D1D1D] text-[#0066FF] font-bold flex items-center justify-between min-h-[48px] cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#0066FF]" />
                  <span>AI PM Portfolio Case Study</span>
                </div>
                <span>→</span>
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-[#1D1D1D] text-[10px] font-mono-tech text-[#525252] flex items-center justify-between">
            <span>VERSION 2.4 · INSTITUTIONAL</span>
            <span className="text-[#10B981] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              ONLINE
            </span>
          </div>
        </div>
      )}
    </>
  );
};
