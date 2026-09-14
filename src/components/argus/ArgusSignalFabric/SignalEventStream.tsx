import React from 'react';
import type { SignalEvent } from './signalData';

interface SignalEventStreamProps {
  events: SignalEvent[];
  onSelectEvent?: (ev: SignalEvent) => void;
}

export const SignalEventStream: React.FC<SignalEventStreamProps> = ({
  events,
  onSelectEvent,
}) => {
  const formatTitle = (title: string) => {
    // Format event title to sentence case
    if (!title) return '';
    const lower = title.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  const getSeverityDot = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-[var(--signal-red)]';
      case 'warning':
        return 'bg-[var(--signal-amber)]';
      default:
        return 'bg-[var(--signal-blue)]';
    }
  };

  const getSeverityTextColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-[var(--signal-red)]';
      case 'warning':
        return 'text-[var(--signal-amber)]';
      default:
        return 'text-[var(--signal-green)]';
    }
  };

  return (
    <div className="w-full bg-[var(--surface-1)] border border-[var(--border-subtle)] rounded-[var(--radius-sm)] p-3 flex flex-col justify-between select-none">
      {/* Header: "Live events" left, "Auto-correlated" right */}
      <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)] text-[11px] font-sans">
        <span className="font-medium text-[var(--text-tertiary)]">
          Live events
        </span>
        <span className="text-[var(--text-tertiary)] font-normal">
          Auto-correlated
        </span>
      </div>

      {/* TYPE B Rows: transparent, border-bottom 1px var(--border-subtle), no radius */}
      <div className="divide-y divide-[var(--border-subtle)] mt-1">
        {events.slice(0, 4).map((ev) => (
          <div
            key={ev.id}
            onClick={() => onSelectEvent && onSelectEvent(ev)}
            className="flex items-center justify-between py-2 px-1 hover:bg-[var(--surface-2)] transition-colors cursor-pointer"
          >
            {/* Left: 60px fixed width JetBrains Mono timestamp + sentence case title */}
            <div className="flex items-center gap-2 truncate">
              <span className="w-[60px] flex-shrink-0 text-[11px] font-mono text-[var(--text-tertiary)]">
                {ev.timestamp}
              </span>
              <span className="text-[13px] font-medium font-sans text-[var(--text-primary)] truncate">
                {formatTitle(ev.title)}
              </span>
            </div>

            {/* Right: 6px colored dot + delta value (plain text, no pill box) */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className={`w-1.5 h-1.5 rounded-full ${getSeverityDot(ev.severity)}`} />
              <span className={`text-[11px] font-mono font-medium ${getSeverityTextColor(ev.severity)}`}>
                {ev.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
