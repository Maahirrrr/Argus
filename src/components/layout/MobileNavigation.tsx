import React from 'react';
import {
  LayoutDashboard,
  Inbox,
  Target,
  FileText,
  Menu,
  X
} from 'lucide-react';
import type { NavigationTab } from '../../types/argus';
import { ArgusLogo } from '../ui/ArgusLogo';

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
}) => {
  const bottomTabs: { id: NavigationTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Cockpit', icon: LayoutDashboard },
    { id: 'inbox', label: 'Inbox', icon: Inbox },
    { id: 'opportunities', label: 'Decide', icon: Target },
    { id: 'prds', label: 'Build', icon: FileText },
  ];

  const allDrawerLinks: { id: NavigationTab; label: string; group: string }[] = [
    { id: 'home', label: 'PM Cockpit', group: 'WORK' },
    { id: 'inbox', label: 'Triage Inbox', group: 'WORK' },
    { id: 'customers', label: 'Feedback Engine', group: 'DISCOVER' },
    { id: 'research', label: 'Research Lab', group: 'DISCOVER' },
    { id: 'intelligence', label: 'Competitive Radar', group: 'DISCOVER' },
    { id: 'signals', label: 'Telemetry Signals', group: 'DISCOVER' },
    { id: 'insights', label: 'Causal Insights', group: 'DISCOVER' },
    { id: 'opportunities', label: 'Opportunity Trees', group: 'DECIDE' },
    { id: 'prioritize', label: 'RICE Workbench', group: 'DECIDE' },
    { id: 'roadmap', label: 'Product Roadmap', group: 'DECIDE' },
    { id: 'prds', label: 'PRD Studio', group: 'BUILD' },
    { id: 'prototypes', label: 'Prototype Studio', group: 'BUILD' },
    { id: 'ai_lab', label: 'AI Product Lab', group: 'BUILD' },
    { id: 'experiments', label: 'A/B Experiments', group: 'MEASURE' },
    { id: 'analytics', label: 'Telemetry SQL', group: 'MEASURE' },
    { id: 'ai_copilot', label: 'Contextual Copilot', group: 'MEASURE' },
    { id: 'launch', label: 'Release Center', group: 'MEASURE' },
    { id: 'decisions', label: 'Decision Log (ADR)', group: 'WORKSPACE' },
    { id: 'documents', label: 'Knowledge Hub', group: 'WORKSPACE' },
    { id: 'settings', label: 'Settings', group: 'WORKSPACE' },
  ];

  return (
    <>
      {/* 1. Touch Bottom Dock */}
      <nav className="md:hidden fixed bottom-3 left-4 right-4 z-50 bg-[#070707]/92 backdrop-blur-xl border border-[#1D1D1D] rounded-[4px] px-2 py-1.5 flex items-center justify-around shadow-2xl">
        {bottomTabs.map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id || (t.id === 'home' && activeTab === 'overview');
          return (
            <button
              key={t.id}
              onClick={() => onSelectTab(t.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-[2px] transition-colors ${
                isActive ? 'text-white' : 'text-[#8A8A8A]'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span className="text-[10px] font-mono-tech">{t.label}</span>
            </button>
          );
        })}

        <button
          onClick={onToggleDrawer}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-[2px] transition-colors ${
            isDrawerOpen ? 'text-white' : 'text-[#8A8A8A]'
          }`}
        >
          <Menu className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-mono-tech">More</span>
        </button>
      </nav>

      {/* 2. Slide-out Mobile Drawer */}
      {isDrawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-end animate-fade-in">
          <div className="bg-[#0A0A0A] border-t border-[#1D1D1D] rounded-t-[4px] p-5 max-h-[80vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1D1D1D]">
              <div
                onClick={() => {
                  onSelectTab('home');
                  onToggleDrawer();
                }}
                className="cursor-pointer"
                title="Argus — Operating System (https://maahirrrr.github.io/Argus/#)"
              >
                <ArgusLogo size="sm" variant="default" withText textClassName="text-sm font-extrabold text-[#F5F5F0]" />
              </div>
              <button
                onClick={onToggleDrawer}
                className="p-1 text-[#8A8A8A] hover:text-[#F5F5F0]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {allDrawerLinks.map((link) => {
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => {
                      onSelectTab(link.id);
                      onToggleDrawer();
                    }}
                    className={`p-2.5 rounded-[2px] text-left transition-all border ${
                      isActive
                        ? 'bg-[#141414] border-[#0066FF] text-[#F5F5F0]'
                        : 'bg-[#0D0D0D] border-[#1D1D1D] text-[#8A8A8A]'
                    }`}
                  >
                    <div className="text-[9px] font-mono-tech text-[#555]">{link.group}</div>
                    <div className="text-xs font-mono-tech font-semibold text-[#F5F5F0] mt-0.5 truncate">
                      {link.label}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-[#1D1D1D] flex justify-between items-center text-xs font-mono-tech">
              <button
                onClick={onOpenCaseStudy}
                className="text-[#0066FF] hover:underline"
              >
                📖 View PM Case Study
              </button>
              <span className="text-[#555]">v2.4 Production</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
