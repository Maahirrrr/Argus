import React, { useState } from 'react';
import {
  Activity,
  SlidersHorizontal,
  FileText,
  FlaskConical,
  BarChart3,
  Bot,
  Layers,
  ChevronRight
} from 'lucide-react';

import type { ModuleType, ProductProblem, PrioritizationInitiative } from './types/finpilot';
import { FINTECH_PROBLEMS, COMPETING_INITIATIVES } from './data/fintechScenarios';

import { Header } from './components/Header';
import { ProductIntelligence } from './components/ProductIntelligence';
import { PrioritizationEngine } from './components/PrioritizationEngine';
import { PrdCopilot } from './components/PrdCopilot';
import { ExperimentDesigner } from './components/ExperimentDesigner';
import { AnalyticsCopilot } from './components/AnalyticsCopilot';
import { WeeklyAgentReview } from './components/WeeklyAgentReview';
import { FintechBrainFeed } from './components/FintechBrainFeed';

export function App() {
  const [activeModule, setActiveModule] = useState<ModuleType>('intelligence');
  const [selectedProblem, setSelectedProblem] = useState<ProductProblem>(FINTECH_PROBLEMS[0]);
  const [selectedInitiative, setSelectedInitiative] = useState<PrioritizationInitiative | null>(COMPETING_INITIATIVES[0]);

  // Stepper definition for the PM Decision Loop
  const workflowSteps: { id: ModuleType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'intelligence', label: '1. Incident Discovery', icon: Activity },
    { id: 'prioritization', label: '2. AI Prioritization', icon: SlidersHorizontal },
    { id: 'prd', label: '3. PRD Copilot', icon: FileText },
    { id: 'experiment', label: '4. Experiment A/B', icon: FlaskConical },
    { id: 'analytics', label: '5. Telemetry Chat', icon: BarChart3 },
    { id: 'weekly_agent', label: '6. Weekly Health Brief', icon: Bot },
    { id: 'brain_feed', label: '7. Voice & Competitors', icon: Layers },
  ];

  return (
    <div className="min-h-screen bg-[#060608] text-zinc-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Background Decorative Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-600/10 blur-[130px] rounded-full" />
        <div className="absolute top-[40%] right-[-5%] w-[500px] h-[500px] bg-cyan-600/8 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/8 blur-[150px] rounded-full" />
      </div>

      {/* Navigation Header */}
      <Header
        activeModule={activeModule}
        onSelectModule={setActiveModule}
        selectedProblem={selectedProblem}
        onSelectProblem={setSelectedProblem}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 relative z-10 flex flex-col gap-6">

        {/* PM Lifecycle Step Ribbon */}
        <div className="p-3 rounded-2xl bg-[#090a0f]/90 border border-white/[0.08] backdrop-blur-xl flex items-center justify-between gap-2 overflow-x-auto scroll-x shadow-xl">
          <div className="flex items-center gap-1.5 flex-1 min-w-max">
            {workflowSteps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeModule === step.id;
              return (
                <React.Fragment key={step.id}>
                  <button
                    onClick={() => setActiveModule(step.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-600/30'
                        : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-zinc-500'}`} />
                    <span>{step.label}</span>
                  </button>
                  {idx < workflowSteps.length - 1 && (
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-700 flex-shrink-0" />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-white/[0.08] text-[11px] font-mono text-zinc-400 flex-shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>ClickHouse Live · 4.2M events</span>
          </div>
        </div>

        {/* Quick Scenario Preset Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
              Active Incident:
            </span>
            <span className="text-xs font-bold text-white font-syne">
              {selectedProblem.title}
            </span>
            <span className="text-[10px] font-mono text-rose-400 font-bold px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/25">
              {selectedProblem.baseline} → {selectedProblem.current} ({selectedProblem.delta})
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            <span className="text-[10px] font-mono text-zinc-500 mr-1 hidden sm:inline">Switch Incident:</span>
            {FINTECH_PROBLEMS.map((p) => {
              const isSelected = selectedProblem.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedProblem(p)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-indigo-600/30 text-indigo-200 border border-indigo-500/50 font-bold'
                      : 'bg-white/[0.02] text-zinc-400 hover:text-zinc-200 border border-white/[0.04]'
                  }`}
                >
                  {p.metric}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Module Content */}
        <div className="transition-all duration-300">
          {activeModule === 'intelligence' && (
            <ProductIntelligence
              problem={selectedProblem}
              onNavigateToModule={setActiveModule}
            />
          )}

          {activeModule === 'prioritization' && (
            <PrioritizationEngine
              onSelectPrdInitiative={setSelectedInitiative}
              onNavigateToModule={setActiveModule}
            />
          )}

          {activeModule === 'prd' && (
            <PrdCopilot
              selectedInitiative={selectedInitiative}
              onNavigateToModule={setActiveModule}
            />
          )}

          {activeModule === 'experiment' && (
            <ExperimentDesigner
              onNavigateToModule={setActiveModule}
            />
          )}

          {activeModule === 'analytics' && (
            <AnalyticsCopilot
              onNavigateToModule={setActiveModule}
            />
          )}

          {activeModule === 'weekly_agent' && (
            <WeeklyAgentReview
              onNavigateToModule={setActiveModule}
            />
          )}

          {activeModule === 'brain_feed' && (
            <FintechBrainFeed
              onNavigateToModule={setActiveModule}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-white/[0.06] py-8 px-4 sm:px-6 bg-[#07080b]/80 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center">
              <span className="font-mono font-bold text-[10px] text-cyan-300">FP</span>
            </div>
            <div>
              <span className="font-syne font-bold text-sm text-white">FinPilot AI</span>
              <span className="text-zinc-500 text-xs ml-2">Copilot for Fintech Product Managers</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {['Problem Discovery', 'RICE Matrix', 'Automated PRD', 'A/B Guardrails', 'ClickHouse SQL'].map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
export default App;
