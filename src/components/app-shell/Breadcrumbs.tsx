import React from 'react';
import { ChevronRight } from 'lucide-react';
import type { NavigationTab } from '../../types/argus';

interface BreadcrumbsProps {
  activeTab: NavigationTab;
  onNavigateTab: (tab: NavigationTab) => void;
}

const TAB_TITLES: Record<string, { group: string; name: string }> = {
  home: { group: 'Overview', name: 'Cockpit' },
  overview: { group: 'Overview', name: 'Cockpit' },
  inbox: { group: 'Discover', name: 'Triage Inbox' },
  customers: { group: 'Discover', name: 'Customer Feedback' },
  feedback: { group: 'Discover', name: 'Customer Feedback' },
  research: { group: 'Discover', name: 'Research Lab' },
  intelligence: { group: 'Discover', name: 'Competitive Radar' },
  signals: { group: 'Discover', name: 'Telemetry Signals' },
  insights: { group: 'Discover', name: 'Causal Insights' },
  opportunities: { group: 'Decide', name: 'Opportunities' },
  prioritize: { group: 'Decide', name: 'Prioritization' },
  roadmap: { group: 'Decide', name: 'Roadmap' },
  prds: { group: 'Build', name: 'PRD Studio' },
  prototypes: { group: 'Build', name: 'Prototypes' },
  ai_lab: { group: 'Build', name: 'AI Product Lab' },
  experiments: { group: 'Measure', name: 'Experiments' },
  analytics: { group: 'Measure', name: 'Analytics' },
  ai_copilot: { group: 'Measure', name: 'Copilot' },
  launch: { group: 'Measure', name: 'Launch Center' },
  decisions: { group: 'Workspace', name: 'Decision Log' },
  documents: { group: 'Workspace', name: 'Document Hub' },
  settings: { group: 'Workspace', name: 'Settings' },
  data_sources: { group: 'Workspace', name: 'Data Sources' },
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ activeTab, onNavigateTab }) => {
  const current = TAB_TITLES[activeTab] || { group: 'Workspace', name: 'Operating System' };

  return (
    <nav className="flex items-center gap-1.5 text-xs text-[#A1A1A1] font-mono-tech select-none">
      <button
        onClick={() => onNavigateTab('home')}
        className="text-[#666666] hover:text-[#EDEDED] transition-colors cursor-pointer"
      >
        ARGUS
      </button>

      <ChevronRight className="w-3 h-3 text-[#404040]" />

      <span className="text-[#666666]">{current.group}</span>

      <ChevronRight className="w-3 h-3 text-[#404040]" />

      <span className="text-[#EDEDED] font-medium">{current.name}</span>
    </nav>
  );
};
