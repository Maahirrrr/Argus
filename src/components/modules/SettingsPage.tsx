import React, { useState } from 'react';
import { Shield, Bell, Sliders, Check } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [failureThreshold, setFailureThreshold] = useState(3.0);
  const [confidenceFloor, setConfidenceFloor] = useState(75);
  const [slackAlerts, setSlackAlerts] = useState(true);
  const [pagerDutyAlerts, setPagerDutyAlerts] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto py-8 px-4 sm:px-6 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-[#1D1D1D] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono-tech uppercase tracking-[0.2em] text-[#0066FF] font-bold">
              WORKSPACE CONFIGURATION
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F5F0] tracking-tight font-display">
            SETTINGS & SENTRY PREFERENCES
          </h1>
          <p className="text-xs text-[#8A8A8A] font-mono-tech mt-1">
            Configure anomaly sensitivity, AI confidence floors, RICE weights, and alert integrations.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="btn-magnetic flex items-center gap-1.5 px-4 py-2 rounded-[3px] bg-[#0066FF] hover:bg-[#1A75FF] text-white text-xs font-semibold cursor-pointer shadow-md shadow-[#0066FF]/20"
        >
          {saved ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : null}
          <span>{saved ? 'Preferences Saved' : 'Save Preferences'}</span>
        </button>
      </div>

      <div className="space-y-6 max-w-3xl">
        {/* Anomaly Sentry Sensitivity */}
        <div className="p-6 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px] space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#1D1D1D]">
            <Sliders className="w-3.5 h-3.5 text-[#0066FF]" />
            <h2 className="text-xs font-bold text-[#F5F5F0] font-mono-tech uppercase tracking-wider">
              AI Anomaly Sentry Sensitivity
            </h2>
          </div>

          <div className="space-y-4 text-xs font-mono-tech">
            {/* Failure Threshold Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[#F5F5F0] font-semibold block">Payment Failure Spike Threshold</span>
                  <span className="text-[11px] text-[#525252]">Trigger critical signal when failure rate surges above threshold</span>
                </div>
                <span className="text-[#0066FF] font-bold">+{failureThreshold.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="5.0"
                step="0.5"
                value={failureThreshold}
                onChange={(e) => setFailureThreshold(Number(e.target.value))}
                className="w-full accent-[#0066FF] h-1.5 bg-[#1D1D1D] rounded cursor-pointer"
              />
            </div>

            {/* Confidence Floor Slider */}
            <div className="space-y-1.5 pt-2 border-t border-[#141414]">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[#F5F5F0] font-semibold block">Confidence Floor for PRD Generation</span>
                  <span className="text-[11px] text-[#525252]">Do not synthesize opportunities below Bayesian confidence threshold</span>
                </div>
                <span className="text-[#0066FF] font-bold">{confidenceFloor}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="95"
                step="5"
                value={confidenceFloor}
                onChange={(e) => setConfidenceFloor(Number(e.target.value))}
                className="w-full accent-[#0066FF] h-1.5 bg-[#1D1D1D] rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Notifications & Webhooks */}
        <div className="p-6 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px] space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#1D1D1D]">
            <Bell className="w-3.5 h-3.5 text-[#0066FF]" />
            <h2 className="text-xs font-bold text-[#F5F5F0] font-mono-tech uppercase tracking-wider">
              Alert Integrations
            </h2>
          </div>

          <div className="space-y-3 text-xs font-mono-tech">
            <div className="flex items-center justify-between p-3 rounded-[3px] bg-[#050505] border border-[#161616]">
              <div>
                <span className="text-[#F5F5F0] font-semibold block">Slack #product-alerts</span>
                <span className="text-[11px] text-[#525252]">Instant webhook notification when high-severity anomalies trigger</span>
              </div>
              <button
                onClick={() => setSlackAlerts(!slackAlerts)}
                className={`px-3 py-1 rounded-[2px] cursor-pointer ${
                  slackAlerts ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30' : 'bg-[#141414] text-[#8A8A8A]'
                }`}
              >
                {slackAlerts ? 'Active' : 'Disabled'}
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-[3px] bg-[#050505] border border-[#161616]">
              <div>
                <span className="text-[#F5F5F0] font-semibold block">PagerDuty Escalation</span>
                <span className="text-[11px] text-[#525252]">Page on-call engineering if payment success drops &gt; 5.0%</span>
              </div>
              <button
                onClick={() => setPagerDutyAlerts(!pagerDutyAlerts)}
                className={`px-3 py-1 rounded-[2px] cursor-pointer ${
                  pagerDutyAlerts ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30' : 'bg-[#141414] text-[#8A8A8A]'
                }`}
              >
                {pagerDutyAlerts ? 'Active' : 'Disabled'}
              </button>
            </div>
          </div>
        </div>

        {/* Responsible AI & Human Verification */}
        <div className="p-6 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px] space-y-3">
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
    </div>
  );
};
