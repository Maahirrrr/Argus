import React, { useState } from 'react';
import {
  Rocket,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Copy
} from 'lucide-react';
import type { LaunchItem, NavigationTab } from '../../types/argus';
import { DEMO_LAUNCH_ITEMS } from '../../data/demoData';

interface LaunchCenterProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onShowToast: (msg: string) => void;
}

export const LaunchCenter: React.FC<LaunchCenterProps> = ({
  onShowToast,
}) => {
  const [launches, setLaunches] = useState<LaunchItem[]>(DEMO_LAUNCH_ITEMS);
  const [selectedLaunch, setSelectedLaunch] = useState<LaunchItem>(DEMO_LAUNCH_ITEMS[0]);
  const [rolloutPercent, setRolloutPercent] = useState<number>(selectedLaunch.rolloutPercentage || 25);

  const handleRolloutChange = (pct: number) => {
    setRolloutPercent(pct);
    setLaunches((prev) =>
      prev.map((l) => (l.id === selectedLaunch.id ? { ...l, rolloutPercentage: pct } : l))
    );
    onShowToast(`Rollout canary updated to ${pct}%. Observability active.`);
  };

  const handleCopyChangelog = () => {
    navigator.clipboard.writeText(
      `# Release ${selectedLaunch.title}\n\n## What's Changed\n- ${selectedLaunch.description || selectedLaunch.title}\n- Rollout Canary: ${rolloutPercent}%\n- Health Status: ${selectedLaunch.health || 'Healthy'}\n\nDeployed via Argus PM OS.`
    );
    onShowToast('Changelog copied to clipboard.');
  };

  const signoffsList = selectedLaunch.signoffs || [
    { role: 'Security & Auth', owner: 'Vikram S. (SecOps)', signed: true },
    { role: 'Core Banking API', owner: 'Deepa K. (Payments Lead)', signed: true },
    { role: 'Compliance / RBI', owner: 'Aarav N. (Legal)', signed: false },
    { role: 'Product Analytics', owner: 'Priya R. (Growth PM)', signed: true },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 animate-fade-in text-[#F5F5F0]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1D1D1D]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-[2px] bg-[#0066FF]/10 border border-[#0066FF]/30 flex items-center justify-center text-[#0066FF]">
            <Rocket className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-display tracking-tight text-[#F5F5F0]">Release Orchestration & Launch Center</h1>
            <p className="text-xs font-mono-tech text-[#8A8A8A]">
              Canary percentage sliders, multi-team readiness sign-offs & instant rollback circuit breakers
            </p>
          </div>
        </div>

        <button
          onClick={handleCopyChangelog}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-tech bg-[#141414] hover:bg-[#1D1D1D] text-[#F5F5F0] border border-[#222] rounded-[2px] transition-colors self-start sm:self-auto"
        >
          <Copy className="w-3.5 h-3.5" />
          <span>Copy Release Notes</span>
        </button>
      </div>

      {/* Launches list */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {launches.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              setSelectedLaunch(item);
              setRolloutPercent(item.rolloutPercentage || 25);
            }}
            className={`p-4 bg-[#0A0A0A] border rounded-[2px] cursor-pointer transition-all ${
              selectedLaunch.id === item.id
                ? 'border-[#0066FF] bg-[#0066FF]/5'
                : 'border-[#1D1D1D] hover:border-[#333]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-[10px] font-mono-tech px-2 py-0.5 rounded-[2px] ${
                item.status === 'Completed' ? 'bg-[#00CC66]/15 text-[#00CC66]' :
                item.status === 'In Progress' ? 'bg-[#0066FF]/15 text-[#0066FF]' :
                'bg-[#FF9900]/15 text-[#FF9900]'
              }`}>
                {item.status}
              </span>
              <span className="text-[11px] font-mono-tech text-[#00CC66]">
                {item.rolloutPercentage || 25}% TRAFFIC
              </span>
            </div>

            <h3 className="text-xs font-bold text-[#F5F5F0] font-display line-clamp-1">{item.title}</h3>
            <p className="text-[11px] text-[#8A8A8A] mt-1 line-clamp-2">{item.description || item.category + ' readiness item'}</p>

            <div className="mt-3 pt-3 border-t border-[#1D1D1D] flex items-center justify-between text-[10px] font-mono-tech text-[#8A8A8A]">
              <span>Owner: {item.owner}</span>
              <span className="text-[#00CC66]">CIRCUIT HEALTHY</span>
            </div>
          </div>
        ))}
      </div>

      {/* Active Release Dashboard */}
      <div className="bg-[#0A0A0A] border border-[#1D1D1D] rounded-[2px] p-5 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#1D1D1D]">
          <div>
            <div className="text-[10px] font-mono-tech text-[#0066FF]">CANARY CONTROLLER</div>
            <h2 className="text-base font-bold font-display text-[#F5F5F0] mt-0.5">{selectedLaunch.title}</h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onShowToast('Emergency rollback initiated. Traffic reverted to 0%.')}
              className="px-3 py-1.5 text-xs font-mono-tech bg-[#FF3333]/15 border border-[#FF3333]/40 text-[#FF3333] hover:bg-[#FF3333]/25 rounded-[2px] transition-colors"
            >
              Emergency Rollback (0%)
            </button>
            <button
              onClick={() => handleRolloutChange(100)}
              className="px-3 py-1.5 text-xs font-mono-tech bg-[#0066FF] hover:bg-[#0052CC] text-white rounded-[2px] transition-colors"
            >
              Promote to 100% GA
            </button>
          </div>
        </div>

        {/* Phased Canary Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono-tech">
            <span className="text-[#8A8A8A]">Live Traffic Percentage Allocation</span>
            <span className="text-[#0066FF] font-bold text-sm">{rolloutPercent}%</span>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={rolloutPercent}
            onChange={(e) => handleRolloutChange(Number(e.target.value))}
            className="w-full accent-[#0066FF]"
          />

          <div className="flex justify-between text-[10px] font-mono-tech text-[#8A8A8A] pt-1">
            <span>0% (Internal)</span>
            <span>10% Canary</span>
            <span>25% Staging</span>
            <span>50% Fleet</span>
            <span>100% GA</span>
          </div>
        </div>

        {/* Multi-Team Signoff Checklist */}
        <div className="space-y-3 pt-3">
          <div className="text-xs font-bold font-mono-tech text-[#F5F5F0] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#0066FF]" />
            <span>Go/No-Go Readiness Sign-offs</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {signoffsList.map((s, idx) => (
              <div key={idx} className="p-3 bg-[#0D0D0D] border border-[#1D1D1D] rounded-[2px] text-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono-tech font-bold text-[#F5F5F0]">{s.role}</span>
                  {s.signed ? (
                    <CheckCircle2 className="w-4 h-4 text-[#00CC66]" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-[#FF9900]" />
                  )}
                </div>
                <div className="text-[11px] text-[#8A8A8A]">{s.owner}</div>
                <div className={`text-[10px] font-mono-tech mt-2 ${s.signed ? 'text-[#00CC66]' : 'text-[#FF9900]'}`}>
                  {s.signed ? 'APPROVED & SIGNED' : 'PENDING REVIEW'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
