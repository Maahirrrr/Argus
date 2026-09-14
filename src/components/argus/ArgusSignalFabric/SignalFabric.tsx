import React, { useState, useEffect } from 'react';
import { IntelligenceOutput } from './IntelligenceOutput';
import { SignalEventStream } from './SignalEventStream';
import { IntelligenceStatus } from './IntelligenceStatus';
import { demoSignalProvider } from './simulationEngine';
import type { NavigationTab } from '../../../types/argus';

export interface SignalFabricProps {
  onNavigateTab: (tab: NavigationTab) => void;
  className?: string;
  isHeroMode?: boolean;
}

type TabCategory = 'all' | 'product' | 'users' | 'market';

interface SourceItem {
  id: string;
  name: string;
  metric: string;
  status: 'live' | 'failing' | 'degraded';
  category: 'product' | 'users' | 'market';
}

const SOURCES: SourceItem[] = [
  { id: 'src-1', name: 'Payments', metric: '1.42M txns/day', status: 'failing', category: 'product' },
  { id: 'src-2', name: 'Transactions', metric: '18.4K vol', status: 'live', category: 'product' },
  { id: 'src-3', name: 'Support', metric: '47 users', status: 'degraded', category: 'users' },
  { id: 'src-4', name: 'Retention', metric: '61.2% WAU', status: 'live', category: 'users' },
  { id: 'src-5', name: 'Feedback', metric: '520 reports/wk', status: 'live', category: 'users' },
  { id: 'src-6', name: 'Competitor', metric: 'Superhuman v2', status: 'degraded', category: 'market' },
];

