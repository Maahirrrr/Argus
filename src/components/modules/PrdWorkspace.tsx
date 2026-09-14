import React, { useState } from 'react';
import {
  Copy,
  Check,
  FlaskConical,
  GitCompare,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import type { NavigationTab, PRDDocument } from '../../types/argus';
import { DEMO_PRD } from '../../data/demoData';

interface PrdWorkspaceProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onDeployExperiment?: () => void;
}

export const PrdWorkspace: React.FC<PrdWorkspaceProps> = ({
  onNavigateTab,
  onDeployExperiment,
}) => {
  const [prd] = useState<PRDDocument>(DEMO_PRD);
  const [problemInput, setProblemInput] = useState(
    'Payment failures surge by 16.2pp on ₹10k+ checkouts between 8–10 PM due to HDFC switch gateway timeouts. Need automated circuit breaker and zero-friction fallback.'
  );
  const [showDiff, setShowDiff] = useState(false);
  const [activeCritiques, setActiveCritiques] = useState<Record<string, boolean>>({
    problem: false,
    scope: false,
    specs: false,
    bdd: false,
    rollout: false,
  });
  const [copied, setCopied] = useState(false);

  const toggleCritique = (sectionKey: string) => {
    setActiveCritiques((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  const handleCopy = () => {
    const md = `# ${prd.title} (${prd.version})
Status: ${prd.status}
Author: ${prd.author}

## Problem Statement
${prd.problem}

## Scope
Goals: ${prd.goals.join(', ')}
User Impact: ${prd.userImpact}

## Functional Specifications
${prd.requirements.map((s) => `- ${s.title} (${s.priority}): ${s.description}`).join('\n')}

## BDD Acceptance Criteria (Gherkin)
${prd.userStories.map((us) => `### ${us.asA}
I want to ${us.iWantTo}
So that ${us.soThat}
Criteria: ${us.acceptanceCriteria.join(', ')}`).join('\n\n')}
`;
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const gherkinCode = `Feature: Autonomous Gateway Circuit-Breaker & Instant Intent Fallback
  As a high-value checkout transactor (>= ₹10,000)
  I want payment attempts to dynamically bypass degraded banking switches
  So that transaction success rates remain above 95% without manual retry

  Scenario: Primary switch timeout triggers sub-second failover
    Given a user initiates a UPI checkout of ₹15,000
    And the primary gateway switch (HDFC) P99 latency exceeds 3,500ms
    When the payment client executes the authorization handshake
    Then Argus circuit breaker intercepts the request at 1,200ms threshold
    And silently routes traffic to secondary acquiring switch (ICICI Direct)
    And transaction resolves successfully within 2,800ms total elapsed time

  Scenario: Biometric prompt suspension on Android 15
    Given user has biometric authentication active on Android 15 (v4.19)
    When the system biometric prompt fails to return callback within 3,500ms
    Then client dismisses modal and displays fallback MPIN entry sheet
    And records a degraded biometric telemetry event to ClickHouse`;

  return (
    <div className="space-y-8 select-none">
      {/* Header */}
      <div className="border-b border-[#1A1A1A] pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="argus-section-label">Build</span>
          <span className="text-[#1A1A1A]">/</span>
          <span className="argus-section-label text-[#0066FF]">PRD Studio</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="argus-module-title">PRD Studio</h1>
              <span className="px-1.5 py-0.5 rounded bg-[#111111] border border-[#1A1A1A] font-mono text-[11px] text-[#9CA3AF]">
                v2.1 · Synthesized from Incident #47
              </span>
            </div>
            <p className="argus-prose text-xs text-[#6B7280] mt-0.5">
              Automated PRD synthesizer with adversarial critique mode, diff tracking, and executable BDD test cases.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {/* v1 vs v2 diff toggle */}
            <button
              onClick={() => setShowDiff(!showDiff)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono border transition-colors cursor-pointer ${
                showDiff
                  ? 'bg-[#0066FF] text-[#FFFFFF] border-[#0066FF]'
                  : 'bg-[#0A0A0A] text-[#9CA3AF] hover:text-[#FFFFFF] border-[#1A1A1A]'
              }`}
            >
              <GitCompare className="w-3.5 h-3.5" />
              <span>{showDiff ? 'Diff Active (v1 vs v2)' : 'Compare v1 vs v2 Diff'}</span>
            </button>

            {/* Copy markdown */}
            <button
              onClick={handleCopy}
              className="argus-btn-secondary py-1.5 px-3 text-xs cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#00FF88]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy MD'}</span>
            </button>

            {/* Create experiment CTA */}
            <button
              onClick={() => {
                if (onDeployExperiment) onDeployExperiment();
                onNavigateTab('experiments');
              }}
              className="argus-btn-primary py-1.5 px-3.5 text-xs font-medium cursor-pointer"
            >
              <FlaskConical className="w-3.5 h-3.5" />
              <span>Deploy Experiment</span>
            </button>
          </div>
        </div>
      </div>

      {/* Input Problem Statement Canvas */}
      <section className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-[6px] p-5 space-y-3">
        <label className="argus-section-label block">Problem Statement & Strategic Context</label>
        <div className="flex flex-col sm:flex-row gap-3">
          <textarea
            rows={2}
            value={problemInput}
            onChange={(e) => setProblemInput(e.target.value)}
            className="flex-1 bg-[#050505] border border-[#1A1A1A] focus:border-[#0066FF] rounded-[4px] p-3 text-xs font-mono text-[#FFFFFF] placeholder:text-[#6B7280] outline-none leading-relaxed"
          />
          <button className="argus-btn-primary py-2 px-4 text-xs self-start sm:self-auto flex-shrink-0 cursor-pointer">
            Regenerate Spec
          </button>
        </div>
      </section>

      {/* Structured Document Canvas (Single Editor Panel Default) */}
      <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-[6px] p-6 space-y-8">
        {/* Section 1: Problem Statement */}
        <div className="border-l-2 border-[#1A1A1A] pl-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="argus-module-title text-[15px]">1. Problem Statement</h3>
            <button
              onClick={() => toggleCritique('problem')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer border ${
                activeCritiques.problem
                  ? 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30'
                  : 'bg-[#111111] text-[#6B7280] hover:text-[#FFFFFF] border-[#1A1A1A]'
              }`}
            >
              <MessageSquare className="w-3 h-3" />
              <span>{activeCritiques.problem ? 'Hide Critique' : 'Critique'}</span>
            </button>
          </div>

          <p className="argus-prose text-xs text-[#D1D5DB] leading-relaxed">
            During high-traffic evening windows (20:00–22:00 IST), HDFC switch batch processing causes gateway timeouts to surge from 1.2% to 17.4% on payments exceeding ₹10,000. Users experience 12+ second spinner hangs before generic failure screens, triggering repeat double-debits and ₹14,200/sec in lost GMV.
          </p>

          {/* Inline Critique Aside Panel in #111111 with #F59E0B yellow left accent */}
          {activeCritiques.problem && (
            <div className="p-3.5 bg-[#111111] border-l-2 border-l-[#F59E0B] border-y border-r border-[#1A1A1A] rounded-r-[4px] space-y-1 text-xs text-[#D1D5DB]">
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#F59E0B] font-bold uppercase">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Adversarial Critic Rationale</span>
              </div>
              <p className="leading-relaxed">
                The problem definition focuses heavily on technical switch timeouts but under-indexes on merchant abandonment behavior. Recommend adding metric on first-time merchant cart abandonment rate.
              </p>
            </div>
          )}
        </div>

        {/* Section 2: Scope & Non-Goals */}
        <div className="border-l-2 border-[#1A1A1A] pl-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="argus-module-title text-[15px]">2. Scope & Non-Goals</h3>
            <button
              onClick={() => toggleCritique('scope')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer border ${
                activeCritiques.scope
                  ? 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30'
                  : 'bg-[#111111] text-[#6B7280] hover:text-[#FFFFFF] border-[#1A1A1A]'
              }`}
            >
              <MessageSquare className="w-3 h-3" />
              <span>{activeCritiques.scope ? 'Hide Critique' : 'Critique'}</span>
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <div>
              <span className="font-mono text-[11px] text-[#00FF88] block mb-1">IN-SCOPE (MVP):</span>
              <ul className="list-disc list-inside text-[#D1D5DB] space-y-1">
                <li>Automated circuit-breaker tripping at 1,200ms timeout threshold.</li>
                <li>Dynamic traffic redirection: 85% to ICICI direct acquiring switch.</li>
                <li>Android 15 battery policy watchdog with instant PIN fallback.</li>
              </ul>
            </div>

            {showDiff && (
              <div className="py-2 space-y-1">
                <div className="bg-[#FF3B30]/15 text-[#FF3B30] border-l-2 border-l-[#FF3B30] px-2.5 py-1 rounded-r font-mono text-[11px]">
                  - [Removed v1]: Manual switch toggling via DevOps Slack bot.
                </div>
                <div className="bg-[#00FF88]/15 text-[#00FF88] border-l-2 border-l-[#00FF88] px-2.5 py-1 rounded-r font-mono text-[11px]">
                  + [Added v2]: Fully autonomous real-time routing engine with zero manual operator intervention.
                </div>
              </div>
            )}
          </div>

          {activeCritiques.scope && (
            <div className="p-3.5 bg-[#111111] border-l-2 border-l-[#F59E0B] border-y border-r border-[#1A1A1A] rounded-r-[4px] space-y-1 text-xs text-[#D1D5DB]">
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#F59E0B] font-bold uppercase">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Adversarial Critic Rationale</span>
              </div>
              <p className="leading-relaxed">
                Confirm whether NPCI U30 timeout errors are included in the circuit-breaker rule, or if this solely handles acquirer-level latency spikes.
              </p>
            </div>
          )}
        </div>

        {/* Section 3: Functional Specifications */}
        <div className="border-l-2 border-[#1A1A1A] pl-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="argus-module-title text-[15px]">3. Functional Specifications</h3>
            <button
              onClick={() => toggleCritique('specs')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer border ${
                activeCritiques.specs
                  ? 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30'
                  : 'bg-[#111111] text-[#6B7280] hover:text-[#FFFFFF] border-[#1A1A1A]'
              }`}
            >
              <MessageSquare className="w-3 h-3" />
              <span>{activeCritiques.specs ? 'Hide Critique' : 'Critique'}</span>
            </button>
          </div>

          <div className="divide-y divide-[#1A1A1A] border border-[#1A1A1A] rounded-[4px] overflow-hidden">
            {prd.requirements.map((spec, i) => (
              <div key={i} className="p-3 bg-[#050505] flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-medium text-[#FFFFFF] block">{spec.title}</span>
                  <span className="text-[11px] text-[#9CA3AF] leading-relaxed">{spec.description}</span>
                </div>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#111111] border border-[#1A1A1A] text-[#6B7280] flex-shrink-0">
                  {spec.priority}
                </span>
              </div>
            ))}
          </div>

          {activeCritiques.specs && (
            <div className="p-3.5 bg-[#111111] border-l-2 border-l-[#F59E0B] border-y border-r border-[#1A1A1A] rounded-r-[4px] space-y-1 text-xs text-[#D1D5DB]">
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#F59E0B] font-bold uppercase">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Adversarial Critic Rationale</span>
              </div>
              <p className="leading-relaxed">
                Spec 3 lacks rollback criteria. If secondary switch ICICI also spikes above 2,500ms, the system must shed non-critical telemetry rather than entering an infinite reroute loop.
              </p>
            </div>
          )}
        </div>

        {/* Section 4: Gherkin BDD Test Cases in #0D1117 Code Block */}
        <div className="border-l-2 border-[#1A1A1A] pl-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="argus-module-title text-[15px]">4. Executable BDD Acceptance Criteria (Gherkin)</h3>
            <button
              onClick={() => toggleCritique('bdd')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer border ${
                activeCritiques.bdd
                  ? 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30'
                  : 'bg-[#111111] text-[#6B7280] hover:text-[#FFFFFF] border-[#1A1A1A]'
              }`}
            >
              <MessageSquare className="w-3 h-3" />
              <span>{activeCritiques.bdd ? 'Hide Critique' : 'Critique'}</span>
            </button>
          </div>

          {/* JetBrains Mono on #0D1117 background per specification */}
          <pre className="p-4 bg-[#0D1117] border border-[#1A1A1A] rounded-[4px] font-mono text-xs text-[#E6EDF3] leading-relaxed overflow-x-auto whitespace-pre">
            {gherkinCode}
          </pre>

          {activeCritiques.bdd && (
            <div className="p-3.5 bg-[#111111] border-l-2 border-l-[#F59E0B] border-y border-r border-[#1A1A1A] rounded-r-[4px] space-y-1 text-xs text-[#D1D5DB]">
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#F59E0B] font-bold uppercase">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Adversarial Critic Rationale</span>
              </div>
              <p className="leading-relaxed">
                Add negative scenario: "Given user device is in airplane mode or has 0 balance, ensure fast failure response without engaging secondary switch failover".
              </p>
            </div>
          )}
        </div>

        {/* Section 5: Rollout Phases & Metric Guardrails */}
        <div className="border-l-2 border-[#1A1A1A] pl-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="argus-module-title text-[15px]">5. Rollout Phases & Guardrails</h3>
            <button
              onClick={() => toggleCritique('rollout')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer border ${
                activeCritiques.rollout
                  ? 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30'
                  : 'bg-[#111111] text-[#6B7280] hover:text-[#FFFFFF] border-[#1A1A1A]'
              }`}
            >
              <MessageSquare className="w-3 h-3" />
              <span>{activeCritiques.rollout ? 'Hide Critique' : 'Critique'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-[#050505] border border-[#1A1A1A] rounded">
              <span className="font-mono text-[10px] text-[#6B7280] block">PHASE 1: CANARY</span>
              <span className="font-bold text-[#FFFFFF] block mt-0.5">5% Traffic</span>
              <span className="text-[11px] text-[#9CA3AF] mt-1 block">Tier-1 merchants (Swiggy, Blinkit)</span>
            </div>

            <div className="p-3 bg-[#050505] border border-[#1A1A1A] rounded">
              <span className="font-mono text-[10px] text-[#6B7280] block">PHASE 2: RAMP</span>
              <span className="font-bold text-[#FFFFFF] block mt-0.5">50% Traffic</span>
              <span className="text-[11px] text-[#9CA3AF] mt-1 block">If P99 latency remains &lt; 2,400ms</span>
            </div>

            <div className="p-3 bg-[#050505] border border-[#1A1A1A] rounded">
              <span className="font-mono text-[10px] text-[#6B7280] block">PHASE 3: GENERAL</span>
              <span className="font-bold text-[#00FF88] block mt-0.5">100% Rollout</span>
              <span className="text-[11px] text-[#9CA3AF] mt-1 block">Auto-ship threshold achieved</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
