import React, { useState } from 'react';
import {
  Copy,
  Check,
  Sparkles,
  FlaskConical,
  GitCompare,
      Plus,
  Minus,
  } from 'lucide-react';
import type { NavigationTab, PRDDocument } from '../../types/argus';
import { DEMO_PRD } from '../../data/demoData';

interface PrdWorkspaceProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onDeployExperiment: () => void;
}

export const PrdWorkspace: React.FC<PrdWorkspaceProps> = ({
  onNavigateTab,
  onDeployExperiment,
}) => {
  const [prd] = useState<PRDDocument>(DEMO_PRD);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'stories' | 'rollout' | 'diff'>('specs');
  const [aiAssistLog, setAiAssistLog] = useState<string | null>(null);

  const handleCopy = () => {
    const text = `# ${prd.title} (${prd.version})
Problem: ${prd.problem}
User Impact: ${prd.userImpact}
Goals: ${prd.goals.join(', ')}
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAiAssist = (action: string) => {
    if (action === 'edge_cases') {
      setAiAssistLog('AI identified 3 unhandled edge cases: (1) Dual SIM 4G data switch mid-payment, (2) Rooted OS bypass of biometric prompt, (3) Concurrent merchant QR scan.');
      setActiveTab('diff');
    } else if (action === 'stories') {
      setAiAssistLog('Refined Gherkin stories to include negative test scenarios for Bank U69 network congestion.');
    } else if (action === 'metrics') {
      setAiAssistLog('Recommended primary metric: "₹10k+ Payment Success Rate" with guardrail: "Gateway P99 Latency < 4,500ms".');
    }
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8 max-w-7xl mx-auto py-5 sm:py-8 px-4 sm:px-6 select-none pb-24 md:pb-8">
      {/* PRD Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-5 border-b border-[#1D1D1D] gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono-tech uppercase tracking-[0.2em] text-[#0066FF] font-bold">
              PRD WORKSPACE · SPEC & DIFF EDITOR
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono-tech px-2 py-0.2 rounded-[2px] bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/25">
              {prd.status.toUpperCase()}
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono-tech text-[#8A8A8A]">
              {prd.version}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#F5F5F0] tracking-tight font-display">
            {prd.title}
          </h1>
          <p className="text-xs text-[#8A8A8A] font-mono-tech mt-1">
            Synthesized from Opportunity #014 · Author: {prd.author}
          </p>
        </div>

        <div className="flex items-center gap-2.5 pt-1 sm:pt-0">
          <button
            onClick={handleCopy}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-[3px] bg-[#101010] hover:bg-[#141414] border border-[#1D1D1D] text-xs font-mono-tech text-[#8A8A8A] hover:text-[#F5F5F0] cursor-pointer transition-colors min-h-[42px]"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy MD'}</span>
          </button>

          <button
            onClick={() => {
              onDeployExperiment();
              onNavigateTab('experiments');
            }}
            className="btn-magnetic flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-[3px] bg-[#0066FF] hover:bg-[#1A75FF] text-white text-xs font-semibold cursor-pointer shadow-md shadow-[#0066FF]/20 min-h-[42px]"
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Create Experiment →</span>
          </button>
        </div>
      </div>

      {/* Main Layout: Document Canvas vs Embedded AI Assistant */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: PRD Document */}
        <div className="lg:col-span-8 flex flex-col gap-5 sm:gap-6 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px] p-4 sm:p-6 lg:p-8">
          {/* Sub-tabs (Scrollable on phones) */}
          <div className="flex items-center gap-2 border-b border-[#1D1D1D] pb-3 text-xs font-mono-tech overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-3 py-2 rounded-[2px] transition-colors cursor-pointer flex-shrink-0 min-h-[38px] ${
                activeTab === 'specs' ? 'bg-[#141414] text-[#F5F5F0] font-bold border border-[#2E2E2E]' : 'text-[#8A8A8A] hover:text-[#F5F5F0]'
              }`}
            >
              Requirements & Specs
            </button>
            <button
              onClick={() => setActiveTab('stories')}
              className={`px-3 py-2 rounded-[2px] transition-colors cursor-pointer flex-shrink-0 min-h-[38px] ${
                activeTab === 'stories' ? 'bg-[#141414] text-[#F5F5F0] font-bold border border-[#2E2E2E]' : 'text-[#8A8A8A] hover:text-[#F5F5F0]'
              }`}
            >
              Gherkin Stories
            </button>
            <button
              onClick={() => setActiveTab('rollout')}
              className={`px-3 py-2 rounded-[2px] transition-colors cursor-pointer flex-shrink-0 min-h-[38px] ${
                activeTab === 'rollout' ? 'bg-[#141414] text-[#F5F5F0] font-bold border border-[#2E2E2E]' : 'text-[#8A8A8A] hover:text-[#F5F5F0]'
              }`}
            >
              Rollout Plan
            </button>
            <button
              onClick={() => setActiveTab('diff')}
              className={`px-3 py-2 rounded-[2px] transition-colors cursor-pointer flex-shrink-0 min-h-[38px] flex items-center gap-1.5 ${
                activeTab === 'diff' ? 'bg-[#0066FF]/20 text-[#0066FF] font-bold border border-[#0066FF]/40' : 'text-[#8A8A8A] hover:text-[#0066FF]'
              }`}
            >
              <GitCompare className="w-3.5 h-3.5" />
              <span>AI Version Diff (v1 vs v2)</span>
            </button>
          </div>

          {activeTab === 'specs' && (
            <div className="flex flex-col gap-5 sm:gap-6">
              {/* Problem */}
              <div>
                <span className="text-[10px] font-mono-tech uppercase text-[#0066FF] font-bold block mb-1">
                  1.0 PROBLEM STATEMENT
                </span>
                <p className="text-xs font-mono-tech text-[#F5F5F0] leading-relaxed bg-[#050505] p-3 rounded-[3px] border border-[#161616]">
                  {prd.problem}
                </p>
              </div>

              {/* User Impact */}
              <div>
                <span className="text-[10px] font-mono-tech uppercase text-[#8A8A8A] font-bold block mb-1">
                  2.0 USER & BUSINESS IMPACT
                </span>
                <p className="text-xs font-mono-tech text-[#8A8A8A] leading-relaxed">
                  {prd.userImpact}
                </p>
              </div>

              {/* Goals & Non-Goals */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="p-3.5 bg-[#050505] border border-[#161616] rounded-[3px]">
                  <span className="text-[10px] font-mono-tech text-[#10B981] font-bold block mb-2">
                    SUCCESS GOALS
                  </span>
                  <ul className="text-xs font-mono-tech text-[#8A8A8A] space-y-1">
                    {prd.goals.map((g, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-[#10B981]">✓</span>
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 bg-[#050505] border border-[#161616] rounded-[3px]">
                  <span className="text-[10px] font-mono-tech text-[#EF4444] font-bold block mb-2">
                    EXPLICIT NON-GOALS
                  </span>
                  <ul className="text-xs font-mono-tech text-[#8A8A8A] space-y-1">
                    {prd.nonGoals.map((ng, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-[#EF4444]">✕</span>
                        <span>{ng}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Functional Specs */}
              <div>
                <span className="text-[10px] font-mono-tech uppercase text-[#8A8A8A] font-bold block mb-2">
                  3.0 FUNCTIONAL SPECIFICATIONS
                </span>
                <div className="flex flex-col divide-y divide-[#161616] border border-[#161616] rounded-[3px] bg-[#050505] overflow-hidden">
                  {prd.requirements.map((req) => (
                    <div key={req.id} className="p-3 flex items-start gap-3">
                      <span className={`text-[9px] font-mono-tech px-1.5 py-0.2 rounded-[2px] font-bold ${
                        req.priority === 'P0'
                          ? 'bg-[#EF4444]/20 text-[#EF4444]'
                          : 'bg-[#0066FF]/20 text-[#0066FF]'
                      }`}>
                        {req.priority}
                      </span>
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-[#F5F5F0] block mb-0.5">{req.title}</span>
                        <p className="text-[11px] font-mono-tech text-[#8A8A8A]">{req.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'stories' && (
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-mono-tech uppercase text-[#8A8A8A] font-bold block">
                BDD ACCEPTANCE CRITERIA (GHERKIN SYNTAX)
              </span>
              <div className="flex flex-col gap-3">
                {prd.userStories.map((story, idx) => (
                  <div key={idx} className="p-3.5 bg-[#050505] border border-[#161616] rounded-[3px] font-mono-tech text-xs">
                    <span className="text-[10px] text-[#0066FF] font-bold block mb-1">STORY #0{idx + 1}</span>
                    <p className="text-[#F5F5F0] mb-1 font-medium">As a {story.asA}</p>
                    <p className="text-[#8A8A8A] text-[11px] mb-2">I want to {story.iWantTo}, so that {story.soThat}</p>
                    <div className="space-y-1 text-[11px] pl-2 border-l border-[#1D1D1D] text-[#8A8A8A]">
                      {story.acceptanceCriteria.map((crit, cIdx) => (
                        <p key={cIdx}><span className="text-[#10B981]">✓</span> {crit}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'rollout' && (
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-mono-tech uppercase text-[#8A8A8A] font-bold block">
                PHASED ROLLOUT TIMELINE & GUARDRAILS
              </span>
              <div className="space-y-3">
                {prd.rolloutPlan.map((step, idx) => (
                  <div key={idx} className="p-3.5 bg-[#050505] border border-[#161616] rounded-[3px] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono-tech">
                    <div>
                      <span className="text-[#0066FF] font-bold block sm:inline mr-2">{step.phase}</span>
                      <span className="text-[#F5F5F0]">{step.audience}</span>
                    </div>
                    <span className="text-[#8A8A8A] text-[11px] bg-[#101010] px-2 py-1 rounded-[2px] border border-[#1D1D1D]">
                      Exit Criteria: {step.criteria}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ADVANCED FEATURE: AI VERSION & DIFF INSPECTOR */}
          {activeTab === 'diff' && (
            <div className="flex flex-col gap-5 animate-fade-in">
              <div className="p-4 rounded-[3px] bg-[#0E1626] border border-[#0066FF]/30">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <GitCompare className="w-4 h-4 text-[#0066FF]" />
                    <span className="text-xs font-bold text-[#F5F5F0] font-display">
                      PRD Version Comparison · v1.0 (PM Draft) ➔ v2.0 (Critic Refined)
                    </span>
                  </div>
                  <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded-[2px] bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30 font-bold">
                    +4 HARDENED RULES
                  </span>
                </div>
                <p className="text-xs text-[#8AB4F8] leading-relaxed">
                  The Adversarial AI Critic reviewed your initial draft against 4.2M transactional failure edge cases and injected 4 critical engineering safeguards:
                </p>
              </div>

              {/* Diff Cards */}
              <div className="flex flex-col gap-3 font-mono-tech text-xs">
                {/* Diff Item 1 */}
                <div className="p-3.5 rounded-[3px] bg-[#050505] border border-[#1D1D1D]">
                  <span className="text-[10px] text-[#8A8A8A] uppercase font-bold block mb-2">
                    EDGE CASE 1: UPI AUTOPAY TIMEOUT FALLBACK
                  </span>
                  <div className="space-y-1.5">
                    <div className="p-2 rounded-[2px] bg-[#220B0B] text-[#FCA5A5] flex items-start gap-2">
                      <Minus className="w-3.5 h-3.5 text-[#EF4444] flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">
                        v1.0: "If payment times out, display retry button and re-trigger payment via same bank acquiring rail."
                      </span>
                    </div>
                    <div className="p-2 rounded-[2px] bg-[#092415] text-[#86EFAC] flex items-start gap-2">
                      <Plus className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">
                        v2.0: "If response latency &gt; 3,500ms on HDFC switch, throttle auto-retries to max 2 attempts with exponential backoff (2s, 6s) and offer 1-tap fallback to secondary ICICI Direct rail."
                      </span>
                    </div>
                  </div>
                </div>

                {/* Diff Item 2 */}
                <div className="p-3.5 rounded-[3px] bg-[#050505] border border-[#1D1D1D]">
                  <span className="text-[10px] text-[#8A8A8A] uppercase font-bold block mb-2">
                    EDGE CASE 2: CONCURRENT MERCHANT QR LOCK
                  </span>
                  <div className="space-y-1.5">
                    <div className="p-2 rounded-[2px] bg-[#220B0B] text-[#FCA5A5] flex items-start gap-2">
                      <Minus className="w-3.5 h-3.5 text-[#EF4444] flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">
                        v1.0: "Wait indefinitely for webhook before clearing pending UI session."
                      </span>
                    </div>
                    <div className="p-2 rounded-[2px] bg-[#092415] text-[#86EFAC] flex items-start gap-2">
                      <Plus className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">
                        v2.0: "Enforce 15s P99 client timeout. If webhook pending, trigger active background polling while maintaining redis merchant idempotent lock to prevent double-debit."
                      </span>
                    </div>
                  </div>
                </div>

                {/* Diff Item 3 */}
                <div className="p-3.5 rounded-[3px] bg-[#050505] border border-[#1D1D1D]">
                  <span className="text-[10px] text-[#8A8A8A] uppercase font-bold block mb-2">
                    CIRCUIT BREAKER GUARDRAIL ADDED
                  </span>
                  <div className="p-2 rounded-[2px] bg-[#092415] text-[#86EFAC] flex items-start gap-2">
                    <Plus className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">
                      v2.0: "Automated kill-switch: Sever traffic and rollback flag within 500ms if partner gateway 5xx error rate exceeds 3.0% over 200 contiguous transactions."
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Embedded AI PM Critic */}
        <div className="lg:col-span-4 flex flex-col gap-4 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px] p-4 sm:p-5">
          <div className="flex items-center gap-2 pb-3 border-b border-[#1D1D1D]">
            <Sparkles className="w-4 h-4 text-[#0066FF]" />
            <span className="text-xs font-bold text-[#F5F5F0] font-display uppercase tracking-wider">
              AI ADVERSARIAL CRITIC
            </span>
          </div>

          <p className="text-xs text-[#8A8A8A] leading-relaxed">
            Run automated stress-tests on this PRD to surface blind spots, missing edge cases, and compliance loopholes before engineering reviews.
          </p>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleAiAssist('edge_cases')}
              className="p-3 rounded-[3px] bg-[#101010] hover:bg-[#161616] border border-[#1D1D1D] text-left text-xs font-mono-tech text-[#F5F5F0] cursor-pointer transition-colors"
            >
              <span className="text-[#0066FF] font-bold block mb-0.5">⚡ Surface Edge Cases</span>
              <span className="text-[11px] text-[#8A8A8A]">Identify dual-SIM, device timeout, and network churn risks.</span>
            </button>

            <button
              onClick={() => handleAiAssist('stories')}
              className="p-3 rounded-[3px] bg-[#101010] hover:bg-[#161616] border border-[#1D1D1D] text-left text-xs font-mono-tech text-[#F5F5F0] cursor-pointer transition-colors"
            >
              <span className="text-[#10B981] font-bold block mb-0.5">✓ Harden Gherkin Criteria</span>
              <span className="text-[11px] text-[#8A8A8A]">Add negative acceptance scenarios for banking switch congestion.</span>
            </button>

            <button
              onClick={() => handleAiAssist('metrics')}
              className="p-3 rounded-[3px] bg-[#101010] hover:bg-[#161616] border border-[#1D1D1D] text-left text-xs font-mono-tech text-[#F5F5F0] cursor-pointer transition-colors"
            >
              <span className="text-[#F59E0B] font-bold block mb-0.5">🛡️ Stress-Test Guardrails</span>
              <span className="text-[11px] text-[#8A8A8A]">Validate P99 latency thresholds and rollback triggers.</span>
            </button>
          </div>

          {aiAssistLog && (
            <div className="p-3 rounded-[3px] bg-[#050505] border border-[#0066FF]/30 text-xs font-mono-tech text-[#8AB4F8] leading-relaxed animate-fade-in">
              <span className="text-[10px] text-[#0066FF] font-bold block mb-1">CRITIC FEEDBACK</span>
              {aiAssistLog}
            </div>
          )}

          <div className="pt-3 border-t border-[#1D1D1D] text-[10px] font-mono-tech text-[#525252]">
            MODEL: CLAUDE 3.5 SONNET · ADVERSARIAL CRITIC
          </div>
        </div>
      </div>
    </div>
  );
};
