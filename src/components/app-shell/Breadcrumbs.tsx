import React from 'react';
import type { NavigationTab } from '../../types/argus';

interface BreadcrumbsProps {
  activeTab: NavigationTab;
  onNavigateTab: (tab: NavigationTab) => void;
}

const TAB_TITLES: Record<string, string> = {
  home: 'Cockpit',
  overview: 'Cockpit',
  inbox: 'Inbox',
  customers: 'Feedback',
  feedback: 'Feedback',
  research: 'Research',
  intelligence: 'Intelligence',
  signals: 'Signals',
  insights: 'Insights',
  opportunities: 'Opportunities',
  prioritize: 'Prioritize',
  roadmap: 'Roadmap',
  prds: 'PRD Studio',
  prototypes: 'Prototypes',
  ai_lab: 'AI Lab',
  experiments: 'Experiments',
  analytics: 'Telemetry',
  ai_copilot: 'Copilot',
  launch: 'Launch',
  decisions: 'Decisions',
  documents: 'Documents',
  settings: 'Settings',
  data_sources: 'Data Sources',
  chaos: 'Chaos Lab',
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ activeTab, onNavigateTab }) => {
  const currentTitle = TAB_TITLES[activeTab] || 'Cockpit';

  return (
    <nav className="flex items-center gap-1 text-[13px] select-none font-sans">
      <button
        onClick={() => onNavigateTab('overview')}
        className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer font-normal font-sans"
      >
        Argus
      </button>

      <span className="text-[var(--text-tertiary)] px-0.5">/</span>

      <span className="text-[var(--text-primary)] font-semibold font-['Space_Grotesk',sans-serif]">
        {currentTitle}
      </span>
    </nav>
  );
};
