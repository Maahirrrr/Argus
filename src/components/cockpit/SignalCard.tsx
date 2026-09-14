import React from 'react';
import { Activity } from 'lucide-react';

interface SignalCardProps {
  onOpenSignal: (id: string) => void;
  onNavigateTab: () => void;
}

export const SignalCard: React.FC<SignalCardProps> = ({ onOpenSignal, onNavigateTab }) => {
  const events = [
    { id: 's1', time: '08:42', title: 'Checkout failure surge', delta: '+18.4%', status: 'critical' },
    { id: 's2', time: '08:39', title: 'Refund complaints spike', delta: '+21%', status: 'warning' },
    { id: 's3', time: '08:31', title: 'Android 15 callback drop', delta: '+12.2%', status: 'critical' },
  ];

  return (
    <div className="p-4 rounded-[var(--radius-md)] bg-[var(--surface-2)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-colors select-none flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-[var(--signal-blue)]" />
            <span className="text-[13px] font-medium font-sans text-[var(--text-primary)]">Telemetry Signals</span>
          </div>
          <span className="text-[11px] font-mono text-[var(--text-tertiary)]">124 active</span>
        </div>

        {/* Status Breakdown */}
        <div className="flex items-center gap-3 my-3 text-[11px] font-sans">
          <div className="flex items-center gap-1.5 text-[var(--text-primary)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal-blue)]" />
            <span>18 New</span>
          </div>
          <div className="flex items-center gap-1.5 text-[var(--signal-red)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal-red)]" />
            <span>4 Critical</span>
          </div>
          <div className="flex items-center gap-1.5 text-[var(--text-secondary)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal-green)]" />
            <span>102 Stable</span>
          </div>
        </div>

        {/* Mini event list */}
        <div className="space-y-1.5">
          {events.map((ev) => (
            <div
              key={ev.id}
              onClick={() => onOpenSignal(ev.id)}
              className="flex items-center justify-between p-2 rounded-[var(--radius-sm)] bg-[var(--surface-1)] hover:bg-[var(--surface-3)] border border-[var(--border-subtle)] cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2 truncate">
                <span className="text-[10px] font-mono text-[var(--text-tertiary)]">{ev.time}</span>
                <span className="text-xs text-[var(--text-primary)] font-medium font-sans truncate">{ev.title}</span>
              </div>
              <span
                className={`text-[10px] font-mono font-bold px-1 py-0.5 rounded-[var(--radius-sm)] ${
                  ev.status === 'critical' ? 'text-[var(--signal-red)]' : 'text-[var(--signal-amber)]'
                }`}
              >
                {ev.delta}
              </span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onNavigateTab}
        className="mt-3 pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer font-sans"
      >
        <span>View all 124 signals</span>
        <span className="text-[var(--text-accent)] text-xs">View</span>
      </button>
    </div>
  );
};