export const SignalFabric: React.FC<SignalFabricProps> = ({
  onNavigateTab,
  className = '',
}) => {
  const [activeCategory, setActiveCategory] = useState<TabCategory>('all');
  const [outputs] = useState(() => demoSignalProvider.getOutputs());
  const [events, setEvents] = useState(() => demoSignalProvider.getLatestEvents(5));
  const [hoveredOutputId, setHoveredOutputId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = demoSignalProvider.subscribe(() => {
      setEvents(demoSignalProvider.getLatestEvents(5));
    });
    return () => unsubscribe();
  }, []);

  const filteredSources = activeCategory === 'all'
    ? SOURCES
    : SOURCES.filter((s) => s.category === activeCategory);

  const getStatusDot = (status: SourceItem['status']) => {
    switch (status) {
      case 'failing':
        return 'bg-[var(--signal-red)]';
      case 'degraded':
        return 'bg-[var(--signal-amber)]';
      default:
        return 'bg-[var(--signal-green)]';
    }
  };

  return (
    <div
      className={`w-full bg-[var(--surface-1)] border border-[var(--border-subtle)] rounded-[var(--radius-md)] p-4 sm:p-5 flex flex-col justify-between select-none space-y-4 ${className}`}
    >
      {/* 1. Header with Flat Tabs: "All", "Product", "Users", "Market" */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-semibold font-['Space_Grotesk',sans-serif] text-[var(--text-primary)]">
            Signal fabric
          </span>
          <span className="text-[11px] font-sans text-[var(--text-tertiary)] hidden sm:inline">
            6 streams · 4 signals active
          </span>
        </div>

        {/* Flat Tabs — active has 2px bottom border in --signal-blue, no pills */}
        <div className="flex items-center gap-4">
          {(['all', 'product', 'users', 'market'] as const).map((tab) => {
            const isActive = activeCategory === tab;
            const label = tab.charAt(0).toUpperCase() + tab.slice(1);
            return (
              <button
                key={tab}
                onClick={() => setActiveCategory(tab)}
                className={`pb-1 text-[13px] transition-colors cursor-pointer border-b-2 ${
                  isActive
                    ? 'font-semibold font-["Space_Grotesk",sans-serif] text-[var(--text-primary)] border-[var(--signal-blue)]'
                    : 'font-normal font-sans text-[var(--text-tertiary)] hover:text-[var(--text-primary)] border-transparent'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Desktop Three-Zone Layout */}
      <div className="hidden md:flex items-center justify-between gap-4 h-[300px] relative px-2">
        {/* Zone A: Sources (200px wide vertical list, NO cards, 8px row gaps) */}
        <div className="w-[200px] flex-shrink-0 flex flex-col justify-center space-y-3 z-20">
          {filteredSources.map((s) => (
            <div
              key={s.id}
              onClick={() => onNavigateTab('signals')}
              className="flex items-center justify-between cursor-pointer group py-0.5"
            >
              <div className="flex items-center gap-2 truncate">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${getStatusDot(s.status)}`} />
                <span className="text-[13px] font-medium font-sans text-[var(--text-primary)] group-hover:text-[var(--signal-blue)] transition-colors truncate">
                  {s.name}
                </span>
              </div>
              <span className="text-[11px] font-mono text-[var(--text-secondary)] flex-shrink-0">
                {s.metric}
              </span>
            </div>
          ))}
        </div>

        {/* Zone B: Engine Center Status Line + 1px SVG paths (flex-1) */}
        <div className="flex-1 h-full relative flex items-center justify-center">
          {/* Static SVG paths connecting Zone A to center and center to Zone C */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 400 300"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Connecting lines from Zone A to center */}
            {filteredSources.map((_, idx) => {
              const startY = 35 + idx * 46;
              return (
                <path
                  key={`left-${idx}`}
                  d={`M 0 ${startY} C 100 ${startY}, 120 150, 200 150`}
                  fill="none"
                  stroke="var(--border-default)"
                  strokeWidth="1"
                />
              );
            })}

            {/* Connecting lines from center to Zone C */}
            {outputs.map((_, idx) => {
              const endY = 40 + idx * 72;
              return (
                <path
                  key={`right-${idx}`}
                  d={`M 200 150 C 280 150, 300 ${endY}, 400 ${endY}`}
                  fill="none"
                  stroke="var(--border-default)"
                  strokeWidth="1"
                />
              );
            })}
          </svg>

          {/* Center Single Status Line: "Signal fusion · 6 streams · 4 signals active" */}
          <div className="z-20 px-3 py-1.5 rounded-[var(--radius-sm)] bg-[var(--surface-0)] border border-[var(--border-subtle)]">
            <span className="text-[12px] font-normal font-sans text-[var(--text-tertiary)]">
              Signal fusion · 6 streams · 4 signals active
            </span>
          </div>
        </div>

        {/* Zone C: Outcomes (260px wide vertical list of TYPE C outcome cards) */}
        <div className="w-[260px] flex-shrink-0 flex flex-col justify-between space-y-2 z-20">
          {outputs.map((out) => (
            <IntelligenceOutput
              key={out.id}
              output={out}
              isHovered={hoveredOutputId === out.id}
              isHighlighted={false}
              onMouseEnter={() => setHoveredOutputId(out.id)}
              onMouseLeave={() => setHoveredOutputId(null)}
              onClick={() => onNavigateTab(out.tab)}
            />
          ))}
        </div>
      </div>

      {/* Mobile Responsive Layout (< md) */}
      <div className="md:hidden space-y-3 py-2">
        <div className="space-y-2">
          {filteredSources.map((s) => (
            <div
              key={s.id}
              onClick={() => onNavigateTab('signals')}
              className="flex items-center justify-between py-1 px-2 rounded-[var(--radius-sm)] bg-[var(--surface-2)]"
            >
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${getStatusDot(s.status)}`} />
                <span className="text-[13px] font-medium font-sans text-[var(--text-primary)]">
                  {s.name}
                </span>
              </div>
              <span className="text-[11px] font-mono text-[var(--text-secondary)]">
                {s.metric}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center py-2 text-[12px] text-[var(--text-tertiary)] font-sans border-y border-[var(--border-subtle)]">
          Signal fusion · 6 streams · 4 signals active
        </div>

        <div className="space-y-2">
          {outputs.map((out) => (
            <IntelligenceOutput
              key={out.id}
              output={out}
              isHovered={false}
              isHighlighted={false}
              onMouseEnter={() => {}}
              onMouseLeave={() => {}}
              onClick={() => onNavigateTab(out.tab)}
            />
          ))}
        </div>
      </div>

      {/* 3. Event Stream & Intelligence Panel */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-3 border-t border-[var(--border-subtle)]">
        <div className="md:col-span-7">
          <SignalEventStream
            events={events}
            onSelectEvent={(_ev) => onNavigateTab('intelligence')}
          />
        </div>
        <div className="md:col-span-5">
          <IntelligenceStatus
            onNavigateToIntelligence={() => onNavigateTab('intelligence')}
          />
        </div>
      </div>
    </div>
  );
};
