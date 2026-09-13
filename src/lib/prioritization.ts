import type { PrioritizationInitiative } from '../types/finpilot';

export type ScoringMethod = 'RICE' | 'ICE' | 'MoSCoW';

export function calculateRiceScore(reach: number, impact: number, confidence: number, effort: number): number {
  if (effort <= 0) return 0;
  // Standard RICE formula: (Reach in K * Impact 1-10 * (Confidence / 100)) / Effort
  const raw = (reach * impact * (confidence / 100)) / effort;
  return Number(raw.toFixed(1));
}

export function calculateIceScore(impact: number, confidence: number, effort: number): number {
  // Ease (1-10): Inverse of effort (11 - effort)
  const ease = Math.max(1, 11 - effort);
  const raw = (impact * (confidence / 10) * ease) / 10;
  return Number(raw.toFixed(1));
}

export function rankInitiatives(
  initiatives: PrioritizationInitiative[],
  method: ScoringMethod = 'RICE'
): PrioritizationInitiative[] {
  return [...initiatives].sort((a, b) => {
    if (method === 'RICE') return b.riceScore - a.riceScore;
    if (method === 'ICE') return b.iceScore - a.iceScore;
    return b.riceScore - a.riceScore;
  });
}

export interface ScenarioSimulation {
  initiativeId: string;
  originalEffort: number;
  simulatedEffort: number;
  originalRice: number;
  simulatedRice: number;
  originalRank: number;
  simulatedRank: number;
  explanation: string;
}

export function simulateDecisionScenario(
  initiatives: PrioritizationInitiative[],
  targetId: string,
  newEffort: number
): ScenarioSimulation {
  const originalRanked = rankInitiatives(initiatives, 'RICE');
  const originalIndex = originalRanked.findIndex(i => i.id === targetId);
  const originalItem = originalRanked[originalIndex];

  const simulatedList = initiatives.map(item => {
    if (item.id === targetId) {
      const simulatedRice = calculateRiceScore(item.reachCount, item.impact, item.confidence, newEffort);
      const simulatedIce = calculateIceScore(item.impact, item.confidence, newEffort);
      return {
        ...item,
        effort: newEffort,
        riceScore: simulatedRice,
        iceScore: simulatedIce,
      };
    }
    return item;
  });

  const simulatedRanked = rankInitiatives(simulatedList, 'RICE');
  const simulatedIndex = simulatedRanked.findIndex(i => i.id === targetId);

  const origRank = originalIndex + 1;
  const simRank = simulatedIndex + 1;

  let explanation = '';
  if (simRank > origRank) {
    const passedItem = originalRanked[origRank] ? originalRanked[origRank].title : 'other roadmap items';
    explanation = `Increasing engineering effort from ${originalItem.effort} to ${newEffort} sprints reduces expected ROI and moves the initiative from #${origRank} behind "${passedItem}".`;
  } else if (simRank < origRank) {
    explanation = `Reducing engineering effort from ${originalItem.effort} to ${newEffort} sprints boosts ROI velocity, elevating ranking to #${simRank}.`;
  } else {
    explanation = `Adjusting effort to ${newEffort} sprints shifts RICE score to ${simulatedList.find(i => i.id === targetId)?.riceScore}, but the initiative retains rank #${simRank} due to its dominant reach and confidence.`;
  }

  return {
    initiativeId: targetId,
    originalEffort: originalItem.effort,
    simulatedEffort: newEffort,
    originalRice: originalItem.riceScore,
    simulatedRice: simulatedList.find(i => i.id === targetId)!.riceScore,
    originalRank: origRank,
    simulatedRank: simRank,
    explanation,
  };
}
