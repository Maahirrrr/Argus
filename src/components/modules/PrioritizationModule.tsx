import React, { useState } from 'react';
import {
  Scale,
  ShieldAlert,
  CheckCircle2
} from 'lucide-react';
import type { NavigationTab, PrioritizationInitiative } from '../../types/argus';
import {
  calculateRiceScore,
  calculateIceScore,
  rankInitiatives,
  simulateDecisionScenario,
  type ScoringMethod
} from '../../lib/prioritization';
import { ChallengeModal } from './ChallengeModal';

interface PrioritizationModuleProps {
  initiatives: PrioritizationInitiative[];
  onNavigateTab: (tab: NavigationTab) => void;
  onSelectInitiativeForPrd: (init: PrioritizationInitiative) => void;
}

export const PrioritizationModule: React.FC<PrioritizationModuleProps> = ({
  initiatives: initialInitiatives,
  onNavigateTab,
  onSelectInitiativeForPrd,
}) => {
  const [scoringMethod, setScoringMethod] = useState<ScoringMethod>('RICE');
  const [initiatives, setInitiatives] = useState<PrioritizationInitiative[]>(initialInitiatives);
  const [selectedId, setSelectedId] = useState<string>('init-014');
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);

  const activeInitiative = initiatives.find((i) => i.id === selectedId) || initiatives[0];

  const handleUpdateParam = (
    id: string,
    field: 'reach' | 'impact' | 'confidence' | 'effort',
    value: number
  ) => {
    setInitiatives((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item };
        if (field === 'reach') {
          updated.reachCount = Math.round(value / 1000);
          updated.reach = `${(value / 1000).toFixed(0)}k transactors`;
        } else {
          (updated as any)[field] = value;
        }
        updated.riceScore = calculateRiceScore(
          updated.reachCount,
          updated.impact,
          updated.confidence,
          updated.effort
        );
        updated.iceScore = calculateIceScore(
          updated.impact,
          updated.confidence,
          updated.effort
        );
        return updated;
      })
    );
  };

  const rankedList = rankInitiatives(initiatives, scoringMethod);

  // Causal sensitivity scenario simulation
  const simulation = simulateDecisionScenario(
    initiatives,
    activeInitiative.id,
    activeInitiative.effort + 2
  );

  return (
    <div className="flex flex-col gap-6 sm:gap-8 max-w-7xl mx-auto py-5 sm:py-8 px-4 sm:px-6 select-none pb-24 md:pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-5 border-b border-[#1D1D1D] gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-mono-tech text-[#8A8A8A]">
              Decide / Prioritization
            </span>
            <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded-[3px] bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 font-semibold">
              RICE / ICE MATRIX
            </span>
            <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded-[3px] bg-[#141414] text-[#8A8A8A] border border-[#222]">
              SIMULATION
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold text-[#EDEDED] tracking-tight">
            What Should We Build?
          </h1>
          <p className="text-xs text-[#8A8A8A] font-mono-tech mt-1">
            Dynamic trade-off evaluation and sensitivity modeling across RICE and ICE algorithms.
          </p>
        </div>

        {/* Algorithm Toggles & Opportunities Link */}
        <div className="flex items-center justify-between sm:justify-end gap-2.5">
          <button
            onClick={() => onNavigateTab('opportunities')}
            className="px-3 py-2 rounded-[3px] bg-[#101010] hover:bg-[#141414] border border-[#1D1D1D] text-xs font-mono-tech text-[#8A8A8A] hover:text-[#F5F5F0] cursor-pointer transition-colors min-h-[40px]"
          >
            ← Opportunities
          </button>
          <div className="flex items-center gap-1 p-1 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[3px]">
            {(['RICE', 'ICE'] as ScoringMethod[]).map((method) => (
              <button
                key={method}
                onClick={() => setScoringMethod(method)}
                className={`px-2.5 py-1.5 rounded-[2px] text-xs font-mono-tech transition-colors cursor-pointer min-h-[36px] ${
                  scoringMethod === method
                    ? 'bg-[#0066FF] text-white font-bold'
                    : 'text-[#8A8A8A] hover:text-[#F5F5F0]'
                }`}
              >
                {method}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Split Layout: Ranked Board vs AI Decision Panel & Sliders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Ranked Editorial Board */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs font-mono-tech text-[#8A8A8A] px-1">
            <span>RANKED ROADMAP INITIATIVES</span>
            <span>ALGORITHM: {scoringMethod}</span>
          </div>

          <div className="flex flex-col divide-y divide-[#1D1D1D] bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px] overflow-hidden">
            {rankedList.map((item, idx) => {
              const isSelected = item.id === selectedId;
              const score = scoringMethod === 'RICE' ? item.riceScore : item.iceScore;

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`p-3.5 sm:p-4 flex items-center justify-between gap-3 cursor-pointer transition-all min-h-[56px] active:bg-[#141414] ${
                    isSelected ? 'bg-[#141414] border-l-2 border-[#0066FF]' : 'hover:bg-[#0E0E0E]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <span className="font-mono-tech text-xs font-bold text-[#525252] w-5 flex-shrink-0">
                      0{idx + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-xs font-bold text-[#F5F5F0] truncate">{item.title}</span>
                        {idx === 0 && (
                          <span className="text-[9px] font-mono-tech px-1.5 py-0.2 rounded-[2px] bg-[#0066FF]/20 text-[#0066FF] border border-[#0066FF]/30 font-bold">
                            #1 TOP
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-mono-tech text-[#8A8A8A] block truncate">
                        {item.category} · {item.reach}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="text-right font-mono-tech">
                      <span className="text-xs font-bold text-[#F5F5F0]">{score.toFixed(1)}</span>
                      <span className="text-[9px] sm:text-[10px] text-[#525252] block">{scoringMethod}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: AI Decision Panel, Sliders & Challenge Trigger */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* AI Decision Panel */}
          <div className="p-4 sm:p-6 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px] flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1D1D1D]">
              <div className="flex items-center gap-2">
                <Scale className="w-3.5 h-3.5 text-[#0066FF]" />
                <span className="text-xs font-mono-tech font-bold uppercase text-[#0066FF]">
                  ALGORITHMIC RECOMMENDATION
                </span>
              </div>
              <span className="text-[10px] font-mono-tech text-[#8A8A8A]">91% CONFIDENCE</span>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#F5F5F0] mb-1 font-display">
                {activeInitiative.title} should remain your highest priority.
              </h3>
              <p className="text-xs text-[#8A8A8A] font-mono-tech leading-relaxed">
                High transactional impact (₹18.4L GMV/wk), high data confidence (91%), and moderate engineering effort (5 sprints) yield the strongest RICE yield across your roadmap.
              </p>
            </div>

            {/* Decision Actions: Accept vs Challenge */}
            <div className="pt-3 border-t border-[#1D1D1D] flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <button
                onClick={() => onSelectInitiativeForPrd(activeInitiative)}
                className="btn-magnetic flex-1 flex items-center justify-center gap-1.5 px-4 py-3 rounded-[3px] bg-[#0066FF] hover:bg-[#1A75FF] text-white text-xs font-semibold cursor-pointer min-h-[44px]"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Accept & Create PRD</span>
              </button>

              <button
                onClick={() => setIsChallengeModalOpen(true)}
                className="btn-magnetic px-4 py-3 rounded-[3px] bg-[#141414] hover:bg-[#1A1A1A] border border-[#2E2E2E] text-xs font-mono-tech text-[#EF4444] hover:text-white cursor-pointer flex items-center justify-center gap-1.5 min-h-[44px]"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Challenge Hunch</span>
              </button>
            </div>
          </div>

          {/* Interactive Sensitivity Sliders for Active Item */}
          <div className="p-4 sm:p-6 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px] flex flex-col gap-4">
            <span className="text-xs font-mono-tech font-bold uppercase text-[#8A8A8A]">
              PARAMETER SENSITIVITY SLIDERS
            </span>

            {/* Reach */}
            <div className="flex flex-col gap-2 py-1">
              <div className="flex justify-between text-xs font-mono-tech">
                <span className="text-[#8A8A8A]">Reach (Users)</span>
                <span className="text-[#F5F5F0] font-bold">{activeInitiative.reach}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="500000"
                step="10000"
                value={activeInitiative.reachCount * 1000}
                onChange={(e) => handleUpdateParam(activeInitiative.id, 'reach', Number(e.target.value))}
                className="w-full cursor-pointer min-h-[32px]"
              />
            </div>

            {/* Impact */}
            <div className="flex flex-col gap-2 py-1">
              <div className="flex justify-between text-xs font-mono-tech">
                <span className="text-[#8A8A8A]">Impact (1-10)</span>
                <span className="text-[#F5F5F0] font-bold">{activeInitiative.impact} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={activeInitiative.impact}
                onChange={(e) => handleUpdateParam(activeInitiative.id, 'impact', Number(e.target.value))}
                className="w-full cursor-pointer min-h-[32px]"
              />
            </div>

            {/* Confidence */}
            <div className="flex flex-col gap-2 py-1">
              <div className="flex justify-between text-xs font-mono-tech">
                <span className="text-[#8A8A8A]">Confidence (%)</span>
                <span className="text-[#F5F5F0] font-bold">{activeInitiative.confidence}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                step="5"
                value={activeInitiative.confidence}
                onChange={(e) => handleUpdateParam(activeInitiative.id, 'confidence', Number(e.target.value))}
                className="w-full cursor-pointer min-h-[32px]"
              />
            </div>

            {/* Effort */}
            <div className="flex flex-col gap-2 py-1">
              <div className="flex justify-between text-xs font-mono-tech">
                <span className="text-[#8A8A8A]">Effort (Sprints)</span>
                <span className="text-[#F5F5F0] font-bold">{activeInitiative.effort} Sprints</span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                step="1"
                value={activeInitiative.effort}
                onChange={(e) => handleUpdateParam(activeInitiative.id, 'effort', Number(e.target.value))}
                className="w-full cursor-pointer min-h-[32px]"
              />
            </div>

            {/* Dynamic Sensitivity Explainer */}
            <div className="mt-2 p-3 bg-[#0D0E14] border border-[#0066FF]/25 rounded-[3px] text-xs font-mono-tech leading-relaxed">
              <span className="text-[#0066FF] font-bold block mb-1">Causal Sensitivity Explainer:</span>
              <p className="text-[#8A8A8A]">
                {simulation.explanation}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Signature Split-Screen Challenge Modal */}
      <ChallengeModal
        isOpen={isChallengeModalOpen}
        onClose={() => setIsChallengeModalOpen(false)}
        onAcceptAndCreatePrd={() => {
          setIsChallengeModalOpen(false);
          onSelectInitiativeForPrd(activeInitiative);
        }}
      />
    </div>
  );
};
