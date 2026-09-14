import React, { useState, useEffect } from 'react';
import { CardSpotlight } from '../../ui/CardSpotlight';
import { SignalFilters, type FilterCategory } from './SignalFilters';
import { SignalSource } from './SignalSource';
import { ArgusEngine } from './ArgusEngine';
import { IntelligenceOutput } from './IntelligenceOutput';
import { SignalEventStream } from './SignalEventStream';
import { IntelligenceStatus } from './IntelligenceStatus';
import { SignalConnection } from './SignalConnection';
import { SignalParticle } from './SignalParticle';
import {
  demoSignalProvider,
  type SimulationStepState,
} from './simulationEngine';
import type { SignalSource as SignalSourceType } from './signalData';
import type { NavigationTab } from '../../../types/argus';

export interface SignalFabricProps {
  onNavigateTab: (tab: NavigationTab) => void;
  className?: string;
  isHeroMode?: boolean;
}

export const SignalFabric: React.FC<SignalFabricProps> = ({
  onNavigateTab,
  className = '',
}) => {
  const [sources] = useState<SignalSourceType[]>(() => demoSignalProvider.getSources());
  const [outputs] = useState(() => demoSignalProvider.getOutputs());
  const [events, setEvents] = useState(() => demoSignalProvider.getLatestEvents(5));
  const [filter, setFilter] = useState<FilterCategory>('all');

  const [hoveredSourceId, setHoveredSourceId] = useState<string | null>(null);
  const [hoveredOutputId, setHoveredOutputId] = useState<string | null>(null);
  const [isEngineHovered, setIsEngineHovered] = useState<boolean>(false);

  // Simulation loop state
  const [activeStep, setActiveStep] = useState<SimulationStepState | null>(null);
  const [isSimulating, setIsSimulating] = useState(() => demoSignalProvider.isSimulating());
  const [reducedMotion, setReducedMotion] = useState(false);

  // Track reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Subscribe to demo simulation loop
  useEffect(() => {
    const unsubscribe = demoSignalProvider.subscribe((stepState) => {
      setActiveStep(stepState);
      setEvents(demoSignalProvider.getLatestEvents(5));
    });
    return () => unsubscribe();
  }, []);

  const engineLeftX = 245;
  const engineRightX = 415;
  const engineCenterY = 190;

  return (
    <CardSpotlight
      radius={320}
      color="rgba(0, 102, 255, 0.1)"
      className={`w-full bg-[#050505] border border-[#1D1D1D] rounded-[4px] p-4 sm:p-5 flex flex-col justify-between shadow-2xl relative select-none ${className}`}
    >
      {/* 1. Header: Honest Identity & Simulation State */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#1D1D1D]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-pulse" />
          <span className="text-[11px] font-mono-tech font-bold uppercase tracking-wider text-[#F5F5F0]">
            ARGUS SIGNAL FABRIC
          </span>
          <span className="hidden md:inline text-[9.5px] font-mono-tech text-[#555]">
            06 SOURCES / 01 ENGINE / 04 OUTCOMES
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Category Filters */}
          <SignalFilters selected={filter} onSelect={setFilter} />

          {/* Honest Simulation State Pill */}
          <button
            type="button"
            onClick={() => {
              demoSignalProvider.toggleSimulation();
              setIsSimulating(demoSignalProvider.isSimulating());
            }}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-[#121212] border border-[#222] hover:border-[#333] text-[9px] font-mono-tech cursor-pointer transition-colors"
            title="Click to toggle deterministic simulation loop"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isSimulating ? 'bg-[#F59E0B] animate-pulse' : 'bg-[#555]'
              }`}
            />
            <span className={isSimulating ? 'text-[#D0D0D0]' : 'text-[#666]'}>
              SIMULATION
            </span>
          </button>
        </div>
      </div>

      {/* 2. Desktop 3-Layer Graph Visualization */}
      <div className="hidden sm:block relative w-full h-[370px] my-3">
        {/* SVG Curved Connections & Real Moving Particles */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          viewBox="0 0 660 380"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="argusParticleGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="40%" stopColor="#0066FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0066FF" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Lines from Source Nodes (Left) to Central Engine (Center) */}
          {sources.map((s, idx) => {
            const startX = 135;
            const startY = 32 + idx * 56;
            const endX = engineLeftX;
            const endY = engineCenterY;

            const isMatchingFilter = filter === 'all' || s.category === filter;
            const isHovered = hoveredSourceId === s.id;
            const isDimmed = !isMatchingFilter || (hoveredSourceId !== null && !isHovered);
            const isActiveAnomaly = activeStep?.sourceId === s.id && activeStep.phase === 'in';

            return (
              <SignalConnection
                key={s.id}
                startX={startX}
                startY={startY}
                endX={endX}
                endY={endY}
                isHighlighted={isHovered || (isEngineHovered && !isDimmed)}
                isDimmed={isDimmed}
                isActiveFlow={isActiveAnomaly}
              />
            );
          })}

          {/* Lines from Central Engine (Center) to Downstream Outputs (Right) */}
          {outputs.map((d, idx) => {
            const startX = engineRightX;
            const startY = engineCenterY;
            const endX = 525;
            const endY = 48 + idx * 85;

            const isHovered = hoveredOutputId === d.id;
            const isActiveOut = activeStep?.outputId === d.id && activeStep.phase === 'out';

            return (
              <SignalConnection
                key={d.id}
                startX={startX}
                startY={startY}
                endX={endX}
                endY={endY}
                isHighlighted={isHovered || isEngineHovered}
                isDimmed={false}
                isActiveFlow={isActiveOut}
              />
            );
          })}

          {/* Animated SVG Particles along paths */}
          {!reducedMotion && activeStep && activeStep.phase === 'in' && (() => {
            const srcIdx = sources.findIndex((s) => s.id === activeStep.sourceId);
            if (srcIdx < 0) return null;
            const startX = 135;
            const startY = 32 + srcIdx * 56;
            const endX = engineLeftX;
            const endY = engineCenterY;
            const midX = (startX + endX) / 2;
            const pathD = `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`;
            return <SignalParticle key={`p-in-${activeStep.activeParticleId}`} pathD={pathD} color="#0066FF" size={2.5} />;
          })()}

          {!reducedMotion && activeStep && activeStep.phase === 'out' && (() => {
            const outIdx = outputs.findIndex((o) => o.id === activeStep.outputId);
            if (outIdx < 0) return null;
            const startX = engineRightX;
            const startY = engineCenterY;
            const endX = 525;
            const endY = 48 + outIdx * 85;
            const midX = (startX + endX) / 2;
            const pathD = `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`;
            return <SignalParticle key={`p-out-${activeStep.activeParticleId}`} pathD={pathD} color="#10B981" size={2.5} />;
          })()}
        </svg>

        {/* 2A. Left Layer: Signal Sources */}
        <div className="absolute left-0 top-0 bottom-0 w-[135px] flex flex-col justify-between z-20 py-1">
          {sources.map((s) => {
            const isMatchingFilter = filter === 'all' || s.category === filter;
            const isHovered = hoveredSourceId === s.id;
            const isDimmed = !isMatchingFilter || (hoveredSourceId !== null && !isHovered);
            const isActiveAnomaly = activeStep?.sourceId === s.id && (activeStep.phase === 'in' || activeStep.phase === 'processing');

            return (
              <SignalSource
                key={s.id}
                source={s}
                isHovered={isHovered}
                isDimmed={isDimmed}
                isActiveAnomaly={isActiveAnomaly}
                onMouseEnter={() => setHoveredSourceId(s.id)}
                onMouseLeave={() => setHoveredSourceId(null)}
                onClick={() => onNavigateTab('intelligence')}
              />
            );
          })}
        </div>

        {/* 2B. Center Layer: ARGUS Signal Fusion Engine */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
          <ArgusEngine
            isPulsing={activeStep?.phase === 'processing'}
            enginePhase={activeStep?.enginePhase || 'idle'}
            engineMessage={activeStep?.engineMessage || ''}
            onNavigateToIntelligence={() => onNavigateTab('intelligence')}
            onMouseEnter={() => setIsEngineHovered(true)}
            onMouseLeave={() => setIsEngineHovered(false)}
          />
        </div>

        {/* 2C. Right Layer: Intelligence Outputs */}
        <div className="absolute right-0 top-0 bottom-0 w-[135px] flex flex-col justify-between z-20 py-2">
          {outputs.map((out) => {
            const isHovered = hoveredOutputId === out.id;
            const isHighlighted = activeStep?.outputId === out.id && activeStep.phase === 'out';

            return (
              <IntelligenceOutput
                key={out.id}
                output={out}
                isHovered={isHovered}
                isHighlighted={isHighlighted}
                onMouseEnter={() => setHoveredOutputId(out.id)}
                onMouseLeave={() => setHoveredOutputId(null)}
                onClick={() => onNavigateTab(out.tab)}
              />
            );
          })}
        </div>
      </div>

      {/* 2-ALT. Mobile Responsive Simplified Vertical Flow (< sm) */}
      <div className="sm:hidden flex flex-col items-center gap-3 my-4 py-2 border-y border-[#181818]">
        {/* Step 1: Active Source */}
        <div className="w-full max-w-[240px] p-2 bg-[#0A0A0A] border border-[#EF4444]/60 rounded-[2px] text-center">
          <div className="text-[9px] font-mono-tech text-[#EF4444] font-bold">
            ● PAYMENTS ANOMALY (+18.4%)
          </div>
          <div className="text-[8.5px] font-mono-tech text-[#8A8A8A]">1.42M txns/day</div>
        </div>

        {/* Down Arrow */}
        <div className="text-[#0066FF] text-xs font-mono-tech animate-bounce">↓</div>

        {/* Step 2: ARGUS Engine */}
        <div
          onClick={() => onNavigateTab('intelligence')}
          className="w-full max-w-[260px] p-3 bg-[#0E0E12] border border-[#0066FF] rounded-[2px] text-center cursor-pointer"
        >
          <div className="text-[9px] font-mono-tech text-[#0066FF] font-bold">ARGUS ENGINE</div>
          <div className="text-xs font-bold text-[#F5F5F0]">SIGNAL FUSION</div>
          <div className="text-[8px] font-mono-tech text-[#10B981] mt-0.5">● PROCESSING</div>
        </div>

        {/* Down Arrow */}
        <div className="text-[#10B981] text-xs font-mono-tech animate-bounce">↓</div>

        {/* Step 3: Opportunity Output */}
        <div
          onClick={() => onNavigateTab('opportunities')}
          className="w-full max-w-[240px] p-2 bg-[#0A0A0A] border border-[#10B981]/50 rounded-[2px] text-center cursor-pointer"
        >
          <div className="text-[9px] font-mono-tech text-[#0066FF] font-bold">OPPORTUNITY #014</div>
          <div className="text-[8.5px] font-mono-tech text-[#F5F5F0]">Checkout failover</div>
        </div>

        {/* Horizontal scrollable source strip */}
        <div className="w-full overflow-x-auto flex gap-2 pt-2 pb-1 scrollbar-none">
          {sources.map((s) => (
            <div
              key={s.id}
              onClick={() => onNavigateTab('intelligence')}
              className="flex-shrink-0 px-2.5 py-1 rounded-[2px] bg-[#0E0E0E] border border-[#1D1D1D] text-[8.5px] font-mono-tech text-[#8A8A8A]"
            >
              <span className="font-bold text-[#F5F5F0]">{s.name}: </span>
              <span>{s.metric}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Event Stream & Intelligence Status */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2">
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
    </CardSpotlight>
  );
};
