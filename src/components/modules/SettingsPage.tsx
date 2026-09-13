import React, { useState } from 'react';
import {
  Shield,
  Bell,
  Sliders,
  Check,
  Database,
  Radio,
  Plus,
  X
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [failureThreshold, setFailureThreshold] = useState(3.0);
  const [confidenceFloor, setConfidenceFloor] = useState(75);
  const [slackAlerts, setSlackAlerts] = useState(true);
  const [pagerDutyAlerts, setPagerDutyAlerts] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const [newSourceName, setNewSourceName] = useState('');
  const [newSourceType, setNewSourceType] = useState('ClickHouse Database');

  const sources = [
    { id: 'src-1', name: 'ClickHouse Transaction Cluster', type: 'Database', status: 'Connected', ping: '12ms', events: '4.2M/day' },
    { id: 'src-2', name: 'NPCI Core UPI Gateway', type: 'Gateway Switch', status: 'Connected', ping: '24ms', events: '1.8M/day' },
    { id: 'src-3', name: 'Zendesk Support Queues', type: 'Tickets & Feedback', status: 'Connected', ping: '82ms', events: '12.4k/day' },
    { id: 'src-4', name: 'Segment CDP Ingestion', type: 'Product Analytics', status: 'Connected', ping: '31ms', events: '8.9M/day' },
    { id: 'src-5', name: 'App Store / Play Store Reviews', type: 'Store Sentiment', status: 'Connected', ping: '140ms', events: '520/day' },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8 max-w-7xl mx-auto py-5 sm:py-8 px-4 sm:px-6 select-none pb-24 md:pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-5 border-b border-[#1D1D1D] gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono-tech uppercase tracking-[0.2em] text-[#0066FF] font-bold">
              WORKSPACE CONFIGURATION
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#F5F5F0] tracking-tight font-display">
            SETTINGS & SOURCES
          </h1>
          <p className="text-xs text-[#8A8A8A] font-mono-tech mt-1">
            Configure anomaly sentry sensitivity, Bayesian confidence floors, alert webhooks, and connected telemetry pipelines.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="btn-magnetic w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-[3px] bg-[#0066FF] hover:bg-[#1A75FF] text-white text-xs font-semibold cursor-pointer shadow-md shadow-[#0066FF]/20 min-h-[44px]"
        >
          {saved ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : null}
          <span>{saved ? 'Preferences Saved' : 'Save Preferences'}</span>
        </button>
      </div>

      <div className="space-y-6 max-w-4xl">
        {/* Anomaly Sentry Sensitivity */}
        <div className="p-4 sm:p-6 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px] space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#1D1D1D]">
            <Sliders className="w-3.5 h-3.5 text-[#0066FF]" />
            <h2 className="text-xs font-bold text-[#F5F5F0] font-mono-tech uppercase tracking-wider">
              AI Anomaly Sentry Sensitivity
            </h2>
          </div>

          <div className="space-y-4 text-xs font-mono-tech">
            {/* Failure Threshold Slider */}
            <div className="space-y-2 py-1">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[#F5F5F0] font-semibold block">Payment Failure Spike Threshold</span>
                  <span className="text-[11px] text-[#525252]">Trigger critical signal when failure rate surges above threshold</span>
                </div>
                <span className="text-[#0066FF] font-bold text-sm">+{failureThreshold.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="5.0"
                step="0.5"
                value={failureThreshold}
                onChange={(e) => setFailureThreshold(Number(e.target.value))}
                className="w-full cursor-pointer min-h-[32px]"
              />
            </div>

            {/* Confidence Floor Slider */}
            <div className="space-y-2 pt-3 border-t border-[#141414] py-1">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[#F5F5F0] font-semibold block">Confidence Floor for PRD Generation</span>
                  <span className="text-[11px] text-[#525252]">Do not synthesize opportunities below Bayesian confidence threshold</span>
                </div>
                <span className="text-[#0066FF] font-bold text-sm">{confidenceFloor}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="95"
                step="5"
                value={confidenceFloor}
                onChange={(e) => setConfidenceFloor(Number(e.target.value))}
                className="w-full cursor-pointer min-h-[32px]"
              />
            </div>
          </div>
        </div>

        {/* Connected Telemetry Sources */}
        <div className="p-4 sm:p-6 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px] space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#1D1D1D]">
            <div className="flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-[#0066FF]" />
              <h2 className="text-xs font-bold text-[#F5F5F0] font-mono-tech uppercase tracking-wider">
                Connected Telemetry Pipelines
              </h2>
            </div>
            <button
              onClick={() => setIsConnectOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] bg-[#141414] hover:bg-[#1A1A1A] border border-[#2E2E2E] text-xs font-mono-tech text-[#F5F5F0] cursor-pointer min-h-[36px]"
            >
              <Plus className="w-3.5 h-3.5 text-[#0066FF]" />
              <span>Add Source</span>
            </button>
          </div>

          <div className="flex flex-col divide-y divide-[#141414]">
            {sources.map((src) => (
              <div key={src.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono-tech">
                <div className="flex items-start sm:items-center gap-2.5">
                  <div className="w-6 h-6 rounded-[2px] bg-[#101010] border border-[#1D1D1D] flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0">
                    <Radio className="w-3 h-3 text-[#10B981]" />
                  </div>
                  <div>
                    <span className="text-[#F5F5F0] font-semibold block">{src.name}</span>
                    <span className="text-[10px] text-[#525252]">{src.type} · {src.events}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 text-[11px] self-end sm:self-center">
                  <span className="text-[#525252]">Ping: <strong className="text-[#8A8A8A]">{src.ping}</strong></span>
                  <span className="px-2 py-0.5 rounded-[2px] bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/25">
                    {src.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications & Webhooks */}
        <div className="p-4 sm:p-6 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px] space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#1D1D1D]">
            <Bell className="w-3.5 h-3.5 text-[#0066FF]" />
            <h2 className="text-xs font-bold text-[#F5F5F0] font-mono-tech uppercase tracking-wider">
              Alert Integrations
            </h2>
          </div>

          <div className="space-y-3 text-xs font-mono-tech">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-[3px] bg-[#050505] border border-[#161616] gap-2">
              <div>
                <span className="text-[#F5F5F0] font-semibold block">Slack #product-alerts</span>
                <span className="text-[11px] text-[#525252]">Instant webhook notification when high-severity anomalies trigger</span>
              </div>
              <button
                onClick={() => setSlackAlerts(!slackAlerts)}
                className={`px-3 py-2 rounded-[2px] cursor-pointer min-h-[40px] flex items-center justify-center ${
                  slackAlerts ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30' : 'bg-[#141414] text-[#8A8A8A]'
                }`}
              >
                {slackAlerts ? 'Active' : 'Disabled'}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-[3px] bg-[#050505] border border-[#161616] gap-2">
              <div>
                <span className="text-[#F5F5F0] font-semibold block">PagerDuty Escalation</span>
                <span className="text-[11px] text-[#525252]">Page on-call engineering if payment success drops &gt; 5.0%</span>
              </div>
              <button
                onClick={() => setPagerDutyAlerts(!pagerDutyAlerts)}
                className={`px-3 py-2 rounded-[2px] cursor-pointer min-h-[40px] flex items-center justify-center ${
                  pagerDutyAlerts ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30' : 'bg-[#141414] text-[#8A8A8A]'
                }`}
              >
                {pagerDutyAlerts ? 'Active' : 'Disabled'}
              </button>
            </div>
          </div>
        </div>

        {/* Responsible AI & Human Verification */}
        <div className="p-4 sm:p-6 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px] space-y-3">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-[#10B981]" />
            <h2 className="text-xs font-bold text-[#F5F5F0] font-mono-tech uppercase tracking-wider">
              Responsible AI & Human-In-The-Loop Policy
            </h2>
          </div>
          <p className="text-xs text-[#8A8A8A] font-mono-tech leading-relaxed">
            TapWise enforces an explicit approval checkpoint before any routing recommendation can be committed to production feature flags. All recommendations remain assistive hypotheses until human sign-off.
          </p>
          <div className="inline-flex items-center gap-2 text-xs text-[#10B981] font-mono-tech pt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            <span>Human verification policy: ENFORCED (ZERO AUTONOMOUS COMMITS)</span>
          </div>
        </div>
      </div>

      {/* Connect Source Modal */}
      {isConnectOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none">
          <div className="w-full max-w-md bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px] p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#1D1D1D]">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-[#0066FF]" />
                <h3 className="text-xs font-bold font-mono-tech text-[#F5F5F0] uppercase">Connect Telemetry Source</h3>
              </div>
              <button
                onClick={() => setIsConnectOpen(false)}
                className="p-1 text-[#8A8A8A] hover:text-[#F5F5F0] min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 font-mono-tech text-xs">
              <div>
                <label className="block text-[#8A8A8A] mb-1">Source Name</label>
                <input
                  type="text"
                  value={newSourceName}
                  onChange={(e) => setNewSourceName(e.target.value)}
                  placeholder="e.g. Production PostgreSQL / Datadog"
                  className="w-full bg-[#050505] border border-[#1D1D1D] focus:border-[#0066FF] rounded-[3px] px-3 py-2 text-[#F5F5F0] outline-none min-h-[40px]"
                />
              </div>

              <div>
                <label className="block text-[#8A8A8A] mb-1">Connector Protocol</label>
                <select
                  value={newSourceType}
                  onChange={(e) => setNewSourceType(e.target.value)}
                  className="w-full bg-[#050505] border border-[#1D1D1D] focus:border-[#0066FF] rounded-[3px] px-3 py-2 text-[#F5F5F0] outline-none min-h-[40px]"
                >
                  <option>ClickHouse Cluster</option>
                  <option>Kafka Event Stream</option>
                  <option>PostgreSQL / MySQL</option>
                  <option>Zendesk API</option>
                  <option>Segment Webhook</option>
                </select>
              </div>

              <div className="p-3 bg-[#050505] border border-[#161616] rounded-[2px] text-[11px] text-[#525252]">
                Zero KYC guarantee: TapWise never ingests or stores customer PAN, CVV, or identity tokens.
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#1D1D1D]">
              <button
                onClick={() => setIsConnectOpen(false)}
                className="px-3.5 py-2 rounded-[3px] bg-[#141414] text-[#8A8A8A] hover:text-[#F5F5F0] min-h-[42px] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsConnectOpen(false)}
                className="btn-magnetic px-4 py-2 rounded-[3px] bg-[#0066FF] hover:bg-[#1A75FF] text-white font-semibold min-h-[42px] cursor-pointer"
              >
                Save & Verify Connection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
