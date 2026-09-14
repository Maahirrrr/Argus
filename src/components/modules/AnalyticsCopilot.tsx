import React, { useState } from 'react';
import {
  Play,
  Check
} from 'lucide-react';
import type { NavigationTab } from '../../types/argus';

interface AnalyticsCopilotProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onCreateOpportunity?: () => void;
}

interface TableRow {
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col5: string;
  status: 'nominal' | 'degraded' | 'critical';
}

export const AnalyticsCopilot: React.FC<AnalyticsCopilotProps> = ({
  onNavigateTab: _onNavigateTab,
  onCreateOpportunity: _onCreateOpportunity,
}) => {
  // Preset queries specification
  const presets = [
    {
      id: 'upi_sr',
      label: 'UPI SR by Bank',
      prompt: 'SELECT bank_code, count() AS total_txns, round(avg(status == 1)*100, 2) AS sr, quantile(0.99)(latency_ms) AS p99_ms, sumIf(amount, status == 0) AS failed_gmv FROM telemetry.upi_transactions WHERE timestamp >= now() - INTERVAL 24 HOUR GROUP BY bank_code ORDER BY total_txns DESC;',
      nl: 'Calculate UPI success rate, total volume, and P99 latency broken down by acquiring bank switch over the last 24 hours.',
    },
    {
      id: 'p99_latency',
      label: 'Latency P99 24h',
      prompt: 'SELECT toStartOfHour(timestamp) AS hour, bank_code, quantile(0.50)(latency_ms) AS p50, quantile(0.90)(latency_ms) AS p90, quantile(0.99)(latency_ms) AS p99 FROM telemetry.upi_transactions WHERE timestamp >= now() - INTERVAL 24 HOUR GROUP BY hour, bank_code ORDER BY hour DESC, p99 DESC;',
      nl: 'Inspect P50, P90, and P99 latency progression by hour across bank acquiring switches to identify timeout spikes.',
    },
    {
      id: 'funnel_drop',
      label: 'Funnel Drop-offs',
      prompt: 'SELECT step_name, count() AS hits, round(count() / lagInFrame(count(), 1) OVER () * 100, 1) AS step_conv_pct FROM telemetry.checkout_funnel WHERE timestamp >= now() - INTERVAL 24 HOUR GROUP BY step_name, step_order ORDER BY step_order ASC;',
      nl: 'Analyze step-by-step checkout conversion funnel and identify exact drop-off points between intent and settlement.',
    },
    {
      id: 'error_breakdown',
      label: 'Failure Code Breakdown',
      prompt: 'SELECT error_code, error_message, count() AS occurrences, count(DISTINCT user_id) AS affected_users, any(bank_code) AS top_bank FROM telemetry.upi_transactions WHERE status == 0 AND timestamp >= now() - INTERVAL 6 HOUR GROUP BY error_code, error_message ORDER BY occurrences DESC LIMIT 10;',
      nl: 'Decompose failure codes across degraded transactions in the last 6 hours to identify top root-cause drivers.',
    },
  ];

  const [activePreset, setActivePreset] = useState<string>('upi_sr');
  const [nlQuery, setNlQuery] = useState<string>(presets[0].nl);
  const [sqlQuery, setSqlQuery] = useState<string>(presets[0].prompt);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Result table dataset
  const [tableData] = useState<TableRow[]>([
    { col1: 'HDFC Bank', col2: '1,842,010', col3: '78.4%', col4: '6,240ms', col5: '₹4.2 Cr', status: 'critical' },
    { col1: 'State Bank of India', col2: '1,420,800', col3: '91.8%', col4: '2,920ms', col5: '₹1.8 Cr', status: 'degraded' },
    { col1: 'ICICI Bank', col2: '1,120,450', col3: '96.2%', col4: '1,140ms', col5: '₹42 Lakhs', status: 'nominal' },
    { col1: 'Axis Bank', col2: '890,200', col3: '95.9%', col4: '1,320ms', col5: '₹38 Lakhs', status: 'nominal' },
    { col1: 'Kotak Mahindra', col2: '540,110', col3: '96.8%', col4: '980ms', col5: '₹18 Lakhs', status: 'nominal' },
    { col1: 'Bank of Baroda', col2: '380,400', col3: '92.4%', col4: '2,450ms', col5: '₹64 Lakhs', status: 'degraded' },
    { col1: 'Punjab National Bank', col2: '290,150', col3: '93.1%', col4: '2,100ms', col5: '₹48 Lakhs', status: 'nominal' },
  ]);

  const handleSelectPreset = (p: typeof presets[0]) => {
    setActivePreset(p.id);
    setNlQuery(p.nl);
    setSqlQuery(p.prompt);
  };

  const handleRunQuery = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
    }, 280);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(sqlQuery);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Horizontal Funnel Data with progressive width capacity
  const funnelStages = [
    { name: '1. Cart Checkout Initiated', count: '100,000', pct: '100%', barWidth: '100%', drop: null },
    { name: '2. Bank Switch Handshake', count: '94,200', pct: '94.2%', barWidth: '76%', drop: '↓ 5.8% drop' },
    { name: '3. MPIN Authorization Prompt', count: '88,600', pct: '88.6%', barWidth: '58%', drop: '↓ 5.6% drop' },
    { name: '4. Settlement Verification', count: '86,200', pct: '86.2%', barWidth: '43%', drop: '↓ 2.4% drop' },
  ];

  return (
    <div className="space-y-8 select-none">
      {/* Header */}
      <div className="border-b border-[#1A1A1A] pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="argus-section-label">Measure</span>
          <span className="text-[#1A1A1A]">/</span>
          <span className="argus-section-label text-[#0066FF]">Telemetry Copilot</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="argus-module-title">ClickHouse Telemetry Studio</h1>
            <p className="argus-prose text-xs text-[#6B7280] mt-0.5">
              Terminal-adjacent SQL synthesis & tabular telemetry exploration across 4.2M transactional events.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#9CA3AF]">
            <span className="argus-status-dot bg-[#00FF88] argus-status-dot-pulse" />
            <span>ClickHouse Cluster v24.3 · 28ms execution avg</span>
          </div>
        </div>
      </div>

      {/* 1. Terminal-Adjacent Query Panel: Dark #0D1117 */}
      <section className="bg-[#0D1117] border border-[#1A1A1A] rounded-[8px] overflow-hidden space-y-0">
        {/* Preset Query Chips Row */}
        <div className="p-3 border-b border-[#1A1A1A] flex items-center gap-2 overflow-x-auto">
          <span className="text-[11px] font-sans text-[#6B7280] mr-1">Presets:</span>
          {presets.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelectPreset(p)}
              className={`px-3 py-1 rounded-[4px] text-[12px] font-sans transition-colors cursor-pointer whitespace-nowrap border ${
                activePreset === p.id
                  ? 'bg-[#0066FF]/12 border-[#0066FF] text-[#0066FF] font-medium'
                  : 'bg-[#141414] border-[#2A2A2A] text-[#8A8A8A] hover:text-[#FFFFFF]'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Input: Textarea without redundant label, with descriptive placeholder */}
        <div className="p-4 space-y-3">
          <textarea
            rows={2}
            value={nlQuery}
            onChange={(e) => setNlQuery(e.target.value)}
            placeholder="Ask anything about your payment telemetry — e.g. 'Show UPI success rate by bank for last 24h'"
            className="w-full bg-[#050505] border border-[#1A1A1A] focus:border-[#0066FF] rounded-[4px] p-3 text-xs font-mono text-[#FFFFFF] placeholder:text-[#6B7280] outline-none leading-relaxed"
          />

          {/* Generated SQL Display with Copy button inside top-right */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-sans text-[11px] font-medium text-[#6B7280]">Generated SQL</span>
              <span className="font-sans text-[10px] text-[#555555]">ClickHouse · Optimized</span>
            </div>
            <div className="relative">
              <pre className="p-3 pr-24 bg-[#050505] border border-[#1A1A1A] rounded-[4px] font-mono text-xs text-[#00FF88] overflow-x-auto whitespace-pre leading-relaxed">
                {sqlQuery}
              </pre>
              <button
                onClick={handleCopySql}
                className="absolute top-2.5 right-2.5 px-2 py-1 rounded-[4px] bg-[#141414] hover:bg-[#1E1E1E] border border-[#2A2A2A] text-[11px] font-sans text-[#8A8A8A] hover:text-[#FFFFFF] transition-colors cursor-pointer flex items-center gap-1"
              >
                {copied && <Check className="w-3 h-3 text-[#00FF88]" />}
                <span>{copied ? 'Copied' : 'Copy SQL'}</span>
              </button>
            </div>
          </div>

          {/* Run Query Action Button & Scanned Stats */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] font-sans text-[#6B7280]">
              Scanned ~4.28M events · 34ms
            </span>
            <button
              onClick={handleRunQuery}
              disabled={isRunning}
              className="argus-btn-primary py-1.5 px-4 text-xs font-sans font-medium cursor-pointer"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>{isRunning ? 'Executing...' : 'Run Query'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Compact, Dense, Sortable Results Table */}
      <section className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-[8px] p-5 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#1A1A1A]">
          <div>
            <h2 className="argus-module-title text-[15px]">Query Result Set</h2>
            <span className="argus-section-label text-[11px]">7 rows returned in 32ms · Click headers to sort</span>
          </div>
          <span className="font-mono text-xs text-[#00FF88]">Engine: Vectorized Scan</span>
        </div>

        <div className="max-h-64 overflow-y-auto border border-[#1A1A1A] rounded-[4px]">
          <table className="w-full text-left text-xs">
            <thead className="sticky top-0 bg-[#0D1117] border-b border-[#1A1A1A]">
              <tr>
                <th className="py-2.5 px-3 font-sans text-[11px] font-medium text-[#6B7280]">Bank</th>
                <th className="py-2.5 px-3 font-sans text-[11px] font-medium text-[#6B7280]">Volume 24h</th>
                <th className="py-2.5 px-3 font-sans text-[11px] font-medium text-[#6B7280]">SR %</th>
                <th className="py-2.5 px-3 font-sans text-[11px] font-medium text-[#6B7280]">P99 ms</th>
                <th className="py-2.5 px-3 font-sans text-[11px] font-medium text-[#6B7280]">Failed GMV</th>
                <th className="py-2.5 px-3 font-sans text-[11px] font-medium text-[#6B7280]">Health</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1A1A] bg-[#050505]">
              {tableData.map((row, idx) => (
                <tr key={idx} className="h-10 hover:bg-[#141414] transition-colors">
                  <td className="px-3 text-[#FFFFFF] font-sans text-[13px] font-medium">{row.col1}</td>
                  <td className="px-3 font-mono text-[13px] text-[#F0F0F0]">{row.col2}</td>
                  <td
                    className={`px-3 font-mono text-[13px] font-bold ${
                      row.status === 'critical'
                        ? 'text-[#FF3B30]'
                        : row.status === 'degraded'
                        ? 'text-[#F59E0B]'
                        : 'text-[#00FF88]'
                    }`}
                  >
                    {row.col3}
                  </td>
                  <td className="px-3 font-mono text-[13px] text-[#F0F0F0]">{row.col4}</td>
                  <td className="px-3 font-mono text-[13px] text-[#FF3B30]">{row.col5}</td>
                  <td className="px-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          row.status === 'critical'
                            ? 'bg-[#FF3B30]'
                            : row.status === 'degraded'
                            ? 'bg-[#F59E0B]'
                            : 'bg-[#00FF88]'
                        }`}
                      />
                      <span className="font-sans text-[11px] text-[#8A8A8A] capitalize">{row.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Proportional Horizontal Funnel Visualization */}
      <section className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-[8px] p-5 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#1A1A1A]">
          <div>
            <h2 className="argus-module-title text-[15px]">Horizontal Checkout Conversion Funnel</h2>
            <span className="argus-section-label text-[11px]">Proportional drop-off visualizer across 24h aggregate</span>
          </div>
          <span className="font-mono text-xs text-[#9CA3AF]">24h Aggregate Window</span>
        </div>

        {/* Proportional Bar Funnel Sequence */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2">
          {funnelStages.map((step, idx) => (
            <div key={idx} className="relative flex flex-col justify-between p-3.5 bg-[#050505] border border-[#1A1A1A] rounded-[4px] space-y-3">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-sans text-[11px] text-[#6B7280]">{step.name}</span>
                  {step.drop && (
                    <span className="font-mono text-[11px] font-semibold text-[#FF3B30]">{step.drop}</span>
                  )}
                </div>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="font-mono text-lg font-bold text-[#FFFFFF]">{step.count}</span>
                  <span className="font-mono text-xs text-[#00FF88]">{step.pct}</span>
                </div>
                {/* Visual proportional bar */}
                <div className="w-full h-1.5 bg-[#141414] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0066FF] rounded-full transition-all duration-300"
                    style={{ width: step.barWidth }}
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-[#1A1A1A] flex items-center justify-between text-[10px] font-sans text-[#6B7280]">
                <span>Stage Capacity</span>
                <span className="font-mono text-[#F0F0F0]">{step.barWidth}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

