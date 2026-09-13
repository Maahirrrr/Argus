import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  ArrowRight
} from 'lucide-react';
import type { NavigationTab } from '../../types/tapwise';

interface ContextualCopilotProps {
  activeTab: NavigationTab;
  onNavigateTab: (tab: NavigationTab) => void;
  onCreateOpportunity: () => void;
}

export const ContextualCopilot: React.FC<ContextualCopilotProps> = ({
  activeTab,
  onNavigateTab,
  onCreateOpportunity,
}) => {
  const [question, setQuestion] = useState('Why did payment success drop last week?');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeAnalysis, setActiveAnalysis] = useState<any | null>({
    query: 'Why did payment success drop last week?',
    recommendation: 'Investigate Bank X gateway timeout behavior before altering checkout UI.',
    confidence: 91,
    evidence: [
      'Bank X switch responsible for 48% of technical timeouts (error code U30)',
      'High-value transactions (₹10,000+) have 2.4× higher failure probability',
      'Concentrated between 8:00 PM and 10:30 PM evening peak',
      'Android 15 battery policy terminates checkout intent background service',
    ],
    alternativeHypothesis: 'Frontend UI crash ruled out with 98% confidence: App crash rate remained nominal at 0.02%.',
    suggestedAction: 'Route to Opportunity #014 (Dynamic Multi-Bank Failover)',
    targetTab: 'opportunities' as NavigationTab,
  });

  const contextualPrompts: Record<string, string[]> = {
    overview: [
      'Why did payment success drop last week?',
      'What is driving the 7-day retention increase?',
      'Which product anomaly has the highest GMV at risk?',
    ],
    signals: [
      'Explain the Android 15 Intent timeout cluster.',
      'Why are refund complaints jumping 21% this month?',
      'Which banking switch is causing the most U30 timeouts?',
    ],
    insights: [
      'Why is Bank X failing specifically on ₹10k+ checkouts?',
      'What confounding variables could explain evening drops?',
      'Should we redesign the checkout sheet or alter routing?',
    ],
    opportunities: [
      'Why is Opportunity #014 ranked #1?',
      'What is the estimated engineering ROI for dynamic routing?',
      'Compare Aadhaar Face-RD vs Refund Timeline impact.',
    ],
    prioritize: [
      'What if engineering effort increases from 5 to 8 sprints?',
      'Why does RICE score give priority to reliability over growth?',
      'Which initiative has the highest confidence-to-effort ratio?',
    ],
    prds: [
      'Challenge the assumptions in PRD-2026-041.',
      'Find missing edge cases in checkout retry logic.',
      'Audit the primary success metrics for high-value checkouts.',
    ],
    experiments: [
      'Verify the statistical power calculation for 50k sample.',
      'What happens if gateway P99 latency exceeds 4,500ms?',
      'Is a 10/90 traffic split sufficient to detect +1.8% MDE?',
    ],
  };

  const currentPrompts = contextualPrompts[activeTab] || [
    'Why did payment success drop last week?',
    'What should we prioritize next sprint?',
    'Find our biggest product opportunity.',
    'Challenge my PRD assumptions.',
  ];

  const handleAsk = (qText: string) => {
    setQuestion(qText);
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      if (qText.toLowerCase().includes('effort') || qText.toLowerCase().includes('what if')) {
        setActiveAnalysis({
          query: qText,
          recommendation: 'Increasing effort on Dynamic Failover from 5 to 8 sprints drops RICE score from 74.6 to 46.6, demoting it to #3 below Aadhaar Face-RD.',
          confidence: 94,
          evidence: [
            'Current RICE: (82k × 9.2 × 91%) / 5 = 74.6 (Rank #1)',
            'Simulated RICE: (82k × 9.2 × 91%) / 8 = 46.6 (Rank #3)',
            'Aadhaar Face-RD RICE: 49.3 (Assumes #1 position)',
          ],
          alternativeHypothesis: 'If effort expands, consider scoping an MVP with static fallback instead of dynamic health polling.',
          suggestedAction: 'Inspect trade-offs in Prioritization Workbench',
          targetTab: 'prioritize' as NavigationTab,
        });
      } else if (qText.toLowerCase().includes('challenge') || qText.toLowerCase().includes('prd')) {
        setActiveAnalysis({
          query: qText,
          recommendation: 'PRD-2026-041 overlooks carrier cellular degradation during peak evening commute hours.',
          confidence: 86,
          evidence: [
            '31% of Android 15 timeouts coincide with degraded 4G carrier handshakes',
            'Merchant category NBFC rules disallow automatic retry without explicit user consent',
            'Duplicate rapid MPIN submissions trigger NPCI rate-limiting velocity blocks',
          ],
          alternativeHypothesis: 'Switching bank routing without a network health pre-check will not resolve 4G radio disconnects.',
          suggestedAction: 'Review PRD Workspace & Critic',
          targetTab: 'prds' as NavigationTab,
        });
      } else {
        setActiveAnalysis({
          query: qText,
          recommendation: 'Telemetry confirms +7.4% checkout failures originate from Bank X switch timeouts on ₹10k+ checkouts.',
          confidence: 91,
          evidence: [
            'Bank X switch timeout rate: 18.4% (vs 2.1% platform baseline)',
            '62% of lost volume concentrated between 8:00–10:30 PM',
            'Android 15 battery policy terminates checkout intent background service',
          ],
          alternativeHypothesis: 'Frontend UI crash ruled out with 98% confidence.',
          suggestedAction: 'Investigate Opportunity #014',
          targetTab: 'opportunities' as NavigationTab,
        });
      }
    }, 700);
  };

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto py-8 px-4 sm:px-6 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-[#1D1D1D] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono-tech uppercase tracking-[0.2em] text-[#0066FF] font-bold">
              AI COPILOT · PRODUCT INTELLIGENCE
            </span>
            <span className="text-[10px] font-mono-tech px-2 py-0.2 rounded-[2px] bg-[#0066FF]/15 text-[#0066FF] border border-[#0066FF]/30">
              CONTEXT: {activeTab.toUpperCase()}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F5F0] tracking-tight font-display">
            WHAT ARE YOU TRYING TO DECIDE?
          </h1>
          <p className="text-xs text-[#8A8A8A] font-mono-tech mt-1">
            TapWise interprets telemetry, evaluates roadmap trade-offs, and challenges product hypotheses.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateTab('analytics')}
            className="px-3.5 py-1.5 rounded-[3px] bg-[#101010] hover:bg-[#141414] border border-[#1D1D1D] text-xs font-mono-tech text-[#8A8A8A] hover:text-[#F5F5F0] cursor-pointer transition-colors"
          >
            ClickHouse Telemetry →
          </button>
        </div>
      </div>

      {/* Input Search Box */}
      <div className="p-2 bg-[#0A0A0A] border border-[#1D1D1D] focus-within:border-[#0066FF] rounded-[4px] flex items-center gap-2">
        <Search className="w-4 h-4 text-[#525252] ml-2 flex-shrink-0" />
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleAsk(question); }}
          placeholder="Ask TapWise anything: 'Why did payment success drop?', 'Challenge my PRD'..."
          className="flex-1 bg-transparent px-2 py-1.5 text-xs sm:text-sm text-[#F5F5F0] placeholder:text-[#525252] outline-none font-mono-tech"
        />
        <button
          onClick={() => handleAsk(question)}
          disabled={isAnalyzing}
          className="btn-magnetic px-4 py-2 rounded-[3px] bg-[#0066FF] hover:bg-[#1A75FF] text-white text-xs font-semibold cursor-pointer disabled:opacity-50"
        >
          {isAnalyzing ? 'Analyzing...' : 'Decide'}
        </button>
      </div>

      {/* Contextual Suggested Prompts */}
      <div className="space-y-2">
        <span className="text-[10px] font-mono-tech uppercase text-[#525252] tracking-wider block font-bold">
          CONTEXT-AWARE QUERIES FOR {activeTab.toUpperCase()}:
        </span>
        <div className="flex flex-wrap gap-2">
          {currentPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleAsk(prompt)}
              className={`text-xs font-mono-tech px-3 py-1.5 rounded-[3px] cursor-pointer transition-colors ${
                question === prompt
                  ? 'bg-[#0066FF]/20 text-[#0066FF] border border-[#0066FF]/40 font-bold'
                  : 'bg-[#0A0A0A] hover:bg-[#141414] text-[#8A8A8A] hover:text-[#F5F5F0] border border-[#1D1D1D]'
              }`}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* AI Structured Response Card */}
      {isAnalyzing ? (
        /* Loading Skeleton with Perception of Intelligence */
        <div className="p-8 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px] space-y-4 animate-pulse">
          <div className="flex items-center gap-2 text-xs font-mono-tech text-[#0066FF]">
            <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse-dot" />
            <span>Scanning 4.2M events across ClickHouse & NPCI telemetry partition...</span>
          </div>
          <div className="h-4 bg-[#141414] rounded-[2px] w-3/4" />
          <div className="h-4 bg-[#141414] rounded-[2px] w-1/2" />
        </div>
      ) : activeAnalysis && (
        <div className="p-6 sm:p-8 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px] space-y-6">
          {/* Top Recommendation Banner */}
          <div className="p-4 bg-[#0D0E14] border border-[#0066FF]/30 rounded-[3px] flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-[#0066FF] flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono-tech font-bold uppercase text-[#0066FF]">
                  AI STRATEGIC RECOMMENDATION
                </span>
                <span className="text-[10px] font-mono-tech text-[#8A8A8A]">
                  {activeAnalysis.confidence}% CONFIDENCE
                </span>
              </div>
              <p className="text-xs sm:text-sm font-mono-tech text-[#F5F5F0] leading-relaxed">
                {activeAnalysis.recommendation}
              </p>
            </div>
          </div>

          {/* Evidence Breakdown */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono-tech uppercase text-[#8A8A8A] font-bold block">
              EMPIRICAL EVIDENCE EVALUATED:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeAnalysis.evidence.map((ev: string, i: number) => (
                <div key={i} className="p-3 bg-[#050505] border border-[#161616] rounded-[3px] text-xs font-mono-tech text-[#8A8A8A] flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] mt-1.5 flex-shrink-0" />
                  <span>{ev}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Alternative Hypothesis */}
          <div className="p-3.5 bg-[#050505] border border-[#1D1D1D] rounded-[3px] text-xs font-mono-tech text-[#8A8A8A]">
            <span className="text-[#EF4444] font-bold uppercase text-[10px] block mb-1">
              ALTERNATIVE HYPOTHESIS CONSIDERED:
            </span>
            <p>{activeAnalysis.alternativeHypothesis}</p>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-[#1D1D1D] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs font-mono-tech text-[#525252]">
              Recommended Action: <strong className="text-[#F5F5F0]">{activeAnalysis.suggestedAction}</strong>
            </div>

            <button
              onClick={() => {
                if (activeAnalysis.targetTab === 'opportunities') {
                  onCreateOpportunity();
                }
                onNavigateTab(activeAnalysis.targetTab);
              }}
              className="btn-magnetic flex items-center gap-1.5 px-4 py-2 rounded-[3px] bg-[#0066FF] hover:bg-[#1A75FF] text-white text-xs font-semibold cursor-pointer"
            >
              <span>Execute Action</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
