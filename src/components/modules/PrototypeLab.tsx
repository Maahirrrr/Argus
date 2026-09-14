import React, { useState } from 'react';
import {
  Boxes,
  Smartphone,
  Tablet,
  Monitor,
  Code2,
  Copy,
  FileText,
  Sliders,
  Terminal,
  Activity,
  RefreshCw
} from 'lucide-react';
import type { PrototypeMockup, NavigationTab } from '../../types/argus';
import { DEMO_PROTOTYPES } from '../../data/demoData';

interface PrototypeLabProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onShowToast: (msg: string) => void;
}

export const PrototypeLab: React.FC<PrototypeLabProps> = ({
  onNavigateTab,
  onShowToast,
}) => {
  const [prototypes] = useState<PrototypeMockup[]>(DEMO_PROTOTYPES);
  const [selectedProto, setSelectedProto] = useState<PrototypeMockup>(DEMO_PROTOTYPES[0]);
  const [deviceFrame, setDeviceFrame] = useState<'DESKTOP' | 'TABLET' | 'MOBILE'>('DESKTOP');
  const [activeCodeTab, setActiveCodeTab] = useState<'REACT' | 'GHERKIN' | 'SPEC'>('REACT');

  // Interactive sandbox state
  const [sampleMccInput, setSampleMccInput] = useState<string>('RAZORPAY*BLINKIT GURGAON');
  const [mccResult, setMccResult] = useState<{ merchant: string; mcc: string; confidence: number; category: string } | null>({
    merchant: 'Blinkit Instant Delivery',
    mcc: '5411 (Grocery & Supermarkets)',
    confidence: 0.984,
    category: 'Grocery'
  });
  const [thresholdCutoff, setThresholdCutoff] = useState<number>(350);
  const [circuitTripped, setCircuitTripped] = useState<boolean>(false);

  const handleTestMccResolve = () => {
    const inputUpper = sampleMccInput.toUpperCase();
    if (inputUpper.includes('BLINKIT') || inputUpper.includes('ZEPTO') || inputUpper.includes('INSTAMART')) {
      setMccResult({ merchant: 'Quick Commerce Grocery', mcc: '5411', confidence: 0.98, category: 'Grocery' });
    } else if (inputUpper.includes('PAYTM') || inputUpper.includes('DMART')) {
      setMccResult({ merchant: 'DMart Hypermarket POS', mcc: '5311', confidence: 0.96, category: 'Department Store' });
    } else if (inputUpper.includes('SWIGGY') || inputUpper.includes('ZOMATO')) {
      setMccResult({ merchant: 'Online Dining Platform', mcc: '5812', confidence: 0.99, category: 'Dining' });
    } else {
      setMccResult({ merchant: 'Uncertain Merchant Descr', mcc: '5999', confidence: 0.62, category: 'Miscellaneous' });
    }
    onShowToast('Semantic POS Resolver executed in 12ms.');
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    onShowToast('Code copied to clipboard.');
  };

  const fallbackReact = `// Auto-generated prototype component
export const PreviewComponent = () => {
  return (
    <div className="p-4 bg-zinc-900 border border-zinc-800 rounded">
      <h3 className="font-bold text-white">${selectedProto.title}</h3>
      <p className="text-zinc-400 text-xs mt-1">${selectedProto.description}</p>
    </div>
  );
};`;

  const fallbackGherkin = `Feature: ${selectedProto.title}
  Scenario: Standard User Flow
    Given user triggers action for ${selectedProto.title}
    When system resolves telemetry signal
    Then appropriate response is rendered with 99% confidence`;

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 animate-fade-in text-[#F5F5F0]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1D1D1D]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-[2px] bg-[#0066FF]/10 border border-[#0066FF]/30 flex items-center justify-center text-[#0066FF]">
            <Boxes className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-display tracking-tight text-[#F5F5F0]">Interactive Prototype Studio</h1>
            <p className="text-xs font-mono-tech text-[#8A8A8A]">
              Low-code AI sandboxes, responsive frame simulation & exportable React/BDD specs
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Device viewport switch */}
          <div className="flex items-center bg-[#0D0D0D] p-1 rounded-[2px] border border-[#1D1D1D]">
            <button
              onClick={() => setDeviceFrame('DESKTOP')}
              className={`p-1.5 rounded-[2px] transition-colors ${
                deviceFrame === 'DESKTOP' ? 'bg-[#1D1D1D] text-[#0066FF]' : 'text-[#8A8A8A] hover:text-[#F5F5F0]'
              }`}
              title="Desktop (1200px)"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceFrame('TABLET')}
              className={`p-1.5 rounded-[2px] transition-colors ${
                deviceFrame === 'TABLET' ? 'bg-[#1D1D1D] text-[#0066FF]' : 'text-[#8A8A8A] hover:text-[#F5F5F0]'
              }`}
              title="Tablet (768px)"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceFrame('MOBILE')}
              className={`p-1.5 rounded-[2px] transition-colors ${
                deviceFrame === 'MOBILE' ? 'bg-[#1D1D1D] text-[#0066FF]' : 'text-[#8A8A8A] hover:text-[#F5F5F0]'
              }`}
              title="Mobile (375px)"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => onNavigateTab('prds')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-tech font-medium bg-[#0066FF] hover:bg-[#0052CC] text-white rounded-[2px] transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Link to PRD</span>
          </button>
        </div>
      </div>

      {/* Prototypes selector tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {prototypes.map((proto) => (
          <div
            key={proto.id}
            onClick={() => setSelectedProto(proto)}
            className={`p-3.5 bg-[#0A0A0A] border rounded-[2px] cursor-pointer transition-all ${
              selectedProto.id === proto.id
                ? 'border-[#0066FF] bg-[#0066FF]/5'
                : 'border-[#1D1D1D] hover:border-[#333]'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono-tech text-[#0066FF]">{proto.category}</span>
              <span className="text-[9px] font-mono-tech text-[#8A8A8A] bg-[#141414] px-1 py-0.5 rounded-[2px]">
                v{proto.version || '1.0'}
              </span>
            </div>
            <h3 className="text-xs font-bold text-[#F5F5F0] font-display line-clamp-1">{proto.title}</h3>
            <p className="text-[11px] text-[#8A8A8A] mt-1 line-clamp-2">{proto.description}</p>
          </div>
        ))}
      </div>

      {/* Interactive Sandbox Canvas */}
      <div className="bg-[#080808] border border-[#1D1D1D] rounded-[2px] p-4">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#1D1D1D]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00CC66] animate-pulse-dot" />
            <span className="text-xs font-mono-tech text-[#F5F5F0] font-bold">
              LIVE PREVIEW: {selectedProto.title}
            </span>
            <span className="text-[10px] font-mono-tech text-[#8A8A8A]">
              [{deviceFrame === 'DESKTOP' ? '1200px' : deviceFrame === 'TABLET' ? '768px' : '375px'}]
            </span>
          </div>

          <button
            onClick={() => onShowToast('Prototype refreshed.')}
            className="flex items-center gap-1 text-[11px] font-mono-tech text-[#8A8A8A] hover:text-[#F5F5F0]"
          >
            <RefreshCw className="w-3 h-3" />
            Reset State
          </button>
        </div>

        {/* Viewport container */}
        <div className="flex justify-center bg-[#050505] p-4 sm:p-8 rounded-[2px] border border-[#141414] min-h-[420px]">
          <div
            className={`w-full transition-all duration-300 bg-[#0A0A0A] border border-[#222] rounded-[3px] p-5 shadow-2xl ${
              deviceFrame === 'MOBILE' ? 'max-w-[375px]' : deviceFrame === 'TABLET' ? 'max-w-[768px]' : 'max-w-full'
            }`}
          >
            {/* 1. If Proto is MCC Parser */}
            {selectedProto.id.includes('mcc') || selectedProto.id.includes('1') ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#1D1D1D]">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#0066FF]" />
                    <span className="text-xs font-bold font-mono-tech text-[#F5F5F0]">Dual-Engine MCC Semantic Resolver</span>
                  </div>
                  <span className="text-[10px] font-mono-tech text-[#00CC66] bg-[#00CC66]/10 px-2 py-0.5 rounded-[2px]">
                    ONLINE
                  </span>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-mono-tech text-[#8A8A8A]">Raw POS / Gateway Descriptor String:</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={sampleMccInput}
                      onChange={(e) => setSampleMccInput(e.target.value)}
                      className="flex-1 bg-[#050505] border border-[#222] focus:border-[#0066FF] px-3 py-2 text-xs font-mono-tech text-[#F5F5F0] rounded-[2px] outline-none"
                    />
                    <button
                      onClick={handleTestMccResolve}
                      className="px-3 py-2 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-mono-tech rounded-[2px] transition-colors"
                    >
                      Resolve
                    </button>
                  </div>
                </div>

                {/* Live output */}
                {mccResult && (
                  <div className="bg-[#050505] border border-[#1D1D1D] rounded-[2px] p-3 space-y-2 text-xs">
                    <div className="text-[10px] font-mono-tech text-[#8A8A8A] uppercase">Resolution Breakdown</div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono-tech">
                      <div className="text-[#8A8A8A]">Matched Merchant: <span className="text-[#F5F5F0]">{mccResult.merchant}</span></div>
                      <div className="text-[#8A8A8A]">Assigned MCC: <span className="text-[#0066FF]">{mccResult.mcc}</span></div>
                      <div className="text-[#8A8A8A]">Confidence: <span className="text-[#00CC66]">{(mccResult.confidence * 100).toFixed(1)}%</span></div>
                      <div className="text-[#8A8A8A]">Reward Group: <span className="text-[#F5F5F0]">{mccResult.category}</span></div>
                    </div>
                  </div>
                )}

                <div className="text-[10px] font-mono-tech text-[#8A8A8A] bg-[#101010] p-2 rounded-[2px] flex items-center gap-2">
                  <Activity className="w-3 h-3 text-[#0066FF]" />
                  <span>Deterministic Rule matches 92.4% · LLM Fallback evaluated in 32ms</span>
                </div>
              </div>
            ) : selectedProto.id.includes('hud') || selectedProto.id.includes('2') ? (
              /* 2. Signal HUD Proto */
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#1D1D1D]">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#0066FF]" />
                    <span className="text-xs font-bold font-mono-tech text-[#F5F5F0]">Telemetry Stream & Latency HUD</span>
                  </div>
                  <span className="text-[10px] font-mono-tech text-[#00CC66]">PING 4ms</span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-[#050505] p-3 rounded-[2px] border border-[#1D1D1D]">
                    <div className="text-[10px] font-mono-tech text-[#8A8A8A]">INGESTION RATE</div>
                    <div className="text-lg font-bold font-mono-tech text-[#F5F5F0] mt-1">1,480/s</div>
                  </div>
                  <div className="bg-[#050505] p-3 rounded-[2px] border border-[#1D1D1D]">
                    <div className="text-[10px] font-mono-tech text-[#8A8A8A]">P99 LATENCY</div>
                    <div className="text-lg font-bold font-mono-tech text-[#0066FF] mt-1">182ms</div>
                  </div>
                  <div className="bg-[#050505] p-3 rounded-[2px] border border-[#1D1D1D]">
                    <div className="text-[10px] font-mono-tech text-[#8A8A8A]">ANOMALY SIGMA</div>
                    <div className="text-lg font-bold font-mono-tech text-[#FF9900] mt-1">+1.82σ</div>
                  </div>
                </div>

                <div className="bg-[#050505] p-3 rounded-[2px] border border-[#1D1D1D] text-xs font-mono-tech space-y-1">
                  <div className="text-[#8A8A8A] text-[10px]">ACTIVE CAUSAL PROBE</div>
                  <div className="text-[#F5F5F0]">SELECT count(*) FROM telemetry.checkout_events WHERE error_code IS NOT NULL;</div>
                  <div className="text-[#00CC66] text-[11px]">0 errors in preceding 120s window</div>
                </div>
              </div>
            ) : (
              /* 3. Circuit Breaker Proto */
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#1D1D1D]">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#0066FF]" />
                    <span className="text-xs font-bold font-mono-tech text-[#F5F5F0]">Autonomous Circuit Breaker Control</span>
                  </div>
                  <span className={`text-[10px] font-mono-tech px-2 py-0.5 rounded-[2px] ${
                    circuitTripped ? 'bg-[#FF3333]/15 text-[#FF3333]' : 'bg-[#00CC66]/15 text-[#00CC66]'
                  }`}>
                    {circuitTripped ? 'CIRCUIT TRIPPED (ISOLATED)' : 'ACTIVE MONITORING'}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-mono-tech">
                    <span className="text-[#8A8A8A]">P99 Latency Threshold Cutoff</span>
                    <span className="text-[#0066FF] font-bold">{thresholdCutoff}ms</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="800"
                    step="25"
                    value={thresholdCutoff}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setThresholdCutoff(val);
                      setCircuitTripped(val < 250);
                    }}
                    className="w-full accent-[#0066FF]"
                  />
                  <p className="text-[11px] text-[#8A8A8A]">
                    If p99 response time exceeds {thresholdCutoff}ms for &gt; 30 seconds, traffic switches immediately to fallback cache.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setCircuitTripped(!circuitTripped);
                    onShowToast(circuitTripped ? 'Circuit restored to normal state.' : 'Emergency circuit breaker tripped manually.');
                  }}
                  className={`w-full py-2 text-xs font-mono-tech rounded-[2px] transition-colors ${
                    circuitTripped
                      ? 'bg-[#00CC66] text-black font-semibold'
                      : 'bg-[#FF3333]/20 text-[#FF3333] border border-[#FF3333]/40 hover:bg-[#FF3333]/30'
                  }`}
                >
                  {circuitTripped ? 'Reset Circuit Breaker' : 'Trigger Emergency Cutoff'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Code Export Tabs */}
      <div className="bg-[#0A0A0A] border border-[#1D1D1D] rounded-[2px] p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#1D1D1D]">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-[#0066FF]" />
            <span className="text-xs font-bold font-mono-tech text-[#F5F5F0]">Exportable Production Code & Test Specs</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-[#0D0D0D] p-0.5 rounded-[2px] border border-[#1D1D1D]">
              {(['REACT', 'GHERKIN', 'SPEC'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveCodeTab(tab)}
                  className={`px-2.5 py-1 text-[11px] font-mono-tech rounded-[2px] transition-colors ${
                    activeCodeTab === tab
                      ? 'bg-[#0066FF] text-white font-medium'
                      : 'text-[#8A8A8A] hover:text-[#F5F5F0]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <button
              onClick={() => handleCopyCode(
                activeCodeTab === 'REACT' ? (selectedProto.codeSnippet || fallbackReact) :
                activeCodeTab === 'GHERKIN' ? (selectedProto.gherkinSpec || fallbackGherkin) :
                JSON.stringify(selectedProto, null, 2)
              )}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-mono-tech bg-[#141414] hover:bg-[#1D1D1D] text-[#F5F5F0] border border-[#222] rounded-[2px] transition-colors"
            >
              <Copy className="w-3 h-3" />
              Copy
            </button>
          </div>
        </div>

        {/* Code Viewport */}
        <pre className="p-3 bg-[#050505] rounded-[2px] border border-[#141414] text-xs font-mono-tech text-[#CCCCCC] overflow-x-auto max-h-64 leading-relaxed">
          {activeCodeTab === 'REACT' && (selectedProto.codeSnippet || fallbackReact)}
          {activeCodeTab === 'GHERKIN' && (selectedProto.gherkinSpec || fallbackGherkin)}
          {activeCodeTab === 'SPEC' && JSON.stringify(selectedProto, null, 2)}
        </pre>
      </div>
    </div>
  );
};
