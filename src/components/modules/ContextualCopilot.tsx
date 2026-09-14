import React, { useState } from 'react';
import {
  Bot,
  Send
} from 'lucide-react';
import type { NavigationTab } from '../../types/argus';

interface ContextualCopilotProps {
  activeTab: NavigationTab;
  onNavigateTab: (tab: NavigationTab) => void;
  onCreateOpportunity: () => void;
}

interface Message {
  id: string;
  sender: 'USER' | 'ARGUS';
  text: string;
  trustTier?: 'FACT' | 'INFERENCE' | 'ASSUMPTION' | 'RECOMMENDATION' | 'UNKNOWN';
  suggestedAction?: {
    label: string;
    tab?: NavigationTab;
  };
}

export const ContextualCopilot: React.FC<ContextualCopilotProps> = ({
  activeTab,
  onNavigateTab,
  onCreateOpportunity,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      sender: 'ARGUS',
      trustTier: 'FACT',
      text: 'Argus Contextual Copilot online. Telemetry stream locked to workspace: [' + activeTab.toUpperCase() + ']. All recommendations verified through 5-tier epistemological trust layer.',
    },
    {
      id: 'msg-2',
      sender: 'ARGUS',
      trustTier: 'RECOMMENDATION',
      text: 'Based on 1,480 user feedback items in Q3, 68% of users report confusion over excluded merchant categories (fuel and wallet topups). Recommend adding proactive fine-print badge directly to payment picker.',
      suggestedAction: {
        label: 'Promote to Opportunity',
        tab: 'opportunities',
      },
    },
  ]);

  const [inputVal, setInputVal] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const handleSend = () => {
    if (!inputVal.trim()) return;

    const userMsg: Message = {
      id: 'user-' + Date.now(),
      sender: 'USER',
      text: inputVal,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botMsg: Message = {
        id: 'argus-' + Date.now(),
        sender: 'ARGUS',
        trustTier: 'INFERENCE',
        text: 'Causal probe completed. Analysis suggests 14% dropoff in checkout funnel correlates with NPCI gateway retry timeouts > 500ms. Synthesizing RFC spec with automated rollback threshold.',
        suggestedAction: {
          label: 'View PRD Studio',
          tab: 'prds',
        },
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 700);
  };

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6 animate-fade-in text-[#F5F5F0]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1D1D1D]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-[2px] bg-[#0066FF]/10 border border-[#0066FF]/30 flex items-center justify-center text-[#0066FF]">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-display tracking-tight text-[#F5F5F0]">
              Argus Contextual Copilot
            </h1>
            <p className="text-xs font-mono-tech text-[#8A8A8A]">
              Deterministic data grounding with strict trust layer tagging ([FACT], [INFERENCE], [RECOMMENDATION])
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono-tech text-[#00CC66] bg-[#00CC66]/10 px-2 py-0.5 rounded-[2px]">
            ACTIVE CONTEXT: {activeTab.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Epistemological Trust Badges Legend */}
      <div className="bg-[#0A0A0A] border border-[#1D1D1D] p-3 rounded-[2px] flex flex-wrap items-center gap-3 text-[10px] font-mono-tech">
        <span className="text-[#8A8A8A]">TRUST TIERS:</span>
        <span className="px-2 py-0.5 bg-[#00CC66]/15 text-[#00CC66] rounded-[2px]">
          [FACT] Verified Database Metric
        </span>
        <span className="px-2 py-0.5 bg-[#0066FF]/15 text-[#0066FF] rounded-[2px]">
          [INFERENCE] Causal Telemetry Model
        </span>
        <span className="px-2 py-0.5 bg-[#FF9900]/15 text-[#FF9900] rounded-[2px]">
          [ASSUMPTION] User Hypothesis
        </span>
        <span className="px-2 py-0.5 bg-[#B829FF]/15 text-[#B829FF] rounded-[2px]">
          [RECOMMENDATION] Suggested PM Action
        </span>
      </div>

      {/* Chat Messages Stream */}
      <div className="bg-[#080808] border border-[#1D1D1D] rounded-[2px] p-4 min-h-[440px] flex flex-col justify-between space-y-4">
        <div className="space-y-3.5 overflow-y-auto max-h-[500px]">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'USER' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-2xl p-3.5 rounded-[2px] text-xs leading-relaxed ${
                  m.sender === 'USER'
                    ? 'bg-[#0066FF] text-white font-sans'
                    : 'bg-[#0E0E0E] border border-[#1D1D1D] text-[#CCCCCC]'
                }`}
              >
                {m.trustTier && (
                  <div className="mb-1.5">
                    <span className={`text-[9px] font-mono-tech font-bold px-1.5 py-0.2 rounded-[2px] ${
                      m.trustTier === 'FACT' ? 'bg-[#00CC66]/20 text-[#00CC66]' :
                      m.trustTier === 'INFERENCE' ? 'bg-[#0066FF]/20 text-[#0066FF]' :
                      m.trustTier === 'RECOMMENDATION' ? 'bg-[#B829FF]/20 text-[#B829FF]' :
                      'bg-[#FF9900]/20 text-[#FF9900]'
                    }`}>
                      [{m.trustTier}]
                    </span>
                  </div>
                )}
                <div className="font-sans">{m.text}</div>

                {m.suggestedAction && (
                  <div className="mt-3 pt-2 border-t border-[#1D1D1D] flex items-center justify-between">
                    <span className="text-[10px] font-mono-tech text-[#8A8A8A]">Suggested Follow-up:</span>
                    <button
                      onClick={() => {
                        if (m.suggestedAction?.tab) {
                          onNavigateTab(m.suggestedAction.tab);
                        } else {
                          onCreateOpportunity();
                        }
                      }}
                      className="text-xs font-mono-tech text-[#0066FF] hover:underline flex items-center gap-1 font-semibold"
                    >
                      {m.suggestedAction.label}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="text-xs font-mono-tech text-[#8A8A8A] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-pulse" />
              Argus Copilot querying ClickHouse telemetry & foundation model...
            </div>
          )}
        </div>

        {/* Input Dock */}
        <div className="pt-3 border-t border-[#1D1D1D]">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ask Argus about anomalies, write BDD scenarios, or challenge a roadmap decision..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-[#050505] border border-[#1D1D1D] focus:border-[#0066FF] px-3.5 py-2.5 text-xs font-mono-tech text-[#F5F5F0] rounded-[2px] outline-none"
            />
            <button
              onClick={handleSend}
              className="px-4 py-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-mono-tech font-medium rounded-[2px] transition-colors flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Query</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
