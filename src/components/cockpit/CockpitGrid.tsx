import React, { useState } from 'react';
import { CockpitHeader } from './CockpitHeader';
import { MetricCard } from './MetricCard';
import { SignalCard } from './SignalCard';
import { OpportunityCard } from './OpportunityCard';
import { RoadmapCard } from './RoadmapCard';
import { ProductHealthCard } from './ProductHealthCard';
import { AIRecommendationCard } from './AIRecommendationCard';
import { ActivityCard } from './ActivityCard';
import { CockpitDrawer } from './CockpitDrawer';
import { SignalFabric } from '../argus/ArgusSignalFabric';
import type { NavigationTab } from '../../types/argus';

interface CockpitGridProps {
  onNavigateTab: (tab: NavigationTab) => void;
}

export const CockpitGrid: React.FC<CockpitGridProps> = ({ onNavigateTab }) => {
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [drawerData, setDrawerData] = useState<{
    isOpen: boolean;
    title: string;
    subtitle?: string;
    targetTab?: NavigationTab;
  }>({
    isOpen: false,
    title: '',
  });

  const handleOpenDrawer = (title: string, subtitle?: string, targetTab?: NavigationTab) => {
    setDrawerData({
      isOpen: true,
      title,
      subtitle,
      targetTab,
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-5 select-none">
      {/* 1. Cockpit Header */}
      <CockpitHeader
        onRefresh={() => {}}
        onToggleCustomize={() => setIsCustomizing(!isCustomizing)}
        isCustomizing={isCustomizing}
      />

      {/* 2. Row 1: High-Density Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <MetricCard
          label="ACTIVE SIGNALS"
          value="124"
          delta="+18.4%"
          isPositive={false}
          subtext="4 anomalies flagged today"
          onClick={() => handleOpenDrawer('Active Telemetry Signals', '124 correlated events across ClickHouse sentry.', 'signals')}
        />
        <MetricCard
          label="OPPORTUNITY CONVICTION"
          value="92%"
          delta="+4.1%"
          isPositive={true}
          subtext="19 opportunities active"
          onClick={() => handleOpenDrawer('Opportunity Conviction Index', '92% weighted average across prioritized backlog.', 'opportunities')}
        />
        <MetricCard
          label="PRODUCT HEALTH SCORE"
          value="82/100"
          delta="STABLE"
          isPositive={true}
          subtext="Across 4 critical pillars"
          onClick={() => handleOpenDrawer('Product Health Architecture', 'Nominal performance across Acquisition, Retention, Activation.', 'analytics')}
        />
      </div>

      {/* 3. Row 2: Signature Real-Time Signal Fabric (Large Span 12) */}
      <div className="w-full">
        <SignalFabric onNavigateTab={onNavigateTab} />
      </div>

      {/* 4. Row 3: Signals, Opportunities & Roadmap */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        <div className="lg:col-span-4">
          <SignalCard
            onOpenSignal={(id) => handleOpenDrawer(`Signal ${id} Telemetry`, 'Surge in transaction failover during evening peak.', 'signals')}
            onNavigateTab={() => onNavigateTab('signals')}
          />
        </div>

        <div className="lg:col-span-4">
          <OpportunityCard
            onOpenOpportunity={(id) => handleOpenDrawer(`Opportunity ${id}: Checkout Failover`, 'Deploy dynamic switch failover when latency exceeds P99.', 'opportunities')}
            onNavigateTab={() => onNavigateTab('opportunities')}
          />
        </div>

        <div className="lg:col-span-4">
          <RoadmapCard onNavigateTab={() => onNavigateTab('roadmap')} />
        </div>
      </div>

      {/* 5. Row 4: AI Analytical Recommendations & Chronological Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        <div className="lg:col-span-6">
          <AIRecommendationCard
            onReviewEvidence={() => handleOpenDrawer('AI Strategic Recommendation', 'Detailed causal evidence linking drop-off to MPIN prompt delays.', 'prds')}
            onCreateOpportunity={() => onNavigateTab('opportunities')}
          />
        </div>

        <div className="lg:col-span-6">
          <ActivityCard />
        </div>
      </div>

      {/* 6. Row 5: Product Health Breakdown */}
      <div className="w-full">
        <ProductHealthCard />
      </div>

      {/* Detail Slide-out Drawer */}
      <CockpitDrawer
        isOpen={drawerData.isOpen}
        onClose={() => setDrawerData((prev) => ({ ...prev, isOpen: false }))}
        title={drawerData.title}
        subtitle={drawerData.subtitle}
        targetTab={drawerData.targetTab}
        onNavigateTab={onNavigateTab}
      />
    </div>
  );
};
