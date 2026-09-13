import React, { useState } from 'react';
import {
  Sparkles,
  FileCode2,
  RotateCcw
} from 'lucide-react';
import type { PrioritizationInitiative, ModuleType } from '../types/finpilot';
import { COMPETING_INITIATIVES } from '../data/fintechScenarios';
import {
  calculateRiceScore,
  calculateIceScore,
  rankInitiatives,
  generateSensitivityExplanation,
  type ScoringMethod
} from '../lib/prioritization';

interface PrioritizationEngineProps {
  onSelectPrdInitiative: (init: PrioritizationInitiative) => void;
  onNavigateToModule: (m: ModuleType) => void;
}

export const PrioritizationEngine: React.FC<PrioritizationEngineProps> = ({
  onSelectPrdInitiative,
  onNavigateToModule,
}) => {
  const [initiatives, setInitiatives] = useState<PrioritizationInitiative[]>(COMPETING_INITIATIVES);
  const [method, setMethod] = useState<ScoringMethod>('RICE');
  const [lastSensitivityLog, setLastSensitivityLog] = useState<string>(
    'Baseline RICE evaluation loaded. #1 initiative "Reduce UPI Payment Failures" offers highest expected GMV recovery per engineering sprint.'
  );

  const ranked = rankInitiatives(initiatives, method);
  const topInitiative = ranked[0];

  const handleSliderChange = (
    id: string,
    field: 'reach' | 'impact' | 'confidence' | 'effort',
    value: number
  ) => {
    const oldItem = initiatives.find((i) => i.id === id);
    if (!oldItem) return;

    const oldVal = oldItem[field];
    const prevRank = ranked.findIndex((i) => i.id === id) + 1;

    const updated = initiatives.map((item) => {
      if (item.id === id) {
        const nextItem = { ...item, [field]: value };
        nextItem.riceScore = calculateRiceScore(nextItem.reach, nextItem.impact, nextItem.confidence, nextItem.effort);
        nextItem.iceScore = calculateIceScore(nextItem.impact, nextItem.confidence, nextItem.effort);
        return nextItem;
      }
      return item;
    });

    setInitiatives(updated);

    const nextRanked = rankInitiatives(updated, method);
    const newRank = nextRanked.findIndex((i) => i.id === id) + 1;

    const explanation = generateSensitivityExplanation(oldItem, field, oldVal, value, newRank, prevRank);
    setLastSensitivityLog(explanation);
  };

  const resetToDefaults = () => {
    setInitiatives(COMPETING_INITIATIVES);
    setLastSensitivityLog('Reset all assumptions to verified baseline RICE benchmarks.');
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0b0c12] border border-white/[0.08] relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-indigo-500/5 blur-[90px] pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08] relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="section-label">The PM Decision Engine</span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/25">
                Dynamic Trade-off Analyzer
              </span>
            </div>
            <h2 className="font-syne text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              AI Roadmap Prioritization & Sensitivity Workbench
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
              Test roadmap assumptions in real-time. Modify engineering effort or impact sliders to watch rankings dynamically reorder with instant trade-off explanations.
            </p>
          </div>

          {/* Controls: Algorithm Toggle & Reset */}
          <div className="flex flex-wrap items-center gap-2.5 flex-shrink-0">
            <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              {(['RICE', 'ICE', 'MoSCoW'] as ScoringMethod[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMethod(m)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                    method === m
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            <button
              onClick={resetToDefaults}
              className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-mono text-zinc-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] cursor-pointer transition-all"
              title="Reset sliders to benchmark"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Dynamic Sensitivity Explainer Callout */}
        <div className="my-6 p-4 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-cyan-950/25 to-indigo-950/40 border border-cyan-500/30 flex items-start gap-3.5 relative z-10">
          <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300">
                AI Sensitivity & Trade-off Analysis
              </span>
              <span className="text-[10px] font-mono text-zinc-400">
                Active Method: {method}
              </span>
            </div>
            <p className="text-xs text-zinc-200 leading-relaxed font-mono">
              {lastSensitivityLog}
            </p>
          </div>
        </div>

        {/* Top Recommendation Highlight Card */}
        {topInitiative && (
          <div className="p-4 sm:p-5 rounded-2xl bg-[#08090d] border border-indigo-500/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 relative z-10">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-black font-black font-mono text-sm flex-shrink-0 shadow-lg shadow-indigo-500/25">
                #1
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold font-mono text-cyan-300">
                    Highest Recommended Priority:
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-500/30 font-display">
                    {topInitiative.category}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white font-syne mt-0.5">
                  {topInitiative.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {topInitiative.whyRanking}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                onSelectPrdInitiative(topInitiative);
                onNavigateToModule('prd');
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer shadow-lg shadow-indigo-600/30 transition-all flex-shrink-0 w-full md:w-auto justify-center"
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span>Generate PRD for #1 →</span>
            </button>
          </div>
        )}

        {/* Interactive Initiatives Table */}
        <div className="overflow-x-auto relative z-10">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.08] bg-white/[0.01] text-zinc-400 font-mono text-[10px] uppercase tracking-wider">
                <th className="py-3 px-4 w-12 text-center">Rank</th>
                <th className="py-3 px-4 min-w-[260px]">Product Initiative</th>
                <th className="py-3 px-4 w-32">Reach</th>
                <th className="py-3 px-4 w-32">Impact (1-10)</th>
                <th className="py-3 px-4 w-32">Confidence</th>
                <th className="py-3 px-4 w-32">Effort (Sprints)</th>
                <th className="py-3 px-4 text-right w-24">Score</th>
                <th className="py-3 px-4 text-right w-28">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {ranked.map((item, idx) => {
                const isWinner = idx === 0;
                return (
                  <tr
                    key={item.id}
                    className={`transition-all ${
                      isWinner
                        ? 'bg-indigo-500/[0.06] hover:bg-indigo-500/[0.09]'
                        : 'hover:bg-white/[0.02]'
                    }`}
                  >
                    <td className="py-4 px-4 text-center">
                      <span
                        className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-mono font-bold ${
                          isWinner
                            ? 'bg-cyan-400 text-black shadow-md shadow-cyan-400/25 font-black'
                            : idx === 1
                            ? 'bg-slate-200 text-black font-bold'
                            : 'bg-white/[0.04] text-zinc-400 border border-white/[0.06]'
                        }`}
                      >
                        #{idx + 1}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-semibold text-white font-syne text-sm">
                            {item.title}
                          </span>
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/[0.05] text-zinc-400 border border-white/[0.08]">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-zinc-400 text-[11px] leading-snug line-clamp-1">
                          {item.description}
                        </p>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-zinc-400">{(item.reach / 1000).toFixed(1)}M</span>
                        </div>
                        <input
                          type="range"
                          min="100"
                          max="3000"
                          step="100"
                          value={item.reach}
                          onChange={(e) => handleSliderChange(item.id, 'reach', Number(e.target.value))}
                          className="w-full accent-cyan-400 h-1 bg-zinc-800 rounded cursor-pointer"
                        />
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="font-bold text-white">{item.impact}/10</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          step="1"
                          value={item.impact}
                          onChange={(e) => handleSliderChange(item.id, 'impact', Number(e.target.value))}
                          className="w-full accent-indigo-400 h-1 bg-zinc-800 rounded cursor-pointer"
                        />
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-zinc-300">{item.confidence}/10</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          step="1"
                          value={item.confidence}
                          onChange={(e) => handleSliderChange(item.id, 'confidence', Number(e.target.value))}
                          className="w-full accent-emerald-400 h-1 bg-zinc-800 rounded cursor-pointer"
                        />
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className={`font-bold ${item.effort > 7 ? 'text-amber-400' : 'text-zinc-300'}`}>
                            {item.effort} sprints
                          </span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          step="1"
                          value={item.effort}
                          onChange={(e) => handleSliderChange(item.id, 'effort', Number(e.target.value))}
                          className="w-full accent-rose-400 h-1 bg-zinc-800 rounded cursor-pointer"
                        />
                      </div>
                    </td>

                    <td className="py-4 px-4 text-right font-mono">
                      <span className={`text-sm font-black tabular-nums ${
                        isWinner ? 'text-cyan-300' : 'text-zinc-300'
                      }`}>
                        {method === 'RICE' ? item.riceScore.toLocaleString() : item.iceScore}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => {
                          onSelectPrdInitiative(item);
                          onNavigateToModule('prd');
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-indigo-600/20 text-zinc-300 hover:text-white border border-white/10 hover:border-indigo-500/40 text-[11px] font-medium transition-all cursor-pointer"
                      >
                        PRD →
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
