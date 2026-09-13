import React, { useState, useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Radio,
  Sparkles,
  SlidersHorizontal,
  FileText,
  FlaskConical,
  Terminal,
  Activity,
  ArrowRight,
  Compass
} from 'lucide-react';
import type { NavigationTab } from '../../types/argus';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: NavigationTab) => void;
}

interface TutorialStep {
  id: string;
  tab: NavigationTab;
  badge: string;
  title: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  howToUse: string[];
  proTip: string;
}

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 'overview',
    tab: 'overview',
    badge: 'STAGE 01 · INCIDENT RADAR',
    title: 'Overview Cockpit & Real-Time Sentry',
    tagline: 'Track payment health across 4.2M daily transactions at a glance.',
    icon: Activity,
    description: 'The Overview Cockpit acts as your morning triage station. It aggregates real-time payment success rates, tracks 24-hour drop-off velocity, and highlights active critical anomalies before customer support queues spike.',
    howToUse: [
      'Inspect the top metric strip for Success Rate, Active Drop-off Velocity, and At-Risk GMV.',
      'Review the Anomaly Sentry hero card to see the most pressing checkout bottleneck.',
      'Click "Investigate Drop-off" to jump straight into root-cause Bayesian analysis.',
    ],
    proTip: 'Use the new Live Chaos Simulator on this page to test how Argus dynamically reroutes traffic during partner bank outages.',
  },
  {
    id: 'signals',
    tab: 'signals',
    badge: 'STAGE 02 · TELEMETRY SENTRY',
    title: 'Signals Queue & Raw Event Triage',
    tagline: 'Sift through ClickHouse event logs, bank webhooks, and Zendesk tickets.',
    icon: Radio,
    description: 'Traditional analytics flood PMs with noisy dashboards. The Signals Queue filters millions of transactional events down to statistically verified anomalies with explicit severity tags and estimated GMV at risk.',
    howToUse: [
      'Filter signals by severity: All, Critical (Red), Medium (Amber), or Resolved (Green).',
      'Use the instant search bar to find anomalies by merchant, failure code (e.g. U30, U69), or gateway.',
      'Tap "Investigate Signal" to pass the anomaly into the Causal Decomposition engine.',
    ],
    proTip: 'Keyboard shortcut: Press "G" then "S" from anywhere in the app to jump directly to Signals.',
  },
  {
    id: 'insights',
    tab: 'insights',
    badge: 'STAGE 03 · CAUSAL INTELLIGENCE',
    title: 'Causal Insights & Bayesian Attribution',
    tagline: 'Isolate exactly WHY a checkout failure occurred down to bank, OS, and time.',
    icon: Sparkles,
    description: 'Argus decomposes multi-variable log records into clear failure distributions. It tells you whether an issue is caused by partner bank latency, an Android OS biometric bug, or an NPCI network choke.',
    howToUse: [
      'Tap any bar in the Drop-Off Funnel chart to inspect telemetry for that specific hour or step.',
      'Review the Root Cause Distribution bars to see exact system contributors and confidence percentages.',
      'Click "Why am I seeing this?" to inspect the AI Trust Layer model card with Bayesian priors and event lineage.',
    ],
    proTip: 'On touchscreens, tap any bar in the drop-off curve to lock telemetry inspection without needing a mouse hover.',
  },
  {
    id: 'prioritize',
    tab: 'prioritize',
    badge: 'STAGE 04 · ROADMAP WORKBENCH',
    title: 'Prioritization Workbench & Sensitivity Sliders',
    tagline: 'Simulate roadmap trade-offs and challenge PM assumptions before coding.',
    icon: SlidersHorizontal,
    description: 'Generative AI that blindly writes PRDs creates noise. Argus focuses on what NOT to build by providing dynamic RICE calculations, 3-scenario simulations (Conservative, Base, Aggressive), and a split-screen AI Critic.',
    howToUse: [
      'Select any initiative (e.g. Smart Payment Routing vs Biometric Quick Checkout).',
      'Drag the Reach, Impact, and Confidence sliders to test how RICE scores shift dynamically.',
      'Click "Challenge This Initiative" to open the Split-Screen Challenge Modal where an adversarial AI staff PM stress-tests your reasoning.',
    ],
    proTip: 'Click "Simulate 3 Scenarios" to see Monte Carlo projections of salvaged GMV across market conditions.',
  },
  {
    id: 'prds',
    tab: 'prds',
    badge: 'STAGE 05 · EXECUTION ENGINE',
    title: 'PRD Workspace & AI Adversarial Critic',
    tagline: 'Generate engineering-ready specs with Gherkin BDD stories and AI diffs.',
    icon: FileText,
    description: 'Transform verified priorities into complete, executable Product Requirement Documents with technical architecture, Gherkin acceptance criteria, phased rollout plans, and an interactive AI Critic.',
    howToUse: [
      'Switch between Requirements, Gherkin BDD Stories, and Phased Rollout sub-tabs.',
      'Use the embedded AI Critic buttons to challenge edge cases, refine Gherkin tests, or harden guardrail metrics.',
      'Use the new Version & Diff Inspector to compare your initial draft against the AI Critic-refined spec.',
    ],
    proTip: 'Click "Copy MD" to copy clean GitHub-flavored markdown ready to paste directly into Notion, Linear, or Jira.',
  },
  {
    id: 'experiments',
    tab: 'experiments',
    badge: 'STAGE 06 · GUARDED ROLLOUTS',
    title: 'Experiment Lab & Circuit Breakers',
    tagline: 'Deploy safe A/B rollouts with statistical sample size and automated rollback switches.',
    icon: FlaskConical,
    description: 'In financial flows, a broken experiment burns real money. The Experiment Lab computes two-sample Z-test statistical significance, monitors guardrails, and arms automated kill-switches.',
    howToUse: [
      'Adjust the Traffic Split slider to test 10/90, 50/50, or 80/20 rollout allocations.',
      'Monitor statistical power, Minimum Detectable Effect (MDE), and p-values in real time.',
      'Use the Emergency Rollback switch to instantly sever feature flag traffic if guardrails breach.',
    ],
    proTip: 'Argus automatically halts rollouts if checkout P99 latency exceeds 4,200ms or payment failure increases > 0.5%.',
  },
  {
    id: 'ai_copilot',
    tab: 'ai_copilot',
    badge: 'STAGE 07 · DUAL-MODE COPILOT',
    title: 'Contextual Copilot & ClickHouse SQL Studio',
    tagline: 'Query 4.2M events in natural language or get real-time PM decision advice.',
    icon: Terminal,
    description: 'A dual-mode intelligence studio: switch seamlessly between PM Decision Advisor (context-aware Bayesian recommendations based on your current screen) and Telemetry SQL Studio (translating prompts into ClickHouse queries).',
    howToUse: [
      'Use the top switcher to toggle between "PM Decision Advisor" and "Telemetry SQL Studio".',
      'Click quick prompt chips (e.g. "Simulate 3% drop-off", "Show HDFC timeout SQL") for instant answers.',
      'Click "Export SQL & Findings to PRD" to automatically attach query evidence to your roadmap spec.',
    ],
    proTip: 'Keyboard shortcut: Press "G" then "C" to immediately launch the Copilot studio.',
  },
];

