import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Zap,
  ShieldAlert,
  RotateCcw,
  Trophy,
  Check,
  Share2,
  Crown,
  Medal,
  Award,
  Sparkles
} from 'lucide-react';
import type { SwipeRecommendation, CreditCard, PaymentChannel } from '../lib/types';
import { EmvChip, ContactlessIcon } from './EmvChip';

interface WalletSwipeShowdownProps {
  recommendation: SwipeRecommendation;
  activeCards: CreditCard[];
  rawQuery: string;
  spendAmount: number;
  channel?: PaymentChannel;
  onOpenDeck?: () => void;
}

type ShowdownStage = 'draw' | 'scan' | 'reveal' | 'winner';

export const WalletSwipeShowdown: React.FC<WalletSwipeShowdownProps> = ({
  recommendation,
  activeCards,
  rawQuery,
  spendAmount,
}) => {
  const [stage, setStage] = useState<ShowdownStage>('draw');
  const [viewMode, setViewMode] = useState<'tiered' | 'chrome'>('tiered');
  const [scanProgress, setScanProgress] = useState(0);
  const [hudText, setHudText] = useState('Initializing Card Vault...');
  const [copied, setCopied] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const timerRefs = useRef<number[]>([]);

  const {
    bestCard,
    bestRatePercent,
    estimatedSavingInr,
    rationale,
    comparison,
    exclusionWarning,
  } = recommendation;

  const clearTimers = () => {
    timerRefs.current.forEach((t) => clearTimeout(t));
    timerRefs.current = [];
  };

  // Run the cinematic showdown sequence (2.5s - 3s total flow)
  const startShowdown = () => {
    clearTimers();
    setStage('draw');
    setViewMode('tiered');
    setScanProgress(10);
    setHudText('Evolving vault cards from sleeve...');

    // Step 1: Draw cards from wallet -> Laser scan
    const t1 = window.setTimeout(() => {
      setStage('scan');
      setScanProgress(45);
      setHudText('Scanning MCC descriptors & gateway rules...');
    }, 750);

    // Step 2: Laser scan evaluation
    const t2 = window.setTimeout(() => {
      setHudText('Evaluating fine-print exclusions & multipliers...');
      setScanProgress(80);
    }, 1500);

    // Step 3: Tier Lock Reveal (Gold, Silver, Bronze)
    const t3 = window.setTimeout(() => {
      setStage('reveal');
      setScanProgress(100);
      setHudText('Tier lock assigned: Gold 1st • Silver 2nd • Bronze 3rd');
    }, 2200);

    // Step 4: Chrome Winner Reveal
    const t4 = window.setTimeout(() => {
      setStage('winner');
      setViewMode('chrome');
      triggerConfetti();
    }, 3400);

    timerRefs.current = [t1, t2, t3, t4];
  };

  // Automatically start when recommendation parameters change
  useEffect(() => {
    startShowdown();
    return () => clearTimers();
  }, [rawQuery, spendAmount]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffffff', '#cbd5e1', '#d4af37', '#e2e8f0', '#f3e5ab'],
      disableForReducedMotion: true,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || viewMode !== 'chrome') return;
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
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
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
            {(stage === 'reveal' || stage === 'winner') && (
              <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                <button
                  onClick={() => setViewMode('tiered')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                    viewMode === 'tiered'
                      ? 'bg-[#d4af37]/25 text-[#fce79a] border border-[#d4af37]/50 shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  title="View Top 3 Tiered Cards"
                >
                  <Crown className="w-3 h-3 text-amber-300" />
                  <span>Tiered Deck</span>
                </button>
                <button
                  onClick={() => setViewMode('chrome')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                    viewMode === 'chrome'
                      ? 'bg-white/20 text-white border border-white/30 shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  title="View 3D Chrome Metal Winner"
                >
                  <Sparkles className="w-3 h-3 text-cyan-300" />
                  <span>3D Chrome</span>
                </button>
              </div>
            )}

            {(stage === 'draw' || stage === 'scan') && (
              <button
                onClick={() => {
                  clearTimers();
                  setStage('winner');
                  setViewMode('chrome');
                  triggerConfetti();
                }}
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
              <RotateCcw className={`w-3.5 h-3.5 text-[#d4af37] ${stage === 'draw' || stage === 'scan' ? 'animate-spin' : ''}`} />
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

        {/* Main Stage: Physical Wallet & Cards / Chrome Winner */}
        <div className="relative min-h-[380px] sm:min-h-[420px] flex items-center justify-center py-6 perspective-[1200px]">

          {/* Laser Scanner Line (during scanning stage) */}
          {stage === 'scan' && (
            <motion.div
              className="laser-beam"
              initial={{ top: '10%' }}
              animate={{ top: ['10%', '85%', '10%'] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
            />
          )}

          {/* Fanned Out of Physical Wallet (Active in draw, scan, or tiered viewMode) */}
          <AnimatePresence mode="wait">
            {(viewMode === 'tiered' || stage !== 'winner') && (
              <div className="w-full max-w-lg flex flex-col items-center relative">
                {/* Fanned Cards Stack */}
                <div className="relative w-full h-[230px] flex items-center justify-center">
                  {displayCards.map((card, idx) => {
                    const total = displayCards.length;
                    const offset = idx - Math.floor(total / 2);
                    const evalItem = comparison.find((c) => c.card.id === card.id);
                    const isExclusion = evalItem?.isExclusion;
                    const rankIdx = comparison.findIndex((c) => c.card.id === card.id);

                    const isGold = rankIdx === 0;
                    const isSilver = rankIdx === 1;
                    const isBronze = rankIdx === 2;

                    const isDraw = stage === 'draw';
                    const isScan = stage === 'scan';
                    const isRevealed = stage === 'reveal' || stage === 'winner';

                    let targetY = -35 + Math.abs(offset) * 10;
                    let targetScale = 0.95;
                    let targetZIndex = idx + 10;
                    let targetOpacity = 1;

                    if (isDraw) {
                      targetY = 90;
                      targetScale = 0.88;
                      targetOpacity = 0.35;
                    } else if (isScan) {
                      if (isGold) {
                        targetScale = 1.04;
                        targetZIndex = 30;
                      }
                      if (isExclusion) {
                        targetOpacity = 0.35;
                      }
                    } else if (isRevealed) {
                      if (isGold) {
                        targetY = -52;
                        targetScale = 1.08;
                        targetZIndex = 35;
                      } else if (isSilver) {
                        targetY = -40;
                        targetScale = 1.02;
                        targetZIndex = 25;
                      } else if (isBronze) {
                        targetY = -34;
                        targetScale = 0.98;
                        targetZIndex = 20;
                      } else {
                        targetOpacity = 0.35;
                        targetScale = 0.9;
                      }
                    }

                    const targetRotateZ = isDraw ? 0 : offset * 8.5;
                    const targetX = isDraw ? 0 : offset * 66;

                    const tierClass = isRevealed
                      ? isGold
                        ? 'tier-gold'
                        : isSilver
                        ? 'tier-silver'
                        : isBronze
                        ? 'tier-bronze'
                        : ''
                      : '';

                    return (
                      <motion.div
                        key={card.id}
                        layout
                        initial={{ y: 90, opacity: 0.3, scale: 0.88 }}
                        animate={{
                          y: targetY,
                          x: targetX,
                          rotateZ: targetRotateZ,
                          opacity: targetOpacity,
                          scale: targetScale,
                          zIndex: targetZIndex,
                        }}
                        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                        className={`absolute w-64 sm:w-72 h-40 sm:h-44 rounded-2xl p-4 flex flex-col justify-between shadow-2xl border transition-all select-none bg-gradient-to-br ${card.theme.gradient} ${tierClass}`}
                        style={{
                          borderColor: isScan && isGold ? '#00f0ff' : undefined,
                          boxShadow: isScan && isGold ? '0 0 35px rgba(0,240,255,0.45)' : undefined,
                        }}
                      >
                        {/* Card Top: Issuer, Network & Tier Badge */}
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 font-display">
                            {card.issuer}
                          </span>
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/40 text-zinc-300 font-display">
                            {card.network}
                          </span>
                        </div>

                        {/* Card Center: Name & Prominent Tier Pill */}
                        <div>
                          <p className={`font-display text-sm font-bold truncate ${card.theme.textColor}`}>
                            {card.name}
                          </p>

                          {isRevealed && (
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.3 }}
                              className="mt-1.5"
                            >
                              {isGold && (
                                <span className="tier-badge-gold px-2.5 py-0.5 rounded-full text-[10px] font-extrabold inline-flex items-center gap-1 font-display">
                                  <Crown className="w-3 h-3 text-amber-300 fill-amber-300" />
                                  1ST · GOLD
                                </span>
                              )}
                              {isSilver && (
                                <span className="tier-badge-silver px-2.5 py-0.5 rounded-full text-[10px] font-extrabold inline-flex items-center gap-1 font-display">
                                  <Medal className="w-3 h-3 text-slate-200 fill-slate-200" />
                                  2ND · SILVER
                                </span>
                              )}
                              {isBronze && (
                                <span className="tier-badge-bronze px-2.5 py-0.5 rounded-full text-[10px] font-extrabold inline-flex items-center gap-1 font-display">
                                  <Award className="w-3 h-3 text-amber-500 fill-amber-500" />
                                  3RD · BRONZE
                                </span>
                              )}
                            </motion.div>
                          )}
                        </div>

                        {/* Card Bottom: Yield Rate & Contactless */}
                        <div className="pt-2 border-t border-white/10 flex items-end justify-between">
                          <div>
                            <span className="text-[8px] uppercase tracking-wider text-zinc-400 block">
                              Yield Check
                            </span>
                            <span className="font-display text-sm font-bold text-white tabular-nums">
                              {isScan ? (
                                isExclusion ? (
                                  <span className="text-rose-400 text-xs">0% Exclusion</span>
                                ) : (
                                  `${evalItem?.ratePercent || card.baseRewardPercent}%`
                                )
                              ) : isRevealed ? (
                                isExclusion ? (
                                  <span className="text-rose-400 text-xs">0% Exclusion</span>
                                ) : (
                                  <span className={isGold ? 'text-amber-300 font-extrabold' : 'text-white'}>
                                    {evalItem?.ratePercent}% Yield
                                  </span>
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

          {/* Liquid Mirror Chrome Finish Card */}
          <AnimatePresence>
            {viewMode === 'chrome' && stage === 'winner' && (
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
                className="w-full max-w-[440px] cursor-pointer winner-glow rounded-[18px]"
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

        {/* Financial Rationale Callout (Active when Winner/Reveal is ready) */}
        {(stage === 'winner' || stage === 'reveal') && (
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

