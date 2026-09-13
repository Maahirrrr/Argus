import React, { useState } from 'react';
import {
  Copy,
  Check,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  FlaskConical
} from 'lucide-react';
import type { NavigationTab, PRDDocument, PRDChallenge } from '../../types/finpilot';
import { DEMO_PRD, DEMO_PRD_CHALLENGE } from '../../data/demoData';

interface PrdWorkspaceProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onDeployExperiment: () => void;
}

export const PrdWorkspace: React.FC<PrdWorkspaceProps> = ({
  onNavigateTab,
  onDeployExperiment,
}) => {
  const [prd] = useState<PRDDocument>(DEMO_PRD);
  const [challenge] = useState<PRDChallenge>(DEMO_PRD_CHALLENGE);
  const [isChallenged, setIsChallenged] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'stories' | 'rollout'>('specs');
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
    } else if (action === 'stories') {
      setAiAssistLog('Refined Gherkin stories to include negative test scenarios for Bank U69 network congestion.');
    } else if (action === 'metrics') {
      setAiAssistLog('Recommended primary metric: "₹10k+ Payment Success Rate" with guardrail: "Gateway P99 Latency < 4,500ms".');
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto py-6 px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.08] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-400">
              PRD WORKSPACE · SPEC EDITOR
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/25">
              {prd.status.toUpperCase()}
            </span>
            <span className="text-[10px] font-mono text-zinc-500">
              {prd.version} · {prd.targetSprint}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {prd.title}
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Synthesized from Opportunity #014 · Author: {prd.author}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-zinc-300 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy MD'}</span>
          </button>

          {/* Signature Feature: Challenge My PRD Button */}
          <button
            onClick={() => setIsChallenged(!isChallenged)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
              isChallenged
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-amber-600/10 hover:bg-amber-600/20 text-amber-400 border border-amber-500/30'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{isChallenged ? 'Hide PRD Critique' : 'Challenge PRD (AI Critic)'}</span>
          </button>

          <button
            onClick={() => {
              onDeployExperiment();
              onNavigateTab('experiments');
            }}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold cursor-pointer shadow-sm shadow-blue-600/30 transition-all"
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Create Experiment →</span>
          </button>
        </div>
      </div>

      {/* ───── SIGNATURE FEATURE: "CHALLENGE MY PRD" (Section 12) ───── */}
      {isChallenged && (
        <div className="p-6 rounded-2xl bg-gradient-to-b from-amber-950/20 to-[#08090d] border border-amber-500/40 shadow-2xl flex flex-col gap-4 animate-fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              <h2 className="text-sm font-bold text-white font-mono uppercase tracking-tight">
                AI CRITIC: Adversarial Spec Review
              </h2>
            </div>
            <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/25">
              Reasoning Engine · Skeptical Staff PM Mode
            </span>
          </div>

          <div className="space-y-3 text-xs leading-relaxed">
            {/* Potential Weakness */}
            <div className="p-4 rounded-xl bg-black/50 border border-amber-500/20">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 block mb-1">
                Potential Weakness & Over-Assumption
              </span>
              <p className="text-zinc-200 font-mono">
                {challenge.potentialWeakness}
              </p>
              <span className="text-[10px] font-mono text-zinc-400 mt-1 block">
                Evidence: {challenge.confidenceNote}
              </span>
            </div>

            {/* Missing Considerations */}
            <div className="p-4 rounded-xl bg-black/50 border border-amber-500/20">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 block mb-2">
                Missing Considerations You Haven't Accounted For:
              </span>
              <ul className="space-y-1.5 font-mono text-zinc-300">
                {challenge.missingConsiderations.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Suggested Experiment */}
            <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/30">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-300 block mb-1">
                Suggested Validation Experiment Before 100% Rollout:
              </span>
              <p className="text-zinc-200 font-mono">
                "{challenge.suggestedExperiment}"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main PRD Layout: Document Editor on Left, AI Assist on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Editor Body */}
        <div className="lg:col-span-3 p-6 sm:p-8 rounded-2xl bg-[#090a0d] border border-white/[0.08] shadow-xl space-y-6 text-xs leading-relaxed text-zinc-300">
          {/* Sub-tabs */}
          <div className="flex items-center gap-1 pb-4 border-b border-white/[0.08]">
            {[
              { id: 'specs', label: '1. Specs & Requirements' },
              { id: 'stories', label: '2. User Stories (Gherkin)' },
              { id: 'rollout', label: '3. Metrics & Rollout' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                  activeTab === t.id
                    ? 'bg-white/[0.08] text-white font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {activeTab === 'specs' && (
            <div className="space-y-6">
              {/* Problem */}
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 mb-1.5">
                  1. Problem Statement
                </h3>
                <p className="text-white text-xs leading-relaxed bg-white/[0.01] p-3 rounded-lg border border-white/[0.04]">
                  {prd.problem}
                </p>
              </div>

              {/* User Impact */}
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 mb-1.5">
                  2. User & Business Impact
                </h3>
                <p className="text-zinc-300 text-xs leading-relaxed bg-white/[0.01] p-3 rounded-lg border border-white/[0.04]">
                  {prd.userImpact}
                </p>
              </div>

              {/* Goals & Non-Goals */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-emerald-950/10 border border-emerald-500/20">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 block mb-2">
                    Goals (In Scope)
                  </span>
                  <ul className="space-y-1.5 text-xs text-zinc-300">
                    {prd.goals.map((g, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/[0.06]">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                    Non-Goals (Out of Scope)
                  </span>
                  <ul className="space-y-1.5 text-xs text-zinc-400">
                    {prd.nonGoals.map((ng, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-zinc-600 font-bold">✕</span>
                        <span>{ng}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Functional Requirements */}
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 mb-3">
                  3. Functional Requirements
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {prd.requirements.map((req) => (
                    <div key={req.id} className="p-3.5 rounded-xl bg-[#08090d] border border-white/[0.06] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-zinc-500">{req.id}</span>
                        <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${
                          req.priority === 'P0' ? 'bg-red-500/20 text-red-300' : 'bg-blue-500/20 text-blue-300'
                        }`}>
                          {req.priority}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white">{req.title}</h4>
                      <p className="text-[11px] text-zinc-400">{req.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'stories' && (
            <div className="space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 mb-2">
                User Stories & Acceptance Criteria (Gherkin BDD)
              </h3>
              {prd.userStories.map((story, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#08090d] border border-white/[0.06] space-y-2.5">
                  <p className="text-xs font-mono text-zinc-200">
                    <span className="text-blue-400 font-bold">As a</span> {story.asA}, <br />
                    <span className="text-blue-400 font-bold">I want to</span> {story.iWantTo}, <br />
                    <span className="text-blue-400 font-bold">So that</span> {story.soThat}.
                  </p>

                  <div className="p-3 rounded-lg bg-black/40 border border-white/[0.04] text-[11px] font-mono text-zinc-300 space-y-1">
                    <span className="text-[10px] text-zinc-500 block mb-1">ACCEPTANCE CRITERIA</span>
                    {story.acceptanceCriteria.map((ac, idx) => (
                      <p key={idx} className="leading-snug">{ac}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'rollout' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 mb-3">
                  Success Metrics
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {prd.metrics.map((m, i) => (
                    <div key={i} className="p-3 rounded-xl bg-[#08090d] border border-white/[0.06]">
                      <span className="text-[10px] font-mono text-zinc-400 block mb-1">{m.name}</span>
                      <div className="flex items-baseline gap-2 font-mono">
                        <span className="text-xs text-zinc-500 line-through">{m.current}</span>
                        <span className="text-base font-bold text-emerald-400">{m.target}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 mb-3">
                  Phased Rollout Plan
                </h3>
                <div className="space-y-2">
                  {prd.rolloutPlan.map((p, i) => (
                    <div key={i} className="p-3 rounded-xl bg-[#08090d] border border-white/[0.06] flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-white block">{p.phase}</span>
                        <span className="text-[11px] text-zinc-400">{p.audience}</span>
                      </div>
                      <span className="text-[10px] font-mono text-blue-300 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                        {p.criteria}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* AI Assist Sidebar */}
        <div className="p-5 rounded-2xl bg-[#090a0d] border border-white/[0.08] shadow-xl flex flex-col gap-4">
          <div className="flex items-center gap-2 pb-3 border-b border-white/[0.06]">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              AI ASSIST
            </h3>
          </div>
          <p className="text-[11px] text-zinc-400 leading-snug">
            PM remains in control. Trigger assistive agents to inspect edge cases or challenge assumptions.
          </p>

          <div className="flex flex-col gap-2">
            {[
              { id: 'edge_cases', label: 'Identify edge cases' },
              { id: 'stories', label: 'Refine user stories' },
              { id: 'metrics', label: 'Suggest guardrail metrics' },
              { id: 'missing', label: 'Find missing requirements' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => handleAiAssist(btn.id)}
                className="w-full text-left px-3 py-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-xs text-zinc-300 hover:text-white cursor-pointer transition-colors"
              >
                {btn.label} →
              </button>
            ))}
          </div>

          {aiAssistLog && (
            <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-500/30 text-[11px] font-mono text-blue-200 mt-2">
              <span className="text-[9px] uppercase tracking-wider text-blue-400 block mb-1 font-bold">
                AI Copilot Output:
              </span>
              {aiAssistLog}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
