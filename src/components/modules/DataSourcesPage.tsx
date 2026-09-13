import React from 'react';
import {
  Plus,
  ShieldCheck
} from 'lucide-react';
import { DEMO_DATA_SOURCES } from '../../data/demoData';

export const DataSourcesPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto py-6 px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.08] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-400">
              INFRASTRUCTURE CONNECTORS
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/25">
              5 Connected
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Data Sources
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Simulated high-fidelity telemetry pipelines feeding FinPilot AI intelligence layer.
          </p>
        </div>

        <button
          onClick={() => {}}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold cursor-pointer shadow-sm shadow-blue-600/30"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Connect Source</span>
        </button>
      </div>

      {/* Portfolio / Demo Disclaimer (Section 16 requirement) */}
      <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/30 flex items-center justify-between text-xs font-mono text-zinc-300">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-blue-400 flex-shrink-0" />
          <span>
            <strong>Portfolio Showcase:</strong> These data feeds use deterministic simulated fintech data (ClickHouse, Zendesk, NPCI). No real financial credentials or customer PII are accessed.
          </span>
        </div>
      </div>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DEMO_DATA_SOURCES.map((ds) => (
          <div
            key={ds.id}
            className="p-5 rounded-2xl bg-[#090a0d] border border-white/[0.08] shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-zinc-400">{ds.type}</span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                  ds.status === 'Connected'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25'
                    : 'bg-white/[0.04] text-zinc-500 border border-white/[0.06]'
                }`}>
                  {ds.status}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white mb-1">{ds.name}</h3>
              <p className="text-xs text-zinc-400 mb-3">{ds.description}</p>
            </div>

            <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>{ds.eventCount}</span>
              <span>Sync: {ds.lastSync}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
