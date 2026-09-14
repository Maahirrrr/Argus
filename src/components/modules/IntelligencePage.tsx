import React, { useState } from 'react';
import {
  Sparkles,
  Filter,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  PlusCircle
} from 'lucide-react';
import type { NavigationTab } from '../../types/argus';
import { CardSpotlight } from '../ui/CardSpotlight';
import { GlowingEffect } from '../ui/GlowingEffect';
import { TracingBeam } from '../ui/TracingBeam';
import { ArgusButton } from '../ui/ArgusButton';
import { ArgusBadge } from '../ui/ArgusBadge';
import { ArgusDrawer } from '../ui/ArgusDrawer';
import { CompetitiveIntel } from './CompetitiveIntel';

interface IntelligencePageProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onShowToast: (msg: string) => void;
}

type SourceFilter = 'ALL' | 'ANALYTICS' | 'FEEDBACK' | 'RESEARCH' | 'CUSTOMERS' | 'COMPETITORS' | 'MARKET' | 'SUPPORT' | 'REVENUE';
type ConfidenceFilter = 'ALL' | 'HIGH' | 'MEDIUM' | 'LOW';
type StatusFilter = 'ALL' | 'NEW' | 'REVIEWING' | 'ACTIONABLE' | 'DISMISSED' | 'CONVERTED';

interface IntelligenceSignal {
  id: string;
  source: string;
  category: SourceFilter;
  title: string;
  summary: string;
  confidence: number;
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
  status: StatusFilter;
  relatedCount: number;
  usersAffected: string;
  evidence: string[];
  relatedFeedbackCount: number;
  lastUpdated: string;
  problemStatement: string;
}

const SIGNALS_CATALOG: IntelligenceSignal[] = [
  {
    id: 'SIG-901',
    source: 'PAYMENTS',
    category: 'ANALYTICS',
    title: 'APAC Checkout UPI Fallback Spike',
    summary: 'Transaction volume increased 18.4% among returning users with elevated retry latency.',
    confidence: 92,
    impact: 'HIGH',
    status: 'ACTIONABLE',
    relatedCount: 3,
    usersAffected: '18.2K returning users',
    evidence: [
      '3 independent telemetry signals in Razorpay UPI flow',
      'Timeout rate elevated from 0.4% to 2.8% at peak checkout',
      '47 matching customer feedback tickets in Zendesk',
    ],
    relatedFeedbackCount: 47,
    lastUpdated: '2 min ago',
    problemStatement: 'Returning users face frequent UPI gateway timeouts leading to retry churn and ₹32L estimated ARR exposure.',
  },
  {
    id: 'SIG-902',
    source: 'SUPPORT',
    category: 'SUPPORT',
    title: 'Manual BDD Scenario Compilation Friction',
    summary: '47 enterprise product teams reported spending >3 hours per sprint drafting Gherkin scenarios manually.',
    confidence: 89,
    impact: 'HIGH',
    status: 'NEW',
    relatedCount: 2,
    usersAffected: '47 Enterprise accounts',
    evidence: [
      'Customer support cluster frequency increased 4.2x after sprint cutoffs',
      'CSAT score degraded -4 pts in enterprise cohort',
    ],
    relatedFeedbackCount: 32,
    lastUpdated: '14 min ago',
    problemStatement: 'Enterprise PMs lack automated Gherkin BDD scenario generation from opportunity trees.',
  },
  {
    id: 'SIG-903',
    source: 'RETENTION',
    category: 'CUSTOMERS',
    title: 'Cohort Retention Acceleration with PRD Studio',
    summary: 'Week 4 power user retention lifted +5.1% correlated with autonomous PRD Studio adoption.',
    confidence: 94,
    impact: 'MEDIUM',
    status: 'REVIEWING',
    relatedCount: 4,
    usersAffected: '3,420 Power PMs',
    evidence: [
      'Daily active user session length extended from 18m to 28m',
      'Feature adoption velocity increased 2.4x MoM',
    ],
    relatedFeedbackCount: 19,
    lastUpdated: '1 hour ago',
    problemStatement: 'Opportunity to capitalize on high PRD studio user retention by rolling out team collaboration workspaces.',
  },
  {
    id: 'SIG-904',
    source: 'COMPETITORS',
    category: 'COMPETITORS',
    title: 'Superhuman Smart Triage v2 Deployment',
    summary: 'Superhuman deployed automated AI triage directly into executive inbox flows.',
    confidence: 86,
    impact: 'MEDIUM',
    status: 'ACTIONABLE',
    relatedCount: 1,
    usersAffected: 'Product executive positioning',
    evidence: [
      'Changelog release detected at 07:30 UTC',
      'Social sentiment tracking indicates high interest in automated triage',
    ],
    relatedFeedbackCount: 12,
    lastUpdated: '3 hours ago',
    problemStatement: 'Counter-position against generic triage by emphasizing Argus causal telemetry integration.',
  },
  {
    id: 'SIG-905',
    source: 'FEEDBACK',
    category: 'FEEDBACK',
    title: 'Reward Card Fine-Print Exclusion Drop-off',
    summary: 'Users abandoning checkouts upon discovering unannounced fine-print exclusions on premier rewards cards.',
    confidence: 91,
    impact: 'HIGH',
    status: 'CONVERTED',
    relatedCount: 5,
    usersAffected: '14 Enterprise accounts (₹42L at risk)',
    evidence: [
      '14 enterprise customers logged severe complaints on fine-print exclusions',
      'Negative review sentiment up 12% on gateway retry failures',
    ],
    relatedFeedbackCount: 54,
    lastUpdated: '5 hours ago',
    problemStatement: 'Lack of real-time card exclusion warning at checkout causing negative brand sentiment.',
  },
];

