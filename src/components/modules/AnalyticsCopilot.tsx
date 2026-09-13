import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  Terminal,
  Inbox
} from 'lucide-react';
import type { NavigationTab } from '../../types/finpilot';

interface AnalyticsCopilotProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onCreateOpportunity: () => void;
}

export const AnalyticsCopilot: React.FC<AnalyticsCopilotProps> = ({
  onNavigateTab,
  onCreateOpportunity,
}) => {
  const [query, setQuery] = useState('Why did payment success drop last week?');
  const [showSql, setShowSql] = useState(false);

  const prompts = [
    'Why did payment success drop last week?',
    'Which users are most affected?',
    'What changed after the latest release?',
    'Find our biggest product opportunity.',
    'Which feature should we prioritize?',
    'Show me the top reasons users contact support.',
  ];

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto py-6 px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.08] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-400">
              CLICKHOUSE WAREHOUSE COPILOT
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] text-zinc-400 border border-white/[0.08]">
              Natural Language → Telemetry SQL
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Product Analytics Copilot
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Ask FinPilot anything about your product, payment funnels, or user cohorts.
          </p>
        </div>

        <button
          onClick={() => setShowSql(!showSql)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-zinc-300 cursor-pointer"
        >
          <Terminal className="w-3.5 h-3.5 text-blue-400" />
          <span>{showSql ? 'Hide SQL' : 'Inspect SQL'}</span>
        </button>
      </div>

      {/* Prompt Search Box */}
      <div className="p-2 rounded-xl bg-[#090a0d] border border-white/[0.1] focus-within:border-blue-500/50 flex items-center gap-2">
        <Search className="w-4 h-4 text-zinc-500 ml-2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask anything: 'Why did payment success drop?', 'Top churn reasons'..."
          className="flex-1 bg-transparent px-2 py-1 text-sm text-white placeholder:text-zinc-600 outline-none font-medium"
        />
        <button
          onClick={() => {}}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold cursor-pointer"
        >
          Investigate
        </button>
      </div>

      {/* Suggested Prompts */}
      <div className="flex flex-wrap gap-2">
        {prompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => setQuery(p)}
            className={`text-xs px-3 py-1.5 rounded-lg cursor-pointer transition-all ${
              query === p
                ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40 font-medium'
                : 'bg-white/[0.03] hover:bg-white/[0.06] text-zinc-400 border border-white/[0.06]'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* AI Structured Answer Card */}
      <div className="p-6 rounded-2xl bg-[#090a0d] border border-white/[0.08] shadow-xl space-y-6">
        <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/30 flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-300 block">
              AI Answer & Root Cause Breakdown
            </span>
            <p className="text-xs sm:text-sm text-zinc-200 font-mono">
              Payment success fell from <strong>94.8% → 90.1%</strong> between 8–10 PM this week across high-value transactions.
            </p>
          </div>
        </div>

        {showSql && (
          <div className="p-4 rounded-xl bg-black border border-white/[0.08] font-mono text-xs">
            <span className="text-[10px] text-zinc-500 block mb-1">
              GENERATED CLICKHOUSE SQL (Execution time: 34ms · 4.2M rows scanned)
            </span>
            <pre className="text-blue-300 overflow-x-auto">
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
        )}

        {/* Breakdown bars */}
        <div>
          <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block mb-3">
            Top Failure Contributors:
          </span>
          <div className="space-y-3">
            {[
              { label: 'Bank timeout (code U30)', share: 42 },
              { label: 'Android 15 intent drop', share: 27 },
              { label: 'Cellular network errors', share: 18 },
              { label: 'Other edge gateways', share: 13 },
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white font-medium">{item.label}</span>
                  <span className="font-mono text-blue-400 font-bold">{item.share}%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${item.share}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Next Step */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-zinc-400 block">Recommended Next Step</span>
            <p className="text-xs text-white font-semibold">Investigate Bank X routing & create opportunity ticket.</p>
          </div>
          <button
            onClick={() => {
              onCreateOpportunity();
              onNavigateTab('opportunities');
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold cursor-pointer shadow-sm shadow-blue-600/30"
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>Create Opportunity →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
