import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  BookOpen
} from 'lucide-react';
import type { NavigationTab } from '../../types/tapwise';
import { HeroStreamVisualization } from './HeroStreamVisualization';

interface LandingPageProps {
  onOpenApp: (tab?: NavigationTab) => void;
  onOpenCaseStudy: () => void;
  onInvestigateSignal?: (signalId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenApp,
  onOpenCaseStudy,
  onInvestigateSignal,
}) => {
  const [isClarityActive, setIsClarityActive] = useState(false);
  const [activeSystemStage, setActiveSystemStage] = useState<number>(1);

  const chaosSignals = [
    { id: 1, label: 'Payment failures', value: '+7.4%', category: 'TXNS', risk: true, xMobile: -60, yMobile: -50, x: -140, y: -40 },
    { id: 2, label: 'Refund tickets', value: '+21%', category: 'HELP', risk: true, xMobile: 60, yMobile: -60, x: 120, y: -60 },
    { id: 3, label: '7D Retention', value: '-1.4%', category: 'RET', risk: true, xMobile: -40, yMobile: 45, x: -80, y: 50 },
    { id: 4, label: 'Tx Volume', value: '₹18.4Cr', category: 'TXNS', risk: false, xMobile: 70, yMobile: 35, x: 160, y: 30 },
    { id: 5, label: 'Support reqs', value: '2,481', category: 'HELP', risk: false, xMobile: -80, yMobile: 95, x: -160, y: 110 },
    { id: 6, label: 'Churn risk', value: 'HIGH', category: 'METRICS', risk: true, xMobile: 40, yMobile: 95, x: 60, y: 120 },
    { id: 7, label: 'KYC drop-off', value: '18.2%', category: 'FEED', risk: true, xMobile: 0, yMobile: -95, x: -20, y: -100 },
  ];

  const systemStages = [
    {
      num: '01',
      title: 'SIGNALS',
      subtitle: 'Continuous Telemetry Surveillance',
      desc: 'TapWise monitors 4.2M daily transactional events across payment gateways, banking switches, and user support queues to catch micro-anomalies before they escalate.',
      metrics: [
        { label: 'PAYMENT SUCCESS', val: '94.2%', delta: '↓ 4.1%', bad: true },
        { label: 'TRANSACTION VOLUME', val: '₹18.4Cr', delta: '↑ 12.6%', bad: false },
        { label: 'SUPPORT TICKETS', val: '1,284', delta: '↑ 18.2%', bad: true },
        { label: '7D RETENTION', val: '41.8%', delta: '↓ 0.8%', bad: true },
      ],
      tagline: 'TapWise watches what changes.',
    },
    {
      num: '02',
      title: 'INSIGHTS',
      subtitle: 'Root Cause Decomposition',
      desc: 'Instead of alerting you with noise, TapWise correlates millions of log records to decompose why the failure occurred and pinpoints exact system contributors.',
      metrics: [
        { label: 'BANK X TIMEOUTS', val: '52% share', delta: '48% cluster', bad: true },
        { label: 'ANDROID 15 OS', val: '24% share', delta: '1.7x risk', bad: true },
        { label: 'TICKETS > ₹10K', val: '15% share', delta: '2.4x failure', bad: true },
        { label: 'EVENING PEAK', val: '9% share', delta: '8-10 PM', bad: false },
      ],
      tagline: 'TapWise doesn\'t just show the anomaly. It explains why it matters.',
    },
    {
      num: '03',
      title: 'PRIORITIES',
      subtitle: 'Dynamic RICE Sensitivity Workbench',
      desc: 'Fintech PMs test roadmap scenarios in real-time. Slide Reach, Impact, Confidence, or Effort to observe causal rank shifts and strategic trade-off commentary.',
      metrics: [
        { label: '#1 REDUCE PAYMENT FAILURES', val: 'RICE 74.6', delta: 'HIGH IMPACT', bad: false },
        { label: '#2 REFUND VISIBILITY', val: 'RICE 68.2', delta: 'MED IMPACT', bad: false },
        { label: '#3 AADHAAR FACE-RD', val: 'RICE 54.1', delta: 'COMPLIANCE', bad: false },
        { label: '#4 REWARDS DASHBOARD', val: 'RICE 41.9', delta: 'ENGAGEMENT', bad: false },
      ],
      tagline: 'From "what could we build?" to "what should we build?"',
    },
    {
      num: '04',
      title: 'ACTION',
      subtitle: 'PRD, Hypotheses & Guarded Rollouts',
      desc: 'Bridge instantly from prioritization to execution. Generate engineering-ready PRDs with Gherkin user stories, and configure guarded A/B experiment circuit breakers.',
      metrics: [
        { label: 'HYPOTHESIS', val: 'Smart Failover', delta: 'Causal Inference', bad: false },
        { label: 'PRIMARY METRIC', val: '+3.2% SR', delta: 'MDE: 1.8%', bad: false },
        { label: 'CIRCUIT BREAKER', val: '< 4,500ms', delta: 'P99 Latency Cap', bad: false },
        { label: 'FLAG STATUS', val: 'STATSIG READY', delta: '10/90 Split', bad: false },
      ],
      tagline: 'Opportunity → PRD → Experiment → Measurement.',
    },
  ];

  return (
    <div className="w-full flex flex-col bg-[#050505] text-[#F5F5F0] select-none">
      {/* ───── HERO SECTION ───── */}
      <section className="relative min-h-[85vh] max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-16 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Asymmetric Hero Typography */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[2px] bg-[#101010] border border-[#1D1D1D] text-[10px] sm:text-[11px] font-mono-tech text-[#8A8A8A] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-pulse-dot" />
              <span>AI PRODUCT INTELLIGENCE / FINTECH</span>
            </div>

            {/* Massive Headline */}
            <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-[84px] text-[#F5F5F0] tracking-tight mb-6 leading-tight">
              MAKE SENSE<br />
              OF THE<br />
              <span className="text-[#0066FF]">SIGNALS.</span>
            </h1>

            {/* Subtext */}
            <p className="text-sm sm:text-base md:text-lg text-[#8A8A8A] leading-relaxed max-w-[48ch] mb-8 font-normal">
              TapWise helps fintech product teams turn fragmented telemetry into high-conviction product decisions.
            </p>

            {/* CTAs */}
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => onOpenApp('overview')}
                className="btn-magnetic flex items-center justify-center gap-2 px-6 py-3.5 rounded-[3px] bg-[#F5F5F0] hover:bg-white text-[#050505] text-xs font-semibold cursor-pointer shadow-lg shadow-white/5 min-h-[44px]"
              >
                <span>Enter TapWise →</span>
              </button>

              <a
                href="#problem"
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-[3px] bg-[#101010] hover:bg-[#141414] border border-[#1D1D1D] text-xs font-mono-tech text-[#8A8A8A] hover:text-[#F5F5F0] transition-colors min-h-[44px]"
              >
                <span>Explore the system</span>
              </a>

              <button
                onClick={onOpenCaseStudy}
                className="flex items-center justify-center gap-1.5 px-3.5 py-3 text-xs font-mono-tech text-[#525252] hover:text-[#8A8A8A] transition-colors cursor-pointer min-h-[44px]"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#0066FF]" />
                <span>Read AI PM Case Study</span>
              </button>
            </div>
          </div>

          {/* Right Column: Abstract Live Stream Visualization */}
          <div className="lg:col-span-5 w-full mt-4 lg:mt-0">
            <HeroStreamVisualization />
          </div>
        </div>
      </section>

      {/* ───── THE PROBLEM & CHAOS → CLARITY ANIMATION ───── */}
      <section id="problem" className="relative py-16 sm:py-24 border-t border-[#1D1D1D] bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
          <span className="text-[10px] sm:text-[11px] font-mono-tech uppercase tracking-[0.25em] text-[#8A8A8A] mb-3">
            THE PROBLEM
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl text-[#F5F5F0] tracking-tight max-w-[24ch] mb-4 sm:mb-6">
            THE DATA ISN'T THE PROBLEM.<br />
            <span className="text-[#0066FF]">THE DECISION IS.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#8A8A8A] max-w-[58ch] mb-8 sm:mb-12 font-mono-tech leading-relaxed px-2">
            Fintech generates hundreds of disconnected metrics across gateways, bank switches, and queues. Product managers are inundated with noise, yet starve for clear decision conviction.
          </p>

          {/* Interactive Chaos to Clarity Canvas */}
          <div className="w-full max-w-4xl p-4 sm:p-8 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px] relative overflow-hidden min-h-[380px] flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#1D1D1D] text-[11px] font-mono-tech text-[#8A8A8A] gap-2">
              <span className="text-left">INTERACTIVE TELEMETRY HARMONIZER</span>
              <button
                onClick={() => setIsClarityActive(!isClarityActive)}
                className="btn-magnetic flex items-center justify-center gap-1.5 px-3 py-2 rounded-[2px] bg-[#141414] hover:bg-[#1A1A1A] border border-[#2E2E2E] text-xs font-mono-tech text-[#F5F5F0] cursor-pointer min-h-[40px] w-full sm:w-auto"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
                <span>{isClarityActive ? 'Reset to Chaos' : 'Demonstrate Clarity →'}</span>
              </button>
            </div>

            {/* Chaotic vs Structured Field */}
            <div className="relative h-[250px] flex items-center justify-center my-4 overflow-hidden">
              {!isClarityActive ? (
                /* Chaos State: Scattered metrics floating across space */
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
                      <span className="text-[9px] sm:text-[10px] font-mono-tech text-[#8A8A8A]">{item.category}</span>
                      <span className="text-[11px] sm:text-xs font-medium text-[#F5F5F0]">{item.label}</span>
                      <span
                        className={`text-[11px] sm:text-xs font-mono-tech font-bold ${
                          item.risk ? 'text-[#EF4444]' : 'text-[#10B981]'
                        }`}
                      >
                        {item.value}
                      </span>
                    </motion.div>
                  ))}
                </div>
              ) : (
                /* Clarity State: Harmonized into 4 structured pillars */
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-left"
                >
                  <div className="p-3 bg-[#101010] border border-[#1D1D1D] rounded-[3px]">
                    <span className="text-[9px] sm:text-[10px] font-mono-tech text-[#0066FF] uppercase block mb-1">01 · SIGNALS</span>
                    <p className="text-xs font-bold text-[#F5F5F0] mb-0.5">4.2M Events</p>
                    <p className="text-[10px] text-[#8A8A8A] font-mono-tech">Payment drop detected</p>
                  </div>
                  <div className="p-3 bg-[#101010] border border-[#1D1D1D] rounded-[3px]">
                    <span className="text-[9px] sm:text-[10px] font-mono-tech text-[#0066FF] uppercase block mb-1">02 · INSIGHT</span>
                    <p className="text-xs font-bold text-[#F5F5F0] mb-0.5">Bank X Timeout</p>
                    <p className="text-[10px] text-[#8A8A8A] font-mono-tech">52% failure share</p>
                  </div>
                  <div className="p-3 bg-[#101010] border border-[#1D1D1D] rounded-[3px]">
                    <span className="text-[9px] sm:text-[10px] font-mono-tech text-[#0066FF] uppercase block mb-1">03 · OPPORTUNITY</span>
                    <p className="text-xs font-bold text-[#F5F5F0] mb-0.5">Smart Failover</p>
                    <p className="text-[10px] text-[#8A8A8A] font-mono-tech">Ranked #1 on RICE</p>
                  </div>
                  <div className="p-3 bg-[#101010] border border-[#0066FF]/40 rounded-[3px] bg-[#0066FF]/5">
                    <span className="text-[9px] sm:text-[10px] font-mono-tech text-[#10B981] uppercase block mb-1">04 · ACTION</span>
                    <p className="text-xs font-bold text-[#F5F5F0] mb-0.5">PRD & Experiment</p>
                    <p className="text-[10px] text-[#10B981] font-mono-tech">+3.2% Lift Expected</p>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="pt-3 border-t border-[#1D1D1D] flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] font-mono-tech text-[#525252] gap-1.5">
              <span>{isClarityActive ? 'STATUS: SYNTHESIS LOCKED' : 'STATUS: UNFILTERED TELEMETRY CHAOS'}</span>
              <span className="text-[#8A8A8A]">TAP BUTTON ABOVE TO TOGGLE CLARITY</span>
            </div>
          </div>
        </div>
      </section>

      {/* ───── PRODUCT MANIFESTO ───── */}
      <section className="py-16 sm:py-24 border-t border-[#1D1D1D] bg-[#080808]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-[10px] font-mono-tech uppercase tracking-[0.3em] text-[#8A8A8A] mb-3 block">
            THE TAPWISE MANIFESTO
          </span>
          <h2 className="font-editorial text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#F5F5F0] tracking-tight leading-tight mb-6">
            TapWise doesn't give PMs more information.{' '}
            <span className="text-[#0066FF]">It gives them better decisions.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#8A8A8A] max-w-[50ch] mx-auto leading-relaxed font-mono-tech px-2">
            Traditional analytics dashboards show what happened yesterday. TapWise acts as a cognitive copilot that isolates why it matters and what engineering initiative to ship next.
          </p>
        </div>
      </section>

      {/* ───── THE TAPWISE SYSTEM (STAGED WORKFLOW) ───── */}
      <section id="system" className="py-16 sm:py-24 border-t border-[#1D1D1D] bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
            <div>
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.25em] text-[#8A8A8A] block mb-2">
                OPERATING SYSTEM ARCHITECTURE
              </span>
              <h2 className="font-editorial text-2xl sm:text-4xl md:text-5xl text-[#F5F5F0] tracking-tight">
                THE TAPWISE SYSTEM.
              </h2>
            </div>

            {/* Stage Selector Tabs (Swipeable on mobile) */}
            <div className="flex items-center gap-1.5 p-1 bg-[#101010] border border-[#1D1D1D] rounded-[3px] overflow-x-auto no-scrollbar max-w-full">
              {systemStages.map((stage, idx) => (
                <button
                  key={stage.num}
                  onClick={() => setActiveSystemStage(idx)}
                  className={`px-3 py-2 rounded-[2px] text-xs font-mono-tech transition-colors cursor-pointer flex-shrink-0 whitespace-nowrap min-h-[40px] ${
                    activeSystemStage === idx
                      ? 'bg-[#0066FF] text-white font-bold'
                      : 'text-[#8A8A8A] hover:text-[#F5F5F0]'
                  }`}
                >
                  {stage.num} {stage.title}
                </button>
              ))}
            </div>
          </div>

          {/* Active Stage Presentation */}
          <div className="p-4 sm:p-8 lg:p-12 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px] relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Stage Details */}
              <div className="lg:col-span-6 flex flex-col items-start">
                <span className="text-xs font-mono-tech font-bold text-[#0066FF] mb-2">
                  STAGE {systemStages[activeSystemStage].num} / 04
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#F5F5F0] tracking-tight mb-2">
                  {systemStages[activeSystemStage].subtitle}
                </h3>
                <p className="text-xs sm:text-sm text-[#8A8A8A] leading-relaxed mb-6 font-mono-tech max-w-[48ch]">
                  {systemStages[activeSystemStage].desc}
                </p>

                <div className="w-full p-3.5 rounded-[3px] bg-[#101010] border border-[#1D1D1D] text-xs font-mono-tech text-[#F5F5F0] mb-6">
                  <span className="text-[#8A8A8A]">Core Proposition: </span>
                  <span className="text-[#0066FF] font-medium">"{systemStages[activeSystemStage].tagline}"</span>
                </div>

                <button
                  onClick={() => {
                    if (activeSystemStage === 1 && onInvestigateSignal) {
                      onInvestigateSignal('sig-001');
                    } else if (activeSystemStage === 2) {
                      onOpenApp('prioritize');
                    } else if (activeSystemStage === 3) {
                      onOpenApp('prds');
                    } else {
                      onOpenApp('overview');
                    }
                  }}
                  className="btn-magnetic w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-[3px] bg-[#141414] hover:bg-[#1C1C1C] border border-[#2E2E2E] text-xs font-mono-tech text-[#F5F5F0] cursor-pointer min-h-[44px]"
                >
                  <span>Experience this stage in OS →</span>
                </button>
              </div>

              {/* Right Stage Live Feed / Telemetry Preview */}
              <div className="lg:col-span-6 grid grid-cols-2 gap-2.5 sm:gap-3">
                {systemStages[activeSystemStage].metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3 sm:p-4 bg-[#101010] border border-[#1D1D1D] rounded-[3px] flex flex-col justify-between h-24 sm:h-28"
                  >
                    <span className="text-[9px] sm:text-[10px] font-mono-tech text-[#8A8A8A] truncate">{m.label}</span>
                    <div>
                      <p className="text-lg sm:text-xl font-bold font-mono-tech text-[#F5F5F0]">{m.val}</p>
                      <span
                        className={`text-[9px] sm:text-[10px] font-mono-tech ${
                          m.bad ? 'text-[#EF4444]' : 'text-[#10B981]'
                        }`}
                      >
                        {m.delta}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── SIGNATURE APP TRANSITION ───── */}
      <section className="py-16 sm:py-24 border-t border-[#1D1D1D] bg-[#070707] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <span className="text-[10px] font-mono-tech uppercase tracking-[0.25em] text-[#8A8A8A] block mb-3">
            SEAMLESS ENVIRONMENT SHIFT
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl text-[#F5F5F0] tracking-tight mb-4 sm:mb-6">
            NOW LET'S MAKE A DECISION.
          </h2>
          <p className="text-xs sm:text-sm text-[#8A8A8A] max-w-[50ch] mx-auto leading-relaxed mb-8 font-mono-tech px-2">
            Step inside the TapWise Operating System. Triage active payment anomalies, simulate roadmap trade-offs, challenge AI assumptions, and deploy guarded experiments.
          </p>

          <button
            onClick={() => onOpenApp('overview')}
            className="btn-magnetic w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-[3px] bg-[#F5F5F0] hover:bg-white text-[#050505] text-xs font-bold tracking-wider uppercase cursor-pointer shadow-xl shadow-white/5 min-h-[48px]"
          >
            <span>Enter TapWise OS →</span>
          </button>
        </div>
      </section>

      {/* ───── FOOTER ───── */}
      <footer className="border-t border-[#1D1D1D] py-8 sm:py-10 px-4 sm:px-6 bg-[#050505] text-[11px] font-mono-tech text-[#525252]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-[#F5F5F0] rounded-[2px] flex items-center justify-center font-bold text-[10px] text-[#050505]">
              TW
            </div>
            <div>
              <span className="font-bold text-[#F5F5F0] tracking-wider">TAPWISE</span>
              <span className="text-[#8A8A8A] ml-2">AI PRODUCT INTELLIGENCE</span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-[#8A8A8A]">
            <button onClick={() => onOpenApp('overview')} className="hover:text-[#F5F5F0] cursor-pointer">
              Product OS
            </button>
            <button onClick={onOpenCaseStudy} className="hover:text-[#F5F5F0] cursor-pointer">
              Case Study
            </button>
            <a
              href="https://github.com/Maahirrrr/TapWise"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#F5F5F0]"
            >
              GitHub
            </a>
          </div>

          <p className="text-[#525252] text-center sm:text-left">
            Built as an AI Product Management portfolio project.
          </p>
        </div>
      </footer>
    </div>
  );
};
