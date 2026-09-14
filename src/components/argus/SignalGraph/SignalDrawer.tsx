import React from 'react';
import {
  Sparkles,
  ExternalLink,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import type { SignalEvent, SignalSourceNode } from './signalTypes';
import type { NavigationTab } from '../../../types/argus';
import { ArgusDrawer } from '../../ui/ArgusDrawer';
import { ArgusButton } from '../../ui/ArgusButton';
import { ArgusBadge } from '../../ui/ArgusBadge';

export interface SignalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  sourceNode: SignalSourceNode | null;
  relatedEvent: SignalEvent | null;
  onNavigateTab: (tab: NavigationTab) => void;
  onCreateOpportunityFromSignal?: (signal: SignalEvent) => void;
}

export const SignalDrawer: React.FC<SignalDrawerProps> = ({
  isOpen,
  onClose,
  sourceNode,
  relatedEvent,
  onNavigateTab,
  onCreateOpportunityFromSignal,
}) => {
  if (!sourceNode) return null;

  const confidencePct = Math.round((relatedEvent?.confidence || sourceNode.confidence / 100) * 100);

  return (
    <ArgusDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={`${sourceNode.name} · Signal Analysis`}
      subtitle={`Category: ${sourceNode.category} | Last Detected: ${sourceNode.lastEventTime}`}
      badge={`${confidencePct}% CONFIDENCE`}
      width="lg"
    >
      <div className="space-y-5 select-text text-[#F5F5F0]">
        {/* Signal Summary Header */}
        <div className="p-4 bg-[#0E0E0E] border border-[#1D1D1D] rounded-[2px] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono-tech uppercase text-[#8A8A8A] font-bold">
              SIGNAL SUMMARY
            </span>
            <ArgusBadge
              variant={sourceNode.status === 'anomaly' ? 'red' : 'blue'}
              size="sm"
            >
              {sourceNode.status === 'anomaly' ? 'ANOMALY DETECTED' : 'ACTIVE STREAM'}
            </ArgusBadge>
          </div>
          <p className="text-sm font-bold font-display text-[#F5F5F0]">
            {relatedEvent?.title || sourceNode.description}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 text-xs font-mono-tech border-t border-[#1A1A1A]">
            <div>
              <span className="text-[#525252] block text-[10px]">INGESTION RATE</span>
              <span className="text-[#F5F5F0] font-semibold">{sourceNode.rate}</span>
            </div>
            <div>
              <span className="text-[#525252] block text-[10px]">SEVERITY</span>
              <span className="text-[#EF4444] font-semibold uppercase">High Impact</span>
            </div>
            <div>
              <span className="text-[#525252] block text-[10px]">AFFECTED COHORT</span>
              <span className="text-zinc-300 truncate block">
                {relatedEvent?.usersAffected || 'Returning users'}
              </span>
            </div>
          </div>
        </div>

        {/* ARGUS AI Interpretation */}
        <div className="p-4 bg-[#0E0E0E] border border-[#0066FF]/30 rounded-[2px] space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] font-mono-tech text-[#0066FF] font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
            <span>ARGUS CAUSAL INTERPRETATION</span>
          </div>
          <p className="text-xs font-mono-tech text-[#F5F5F0] leading-relaxed">
            {relatedEvent?.description ||
              `The ${sourceNode.name} telemetry stream indicates statistically significant divergence from steady-state user behavior (+18.4% volume spike). Causal decomposition maps this directly to the latest checkout canary release.`}
          </p>
        </div>

        {/* Evidence & Connected Signals */}
        <div className="p-4 bg-[#0E0E0E] border border-[#1D1D1D] rounded-[2px] space-y-2.5">
          <div className="text-[10px] font-mono-tech text-[#8A8A8A] font-bold uppercase">
            WHY ARGUS FLAGGED THIS · EVIDENCE
          </div>
          <ul className="space-y-1.5 text-xs font-mono-tech text-[#8A8A8A]">
            {(relatedEvent?.evidence || [
              '3 independent telemetry sources confirmed transaction timeout spike',
              'Razorpay UPI gateway route timeout elevated from 0.4% to 2.8%',
              '47 matching customer feedback complaints in Zendesk',
            ]).map((pt, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0 mt-0.5" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Panel */}
        <div className="p-4 bg-[#121212] border border-[#2E2E2E] rounded-[2px] space-y-3">
          <div className="text-[10px] font-mono-tech text-[#10B981] font-bold uppercase">
            ACTIONABLE RECOMMENDATION
          </div>
          <p className="text-xs font-mono-tech text-[#F5F5F0]">
            Convert this telemetry anomaly into a prioritized Product Opportunity, or inspect deep ClickHouse telemetry traces.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-2">
            <ArgusButton
              variant="primary"
              size="sm"
              onClick={() => {
                onClose();
                if (relatedEvent && onCreateOpportunityFromSignal) {
                  onCreateOpportunityFromSignal(relatedEvent);
                } else {
                  onNavigateTab('opportunities');
                }
              }}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Create Opportunity
            </ArgusButton>

            <ArgusButton
              variant="secondary"
              size="sm"
              onClick={() => {
                onClose();
                onNavigateTab('analytics');
              }}
              rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
            >
              View Analytics SQL
            </ArgusButton>

            <ArgusButton
              variant="secondary"
              size="sm"
              onClick={() => {
                onClose();
                onNavigateTab('customers');
              }}
            >
              View Feedback
            </ArgusButton>
          </div>
        </div>
      </div>
    </ArgusDrawer>
  );
};
