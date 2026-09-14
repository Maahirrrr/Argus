import React, { useState } from 'react';
import { CockpitHeader } from './CockpitHeader';
import { MetricCard } from './MetricCard';
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

  // Information density
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
    <div className="max-w-7xl mx-auto space-y-5 select-none">
      {/* 1. Cockpit Header with Customization Toggle */}
      <CockpitHeader
        onRefresh={() => {}}
        onToggleCustomize={() => setIsCustomizing(true)}
        isCustomizing={isCustomizing}
        onOpenChaosSimulator={onOpenChaosSimulator}
      />

      {/* 2. Row 1: High-Density Metric Cards (Top Row) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {isCardVisible('metric_signals') && (
          <MetricCard
            label="ACTIVE SIGNALS"
            value="124"
            delta="+18.4%"
            isPositive={false}
            subtext="4 anomalies flagged today"
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
          />
        )}

        {isCardVisible('metric_conviction') && (
          <MetricCard
            label="OPPORTUNITY CONVICTION"
            value="92%"
            delta="+4.1%"
            isPositive={true}
            subtext="19 opportunities active"
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
          />
        )}

        {isCardVisible('metric_health') && (
          <MetricCard
            label="PRODUCT HEALTH SCORE"
            value="82/100"
            delta="STABLE"
            isPositive={true}
            subtext="Across 4 critical pillars"
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
          />
        )}
      </div>

      {/* 3. Row 2: Signature Real-Time Signal Fabric (Large Span 12) */}
      {isCardVisible('signal_fabric') && (
        <div className="w-full">
          <SignalFabric onNavigateTab={onNavigateTab} />
        </div>
      )}

      {/* 4. Row 3: Signals, Opportunities & Roadmap */}
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
                      'Secondary switch gateway failed over with 1,800ms P99 latency.',
                      'Correlated with Sentry alert cluster #9940.',
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
              onOpenOpportunity={(id) =>
                openDrawerWithData({
                  type: 'opportunity',
                  title: `Opportunity ${id}: Dynamic Failover Switch`,
                  subtitle: 'Deploy intelligent gateway failover when latency exceeds P99.',
                  category: 'High Conviction #014',
                  conviction: 94,
                  impact: '₹4.2Cr',
                  metrics: [
                    { label: 'Conviction', value: '94%' },
                    { label: 'Expected ARR', value: '+₹4.2Cr' },
                    { label: 'Effort', value: '3 Weeks' },
                    { label: 'Status', value: 'Prioritized' },
                  ],
                  evidence: [
                    '3 independent signal clusters identified during peak load window.',
                    'Direct customer survey responses confirm willingness to retry if routed smoothly.',
                  ],
                  targetTab: 'opportunities',
                })
              }
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

      {/* 5. Row 4: AI Analytical Recommendations & Chronological Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {isCardVisible('ai_recommendations') && (
          <div className="lg:col-span-6">
            <AIRecommendationCard
              onReviewEvidence={() =>
                openDrawerWithData({
                  type: 'recommendation',
                  title: 'AI Recommendation: Instant Checkout Routing',
                  subtitle: 'Algorithmic recommendation generated from 124 correlated telemetry events.',
                  category: 'ARGUS Intelligence Engine',
                  metrics: [
                    { label: 'AI Confidence', value: '91%' },
                    { label: 'Model', value: 'Gemini 2.5 Flash' },
                    { label: 'Projected Uplift', value: '+3.4%' },
                    { label: 'Risk Score', value: 'Low' },
                  ],
                  reasoningSteps: [
                    'Identified recurring failover bottleneck at 20:00-22:00 IST daily.',
                    'Correlated Zendesk escalation tickets with gateway timeout events.',
                    'Verified that secondary gateway switch had 99.8% availability during identical timeframes.',
                    'Synthesized automated PRD spec for dynamic gateway routing engine.',
                  ],
                  evidence: [
                    'Sentry trace id: #tr_889421 shows 2.4s TCP handshake latency.',
                    'Zendesk cohort #8420 customer feedback mentions repeated timeout retry loops.',
                  ],
                  targetTab: 'prds',
                })
              }
              onCreateOpportunity={() => onNavigateTab('opportunities')}
            />
          </div>
        )}

        {isCardVisible('activity_card') && (
          <div className="lg:col-span-6">
            <ActivityCard onNavigateTab={onNavigateTab} />
          </div>
        )}
      </div>

      {/* 6. Row 5: Product Health Breakdown */}
      {isCardVisible('product_health_breakdown') && (
        <div
          className="w-full cursor-pointer"
          onClick={() =>
            openDrawerWithData({
              type: 'health',
              title: 'Product Health Deep-Dive Telemetry',
              subtitle: 'Multi-pillar diagnostic telemetry across Acquisition, Retention, Activation.',
              category: 'Telemetry Analytics',
              metrics: [
                { label: 'Acquisition', value: '88/100' },
                { label: 'Retention', value: '84/100' },
                { label: 'Activation', value: '76/100' },
                { label: 'Engagement', value: '80/100' },
              ],
              evidence: [
                'Organic signups increased +14% week-over-week.',
                'Checkout onboarding funnel drop-off concentrated at OTP validation step.',
              ],
              targetTab: 'analytics',
            })
          }
        >
          <ProductHealthCard />
        </div>
      )}

      {/* Contextual Slide-out Drawer */}
      <CockpitDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        data={drawerData}
        onNavigateTab={onNavigateTab}
      />

      {/* Customize Cockpit Layout Drawer */}
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
    </div>
  );
};
