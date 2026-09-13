import type { PrioritizationInitiative } from '../types/finpilot';

export type ScoringMethod = 'RICE' | 'ICE' | 'MoSCoW';

export function calculateRiceScore(reach: number, impact: number, confidence: number, effort: number): number {
  if (effort <= 0) return 0;
  // Normalized: (Reach * Impact * Confidence) / Effort / 100
  return Math.round((reach * impact * confidence) / effort);
}

export function calculateIceScore(impact: number, confidence: number, effort: number): number {
  // Ease is inverse of effort (1 to 10): Ease = 11 - Effort
  const ease = Math.max(1, 11 - effort);
  return Number(((impact * confidence * ease) / 10).toFixed(1));
}

export function rankInitiatives(
  initiatives: PrioritizationInitiative[],
  method: ScoringMethod
): PrioritizationInitiative[] {
  return [...initiatives].sort((a, b) => {
    if (method === 'RICE') {
      return b.riceScore - a.riceScore;
    }
    if (method === 'ICE') {
      return b.iceScore - a.iceScore;
    }
    // MoSCoW order
    const priorityWeight: Record<PrioritizationInitiative['moscow'], number> = {
      'Must-Have': 4,
      'Should-Have': 3,
      'Could-Have': 2,
      'Won\'t-Have': 1,
    };
    return priorityWeight[b.moscow] - priorityWeight[a.moscow] || b.riceScore - a.riceScore;
  });
}

export function generateSensitivityExplanation(
  initiative: PrioritizationInitiative,
  paramChanged: 'effort' | 'confidence' | 'impact' | 'reach',
  oldVal: number,
  newVal: number,
  newRank: number,
  prevRank: number
): string {
  if (newRank === prevRank) {
    return `Modified ${paramChanged} from ${oldVal} to ${newVal}. ${initiative.title} maintains rank #${newRank} with resilient margin.`;
  }

  if (newRank < prevRank) {
    return `Rank elevated from #${prevRank} to #${newRank}! Boosting ${paramChanged} (${oldVal} → ${newVal}) unlocks superior capital/engineering efficiency compared to competing roadmap items.`;
  }

  return `Rank slipped from #${prevRank} to #${newRank}. Increasing ${paramChanged} (${oldVal} → ${newVal}) dilutes ROI, elevating items with faster time-to-value.`;
}
