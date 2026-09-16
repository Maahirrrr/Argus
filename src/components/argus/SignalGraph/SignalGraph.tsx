import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ExternalLink,
  ShieldAlert,
  Cpu,
  Info
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

interface SentryNode {
  id: string;
  title: string;
  sub: string;
  status: 'active' | 'warning' | 'critical';
  metric: string;
}

const SENTRY_NODES: SentryNode[] = [
  { id: 'sentry-1', title: 'Spike Detector', sub: 'Sliding 5m z-score', status: 'critical', metric: '+18.4% surge' },
  { id: 'sentry-2', title: 'P99 Latency Sentry', sub: 'HDFC gateway trace', status: 'warning', metric: '14.2s timeout' },
  { id: 'sentry-3', title: 'Anomaly Cluster', sub: 'Deduplicated logs', status: 'active', metric: '14.2k items' },
];

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

  const [hoveredNode, setHoveredNode] = useState<{
    id: string;
    type: 'source' | 'sentry' | 'engine' | 'downstream';
    title: string;
    details: string;
    stats: string;
  } | null>(null);

  const [activeDrawerSource, setActiveDrawerSource] = useState<SignalSourceNode | null>(null);
  const [activeDrawerEvent, setActiveDrawerEvent] = useState<SignalEvent | null>(null);
  const [enginePulsing, setEnginePulsing] = useState<boolean>(false);
  const [activeParticles, setActiveParticles] = useState<{ id: number; sourceIdx: number; targetIdx: number; phase: 1 | 2 | 3 }[]>([]);

  const particleIdCounter = useRef(0);

  useEffect(() => {
    const unsubscribe = signalProvider.subscribe((newEvent) => {
      setEvents((prev) => [newEvent, ...prev.slice(0, 5)]);

      const sourceIdx = sources.findIndex((s) => s.id === newEvent.sourceId);
      const targetIdx = Math.floor(Math.random() * downstream.length);
      const pId = ++particleIdCounter.current;

      // 1. Particle from source to sentry
      setActiveParticles((prev) => [...prev, { id: pId, sourceIdx: sourceIdx >= 0 ? sourceIdx : 0, targetIdx, phase: 1 }]);

      // 2. Particle from sentry to engine
      setTimeout(() => {
        setActiveParticles((prev) => prev.map((p) => p.id === pId ? { ...p, phase: 2 } : p));
        setEnginePulsing(true);
        setTimeout(() => setEnginePulsing(false), 300);
      }, 500);

      // 3. Particle from engine to downstream
      setTimeout(() => {
        setActiveParticles((prev) => prev.map((p) => p.id === pId ? { ...p, phase: 3 } : p));
      }, 1000);

      // 4. Remove particle
      setTimeout(() => {
        setActiveParticles((prev) => prev.filter((p) => p.id !== pId));
      }, 1600);
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
      {/* 1. Header: 4-Stage Pipeline Tracker */}
      <div className="flex flex-col gap-3 pb-3 border-b border-[#1D1D1D]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#F5F5F0]">
              SYSTEMATIC SIGNAL PIPELINE
            </span>
            <span className="text-[10px] font-mono text-[#525252] hidden md:inline">
              / SOURCES → SENTRY → ENGINE → PRODUCT OBJECTS
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono px-2 py-0.5 rounded-[2px] bg-[#141414] border border-[#262626] text-[#8A8A8A]">
              TELEMETRY BUS
            </span>
            <span className="text-[10px] font-mono text-[#0066FF] hidden sm:inline">● CONNECTED</span>
          </div>
        </div>

        {/* 4 Stage Pipeline Stepper */}
        <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono py-1 px-2 rounded-[2px] bg-[#0A0A0A] border border-[#191919]">
          <div className="text-[#8A8A8A] flex items-center justify-center gap-1.5">
            <span className="text-[#0066FF] font-bold">01</span>
            <span className="truncate">Data Sources</span>
          </div>
          <div className="text-[#8A8A8A] flex items-center justify-center gap-1.5 border-l border-[#1F1F1F]">
            <span className="text-[#0066FF] font-bold">02</span>
            <span className="truncate">Signal Sentry</span>
          </div>
          <div className="text-[#8A8A8A] flex items-center justify-center gap-1.5 border-l border-[#1F1F1F]">
            <span className="text-[#0066FF] font-bold">03</span>
            <span className="truncate">Argus Engine</span>
          </div>
          <div className="text-[#8A8A8A] flex items-center justify-center gap-1.5 border-l border-[#1F1F1F]">
            <span className="text-[#0066FF] font-bold">04</span>
            <span className="truncate">Product Objects</span>
          </div>
        </div>
      </div>

      {/* 2. Interactive SVG Canvas & Connected 4-Stage Pipeline */}
      <div className="relative w-full h-[400px] sm:h-[420px] my-3">
        {/* SVG Curved Connections */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 800 420"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Column 1 to Column 2 (Sources -> Sentry) */}
          {sources.map((s, idx) => {
            const startX = 145;
            const startY = 30 + idx * 62;
            const targetSentryIdx = idx % SENTRY_NODES.length;
            const endX = 270;
            const endY = 80 + targetSentryIdx * 115;
            return (
              <path
                key={`src-sentry-${s.id}`}
                d={`M ${startX} ${startY} C ${(startX + endX) / 2} ${startY}, ${(startX + endX) / 2} ${endY}, ${endX} ${endY}`}
                fill="none"
                stroke={hoveredNode?.id === s.id ? '#0066FF' : '#1D1D1D'}
                strokeWidth={hoveredNode?.id === s.id ? 2 : 1}
                strokeOpacity={hoveredNode?.id === s.id ? 1 : 0.5}
                className="transition-all duration-200"
              />
            );
          })}

          {/* Column 2 to Column 3 (Sentry -> Engine) */}
          {SENTRY_NODES.map((sen, idx) => {
            const startX = 370;
            const startY = 80 + idx * 115;
            const endX = 450;
            const endY = 210;
            return (
              <path
                key={`sentry-eng-${sen.id}`}
                d={`M ${startX} ${startY} C ${(startX + endX) / 2} ${startY}, ${(startX + endX) / 2} ${endY}, ${endX} ${endY}`}
                fill="none"
                stroke="#252525"
                strokeWidth={1}
                strokeOpacity={0.6}
              />
            );
          })}

          {/* Column 3 to Column 4 (Engine -> Product Objects) */}
          {downstream.map((d, idx) => {
            const startX = 570;
            const startY = 210;
            const endX = 660;
            const endY = 45 + idx * 95;
            return (
              <path
                key={`eng-down-${d.id}`}
                d={`M ${startX} ${startY} C ${(startX + endX) / 2} ${startY}, ${(startX + endX) / 2} ${endY}, ${endX} ${endY}`}
                fill="none"
                stroke={hoveredNode?.id === d.id ? '#0066FF' : '#1D1D1D'}
                strokeWidth={hoveredNode?.id === d.id ? 2 : 1}
                strokeOpacity={hoveredNode?.id === d.id ? 1 : 0.6}
                className="transition-all duration-200"
              />
            );
          })}

          {/* Active moving particles */}
          {activeParticles.map((p) => {
            if (p.phase === 1) {
              const startX = 145;
              const startY = 30 + p.sourceIdx * 62;
              const targetSentryIdx = p.sourceIdx % SENTRY_NODES.length;
              const endX = 270;
              const endY = 80 + targetSentryIdx * 115;
              const pathD = `M ${startX} ${startY} C ${(startX + endX) / 2} ${startY}, ${(startX + endX) / 2} ${endY}, ${endX} ${endY}`;
              return (
                <circle key={`p1-${p.id}`} r="3" fill="#0066FF">
                  <animateMotion path={pathD} dur="0.5s" repeatCount="1" fill="freeze" />
                </circle>
              );
            } else if (p.phase === 2) {
              const targetSentryIdx = p.sourceIdx % SENTRY_NODES.length;
              const startX = 370;
              const startY = 80 + targetSentryIdx * 115;
              const endX = 450;
              const endY = 210;
              const pathD = `M ${startX} ${startY} C ${(startX + endX) / 2} ${startY}, ${(startX + endX) / 2} ${endY}, ${endX} ${endY}`;
              return (
                <circle key={`p2-${p.id}`} r="3" fill="#38BDF8">
                  <animateMotion path={pathD} dur="0.5s" repeatCount="1" fill="freeze" />
                </circle>
              );
            } else {
              const startX = 570;
              const startY = 210;
              const endX = 660;
              const endY = 45 + p.targetIdx * 95;
              const pathD = `M ${startX} ${startY} C ${(startX + endX) / 2} ${startY}, ${(startX + endX) / 2} ${endY}, ${endX} ${endY}`;
              return (
                <circle key={`p3-${p.id}`} r="3.5" fill="#10B981">
                  <animateMotion path={pathD} dur="0.6s" repeatCount="1" fill="freeze" />
                </circle>
              );
            }
          })}
        </svg>

        {/* ── STAGE 1: DATA SOURCES (Left) ── */}
        <div className="absolute left-0 top-0 bottom-0 w-[140px] flex flex-col justify-around z-20 py-1">
          {sources.map((s) => {
            const isHovered = hoveredNode?.id === s.id;
            return (
              <div
                key={s.id}
                onMouseEnter={() =>
                  setHoveredNode({
                    id: s.id,
                    type: 'source',
                    title: s.name,
                    details: s.description,
                    stats: `Ingestion: ${s.rate} · Status: ${s.status.toUpperCase()} · 1,284 recent items`,
                  })
                }
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => handleOpenSourceDrawer(s)}
                className={`p-2 rounded-[2px] bg-[#0B0B0B] border cursor-pointer transition-all duration-150 relative ${
                  isHovered
                    ? 'border-[#0066FF] bg-[#121214] translate-x-1 shadow-sm shadow-[#0066FF]/20'
                    : 'border-[#1D1D1D] hover:border-[#2D2D2D]'
                }`}
              >
                <div className="flex items-center justify-between text-[9px] font-mono">
                  <span className="font-bold text-[#F5F5F0] truncate">{s.name}</span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      s.status === 'anomaly' ? 'bg-[#EF4444] animate-ping' : 'bg-[#10B981]'
                    }`}
                  />
                </div>
                <div className="text-[8px] font-mono text-[#8A8A8A] truncate mt-0.5">
                  {s.rate}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── STAGE 2: SIGNAL SENTRY (Middle Left) ── */}
        <div className="absolute left-[26%] top-0 bottom-0 w-[120px] flex flex-col justify-around z-20 py-8 hidden sm:flex">
          {SENTRY_NODES.map((sen) => (
            <div
              key={sen.id}
              onMouseEnter={() =>
                setHoveredNode({
                  id: sen.id,
                  type: 'sentry',
                  title: sen.title,
                  details: sen.sub,
                  stats: `Metric: ${sen.metric} · 3 emerging clusters detected · p99 evaluation active`,
                })
              }
              onMouseLeave={() => setHoveredNode(null)}
              className="p-2 rounded-[2px] bg-[#0A0A0A] border border-[#1E1E1E] hover:border-[#0066FF]/60 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-1.5 text-[8px] font-mono text-[#8A8A8A] uppercase font-bold">
                <ShieldAlert className="w-2.5 h-2.5 text-[#0066FF]" />
                <span className="truncate">{sen.title}</span>
              </div>
              <div className="text-[9px] font-bold font-mono text-[#F5F5F0] mt-0.5 truncate">
                {sen.metric}
              </div>
              <div className="text-[8px] font-mono text-[#525252] truncate">
                {sen.sub}
              </div>
            </div>
          ))}
        </div>

        {/* ── STAGE 3: ARGUS ENGINE (Centerpiece) ── */}
        <div className="absolute left-[54%] top-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
          <motion.div
            animate={{
              boxShadow: enginePulsing
                ? '0 0 24px 4px rgba(0, 102, 255, 0.45)'
                : '0 0 12px 1px rgba(0, 102, 255, 0.1)',
              borderColor: enginePulsing ? '#0066FF' : '#2D2D2D',
            }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() =>
              setHoveredNode({
                id: 'engine',
                type: 'engine',
                title: 'Argus Signal Fusion Engine',
                details: 'Continuous multivariate causal attribution and Bayesian conviction scoring.',
                stats: '1,284 recent items · 3 emerging themes · 2 high-confidence opportunities',
              })
            }
            onMouseLeave={() => setHoveredNode(null)}
            onClick={() => onNavigateTab('intelligence')}
            className="w-36 sm:w-44 p-3 bg-[#0A0A0A] border rounded-[3px] text-center cursor-pointer group transition-colors hover:border-[#0066FF]"
            title="Argus Signal Fusion Engine — Click to open dedicated Intelligence Center"
          >
            <div className="flex items-center justify-center gap-1.5 text-[9px] font-mono text-[#0066FF] font-bold">
              <Cpu className="w-3 h-3 text-[#0066FF]" />
              <span>ARGUS ENGINE</span>
            </div>
            <div className="text-xs sm:text-sm font-bold font-display text-[#F5F5F0] tracking-tight mt-0.5">
              CAUSAL FUSION
            </div>
            <div className="text-[9px] font-mono text-[#525252] mt-0.5">
              Bayesian Conviction 94%
            </div>

            <div className="mt-2 pt-2 border-t border-[#1D1D1D] flex items-center justify-center gap-1 text-[9px] font-mono text-[#8A8A8A] group-hover:text-white transition-colors">
              <span>Explore Intelligence</span>
              <ArrowRight className="w-3 h-3 text-[#0066FF]" />
            </div>
          </motion.div>
        </div>

        {/* ── STAGE 4: PRODUCT OBJECTS (Right) ── */}
        <div className="absolute right-0 top-0 bottom-0 w-[140px] flex flex-col justify-around z-20 py-2">
          {downstream.map((d) => {
            const isHovered = hoveredNode?.id === d.id;
            return (
              <div
                key={d.id}
                onMouseEnter={() =>
                  setHoveredNode({
                    id: d.id,
                    type: 'downstream',
                    title: d.label,
                    details: d.description,
                    stats: `Destination: ${d.tab.toUpperCase()} · 2 high-confidence opportunities ready for synthesis`,
                  })
                }
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => onNavigateTab(d.tab)}
                className={`p-2 rounded-[2px] bg-[#0B0B0B] border cursor-pointer transition-all duration-150 group ${
                  isHovered
                    ? 'border-[#0066FF] bg-[#121214] -translate-x-1'
                    : 'border-[#1D1D1D] hover:border-[#2D2D2D]'
                }`}
                title={`Click to navigate directly to ${d.name}`}
              >
                <div className="text-[9px] font-mono text-[#0066FF] font-bold flex items-center justify-between">
                  <span>{d.name}</span>
                  <ArrowRight className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100" />
                </div>
                <div className="text-[10px] font-bold text-[#F5F5F0] truncate mt-0.5">
                  {d.label}
                </div>
                <div className="text-[8px] font-mono text-[#8A8A8A] truncate">
                  {d.description}
                </div>
              </div>
            );
          })}
        </div>

        {/* Contextual Telemetry Hover Card */}
        <AnimatePresence>
          {hoveredNode && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-2 left-1/2 -translate-x-1/2 z-40 bg-[#0E0E0E] border border-[#2D2D2D] p-3 rounded-[3px] shadow-xl max-w-md w-[92%] pointer-events-none"
            >
              <div className="flex items-center justify-between text-[9px] font-mono border-b border-[#1C1C1C] pb-1.5 mb-1.5">
                <div className="flex items-center gap-1.5 text-[#0066FF] font-bold">
                  <Info className="w-3 h-3" />
                  <span>{hoveredNode.title}</span>
                </div>
                <span className="text-[#525252] uppercase">{hoveredNode.type}</span>
              </div>
              <p className="text-[11px] text-[#D4D4D4] leading-tight mb-1">
                {hoveredNode.details}
              </p>
              <div className="text-[10px] font-mono text-[#10B981] bg-[#121212] px-2 py-1 rounded-[2px] border border-[#1F1F1F]">
                {hoveredNode.stats}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
        <div className="md:col-span-4 flex flex-col justify-between p-3 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[2px] text-xs font-mono">
          <div>
            <div className="text-[9px] text-[#525252] uppercase font-bold">CAUSAL CONVICTION</div>
            <div className="text-sm font-bold text-[#10B981] mt-0.5">92% Average</div>
            <p className="text-[10px] text-[#8A8A8A] mt-1 leading-tight">
              1,284 recent items · 3 emerging themes · 2 high-confidence opportunities correlated across ClickHouse, Zendesk, and Segment telemetry.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('intelligence')}
            className="mt-3 w-full py-1.5 rounded-[2px] bg-[#141414] hover:bg-[#1C1C1C] border border-[#2D2D2D] text-[10px] text-[#F5F5F0] font-mono flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
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
