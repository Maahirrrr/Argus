import React from 'react';
import { ShieldCheck, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { ArgusDrawer } from '../argus/ArgusDrawer';
import { ArgusButton } from '../argus/ArgusButton';
import { ArgusBadge } from '../argus/ArgusBadge';
import type { NavigationTab } from '../../types/argus';

export type CockpitDrawerType = 'opportunity' | 'signal' | 'decision' | 'recommendation' | 'feedback' | 'health' | 'generic';

export interface CockpitDrawerData {
  type: CockpitDrawerType;
  title: string;
  subtitle?: string;
  category?: string;
  conviction?: number | string;
  impact?: string;
  evidence?: string[];
  metrics?: { label: string; value: string }[];
  payload?: Record<string, any>;
  reasoningSteps?: string[];
  targetTab?: NavigationTab;
}

interface CockpitDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: CockpitDrawerData | null;
  onNavigateTab?: (tab: NavigationTab) => void;
}

export const CockpitDrawer: React.FC<CockpitDrawerProps> = ({
  isOpen,
  onClose,
  data,
  onNavigateTab,
}) => {
  if (!data) return null;

  const getCategoryBadgeVariant = (type: CockpitDrawerType) => {
    switch (type) {
      case 'opportunity':
        return 'green';
      case 'signal':
        return 'amber';
      case 'recommendation':
        return 'blue';
      case 'decision':
        return 'purple';
      default:
        return 'neutral';
    }
  };

  const handleAction = () => {
    onClose();
    if (data.targetTab && onNavigateTab) {
      onNavigateTab(data.targetTab);
    }
  };

  return (
    <ArgusDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <ArgusBadge variant={getCategoryBadgeVariant(data.type)} size="sm" dot>
            {data.category || data.type}
          </ArgusBadge>
          <span className="truncate max-w-[280px]">{data.title}</span>
        </div>
      }
      subtitle={data.subtitle}
      footer={
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] font-mono-tech text-[#666666]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Workspace Isolated · PostgreSQL RLS</span>
          </div>

          {data.targetTab && (
            <ArgusButton
              variant="primary"
              size="xs"
              onClick={handleAction}
              rightIcon={<ArrowRight className="w-3 h-3" />}
            >
              Open in {data.targetTab.toUpperCase()}
            </ArgusButton>
          )}
        </div>
      }
    >
      {/* 1. Metrics Grid */}
      {data.metrics && data.metrics.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 rounded-[6px] bg-[#0A0A0A] border border-[rgba(255,255,255,0.06)]">
          {data.metrics.map((m) => (
            <div key={m.label} className="text-xs font-mono-tech">
              <span className="text-[#666666] block text-[9.5px] uppercase">{m.label}</span>
              <span className="text-[#EDEDED] font-semibold tracking-tight">{m.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* 2. Analytical Reasoning Steps (For AI Recommendations) */}
      {data.reasoningSteps && data.reasoningSteps.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-mono-tech font-bold uppercase tracking-wider text-[#A1A1A1]">
            <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
            <span>Analytical Reasoning Trace</span>
          </div>
          <div className="space-y-1.5">
            {data.reasoningSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-[4px] bg-[#0A0A0A] border border-[rgba(255,255,255,0.04)] text-xs text-[#CCCCCC] font-mono-tech leading-relaxed flex items-start gap-2"
              >
                <span className="text-[#0066FF] text-[10px] font-bold mt-0.5">0{idx + 1}</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Verified Evidence Clusters */}
      {data.evidence && data.evidence.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-mono-tech font-bold uppercase tracking-wider text-[#A1A1A1]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Verified Causal Evidence</span>
          </div>
          <div className="space-y-1.5">
            {data.evidence.map((ev, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-[4px] bg-[#0A0A0A] border border-[rgba(255,255,255,0.04)] text-xs text-[#CCCCCC] font-mono-tech leading-relaxed flex items-start gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-1.5 flex-shrink-0" />
                <span>{ev}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Raw Telemetry Payload (For Signals) */}
      {data.payload && (
        <div className="space-y-2">
          <div className="text-[11px] font-mono-tech font-bold uppercase tracking-wider text-[#A1A1A1]">
            Raw Event Payload
          </div>
          <pre className="p-3 rounded-[6px] bg-[#050505] border border-[rgba(255,255,255,0.06)] text-[11px] text-[#A1A1A1] font-mono-tech overflow-x-auto">
            {JSON.stringify(data.payload, null, 2)}
          </pre>
        </div>
      )}
    </ArgusDrawer>
  );
};
