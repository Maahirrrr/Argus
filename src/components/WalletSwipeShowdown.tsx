import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Zap,
  ShieldAlert,
  RotateCcw,
  Trophy,
  Check,
  Share2
} from 'lucide-react';
import type { SwipeRecommendation, CreditCard, PaymentChannel } from '../lib/types';
import { EmvChip, ContactlessIcon } from './EmvChip';
import GoldBadge from '../assets/crown.svg';
import SilverBadge from '../assets/silver-medal.svg';
import BronzeBadge from '../assets/bronze-medal.svg';
interface WalletSwipeShowdownProps {
  recommendation: SwipeRecommendation;
  activeCards: CreditCard[];
  rawQuery: string;
  spendAmount: number;
  channel?: PaymentChannel;
  onOpenDeck?: () => void;
}

type ShowdownStage = 'pocket' | 'drawing' | 'scanning' | 'winner';

export const WalletSwipeShowdown: React.FC<WalletSwipeShowdownProps> = ({
  recommendation,
  activeCards,
  rawQuery,
  spendAmount,
}) => {
  const [stage, setStage] = useState<ShowdownStage>('pocket');
  const [scanProgress, setScanProgress] = useState(0);
  const [hudText, setHudText] = useState('Initializing Card Vault...');
  const [copied, setCopied] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const {
    bestCard,
    bestRatePercent,
    estimatedSavingInr,
    rationale,
    comparison,
    exclusionWarning,
  } = recommendation;

  // Run the cinematic showdown sequence
  const startShowdown = () => {
    setStage('drawing');
    setScanProgress(0);
    setHudText('Drawing cards from vault...');

    // Step 1: Draw cards from wallet
    setTimeout(() => {
      setStage('scanning');
      setHudText('Scanning MCC & merchant gateway descriptors...');
    }, 900);

    // Step 2: Laser scan evaluation
    setTimeout(() => {
      setHudText('Evaluating fine-print exclusions & channel rates...');
      setScanProgress(50);
    }, 1700);

    setTimeout(() => {
      setHudText('Calculating highest net return...');
      setScanProgress(100);
    }, 2400);

    // Step 3: Winner revealed in Mirror Chrome
    setTimeout(() => {
      setStage('winner');
      triggerConfetti();
    }, 3100);
  };

  // Automatically start when recommendation changes
  useEffect(() => {
    startShowdown();
  }, [rawQuery, spendAmount]);

  const triggerConfetti = () => {
    // Chrome, platinum & champagne gold metallic flakes
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffffff', '#cbd5e1', '#d4af37', '#e2e8f0', '#f3e5ab'],
      disableForReducedMotion: true,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || stage !== 'winner') return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 14;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const handleCopy = () => {
    const text = `💳 TapWise Winner: For ₹${spendAmount.toLocaleString('en-IN')} on ${rawQuery}, swipe ${bestCard.name} for ${bestRatePercent}% ${recommendation.bestRewardType} (₹${estimatedSavingInr} saved). Rationale: ${rationale}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Visible cards to show in fanned deck (up to 5)
  const displayCards = activeCards.slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      {/* Cinematic Showdown Arena */}
      <div className="cred-card rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#d4af37]/10 blur-[90px] pointer-events-none" />

        {/* Top Control Bar */}
        <div className="flex items-center justify-between gap-4 mb-6 relative z-10">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest font-display bg-[#d4af37]/15 text-[#f3e5ab] border border-[#d4af37]/30 shadow-sm shadow-[#d4af37]/10">
              <Zap className="w-3.5 h-3.5 text-[#d4af37]" />
              {stage === 'winner' ? 'Chrome Winner Locked' : 'Swipe Showdown'}
            </span>
            <span className="text-xs text-zinc-500 hidden sm:inline">
              Evaluating {activeCards.length} cards for ₹{spendAmount.toLocaleString('en-IN')} spend
            </span>
          </div>

          <div className="flex items-center gap-2">
            {stage !== 'winner' && (
              <button
                onClick={() => setStage('winner')}
                className="btn-cred-dark text-[11px] px-3 py-1 rounded-lg font-display cursor-pointer hover:text-white"
              >
                Skip Scan
              </button>
            )}
            <button
              onClick={startShowdown}
              className="btn-cred-dark flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl font-medium cursor-pointer transition-all hover:border-[#d4af37]/40"
              title="Re-run Card Showdown"
            >
              <RotateCcw className={`w-3.5 h-3.5 text-[#d4af37] ${stage !== 'winner' ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Re-Scan</span>
            </button>
          </div>
        </div>

        {/* HUD Scanner Status Banner */}
        {stage !== 'winner' && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-3 rounded-2xl bg-[#09090d] border border-cyan-500/30 flex items-center justify-between shadow-lg shadow-cyan-500/5 relative overflow-hidden"
          >
            <div className="laser-beam top-0" />
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                {hudText}
              </span>
            </div>
            <span className="text-xs font-mono text-cyan-400/80 font-bold tabular-nums">
              {scanProgress}%
            </span>
          </motion.div>
        )}

        {/* Main Stage: Physical Wallet & Cards */}
        <div className="relative min-h-[380px] sm:min-h-[420px] flex items-center justify-center py-6 perspective-[1200px]">

          {/* Laser Scanner Line (during scanning stage) */}
          {stage === 'scanning' && (
            <motion.div
              className="laser-beam"
              initial={{ top: '10%' }}
              animate={{ top: ['10%', '85%', '10%'] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            />
          )}

          {/* STAGE 1 & 2: Cards Fanned Out of Physical Wallet */}
          <AnimatePresence mode="wait">
            {stage !== 'winner' && (
              <div className="w-full max-w-lg flex flex-col items-center relative">
                {/* Fanned Cards Stack */}
                <div className="relative w-full h-[220px] flex items-center justify-center">
                  {displayCards.map((card, idx) => {
                    const total = displayCards.length;
                    const offset = idx - Math.floor(total / 2);
                    const isBest = card.id === bestCard.id;
                    const evalItem = comparison.find((c) => c.card.id === card.id);
                    const isExclusion = evalItem?.isExclusion;
                    const rankIdx = comparison.findIndex((c) => c.card.id === card.id);
                    const tierClass = rankIdx === 0 ? 'tier-gold' : rankIdx === 1 ? 'tier-silver' : rankIdx === 2 ? 'tier-bronze' : '';
                    const tierBadge = rankIdx === 0 ? <GoldBadge className="w-5 h-5" /> : rankIdx === 1 ? <SilverBadge className="w-5 h-5" /> : rankIdx === 2 ? <BronzeBadge className="w-5 h-5" /> : null;

                    const isPocket = stage === 'pocket';
                    const targetY = isPocket ? 90 : -35 + Math.abs(offset) * 10;
                    const targetRotateZ = isPocket ? 0 : offset * 9;
                    const targetX = isPocket ? 0 : offset * 65;

                    return (
                      <motion.div
                        key={card.id}
                        layout
                        initial={{ y: 90, opacity: 0.4, rotateZ: 0 }}
                        animate={{
                          y: targetY,
                          x: targetX,
                          rotateZ: targetRotateZ,
                          opacity: isExclusion && stage === 'scanning' ? 0.35 : 1,
                          scale: isBest && stage === 'scanning' ? 1.05 : 0.95,
                          zIndex: isBest && stage === 'scanning' ? 30 : idx + 10,
                        }}
                        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                        className={`absolute w-64 sm:w-72 h-40 sm:h-44 rounded-2xl p-4 flex flex-col justify-between shadow-2xl border transition-all select-none bg-gradient-to-br ${card.theme.gradient} ${tierClass}`}
                        style={{
                          borderColor: isBest && stage === 'scanning' ? '#00f0ff' : 'rgba(255,255,255,0.12)',
                          boxShadow: isBest && stage === 'scanning' ? '0 0 35px rgba(0,240,255,0.4)' : undefined,
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 font-display">
                            {card.issuer}
                          </span>
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/40 text-zinc-300 font-display">
                            {card.network}
                          </span>
                        </div>

                        <div>
                          <p className={`font-display text-sm font-bold truncate ${card.theme.textColor}`}>
                            {card.name}
                          </p>
                          {tierBadge && <div className="mt-1 flex justify-center">{tierBadge}</div>}
                        </div>

                        <div className="pt-2 border-t border-white/10 flex items-end justify-between">
                          <div>
                            <span className="text-[8px] uppercase tracking-wider text-zinc-400 block">
                              Yield Check
                            </span>
                            <span className="font-display text-sm font-bold text-white tabular-nums">
                              {stage === 'scanning' ? (
                                isExclusion ? (
                                  <span className="text-rose-400 text-xs">0% Exclusion</span>
                                ) : (
                                  `${evalItem?.ratePercent || card.baseRewardPercent}%`
                                )
                              ) : (
                                'Scanning...'
                              )}
                            </span>
                          </div>

                          <ContactlessIcon className="w-4 h-4 text-zinc-400 opacity-60" />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Physical Wallet Pocket Rim */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="w-full max-w-sm h-28 wallet-shell rounded-3xl p-4 flex flex-col justify-between relative z-20 mt-4 wallet-stitch"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center">
                        <span className="font-display text-[10px] font-black text-[#d4af37]">TW</span>
                      </div>
                      <span className="text-[11px] font-bold font-display uppercase tracking-wider text-zinc-300">
                        TapWise Vault Sleeve
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase">
                      Physical Slot
                    </span>
                  </div>

                  <div className="wallet-rim h-3 rounded-full w-full" />
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* STAGE 3: Winner in Liquid Mirror Chrome Finish */}
          <AnimatePresence>
            {stage === 'winner' && (
              <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                initial={{ scale: 0.7, y: 60, opacity: 0, rotateX: -15 }}
                animate={{
                  scale: 1,
                  y: 0,
                  opacity: 1,
                  rotateX: tilt.rotateX,
                  rotateY: tilt.rotateY,
                }}
                transition={{ type: 'spring', stiffness: 160, damping: 14, mass: 0.8 }}
                className={`w-full max-w-[440px] cursor-pointer ${stage === 'winner' ? 'winner-glow' : ''} rounded-[18px]`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* The Mirror Chrome Metal Card Shell */}
                <div
                  className="chrome-card physical-card-shell brushed-metal w-full p-6 sm:p-7 flex flex-col justify-between select-none relative"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  {/* Prismatic Rainbow Reflection Sweep */}
                  <div className="chrome-diffraction" />

                  {/* Card Header: Issuer & Chrome Tier Pill */}
                  <div className="relative z-10 flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.24em] chrome-emboss-dark font-display block">
                        {bestCard.issuer}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black tracking-tight chrome-emboss-light mt-0.5 font-display">
                        {bestCard.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <ContactlessIcon className="w-5 h-5 text-zinc-800" />
                      <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-white/40 text-slate-900 border border-white/60 font-display shadow-sm">
                        CHROME WINNER
                      </span>
                    </div>
                  </div>

                  {/* Card Middle: Polished Mirror EMV Chip + Hologram */}
                  <div className="relative z-10 my-4 flex items-center justify-between">
                    <EmvChip variant="silver" className="w-11 h-9 drop-shadow-md" />
                    <div className="px-3 py-1 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/30 text-right shadow-inner">
                      <span className="text-[9px] uppercase tracking-wider text-slate-300 block font-semibold">
                        Effective Yield
                      </span>
                      <span className="font-display text-xl sm:text-2xl font-black text-white tabular-nums tracking-tight">
                        {bestRatePercent}%
                      </span>
                    </div>
                  </div>

                  {/* Card Bottom: Embossed Numbers, Return & Network */}
                  <div className="relative z-10 pt-2 border-t border-slate-700/30 flex items-end justify-between">
                    <div>
                      <p className="embossed-digits text-xs sm:text-sm font-bold chrome-emboss-dark mb-1">
                        •••• •••• •••• {bestCard.id.slice(0, 4).toUpperCase()}
                      </p>
                      <span className="text-[10px] uppercase font-bold text-slate-800 tracking-wider font-display">
                        Net Savings: <strong className="text-emerald-800 font-black">₹{estimatedSavingInr}</strong>
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-black px-2.5 py-1 rounded bg-slate-950/80 text-white font-display border border-white/20">
                        {bestCard.network}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Financial Rationale Callout (Active when Winner Revealed) */}
        {stage === 'winner' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 pt-6 border-t border-white/[0.06] flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <Trophy className="w-4 h-4 text-[#d4af37]" />
                <span className="font-display text-sm font-bold text-white">
                  Why {bestCard.name} takes the crown
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-2xl">
                {rationale}
              </p>

              {exclusionWarning && (
                <div className="mt-2.5 flex items-center gap-2 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs">
                  <ShieldAlert className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span>{exclusionWarning}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={handleCopy}
                className="btn-cred-dark flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white cursor-pointer active:scale-[0.98] transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-[#d4af37]" />}
                <span>{copied ? 'Copied' : 'Share Winner'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
