import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import type { SignalEvent, SignalSourceNode, DownstreamNode } from './signalTypes';
import { signalProvider } from './signalProvider';
import { SignalDrawer } from './SignalDrawer';
import { SignalEventStream } from './SignalEventStream';
import { SignalMetrics } from './SignalMetrics';
import type { NavigationTab } from '../../../types/argus';

export interface SignalGraphProps {
  onNavigateTab: (tab: NavigationTab) => void;
  className?: string;
  isHeroMode?: boolean;
}

export const SignalGraph: React.FC<SignalGraphProps> = ({
  onNavigateTab,
  className = '',
  isHeroMode: _isHeroMode = false,
}) => {
  const [sources] = useState<SignalSourceNode[]>(() => signalProvider.getSources());
  const [downstream] = useState<DownstreamNode[]>(() => signalProvider.getDownstream());
  const [metrics] = useState(() => signalProvider.getMetrics());
  const [isSimulating, setIsSimulating] = useState(() => signalProvider.isSimulating());
  const [events, setEvents] = useState<SignalEvent[]>(() => signalProvider.getLatestEvents(6));

  const [hoveredSourceId, setHoveredSourceId] = useState<string | null>(null);
  const [hoveredDownstreamId, setHoveredDownstreamId] = useState<string | null>(null);
  const [activeDrawerSource, setActiveDrawerSource] = useState<SignalSourceNode | null>(null);
  const [activeDrawerEvent, setActiveDrawerEvent] = useState<SignalEvent | null>(null);

  const [enginePulsing, setEnginePulsing] = useState<boolean>(false);
  const [activeParticles, setActiveParticles] = useState<{ id: number; sourceIdx: number; targetIdx: number; phase: 'in' | 'out' }[]>([]);

  const particleIdCounter = useRef(0);

  useEffect(() => {
    const unsubscribe = signalProvider.subscribe((newEvent) => {
      setEvents((prev) => [newEvent, ...prev.slice(0, 5)]);

      // Calculate source and random downstream target
      const sourceIdx = sources.findIndex((s) => s.id === newEvent.sourceId);
      const targetIdx = Math.floor(Math.random() * downstream.length);
      const pId = ++particleIdCounter.current;

      // 1. Particle travels from source to central engine
      setActiveParticles((prev) => [...prev, { id: pId, sourceIdx: sourceIdx >= 0 ? sourceIdx : 0, targetIdx, phase: 'in' }]);

      // 2. Arrival at engine after 850ms -> pulse engine & emit downstream
      setTimeout(() => {
        setEnginePulsing(true);
        setTimeout(() => setEnginePulsing(false), 320);

        // Transition to downstream outcome
        setActiveParticles((prev) =>
          prev.map((p) => (p.id === pId ? { ...p, phase: 'out' } : p))
        );

        // 3. Remove particle after completing downstream path
        setTimeout(() => {
          setActiveParticles((prev) => prev.filter((p) => p.id !== pId));
        }, 850);
      }, 850);
    });

    return () => unsubscribe();
  }, [sources, downstream]);

  const handleToggleSimulation = () => {
    signalProvider.toggleSimulation();
    setIsSimulating(signalProvider.isSimulating());
  };

  const handleOpenSourceDrawer = (source: SignalSourceNode) => {
    const match = events.find((e) => e.sourceId === source.id) || null;
    setActiveDrawerSource(source);
    setActiveDrawerEvent(match);
  };

  return (
    <div
      className={`w-full bg-[#070707] border border-[#1D1D1D] rounded-[4px] p-4 sm:p-5 flex flex-col justify-between shadow-2xl relative select-none overflow-hidden ${className}`}
    >
      {/* 1. Header: Status & Brand */}
      <div className="flex items-center justify-between pb-3 border-b border-[#1D1D1D]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse-dot" />
          <span className="text-[11px] font-mono-tech font-bold uppercase tracking-wider text-[#F5F5F0]">
            REAL-TIME SIGNAL GRAPH
          </span>
          <span className="hidden sm:inline text-[10px] font-mono-tech text-[#525252]">/ INTERACTIVE PREVIEW</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[9px] font-mono-tech px-2 py-0.5 rounded-[2px] bg-[#141414] border border-[#262626] text-[#8A8A8A]">
            SIMULATION
          </span>
          <span className="text-[10px] font-mono-tech text-[#0066FF] hidden sm:inline">● LIVE STREAM</span>
        </div>
      </div>

      {/* 2. Interactive SVG Canvas & Connected Graph */}
      <div className="relative w-full h-[360px] sm:h-[400px] my-3">
        {/* SVG Curved Connections & Real Moving Particles */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 660 380" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <radialGradient id="particleGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="40%" stopColor="#0066FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0066FF" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Lines from Source Nodes (Left) to Central Engine (Center) */}
          {sources.map((s, idx) => {
            const startX = 140;
            const startY = 32 + idx * 56;
            const endX = 260;
            const endY = 190;
            const isHovered = hoveredSourceId === s.id;
            const isDimmed = hoveredSourceId !== null && !isHovered;

            return (
              <path
                key={s.id}
                d={`M ${startX} ${startY} C ${(startX + endX) / 2} ${startY}, ${(startX + endX) / 2} ${endY}, ${endX} ${endY}`}
                fill="none"
                stroke={isHovered ? '#0066FF' : '#1D1D1D'}
                strokeWidth={isHovered ? 2 : 1}
                strokeOpacity={isDimmed ? 0.2 : isHovered ? 1 : 0.6}
                className="transition-all duration-200"
              />
            );
          })}

          {/* Lines from Central Engine (Center) to Downstream Nodes (Right) */}
          {downstream.map((d, idx) => {
            const startX = 400;
            const startY = 190;
            const endX = 520;
            const endY = 45 + idx * 85;
            const isHovered = hoveredDownstreamId === d.id;

            return (
              <path
                key={d.id}
                d={`M ${startX} ${startY} C ${(startX + endX) / 2} ${startY}, ${(startX + endX) / 2} ${endY}, ${endX} ${endY}`}
                fill="none"
                stroke={isHovered ? '#0066FF' : '#1D1D1D'}
                strokeWidth={isHovered ? 2 : 1}
                strokeOpacity={isHovered ? 1 : 0.6}
                className="transition-all duration-200"
              />
            );
          })}

          {/* Real Moving Signal Particles */}
          {activeParticles.map((p) => {
            if (p.phase === 'in') {
              const startX = 140;
              const startY = 32 + p.sourceIdx * 56;
              const endX = 260;
              const endY = 190;
              const pathD = `M ${startX} ${startY} C ${(startX + endX) / 2} ${startY}, ${(startX + endX) / 2} ${endY}, ${endX} ${endY}`;
              return (
                <circle key={p.id} r="3.5" fill="#0066FF">
                  <animateMotion path={pathD} dur="0.85s" repeatCount="1" fill="freeze" />
                </circle>
              );
            } else {
              const startX = 400;
              const startY = 190;
              const endX = 520;
              const endY = 45 + p.targetIdx * 85;
              const pathD = `M ${startX} ${startY} C ${(startX + endX) / 2} ${startY}, ${(startX + endX) / 2} ${endY}, ${endX} ${endY}`;
              return (
                <circle key={p.id} r="3.5" fill="#10B981">
                  <animateMotion path={pathD} dur="0.85s" repeatCount="1" fill="freeze" />
                </circle>
              );
            }
          })}
        </svg>

        {/* 2A. Upstream Source Nodes Column (Left) */}
        <div className="absolute left-0 top-0 bottom-0 w-[140px] flex flex-col justify-around z-20 py-2">
          {sources.map((s) => {
            const isHovered = hoveredSourceId === s.id;
            return (
              <div
                key={s.id}
                onMouseEnter={() => setHoveredSourceId(s.id)}
                onMouseLeave={() => setHoveredSourceId(null)}
                onClick={() => handleOpenSourceDrawer(s)}
                className={`p-1.5 sm:p-2 rounded-[2px] bg-[#0B0B0B] border cursor-pointer transition-all duration-150 relative group ${
                  isHovered
                    ? 'border-[#0066FF] shadow-sm shadow-[#0066FF]/20 bg-[#121214] translate-x-1'
                    : 'border-[#1D1D1D] hover:border-[#2D2D2D]'
                }`}
                title="Click for signal details & interpretation"
              >
                <div className="flex items-center justify-between text-[9px] font-mono-tech">
                  <span className="font-bold text-[#F5F5F0] truncate">{s.name}</span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      s.status === 'anomaly' ? 'bg-[#EF4444] animate-ping' : 'bg-[#10B981]'
                    }`}
                  />
                </div>
                <div className="text-[8px] font-mono-tech text-[#8A8A8A] truncate mt-0.5">
                  {s.rate}
                </div>
              </div>
            );
          })}
        </div>

        {/* 2B. Central Fusion Engine (Centerpiece) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
          <motion.div
            animate={{
              boxShadow: enginePulsing
                ? '0 0 24px 4px rgba(0, 102, 255, 0.45)'
                : '0 0 12px 1px rgba(0, 102, 255, 0.1)',
              borderColor: enginePulsing ? '#0066FF' : '#2D2D2D',
            }}
            transition={{ duration: 0.2 }}
            onClick={() => onNavigateTab('intelligence')}
            className="w-36 sm:w-44 p-3 bg-[#0A0A0A] border rounded-[3px] text-center cursor-pointer group transition-transform hover:scale-[1.02]"
            title="Argus Signal Fusion Engine — Click to open dedicated Intelligence Center"
          >
            <div className="flex items-center justify-center gap-1.5 text-[9px] font-mono-tech text-[#0066FF] font-bold">
              <Sparkles className="w-3 h-3 text-[#0066FF]" />
              <span>ARGUS ENGINE</span>
            </div>
            <div className="text-xs sm:text-sm font-bold font-display text-[#F5F5F0] tracking-tight mt-0.5">
              SIGNAL FUSION
            </div>
            <div className="text-[9px] font-mono-tech text-[#525252] mt-0.5">
              / 01 · 6 Streams Active
            </div>

            <div className="mt-2 pt-2 border-t border-[#1D1D1D] flex items-center justify-center gap-1 text-[9px] font-mono-tech text-[#8A8A8A] group-hover:text-white transition-colors">
              <span>Open Intelligence</span>
              <ArrowRight className="w-3 h-3 text-[#0066FF]" />
            </div>
          </motion.div>
        </div>

        {/* 2C. Downstream Intelligence Nodes (Right) */}
        <div className="absolute right-0 top-0 bottom-0 w-[140px] flex flex-col justify-around z-20 py-4">
          {downstream.map((d) => {
            const isHovered = hoveredDownstreamId === d.id;
            return (
              <div
                key={d.id}
                onMouseEnter={() => setHoveredDownstreamId(d.id)}
                onMouseLeave={() => setHoveredDownstreamId(null)}
                onClick={() => onNavigateTab(d.tab)}
                className={`p-2 rounded-[2px] bg-[#0B0B0B] border cursor-pointer transition-all duration-150 group ${
                  isHovered
                    ? 'border-[#0066FF] bg-[#121214] -translate-x-1'
                    : 'border-[#1D1D1D] hover:border-[#2D2D2D]'
                }`}
                title={`Click to navigate directly to ${d.name}`}
              >
                <div className="text-[9px] font-mono-tech text-[#0066FF] font-bold flex items-center justify-between">
                  <span>{d.name}</span>
                  <ArrowRight className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100" />
                </div>
                <div className="text-[10px] font-bold text-[#F5F5F0] truncate mt-0.5">
                  {d.label}
                </div>
                <div className="text-[8px] font-mono-tech text-[#8A8A8A] truncate">
                  {d.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Event Stream & Live Readouts */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2">
        <div className="md:col-span-8">
          <SignalEventStream
            events={events}
            onSelectEvent={(ev) => {
              const src = sources.find((s) => s.id === ev.sourceId) || sources[0];
              setActiveDrawerSource(src);
              setActiveDrawerEvent(ev);
            }}
          />
        </div>
        <div className="md:col-span-4 flex flex-col justify-between p-3 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[2px] text-xs font-mono-tech">
          <div>
            <div className="text-[9px] text-[#525252] uppercase font-bold">CAUSAL CONVICTION</div>
            <div className="text-sm font-bold text-[#10B981] mt-0.5">92% Average</div>
            <p className="text-[10px] text-[#8A8A8A] mt-1 leading-tight">
              Signals correlated across ClickHouse, Zendesk, and Segment telemetry.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('intelligence')}
            className="mt-3 w-full py-1.5 rounded-[2px] bg-[#141414] hover:bg-[#1C1C1C] border border-[#2D2D2D] text-[10px] text-[#F5F5F0] font-mono-tech flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Explore Intelligence Graph</span>
            <ExternalLink className="w-3 h-3 text-[#0066FF]" />
          </button>
        </div>
      </div>

      {/* 4. Footer Metrics */}
      <SignalMetrics
        metrics={metrics}
        isSimulating={isSimulating}
        onToggleSimulation={handleToggleSimulation}
      />

      {/* 5. Interactive Inspection Drawer */}
      <SignalDrawer
        isOpen={Boolean(activeDrawerSource)}
        onClose={() => {
          setActiveDrawerSource(null);
          setActiveDrawerEvent(null);
        }}
        sourceNode={activeDrawerSource}
        relatedEvent={activeDrawerEvent}
        onNavigateTab={onNavigateTab}
        onCreateOpportunityFromSignal={(_sig) => {
          onNavigateTab('opportunities');
        }}
      />
    </div>
  );
};
