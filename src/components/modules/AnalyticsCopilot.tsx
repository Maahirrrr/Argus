import React, { useState } from 'react';
import {
  Terminal,
  Play,
  Copy,
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

  // Horizontal Funnel Data
  const funnelSteps = [
    { name: '1. Cart Checkout Initiated', count: '100,000', pct: '100%' },
    { name: '2. Bank Switch Handshake', count: '94,200', pct: '94.2%', drop: '-5.8% switch drop' },
    { name: '3. MPIN Authorization Prompt', count: '88,600', pct: '88.6%', drop: '-5.6% auth drop' },
    { name: '4. Settlement Verification', count: '86,200', pct: '86.2%', drop: '-2.4% timeout drop' },
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
      <section className="bg-[#0D1117] border border-[#1A1A1A] rounded-[6px] overflow-hidden space-y-0">
        {/* Preset Query Chips Row */}
        <div className="p-3 border-b border-[#1A1A1A] flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-[11px] font-mono text-[#6B7280]">Presets:</span>
            {presets.map((p) => (
              <button
                key={p.id}
                onClick={() => handleSelectPreset(p)}
                className={`px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer whitespace-nowrap ${
                  activePreset === p.id
                    ? 'bg-[#0066FF] text-[#FFFFFF] font-medium'
                    : 'bg-[#111111] text-[#9CA3AF] hover:text-[#FFFFFF] border border-[#1A1A1A]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleCopySql}
            className="text-xs font-mono text-[#9CA3AF] hover:text-[#FFFFFF] flex items-center gap-1.5 px-2 py-1 rounded bg-[#111111] border border-[#1A1A1A] cursor-pointer flex-shrink-0"
          >
            {copied ? <Check className="w-3 h-3 text-[#00FF88]" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy SQL'}</span>
          </button>
        </div>

        {/* Input: Textarea for Prompt */}
        <div className="p-4 space-y-3">
          <div>
            <label className="text-[11px] font-mono text-[#6B7280] block mb-1.5">
              Natural Language Intent / Telemetry Hypothesis
            </label>
            <textarea
              rows={2}
              value={nlQuery}
              onChange={(e) => setNlQuery(e.target.value)}
              className="w-full bg-[#050505] border border-[#1A1A1A] focus:border-[#0066FF] rounded-[4px] p-3 text-xs font-mono text-[#FFFFFF] outline-none leading-relaxed"
            />
          </div>

          {/* Generated SQL Display */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-mono text-[#6B7280] flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#0066FF]" />
                <span>Generated ClickHouse SQL</span>
              </label>
              <span className="text-[10px] font-mono text-[#6B7280]">ClickHouse ANSI · Optimized</span>
            </div>
            <pre className="p-3 bg-[#050505] border border-[#1A1A1A] rounded-[4px] font-mono text-xs text-[#00FF88] overflow-x-auto whitespace-pre leading-relaxed">
              {sqlQuery}
            </pre>
          </div>

          {/* Run Query Action Button */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] font-mono text-[#6B7280]">
              Scans ~4,281,940 events · Estimated runtime: 34ms
            </span>
            <button
              onClick={handleRunQuery}
              disabled={isRunning}
              className="argus-btn-primary py-1.5 px-4 text-xs font-mono cursor-pointer"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>{isRunning ? 'Executing...' : 'Run Query'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Compact, Dense, Sortable Results Table (Fixed height with internal scroll) */}
      <section className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-[6px] p-5 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#1A1A1A]">
          <div>
            <h2 className="argus-module-title text-[15px]">Query Result Set</h2>
            <span className="argus-section-label text-[11px]">7 rows returned in 32ms · Click headers to sort</span>
          </div>
          <span className="font-mono text-xs text-[#00FF88]">Engine: Vectorized Scan</span>
        </div>

        <div className="max-h-64 overflow-y-auto border border-[#1A1A1A] rounded-[4px]">
          <table className="w-full text-left text-xs font-mono">
            <thead className="sticky top-0 bg-[#0D1117] border-b border-[#1A1A1A] text-[#6B7280]">
              <tr>
                <th className="py-2.5 px-3 font-normal cursor-pointer hover:text-[#FFFFFF]">Acquirer Switch</th>
                <th className="py-2.5 px-3 font-normal cursor-pointer hover:text-[#FFFFFF]">Total Volume (24h)</th>
                <th className="py-2.5 px-3 font-normal cursor-pointer hover:text-[#FFFFFF]">Success Rate</th>
                <th className="py-2.5 px-3 font-normal cursor-pointer hover:text-[#FFFFFF]">P99 Latency</th>
                <th className="py-2.5 px-3 font-normal cursor-pointer hover:text-[#FFFFFF]">Failed GMV</th>
                <th className="py-2.5 px-3 font-normal">Health State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1A1A] bg-[#050505]">
              {tableData.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#111111] transition-colors">
                  <td className="py-2.5 px-3 text-[#FFFFFF] font-medium">{row.col1}</td>
                  <td className="py-2.5 px-3 text-[#9CA3AF]">{row.col2}</td>
                  <td
                    className={`py-2.5 px-3 font-bold ${
                      row.status === 'critical'
                        ? 'text-[#FF3B30]'
                        : row.status === 'degraded'
                        ? 'text-[#F59E0B]'
                        : 'text-[#00FF88]'
                    }`}
                  >
                    {row.col3}
                  </td>
                  <td className="py-2.5 px-3 text-[#9CA3AF]">{row.col4}</td>
                  <td className="py-2.5 px-3 text-[#FF3B30]">{row.col5}</td>
                  <td className="py-2.5 px-3">
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
                      <span className="text-[11px] text-[#9CA3AF] capitalize">{row.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Horizontal Funnel Visualization with Labeled Connectors */}
      <section className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-[6px] p-5 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#1A1A1A]">
          <div>
            <h2 className="argus-module-title text-[15px]">Horizontal Checkout Conversion Funnel</h2>
            <span className="argus-section-label text-[11px]">Exact drop-off percentage displayed per stage</span>
          </div>
          <span className="font-mono text-xs text-[#9CA3AF]">24h Aggregate Window</span>
        </div>

        {/* Horizontal Funnel Sequence */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2">
          {funnelSteps.map((step, idx) => (
            <div key={idx} className="relative flex flex-col justify-between p-3.5 bg-[#050505] border border-[#1A1A1A] rounded-[4px] space-y-3">
              <div>
                <span className="text-[11px] font-mono text-[#6B7280] block mb-1">{step.name}</span>
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-lg font-bold text-[#FFFFFF]">{step.count}</span>
                  <span className="font-mono text-xs text-[#00FF88]">{step.pct}</span>
                </div>
              </div>

              {/* Labeled connector tag directly below stage per spec (not in a tooltip) */}
              {step.drop ? (
                <div className="pt-2 border-t border-[#1A1A1A] flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#6B7280]">Drop-off:</span>
                  <span className="text-[#FF3B30] font-bold">{step.drop}</span>
                </div>
              ) : (
                <div className="pt-2 border-t border-[#1A1A1A] flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#6B7280]">Stage:</span>
                  <span className="text-[#00FF88]">Funnel Ingress</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
