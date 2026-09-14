import React, { useState } from 'react';
import { Sparkles, ArrowUp, Paperclip, Copy, Check, RotateCcw, StopCircle } from 'lucide-react';
import { ArgusButton } from './ArgusButton';

export interface ArgusAIInputProps {
  onGenerate: (prompt: string) => void;
  isLoading?: boolean;
  suggestedPrompts?: string[];
  placeholder?: string;
  response?: string | null;
  onStop?: () => void;
  onRegenerate?: () => void;
  className?: string;
}

export const ArgusAIInput: React.FC<ArgusAIInputProps> = ({
  onGenerate,
  isLoading = false,
  suggestedPrompts = [
    'Analyze telemetry spike in checkout drop-off',
    'Synthesize high-conviction opportunities from feedback',
    'Draft a PRD based on Opportunity #014',
  ],
  placeholder = 'Ask ARGUS to synthesize signals, write specs, or model impact...',
  response,
  onStop,
  onRegenerate,
  className = '',
}) => {
  const [prompt, setPrompt] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;
    onGenerate(prompt);
  };

  const handleCopy = () => {
    if (!response) return;
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`w-full space-y-3 ${className}`}>
      {/* Suggestions Pills */}
      {suggestedPrompts.length > 0 && !response && (
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] font-mono-tech text-[#666666] uppercase tracking-wider mr-1">
            Suggested:
          </span>
          {suggestedPrompts.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setPrompt(p);
                onGenerate(p);
              }}
              className="text-[11px] font-mono-tech px-2.5 py-1 rounded-[4px] bg-[#0E0E0E] hover:bg-[#161616] text-[#A1A1A1] hover:text-[#F5F5F5] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)] transition-colors cursor-pointer"
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Input Box */}
      <form
        onSubmit={handleSubmit}
        className="relative rounded-[8px] border border-[rgba(255,255,255,0.12)] bg-[#080808] focus-within:border-[#0066FF] transition-all p-3 space-y-2 shadow-xl"
      >
        <div className="flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-[#0066FF] mt-1 flex-shrink-0" />
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                handleSubmit(e);
              }
            }}
            placeholder={placeholder}
            rows={2}
            className="w-full bg-transparent text-xs text-[#F5F5F5] placeholder-[#555555] resize-none outline-none font-mono-tech leading-relaxed"
          />
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[rgba(255,255,255,0.06)]">
          <div className="flex items-center gap-2 text-[10px] font-mono-tech text-[#666666]">
            <span className="flex items-center gap-1 text-[#8A8A8A]">
              <Paperclip className="w-3 h-3" /> Telemetry Attached
            </span>
            <span>·</span>
            <span>⌘ + Enter to generate</span>
          </div>

          <div className="flex items-center gap-2">
            {isLoading ? (
              <ArgusButton
                type="button"
                variant="outline"
                size="xs"
                onClick={onStop}
                leftIcon={<StopCircle className="w-3 h-3 text-[#EF4444]" />}
              >
                Stop
              </ArgusButton>
            ) : (
              <ArgusButton
                type="submit"
                variant="primary"
                size="xs"
                disabled={!prompt.trim()}
                rightIcon={<ArrowUp className="w-3 h-3" />}
              >
                Synthesize
              </ArgusButton>
            )}
          </div>
        </div>
      </form>

      {/* Response Box */}
      {response && (
        <div className="p-4 rounded-[8px] bg-[#0A0A0A] border border-[rgba(255,255,255,0.08)] space-y-3">
          <div className="flex items-center justify-between text-xs text-[#8A8A8A] font-mono-tech pb-2 border-b border-[rgba(255,255,255,0.06)]">
            <span className="flex items-center gap-1.5 text-[#F5F5F5]">
              <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" /> ARGUS Synthesis
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={handleCopy}
                className="p-1 rounded hover:bg-[#141414] text-[#8A8A8A] hover:text-[#EDEDED] cursor-pointer"
                title="Copy response"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              {onRegenerate && (
                <button
                  onClick={onRegenerate}
                  className="p-1 rounded hover:bg-[#141414] text-[#8A8A8A] hover:text-[#EDEDED] cursor-pointer"
                  title="Regenerate response"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
          <div className="text-xs font-mono-tech leading-relaxed text-[#CCCCCC] whitespace-pre-wrap">
            {response}
          </div>
        </div>
      )}
    </div>
  );
};
