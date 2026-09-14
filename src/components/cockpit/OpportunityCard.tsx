import React from 'react';
import { Lightbulb } from 'lucide-react';

interface OpportunityCardProps {
  onOpenOpportunity: (id: string) => void;
  onNavigateTab: () => void;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  onOpenOpportunity,
  onNavigateTab,
}) => {
  return (
    <div className="p-4 rounded-[var(--radius-md)] bg-[var(--surface-2)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-colors select-none flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-3.5 h-3.5 text-[var(--signal-green)]" />
            <span className="text-[13px] font-medium font-sans text-[var(--text-primary)]">Top Opportunity</span>
          </div>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-[var(--radius-sm)] bg-[var(--surface-3)] text-[var(--signal-green)] font-semibold">
            #014 Priority
          </span>
        </div>

        <div className="mt-3 space-y-2">
          <div className="text-sm font-semibold font-['Space_Grotesk',sans-serif] text-[var(--text-primary)] leading-snug">
            Reduce high-value checkout drop-off
          </div>
          <p className="text-xs text-[var(--text-secondary)] font-sans line-clamp-2 leading-relaxed">
            Deploy dynamic secondary gateway failover when HDFC response latency exceeds 1,800ms.
          </p>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[var(--border-subtle)] text-xs font-sans">
            <div>
              <span className="text-[var(--text-tertiary)]">Conviction: </span>
              <span className="text-[var(--signal-green)] font-mono font-bold">94%</span>
            </div>
            <div>
              <span className="text-[var(--text-tertiary)]">Impact: </span>
              <span className="text-[var(--text-primary)] font-mono font-medium">₹4.2Cr</span>
            </div>
            <div>
              <span className="text-[var(--text-tertiary)]">Evidence: </span>
              <span className="text-[var(--text-primary)]">3 signals</span>
            </div>
            <div>
              <span className="text-[var(--text-tertiary)]">Status: </span>
              <span className="text-[var(--signal-blue)]">In Review</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between">
        <button
          onClick={() => onOpenOpportunity('opp-014')}
          className="text-xs text-[var(--text-accent)] hover:underline cursor-pointer font-medium font-sans"
        >
          View opportunity
        </button>

        <button
          onClick={onNavigateTab}
          className="text-xs text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer font-sans"
        >
          All 19
        </button>
      </div>
    </div>
  );
};
