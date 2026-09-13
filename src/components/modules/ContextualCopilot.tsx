import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  ArrowRight,
  Database,
  CheckCircle2,
  Code,
  ShieldCheck
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
  const [copilotMode, setCopilotMode] = useState<'decision' | 'telemetry'>('decision');
  const [question, setQuestion] = useState('Why did payment success drop last week?');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [rowsScanned, setRowsScanned] = useState('4,281,940');
  const [executionMs, setExecutionMs] = useState(28);

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
      setRowsScanned((Math.floor(Math.random() * 800000) + 4000000).toLocaleString());
      setExecutionMs(Math.floor(Math.random() * 20) + 18);

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
    }, 550);
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8 max-w-7xl mx-auto py-5 sm:py-8 px-4 sm:px-6 select-none pb-24 md:pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-5 border-b border-[#1D1D1D] gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono-tech uppercase tracking-[0.2em] text-[#0066FF] font-bold">
              AI COPILOT & TELEMETRY STUDIO
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono-tech px-2 py-0.2 rounded-[2px] bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/25">
              BAYESIAN INFERENCE · 4.2M EVENTS
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#F5F5F0] tracking-tight font-display">
            WHAT ARE YOU TRYING TO DECIDE?
          </h1>
          <p className="text-xs text-[#8A8A8A] font-mono-tech mt-1">
            Contextual fintech product advisor. Ask high-level product questions or run deep ClickHouse SQL queries.
          </p>
        </div>

        {/* Dual Mode Switcher */}
        <div className="flex items-center gap-1 p-1 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[3px]">
          <button
            onClick={() => setCopilotMode('decision')}
            className={`px-3 py-1.5 rounded-[2px] text-xs font-mono-tech transition-colors cursor-pointer min-h-[38px] flex items-center gap-1.5 ${
              copilotMode === 'decision'
                ? 'bg-[#0066FF] text-white font-bold'
                : 'text-[#8A8A8A] hover:text-[#F5F5F0]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Decision Advisor</span>
          </button>
          <button
            onClick={() => setCopilotMode('telemetry')}
            className={`px-3 py-1.5 rounded-[2px] text-xs font-mono-tech transition-colors cursor-pointer min-h-[38px] flex items-center gap-1.5 ${
              copilotMode === 'telemetry'
                ? 'bg-[#0066FF] text-white font-bold'
                : 'text-[#8A8A8A] hover:text-[#F5F5F0]'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>ClickHouse SQL</span>
          </button>
        </div>
      </div>

      {/* Input Search Box */}
      <div className="p-2 sm:p-2.5 bg-[#0A0A0A] border border-[#1D1D1D] focus-within:border-[#0066FF] rounded-[4px] flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <div className="flex items-center flex-1 min-w-0">
          <Search className="w-4 h-4 text-[#525252] ml-2 flex-shrink-0" />
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleAsk(question); }}
            placeholder="Ask anything: 'Why did payment success drop?', 'What if effort doubles?'..."
            className="flex-1 bg-transparent px-2.5 py-1.5 text-xs sm:text-sm text-[#F5F5F0] placeholder:text-[#525252] outline-none font-mono-tech"
          />
        </div>
        <button
          onClick={() => handleAsk(question)}
          disabled={isAnalyzing}
          className="btn-magnetic px-5 py-2.5 rounded-[3px] bg-[#0066FF] hover:bg-[#1A75FF] text-white text-xs font-semibold cursor-pointer disabled:opacity-50 min-h-[42px] flex items-center justify-center gap-1.5 flex-shrink-0"
        >
          {isAnalyzing ? (
            <span>Analyzing 4.2M events...</span>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask Copilot</span>
            </>
          )}
        </button>
      </div>

      {/* Suggested Quick Prompts (Swipeable horizontally on mobile) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {currentPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleAsk(prompt)}
            className={`text-xs font-mono-tech px-3 py-2 rounded-[3px] cursor-pointer transition-colors whitespace-nowrap flex-shrink-0 min-h-[38px] ${
              question === prompt
                ? 'bg-[#0066FF]/20 text-[#0066FF] border border-[#0066FF]/40 font-bold'
                : 'bg-[#0A0A0A] hover:bg-[#141414] text-[#8A8A8A] hover:text-[#F5F5F0] border border-[#1D1D1D]'
            }`}
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Active Analysis Results Display */}
      {activeAnalysis && (
        <div className="p-4 sm:p-6 lg:p-8 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px] space-y-6">
          {/* Top Recommendation Box */}
          <div className="p-4 bg-[#0D0E14] border border-[#0066FF]/35 rounded-[3px] flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-[#0066FF] flex-shrink-0 mt-0.5" />
            <div className="space-y-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono-tech font-bold uppercase tracking-wider text-[#0066FF]">
                  AI RECOMMENDATION
                </span>
                <span className="text-[10px] font-mono-tech px-1.5 py-0.2 rounded-[2px] bg-[#10B981]/15 text-[#10B981]">
                  {activeAnalysis.confidence}% CONFIDENCE
                </span>
              </div>
              <p className="text-sm font-bold text-[#F5F5F0] font-display leading-snug">
                {activeAnalysis.recommendation}
              </p>
            </div>
          </div>

          {/* Mode 2: ClickHouse Telemetry SQL Drawer */}
          {copilotMode === 'telemetry' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono-tech text-[#8A8A8A]">
                  <Code className="w-3.5 h-3.5 text-[#0066FF]" />
                  <span>ClickHouse SQL Query:</span>
                </div>
                <span className="text-[10px] font-mono-tech text-[#525252]">
                  Latency: {executionMs}ms · {rowsScanned} rows scanned
                </span>
              </div>

              <div className="p-3.5 rounded-[3px] bg-[#050505] border border-[#161616] font-mono-tech text-xs overflow-x-auto leading-relaxed text-[#0066FF]">
                <pre>
{`SELECT 
    toStartOfHour(timestamp) as hour,
    bank_node,
    countIf(status = 'FAILED') / count(*) * 100 as failure_pct
FROM upi_transactions
WHERE timestamp >= now() - INTERVAL 7 DAY AND amount >= 10000
GROUP BY hour, bank_node
ORDER BY failure_pct DESC LIMIT 10;`}
                </pre>
              </div>

              {/* Contributors Bar Graph */}
              <div className="p-4 bg-[#050505] border border-[#161616] rounded-[3px] space-y-3">
                <span className="text-[10px] font-mono-tech uppercase text-[#8A8A8A] block">
                  ClickHouse Failure Contributor Breakdown
                </span>
                <div className="space-y-2 font-mono-tech text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-[#F5F5F0]">Bank X Core Switch (U30 Timeout)</span>
                      <span className="text-[#EF4444] font-bold">52% share</span>
                    </div>
                    <div className="w-full bg-[#161616] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#EF4444] h-full" style={{ width: '52%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-[#F5F5F0]">Android 15 Background Intent Kills</span>
                      <span className="text-[#F59E0B] font-bold">24% share</span>
                    </div>
                    <div className="w-full bg-[#161616] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#F59E0B] h-full" style={{ width: '24%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-[#F5F5F0]">Peak Evening Concurrency (8–10:30 PM)</span>
                      <span className="text-[#0066FF] font-bold">15% share</span>
                    </div>
                    <div className="w-full bg-[#161616] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#0066FF] h-full" style={{ width: '15%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Evidence Checklist */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono-tech uppercase text-[#8A8A8A] font-bold block">
              CORRELATED TELEMETRY EVIDENCE
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono-tech">
              {activeAnalysis.evidence.map((ev: string, idx: number) => (
                <div key={idx} className="p-3 bg-[#050505] border border-[#161616] rounded-[3px] flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0066FF] flex-shrink-0 mt-0.5" />
                  <span className="text-[#8A8A8A]">{ev}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Alternative Hypothesis & Confounder Check */}
          <div className="p-4 bg-[#050505] border border-[#161616] rounded-[3px] space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] font-mono-tech text-[#10B981] font-bold uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Confounder Safeguard</span>
            </div>
            <p className="text-xs font-mono-tech text-[#8A8A8A] leading-relaxed">
              {activeAnalysis.alternativeHypothesis}
            </p>
          </div>

          {/* Suggested Next Action */}
          <div className="pt-4 border-t border-[#1D1D1D] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="text-xs font-mono-tech text-[#8A8A8A]">
              <span>RECOMMENDED ACTION: </span>
              <strong className="text-[#F5F5F0]">{activeAnalysis.suggestedAction}</strong>
            </div>

            <button
              onClick={() => {
                if (activeAnalysis.targetTab) {
                  onNavigateTab(activeAnalysis.targetTab);
                } else {
                  onCreateOpportunity();
                }
              }}
              className="btn-magnetic flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-[3px] bg-[#0066FF] hover:bg-[#1A75FF] text-white text-xs font-semibold cursor-pointer shadow-md shadow-[#0066FF]/20 min-h-[44px]"
            >
              <span>Take Action in OS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
