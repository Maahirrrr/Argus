import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  FileText,
  Zap
} from 'lucide-react';
import type { NavigationTab } from '../../types/argus';
import { DEMO_SIGNALS } from '../../data/demoData';

interface SignalsModuleProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onInvestigateSignal?: (signalId: string) => void;
}

export const SignalsModule: React.FC<SignalsModuleProps> = ({
  onNavigateTab,
}) => {
  const [isRootCauseExpanded, setIsRootCauseExpanded] = useState(true);
  const [selectedDimension, setSelectedDimension] = useState<string | null>('bank_switch');
  const [filterSeverity, setFilterSeverity] = useState<'ALL' | 'HIGH' | 'MEDIUM' | 'LOW'>('ALL');
  const [searchQuery] = useState('');

  // Root cause breakdown contributors
  const contributors = [
    {
      id: 'bank_switch',
      label: 'HDFC Bank Switch Gateway Timeouts',
      share: 54,
      color: 'bg-[#FF3B30]',
      metric: 'P99 Latency 6,200ms',
      detail: 'Switch thread exhaustion during batch reconciliation mandate window.',
    },
    {
      id: 'os_regression',
      label: 'Android 15 Intent Callback Regression',
      share: 21,
      color: 'bg-[#F59E0B]',
      metric: '18.4k transactors affected',
      detail: 'Battery saving manager suspending background intent before webhook verification.',
    },
    {
      id: 'ticket_size',
      label: 'Ticket Size Correlation (₹10,000+)',
      share: 15,
      color: 'bg-[#0066FF]',
      metric: '8.4x higher failure probability',
      detail: 'Secondary authentication step failing on high-value fraud rule checks.',
    },
    {
      id: 'peak_traffic',
      label: 'Peak Traffic Queue Saturation',
      share: 10,
      color: 'bg-[#6B7280]',
      metric: '4,200 req/sec surge',
      detail: 'Ingestion buffer latency increased by 140ms across regional edge clusters.',
    },
  ];

  const filteredSignals = DEMO_SIGNALS.filter((s) => {
    const matchesSeverity = filterSeverity === 'ALL' || s.severity === filterSeverity;
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.metric.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.likelyCause.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  return (
    <div className="space-y-8 select-none">
      {/* Header */}
      <div className="border-b border-[#1A1A1A] pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="argus-section-label">ClickHouse Telemetry Stream</span>
          <span className="text-[#1A1A1A]">/</span>
          <span className="argus-section-label text-[#0066FF]">Anomaly Sentry</span>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="argus-module-title">Telemetry Anomaly Sentry</h1>
          <div className="flex items-center gap-2 text-xs font-mono text-[#9CA3AF]">
            <span className="argus-status-dot bg-[#00FF88] argus-status-dot-pulse" />
            <span>ClickHouse Ingestion: 4.2M events/day</span>
          </div>
        </div>
      </div>

      {/* 1. Primary View: 24h UPI SR Sparkline with Anomaly Window */}
      <section className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-[6px] p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="argus-section-label">UPI Success Rate (Last 24 Hours)</span>
              <span className="px-1.5 py-0.5 rounded bg-[#FF3B30]/15 text-[#FF3B30] border border-[#FF3B30]/30 text-[10px] font-mono font-medium">
                Anomaly Detected
              </span>
            </div>
            <div className="flex items-baseline gap-3 mt-1">
              <span className="argus-data-lg text-[#FFFFFF]">94.2%</span>
              <span className="argus-data-sm text-[#FF3B30] font-medium">-16.2pp during anomaly peak</span>
            </div>
          </div>

          <button
            onClick={() => setIsRootCauseExpanded(!isRootCauseExpanded)}
            className="argus-btn-secondary text-xs self-start sm:self-center"
          >
            {isRootCauseExpanded ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                <span>Collapse Root Cause</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                <span>Decompose Root Cause</span>
              </>
            )}
          </button>
        </div>

        {/* Interactive SVG Sparkline Chart */}
        <div className="relative w-full h-44 bg-[#050505] border border-[#1A1A1A] rounded-[4px] p-3 overflow-hidden">
          {/* Background Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between p-3 pointer-events-none opacity-20">
            <div className="border-b border-[#1A1A1A] w-full" />
            <div className="border-b border-[#1A1A1A] w-full" />
            <div className="border-b border-[#1A1A1A] w-full" />
          </div>

          {/* Anomaly Window Highlight Band */}
          <div
            onClick={() => setIsRootCauseExpanded(true)}
            className="absolute top-0 bottom-0 left-[68%] w-[20%] bg-[#FF3B30]/10 border-x border-[#FF3B30]/30 cursor-pointer hover:bg-[#FF3B30]/15 transition-colors flex flex-col justify-between p-2 z-10"
            title="Anomaly Window: 20:00 - 22:00. Click to expand root cause decomposition."
          >
            <span className="text-[10px] font-mono text-[#FF3B30] font-semibold">
              DROP 77.2%
            </span>
            <span className="text-[9px] font-mono text-[#FF3B30]/80">
              20:00–22:00
            </span>
          </div>

          {/* Sparkline SVG */}
          <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 120" preserveAspectRatio="none">
            {/* Reference baseline line at 95% */}
            <line x1="0" y1="20" x2="1000" y2="20" stroke="#1A1A1A" strokeDasharray="4 4" strokeWidth="1" />

            {/* Sparkline path */}
            <path
              d="M 0,20 L 70,18 L 150,19 L 230,22 L 310,25 L 390,29 L 470,30 L 550,26 L 630,28 L 710,95 L 790,105 L 870,80 L 950,26 L 1000,24"
              fill="none"
              stroke="#0066FF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Anomaly red highlight path segment */}
            <path
              d="M 680,30 L 710,95 L 790,105 L 870,80"
              fill="none"
              stroke="#FF3B30"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Bottom X-axis labels */}
          <div className="absolute bottom-1 inset-x-3 flex justify-between text-[9px] font-mono text-[#6B7280]">
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span className="text-[#FF3B30] font-bold">20:00 (Anomaly)</span>
            <span>23:00</span>
          </div>
        </div>

        {/* 2. Expandable Root Cause Decomposition Panel */}
        {isRootCauseExpanded && (
          <div className="pt-3 border-t border-[#1A1A1A] space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <h3 className="argus-section-label text-[#FFFFFF]">
                Root Cause Attribution (4 Dimensions)
              </h3>
              <span className="text-[11px] font-mono text-[#6B7280]">Click dimension to isolate</span>
            </div>

            {/* Horizontal Stacked Bar */}
            <div className="w-full h-3 rounded-[3px] overflow-hidden flex bg-[#111111]">
              {contributors.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedDimension(c.id)}
                  style={{ width: `${c.share}%` }}
                  className={`h-full ${c.color} cursor-pointer hover:opacity-90 transition-opacity ${
                    selectedDimension === c.id ? 'ring-1 ring-white' : ''
                  }`}
                  title={`${c.label}: ${c.share}%`}
                />
              ))}
            </div>

            {/* Dimension Breakdown Rows */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {contributors.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedDimension(c.id)}
                  className={`p-3 rounded-[4px] border cursor-pointer transition-colors ${
                    selectedDimension === c.id
                      ? 'bg-[#111111] border-[#0066FF]'
                      : 'bg-[#050505] border-[#1A1A1A] hover:border-[rgba(255,255,255,0.16)]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${c.color}`} />
                      <span className="text-xs font-medium text-[#FFFFFF]">{c.label}</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#FFFFFF]">{c.share}%</span>
                  </div>
                  <p className="text-[11px] font-mono text-[#9CA3AF] pl-4">{c.metric}</p>
                  <p className="text-xs text-[#6B7280] pl-4 mt-1 leading-normal">{c.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 3. AI Recommendation: Single Bordered Action Card (Not a text paragraph) */}
      <section className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-[6px] p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#0066FF]" />
            <span className="argus-section-label text-[#FFFFFF]">Telemetry Action Recommendation</span>
          </div>
          <span className="font-mono text-xs text-[#00FF88]">94% Confidence</span>
        </div>

        <div className="space-y-2">
          <div className="text-[14px] font-medium text-[#FFFFFF] leading-snug">
            Deploy Autonomous Circuit-Breaker: Reroute 85% of ₹10,000+ UPI volume from HDFC Switch to ICICI Direct Acquiring with 1,200ms timeout cap.
          </div>
          <p className="argus-prose text-xs text-[#9CA3AF]">
            Expected impact: <strong className="text-[#00FF88] font-mono">+3.8pp UPI SR recovery</strong>, saving approximately <strong className="text-[#00FF88] font-mono">₹14,200/sec</strong> in GMV at risk during peak reconciliation windows.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#1A1A1A]">
          <div className="flex items-center gap-4 text-xs font-mono text-[#6B7280]">
            <span>Model: Bayesian Causal Inference</span>
            <span>Target: Checkout Engine v2.8</span>
          </div>
          <button
            onClick={() => onNavigateTab('prds')}
            className="argus-btn-primary py-2 px-4 text-xs font-medium cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Draft PRD from this</span>
          </button>
        </div>
      </section>

      {/* 4. Filterable Telemetry Ingestion Signals Feed */}
      <section className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-[6px] p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1A1A1A]">
          <h2 className="argus-module-title text-[15px]">Ingested Telemetry Signals</h2>

          {/* Severity tabs */}
          <div className="flex items-center gap-1 p-1 bg-[#050505] border border-[#1A1A1A] rounded">
            {(['ALL', 'HIGH', 'MEDIUM', 'LOW'] as const).map((sev) => (
              <button
                key={sev}
                onClick={() => setFilterSeverity(sev)}
                className={`px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                  filterSeverity === sev
                    ? 'bg-[#111111] text-[#FFFFFF] font-bold border border-[#1A1A1A]'
                    : 'text-[#6B7280] hover:text-[#FFFFFF]'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        {/* Signals list */}
        <div className="divide-y divide-[#1A1A1A]">
          {filteredSignals.map((sig) => (
            <div
              key={sig.id}
              className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      sig.severity === 'HIGH'
                        ? 'bg-[#FF3B30]'
                        : sig.severity === 'MEDIUM'
                        ? 'bg-[#F59E0B]'
                        : 'bg-[#6B7280]'
                    }`}
                  />
                  <span className="text-[14px] font-medium text-[#FFFFFF] group-hover:text-[#0066FF] transition-colors">
                    {sig.title}
                  </span>
                  <span className="text-[11px] font-mono text-[#6B7280]">{sig.timestamp}</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-[#9CA3AF] pl-4">
                  <span>{sig.metric}</span>
                  <span className="text-[#1A1A1A]">|</span>
                  <span className="text-[#FF3B30]">{sig.delta}</span>
                  <span className="text-[#1A1A1A]">|</span>
                  <span>{sig.usersAffected}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pl-4 sm:pl-0">
                <button
                  onClick={() => onNavigateTab('chaos')}
                  className="argus-btn-secondary py-1 px-2.5 text-xs cursor-pointer"
                >
                  Simulate Failover
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
