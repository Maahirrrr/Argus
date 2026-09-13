import React, { useState } from 'react';
import {
  FileCode2,
  Sparkles,
  GitCompare
} from 'lucide-react';
import type { NavigationTab, PrioritizationInitiative } from '../../types/finpilot';
import {
  calculateRiceScore,
  calculateIceScore,
  rankInitiatives,
  simulateDecisionScenario,
  type ScoringMethod
} from '../../lib/prioritization';

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
  const [initiatives, setInitiatives] = useState<PrioritizationInitiative[]>(initialInitiatives);
  const [method, setMethod] = useState<ScoringMethod>('RICE');

  // Decision Simulator state (testing Effort 5 -> 8)
  const [simulatedEffort, setSimulatedEffort] = useState<number>(5);
  const targetSimulationId = 'init-001'; // Reduce payment failures

  const ranked = rankInitiatives(initiatives, method);

  const handleSliderChange = (
    id: string,
    field: 'reachCount' | 'impact' | 'confidence' | 'effort',
    value: number
  ) => {
    const updated = initiatives.map((item) => {
      if (item.id === id) {
        const next = { ...item, [field]: value };
        next.riceScore = calculateRiceScore(next.reachCount, next.impact, next.confidence, next.effort);
        next.iceScore = calculateIceScore(next.impact, next.confidence, next.effort);
        return next;
      }
      return item;
    });
    setInitiatives(updated);
  };

  const simulation = simulateDecisionScenario(initiatives, targetSimulationId, simulatedEffort);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto py-6 px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.08] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-400">
              DECISION WORKBENCH
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/25">
              RICE / ICE / Simulator
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Prioritize
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Evaluate reach, impact, confidence, and engineering effort to maximize product ROI.
          </p>
        </div>

        {/* Algorithm Toggles */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.08]">
            {(['RICE', 'ICE'] as ScoringMethod[]).map((m) => (
              <button
                key={m}
                onClick={() => setMethod(m)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                  method === m
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <button
            onClick={() => onNavigateTab('prds')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-semibold text-zinc-300 cursor-pointer"
          >
            <FileCode2 className="w-3.5 h-3.5 text-blue-400" />
            <span>PRD Workspace →</span>
          </button>
        </div>
      </div>

      {/* AI Recommendation Explainer Banner */}
      <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/30 flex items-start gap-3">
        <Sparkles className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-300 block mb-0.5">
            AI Roadmap Recommendation
          </span>
          <p className="text-xs text-zinc-200 font-mono leading-relaxed">
            "Reduce payment failures should be prioritized because it combines high user impact (9.2), high confidence (91%), and moderate engineering effort (5 sprints) to yield the highest expected GMV recovery."
          </p>
        </div>
      </div>

      {/* Prioritization Table */}
      <div className="p-6 rounded-2xl bg-[#090a0d] border border-white/[0.08] overflow-x-auto shadow-xl">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/[0.08] text-zinc-400 font-mono text-[10px] uppercase tracking-wider">
              <th className="py-3 px-3 w-12 text-center">Rank</th>
              <th className="py-3 px-3 min-w-[260px]">Initiative</th>
              <th className="py-3 px-3 w-32">Reach</th>
              <th className="py-3 px-3 w-32">Impact (1-10)</th>
              <th className="py-3 px-3 w-32">Confidence</th>
              <th className="py-3 px-3 w-32">Effort (Sprints)</th>
              <th className="py-3 px-3 text-right w-24">RICE</th>
              <th className="py-3 px-3 text-right w-28">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {ranked.map((item, idx) => {
              const isWinner = idx === 0;
              return (
                <tr
                  key={item.id}
                  className={`transition-all ${
                    isWinner ? 'bg-blue-600/[0.06] hover:bg-blue-600/[0.1]' : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <td className="py-4 px-3 text-center">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-md font-mono text-xs font-bold ${
                      isWinner ? 'bg-blue-600 text-white' : 'bg-white/[0.04] text-zinc-400'
                    }`}>
                      #{idx + 1}
                    </span>
                  </td>

                  <td className="py-4 px-3">
                    <div className="font-semibold text-white text-xs">{item.title}</div>
                    <div className="text-[11px] text-zinc-400 line-clamp-1">{item.description}</div>
                  </td>

                  <td className="py-4 px-3">
                    <div className="text-[11px] font-mono text-zinc-300">{item.reachCount}K users</div>
                    <input
                      type="range"
                      min="10"
                      max="150"
                      step="5"
                      value={item.reachCount}
                      onChange={(e) => handleSliderChange(item.id, 'reachCount', Number(e.target.value))}
                      className="w-full accent-blue-500 h-1 bg-zinc-800 rounded cursor-pointer"
                    />
                  </td>

                  <td className="py-4 px-3">
                    <div className="text-[11px] font-mono font-bold text-white">{item.impact}/10</div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="0.2"
                      value={item.impact}
                      onChange={(e) => handleSliderChange(item.id, 'impact', Number(e.target.value))}
                      className="w-full accent-blue-500 h-1 bg-zinc-800 rounded cursor-pointer"
                    />
                  </td>

                  <td className="py-4 px-3">
                    <div className="text-[11px] font-mono text-zinc-300">{item.confidence}%</div>
                    <input
                      type="range"
                      min="40"
                      max="100"
                      step="5"
                      value={item.confidence}
                      onChange={(e) => handleSliderChange(item.id, 'confidence', Number(e.target.value))}
                      className="w-full accent-blue-500 h-1 bg-zinc-800 rounded cursor-pointer"
                    />
                  </td>

                  <td className="py-4 px-3">
                    <div className="text-[11px] font-mono text-zinc-300">{item.effort} sprints</div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="1"
                      value={item.effort}
                      onChange={(e) => handleSliderChange(item.id, 'effort', Number(e.target.value))}
                      className="w-full accent-rose-500 h-1 bg-zinc-800 rounded cursor-pointer"
                    />
                  </td>

                  <td className="py-4 px-3 text-right font-mono font-bold text-sm text-white">
                    {method === 'RICE' ? item.riceScore : item.iceScore}
                  </td>

                  <td className="py-4 px-3 text-right">
                    <button
                      onClick={() => {
                        onSelectInitiativeForPrd(item);
                        onNavigateTab('prds');
                      }}
                      className="px-3 py-1 rounded bg-white/[0.04] hover:bg-blue-600/20 text-blue-300 hover:text-white border border-white/10 text-xs font-semibold cursor-pointer"
                    >
                      Create PRD →
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ───── SIGNATURE FEATURE: DECISION SIMULATOR (Section 10) ───── */}
      <div className="p-6 rounded-2xl bg-[#08090d] border border-white/[0.12] shadow-2xl flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/[0.08] gap-3">
          <div className="flex items-center gap-2">
            <GitCompare className="w-4 h-4 text-blue-400" />
            <h2 className="text-sm font-bold text-white font-mono uppercase tracking-tight">
              DECISION SIMULATOR: What If Scenarios
            </h2>
          </div>
          <span className="text-[10px] font-mono text-zinc-500">
            Interactive PM Decision-Making Simulator
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Controls: Change assumptions */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-4">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-400 block">
              Simulate Engineering Effort Assumption
            </span>
            <p className="text-xs text-zinc-300">
              Target: <strong>Reduce Payment Failures</strong> (Baseline: 5 sprints)
            </p>

            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-zinc-400">Engineering Effort:</span>
                <span className="font-bold text-white text-sm">
                  {simulatedEffort} Sprints {simulatedEffort === 5 ? '(Current)' : `(Simulated: 5 → ${simulatedEffort})`}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={simulatedEffort}
                onChange={(e) => setSimulatedEffort(Number(e.target.value))}
                className="w-full accent-blue-500 h-2 bg-zinc-800 rounded cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1">
                <span>1 sprint (Fast)</span>
                <span>5 sprints (Baseline)</span>
                <span>8 sprints (Scope creep)</span>
                <span>10 sprints</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setSimulatedEffort(8)}
                className="px-2.5 py-1 rounded text-[11px] font-mono bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 border border-white/[0.06] cursor-pointer"
              >
                Test Scope Creep (Effort 5 → 8)
              </button>
              <button
                onClick={() => setSimulatedEffort(5)}
                className="px-2.5 py-1 rounded text-[11px] font-mono bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 border border-white/[0.06] cursor-pointer"
              >
                Reset to 5
              </button>
            </div>
          </div>

          {/* Scenario Comparison Card */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                Scenario Comparison Result
              </span>

              <div className="grid grid-cols-2 gap-3 mb-3 font-mono text-xs">
                <div className="p-3 rounded-lg bg-black/40 border border-white/[0.04]">
                  <span className="text-zinc-500 text-[10px] block mb-0.5">BEFORE</span>
                  <p className="text-white font-bold">Rank #{simulation.originalRank}</p>
                  <p className="text-zinc-400 text-[11px]">RICE: {simulation.originalRice}</p>
                  <p className="text-zinc-500 text-[10px]">Effort: {simulation.originalEffort} sprints</p>
                </div>

                <div className={`p-3 rounded-lg border ${
                  simulation.simulatedRank > simulation.originalRank
                    ? 'bg-red-950/20 border-red-500/30'
                    : 'bg-emerald-950/20 border-emerald-500/30'
                }`}>
                  <span className="text-zinc-500 text-[10px] block mb-0.5">AFTER SIMULATION</span>
                  <p className={`font-bold ${
                    simulation.simulatedRank > simulation.originalRank ? 'text-red-400' : 'text-emerald-400'
                  }`}>
                    Rank #{simulation.simulatedRank}
                  </p>
                  <p className="text-zinc-300 text-[11px]">RICE: {simulation.simulatedRice}</p>
                  <p className="text-zinc-400 text-[10px]">Effort: {simulation.simulatedEffort} sprints</p>
                </div>
              </div>
            </div>

            {/* AI Explanation */}
            <div className="p-3 rounded-lg bg-black/60 border border-white/[0.06]">
              <span className="text-[10px] font-mono text-blue-400 font-bold block mb-1">
                AI Decision Explanation:
              </span>
              <p className="text-xs text-zinc-300 font-mono leading-relaxed">
                "{simulation.explanation}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
