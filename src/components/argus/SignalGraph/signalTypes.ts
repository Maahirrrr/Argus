import type { NavigationTab } from '../../../types/argus';

export type SignalSeverity = 'critical' | 'high' | 'medium' | 'low';

export interface SignalEvent {
  id: string;
  sourceId: string;
  sourceName: string;
  timestamp: string;
  type: string;
  severity: SignalSeverity;
  confidence: number;
  impact: string;
  destination: NavigationTab;
  title: string;
  metricDelta: string;
  usersAffected: string;
  evidence: string[];
  description: string;
}

export interface SignalSourceNode {
  id: string;
  name: string;
  category: string;
  rate: string;
  status: 'anomaly' | 'high' | 'normal';
  description: string;
  confidence: number;
  lastEventTime: string;
  yRatio: number;
}

export interface DownstreamNode {
  id: string;
  name: string;
  label: string;
  tab: NavigationTab;
  description: string;
  yRatio: number;
}

export interface SignalMetrics {
  activeStreams: number;
  eventsPerDay: string;
  latencyMs: number;
  healthPercent: number;
  status: 'SIMULATION' | 'LIVE';
}
