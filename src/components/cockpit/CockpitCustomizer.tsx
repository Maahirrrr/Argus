import React from 'react';
import { Eye, EyeOff, Pin, RotateCcw, Sliders, Check } from 'lucide-react';
import { ArgusDrawer } from '../argus/ArgusDrawer';
import { ArgusButton } from '../argus/ArgusButton';

export interface CockpitCardConfig {
  id: string;
  label: string;
  category: 'Metrics' | 'Fabric' | 'Intelligence' | 'Roadmap' | 'Health';
  visible: boolean;
  pinned: boolean;
}

export const DEFAULT_CARDS: CockpitCardConfig[] = [
  { id: 'metric_signals', label: 'Active Signals Metric', category: 'Metrics', visible: true, pinned: true },
  { id: 'metric_conviction', label: 'Opportunity Conviction Metric', category: 'Metrics', visible: true, pinned: false },
  { id: 'metric_health', label: 'Health Score Metric', category: 'Metrics', visible: true, pinned: false },
  { id: 'signal_fabric', label: 'Signature Signal Fabric', category: 'Fabric', visible: true, pinned: true },
  { id: 'signals_card', label: 'Telemetry Signals Feed', category: 'Intelligence', visible: true, pinned: false },
  { id: 'opportunities_card', label: 'Opportunity Candidate Card', category: 'Intelligence', visible: true, pinned: false },
  { id: 'roadmap_card', label: 'Quarterly Roadmap Card', category: 'Roadmap', visible: true, pinned: false },
  { id: 'ai_recommendations', label: 'AI Strategic Recommendations', category: 'Intelligence', visible: true, pinned: false },
  { id: 'activity_card', label: 'Chronological Activity Stream', category: 'Intelligence', visible: true, pinned: false },
  { id: 'product_health_breakdown', label: '4-Pillar Health Breakdown', category: 'Health', visible: true, pinned: false },
];

interface CockpitCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  cards: CockpitCardConfig[];
  onToggleCardVisibility: (id: string) => void;
  onToggleCardPin: (id: string) => void;
  onResetLayout: () => void;
  density: 'compact' | 'balanced' | 'comfortable';
  onSelectDensity: (d: 'compact' | 'balanced' | 'comfortable') => void;
}

export const CockpitCustomizer: React.FC<CockpitCustomizerProps> = ({
  isOpen,
  onClose,
  cards,
  onToggleCardVisibility,
  onToggleCardPin,
  onResetLayout,
  density,
  onSelectDensity,
}) => {
  return (
    <ArgusDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#0066FF]" />
          <span>Customize Cockpit Layout</span>
        </div>
      }
      subtitle="Tailor card density, visibility, and priority pinning for your workspace."
      footer={
        <div className="w-full flex items-center justify-between">
          <ArgusButton
            variant="ghost"
            size="xs"
            onClick={onResetLayout}
            leftIcon={<RotateCcw className="w-3 h-3" />}
          >
            Reset Defaults
          </ArgusButton>
          <ArgusButton variant="primary" size="xs" onClick={onClose} leftIcon={<Check className="w-3 h-3" />}>
            Done
          </ArgusButton>
        </div>
      }
    >
      {/* 1. Information Density Selector */}
      <div className="space-y-2 pb-4 border-b border-[rgba(255,255,255,0.06)]">
        <label className="text-[11px] font-mono-tech font-bold uppercase tracking-wider text-[#8A8A8A]">
          Display Density
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['compact', 'balanced', 'comfortable'] as const).map((d) => (
            <button
              key={d}
              onClick={() => onSelectDensity(d)}
              className={`px-2.5 py-1.5 rounded-[4px] text-xs font-mono-tech border capitalize transition-all cursor-pointer ${
                density === d
                  ? 'bg-[#0066FF]/15 border-[#0066FF] text-[#EDEDED] font-semibold'
                  : 'bg-[#0A0A0A] border-[rgba(255,255,255,0.08)] text-[#8A8A8A] hover:bg-[#121212]'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Card Modules Visibility & Pinning */}
      <div className="space-y-2">
        <label className="text-[11px] font-mono-tech font-bold uppercase tracking-wider text-[#8A8A8A]">
          Card Modules ({cards.filter((c) => c.visible).length}/{cards.length} Visible)
        </label>
        <div className="space-y-1.5">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`flex items-center justify-between p-2.5 rounded-[6px] border transition-all ${
                card.visible
                  ? 'bg-[#0A0A0A] border-[rgba(255,255,255,0.08)] text-[#EDEDED]'
                  : 'bg-[#060606] border-[rgba(255,255,255,0.04)] text-[#555555] opacity-60'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <span className="text-[9px] font-mono-tech px-1.5 py-0.5 rounded bg-[#121212] border border-[rgba(255,255,255,0.06)] text-[#666666]">
                  {card.category}
                </span>
                <span className="text-xs truncate">{card.label}</span>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                {/* Pin button */}
                <button
                  onClick={() => onToggleCardPin(card.id)}
                  className={`p-1.5 rounded-[4px] transition-colors cursor-pointer ${
                    card.pinned
                      ? 'text-[#0066FF] bg-[#0066FF]/10'
                      : 'text-[#555] hover:text-[#EDEDED] hover:bg-[#121212]'
                  }`}
                  title={card.pinned ? 'Unpin card' : 'Pin card to top'}
                >
                  <Pin className="w-3.5 h-3.5" />
                </button>

                {/* Hide / Show button */}
                <button
                  onClick={() => onToggleCardVisibility(card.id)}
                  className={`p-1.5 rounded-[4px] transition-colors cursor-pointer ${
                    card.visible
                      ? 'text-[#8A8A8A] hover:text-[#EDEDED] hover:bg-[#121212]'
                      : 'text-[#EF4444] bg-[#EF4444]/10'
                  }`}
                  title={card.visible ? 'Hide card' : 'Show card'}
                >
                  {card.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ArgusDrawer>
  );
};
