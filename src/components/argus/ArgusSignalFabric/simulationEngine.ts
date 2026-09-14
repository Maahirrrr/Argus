import {
  type SignalSource,
  type SignalEvent,
  type IntelligenceOutput,
  INITIAL_SIGNAL_SOURCES,
  INITIAL_OUTPUTS,
  INITIAL_EVENTS,
} from './signalData';

export interface SimulationStepState {
  sourceId: string;
  outputId: string;
  sourceLabel: string;
  delta: string;
  enginePhase: 'idle' | 'analyzing' | 'insight_created';
  engineMessage: string;
  activeParticleId: number;
  phase: 'in' | 'processing' | 'out' | 'idle';
  event: SignalEvent;
}

export interface ISignalProvider {
  getSources(): SignalSource[];
  getOutputs(): IntelligenceOutput[];
  getLatestEvents(limit?: number): SignalEvent[];
  isLive(): boolean;
  isSimulating(): boolean;
  toggleSimulation(): void;
  setSpeed(speedMs: number): void;
  getSpeed(): number;
  subscribe(callback: (state: SimulationStepState) => void): () => void;
}

export class DemoSignalProvider implements ISignalProvider {
  private sources: SignalSource[] = [...INITIAL_SIGNAL_SOURCES];
  private outputs: IntelligenceOutput[] = [...INITIAL_OUTPUTS];
  private events: SignalEvent[] = [...INITIAL_EVENTS];
  private subscribers: Set<(state: SimulationStepState) => void> = new Set();
  private intervalId: any = null;
  private particleCounter = 0;
  private isRunning = true;
  private speedMs = 6000;
  private stepIndex = 0;

  private scenarios = [
    {
      sourceId: 'src-payments',
      outputId: 'out-opportunity',
      sourceLabel: 'PAYMENTS',
      delta: '+18.4%',
      analyzingMsg: 'payment anomaly...',
      insightMsg: 'Checkout friction (92% confidence)',
      eventTitle: 'PAYMENT SPIKE',
      severity: 'critical' as const,
    },
    {
      sourceId: 'src-feedback',
      outputId: 'out-prd',
      sourceLabel: 'FEEDBACK',
      delta: '+24.1%',
      analyzingMsg: 'feedback cluster...',
      insightMsg: 'Checkout navigation friction (89% confidence)',
      eventTitle: 'FEEDBACK CLUSTER',
      severity: 'warning' as const,
    },
    {
      sourceId: 'src-retention',
      outputId: 'out-decision',
      sourceLabel: 'RETENTION',
      delta: '-1.8%',
      analyzingMsg: 'cohort retention drop...',
      insightMsg: 'ClickHouse pipeline latency culprit (91% confidence)',
      eventTitle: 'RETENTION SHIFT',
      severity: 'warning' as const,
    },
    {
      sourceId: 'src-support',
      outputId: 'out-experiment',
      sourceLabel: 'SUPPORT',
      delta: '+16.2%',
      analyzingMsg: 'ticket escalation burst...',
      insightMsg: 'Deploy instant failover circuit breaker (94% confidence)',
      eventTitle: 'SUPPORT CLUSTER',
      severity: 'info' as const,
    },
  ];

  constructor() {
    this.startLoop();
  }

  private startLoop() {
    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      if (!this.isRunning) return;
      this.runNextScenario();
    }, this.speedMs);
  }

  public runNextScenario() {
    const scenario = this.scenarios[this.stepIndex % this.scenarios.length];
    this.stepIndex++;

    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const newEvent: SignalEvent = {
      id: 'ev-' + Date.now(),
      timestamp: timeStr,
      sourceId: scenario.sourceId,
      title: scenario.eventTitle,
      value: scenario.delta,
      severity: scenario.severity,
    };
    this.events = [newEvent, ...this.events.slice(0, 7)];

    const pId = ++this.particleCounter;

    // Step 1: Particle travels from source to ARGUS
    this.notify({
      sourceId: scenario.sourceId,
      outputId: scenario.outputId,
      sourceLabel: scenario.sourceLabel,
      delta: scenario.delta,
      enginePhase: 'analyzing',
      engineMessage: scenario.analyzingMsg,
      activeParticleId: pId,
      phase: 'in',
      event: newEvent,
    });

    // Step 2: Arrival at ARGUS -> pulse engine & switch to insight
    setTimeout(() => {
      this.notify({
        sourceId: scenario.sourceId,
        outputId: scenario.outputId,
        sourceLabel: scenario.sourceLabel,
        delta: scenario.delta,
        enginePhase: 'insight_created',
        engineMessage: scenario.insightMsg,
        activeParticleId: pId,
        phase: 'processing',
        event: newEvent,
      });

      // Step 3: Downstream particle travels toward output
      setTimeout(() => {
        this.notify({
          sourceId: scenario.sourceId,
          outputId: scenario.outputId,
          sourceLabel: scenario.sourceLabel,
          delta: scenario.delta,
          enginePhase: 'insight_created',
          engineMessage: scenario.insightMsg,
          activeParticleId: pId,
          phase: 'out',
          event: newEvent,
        });

        // Step 4: Reset to nominal idle
        setTimeout(() => {
          this.notify({
            sourceId: scenario.sourceId,
            outputId: scenario.outputId,
            sourceLabel: scenario.sourceLabel,
            delta: scenario.delta,
            enginePhase: 'idle',
            engineMessage: '',
            activeParticleId: pId,
            phase: 'idle',
            event: newEvent,
          });
        }, 1100);
      }, 700);
    }, 950);
  }

  private notify(state: SimulationStepState) {
    this.subscribers.forEach((cb) => cb(state));
  }

  public getSources(): SignalSource[] {
    return this.sources;
  }

  public getOutputs(): IntelligenceOutput[] {
    return this.outputs;
  }

  public getLatestEvents(limit = 6): SignalEvent[] {
    return this.events.slice(0, limit);
  }

  public isLive(): boolean {
    return false; // Honest simulation state
  }

  public isSimulating(): boolean {
    return this.isRunning;
  }

  public toggleSimulation() {
    this.isRunning = !this.isRunning;
  }

  public setSpeed(speedMs: number) {
    this.speedMs = Math.max(2000, speedMs);
    this.startLoop();
  }

  public getSpeed(): number {
    return this.speedMs;
  }

  public subscribe(callback: (state: SimulationStepState) => void): () => void {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }
}

/**
 * RealtimeSignalProvider is an extensible stub ready for
 * WebSocket, SSE, or API polling when connected to a live backend.
 */
export class RealtimeSignalProvider implements ISignalProvider {
  public getSources(): SignalSource[] { return INITIAL_SIGNAL_SOURCES; }
  public getOutputs(): IntelligenceOutput[] { return INITIAL_OUTPUTS; }
  public getLatestEvents(): SignalEvent[] { return INITIAL_EVENTS; }
  public isLive(): boolean { return true; }
  public isSimulating(): boolean { return false; }
  public toggleSimulation(): void {}
  public setSpeed(_s: number): void {}
  public getSpeed(): number { return 1000; }
  public subscribe(_cb: (state: SimulationStepState) => void): () => void {
    return () => {};
  }
}

export const demoSignalProvider = new DemoSignalProvider();
