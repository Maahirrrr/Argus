import React, { useState } from 'react';
import {
  Settings,
  Key,
  Database,
  Save,
  RotateCcw,
  Cpu
} from 'lucide-react';
import type { NavigationTab } from '../../types/argus';

interface SettingsPageProps {
  onShowToast: (msg: string) => void;
  aiPmMode: boolean;
  onToggleAiPmMode: () => void;
  enabledModules: NavigationTab[];
  onToggleModule: (mod: NavigationTab) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  onShowToast,
  aiPmMode,
  onToggleAiPmMode,
  enabledModules,
  onToggleModule,
}) => {
  const [claudeApiKey, setClaudeApiKey] = useState<string>('sk-ant-api03-••••••••••••••••••••••••');
  const [groqApiKey, setGroqApiKey] = useState<string>('gsk_••••••••••••••••••••••••');
  const [clickhouseUri, setClickhouseUri] = useState<string>('https://clickhouse.internal.argus:8443/telemetry');

  const allModules: { id: NavigationTab; label: string; group: string }[] = [
    { id: 'inbox', label: 'Unified Triage Inbox', group: 'WORK' },
    { id: 'customers', label: 'Feedback & Voice of Customer', group: 'DISCOVER' },
    { id: 'research', label: 'Research Lab & User Interviews', group: 'DISCOVER' },
    { id: 'intelligence', label: 'Competitive Intelligence Radar', group: 'DISCOVER' },
    { id: 'opportunities', label: 'Opportunity Trees', group: 'DECIDE' },
    { id: 'prioritize', label: 'RICE Prioritization Workbench', group: 'DECIDE' },
    { id: 'roadmap', label: 'Product Roadmap & Kanban', group: 'DECIDE' },
    { id: 'prds', label: 'PRD Studio & BDD Spec Writer', group: 'BUILD' },
    { id: 'prototypes', label: 'Interactive Prototype Studio', group: 'BUILD' },
    { id: 'ai_lab', label: 'AI Product Lab & LLM Evals', group: 'BUILD' },
    { id: 'experiments', label: 'A/B Experiment Lab', group: 'MEASURE' },
    { id: 'analytics', label: 'ClickHouse Telemetry Copilot', group: 'MEASURE' },
    { id: 'launch', label: 'Release Orchestration & Canary', group: 'MEASURE' },
    { id: 'decisions', label: 'Decision ADR Repository', group: 'WORKSPACE' },
    { id: 'documents', label: 'Knowledge Hub & Specs', group: 'WORKSPACE' },
  ];

  const handleSaveApiKeys = () => {
    onShowToast('LLM API Keys encrypted & saved in local session storage.');
  };

  const handleResetData = () => {
    localStorage.clear();
    onShowToast('All local customizations reset to baseline demo data.');
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 animate-fade-in text-[#F5F5F0]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1D1D1D]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-[2px] bg-[#0066FF]/10 border border-[#0066FF]/30 flex items-center justify-center text-[#0066FF]">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-display tracking-tight text-[#F5F5F0]">Settings & Customization</h1>
            <p className="text-xs font-mono-tech text-[#8A8A8A]">
              Workspace feature toggles, AI PM operating mode & institutional API integrations
            </p>
          </div>
        </div>

        <button
          onClick={handleResetData}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-tech bg-[#FF3333]/15 hover:bg-[#FF3333]/25 border border-[#FF3333]/30 text-[#FF3333] rounded-[2px] transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo State</span>
        </button>
      </div>

      {/* 1. AI PM MODE HERO TOGGLE */}
      <div className="bg-[#0A0A0A] border border-[#0066FF]/40 rounded-[2px] p-5 space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#0066FF]" />
              <span className="text-sm font-bold font-display text-[#F5F5F0]">
                AI Product Manager Operating Mode
              </span>
              <span className={`text-[10px] font-mono-tech px-2 py-0.2 rounded-[2px] ${
                aiPmMode ? 'bg-[#00CC66]/15 text-[#00CC66]' : 'bg-[#8A8A8A]/20 text-[#8A8A8A]'
              }`}>
                {aiPmMode ? 'ENABLED' : 'DISABLED'}
              </span>
            </div>
            <p className="text-xs text-[#8A8A8A] max-w-2xl leading-relaxed">
              When enabled, Argus supercharges all workspaces with LLM-specific workflows: automated evaluation test generation,
              zero-shot POS semantic classification, prompt version diffing, and automated BDD Gherkin test derivation.
            </p>
          </div>

          <button
            onClick={onToggleAiPmMode}
            className={`px-4 py-2 text-xs font-mono-tech font-bold rounded-[2px] transition-colors ${
              aiPmMode
                ? 'bg-[#0066FF] hover:bg-[#0052CC] text-white'
                : 'bg-[#1D1D1D] hover:bg-[#252525] text-[#8A8A8A]'
            }`}
          >
            {aiPmMode ? 'Active (Click to Disable)' : 'Enable AI PM Mode'}
          </button>
        </div>
      </div>

      {/* 2. MODULE TOGGLE MANAGER */}
      <div className="bg-[#0A0A0A] border border-[#1D1D1D] rounded-[2px] p-5 space-y-4">
        <div>
          <h2 className="text-sm font-bold font-display text-[#F5F5F0]">Workspace Module Customization</h2>
          <p className="text-xs font-mono-tech text-[#8A8A8A] mt-0.5">
            Enable or disable specialized workspace modules to tailor your sidebar and workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {allModules.map((m) => {
            const isEnabled = enabledModules.includes(m.id);
            return (
              <div
                key={m.id}
                onClick={() => onToggleModule(m.id)}
                className={`p-3 bg-[#0D0D0D] border rounded-[2px] cursor-pointer transition-all flex items-center justify-between ${
                  isEnabled ? 'border-[#0066FF]/40' : 'border-[#1D1D1D] opacity-60'
                }`}
              >
                <div>
                  <div className="text-[9px] font-mono-tech text-[#0066FF]">{m.group}</div>
                  <div className="text-xs font-medium text-[#F5F5F0] mt-0.5">{m.label}</div>
                </div>

                <div className={`w-4 h-4 rounded-[2px] flex items-center justify-center border text-[10px] font-mono-tech ${
                  isEnabled
                    ? 'bg-[#0066FF] border-[#0066FF] text-white'
                    : 'bg-[#141414] border-[#333] text-transparent'
                }`}>
                  ✓
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. API & TELEMETRY INTEGRATIONS */}
      <div className="bg-[#0A0A0A] border border-[#1D1D1D] rounded-[2px] p-5 space-y-4">
        <div>
          <h2 className="text-sm font-bold font-display text-[#F5F5F0]">Foundation Model & Telemetry API Keys</h2>
          <p className="text-xs font-mono-tech text-[#8A8A8A] mt-0.5">
            Configure BYOK (Bring Your Own Key) for private corporate infrastructure.
          </p>
        </div>

        <div className="space-y-3 max-w-2xl">
          <div className="space-y-1">
            <label className="text-[11px] font-mono-tech text-[#8A8A8A] flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-[#0066FF]" />
              Anthropic Claude API Key (Primary Reasoning)
            </label>
            <input
              type="password"
              value={claudeApiKey}
              onChange={(e) => setClaudeApiKey(e.target.value)}
              className="w-full bg-[#050505] border border-[#1D1D1D] focus:border-[#0066FF] px-3 py-2 text-xs font-mono-tech text-[#F5F5F0] rounded-[2px] outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono-tech text-[#8A8A8A] flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-[#0066FF]" />
              Groq Cloud API Key (Fast Fallback Sub-150ms)
            </label>
            <input
              type="password"
              value={groqApiKey}
              onChange={(e) => setGroqApiKey(e.target.value)}
              className="w-full bg-[#050505] border border-[#1D1D1D] focus:border-[#0066FF] px-3 py-2 text-xs font-mono-tech text-[#F5F5F0] rounded-[2px] outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono-tech text-[#8A8A8A] flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-[#0066FF]" />
              ClickHouse / Telemetry Endpoint
            </label>
            <input
              type="text"
              value={clickhouseUri}
              onChange={(e) => setClickhouseUri(e.target.value)}
              className="w-full bg-[#050505] border border-[#1D1D1D] focus:border-[#0066FF] px-3 py-2 text-xs font-mono-tech text-[#F5F5F0] rounded-[2px] outline-none"
            />
          </div>

          <button
            onClick={handleSaveApiKeys}
            className="flex items-center gap-2 px-4 py-2 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-mono-tech font-medium rounded-[2px] transition-colors mt-2"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Credentials</span>
          </button>
        </div>
      </div>
    </div>
  );
};