export const TutorialModal: React.FC<TutorialModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        setCurrentStepIndex((prev) => (prev < TUTORIAL_STEPS.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowLeft') {
        setCurrentStepIndex((prev) => (prev > 0 ? prev - 1 : prev));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentStep = TUTORIAL_STEPS[currentStepIndex];
  const StepIcon = currentStep.icon;

  const handleNext = () => {
    if (currentStepIndex < TUTORIAL_STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleJumpToFeature = () => {
    onNavigateTab(currentStep.tab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fade-in select-none">
      <div
        className="w-full max-w-2xl bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-[#1D1D1D] flex items-center justify-between bg-[#080808]">
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-[2px] bg-[#0066FF] flex items-center justify-center text-white text-[10px] font-bold">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-bold text-xs tracking-wider text-[#F5F5F0] font-display">
                ARGUS INTERACTIVE TOUR
              </span>
              <span className="text-[10px] font-mono-tech text-[#8A8A8A] ml-2">
                Step {currentStepIndex + 1} of {TUTORIAL_STEPS.length}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-[2px] text-[#8A8A8A] hover:text-[#F5F5F0] border border-transparent hover:border-[#1D1D1D] hover:bg-[#141414] cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center transition-colors"
            title="Close Tutorial (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Feature Stage Navigation Chips (Horizontally swipeable) */}
        <div className="px-4 sm:px-6 py-2 border-b border-[#1D1D1D] bg-[#070707] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {TUTORIAL_STEPS.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => setCurrentStepIndex(idx)}
              className={`px-2.5 py-1 rounded-[2px] text-[10px] font-mono-tech whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1.5 ${
                idx === currentStepIndex
                  ? 'bg-[#0066FF] text-white font-bold shadow-sm shadow-[#0066FF]/30'
                  : 'bg-[#101010] text-[#8A8A8A] hover:text-[#F5F5F0] border border-[#1D1D1D]'
              }`}
            >
              <span>0{idx + 1}</span>
              <span className="hidden sm:inline">{step.title.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-5 bg-[#0A0A0A]">
          {/* Step Hero Card */}
          <div className="p-4 sm:p-5 rounded-[3px] bg-[#101010] border border-[#1D1D1D] relative overflow-hidden">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[#0066FF] font-bold">
                    {currentStep.badge}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[#F5F5F0] font-display tracking-tight">
                  {currentStep.title}
                </h2>
                <p className="text-xs text-[#8A8A8A] font-mono-tech mt-1 leading-relaxed">
                  {currentStep.tagline}
                </p>
              </div>

              <div className="w-10 h-10 rounded-[3px] bg-[#0066FF]/10 border border-[#0066FF]/25 flex items-center justify-center text-[#0066FF] flex-shrink-0">
                <StepIcon className="w-5 h-5" />
              </div>
            </div>

            <p className="text-xs text-[#CCCCCC] mt-3 leading-relaxed">
              {currentStep.description}
            </p>
          </div>

          {/* Actionable How-To Checklist */}
          <div>
            <span className="text-[10px] font-mono-tech text-[#525252] uppercase tracking-wider font-bold block mb-2">
              HOW TO USE THIS MODULE
            </span>
            <div className="flex flex-col gap-2">
              {currentStep.howToUse.map((instruction, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-[3px] bg-[#0D0D0D] border border-[#1D1D1D] flex items-start gap-2.5 text-xs text-[#E5E5E0]"
                >
                  <span className="w-5 h-5 rounded-[2px] bg-[#141414] border border-[#262626] text-[10px] font-mono-tech text-[#0066FF] flex items-center justify-center font-bold flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{instruction}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Tip Callout */}
          <div className="p-3.5 rounded-[3px] bg-[#081220] border border-[#0066FF]/25 flex items-start gap-3 text-xs">
            <span className="text-[10px] font-mono-tech px-1.5 py-0.2 rounded-[2px] bg-[#0066FF]/20 text-[#0066FF] font-bold uppercase tracking-wider flex-shrink-0 mt-0.5">
              PRO TIP
            </span>
            <span className="text-[#8AB4F8] leading-relaxed">
              {currentStep.proTip}
            </span>
          </div>
        </div>

        {/* Footer Navigation Bar */}
        <div className="px-4 sm:px-6 py-3.5 border-t border-[#1D1D1D] bg-[#080808] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className={`flex items-center gap-1 px-3 py-2 rounded-[2px] text-xs font-mono-tech border border-[#1D1D1D] transition-colors min-h-[40px] ${
                currentStepIndex === 0
                  ? 'opacity-30 cursor-not-allowed bg-[#0A0A0A] text-[#525252]'
                  : 'bg-[#101010] hover:bg-[#141414] text-[#8A8A8A] hover:text-[#F5F5F0] cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Prev</span>
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-1 px-3 py-2 rounded-[2px] text-xs font-mono-tech bg-[#101010] hover:bg-[#141414] border border-[#1D1D1D] text-[#8A8A8A] hover:text-[#F5F5F0] cursor-pointer transition-colors min-h-[40px]"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Direct Feature Shortcut CTA */}
          <button
            onClick={handleJumpToFeature}
            className="flex items-center gap-2 px-4 py-2 rounded-[2px] bg-[#0066FF] hover:bg-[#1A75FF] text-white text-xs font-semibold cursor-pointer shadow-lg shadow-[#0066FF]/25 transition-colors min-h-[40px]"
          >
            <span>Jump to {currentStep.title.split(' ')[0]}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
