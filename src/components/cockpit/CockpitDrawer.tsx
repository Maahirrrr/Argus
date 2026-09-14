import React from 'react';
import { X, ExternalLink, ShieldCheck } from 'lucide-react';
import type { NavigationTab } from '../../types/argus';

interface CockpitDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  category?: string;
  evidence?: string[];
  metrics?: { label: string; value: string }[];
  targetTab?: NavigationTab;
  onNavigateTab?: (tab: NavigationTab) => void;
}

export const CockpitDrawer: React.FC<CockpitDrawerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  category = 'Telemetry Evidence',
  evidence = [
    'Debit failover latency on secondary switch exceeded 1,800ms P99 cap',
    '342 users impacted during 8–10 PM peak transaction window',
    'Correlated with Zendesk ticket cluster #8420',
  ],
  metrics = [
    { label: 'Confidence', value: '94%' },
    { label: 'Severity', value: 'Critical' },
    { label: 'Impact GMV', value: '₹4.2Cr' },
    { label: 'Status', value: 'Investigating' },
  ],
  targetTab,
  onNavigateTab,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs select-none animate-fade-in-scale">
      <div className="w-full max-w-md h-full bg-[#050505] border-l border-[rgba(255,255,255,0.10)] shadow-2xl flex flex-col justify-between p-5">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-[rgba(255,255,255,0.08)]">
            <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[#0070F3] font-bold">
              {category}
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded-[4px] text-[#666666] hover:text-[#EDEDED] hover:bg-[#121212] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-4 space-y-1">
            <h2 className="text-base font-semibold text-[#EDEDED] leading-snug">{title}</h2>
            {subtitle && <p className="text-xs text-[#A1A1A1] leading-relaxed">{subtitle}</p>}
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-2 my-4 p-3 rounded-[6px] bg-[#080808] border border-[rgba(255,255,255,0.06)]">
            {metrics.map((m) => (
              <div key={m.label} className="text-xs font-mono-tech">
                <span className="text-[#666666] block text-[10px] uppercase">{m.label}</span>
                <span className="text-[#EDEDED] font-semibold">{m.value}</span>
              </div>
            ))}
          </div>

          {/* Evidence List */}
          <div className="space-y-2 mt-4">
            <div className="text-[11px] font-mono-tech uppercase text-[#666666]">
              Verified Evidence Clusters
            </div>
            <div className="space-y-1.5">
              {evidence.map((ev, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-[4px] bg-[#0A0A0A] border border-[rgba(255,255,255,0.04)] text-xs text-[#A1A1A1] leading-relaxed flex items-start gap-2"
                >
                  <span className="text-[#0070F3] font-mono-tech text-[10px] mt-0.5">0{idx + 1}</span>
                  <span>{ev}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[rgba(255,255,255,0.08)] flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] font-mono-tech text-[#666666]">
            <ShieldCheck className="w-3 h-3 text-[#46A758]" />
            <span>Workspace Isolated</span>
          </div>

          <button
            onClick={() => {
              onClose();
              if (targetTab && onNavigateTab) onNavigateTab(targetTab);
            }}
            className="argus-btn-primary text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span>Open in Workspace</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
