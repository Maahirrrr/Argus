import React, { useState } from 'react';
import {
  Search,
  Activity,
  Terminal,
  Inbox
} from 'lucide-react';
import type { NavigationTab } from '../../types/argus';

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
  const [isQuerying, setIsQuerying] = useState(false);
  const [rowsScanned, setRowsScanned] = useState('4,281,940');
  const [executionMs, setExecutionMs] = useState(34);

  const prompts = [
    'Why did payment success drop last week?',
    'Which users are most affected?',
    'What changed after the latest release?',
    'Find our biggest product opportunity.',
    'Which feature should we prioritize?',
    'Show me the top reasons users contact support.',
  ];

  const handleRunQuery = (qText: string) => {
    setQuery(qText);
    setIsQuerying(true);
    setTimeout(() => {
      setIsQuerying(false);
      setRowsScanned((Math.floor(Math.random() * 800000) + 4000000).toLocaleString());
      setExecutionMs(Math.floor(Math.random() * 25) + 20);
    }, 450);
  };

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto py-8 px-4 sm:px-6 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-[#1D1D1D] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-mono-tech text-[#8A8A8A]">
              Measure / Telemetry Analytics
            </span>
            <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded-[3px] bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/25 font-semibold">
              SQL SYNTHESIS
            </span>
            <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded-[3px] bg-[#141414] text-[#8A8A8A] border border-[#222]">
              SIMULATION (4.2M EVENTS)
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold text-[#EDEDED] tracking-tight">
            ClickHouse Telemetry Query
          </h1>
          <p className="text-xs text-[#8A8A8A] font-mono-tech mt-1">
            Query simulated transactional events in natural language. Synthesizes ClickHouse SQL and returns structured root-cause telemetry.
          </p>
        </div>

        <button
          onClick={() => setShowSql(!showSql)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] bg-[#101010] hover:bg-[#141414] border border-[#1D1D1D] text-xs font-mono-tech text-[#8A8A8A] hover:text-[#F5F5F0] cursor-pointer transition-colors"
        >
          <Terminal className="w-3.5 h-3.5 text-[#0066FF]" />
          <span>{showSql ? 'Hide SQL' : 'Inspect SQL'}</span>
        </button>
      </div>

      {/* Prompt Search Box */}
      <div className="p-2 bg-[#0A0A0A] border border-[#1D1D1D] focus-within:border-[#0066FF] rounded-[4px] flex items-center gap-2">
        <Search className="w-4 h-4 text-[#525252] ml-2 flex-shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleRunQuery(query); }}
          placeholder="Ask anything: 'Why did payment success drop?', 'Top churn reasons'..."
          className="flex-1 bg-transparent px-2 py-1.5 text-xs sm:text-sm text-[#F5F5F0] placeholder:text-[#525252] outline-none font-mono-tech"
        />
        <button
          onClick={() => handleRunQuery(query)}
          disabled={isQuerying}
          className="btn-magnetic px-4 py-2 rounded-[3px] bg-[#0066FF] hover:bg-[#1A75FF] text-white text-xs font-semibold cursor-pointer disabled:opacity-50"
        >
          {isQuerying ? 'Scanning...' : 'Investigate'}
        </button>
      </div>

      {/* Suggested Prompts */}
      <div className="flex flex-wrap gap-2">
        {prompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleRunQuery(p)}
            className={`text-xs font-mono-tech px-3 py-1.5 rounded-[3px] cursor-pointer transition-colors ${
              query === p
                ? 'bg-[#0066FF]/20 text-[#0066FF] border border-[#0066FF]/40 font-bold'
                : 'bg-[#0A0A0A] hover:bg-[#141414] text-[#8A8A8A] hover:text-[#F5F5F0] border border-[#1D1D1D]'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* AI Answer & Root Cause Breakdown */}
      <div className="p-6 sm:p-8 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px] space-y-6">
        <div className="p-4 bg-[#0D0E14] border border-[#0066FF]/30 rounded-[3px] flex items-start gap-3">
          <Activity className="w-4 h-4 text-[#0066FF] flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="text-[10px] font-mono-tech font-bold uppercase tracking-wider text-[#0066FF] block">
              TELEMETRY SYNTHESIS
            </span>
            <p className="text-xs sm:text-sm text-[#F5F5F0] font-mono-tech">
              Payment success fell from <strong className="text-[#EF4444]">94.8% → 90.1%</strong> between 8:00–10:30 PM this week across transactions exceeding ₹10,000.
            </p>
          </div>
        </div>

        {/* Generated SQL Drawer */}
        {showSql && (
          <div className="p-4 rounded-[3px] bg-[#050505] border border-[#161616] font-mono-tech text-xs">
            <div className="flex items-center justify-between text-[10px] text-[#525252] mb-2">
              <span>GENERATED CLICKHOUSE SQL</span>
              <span>Execution: {executionMs}ms · {rowsScanned} rows scanned</span>
            </div>
            <pre className="text-[#0066FF] overflow-x-auto leading-relaxed">
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

        {/* Top Failure Contributors */}
        <div className="space-y-3">
          <span className="text-[10px] font-mono-tech uppercase text-[#8A8A8A] font-bold block">
            TOP FAILURE CONTRIBUTORS:
          </span>
          <div className="space-y-2 font-mono-tech text-xs">
            {[
              { label: 'Bank timeout (code U30)', share: 42 },
              { label: 'Android 15 intent drop', share: 27 },
              { label: 'Cellular network errors (4G handoff)', share: 18 },
              { label: 'Other edge gateways', share: 13 },
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-[3px] bg-[#050505] border border-[#161616]">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[#F5F5F0]">{item.label}</span>
                  <span className="text-[#0066FF] font-bold">{item.share}%</span>
                </div>
                <div className="h-1.5 w-full bg-[#1D1D1D] rounded-[2px] overflow-hidden">
                  <div className="h-full bg-[#0066FF] rounded-[2px]" style={{ width: `${item.share}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Row */}
        <div className="pt-4 border-t border-[#1D1D1D] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono-tech uppercase text-[#525252] block">Recommended Next Step</span>
            <p className="text-xs text-[#F5F5F0] font-mono-tech">Investigate Bank X routing & create opportunity ticket.</p>
          </div>
          <button
            onClick={() => {
              onCreateOpportunity();
              onNavigateTab('opportunities');
            }}
            className="btn-magnetic flex items-center gap-1.5 px-4 py-2 rounded-[3px] bg-[#0066FF] hover:bg-[#1A75FF] text-white text-xs font-semibold cursor-pointer shadow-md shadow-[#0066FF]/20"
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>Create Opportunity →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
