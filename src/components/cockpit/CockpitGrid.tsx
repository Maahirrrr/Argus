import React, { useState } from 'react';
import { CockpitHeader } from './CockpitHeader';
import { TrendingUp } from 'lucide-react';
import { SignalCard } from './SignalCard';
import { OpportunityCard } from './OpportunityCard';
import { RoadmapCard } from './RoadmapCard';
import { ProductHealthCard } from './ProductHealthCard';
import { AIRecommendationCard } from './AIRecommendationCard';
import { ActivityCard } from './ActivityCard';
import { CockpitDrawer, type CockpitDrawerData } from './CockpitDrawer';
import { CockpitCustomizer, DEFAULT_CARDS, type CockpitCardConfig } from './CockpitCustomizer';
import { SignalFabric } from '../argus/ArgusSignalFabric';
import type { NavigationTab } from '../../types/argus';

interface CockpitGridProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onInvestigateSignal?: (signalId: string) => void;
  onOpenChaosSimulator?: () => void;
}

export const CockpitGrid: React.FC<CockpitGridProps> = ({
  onNavigateTab,
  onInvestigateSignal,
  onOpenChaosSimulator,
}) => {
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [drawerData, setDrawerData] = useState<CockpitDrawerData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Cards layout configuration persisted in localStorage
  const [cards, setCards] = useState<CockpitCardConfig[]>(() => {
    try {
      const saved = localStorage.getItem('argus_cockpit_cards');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_CARDS;
  });

  const [density, setDensity] = useState<'compact' | 'balanced' | 'comfortable'>(() => {
    return (localStorage.getItem('argus_density') as any) || 'balanced';
  });

  const handleToggleCardVisibility = (id: string) => {
    setCards((prev) => {
      const next = prev.map((c) => (c.id === id ? { ...c, visible: !c.visible } : c));
      localStorage.setItem('argus_cockpit_cards', JSON.stringify(next));
      return next;
    });
  };

  const handleToggleCardPin = (id: string) => {
    setCards((prev) => {
      const next = prev.map((c) => (c.id === id ? { ...c, pinned: !c.pinned } : c));
      localStorage.setItem('argus_cockpit_cards', JSON.stringify(next));
      return next;
    });
  };

  const handleResetLayout = () => {
    setCards(DEFAULT_CARDS);
    localStorage.removeItem('argus_cockpit_cards');
  };

  const handleSelectDensity = (d: 'compact' | 'balanced' | 'comfortable') => {
    setDensity(d);
    localStorage.setItem('argus_density', d);
    document.body.classList.remove('density-compact', 'density-balanced', 'density-comfortable');
    document.body.classList.add(`density-${d}`);
  };

  const isCardVisible = (id: string) => {
    const found = cards.find((c) => c.id === id);
    return found ? found.visible : true;
  };

  const openDrawerWithData = (data: CockpitDrawerData) => {
    setDrawerData(data);
    setIsDrawerOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4 select-none">
      {/* 1. Cockpit Header */}
      <CockpitHeader
        onRefresh={() => {}}
        onToggleCustomize={() => setIsCustomizing(true)}
        isCustomizing={isCustomizing}
        onOpenChaosSimulator={onOpenChaosSimulator}
      />

      {/* 2. Flush 88px Horizontal KPI Strip with Vertical Dividers */}
      <section className="w-full min-h-[88px] flex flex-col sm:flex-row rounded-[var(--radius-md)] bg-[var(--surface-1)] border border-[var(--border-subtle)] overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-[var(--border-subtle)]">
        {/* Cell 1: Active Signals */}
        <div
          onClick={() =>
            openDrawerWithData({
              type: 'signal',
              title: 'Active Telemetry Signals',
              subtitle: '124 correlated events flagged across ClickHouse pipeline.',
              category: 'Telemetry Anomaly',
              metrics: [
                { label: 'Active Signals', value: '124' },
                { label: 'Critical Severity', value: '4' },
                { label: 'Ingestion Rate', value: '8.4k/sec' },
                { label: 'P99 Latency', value: '142ms' },
              ],
              evidence: [
                'Drop in UPI success rate on secondary payment gateway (HDFC switch).',
                'Surge in checkout latency during evening 8-10 PM transaction spike.',
                '342 verified users encountered unexpected session timeout.',
              ],
              payload: {
                cluster_id: 'sig_cluster_091',
                source: 'sentry_clickhouse',
                metric_deviation: '+18.4%',
                status: 'INVESTIGATING',
              },
              targetTab: 'signals',
            })
          }
          className="flex-1 p-4 sm:py-4 sm:px-6 flex flex-col justify-between hover:bg-[var(--surface-2)] transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-[var(--text-tertiary)] font-sans">
              Active signals
            </span>
            <div className="flex items-center gap-1 text-[11px] font-medium font-sans text-[var(--signal-green)]">
              <TrendingUp className="w-2.5 h-2.5" />
              <span>+18.4%</span>
            </div>
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-[28px] font-bold font-mono text-[var(--text-primary)] leading-none">
              124
            </span>
            <span className="text-[11px] font-normal text-[var(--text-tertiary)] font-sans">
              4 anomalies flagged today
            </span>
          </div>
        </div>

        {/* Cell 2: Opportunity Conviction */}
        <div
          onClick={() =>
            openDrawerWithData({
              type: 'opportunity',
              title: 'Opportunity Conviction Index',
              subtitle: '92% weighted average conviction across backlog items.',
              category: 'Strategic Prioritization',
              metrics: [
                { label: 'High Conviction', value: '8' },
                { label: 'Expected ARR', value: '₹14.6Cr' },
                { label: 'Confidence', value: '92%' },
                { label: 'Review Stage', value: 'Quarterly' },
              ],
              evidence: [
                'Strong cross-channel support ticket volume validating checkout friction.',
                'Competitor analysis demonstrates instant-settlement standard adoption.',
                'Quantitative churn surveys cite payment timeout as top abandonment factor.',
              ],
              targetTab: 'opportunities',
            })
          }
          className="flex-1 p-4 sm:py-4 sm:px-6 flex flex-col justify-between hover:bg-[var(--surface-2)] transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-[var(--text-tertiary)] font-sans">
              Opportunity conviction
            </span>
            <div className="flex items-center gap-1 text-[11px] font-medium font-sans text-[var(--signal-green)]">
              <TrendingUp className="w-2.5 h-2.5" />
              <span>+4.1%</span>
            </div>
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-[28px] font-bold font-mono text-[var(--text-primary)] leading-none">
              92%
            </span>
            <span className="text-[11px] font-normal text-[var(--text-tertiary)] font-sans">
              19 opportunities active
            </span>
          </div>
        </div>

        {/* Cell 3: Product Health */}
        <div
          onClick={() =>
            openDrawerWithData({
              type: 'health',
              title: 'Product Health Architecture',
              subtitle: 'Continuous health telemetry across core user journeys.',
              category: 'Core Telemetry',
              metrics: [
                { label: 'Overall Score', value: '82/100' },
                { label: 'Acquisition', value: '88/100' },
                { label: 'Activation', value: '76/100' },
                { label: 'Retention', value: '84/100' },
              ],
              evidence: [
                'Acquisition funnel is performing within top decile benchmarks.',
                'Activation step requires MPIN flow simplification to reach >85 score.',
                'D30 Retention rate remains stable at 44.2%.',
              ],
              targetTab: 'analytics',
            })
          }
          className="flex-1 p-4 sm:py-4 sm:px-6 flex flex-col justify-between hover:bg-[var(--surface-2)] transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-[var(--text-tertiary)] font-sans">
              Product health
            </span>
            <div className="flex items-center gap-1 text-[11px] font-medium font-sans text-[var(--signal-green)]">
              <TrendingUp className="w-2.5 h-2.5" />
              <span>+1.2%</span>
            </div>
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-[28px] font-bold font-mono text-[var(--text-primary)] leading-none">
              82/100
            </span>
            <span className="text-[11px] font-normal text-[var(--text-tertiary)] font-sans">
              Across 4 critical pillars
            </span>
          </div>
        </div>
      </section>

      {/* 3. Real-Time Signal Fabric */}
      {isCardVisible('signal_fabric') && (
        <div className="w-full">
          <SignalFabric onNavigateTab={onNavigateTab} />
        </div>
      )}

      {/* 4. Signals, Opportunities & Roadmap */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {isCardVisible('signals_card') && (
          <div className="lg:col-span-4">
            <SignalCard
              onOpenSignal={(id) => {
                if (onInvestigateSignal) {
                  onInvestigateSignal(id);
                } else {
                  openDrawerWithData({
                    type: 'signal',
                    title: `Signal ${id}: Latency Anomaly`,
                    subtitle: 'Transaction failover during evening peak window.',
                    category: 'Ingestion Anomaly',
                    metrics: [
                      { label: 'Signal ID', value: id },
                      { label: 'Severity', value: 'Critical' },
                      { label: 'Impact GMV', value: '₹4.2Cr' },
                      { label: 'Correlated Tickets', value: '18' },
                    ],
                    evidence: [
                      'Drop in UPI success rate on secondary payment gateway.',
                      'Elevated 504 Gateway Timeouts from acquiring switch.',
                    ],
                    targetTab: 'signals',
                  });
                }
              }}
              onNavigateTab={() => onNavigateTab('signals')}
            />
          </div>
        )}

        {isCardVisible('opportunities_card') && (
          <div className="lg:col-span-4">
            <OpportunityCard
              onOpenOpportunity={(_id) => onNavigateTab('opportunities')}
              onNavigateTab={() => onNavigateTab('opportunities')}
            />
          </div>
        )}

        {isCardVisible('roadmap_card') && (
          <div className="lg:col-span-4">
            <RoadmapCard onNavigateTab={() => onNavigateTab('roadmap')} />
          </div>
        )}
      </div>

      {/* 5. Health, AI Recs & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {isCardVisible('product_health') && (
          <div className="lg:col-span-4">
            <ProductHealthCard />
          </div>
        )}

        {isCardVisible('ai_recommendations') && (
          <div className="lg:col-span-4">
            <AIRecommendationCard
              onReviewEvidence={() => onNavigateTab('insights')}
              onCreateOpportunity={() => onNavigateTab('opportunities')}
            />
          </div>
        )}

        {isCardVisible('activity_log') && (
          <div className="lg:col-span-4">
            <ActivityCard onNavigateTab={onNavigateTab} />
          </div>
        )}
      </div>

      {/* Cockpit Customizer Modal */}
      <CockpitCustomizer
        isOpen={isCustomizing}
        onClose={() => setIsCustomizing(false)}
        cards={cards}
        onToggleCardVisibility={handleToggleCardVisibility}
        onToggleCardPin={handleToggleCardPin}
        onResetLayout={handleResetLayout}
        density={density}
        onSelectDensity={handleSelectDensity}
      />

      {/* Deep Dive Drawer */}
      <CockpitDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        data={drawerData}
        onNavigateTab={onNavigateTab}
      />
    </div>
  );
};
