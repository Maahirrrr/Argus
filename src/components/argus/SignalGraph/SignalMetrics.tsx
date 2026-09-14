import React from 'react';
import type { SignalMetrics as SignalMetricsType } from './signalTypes';

export interface SignalMetricsProps {
  metrics: SignalMetricsType;
  isSimulating: boolean;
  onToggleSimulation?: () => void;
  className?: string;
}

export const SignalMetrics: React.FC<SignalMetricsProps> = ({
  metrics,
  isSimulating,
  onToggleSimulation,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono-tech text-[#8A8A8A] pt-3 border-t border-[#1D1D1D] ${className}`}
    >
      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
        <div>
          <span className="text-[#525252]">STREAMS: </span>
          <span className="text-[#F5F5F0] font-bold">{metrics.activeStreams} ACTIVE</span>
        </div>
        <div>
          <span className="text-[#525252]">THROUGHPUT: </span>
          <span className="text-[#F5F5F0] font-bold">{metrics.eventsPerDay} / DAY</span>
        </div>
        <div>
          <span className="text-[#525252]">LATENCY: </span>
          <span className="text-[#10B981] font-bold">{metrics.latencyMs}ms</span>
        </div>
        <div>
          <span className="text-[#525252]">HEALTH: </span>
          <span className="text-[#10B981] font-bold">{metrics.healthPercent}%</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onToggleSimulation}
          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-[#141414] hover:bg-[#1A1A1A] border border-[#262626] text-[10px] text-[#8A8A8A] hover:text-[#F5F5F0] cursor-pointer transition-colors"
          title="Toggle Simulation Pipeline State"
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isSimulating ? 'bg-[#10B981] animate-pulse' : 'bg-[#EF4444]'
            }`}
          />
          <span>{isSimulating ? 'SIMULATION: RUNNING' : 'SIMULATION: PAUSED'}</span>
        </button>
      </div>
    </div>
  );
};
