import React from 'react';
import {
  LayoutDashboard,
  Radio,
  Sparkles,
  SlidersHorizontal,
  Terminal,
  Menu,
  X
} from 'lucide-react';
import type { NavigationTab } from '../../types/tapwise';

interface MobileNavigationProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  isDrawerOpen: boolean;
  onToggleDrawer: () => void;
  onOpenCaseStudy: () => void;
  unresolvedSignalsCount?: number;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  activeTab,
  onSelectTab,
  isDrawerOpen,
  onToggleDrawer,
  onOpenCaseStudy,
  unresolvedSignalsCount = 5,
}) => {
  const quickTabs: { id: NavigationTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'signals', label: 'Signals', icon: Radio },
    { id: 'insights', label: 'Insights', icon: Sparkles },
    { id: 'prioritize', label: 'Prioritize', icon: SlidersHorizontal },
    { id: 'ai_copilot', label: 'Copilot', icon: Terminal },
  ];

  const allTabs: { id: NavigationTab; label: string; section: string }[] = [
    { id: 'overview', label: 'Overview Cockpit', section: 'Intelligence' },
    { id: 'signals', label: 'Product Signals Queue (5)', section: 'Intelligence' },
    { id: 'insights', label: 'Causal Root-Cause Insights', section: 'Intelligence' },
    { id: 'opportunities', label: 'Opportunity Inbox', section: 'Intelligence' },
    { id: 'prioritize', label: 'Prioritization Workbench', section: 'Execution' },
    { id: 'prds', label: 'PRD Workspace & Spec Editor', section: 'Execution' },
    { id: 'experiments', label: 'Causal Experiment Lab', section: 'Execution' },
    { id: 'analytics', label: 'ClickHouse Telemetry', section: 'Deep Systems' },
    { id: 'ai_copilot', label: 'Contextual AI Copilot', section: 'Deep Systems' },
    { id: 'weekly_review', label: 'Weekly Product Review', section: 'Deep Systems' },
    { id: 'data_sources', label: 'Data Sources (5 Connected)', section: 'Configuration' },
    { id: 'settings', label: 'Workspace Settings', section: 'Configuration' },
  ];

  return (
    <>
      {/* Fixed Bottom Quick Bar for Mobile Devices */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-md border-t border-[#1D1D1D] px-2 py-1.5 flex items-center justify-around select-none">
        {quickTabs.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center justify-center p-1.5 rounded-[2px] transition-colors cursor-pointer ${
                isActive ? 'text-[#0066FF]' : 'text-[#8A8A8A] hover:text-[#F5F5F0]'
              }`}
            >
              <div className="relative">
                <Icon className="w-4 h-4" />
                {item.id === 'signals' && unresolvedSignalsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#EF4444]" />
                )}
              </div>
              <span className="text-[9px] font-mono-tech mt-0.5">{item.label}</span>
            </button>
          );
        })}

        {/* Menu drawer trigger */}
        <button
          onClick={onToggleDrawer}
          className="flex flex-col items-center justify-center p-1.5 rounded-[2px] text-[#8A8A8A] hover:text-[#F5F5F0] transition-colors cursor-pointer"
        >
          <Menu className="w-4 h-4" />
          <span className="text-[9px] font-mono-tech mt-0.5">Menu</span>
        </button>
      </div>

      {/* Full Mobile Slide-Over Drawer */}
      {isDrawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col bg-[#050505] p-5 select-none">
          <div className="flex items-center justify-between pb-4 border-b border-[#1D1D1D]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#F5F5F0] rounded-[2px] flex items-center justify-center font-bold text-xs text-[#050505]">
                TW
              </div>
              <span className="font-bold text-sm tracking-wider text-[#F5F5F0] font-display">
                TAPWISE OS
              </span>
            </div>
            <button
              onClick={onToggleDrawer}
              className="p-1.5 rounded-[2px] text-[#8A8A8A] hover:text-[#F5F5F0] border border-[#1D1D1D]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 space-y-2 font-mono-tech">
            {allTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  onSelectTab(tab.id);
                  onToggleDrawer();
                }}
                className={`w-full text-left p-3 rounded-[3px] text-xs transition-colors flex items-center justify-between ${
                  activeTab === tab.id
                    ? 'bg-[#141414] text-[#0066FF] border border-[#0066FF]/30 font-bold'
                    : 'text-[#8A8A8A] hover:text-[#F5F5F0] hover:bg-[#101010]'
                }`}
              >
                <span>{tab.label}</span>
                <span className="text-[9px] text-[#525252] uppercase">{tab.section}</span>
              </button>
            ))}

            <div className="pt-4 border-t border-[#1D1D1D]">
              <button
                onClick={() => {
                  onOpenCaseStudy();
                  onToggleDrawer();
                }}
                className="w-full text-left p-3 rounded-[3px] text-xs bg-[#101010] border border-[#1D1D1D] text-[#0066FF] font-bold"
              >
                Read AI PM Portfolio Case Study →
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-[#1D1D1D] text-[10px] font-mono-tech text-[#525252] flex items-center justify-between">
            <span>TAPWISE PRODUCT INTELLIGENCE</span>
            <span className="text-[#10B981]">ONLINE</span>
          </div>
        </div>
      )}
    </>
  );
};
