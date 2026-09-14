import React from 'react';
import {
  Activity,
  CheckCircle2,
  X
} from 'lucide-react';
import type { NavigationTab } from '../../types/argus';

interface GuidedProductLoopProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onDismiss: () => void;
}

export const GuidedProductLoop: React.FC<GuidedProductLoopProps> = ({
  onNavigateTab,
  onDismiss,
}) => {
  const steps = [
    { num: 1, label: 'Triage Anomaly Signal', tab: 'inbox' as NavigationTab, done: true },
    { num: 2, label: 'Evaluate in Opportunity Tree', tab: 'opportunities' as NavigationTab, done: false },
    { num: 3, label: 'Prioritize in RICE Matrix', tab: 'prioritize' as NavigationTab, done: false },
    { num: 4, label: 'Generate PRD & BDD Spec', tab: 'prds' as NavigationTab, done: false },
    { num: 5, label: 'Deploy A/B Experiment', tab: 'experiments' as NavigationTab, done: false },
  ];

  return (
    <div className="bg-[#0A0A0A] border-b border-[#0066FF]/30 px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-[#0066FF] font-mono-tech font-bold">
          <Activity className="w-3.5 h-3.5" />
          <span>GUIDED PM LOOP:</span>
        </div>
        <span className="text-[#8A8A8A] hidden md:inline">
          Complete your first end-to-end product decision cycle in Argus:
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {steps.map((s) => (
          <button
            key={s.num}
            onClick={() => onNavigateTab(s.tab)}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-[2px] text-[11px] font-mono-tech transition-colors ${
              s.done
                ? 'bg-[#00CC66]/10 text-[#00CC66] border border-[#00CC66]/30'
                : 'bg-[#141414] hover:bg-[#1E1E1E] text-[#8A8A8A] border border-[#222]'
            }`}
          >
            {s.done ? <CheckCircle2 className="w-3 h-3" /> : <span>{s.num}.</span>}
            <span>{s.label}</span>
          </button>
        ))}

        <button
          onClick={onDismiss}
          className="p-1 text-[#666] hover:text-[#F5F5F0] ml-1"
          title="Dismiss Checklist"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
