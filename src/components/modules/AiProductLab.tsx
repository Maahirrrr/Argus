import React, { useState } from 'react';
import {
  Cpu,
  CheckCircle2,
  Play,
  RotateCw
} from 'lucide-react';
import type { AiModelBenchmark, PromptVersion, EvaluationTestCase, NavigationTab } from '../../types/argus';
import { DEMO_AI_MODELS, DEMO_PROMPT_VERSIONS, DEMO_EVAL_CASES } from '../../data/demoData';

interface AiProductLabProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onShowToast: (msg: string) => void;
}

export const AiProductLab: React.FC<AiProductLabProps> = ({
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'BENCHMARKS' | 'PROMPTS' | 'EVALS'>('BENCHMARKS');
  const [models] = useState<AiModelBenchmark[]>(DEMO_AI_MODELS);
  const [promptVersions] = useState<PromptVersion[]>(DEMO_PROMPT_VERSIONS);
  const [evalCases] = useState<EvaluationTestCase[]>(DEMO_EVAL_CASES);

  // Prompt Editor State
  const [activePrompt, setActivePrompt] = useState<PromptVersion>(DEMO_PROMPT_VERSIONS[0]);
  const [testVariableInput, setTestVariableInput] = useState<string>('RAZORPAY*BLINKIT GURGAON 1200 INR');
  const [generatedOutput, setGeneratedOutput] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Evals runner state
  const [isRunningEvals, setIsRunningEvals] = useState<boolean>(false);
  const [evalProgress, setEvalProgress] = useState<number>(100);

  const handleRunPromptTest = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedOutput(
        `{\n  "merchant": "Blinkit Online Grocery",\n  "inferred_mcc": 5411,\n  "confidence": 0.988,\n  "recommended_card": "HDFC Millennia",\n  "savings_inr": 60.00,\n  "trust_tier": "FACT"\n}`
      );
      onShowToast('Prompt executed against Claude 3.5 Sonnet (TTFT: 240ms).');
    }, 600);
  };

  const handleRunBatchEvals = () => {
    setIsRunningEvals(true);
    setEvalProgress(10);
    const interval = setInterval(() => {
      setEvalProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunningEvals(false);
          onShowToast('Batch evaluations complete: 96.7% assertion pass rate.');
          return 100;
        }
        return prev + 30;
      });
    }, 300);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 animate-fade-in text-[#F5F5F0]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1D1D1D]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-[2px] bg-[#0066FF]/10 border border-[#0066FF]/30 flex items-center justify-center text-[#0066FF]">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-display tracking-tight text-[#F5F5F0]">AI Product Lab & LLM Evals</h1>
            <p className="text-xs font-mono-tech text-[#8A8A8A]">
              Model benchmarking, zero-shot prompt engineering & continuous CI/CD evaluation suites
            </p>
          </div>
        </div>

        <div className="flex items-center bg-[#0D0D0D] p-1 rounded-[2px] border border-[#1D1D1D]">
          <button
            onClick={() => setActiveTab('BENCHMARKS')}
            className={`px-3 py-1.5 text-xs font-mono-tech rounded-[2px] transition-colors ${
              activeTab === 'BENCHMARKS' ? 'bg-[#0066FF] text-white font-medium' : 'text-[#8A8A8A] hover:text-[#F5F5F0]'
            }`}
          >
            Model Matrix
          </button>
          <button
            onClick={() => setActiveTab('PROMPTS')}
            className={`px-3 py-1.5 text-xs font-mono-tech rounded-[2px] transition-colors ${
              activeTab === 'PROMPTS' ? 'bg-[#0066FF] text-white font-medium' : 'text-[#8A8A8A] hover:text-[#F5F5F0]'
            }`}
          >
            Prompt Studio
          </button>
          <button
            onClick={() => setActiveTab('EVALS')}
            className={`px-3 py-1.5 text-xs font-mono-tech rounded-[2px] transition-colors ${
              activeTab === 'EVALS' ? 'bg-[#0066FF] text-white font-medium' : 'text-[#8A8A8A] hover:text-[#F5F5F0]'
            }`}
          >
            Eval Suite
          </button>
        </div>
      </div>

      {/* 1. BENCHMARK MATRIX */}
      {activeTab === 'BENCHMARKS' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="bg-[#0A0A0A] border border-[#1D1D1D] p-3.5 rounded-[2px]">
              <div className="text-[10px] font-mono-tech text-[#8A8A8A]">CHOSEN PRIMARY MODEL</div>
              <div className="text-sm font-bold font-mono-tech text-[#0066FF] mt-1">Claude 3.5 Sonnet</div>
              <div className="text-[11px] text-[#8A8A8A] mt-0.5">Top reasoning & code gen accuracy</div>
            </div>
            <div className="bg-[#0A0A0A] border border-[#1D1D1D] p-3.5 rounded-[2px]">
              <div className="text-[10px] font-mono-tech text-[#8A8A8A]">FAST ROUTING TIER</div>
              <div className="text-sm font-bold font-mono-tech text-[#00CC66] mt-1">Llama 3.1 70B (Groq)</div>
              <div className="text-[11px] text-[#8A8A8A] mt-0.5">TTFT &lt; 140ms for high-frequency POS</div>
            </div>
            <div className="bg-[#0A0A0A] border border-[#1D1D1D] p-3.5 rounded-[2px]">
              <div className="text-[10px] font-mono-tech text-[#8A8A8A]">ESTIMATED MONTHLY COST</div>
              <div className="text-sm font-bold font-mono-tech text-[#F5F5F0] mt-1">$420 / 10M tokens</div>
              <div className="text-[11px] text-[#8A8A8A] mt-0.5">64% lower than baseline GPT-4</div>
            </div>
            <div className="bg-[#0A0A0A] border border-[#1D1D1D] p-3.5 rounded-[2px]">
              <div className="text-[10px] font-mono-tech text-[#8A8A8A]">AVERAGE HALLUCINATION RATE</div>
              <div className="text-sm font-bold font-mono-tech text-[#00CC66] mt-1">0.8%</div>
              <div className="text-[11px] text-[#8A8A8A] mt-0.5">Strict schema guardrails active</div>
            </div>
          </div>

          <div className="bg-[#0A0A0A] border border-[#1D1D1D] rounded-[2px] overflow-hidden">
            <div className="p-3 bg-[#080808] border-b border-[#1D1D1D] flex items-center justify-between">
              <span className="text-xs font-bold font-mono-tech text-[#F5F5F0]">LLM FOUNDATION MODEL BENCHMARKING</span>
              <span className="text-[10px] font-mono-tech text-[#8A8A8A]">LAST UPDATED: 2 HOURS AGO</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#1D1D1D] text-[10px] font-mono-tech text-[#8A8A8A] bg-[#050505]">
                    <th className="p-3">MODEL & PROVIDER</th>
                    <th className="p-3">TTFT (LATENCY)</th>
                    <th className="p-3">THROUGHPUT</th>
                    <th className="p-3">INPUT / OUTPUT COST</th>
                    <th className="p-3">QUALITY SCORE</th>
                    <th className="p-3">ACTIVE ROLE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1D1D1D]">
                  {models.map((m) => (
                    <tr key={m.id} className="hover:bg-[#0E0E0E] transition-colors">
                      <td className="p-3">
                        <div className="font-semibold text-[#F5F5F0] font-display">{m.name}</div>
                        <div className="text-[10px] font-mono-tech text-[#8A8A8A]">{m.provider}</div>
                      </td>
                      <td className="p-3 font-mono-tech text-[#F5F5F0]">{m.ttftMs || m.latencyP95Ms || 180}ms</td>
                      <td className="p-3 font-mono-tech text-[#0066FF]">{m.tokensPerSecond || 85} tok/s</td>
                      <td className="p-3 font-mono-tech text-[#8A8A8A]">
                        ${m.costPer1kInput || m.costPer1kTokens || 0.003} / ${m.costPer1kOutput || 0.015}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono-tech font-bold text-[#00CC66]">{m.qualityScore || m.accuracyScore || 95}/100</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className={`text-[10px] font-mono-tech px-2 py-0.5 rounded-[2px] ${
                          m.id === 'claude-3-5' ? 'bg-[#0066FF]/15 text-[#0066FF]' :
                          m.id === 'llama-3-groq' ? 'bg-[#00CC66]/15 text-[#00CC66]' :
                          'bg-[#1D1D1D] text-[#8A8A8A]'
                        }`}>
                          {m.id === 'claude-3-5' ? 'Primary PM Reasoning' :
                           m.id === 'llama-3-groq' ? 'Fast Fallback Parser' : 'Shadow Evaluator'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. PROMPT STUDIO */}
      {activeTab === 'PROMPTS' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Prompt Version List */}
          <div className="lg:col-span-4 space-y-2">
            <div className="text-[10px] font-mono-tech text-[#8A8A8A] uppercase mb-2">Prompt Catalog</div>
            {promptVersions.map((pv) => (
              <div
                key={pv.id}
                onClick={() => setActivePrompt(pv)}
                className={`p-3 bg-[#0A0A0A] border rounded-[2px] cursor-pointer transition-all ${
                  activePrompt.id === pv.id ? 'border-[#0066FF] bg-[#0066FF]/5' : 'border-[#1D1D1D] hover:border-[#333]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono-tech text-[#F5F5F0]">{pv.name || pv.feature}</span>
                  <span className="text-[10px] font-mono-tech text-[#0066FF]">v{pv.version}</span>
                </div>
                <div className="text-[11px] text-[#8A8A8A] mt-1">{pv.targetModel || pv.model}</div>
                <div className="text-[10px] font-mono-tech text-[#8A8A8A] mt-2 flex justify-between">
                  <span>Temp: {pv.temperature || 0.2}</span>
                  <span>Accuracy: {((pv.evalPassRate || 0.96) * 100).toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Prompt Editor & Runner */}
          <div className="lg:col-span-8 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[2px] p-4 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1D1D1D]">
              <div>
                <h3 className="text-xs font-bold font-mono-tech text-[#F5F5F0]">{activePrompt.name || activePrompt.feature} (v{activePrompt.version})</h3>
                <div className="text-[10px] font-mono-tech text-[#8A8A8A]">Target Model: {activePrompt.targetModel || activePrompt.model}</div>
              </div>

              <button
                onClick={() => onShowToast('New prompt version committed.')}
                className="px-2.5 py-1 text-xs font-mono-tech bg-[#141414] hover:bg-[#1D1D1D] border border-[#222] text-[#F5F5F0] rounded-[2px]"
              >
                Save Version
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono-tech text-[#8A8A8A]">SYSTEM PROMPT DEFINITION</label>
              <textarea
                value={activePrompt.systemPrompt}
                onChange={(e) => setActivePrompt({ ...activePrompt, systemPrompt: e.target.value })}
                rows={6}
                className="w-full bg-[#050505] border border-[#1D1D1D] focus:border-[#0066FF] p-3 text-xs font-mono-tech text-[#CCCCCC] rounded-[2px] outline-none leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-mono-tech text-[#8A8A8A]">TEST PAYLOAD (USER INPUT)</label>
                <input
                  type="text"
                  value={testVariableInput}
                  onChange={(e) => setTestVariableInput(e.target.value)}
                  className="w-full bg-[#050505] border border-[#1D1D1D] px-3 py-2 text-xs font-mono-tech text-[#F5F5F0] rounded-[2px] outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono-tech text-[#8A8A8A]">HYPERPARAMETERS</label>
                <div className="flex items-center gap-3 pt-2 text-xs font-mono-tech text-[#8A8A8A]">
                  <span>Temperature: {activePrompt.temperature || 0.2}</span>
                  <span>Top P: 0.95</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleRunPromptTest}
              disabled={isGenerating}
              className="flex items-center justify-center gap-2 w-full py-2 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-mono-tech font-medium rounded-[2px] transition-colors"
            >
              {isGenerating ? <RotateCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
              {isGenerating ? 'Generating Model Inference...' : 'Execute Test Inference'}
            </button>

            {generatedOutput && (
              <div className="space-y-1.5 pt-2">
                <div className="text-[10px] font-mono-tech text-[#00CC66] uppercase">Model JSON Output</div>
                <pre className="p-3 bg-[#050505] border border-[#1D1D1D] text-xs font-mono-tech text-[#00CC66] rounded-[2px] overflow-x-auto leading-relaxed">
                  {generatedOutput}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. EVAL SUITE */}
      {activeTab === 'EVALS' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1D1D1D]">
            <div>
              <h3 className="text-sm font-bold font-mono-tech text-[#F5F5F0]">Continuous LLM Assertion Pipeline</h3>
              <p className="text-xs font-mono-tech text-[#8A8A8A]">
                Regression testing across edge cases, hallucination checks & JSON schema conformance
              </p>
            </div>

            <button
              onClick={handleRunBatchEvals}
              disabled={isRunningEvals}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-tech bg-[#0066FF] hover:bg-[#0052CC] text-white rounded-[2px] transition-colors"
            >
              {isRunningEvals ? <RotateCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isRunningEvals ? `Evaluating ${evalProgress}%` : 'Run 24 Assertions'}</span>
            </button>
          </div>

          <div className="bg-[#0A0A0A] border border-[#1D1D1D] rounded-[2px] overflow-hidden">
            <div className="p-3 bg-[#080808] border-b border-[#1D1D1D] flex items-center justify-between text-xs font-mono-tech">
              <span className="text-[#F5F5F0]">EVALUATION TEST RESULTS</span>
              <span className="text-[#00CC66]">100% PASS RATE ON ACTIVE SUITE</span>
            </div>

            <div className="divide-y divide-[#1D1D1D]">
              {evalCases.map((tc) => (
                <div key={tc.id} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="font-mono-tech font-bold text-[#F5F5F0]">{tc.name || tc.inputCase}</span>
                      <span className="text-[10px] font-mono-tech text-[#8A8A8A] bg-[#141414] px-1.5 py-0.2 rounded-[2px]">
                        {tc.metric || 'Classification'}
                      </span>
                    </div>
                    <p className="text-[11px] font-mono-tech text-[#8A8A8A]">
                      Input: <span className="text-[#CCCCCC]">{tc.input || tc.inputCase}</span>
                    </p>
                    <p className="text-[11px] font-mono-tech text-[#0066FF]">
                      Assertion: {tc.expectedOutput || tc.expectedBehavior}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="text-right">
                      <div className="text-[10px] font-mono-tech text-[#8A8A8A]">LATENCY</div>
                      <div className="font-mono-tech text-[#F5F5F0]">{tc.latencyMs}ms</div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-mono-tech text-[#00CC66] bg-[#00CC66]/10 px-2.5 py-1 rounded-[2px]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      PASSED
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
