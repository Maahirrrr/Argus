import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  Terminal,
  Send
} from 'lucide-react';
import type { AnalyticsQueryPreset, ModuleType } from '../types/finpilot';
import { ANALYTICS_QUERY_PRESETS } from '../data/fintechScenarios';

interface AnalyticsCopilotProps {
  onNavigateToModule: (m: ModuleType) => void;
}

export const AnalyticsCopilot: React.FC<AnalyticsCopilotProps> = () => {
  const [selectedPreset, setSelectedPreset] = useState<AnalyticsQueryPreset>(ANALYTICS_QUERY_PRESETS[0]);
  const [customQuery, setCustomQuery] = useState('');
  const [showSql, setShowSql] = useState(false);

  const handleRunCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuery.trim()) return;
    const match = ANALYTICS_QUERY_PRESETS.find(p => p.query.toLowerCase().includes(customQuery.toLowerCase())) || {
      id: 'custom-query',
      query: customQuery,
      category: 'failures' as const,
      answer: `Synthesized analysis for: "${customQuery}". Correlated across ClickHouse UPI payment logs, NPCI status webhooks, and gateway telemetries.`,
      chartType: 'bar' as const,
      dataPoints: [
        { label: 'Bank HDFC Node', value: 78.4 },
        { label: 'Bank SBI Switch', value: 68.2 },
        { label: 'Bank ICICI Intent', value: 92.8 },
        { label: 'Bank Axis Router', value: 94.1 },
      ]
    };
    setSelectedPreset(match);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0b0c12] border border-white/[0.08] relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-indigo-500/5 blur-[90px] pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08] relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="section-label">Product Telemetry & Data Warehouse Copilot</span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Natural Language to ClickHouse/Snowflake
              </span>
            </div>
            <h2 className="font-syne text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Fintech Product Analytics Assistant
            </h2>
            <p className="text-xs text-zinc-400 mt-1 max-w-2xl leading-relaxed">
              Ask any fintech product metric question in plain English. FinPilot converts questions into SQL, scans the event warehouse, and charts insights instantly.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setShowSql(!showSql)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono text-zinc-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 cursor-pointer transition-all"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>{showSql ? 'Hide SQL Query' : 'Inspect SQL'}</span>
            </button>
          </div>
        </div>

        {/* Natural Language Prompt Box */}
        <form onSubmit={handleRunCustom} className="my-6 relative z-10">
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/[0.03] border border-white/10 focus-within:border-cyan-500/50 transition-all">
            <Search className="w-4 h-4 text-zinc-500 ml-3" />
            <input
              type="text"
              value={customQuery}
              onChange={(e) => setCustomQuery(e.target.value)}
              placeholder="Ask anything: 'Show Bank X failure rates vs Android versions' or 'Break down drop-offs by ticket size'..."
              className="flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder:text-zinc-600 outline-none font-medium"
            />
            <button
              type="submit"
              className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer transition-all"
            >
              <span>Investigate</span>
              <Send className="w-3 h-3" />
            </button>
          </div>
        </form>

        {/* Suggested PM Questions */}
        <div className="mb-6 relative z-10">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 block mb-2">
            Suggested PM Questions:
          </span>
          <div className="flex flex-wrap gap-2">
            {ANALYTICS_QUERY_PRESETS.map((p) => {
              const isSelected = selectedPreset.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPreset(p)}
                  className={`text-xs px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/40 font-semibold'
                      : 'bg-white/[0.03] hover:bg-white/[0.06] text-zinc-400 border border-white/[0.06]'
                  }`}
                >
                  {p.query}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Analysis View */}
        <div className="p-6 rounded-2xl bg-[#08090d] border border-white/[0.08] relative z-10 flex flex-col gap-6">
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300 block mb-1">
                AI Telemetry Synthesis
              </span>
              <p className="text-xs text-zinc-200 leading-relaxed font-mono">
                {selectedPreset.answer}
              </p>
            </div>
          </div>

          {showSql && (
            <div className="p-4 rounded-xl bg-black border border-white/10 font-mono text-xs">
              <div className="flex items-center justify-between mb-2 text-zinc-500 text-[10px]">
                <span>GENERATED WAREHOUSE QUERY (ClickHouse Dialect)</span>
                <span>Scanned 4.2M rows in 28ms</span>
              </div>
              <pre className="text-cyan-300 overflow-x-auto p-2 bg-zinc-950 rounded border border-white/5">
{`SELECT 
    toStartOfInterval(event_time, INTERVAL 1 HOUR) AS hour,
    bank_name,
    countIf(status = 'FAILURE') / count(*) * 100 AS failure_rate_pct
FROM upi_transactions
WHERE event_time >= now() - INTERVAL 7 DAY
GROUP BY hour, bank_name
ORDER BY hour DESC
LIMIT 50;`}
              </pre>
            </div>
          )}

          {/* Visual Data Representation */}
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 block mb-3">
              Event Distribution / Funnel Breakdown
            </span>
            <div className="flex flex-col gap-3">
              {selectedPreset.dataPoints.map((d, i) => {
                const maxVal = Math.max(...selectedPreset.dataPoints.map(p => p.value));
                const pct = (d.value / maxVal) * 100;
                return (
                  <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-white font-mono">{d.label}</span>
                      <span className="font-bold text-cyan-300 font-mono">
                        {d.value}%
                      </span>
                    </div>

                    <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden relative">
                      <div
                        className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-indigo-500 to-cyan-400"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
