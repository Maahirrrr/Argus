import React, { useState } from 'react';
import {
  ArrowUp,
  ArrowDown,
  FileText,
  Info
} from 'lucide-react';
import type { NavigationTab, PrioritizationInitiative } from '../../types/argus';
import {
  calculateRiceScore,
  calculateIceScore,
  rankInitiatives,
  type ScoringMethod
} from '../../lib/prioritization';

interface PrioritizationModuleProps {
  initiatives: PrioritizationInitiative[];
  onNavigateTab: (tab: NavigationTab) => void;
  onSelectInitiativeForPrd?: (init: PrioritizationInitiative) => void;
}

export const PrioritizationModule: React.FC<PrioritizationModuleProps> = ({
  initiatives: initialInitiatives,
  onNavigateTab,
  onSelectInitiativeForPrd,
}) => {
  const [scoringMethod, setScoringMethod] = useState<ScoringMethod>('RICE');
  const [items, setItems] = useState<PrioritizationInitiative[]>(initialInitiatives);
  
  // Rank change tracking: Record temporary delta badges (e.g. { 'init-01': +2 })
  const [rankDeltas, setRankDeltas] = useState<Record<string, number>>({});

  const sortedItems = rankInitiatives(items, scoringMethod);

  // Helper to update parameter with live recalculation and rank delta tracking
  const handleUpdateParam = (
    id: string,
    field: 'reachCount' | 'impact' | 'confidence' | 'effort',
    value: number
  ) => {
    // Record current order before update
    const currentOrder = rankInitiatives(items, scoringMethod).map((i) => i.id);

    setItems((prev) => {
      const next = prev.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, [field]: value };
        if (field === 'reachCount') {
          updated.reach = `${value}k transactors`;
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
      });

      // Calculate new order and find deltas
      const nextOrder = rankInitiatives(next, scoringMethod).map((i) => i.id);
      const newDeltas: Record<string, number> = {};

      nextOrder.forEach((itemId, newIdx) => {
        const oldIdx = currentOrder.indexOf(itemId);
        if (oldIdx !== -1 && oldIdx !== newIdx) {
          // Negative index difference means moving up in rank
          newDeltas[itemId] = oldIdx - newIdx;
        }
      });

      if (Object.keys(newDeltas).length > 0) {
        setRankDeltas(newDeltas);
        // Automatically fade badges after 2000ms per specification
        setTimeout(() => {
          setRankDeltas({});
        }, 2000);
      }

      return next;
    });
  };

  // Causal diff explainer between #1 and #2 ranked initiatives
  const top1 = sortedItems[0];
  const top2 = sortedItems[1];
  let causalDiff = '';
  if (top1 && top2) {
    if (top1.confidence > top2.confidence) {
      causalDiff = `Ranked above due to ${Math.round(((top1.confidence - top2.confidence) / top2.confidence) * 100)}% higher Confidence (${(top1.confidence / 10).toFixed(1)} vs ${(top2.confidence / 10).toFixed(1)}).`;
    } else if (top1.reachCount > top2.reachCount) {
      causalDiff = `Ranked above due to ${(top1.reachCount / (top2.reachCount || 1)).toFixed(1)}x higher Reach (${top1.reachCount}k vs ${top2.reachCount}k).`;
    } else if (top1.impact > top2.impact) {
      causalDiff = `Ranked above due to higher projected Impact (${top1.impact} vs ${top2.impact}).`;
    } else {
      causalDiff = `Ranked above due to lower engineering effort requirement (${top1.effort} vs ${top2.effort} weeks).`;
    }
  }

  return (
    <div className="space-y-8 select-none">
      {/* Header */}
      <div className="border-b border-[#1A1A1A] pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="argus-section-label">Decide</span>
          <span className="text-[#1A1A1A]">/</span>
          <span className="argus-section-label text-[#0066FF]">Prioritization Workbench</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="argus-module-title">RICE Prioritization Workbench</h1>
            <p className="argus-prose text-xs text-[#6B7280] mt-0.5">
              Live sensitivity analysis and algorithmic roadmap rank resolution for checkout initiatives.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#9CA3AF]">
            <span className="argus-status-dot bg-[#00FF88] argus-status-dot-pulse" />
            <span>{items.length} Active Candidates</span>
          </div>
        </div>
      </div>

      {/* Side-by-Side Layout: Left Slider Table, Right Live-Ranked Dynamic Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 7 cols: Table of initiatives with 4 inline sliders per row */}
        <section className="lg:col-span-7 bg-[#0A0A0A] border border-[#1A1A1A] rounded-[6px] p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1A1A1A]">
            <div>
              <h2 className="argus-module-title text-[15px]">Candidate Initiatives</h2>
              <span className="argus-section-label text-[11px]">Adjust Reach, Impact, Confidence, Effort inline</span>
            </div>
          </div>

          <div className="divide-y divide-[#1A1A1A]">
            {items.map((item) => (
              <div key={item.id} className="py-4 first:pt-0 last:pb-0 space-y-3">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-[14px] font-medium text-[#FFFFFF] truncate">
                    {item.title}
                  </span>
                  <div className="flex items-center gap-2 font-mono text-xs flex-shrink-0">
                    <span className="text-[#6B7280]">{scoringMethod}:</span>
                    <span className="font-bold text-[#00FF88]">
                      {scoringMethod === 'RICE' ? item.riceScore : item.iceScore}
                    </span>
                  </div>
                </div>

                {/* 4 Inline Sliders Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                  {/* Reach */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono text-[#9CA3AF]">
                      <span>Reach</span>
                      <span className="text-[#FFFFFF]">{item.reachCount}k</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="300"
                      step="10"
                      value={item.reachCount}
                      onChange={(e) => handleUpdateParam(item.id, 'reachCount', Number(e.target.value))}
                      className="w-full cursor-pointer h-1 bg-[#1A1A1A]"
                    />
                  </div>

                  {/* Impact */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono text-[#9CA3AF]">
                      <span>Impact</span>
                      <span className="text-[#FFFFFF]">{item.impact}x</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="1"
                      value={item.impact}
                      onChange={(e) => handleUpdateParam(item.id, 'impact', Number(e.target.value))}
                      className="w-full cursor-pointer h-1 bg-[#1A1A1A]"
                    />
                  </div>

                  {/* Confidence */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono text-[#9CA3AF]">
                      <span>Conf</span>
                      <span className="text-[#FFFFFF]">{item.confidence}%</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="100"
                      step="10"
                      value={item.confidence}
                      onChange={(e) => handleUpdateParam(item.id, 'confidence', Number(e.target.value))}
                      className="w-full cursor-pointer h-1 bg-[#1A1A1A]"
                    />
                  </div>

                  {/* Effort */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono text-[#9CA3AF]">
                      <span>Effort</span>
                      <span className="text-[#FFFFFF]">{item.effort}w</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="1"
                      value={item.effort}
                      onChange={(e) => handleUpdateParam(item.id, 'effort', Number(e.target.value))}
                      className="w-full cursor-pointer h-1 bg-[#1A1A1A]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right 5 cols: Live-Ranked Dynamic Leaderboard */}
        <section className="lg:col-span-5 bg-[#0A0A0A] border border-[#1A1A1A] rounded-[6px] p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1A1A1A]">
            <h2 className="argus-module-title text-[15px]">Live Dynamic Rank</h2>

            {/* Model Switcher Tabs (RICE / ICE / MoSCoW per specification) */}
            <div className="flex items-center gap-1 p-1 bg-[#050505] border border-[#1A1A1A] rounded-[4px]">
              {(['RICE', 'ICE', 'MoSCoW'] as ScoringMethod[]).map((method) => (
                <button
                  key={method}
                  onClick={() => setScoringMethod(method)}
                  className={`px-2.5 py-1 text-xs font-mono rounded-[2px] transition-colors cursor-pointer ${
                    scoringMethod === method
                      ? 'bg-[#0066FF] text-[#FFFFFF] font-bold'
                      : 'text-[#6B7280] hover:text-[#FFFFFF]'
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          {/* Contextual Causal Diff Explainer between #1 and #2 */}
          {causalDiff && (
            <div className="p-3 bg-[#111111] border border-[#1A1A1A] rounded-[4px] flex items-start gap-2.5 text-xs text-[#D1D5DB] leading-relaxed">
              <Info className="w-4 h-4 text-[#0066FF] flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-mono text-[11px] text-[#6B7280] uppercase tracking-wider block">
                  Causal Sensitivity Rationale
                </span>
                <span>{causalDiff}</span>
              </div>
            </div>
          )}

          {/* Live Ranked List with 150ms positional transition */}
          <div className="space-y-2.5">
            {sortedItems.map((item, idx) => {
              const delta = rankDeltas[item.id];
              return (
                <div
                  key={item.id}
                  className="p-3 bg-[#050505] border border-[#1A1A1A] rounded-[4px] flex items-center justify-between gap-3 group hover:border-[rgba(255,255,255,0.16)] transition-all duration-150"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Rank position number */}
                    <div className="w-6 h-6 rounded bg-[#111111] border border-[#1A1A1A] flex items-center justify-center font-mono text-xs font-bold text-[#FFFFFF] flex-shrink-0">
                      #{idx + 1}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-medium text-[#FFFFFF] truncate">
                          {item.title}
                        </span>

                        {/* Rank change indicator badge: ↑2 or ↓1 for 2000ms */}
                        {delta !== undefined && delta !== 0 && (
                          <span
                            className={`inline-flex items-center gap-0.5 text-[10px] font-mono font-bold px-1.5 py-0.2 rounded transition-opacity duration-300 ${
                              delta > 0
                                ? 'bg-[#00FF88]/15 text-[#00FF88] border border-[#00FF88]/30'
                                : 'bg-[#FF3B30]/15 text-[#FF3B30] border border-[#FF3B30]/30'
                            }`}
                          >
                            {delta > 0 ? (
                              <>
                                <ArrowUp className="w-2.5 h-2.5 inline" />
                                <span>{delta}</span>
                              </>
                            ) : (
                              <>
                                <ArrowDown className="w-2.5 h-2.5 inline" />
                                <span>{Math.abs(delta)}</span>
                              </>
                            )}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-mono text-[#6B7280]">
                        Reach: {item.reachCount}k · Effort: {item.effort}w
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="font-mono text-xs font-bold text-[#00FF88]">
                      {scoringMethod === 'RICE' ? item.riceScore : item.iceScore}
                    </span>
                    <button
                      onClick={() => {
                        if (onSelectInitiativeForPrd) onSelectInitiativeForPrd(item);
                        onNavigateTab('prds');
                      }}
                      className="argus-btn-secondary p-1.5 text-xs cursor-pointer"
                      title="Draft PRD Spec from this initiative"
                    >
                      <FileText className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
