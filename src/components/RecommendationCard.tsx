import React, { useState } from 'react';
import { Award, AlertTriangle, Share2, Check, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';
import type { SwipeRecommendation, PaymentChannel } from '../lib/types';
import { EmvChip, ContactlessIcon } from './EmvChip';

interface RecommendationCardProps {
  recommendation: SwipeRecommendation;
  rawQuery: string;
  spendAmount: number;
  channel?: PaymentChannel;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  rawQuery,
  spendAmount,
}) => {
  const [copied, setCopied] = useState(false);
  const {
    bestCard,
    bestRatePercent,
    estimatedSavingInr,
    rationale,
    runnerUpCard,
    runnerUpRatePercent,
    channelAlert,
    exclusionWarning,
  } = recommendation;

  const isZero = bestRatePercent === 0;

  const handleCopy = () => {
    const text = `💳 TapWise Recommendation: For ₹${spendAmount.toLocaleString('en-IN')} on ${rawQuery}, swipe ${bestCard.name} for ${bestRatePercent}% ${recommendation.bestRewardType} (₹${estimatedSavingInr} saved). Rationale: ${rationale}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="cred-card rounded-3xl p-6 sm:p-8 relative overflow-hidden">
      {/* Ambient background glow matching card accent */}
      <div
        className="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-20"
        style={{ backgroundColor: bestCard.theme.accentColor }}
      />

      {/* Top Bar: Winner Tag + Copy Action */}
      <div className="flex items-center justify-between gap-4 mb-7 relative z-10">
        <div className="flex items-center gap-2.5">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest font-display bg-[#d4af37]/15 text-[#f3e5ab] border border-[#d4af37]/35 shadow-sm shadow-[#d4af37]/10">
            <Award className="w-3.5 h-3.5 text-[#d4af37]" />
            Rank #1: Best Card to Swipe
          </span>
          <span className="text-xs text-zinc-500 hidden sm:inline">
            for ₹{spendAmount.toLocaleString('en-IN')} transaction
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="btn-cred-dark flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white cursor-pointer active:scale-[0.98] transition-all"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-[#d4af37]" />}
          <span>{copied ? 'Copied' : 'Share Recommendation'}</span>
        </button>
      </div>

      {/* Main Grid: Luxury Physical Card (Left) + Financial Reasoning (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

        {/* LEFT: American Express / CRED Luxury Physical Card */}
        <div className="lg:col-span-6 flex justify-center">
          <div
            className={`physical-card-shell brushed-metal w-full max-w-[420px] p-6 flex flex-col justify-between select-none bg-gradient-to-br ${bestCard.theme.gradient}`}
            style={{
              border: `1px solid ${bestCard.theme.accentColor}55`,
              boxShadow: `0 20px 50px -10px rgba(0, 0, 0, 0.9), 0 0 35px ${bestCard.theme.accentColor}18`,
            }}
          >
            {/* Guilloche & Holographic Overlays */}
            <div className="guilloche-pattern" />
            <div className="holo-sweep" />

            {/* Card Header: Issuer + Contactless Wave */}
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 font-display block">
                  {bestCard.issuer}
                </span>
                <h3 className={`text-lg sm:text-xl font-bold tracking-tight mt-0.5 ${bestCard.theme.textColor}`}>
                  {bestCard.name}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <ContactlessIcon className="w-5 h-5 text-zinc-400 opacity-80" />
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-black/40 text-zinc-300 border border-white/10 font-display">
                  {bestCard.cardTier}
                </span>
              </div>
            </div>

            {/* Card Middle: EMV Contact Chip + Embossed Number Dummy */}
            <div className="relative z-10 my-4 flex items-center justify-between">
              <EmvChip variant={bestCard.id.includes('infinia') || bestCard.id.includes('gold') ? 'gold' : 'silver'} />
              <span className="embossed-digits text-xs sm:text-sm font-semibold text-zinc-400 opacity-70">
                ••••  ••••  ••••  8042
              </span>
            </div>

            {/* Card Footer: Return Yield + Network Stamp */}
            <div className="relative z-10 flex items-end justify-between pt-2 border-t border-white/[0.08]">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-zinc-400 block font-display">
                  Effective Yield
                </span>
                <span className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {bestRatePercent}%
                </span>
              </div>

              <div className="text-right">
                <span className="text-[9px] uppercase tracking-widest text-zinc-400 block font-display">
                  Estimated Benefit
                </span>
                <span className="font-display text-xl sm:text-2xl font-bold text-emerald-400">
                  {isZero ? '₹0' : `₹${estimatedSavingInr.toLocaleString('en-IN')}`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Financial Intelligence Breakdown */}
        <div className="lg:col-span-6 flex flex-col justify-center gap-4">
          <div>
            <div className="flex items-baseline gap-3 mb-2">
              <span className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                {isZero ? '0% Return' : `${bestRatePercent}%`}
              </span>
              <span className="text-sm font-bold uppercase tracking-widest text-[#d4af37] font-display">
                {isZero ? 'Exclusion Detected' : `${recommendation.bestRewardType} Yield`}
              </span>
            </div>
            <p className="text-base text-zinc-200 font-medium leading-relaxed">
              {rationale}
            </p>
          </div>

          {/* Highlight Key Perk */}
          {bestCard.perks[0] && (
            <div className="bg-[#0b0b0e] border border-white/[0.08] p-4 rounded-xl flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-white block mb-0.5">
                  {bestCard.perks[0].title}
                  {bestCard.perks[0].badge && (
                    <span className="ml-2 px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#d4af37]/20 text-[#f3e5ab]">
                      {bestCard.perks[0].badge}
                    </span>
                  )}
                </span>
                <span className="text-zinc-400 leading-relaxed">
                  {bestCard.perks[0].description}
                </span>
              </div>
            </div>
          )}

          {/* Runner-Up Card Pill */}
          {runnerUpCard && (
            <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-zinc-400">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-display">
                  Runner-Up
                </span>
                <ArrowRight className="w-3 h-3 text-zinc-600" />
                <span className="font-semibold text-zinc-200">
                  {runnerUpCard.name}
                </span>
              </div>
              <span className="font-display font-bold text-zinc-300 px-2 py-0.5 rounded bg-white/[0.05] border border-white/10">
                {runnerUpRatePercent}% yield
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Channel Disparity Alert (CRED Amber Card) */}
      {channelAlert && (
        <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3.5 relative z-10">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-200 leading-relaxed">
            <strong className="font-bold text-amber-100 block mb-0.5">
              Payment Channel Disparity Alert:
            </strong>
            {channelAlert}
          </div>
        </div>
      )}

      {/* Strict Regulatory Exclusion Warning (CRED Crimson Card) */}
      {exclusionWarning && (
        <div className="mt-4 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3.5 relative z-10">
          <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="text-xs text-rose-200 leading-relaxed">
            <strong className="font-bold text-rose-100 block mb-0.5">
              Indian FinTech Exclusion Trap:
            </strong>
            {exclusionWarning}
          </div>
        </div>
      )}
    </div>
  );
};
