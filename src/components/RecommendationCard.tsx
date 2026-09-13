import React, { useState } from 'react';
import { AlertTriangle, Copy, Check, ShieldAlert, TrendingUp, ArrowRight } from 'lucide-react';
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
    const text = `💳 TapWise · ₹${spendAmount.toLocaleString('en-IN')} on ${rawQuery}\n👑 Use ${bestCard.name} → ${bestRatePercent}% ${recommendation.bestRewardType} = ₹${estimatedSavingInr} saved\n${rationale}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-fade-up flex flex-col gap-4">

      {/* ── Main recommendation grid ── */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(8, 12, 22, 0.9)',
          border: '1px solid rgba(201, 168, 76, 0.15)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.08)',
        }}
      >
        {/* Ambient background from card accent */}
        <div
          className="absolute -top-32 -right-32 w-64 h-64 rounded-full blur-[80px] pointer-events-none"
          style={{ backgroundColor: bestCard.theme.accentColor, opacity: 0.07 }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full blur-[60px] pointer-events-none"
          style={{ backgroundColor: '#4f46e5', opacity: 0.08 }}
        />

        {/* Header row */}
        <div className="relative flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold font-display uppercase tracking-widest tag-gold">
              <TrendingUp className="w-3 h-3" />
              Rank #1: Best Card to Swipe
            </span>
            <span className="hidden sm:block text-xs" style={{ color: '#454d62' }}>
              for ₹{spendAmount.toLocaleString('en-IN')}
            </span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer btn-ghost"
          >
            {copied ? <Check className="w-3.5 h-3.5" style={{ color: '#c9a84c' }} /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Main content */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-0">

          {/* LEFT: 3D Card visual */}
          <div className="lg:col-span-5 p-6 lg:border-r border-white/5 flex items-center">
            <div
              className="card-3d card-holo relative w-full rounded-2xl p-5 cursor-default"
              style={{
                background: `linear-gradient(135deg, ${bestCard.theme.accentColor}22 0%, #0a0f1e 60%, #050810 100%)`,
                border: `1px solid ${bestCard.theme.accentColor}40`,
                minHeight: '160px',
              }}
            >
              {/* Card top row */}
              <div className="relative z-10 flex items-start justify-between mb-8">
                <div>
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.15em] mb-1"
                    style={{ color: bestCard.theme.accentColor, opacity: 0.7 }}
                  >
                    {bestCard.issuer}
                  </p>
                  <h3
                    className="font-display text-base font-bold tracking-tight leading-snug"
                    style={{ color: bestCard.theme.accentColor }}
                  >
                    {bestCard.name}
                  </h3>
                </div>
                <span
                  className="text-[10px] font-semibold px-2 py-1 rounded-lg font-display"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    color: 'rgba(255,255,255,0.5)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {bestCard.network}
                </span>
              </div>

              {/* Card bottom row */}
              <div className="relative z-10 flex items-end justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-widest mb-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    Reward rate
                  </p>
                  <p
                    className="font-display text-3xl font-bold tracking-tight"
                    style={{ color: isZero ? '#ef4444' : bestCard.theme.accentColor }}
                  >
                    {bestRatePercent}%
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] uppercase tracking-widest mb-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    You save
                  </p>
                  <p
                    className="font-display text-2xl font-bold tracking-tight"
                    style={{ color: isZero ? '#ef4444' : '#22c55e' }}
                  >
                    {isZero ? '₹0' : `₹${estimatedSavingInr.toLocaleString('en-IN')}`}
                  </p>
                </div>
              </div>

              {/* Tier badge */}
              <div
                className="absolute top-3 right-3 text-[8px] font-bold px-1.5 py-0.5 rounded font-display uppercase tracking-wider"
                style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.3)' }}
              >
                {bestCard.cardTier}
              </div>
            </div>
          </div>

          {/* RIGHT: Rationale + runner-up */}
          <div className="lg:col-span-7 p-6 flex flex-col justify-center gap-4">

            {/* Big number + type */}
            <div>
              <div className="flex items-baseline gap-3 mb-2">
                <span
                  className="font-display text-4xl font-bold tracking-tight"
                  style={{ color: isZero ? '#ef4444' : '#f0f4ff' }}
                >
                  {isZero ? '0%' : `${bestRatePercent}%`}
                </span>
                <span
                  className="text-sm font-semibold uppercase tracking-widest font-display"
                  style={{ color: '#454d62' }}
                >
                  {isZero ? 'Exclusion Zone' : recommendation.bestRewardType}
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#8892aa', maxWidth: '38ch' }}>
                {rationale}
              </p>
            </div>

            {/* Top perk */}
            {bestCard.perks[0] && (
              <div
                className="flex items-start gap-3 p-3.5 rounded-xl"
                style={{ background: 'rgba(5,8,16,0.6)', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <div
                  className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
                  style={{ background: 'rgba(201,168,76,0.15)' }}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#c9a84c' }} />
                </div>
                <div>
                  <p className="text-xs font-semibold mb-0.5" style={{ color: '#c9a84c' }}>
                    {bestCard.perks[0].title}
                  </p>
                  <p className="text-xs" style={{ color: '#8892aa' }}>
                    {bestCard.perks[0].description}
                  </p>
                </div>
                {bestCard.perks[0].badge && (
                  <span className="ml-auto text-[9px] font-bold px-2 py-0.5 rounded font-display tag-gold flex-shrink-0">
                    {bestCard.perks[0].badge}
                  </span>
                )}
              </div>
            )}

            {/* Runner-up */}
            {runnerUpCard && (
              <div
                className="flex items-center justify-between pt-3 border-t"
                style={{ borderColor: 'rgba(255,255,255,0.05)' }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: '#454d62' }}>
                    Runner-Up
                  </span>
                  <ArrowRight className="w-3 h-3" style={{ color: '#454d62' }} />
                  <span className="text-xs font-semibold" style={{ color: '#8892aa' }}>
                    {runnerUpCard.name}
                  </span>
                </div>
                <span
                  className="font-display text-sm font-bold tag-indigo px-2 py-0.5 rounded"
                >
                  {runnerUpRatePercent}%
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Alert banners */}
        {channelAlert && (
          <div
            className="mx-6 mb-5 p-4 rounded-xl flex items-start gap-3"
            style={{ background: 'rgba(234,179,8,0.06)', border: '1px solid rgba(234,179,8,0.2)' }}
          >
            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#eab308' }} />
            <div>
              <p className="text-xs font-bold mb-0.5" style={{ color: '#fde047' }}>
                Channel Disparity Alert
              </p>
              <p className="text-xs leading-relaxed" style={{ color: '#fde04799' }}>
                {channelAlert}
              </p>
            </div>
          </div>
        )}

        {exclusionWarning && (
          <div
            className="mx-6 mb-5 p-4 rounded-xl flex items-start gap-3"
            style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)' }}
          >
            <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#ef4444' }} />
            <div>
              <p className="text-xs font-bold mb-0.5" style={{ color: '#fca5a5' }}>
                Indian FinTech Exclusion Trap
              </p>
              <p className="text-xs leading-relaxed" style={{ color: '#fca5a599' }}>
                {exclusionWarning}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
