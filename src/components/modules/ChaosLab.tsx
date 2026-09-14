import React, { useState, useEffect, useRef } from 'react';
import {
  Zap,
  RotateCcw,
  CheckCircle2,
  FileText,
  Clock,
  Server
} from 'lucide-react';
import type { NavigationTab } from '../../types/argus';

interface ChaosLabProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onShowToast?: (msg: string) => void;
}

export const ChaosLab: React.FC<ChaosLabProps> = ({
  onNavigateTab,
  onShowToast,
}) => {
  // Scenario Builder Inputs
  const [selectedBank, setSelectedBank] = useState<'HDFC' | 'ICICI' | 'SBI' | 'Axis'>('HDFC');
  const [latencyMs, setLatencyMs] = useState<number>(1400);
  const [failureRate, setFailureRate] = useState<number>(45);
  const [durationSec, setDurationSec] = useState<number>(60);

  // Simulation State: 'idle' | 'running' | 'recovered'
  const [simulationState, setSimulationState] = useState<'idle' | 'running' | 'recovered'>('idle');
  const [elapsedSec, setElapsedSec] = useState<number>(0);
  const [gmvCounter, setGmvCounter] = useState<number>(0);

  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Rate of GMV loss/salvaged: ₹14,200/sec base scaled by failure rate
  const gmvRatePerSec = Math.round(14200 * (failureRate / 40));

  // requestAnimationFrame counter loop
  useEffect(() => {
    if (simulationState === 'idle') {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      return;
    }

    const animate = (time: number) => {
      if (lastTimeRef.current != null) {
        const delta = (time - lastTimeRef.current) / 1000;
        setGmvCounter((prev) => prev + gmvRatePerSec * delta);
      }
      lastTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    lastTimeRef.current = performance.now();
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [simulationState, gmvRatePerSec]);

  // Elapsed seconds timer
  useEffect(() => {
    let interval: any = null;
    if (simulationState === 'running' || simulationState === 'recovered') {
      interval = setInterval(() => {
        setElapsedSec((prev) => {
          if (prev >= durationSec && simulationState === 'running') {
            setSimulationState('idle');
            if (onShowToast) onShowToast('Simulation duration reached.');
            return durationSec;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [simulationState, durationSec, onShowToast]);

  const handleRunSimulation = () => {
    setSimulationState('running');
    setElapsedSec(0);
    setGmvCounter(0);
    if (onShowToast) {
      onShowToast(`Injected ${latencyMs}ms latency on ${selectedBank} switch (${failureRate}% drop).`);
    }
  };

  const handleTriggerFailover = () => {
    setSimulationState('recovered');
    if (onShowToast) {
      onShowToast('Autonomous Circuit-Breaker deployed. Traffic shifted to ICICI & Axis rails.');
    }
  };

  const handleReset = () => {
    setSimulationState('idle');
    setElapsedSec(0);
    setGmvCounter(0);
  };

  const handleExportPostMortem = () => {
    onNavigateTab('prds');
  };

  // Dynamic traffic weights based on simulation state
  const isRecovered = simulationState === 'recovered';
  const isRunning = simulationState === 'running';

  // Bank weights: [HDFC, ICICI, Axis]
  const trafficWeights = isRecovered
    ? { primary: 5, secondary: 70, tertiary: 25 }
    : isRunning
    ? { primary: 80, secondary: 10, tertiary: 10 }
    : { primary: 60, secondary: 25, tertiary: 15 };

  return (
    <div className="space-y-8 select-none">
      {/* Module Header */}
      <div className="border-b border-[#1A1A1A] pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="argus-section-label">Resilience Engineering</span>
          <span className="text-[#1A1A1A]">/</span>
          <span className="argus-section-label text-[#0066FF]">Chaos Failover Lab</span>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="argus-module-title">Chaos Failover Lab</h1>
          <div className="flex items-center gap-2 text-xs font-mono text-[#9CA3AF]">
            <span
              className={`argus-status-dot ${
                isRunning
                  ? 'bg-[#FF3B30] argus-status-dot-pulse-danger'
                  : isRecovered
                  ? 'bg-[#00FF88] argus-status-dot-pulse'
                  : 'bg-[#6B7280]'
              }`}
            />
            <span>
              {isRunning
                ? 'SIMULATION RUNNING'
                : isRecovered
                ? 'FAILOVER ACTIVE (RECOVERED)'
                : 'ENGINE IDLE'}
            </span>
          </div>
        </div>
      </div>

      {/* Two-Column Layout: Left Scenario Builder, Right Live Simulation View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (5 cols): Scenario Builder */}
        <section className="lg:col-span-5 bg-[#0A0A0A] border border-[#1A1A1A] rounded-[6px] p-5 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#1A1A1A]">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#0066FF]" />
              <h2 className="argus-module-title text-[15px]">Scenario Builder</h2>
            </div>
            {simulationState !== 'idle' && (
              <button
                onClick={handleReset}
                className="text-xs font-mono text-[#6B7280] hover:text-[#FFFFFF] flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          <div className="space-y-4">
            {/* Bank Selection */}
            <div>
              <label className="argus-section-label block mb-1.5">Target Bank Switch</label>
              <div className="grid grid-cols-4 gap-1.5 p-1 bg-[#050505] border border-[#1A1A1A] rounded-[4px]">
                {(['HDFC', 'ICICI', 'SBI', 'Axis'] as const).map((b) => (
                  <button
                    key={b}
                    disabled={simulationState !== 'idle'}
                    onClick={() => setSelectedBank(b)}
                    className={`py-1.5 text-xs font-mono rounded-[3px] transition-colors cursor-pointer disabled:cursor-not-allowed ${
                      selectedBank === b
                        ? 'bg-[#111111] text-[#FFFFFF] font-bold border border-[#1A1A1A]'
                        : 'text-[#6B7280] hover:text-[#FFFFFF]'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Latency Injection */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="argus-section-label">Latency Injection Amount</label>
                <span className="font-mono text-xs font-bold text-[#FF3B30]">+{latencyMs}ms</span>
              </div>
              <input
                type="range"
                min="200"
                max="4000"
                step="100"
                disabled={simulationState !== 'idle'}
                value={latencyMs}
                onChange={(e) => setLatencyMs(Number(e.target.value))}
                className="w-full cursor-pointer disabled:cursor-not-allowed"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#6B7280] mt-1">
                <span>+200ms (P50)</span>
                <span>+4000ms (Timeout)</span>
              </div>
            </div>

            {/* Failure Rate */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="argus-section-label">Simulated Failure Rate</label>
                <span className="font-mono text-xs font-bold text-[#FF3B30]">{failureRate}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                step="5"
                disabled={simulationState !== 'idle'}
                value={failureRate}
                onChange={(e) => setFailureRate(Number(e.target.value))}
                className="w-full cursor-pointer disabled:cursor-not-allowed"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#6B7280] mt-1">
                <span>10% Degradation</span>
                <span>90% Complete Outage</span>
              </div>
            </div>

            {/* Duration */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="argus-section-label">Simulation Duration</label>
                <span className="font-mono text-xs font-bold text-[#FFFFFF]">{durationSec}s</span>
              </div>
              <input
                type="range"
                min="15"
                max="120"
                step="15"
                disabled={simulationState !== 'idle'}
                value={durationSec}
                onChange={(e) => setDurationSec(Number(e.target.value))}
                className="w-full cursor-pointer disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleRunSimulation}
              disabled={simulationState !== 'idle'}
              className="w-full argus-btn-primary py-2.5 text-xs font-semibold uppercase tracking-wider disabled:opacity-40"
            >
              Run Simulation
            </button>
          </div>
        </section>

        {/* Right Column (7 cols): Live Simulation View */}
        <section className="lg:col-span-7 bg-[#0A0A0A] border border-[#1A1A1A] rounded-[6px] p-5 min-h-[420px] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#1A1A1A] mb-4">
              <h2 className="argus-module-title text-[15px]">Live Simulation View</h2>
              <div className="flex items-center gap-2 text-xs font-mono text-[#6B7280]">
                <Clock className="w-3.5 h-3.5" />
                <span>Elapsed: {elapsedSec}s / {durationSec}s</span>
              </div>
            </div>

            {/* IDLE STATE: Clean empty state or summary, ZERO default blinking numbers */}
            {simulationState === 'idle' ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#111111] border border-[#1A1A1A] flex items-center justify-center mx-auto text-[#6B7280]">
                  <Server className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-[14px] font-medium text-[#FFFFFF]">Simulation Engine Standby</p>
                  <p className="argus-prose text-xs text-[#6B7280] mx-auto">
                    Configure parameters in the Scenario Builder and click "Run Simulation" to initialize live telemetry and routing topology.
                  </p>
                </div>
                <div className="pt-2 text-[11px] font-mono text-[#6B7280]">
                  Previous Run: HDFC Bank Switch (+1,400ms) · ₹1.14 Cr Salvaged
                </div>
              </div>
            ) : (
              /* ACTIVE / RUNNING / RECOVERED STATE */
              <div className="space-y-6 animate-in fade-in duration-150">
                {/* Real-time Ticking GMV Counter via requestAnimationFrame */}
                <div className="p-4 bg-[#050505] border border-[#1A1A1A] rounded-[4px] flex items-center justify-between">
                  <div>
                    <span className="argus-section-label block mb-1">
                      {isRecovered ? 'Total GMV Salvaged' : 'Real-Time GMV at Risk'}
                    </span>
                    <div
                      className={`argus-data-lg ${
                        isRecovered ? 'text-[#00FF88]' : 'text-[#FF3B30]'
                      }`}
                    >
                      ₹{(gmvCounter / 100000).toFixed(2)} Lakhs
                    </div>
                  </div>
                  <div className="text-right font-mono text-xs">
                    <span className="text-[#6B7280] block">Velocity</span>
                    <span className={isRecovered ? 'text-[#00FF88]' : 'text-[#FF3B30]'}>
                      {isRecovered ? '+' : '-'}₹{gmvRatePerSec.toLocaleString()}/sec
                    </span>
                  </div>
                </div>

                {/* 3-Bank Routing Diagram: Line thickness shows dynamic traffic weights */}
                <div className="bg-[#050505] border border-[#1A1A1A] rounded-[4px] p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-[#6B7280]">
                    <span>Routing Topology</span>
                    <span>Weights: Primary {trafficWeights.primary}% | ICICI {trafficWeights.secondary}% | Axis {trafficWeights.tertiary}%</span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-2">
                    {/* Primary (Failed Bank) */}
                    <div
                      className={`p-3 rounded border text-center ${
                        isRecovered
                          ? 'bg-[#0A0A0A] border-[#1A1A1A] opacity-60'
                          : 'bg-[#FF3B30]/10 border-[#FF3B30]/40'
                      }`}
                    >
                      <span className="text-[11px] font-mono text-[#9CA3AF] block">Primary Switch</span>
                      <span className="text-xs font-bold text-[#FFFFFF] block">{selectedBank} Bank</span>
                      <span
                        className={`text-xs font-mono font-bold mt-1 block ${
                          isRecovered ? 'text-[#6B7280]' : 'text-[#FF3B30]'
                        }`}
                      >
                        {trafficWeights.primary}% traffic
                      </span>
                    </div>

                    {/* Secondary Bank (ICICI) */}
                    <div
                      className={`p-3 rounded border text-center ${
                        isRecovered
                          ? 'bg-[#00FF88]/10 border-[#00FF88]/40'
                          : 'bg-[#0A0A0A] border-[#1A1A1A]'
                      }`}
                    >
                      <span className="text-[11px] font-mono text-[#9CA3AF] block">Failover Target 1</span>
                      <span className="text-xs font-bold text-[#FFFFFF] block">ICICI Direct</span>
                      <span
                        className={`text-xs font-mono font-bold mt-1 block ${
                          isRecovered ? 'text-[#00FF88]' : 'text-[#9CA3AF]'
                        }`}
                      >
                        {trafficWeights.secondary}% traffic
                      </span>
                    </div>

                    {/* Tertiary Bank (Axis) */}
                    <div
                      className={`p-3 rounded border text-center ${
                        isRecovered
                          ? 'bg-[#00FF88]/10 border-[#00FF88]/40'
                          : 'bg-[#0A0A0A] border-[#1A1A1A]'
                      }`}
                    >
                      <span className="text-[11px] font-mono text-[#9CA3AF] block">Failover Target 2</span>
                      <span className="text-xs font-bold text-[#FFFFFF] block">Axis Acquiring</span>
                      <span
                        className={`text-xs font-mono font-bold mt-1 block ${
                          isRecovered ? 'text-[#00FF88]' : 'text-[#9CA3AF]'
                        }`}
                      >
                        {trafficWeights.tertiary}% traffic
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Actions */}
          {simulationState !== 'idle' && (
            <div className="pt-4 border-t border-[#1A1A1A] mt-4">
              {isRunning && (
                <div className="space-y-2">
                  <button
                    onClick={handleTriggerFailover}
                    disabled={elapsedSec < 5}
                    className="w-full argus-btn-primary py-2.5 text-xs font-medium uppercase tracking-wider disabled:opacity-40"
                  >
                    Trigger Autonomous Failover
                  </button>
                  {elapsedSec < 5 && (
                    <p className="text-[11px] font-mono text-[#6B7280] text-center">
                      Telemetry stabilization lock: observation window requires 5s ({5 - elapsedSec}s remaining)
                    </p>
                  )}
                </div>
              )}

              {isRecovered && (
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#00FF88]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Routing Stabilized. Outage Mitigated.</span>
                  </div>
                  {/* Single Post-sim CTA per spec: "Export Post-Mortem PRD" */}
                  <button
                    onClick={handleExportPostMortem}
                    className="argus-btn-primary py-2 px-4 text-xs font-medium cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Export Post-Mortem PRD</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
