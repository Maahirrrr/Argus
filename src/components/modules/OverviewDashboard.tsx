import React from 'react';
import type { NavigationTab } from '../../types/argus';
import { CockpitGrid } from '../cockpit/CockpitGrid';

interface OverviewDashboardProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onInvestigateSignal?: (signalId: string) => void;
  onOpenChaosSimulator?: () => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  onNavigateTab,
  onInvestigateSignal,
  onOpenChaosSimulator,
}) => {
  return (
    <div className="w-full select-none">
      <CockpitGrid
        onNavigateTab={onNavigateTab}
        onInvestigateSignal={onInvestigateSignal}
        onOpenChaosSimulator={onOpenChaosSimulator}
      />
    </div>
  );
};