const FLOW_STAGES = [
  { id: 'sources', label: '1. DATA SOURCES', desc: 'ClickHouse, Segment, Zendesk, App Store' },
  { id: 'detection', label: '2. SIGNAL DETECTION', desc: 'Bayesian Anomaly & Trend Scanners' },
  { id: 'interpretation', label: '3. AI INTERPRETATION', desc: 'Causal Correlation & Attribution' },
  { id: 'insights', label: '4. INSIGHTS', desc: 'Synthesized Product Intelligence' },
  { id: 'opportunities', label: '5. OPPORTUNITIES', desc: 'Prioritized Business Bets' },
  { id: 'decisions', label: '6. DECISIONS', desc: 'Institutional ADR Consensus' },
];

export const IntelligencePage: React.FC<IntelligencePageProps> = ({
  onNavigateTab,
  onShowToast,
}) => {
  const [activeMainTab, setActiveMainTab] = useState<'SIGNALS' | 'RADAR'>('SIGNALS');
  const [selectedFlowStage, setSelectedFlowStage] = useState<string>('detection');
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>('ALL');
  const [confidenceFilter, setConfidenceFilter] = useState<ConfidenceFilter>('ALL');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');

  // Converting Signal Drawer State
  const [convertingSignal, setConvertingSignal] = useState<IntelligenceSignal | null>(null);
  const [_isConvertingAnimation, setIsConvertingAnimation] = useState<boolean>(false);

  const filteredSignals = SIGNALS_CATALOG.filter((sig) => {
    if (sourceFilter !== 'ALL' && sig.category !== sourceFilter) return false;
    if (confidenceFilter === 'HIGH' && sig.confidence < 90) return false;
    if (confidenceFilter === 'MEDIUM' && (sig.confidence < 80 || sig.confidence >= 90)) return false;
    if (confidenceFilter === 'LOW' && sig.confidence >= 80) return false;
    if (statusFilter !== 'ALL' && sig.status !== statusFilter) return false;
    return true;
  });

  const handleStartOpportunityConversion = (sig: IntelligenceSignal) => {
    setIsConvertingAnimation(true);
    setTimeout(() => {
      setIsConvertingAnimation(false);
      setConvertingSignal(sig);
    }, 450);
  };

  const handleSaveOpportunity = () => {
    if (!convertingSignal) return;
    onShowToast(`Opportunity created from ${convertingSignal.title}. Promoted to Decide Pipeline.`);
    setConvertingSignal(null);
    onNavigateTab('opportunities');
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 select-none text-[#F5F5F0]">
      {/* ─── 1. Header: Page Title & Global Intelligence Metrics ─── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#1D1D1D]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse-dot" />
            <span className="text-[10px] font-mono-tech uppercase text-[#0066FF] tracking-wider font-bold">
              AI PRODUCT INTELLIGENCE CENTER
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-[#F5F5F0]">
            INTELLIGENCE
          </h1>
          <p className="text-xs font-mono-tech text-[#8A8A8A]">
            Understand what is happening across your product before it becomes a problem.
          </p>
        </div>

        {/* Tab Switcher: Signals vs Competitive Radar */}
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center bg-[#0E0E0E] border border-[#1D1D1D] rounded-[2px] p-0.5 text-xs font-mono-tech">
            <button
              onClick={() => setActiveMainTab('SIGNALS')}
              className={`px-3 py-1.5 rounded-[2px] cursor-pointer transition-colors ${
                activeMainTab === 'SIGNALS'
                  ? 'bg-[#1D1D1D] text-[#F5F5F0] font-bold'
                  : 'text-[#8A8A8A] hover:text-[#F5F5F0]'
              }`}
            >
              Signal Intelligence
            </button>
            <button
              onClick={() => setActiveMainTab('RADAR')}
              className={`px-3 py-1.5 rounded-[2px] cursor-pointer transition-colors ${
                activeMainTab === 'RADAR'
                  ? 'bg-[#1D1D1D] text-[#F5F5F0] font-bold'
                  : 'text-[#8A8A8A] hover:text-[#F5F5F0]'
              }`}
            >
              Competitive Radar
            </button>
          </div>
        </div>
      </div>

      {activeMainTab === 'RADAR' ? (
        <CompetitiveIntel onNavigateTab={onNavigateTab} onShowToast={onShowToast} />
      ) : (
        <>
          {/* ─── 2. Top Metrics HUD ─── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-4 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[2px] space-y-1">
              <div className="text-[10px] font-mono-tech text-[#525252] uppercase">SIGNALS TODAY</div>
              <div className="text-2xl font-bold font-mono-tech text-[#F5F5F0]">12,842</div>
              <div className="text-[10px] font-mono-tech text-[#10B981]">+14% vs 7d avg</div>
            </div>
            <div className="p-4 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[2px] space-y-1">
              <div className="text-[10px] font-mono-tech text-[#525252] uppercase">INSIGHTS GENERATED</div>
              <div className="text-2xl font-bold font-mono-tech text-[#0066FF]">284</div>
              <div className="text-[10px] font-mono-tech text-[#8A8A8A]">Automated synthesis</div>
            </div>
            <div className="p-4 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[2px] space-y-1">
              <div className="text-[10px] font-mono-tech text-[#525252] uppercase">OPPORTUNITIES</div>
              <div className="text-2xl font-bold font-mono-tech text-[#F5F5F0]">19</div>
              <div className="text-[10px] font-mono-tech text-[#10B981]">4 high confidence</div>
            </div>
            <div className="p-4 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[2px] space-y-1">
              <div className="text-[10px] font-mono-tech text-[#525252] uppercase">HIGH CONFIDENCE</div>
              <div className="text-2xl font-bold font-mono-tech text-[#10B981]">87%</div>
              <div className="text-[10px] font-mono-tech text-[#8A8A8A]">Bayesian conviction</div>
            </div>
          </div>

          {/* ─── 3. Large Interactive Signal Flow Graph with Tracing Beam ─── */}
          <div className="p-4 sm:p-5 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[2px] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#0066FF]" />
                <h2 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#F5F5F0]">
                  INTELLIGENCE FLOW · SIGNAL TO DECISION PIPELINE
                </h2>
              </div>
              <span className="text-[10px] font-mono-tech text-[#525252]">CLICK STAGE TO INSPECT</span>
            </div>

            {/* Tracing Beam Visualizing Continuous Product Loop */}
            <TracingBeam orientation="horizontal" active={true} className="rounded-full" />

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {FLOW_STAGES.map((stage) => {
                const isSelected = selectedFlowStage === stage.id;
                return (
                  <button
                    key={stage.id}
                    onClick={() => setSelectedFlowStage(stage.id)}
                    className={`text-left p-3 rounded-[2px] border transition-all cursor-pointer space-y-1 ${
                      isSelected
                        ? 'bg-[#121214] border-[#0066FF] shadow-sm shadow-[#0066FF]/20'
                        : 'bg-[#0E0E0E] border-[#1D1D1D] hover:border-[#2D2D2D]'
                    }`}
                  >
                    <div className={`text-[10px] font-mono-tech font-bold truncate ${
                      isSelected ? 'text-[#0066FF]' : 'text-[#8A8A8A]'
                    }`}>
                      {stage.label}
                    </div>
                    <div className="text-[9px] font-mono-tech text-[#525252] leading-tight">
                      {stage.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ─── 4. Main Body: Left Filter Sidebar + Signal Cards Grid ─── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-2">
            {/* Left Filter Panel */}
            <div className="lg:col-span-3 space-y-4 p-4 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[2px] h-fit">
              <div className="flex items-center gap-2 pb-2 border-b border-[#1D1D1D] text-xs font-mono-tech font-bold text-[#F5F5F0]">
                <Filter className="w-3.5 h-3.5 text-[#0066FF]" />
                <span>SIGNAL FILTERS</span>
              </div>

              {/* Source Filters */}
              <div className="space-y-1.5">
                <div className="text-[10px] font-mono-tech uppercase text-[#525252] font-bold">SOURCE STREAM</div>
                <div className="flex flex-wrap gap-1">
                  {(['ALL', 'ANALYTICS', 'FEEDBACK', 'RESEARCH', 'CUSTOMERS', 'COMPETITORS', 'SUPPORT'] as SourceFilter[]).map((src) => (
                    <button
                      key={src}
                      onClick={() => setSourceFilter(src)}
                      className={`px-2 py-0.5 text-[10px] font-mono-tech rounded-[2px] border transition-colors ${
                        sourceFilter === src
                          ? 'bg-[#0066FF]/15 border-[#0066FF] text-[#0066FF] font-bold'
                          : 'bg-[#0E0E0E] border-[#1D1D1D] text-[#8A8A8A] hover:text-[#F5F5F0]'
                      }`}
                    >
                      {src}
                    </button>
                  ))}
                </div>
              </div>

              {/* Confidence Filters */}
              <div className="space-y-1.5 pt-2 border-t border-[#1D1D1D]">
                <div className="text-[10px] font-mono-tech uppercase text-[#525252] font-bold">CONFIDENCE</div>
                <div className="flex flex-wrap gap-1">
                  {(['ALL', 'HIGH', 'MEDIUM'] as ConfidenceFilter[]).map((conf) => (
                    <button
                      key={conf}
                      onClick={() => setConfidenceFilter(conf)}
                      className={`px-2 py-0.5 text-[10px] font-mono-tech rounded-[2px] border transition-colors ${
                        confidenceFilter === conf
                          ? 'bg-[#10B981]/15 border-[#10B981] text-[#10B981] font-bold'
                          : 'bg-[#0E0E0E] border-[#1D1D1D] text-[#8A8A8A] hover:text-[#F5F5F0]'
                      }`}
                    >
                      {conf}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Filters */}
              <div className="space-y-1.5 pt-2 border-t border-[#1D1D1D]">
                <div className="text-[10px] font-mono-tech uppercase text-[#525252] font-bold">STATUS</div>
                <div className="flex flex-wrap gap-1">
                  {(['ALL', 'NEW', 'ACTIONABLE', 'REVIEWING', 'CONVERTED'] as StatusFilter[]).map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-2 py-0.5 text-[10px] font-mono-tech rounded-[2px] border transition-colors ${
                        statusFilter === st
                          ? 'bg-[#8B5CF6]/15 border-[#8B5CF6] text-[#8B5CF6] font-bold'
                          : 'bg-[#0E0E0E] border-[#1D1D1D] text-[#8A8A8A] hover:text-[#F5F5F0]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter Reset */}
              {(sourceFilter !== 'ALL' || confidenceFilter !== 'ALL' || statusFilter !== 'ALL') && (
                <button
                  onClick={() => {
                    setSourceFilter('ALL');
                    setConfidenceFilter('ALL');
                    setStatusFilter('ALL');
                  }}
                  className="w-full py-1 text-[10px] font-mono-tech text-[#8A8A8A] hover:text-white underline pt-2"
                >
                  Reset all filters
                </button>
              )}
            </div>

            {/* Signal Cards Feed */}
            <div className="lg:col-span-9 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono-tech text-[#8A8A8A] pb-1">
                <span>SHOWING {filteredSignals.length} DETECTED SIGNALS</span>
                <span>SORT BY CONFIDENCE</span>
              </div>

              {filteredSignals.map((sig) => (
                <CardSpotlight key={sig.id} className="p-4 sm:p-5 relative group space-y-3">
                  <GlowingEffect active={sig.status === 'ACTIONABLE'} />

                  {/* Header row */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono-tech font-bold text-[#0066FF] tracking-wider">
                        {sig.source}
                      </span>
                      <span className="text-[#333]">·</span>
                      <span className="text-[10px] font-mono-tech text-[#8A8A8A]">{sig.lastUpdated}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <ArgusBadge
                        variant={sig.confidence >= 90 ? 'green' : 'blue'}
                        size="sm"
                      >
                        {sig.confidence}% CONFIDENCE
                      </ArgusBadge>
                      <ArgusBadge
                        variant={sig.impact === 'HIGH' ? 'red' : 'neutral'}
                        size="sm"
                      >
                        IMPACT: {sig.impact}
                      </ArgusBadge>
                    </div>
                  </div>

                  {/* Title & Summary */}
                  <div>
                    <h3 className="text-sm sm:text-base font-bold font-display text-[#F5F5F0]">
                      {sig.title}
                    </h3>
                    <p className="text-xs font-mono-tech text-[#8A8A8A] mt-1 leading-relaxed">
                      {sig.summary}
                    </p>
                  </div>

                  {/* AI Reasoning Transparency (WHY ARGUS FLAGGED THIS) */}
                  <div className="p-3 bg-[#070707] border border-[#1A1A1A] rounded-[2px] space-y-2">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono-tech text-[#8A8A8A] font-bold uppercase">
                      <Sparkles className="w-3 h-3 text-[#0066FF]" />
                      <span>WHY ARGUS FLAGGED THIS · EVIDENCE ({sig.evidence.length} SOURCES)</span>
                    </div>
                    <ul className="space-y-1 text-xs font-mono-tech text-[#777]">
                      {sig.evidence.map((ev, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0 mt-0.5" />
                          <span>{ev}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap items-center gap-4 pt-1 text-[10px] font-mono-tech text-[#525252]">
                      <span>Users Affected: <strong className="text-zinc-300">{sig.usersAffected}</strong></span>
                      <span>Related Feedback: <strong className="text-zinc-300">{sig.relatedFeedbackCount} reports</strong></span>
                      <span>Correlated Streams: <strong className="text-zinc-300">{sig.relatedCount}</strong></span>
                    </div>
                  </div>

                  {/* Conversion Action Bar */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-[#1D1D1D]">
                    <div className="text-[10px] font-mono-tech text-[#525252]">
                      STATUS: <strong className="text-[#8A8A8A] uppercase">{sig.status}</strong>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleStartOpportunityConversion(sig)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-mono-tech font-bold rounded-[2px] transition-colors cursor-pointer shadow-sm shadow-[#0066FF]/20"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        <span>Create Opportunity</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onNavigateTab('signals')}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-[#141414] hover:bg-[#1A1A1A] border border-[#222] text-[#8A8A8A] hover:text-[#F5F5F0] text-xs font-mono-tech rounded-[2px] transition-colors cursor-pointer"
                      >
                        <span>Investigate Trace</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </CardSpotlight>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ─── 5. Conversion Drawer: Signal → Opportunity Flow ─── */}
      {convertingSignal && (
        <ArgusDrawer
          isOpen={Boolean(convertingSignal)}
          onClose={() => setConvertingSignal(null)}
          title="Convert Signal to Product Opportunity"
          subtitle={`Source: ${convertingSignal.source} | Confidence: ${convertingSignal.confidence}%`}
          badge="OPPORTUNITY DRAFT"
          width="lg"
        >
          <div className="space-y-4 text-[#F5F5F0] select-text">
            {/* Visual Conversion Breadcrumb */}
            <div className="flex items-center justify-between p-2.5 bg-[#0E0E0E] rounded-[2px] border border-[#0066FF]/30 text-xs font-mono-tech">
              <span className="text-[#8A8A8A]">SIGNAL</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#0066FF]" />
              <span className="text-[#0066FF] font-bold">CAUSAL INSIGHT</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#0066FF]" />
              <span className="text-[#10B981] font-bold">NEW OPPORTUNITY</span>
            </div>

            {/* Pre-populated Title */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono-tech uppercase text-[#8A8A8A]">
                OPPORTUNITY TITLE
              </label>
              <input
                type="text"
                defaultValue={convertingSignal.title}
                className="w-full bg-[#0A0A0A] border border-[#1D1D1D] focus:border-[#0066FF] rounded-[2px] px-3 py-2 text-xs font-mono-tech text-[#F5F5F0] outline-none"
              />
            </div>

            {/* Pre-populated Problem Statement */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono-tech uppercase text-[#8A8A8A]">
                CORE CUSTOMER PROBLEM
              </label>
              <textarea
                rows={3}
                defaultValue={convertingSignal.problemStatement}
                className="w-full bg-[#0A0A0A] border border-[#1D1D1D] focus:border-[#0066FF] rounded-[2px] px-3 py-2 text-xs font-mono-tech text-[#F5F5F0] outline-none"
              />
            </div>

            {/* Evidence Checklist */}
            <div className="space-y-1.5 p-3 bg-[#0E0E0E] border border-[#1D1D1D] rounded-[2px]">
              <div className="text-[10px] font-mono-tech uppercase text-[#8A8A8A] font-bold">
                ATTACHED TELEMETRY EVIDENCE
              </div>
              <ul className="space-y-1 text-xs font-mono-tech text-[#777]">
                {convertingSignal.evidence.map((ev, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>{ev}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono-tech">
              <div className="p-2.5 bg-[#0E0E0E] border border-[#1D1D1D] rounded-[2px]">
                <span className="text-[10px] text-[#525252] block">AFFECTED SEGMENT</span>
                <span className="font-semibold text-zinc-300">{convertingSignal.usersAffected}</span>
              </div>
              <div className="p-2.5 bg-[#0E0E0E] border border-[#1D1D1D] rounded-[2px]">
                <span className="text-[10px] text-[#525252] block">ESTIMATED BUSINESS IMPACT</span>
                <span className="font-semibold text-[#10B981]">{convertingSignal.impact}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-[#1D1D1D] flex items-center justify-between">
              <ArgusButton
                variant="secondary"
                size="sm"
                onClick={() => setConvertingSignal(null)}
              >
                Cancel
              </ArgusButton>

              <ArgusButton
                variant="primary"
                size="sm"
                onClick={handleSaveOpportunity}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Save & Promote to Decision Tree
              </ArgusButton>
            </div>
          </div>
        </ArgusDrawer>
      )}
    </div>
  );
};
