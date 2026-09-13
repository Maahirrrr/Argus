import React from 'react';
import { Shield } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto py-6 px-4 sm:px-6">
      {/* Header */}
      <div className="pb-6 border-b border-white/[0.08]">
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Workspace Settings
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Configure anomaly sentry sensitivity, AI confidence thresholds, and pod members.
        </p>
      </div>

      <div className="space-y-4 max-w-3xl">
        <div className="p-5 rounded-xl bg-[#090a0d] border border-white/[0.08] space-y-3">
          <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
            AI Anomaly Sentry Sensitivity
          </h3>
          <div className="space-y-2 text-xs text-zinc-300">
            <div className="flex justify-between items-center py-2 border-b border-white/[0.04]">
              <div>
                <span className="font-semibold text-white block">Payment Failure Threshold</span>
                <span className="text-zinc-500 text-[11px]">Trigger critical signal when failure rate surges &gt;3.0%</span>
              </div>
              <span className="font-mono text-blue-400">+3.0%</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-white/[0.04]">
              <div>
                <span className="font-semibold text-white block">Confidence Floor for PRD Generation</span>
                <span className="text-zinc-500 text-[11px]">Do not synthesize opportunities below confidence threshold</span>
              </div>
              <span className="font-mono text-blue-400">75%</span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-[#090a0d] border border-white/[0.08] space-y-3">
          <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
            Responsible AI & Human-In-The-Loop
          </h3>
          <p className="text-xs text-zinc-400">
            FinPilot enforces an approval checkpoint before any routing recommendation can be committed to production feature flags.
          </p>
          <div className="inline-flex items-center gap-2 text-xs text-emerald-400 font-mono">
            <Shield className="w-3.5 h-3.5" />
            <span>Human verification policy: ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
};
