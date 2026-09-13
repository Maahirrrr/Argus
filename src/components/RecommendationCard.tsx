import React, { useState } from 'react';
import { Award, AlertTriangle, Share2, Check, ShieldAlert, Sparkles } from 'lucide-react';
import type { SwipeRecommendation, PaymentChannel } from '../lib/types';

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
  const { bestCard, bestRatePercent, estimatedSavingInr, rationale, runnerUpCard, runnerUpRatePercent, channelAlert, exclusionWarning } = recommendation;

  const handleCopy = () => {
    const text = `💳 TapWise Recommendation for ₹${spendAmount.toLocaleString('en-IN')} on ${rawQuery}:\n👉 Use ${bestCard.name} for ${bestRatePercent}% ${recommendation.bestRewardType} (₹${estimatedSavingInr} saved)!\nWhy: ${rationale}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isZeroRate = bestRatePercent === 0;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-700/80 bg-gradient-to-b from-zinc-900 to-zinc-950 p-6 md:p-8 shadow-2xl card-sheen">
      {/* Background ambient glow based on card accent */}
      <div
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ backgroundColor: bestCard.theme.accentColor }}
      />

      {/* Top Banner: Status & Share */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <Award className="w-3.5 h-3.5" />
            Rank #1 Best Card to Swipe
          </span>
          <span className="text-xs text-zinc-400 hidden sm:inline">
            for ₹{spendAmount.toLocaleString('en-IN')} spend
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-xs font-medium text-zinc-200 transition-all border border-zinc-700 active:scale-[0.98]"
          title="Copy shareable summary"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied!' : 'Share Recommendation'}</span>
        </button>
      </div>

      {/* Main Card Presentation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Card Visual Badge */}
        <div className="lg:col-span-5">
          <div
            className={`relative rounded-2xl p-5 border ${bestCard.theme.border} bg-gradient-to-br ${bestCard.theme.gradient} shadow-2xl transition-transform hover:scale-[1.02] duration-300`}
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                  {bestCard.issuer}
                </span>
                <h3 className={`text-lg font-bold tracking-tight ${bestCard.theme.textColor}`}>
                  {bestCard.name}
                </h3>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white/10 text-white backdrop-blur-sm">
                {bestCard.network}
              </span>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">
                  Reward Value
                </span>
                <span className="text-2xl font-extrabold text-white tracking-tight">
                  {bestRatePercent}%
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">
                  Net Savings
                </span>
                <span className="text-xl font-bold text-emerald-400">
                  ₹{estimatedSavingInr.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Rationale and Metrics */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              {isZeroRate ? '0% Return' : `${bestRatePercent}%`}
            </span>
            <span className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
              {isZeroRate ? 'Exclusion Detected' : `${recommendation.bestRewardType} Yield`}
            </span>
          </div>

          <p className="text-base text-zinc-200 font-medium leading-relaxed mb-4">
            {rationale}
          </p>

          {/* Key Perk Bullet */}
          {bestCard.perks[0] && (
            <div className="flex items-center gap-2 text-xs text-zinc-400 mb-4 bg-zinc-950/60 p-2.5 rounded-lg border border-zinc-800">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong className="text-zinc-200">{bestCard.perks[0].title}:</strong> {bestCard.perks[0].description}
              </span>
            </div>
          )}

          {/* Runner-up card preview */}
          {runnerUpCard && (
            <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
              <span className="text-zinc-400">
                Runner-Up Card: <strong className="text-zinc-200">{runnerUpCard.name}</strong>
              </span>
              <span className="font-semibold text-zinc-300">
                {runnerUpRatePercent}% yield
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Channel Disparity Alert Banner */}
      {channelAlert && (
        <div className="mt-6 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-200 leading-relaxed">
            <strong className="font-semibold block mb-0.5">Payment Channel Disparity Alert:</strong>
            {channelAlert}
          </div>
        </div>
      )}

      {/* Exclusion Warning Banner */}
      {exclusionWarning && (
        <div className="mt-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="text-xs text-rose-200 leading-relaxed">
            <strong className="font-semibold block mb-0.5">Indian FinTech Exclusion Trap:</strong>
            {exclusionWarning}
          </div>
        </div>
      )}
    </div>
  );
};
