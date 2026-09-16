import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  BookOpen,
  Activity,
  FileText,
  Compass,
  Lock,
  Database,
  Zap,
} from 'lucide-react';
import type { NavigationTab } from '../../types/argus';
import { SignalFabric } from '../argus/ArgusSignalFabric';
import { InteractiveProductDemo } from './InteractiveProductDemo';
import { ProductShowcaseLoop } from './ProductShowcaseLoop';

interface LandingPageProps {
  onOpenApp: (tab?: NavigationTab) => void;
  onOpenCaseStudy: () => void;
  onInvestigateSignal?: (signalId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenApp,
  onOpenCaseStudy,
}) => {
  const [isClarityActive, setIsClarityActive] = useState(false);

  const chaosSignals = [
    { id: 1, label: 'Payment failures', value: '+7.4%', category: 'TXNS', risk: true, xMobile: -60, yMobile: -50, x: -140, y: -40 },
    { id: 2, label: 'Refund tickets', value: '+21%', category: 'HELP', risk: true, xMobile: 60, yMobile: -60, x: 120, y: -60 },
    { id: 3, label: '7D Retention', value: '-1.4%', category: 'RET', risk: true, xMobile: -40, yMobile: 45, x: -80, y: 50 },
    { id: 4, label: 'Tx Volume', value: '₹18.4Cr', category: 'TXNS', risk: false, xMobile: 70, yMobile: 35, x: 160, y: 30 },
    { id: 5, label: 'Support reqs', value: '2,481', category: 'HELP', risk: false, xMobile: -80, yMobile: 95, x: -160, y: 110 },
    { id: 6, label: 'Churn risk', value: 'HIGH', category: 'METRICS', risk: true, xMobile: 40, yMobile: 95, x: 60, y: 120 },
    { id: 7, label: 'KYC drop-off', value: '18.2%', category: 'FEED', risk: true, xMobile: 0, yMobile: -95, x: -20, y: -100 },
  ];

  return (
    <div className="w-full flex flex-col bg-[#050505] text-[#F5F5F0] select-none">
      {/* ───── 01. HERO & ORIENTATION ───── */}
      <section className="relative min-h-[90vh] max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-16 flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 w-full">
          {/* Left Column: Asymmetric Hero Typography (45%) */}
          <div className="w-full lg:w-[45%] flex flex-col items-start">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[3px] bg-[#101010] border border-[#1D1D1D] text-[10px] sm:text-[11px] font-mono text-[#8A8A8A] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-pulse" />
              <span>ARGUS · AI PRODUCT MANAGEMENT OPERATING SYSTEM</span>
            </div>

            {/* Massive Headline */}
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-extrabold text-[#F5F5F0] tracking-tight mb-6 leading-[1.05]">
              MAKE SENSE<br />
              OF THE<br />
              <span className="text-[#0066FF]">SIGNALS.</span>
            </h1>

            {/* Subtext */}
            <p className="text-sm sm:text-base md:text-lg text-[#8A8A8A] leading-relaxed max-w-[48ch] mb-8 font-normal font-sans">
              Argus connects fragmented telemetry across payment switches, support queues, and customer feedback to drive high-conviction product decisions.
            </p>

            {/* CTAs */}
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => onOpenApp('overview')}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-[4px] bg-[#F5F5F0] hover:bg-white text-[#050505] text-xs font-mono font-bold cursor-pointer transition-colors shadow-lg shadow-white/5 min-h-[44px]"
              >
                <span>Enter Argus Cockpit →</span>
              </button>

              <a
                href="#demo"
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-[4px] bg-[#101010] hover:bg-[#181818] border border-[#1D1D1D] text-xs font-mono text-[#8A8A8A] hover:text-[#F5F5F0] transition-colors min-h-[44px]"
              >
                <span>Follow a Signal (Demo)</span>
              </a>

              <button
                onClick={onOpenCaseStudy}
                className="flex items-center justify-center gap-1.5 px-3.5 py-3 text-xs font-mono text-[#666] hover:text-[#AAA] transition-colors cursor-pointer min-h-[44px]"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#0066FF]" />
                <span>AI PM Architecture</span>
              </button>
            </div>
          </div>

          {/* Right Column: Signature Interactive Signal Fabric (55%) */}
          <div className="w-full lg:w-[55%] mt-6 lg:mt-0">
            <SignalFabric onNavigateTab={(tab) => onOpenApp(tab)} isHeroMode={true} />
          </div>
        </div>
      </section>

      {/* ───── 02. THE PROBLEM: CHAOS VS DECISION CLARITY ───── */}
      <section id="problem" className="relative py-20 sm:py-28 border-t border-[#1D1D1D] bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#8A8A8A] mb-3">
            02 · THE PROBLEM
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#F5F5F0] tracking-tight max-w-[26ch] mb-4 sm:mb-6 leading-tight">
            THE DATA ISN'T THE PROBLEM.<br />
            <span className="text-[#0066FF]">THE DECISION IS.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#8A8A8A] max-w-[60ch] mb-8 sm:mb-12 font-mono leading-relaxed px-2">
            Modern product teams drown in telemetry: ClickHouse logs, Sentry traces, Zendesk tickets, and Amplitude funnels. They have petabytes of data, but zero causal conviction on what to build next.
          </p>

          {/* Interactive Chaos to Clarity Canvas */}
          <div className="w-full max-w-4xl p-4 sm:p-8 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[6px] relative overflow-hidden min-h-[380px] flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#1D1D1D] text-[11px] font-mono text-[#8A8A8A] gap-2">
              <span className="text-left font-medium text-[#AAA]">TELEMETRY HARMONIZATION MATRIX</span>
              <button
                onClick={() => setIsClarityActive(!isClarityActive)}
                className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-[3px] bg-[#141414] hover:bg-[#1A1A1A] border border-[#2E2E2E] text-xs font-mono text-[#F5F5F0] cursor-pointer min-h-[36px] w-full sm:w-auto transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
                <span>{isClarityActive ? 'Reset to Chaos' : 'Demonstrate Clarity →'}</span>
              </button>
            </div>

            {/* Chaotic vs Structured Field */}
            <div className="relative h-[240px] flex items-center justify-center my-4 overflow-hidden">
              {!isClarityActive ? (
                /* Chaos State: Scattered metrics */
                <div className="relative w-full h-full flex items-center justify-center">
                  {chaosSignals.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{
                        x: typeof window !== 'undefined' && window.innerWidth < 640 ? item.xMobile : item.x,
                        y: typeof window !== 'undefined' && window.innerWidth < 640 ? item.yMobile : item.y,
                        scale: 1,
                        opacity: 1,
                      }}
                      transition={{ type: 'spring', stiffness: 70, damping: 14 }}
                      className="absolute px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-[3px] bg-[#101010] border border-[#1D1D1D] shadow-xl flex items-center gap-2 select-none"
                    >
                      <span className="text-[9px] sm:text-[10px] font-mono text-[#8A8A8A]">{item.category}</span>
                      <span className="text-[11px] sm:text-xs font-medium text-[#F5F5F0]">{item.label}</span>
                      <span
                        className={`text-[11px] sm:text-xs font-mono font-bold ${
                          item.risk ? 'text-[#EF4444]' : 'text-[#10B981]'
                        }`}
                      >
                        {item.value}
                      </span>
                    </motion.div>
                  ))}
                </div>
              ) : (
                /* Clarity State: Harmonized 4-pillar pipeline */
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-left"
                >
                  <div className="p-3.5 bg-[#101010] border border-[#1D1D1D] rounded-[4px]">
                    <span className="text-[10px] font-mono text-[#0066FF] uppercase block mb-1 font-bold">01 · SIGNALS</span>
                    <p className="text-xs font-bold text-[#F5F5F0] mb-0.5">4.2M Events</p>
                    <p className="text-[10px] text-[#8A8A8A] font-mono">Payment drop detected</p>
                  </div>
                  <div className="p-3.5 bg-[#101010] border border-[#1D1D1D] rounded-[4px]">
                    <span className="text-[10px] font-mono text-[#0066FF] uppercase block mb-1 font-bold">02 · INSIGHT</span>
                    <p className="text-xs font-bold text-[#F5F5F0] mb-0.5">Bank X Timeout</p>
                    <p className="text-[10px] text-[#8A8A8A] font-mono">52% failure share</p>
                  </div>
                  <div className="p-3.5 bg-[#101010] border border-[#0066FF]/40 rounded-[4px] bg-[#0066FF]/5">
                    <span className="text-[10px] font-mono text-[#0066FF] uppercase block mb-1 font-bold">03 · OPPORTUNITY</span>
                    <p className="text-xs font-bold text-[#F5F5F0] mb-0.5">Smart Failover</p>
                    <p className="text-[10px] text-[#8A8A8A] font-mono">Ranked #1 on RICE</p>
                  </div>
                  <div className="p-3.5 bg-[#101010] border border-emerald-900/40 rounded-[4px] bg-emerald-950/10">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase block mb-1 font-bold">04 · ACTION</span>
                    <p className="text-xs font-bold text-[#F5F5F0] mb-0.5">PRD & Canary</p>
                    <p className="text-[10px] text-emerald-400 font-mono">+3.2% Lift Expected</p>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="pt-3 border-t border-[#1D1D1D] flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#525252] gap-1.5">
              <span>{isClarityActive ? 'STATUS: CAUSAL CONTINUUM ACTIVE' : 'STATUS: UNFILTERED TELEMETRY CHAOS'}</span>
              <span className="text-[#8A8A8A]">TOGGLE CLARITY ABOVE TO TEST HARMONIZATION</span>
            </div>
          </div>
        </div>
      </section>

      {/* ───── 03. THE SIGNAL FABRIC: CONTINUOUS SURVEILLANCE ───── */}
      <section className="py-20 sm:py-28 border-t border-[#1D1D1D] bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="max-w-2xl">
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#8A8A8A] mb-2 block">
              03 · THE SIGNAL FABRIC
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Six raw streams.<br />One unified intelligence layer.
            </h2>
            <p className="text-xs sm:text-sm font-mono text-[#8A8A8A] leading-relaxed">
              Argus hooks directly into raw transaction feeds, core banking switches, user feedback repositories, and competitor changelogs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                source: 'Payment Gateways',
                streams: 'HDFC, SBI, ICICI, Axis switches',
                metric: '4.2M events/day',
                action: 'Isolates rolling p99 latency deterioration before hard gateway disconnects.',
                icon: Activity,
                tab: 'signals' as NavigationTab,
              },
              {
                source: 'Customer Support & Feedback',
                streams: 'Zendesk, Intercom, App Store',
                metric: '1,284 tickets/week',
                action: 'Clusters dispute complaints ("Money debited but order failed") to quantify ARR at risk.',
                icon: FileText,
                tab: 'feedback' as NavigationTab,
              },
              {
                source: 'Competitor Intelligence',
                streams: 'Razorpay, Stripe, PhonePe',
                metric: '24 feature launches tracked',
                action: 'Surfaces product capability gaps and reverse-engineers pricing shifts.',
                icon: Compass,
                tab: 'intelligence' as NavigationTab,
              },
            ].map((stream, idx) => {
              const Icon = stream.icon;
              return (
                <div
                  key={idx}
                  onClick={() => onOpenApp(stream.tab)}
                  className="p-5 bg-[#0D0D0D] border border-[#1A1A1A] hover:border-[#0066FF] rounded-[6px] transition-all cursor-pointer group space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-[3px] bg-[#141414] border border-[#222] flex items-center justify-center text-[#0066FF]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-[#888] bg-[#161616] px-2 py-0.5 rounded-[2px]">
                      {stream.metric}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-mono font-bold text-white group-hover:text-[#0066FF] transition-colors">
                      {stream.source}
                    </h3>
                    <p className="text-[11px] font-mono text-[#666] mt-0.5">
                      {stream.streams}
                    </p>
                  </div>
                  <p className="text-xs font-sans text-[#8A8A8A] leading-relaxed pt-2 border-t border-[#161616]">
                    {stream.action}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───── 04 & 05. INTERACTIVE PRODUCT DEMO: "FOLLOW A SIGNAL" ───── */}
      <section id="demo" className="py-20 sm:py-28 border-t border-[#1D1D1D] bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="max-w-3xl">
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#0066FF] mb-2 block font-bold">
              04 · INTERACTIVE DEMONSTRATION
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Follow a signal from anomaly to production PRD.
            </h2>
            <p className="text-xs sm:text-sm font-mono text-[#8A8A8A] leading-relaxed">
              Step through a real operational incident. Trace how Argus ingests an evening failure spike, isolates root cause, formulates an opportunity, ranks it on RICE, drafts the PRD, and configures a canary experiment.
            </p>
          </div>

          {/* Interactive 6-stage component */}
          <InteractiveProductDemo onNavigateTab={(tab) => onOpenApp(tab)} />
        </div>
      </section>

      {/* ───── 06. THE REAL PRODUCT INTERFACE SHOWCASE ───── */}
      <section className="py-20 sm:py-28 border-t border-[#1D1D1D] bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="max-w-2xl">
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#8A8A8A] mb-2 block">
              05 · THE INTERFACES
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Engineered for product leaders under pressure.
            </h2>
            <p className="text-xs sm:text-sm font-mono text-[#8A8A8A] leading-relaxed">
              No hollow cards or generic AI chatbot boxes. Every screen in Argus is an operational surface built for speed, density, and causality.
            </p>
          </div>

          <ProductShowcaseLoop onNavigateTab={(tab) => onOpenApp(tab)} />
        </div>
      </section>

      {/* ───── 07. THE PM OPERATING CADENCE ───── */}
      <section className="py-20 sm:py-28 border-t border-[#1D1D1D] bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#8A8A8A] mb-2 block">
              06 · THE PM OPERATING CADENCE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Your entire daily rhythm in one operating system.
            </h2>
            <p className="text-xs sm:text-sm font-mono text-[#8A8A8A] leading-relaxed">
              Replace the fragmented shuffle between Jira, Notion, Statsig, Amplitude, and bookmark folders of PRD templates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                time: '09:00 AM',
                title: 'Telemetry Audit',
                desc: 'Review overnight p99 latency curves and automated ClickHouse anomaly clusters.',
                tab: 'signals' as NavigationTab,
              },
              {
                time: '10:00 AM',
                title: 'Sprint Execution',
                desc: 'Unblock engineers on active sprint tickets and verify acceptance criteria checklists.',
                tab: 'sprints' as NavigationTab,
              },
              {
                time: '02:00 PM',
                title: 'PRD Studio & AI Critic',
                desc: 'Draft engineering specs with automated adversarial red-teaming for missing failover states.',
                tab: 'prds' as NavigationTab,
              },
              {
                time: '05:30 PM',
                title: 'Release Guardrails',
                desc: 'Monitor canary traffic splits in Statsig and ensure automated circuit breakers remain armed.',
                tab: 'experiments' as NavigationTab,
              },
            ].map((cadence, i) => (
              <div
                key={i}
                onClick={() => onOpenApp(cadence.tab)}
                className="p-5 bg-[#0C0C0C] border border-[#1A1A1A] hover:border-[#0066FF] rounded-[4px] cursor-pointer transition-all space-y-2 group"
              >
                <span className="text-[11px] font-mono text-[#0066FF] font-bold block">
                  {cadence.time}
                </span>
                <h3 className="text-sm font-mono font-bold text-white group-hover:text-[#0066FF] transition-colors">
                  {cadence.title}
                </h3>
                <p className="text-xs font-sans text-[#8A8A8A] leading-relaxed">
                  {cadence.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── 08. OPERATIONAL GUARANTEES ───── */}
      <section className="py-16 sm:py-24 border-t border-[#1D1D1D] bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3.5">
              <Lock className="w-5 h-5 text-[#0066FF] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-1">
                  Zero PII Architecture
                </h4>
                <p className="text-xs font-sans text-[#8A8A8A] leading-relaxed">
                  Card numbers, CVVs, and user credentials never touch Argus servers. Operates strictly over anonymized transaction metadata and log tokens.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Database className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-1">
                  ClickHouse Native
                </h4>
                <p className="text-xs font-sans text-[#8A8A8A] leading-relaxed">
                  Queries billions of transactional events in under 100ms. Direct analytical integration with PostgreSQL, BigQuery, and Snowflake.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Zap className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-1">
                  Sub-450ms Failover SLA
                </h4>
                <p className="text-xs font-sans text-[#8A8A8A] leading-relaxed">
                  Circuit breakers trip autonomously within 450ms of threshold breach, protecting checkout conversion without human delay.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── 09. TERMINAL ENTRY POINT CTA ───── */}
      <section className="py-20 sm:py-28 border-t border-[#1D1D1D] bg-[#050505]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8A8A8A]">
            07 · ENTRY POINT
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Stop guessing.<br />Start orchestrating.
          </h2>
          <p className="text-xs sm:text-sm font-mono text-[#8A8A8A] max-w-[50ch] mx-auto leading-relaxed">
            Enter the production demo workspace to inspect active bank signals, test RICE sensitivity, or review generated PRDs.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onOpenApp('overview')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-[4px] bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-mono font-bold cursor-pointer transition-colors shadow-lg shadow-[#0066FF]/20"
            >
              Enter Argus Cockpit →
            </button>

            <button
              onClick={() => onOpenApp('sprints')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-[4px] bg-[#111] hover:bg-[#181818] border border-[#262626] text-white text-xs font-mono cursor-pointer transition-colors"
            >
              Inspect Sprints & Backlog
            </button>

            <button
              onClick={() => onOpenApp('documents')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-[4px] bg-[#111] hover:bg-[#181818] border border-[#262626] text-white text-xs font-mono cursor-pointer transition-colors"
            >
              Notion Specs Studio
            </button>
          </div>
        </div>
      </section>

      {/* ───── FOOTER ───── */}
      <footer className="border-t border-[#1A1A1A] py-8 px-4 sm:px-6 bg-[#030303] text-xs font-mono text-[#555]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white font-bold tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#0066FF]" />
            <span>ARGUS OS</span>
            <span className="text-[#555] font-normal">/ Production Fintech Intelligence</span>
          </div>

          <div className="flex items-center gap-4 text-[#777]">
            <button onClick={() => onOpenApp('signals')} className="hover:text-white transition-colors">
              Signals
            </button>
            <button onClick={() => onOpenApp('opportunities')} className="hover:text-white transition-colors">
              Opportunities
            </button>
            <button onClick={() => onOpenApp('prds')} className="hover:text-white transition-colors">
              PRDs
            </button>
            <button onClick={() => onOpenApp('sprints')} className="hover:text-white transition-colors">
              Sprints
            </button>
            <button onClick={() => onOpenApp('settings')} className="hover:text-white transition-colors">
              System
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
