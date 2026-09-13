import React, { useState } from 'react';
import {
  Copy,
  Check,
  Sparkles,
  FlaskConical
} from 'lucide-react';
import type { NavigationTab, PRDDocument } from '../../types/finpilot';
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
    <div className="flex flex-col gap-8 max-w-7xl mx-auto py-8 px-4 sm:px-6 select-none">
      {/* 31 PRD Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-[#1D1D1D] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono-tech uppercase tracking-[0.2em] text-[#0066FF] font-bold">
              PRD WORKSPACE · SPEC EDITOR
            </span>
            <span className="text-[10px] font-mono-tech px-2 py-0.2 rounded-[2px] bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/25">
              {prd.status.toUpperCase()}
            </span>
            <span className="text-[10px] font-mono-tech text-[#8A8A8A]">
              {prd.version} · {prd.targetSprint}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F5F0] tracking-tight font-display">
            {prd.title}
          </h1>
          <p className="text-xs text-[#8A8A8A] font-mono-tech mt-1">
            Synthesized from Opportunity #014 · Author: {prd.author}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] bg-[#101010] hover:bg-[#141414] border border-[#1D1D1D] text-xs font-mono-tech text-[#8A8A8A] hover:text-[#F5F5F0] cursor-pointer transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy MD'}</span>
          </button>

          <button
            onClick={() => {
              onDeployExperiment();
              onNavigateTab('experiments');
            }}
            className="btn-magnetic flex items-center gap-1.5 px-4 py-1.5 rounded-[3px] bg-[#0066FF] hover:bg-[#1A75FF] text-white text-xs font-semibold cursor-pointer shadow-md shadow-[#0066FF]/20"
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Create Experiment →</span>
          </button>
        </div>
      </div>

      {/* Main Layout: Document Canvas (Left) vs Embedded AI Assistant (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: PRD Document */}
        <div className="lg:col-span-8 flex flex-col gap-6 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px] p-6 sm:p-8">
          {/* Sub-tabs */}
          <div className="flex items-center gap-2 border-b border-[#1D1D1D] pb-3 text-xs font-mono-tech">
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-3 py-1 rounded-[2px] transition-colors cursor-pointer ${
                activeTab === 'specs' ? 'bg-[#141414] text-[#F5F5F0] font-bold' : 'text-[#8A8A8A] hover:text-[#F5F5F0]'
              }`}
            >
              Requirements & Specs
            </button>
            <button
              onClick={() => setActiveTab('stories')}
              className={`px-3 py-1 rounded-[2px] transition-colors cursor-pointer ${
                activeTab === 'stories' ? 'bg-[#141414] text-[#F5F5F0] font-bold' : 'text-[#8A8A8A] hover:text-[#F5F5F0]'
              }`}
            >
              Gherkin User Stories
            </button>
            <button
              onClick={() => setActiveTab('rollout')}
              className={`px-3 py-1 rounded-[2px] transition-colors cursor-pointer ${
                activeTab === 'rollout' ? 'bg-[#141414] text-[#F5F5F0] font-bold' : 'text-[#8A8A8A] hover:text-[#F5F5F0]'
              }`}
            >
              Rollout Plan
            </button>
          </div>

          {activeTab === 'specs' && (
            <div className="flex flex-col gap-6">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

              {/* Functional Specs (P0, P1, P2) */}
              <div>
                <span className="text-[10px] font-mono-tech uppercase text-[#8A8A8A] font-bold block mb-2">
                  3.0 FUNCTIONAL SPECIFICATIONS
                </span>
                <div className="flex flex-col divide-y divide-[#161616] border border-[#161616] rounded-[3px] bg-[#050505]">
                  {prd.requirements.map((req) => (
                    <div key={req.id} className="p-3 flex items-start gap-3">
                      <span className={`text-[9px] font-mono-tech px-1.5 py-0.2 rounded-[2px] font-bold ${
                        req.priority === 'P0'
                          ? 'bg-[#EF4444]/20 text-[#EF4444]'
                          : 'bg-[#0066FF]/20 text-[#0066FF]'
                      }`}>
                        {req.priority}
                      </span>
                      <div>
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
              <span className="text-[10px] font-mono-tech uppercase text-[#0066FF] font-bold block">
                ACCEPTANCE CRITERIA (GHERKIN & STORIES)
              </span>
              <div className="space-y-3">
                {prd.userStories.map((story, i) => (
                  <div key={i} className="p-4 rounded-[3px] bg-[#050505] border border-[#161616] font-mono-tech text-xs">
                    <span className="text-[10px] text-[#0066FF] font-bold block mb-1">USER STORY {i + 1}</span>
                    <p className="text-[#F5F5F0] mb-2">As a {story.asA}, I want to {story.iWantTo}, so that {story.soThat}.</p>
                    <div className="pt-2 border-t border-[#141414] space-y-1 text-[#8A8A8A]">
                      {story.acceptanceCriteria.map((ac, j) => (
                        <p key={j}>• {ac}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'rollout' && (
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-mono-tech uppercase text-[#0066FF] font-bold block">
                PHASED ROLLOUT STRATEGY
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {prd.rolloutPlan.map((step, i) => (
                  <div key={i} className="p-4 rounded-[3px] bg-[#050505] border border-[#161616] flex flex-col justify-between h-32">
                    <span className="text-[10px] font-mono-tech text-[#0066FF] font-bold">PHASE {i + 1}</span>
                    <div>
                      <p className="text-sm font-bold text-[#F5F5F0]">{step.phase}</p>
                      <p className="text-[10px] font-mono-tech text-[#8A8A8A]">{step.audience}</p>
                    </div>
                    <span className="text-[9px] font-mono-tech text-[#10B981]">{step.criteria}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Embedded AI Assistant Toolbar */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="p-5 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px] flex flex-col gap-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[#1D1D1D]">
              <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
              <span className="text-xs font-mono-tech font-bold uppercase text-[#0066FF]">
                EMBEDDED AI TOOLBAR
              </span>
            </div>

            <p className="text-xs font-mono-tech text-[#8A8A8A]">
              Refine specifications, stress-test edge cases, and inspect missing assumptions.
            </p>

            <div className="grid grid-cols-1 gap-2 pt-1">
              <button
                onClick={() => handleAiAssist('edge_cases')}
                className="btn-magnetic flex items-center justify-between p-2.5 rounded-[3px] bg-[#101010] hover:bg-[#141414] border border-[#1D1D1D] text-xs font-mono-tech text-[#F5F5F0] cursor-pointer"
              >
                <span>Find Missing Edge Cases</span>
                <span className="text-[10px] text-[#0066FF]">AI</span>
              </button>
              <button
                onClick={() => handleAiAssist('stories')}
                className="btn-magnetic flex items-center justify-between p-2.5 rounded-[3px] bg-[#101010] hover:bg-[#141414] border border-[#1D1D1D] text-xs font-mono-tech text-[#F5F5F0] cursor-pointer"
              >
                <span>Expand Gherkin Scenarios</span>
                <span className="text-[10px] text-[#0066FF]">AI</span>
              </button>
              <button
                onClick={() => handleAiAssist('metrics')}
                className="btn-magnetic flex items-center justify-between p-2.5 rounded-[3px] bg-[#101010] hover:bg-[#141414] border border-[#1D1D1D] text-xs font-mono-tech text-[#F5F5F0] cursor-pointer"
              >
                <span>Audit Success Metrics</span>
                <span className="text-[10px] text-[#0066FF]">AI</span>
              </button>
            </div>

            {aiAssistLog && (
              <div className="mt-2 p-3 rounded-[3px] bg-[#0E1016] border border-[#0066FF]/30 text-xs font-mono-tech text-[#F5F5F0] leading-relaxed">
                <span className="text-[#0066FF] font-bold block mb-1">AI Spec Audit Output:</span>
                {aiAssistLog}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
