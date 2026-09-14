import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { GlowingEffect } from '../../ui/GlowingEffect';

interface ArgusEngineProps {
  isPulsing?: boolean;
  enginePhase?: 'idle' | 'analyzing' | 'insight_created';
  engineMessage?: string;
  onNavigateToIntelligence: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const ArgusEngine: React.FC<ArgusEngineProps> = ({
  isPulsing = false,
  enginePhase = 'idle',
  engineMessage = '',
  onNavigateToIntelligence,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setTimeout(() => {
      onNavigateToIntelligence();
    }, 280);
  };

  return (
    <div
      className="relative z-30"
      onMouseEnter={() => {
        setIsHovered(true);
        if (onMouseEnter) onMouseEnter();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (onMouseLeave) onMouseLeave();
      }}
    >
      <motion.div
        onClick={handleClick}
        animate={{
          scale: isPulsing ? 1.02 : 1,
          boxShadow: isHovered
            ? '0 0 20px 2px rgba(0, 102, 255, 0.35)'
            : isPulsing
            ? '0 0 16px 2px rgba(0, 102, 255, 0.4)'
            : '0 0 8px 0px rgba(0, 0, 0, 0.6)',
        }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className={`w-40 sm:w-48 p-3 rounded-[3px] bg-[#0A0A0A] border transition-colors cursor-pointer select-none relative overflow-hidden text-center ${
          isHovered
            ? 'border-[#0066FF] bg-[#0e0e12]'
            : isPulsing
            ? 'border-[#0066FF]'
            : 'border-[#262626] hover:border-[#383838]'
        }`}
        title="ARGUS Engine — Click to navigate to Intelligence Center"
      >
        <GlowingEffect active={isPulsing || isHovered} color="rgba(0, 102, 255, 0.45)" blur={10} />

        <div
          className={`pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,102,255,0.12)_0%,transparent_70%)] transition-opacity duration-300 ${
            isHovered || isPulsing ? 'opacity-100' : 'opacity-40'
          }`}
        />

        <div className="relative z-10 flex flex-col items-center">
          <div className="flex items-center justify-center gap-1.5 text-[9px] font-mono-tech text-[#0066FF] font-bold uppercase tracking-wider">
            <Sparkles className="w-2.5 h-2.5 text-[#0066FF]" />
            <span>ARGUS ENGINE</span>
          </div>

          <div className="text-xs sm:text-sm font-bold font-display text-[#F5F5F0] tracking-tight mt-0.5">
            SIGNAL FUSION
          </div>

          <div className="h-5 flex items-center justify-center mt-0.5">
            {enginePhase === 'analyzing' ? (
              <span className="text-[8.5px] font-mono-tech text-[#0066FF] font-semibold animate-pulse truncate">
                ANALYZING {engineMessage}
              </span>
            ) : enginePhase === 'insight_created' ? (
              <span className="text-[8.5px] font-mono-tech text-[#10B981] font-semibold truncate">
                INSIGHT CREATED
              </span>
            ) : (
              <span className="text-[8.5px] font-mono-tech text-[#555] truncate">
                06 streams · 04 signals active
              </span>
            )}
          </div>

          <div className="mt-1 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-[#121212] border border-[#1D1D1D] text-[8.5px] font-mono-tech text-[#8A8A8A]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span>PROCESSING</span>
          </div>

          <div className="mt-2 pt-2 border-t border-[#1D1D1D] w-full flex items-center justify-center gap-1 text-[8.5px] font-mono-tech text-[#8A8A8A] hover:text-[#F5F5F0] transition-colors">
            <span>Open Intelligence</span>
            <ArrowRight className="w-2.5 h-2.5 text-[#0066FF]" />
          </div>
        </div>
      </motion.div>

      {isHovered && (
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 w-56 p-2.5 bg-[#0E0E0E] border border-[#262626] rounded-[2px] shadow-2xl text-left animate-fade-in-scale">
          <div className="text-[10px] font-mono-tech font-bold text-[#F5F5F0] uppercase tracking-wider">
            ARGUS ENGINE / SIGNAL FUSION
          </div>
          <div className="text-[9px] font-mono-tech text-[#0066FF] mt-0.5">
            06 active streams
          </div>
          <div className="mt-1.5 pt-1.5 border-t border-[#1D1D1D] text-[8.5px] font-mono-tech text-[#8A8A8A] space-y-0.5">
            <div>Processing:</div>
            <div className="text-[#C0C0C0]">• Payment anomaly (+18.4%)</div>
            <div className="text-[#C0C0C0]">• Retention decline (-1.8%)</div>
            <div className="text-[#C0C0C0]">• Feedback cluster (520 reports)</div>
          </div>
          <div className="mt-1.5 pt-1 border-t border-[#1D1D1D] flex items-center justify-between text-[8px] font-mono-tech text-[#8A8A8A]">
            <span>04 downstream actions</span>
            <span className="text-[#0066FF] font-semibold">Open Intelligence →</span>
          </div>
        </div>
      )}
    </div>
  );
};
