import React from 'react';
import { ShieldAlert, Trophy, Layers, Crown, Medal, Award } from 'lucide-react';
import type { SwipeRecommendation } from '../lib/types';

interface ComparisonMatrixProps {
  comparison: SwipeRecommendation['comparison'];
  spendAmount: number;
}

export const ComparisonMatrix: React.FC<ComparisonMatrixProps> = ({ comparison, spendAmount }) => {
  const max = comparison[0]?.ratePercent || 1;

  return (
    <div className="cred-card rounded-3xl overflow-hidden">
      {/* Header */}
      <div className="px-6 sm:px-8 py-5 border-b border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#d4af37]/10 border border-[#d4af37]/25">
            <Trophy className="w-4 h-4 text-[#d4af37]" />
          </div>
          <div>
            <h3 className="font-display text-base font-bold tracking-tight text-white">
              Wallet Yield Ledger
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              All {comparison.length} cards evaluated for ₹{spendAmount.toLocaleString('en-IN')} spend
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-semibold font-display px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-zinc-300">
          <Layers className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>{comparison.length} Evaluated</span>
        </div>
      </div>

      {/* Table: Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/[0.06] bg-[#09090c]/70">
              <th className="py-3.5 px-6 text-[10px] font-bold uppercase tracking-widest font-display text-zinc-500 w-24">
                Rank & Tier
              </th>
              <th className="py-3.5 px-6 text-[10px] font-bold uppercase tracking-widest font-display text-zinc-500">
                Card & Issuer
              </th>
              <th className="py-3.5 px-6 text-[10px] font-bold uppercase tracking-widest font-display text-zinc-500 text-right">
                Net Yield
              </th>
              <th className="py-3.5 px-6 text-[10px] font-bold uppercase tracking-widest font-display text-zinc-500 text-right">
                Estimated Value
              </th>
              <th className="py-3.5 px-6 text-[10px] font-bold uppercase tracking-widest font-display text-zinc-500">
                Engine Rationale
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.03]">
            {comparison.map((item, index) => {
              const isWinner = index === 0;
              const isRunnerUp = index === 1;
              const isThird = index === 2;
              const isExclusion = item.isExclusion;
              const barWidth = max > 0 ? Math.max(0, (item.ratePercent / max) * 100) : 0;

              return (
                <tr
                  key={item.card.id}
                  className={`transition-colors animate-float-up ${
                    isWinner
                      ? 'bg-[#d4af37]/[0.08] hover:bg-[#d4af37]/[0.12] winner-glow'
                      : isRunnerUp
                      ? 'bg-slate-300/[0.04] hover:bg-slate-300/[0.07]'
                      : isThird
                      ? 'bg-amber-900/[0.04] hover:bg-amber-900/[0.07]'
                      : 'hover:bg-white/[0.02]'
                  }`}
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  {/* Rank & Tier Badge */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold font-display ${
                          isWinner
                            ? 'bg-gradient-to-br from-[#f3e5ab] via-[#d4af37] to-[#aa8c2c] text-[#060608] shadow-md shadow-[#d4af37]/20 font-black'
                            : isRunnerUp
                            ? 'bg-gradient-to-br from-white via-slate-200 to-slate-400 text-[#060608] shadow-sm font-black'
                            : isThird
                            ? 'bg-gradient-to-br from-[#f59e0b] via-[#b45309] to-[#78350f] text-white shadow-sm font-black'
                            : 'bg-white/[0.04] text-zinc-400 border border-white/[0.08]'
                        }`}
                      >
                        {index + 1}
                      </span>
                      {isWinner && (
                        <span className="hidden xl:inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full tier-badge-gold">
                          <Crown className="w-3 h-3 text-amber-300" />
                          Gold
                        </span>
                      )}
                      {isRunnerUp && (
                        <span className="hidden xl:inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full tier-badge-silver">
                          <Medal className="w-3 h-3 text-slate-200" />
                          Silver
                        </span>
                      )}
                      {isThird && (
                        <span className="hidden xl:inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full tier-badge-bronze">
                          <Award className="w-3 h-3 text-amber-500" />
                          Bronze
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Card Name & Metadata */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0 shadow-sm"
                        style={{ backgroundColor: item.card.theme.accentColor }}
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm font-semibold tracking-tight ${
                              isWinner ? 'text-white' : 'text-zinc-200'
                            }`}
                          >
                            {item.card.name}
                          </span>
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-zinc-400 font-display">
                            {item.card.network}
                          </span>
                        </div>
                        <span className="text-[11px] text-zinc-500 block">
                          {item.card.issuer} · {item.card.cardTier}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Reward Rate with Yield Bar */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <div className="hidden lg:block w-24 h-1.5 rounded-full overflow-hidden bg-white/[0.06]">
                        <div
                          className={`h-full rounded-full ${
                            isWinner
                              ? 'bg-gradient-to-r from-[#e5c07b] to-[#d4af37]'
                              : isRunnerUp
                              ? 'bg-slate-300'
                              : 'bg-zinc-600'
                          }`}
                          style={{
                            width: `${isExclusion ? 0 : barWidth}%`,
                            transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                          }}
                        />
                      </div>
                      <span
                        className={`font-display text-sm font-bold tabular-nums ${
                          isExclusion
                            ? 'text-rose-400'
                            : isWinner
                            ? 'text-[#d4af37]'
                            : isRunnerUp
                            ? 'text-zinc-200'
                            : 'text-zinc-400'
                        }`}
                      >
                        {isExclusion ? '0.0%' : `${item.ratePercent}%`}
                      </span>
                    </div>
                  </td>

                  {/* Estimated Value */}
                  <td className="py-4 px-6 text-right">
                    <span
                      className={`font-display text-sm font-bold tabular-nums ${
                        isExclusion
                          ? 'text-zinc-600'
                          : isWinner
                          ? 'text-emerald-400'
                          : 'text-zinc-300'
                      }`}
                    >
                      ₹{item.effectiveSavingInr.toLocaleString('en-IN')}
                    </span>
                  </td>

                  {/* Rationale / Exclusions */}
                  <td className="py-4 px-6 max-w-xs">
                    {isExclusion ? (
                      <span className="inline-flex items-center gap-1.5 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-lg">
                        <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0 text-rose-400" />
                        <span className="truncate">{item.reason}</span>
                      </span>
                    ) : (
                      <span className="text-xs text-zinc-400 truncate block">
                        {item.reason}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Ledger List */}
      <div className="md:hidden divide-y divide-white/[0.04]">
        {comparison.map((item, index) => {
          const isWinner = index === 0;
          const isRunnerUp = index === 1;
          const isThird = index === 2;
          const isExclusion = item.isExclusion;

          return (
            <div
              key={item.card.id}
              className={`p-4 flex items-center gap-3.5 ${
                isWinner
                  ? 'bg-[#d4af37]/[0.08]'
                  : isRunnerUp
                  ? 'bg-slate-300/[0.04]'
                  : isThird
                  ? 'bg-amber-900/[0.04]'
                  : ''
              }`}
            >
              <div className="flex flex-col items-center gap-1 flex-shrink-0">
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-display ${
                    isWinner
                      ? 'bg-gradient-to-br from-[#f3e5ab] via-[#d4af37] to-[#aa8c2c] text-[#060608] shadow-sm font-black'
                      : isRunnerUp
                      ? 'bg-gradient-to-br from-white via-slate-200 to-slate-400 text-[#060608] font-black'
                      : isThird
                      ? 'bg-gradient-to-br from-[#f59e0b] via-[#b45309] to-[#78350f] text-white font-black'
                      : 'bg-white/[0.04] text-zinc-400 border border-white/[0.08]'
                  }`}
                >
                  {index + 1}
                </span>
                {isWinner && <Crown className="w-3 h-3 text-amber-300" />}
                {isRunnerUp && <Medal className="w-3 h-3 text-slate-300" />}
                {isThird && <Award className="w-3 h-3 text-amber-500" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={`text-sm font-semibold truncate ${isWinner ? 'text-white' : 'text-zinc-200'}`}>
                    {item.card.name}
                  </p>
                  <span className="text-[8px] font-bold px-1 py-0.2 rounded bg-white/[0.05] text-zinc-400 font-display">
                    {item.card.network}
                  </span>
                </div>
                <p className="text-[11px] truncate text-zinc-500">
                  {isExclusion ? 'Excluded: 0% reward' : item.reason}
                </p>
              </div>

              <div className="text-right flex-shrink-0">
                <p
                  className={`font-display text-sm font-bold tabular-nums ${
                    isExclusion ? 'text-rose-400' : isWinner ? 'text-[#d4af37]' : 'text-zinc-300'
                  }`}
                >
                  {isExclusion ? '0.0%' : `${item.ratePercent}%`}
                </p>
                <p
                  className={`font-display text-xs tabular-nums ${
                    isExclusion ? 'text-zinc-600' : isWinner ? 'text-emerald-400' : 'text-zinc-400'
                  }`}
                >
                  ₹{item.effectiveSavingInr.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
