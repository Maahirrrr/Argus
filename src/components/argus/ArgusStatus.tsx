import React from 'react';

export interface ArgusStatusProps {
  status: 'live' | 'simulation' | 'healthy' | 'degraded' | 'offline';
  pulse?: boolean;
}

export const ArgusStatus: React.FC<ArgusStatusProps> = ({ status, pulse = true }) => {
  const statusConfig = {
    live: { label: 'LIVE', color: 'bg-[#10B981]', text: 'text-[#10B981]' },
    simulation: { label: 'SIMULATION', color: 'bg-[#F59E0B]', text: 'text-[#F59E0B]' },
    healthy: { label: 'HEALTHY', color: 'bg-[#10B981]', text: 'text-[#10B981]' },
    degraded: { label: 'DEGRADED', color: 'bg-[#F59E0B]', text: 'text-[#F59E0B]' },
    offline: { label: 'OFFLINE', color: 'bg-[#EF4444]', text: 'text-[#EF4444]' },
  };

  const config = statusConfig[status];

  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-[#121212] border border-[rgba(255,255,255,0.08)] text-[9px] font-mono-tech font-bold uppercase tracking-wider">
      <span
        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${config.color} ${
          pulse ? 'animate-pulse' : ''
        }`}
      />
      <span className={config.text}>{config.label}</span>
    </span>
  );
};
