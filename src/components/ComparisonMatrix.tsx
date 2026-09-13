import React from 'react';
import { ShieldAlert } from 'lucide-react';
import type { SwipeRecommendation } from '../lib/types';

interface ComparisonMatrixProps {
  comparison: SwipeRecommendation['comparison'];
  spendAmount: number;
}

export const ComparisonMatrix: React.FC<ComparisonMatrixProps> = ({ comparison, spendAmount }) => {
  return (
    <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">
            Wallet Leaderboard for this Swipe
          </h3>
          <p className="text-xs text-zinc-400">
            How every card in your active deck scores for this exact transaction (₹{spendAmount.toLocaleString('en-IN')})
          </p>
        </div>
        <span className="text-xs font-medium text-zinc-400">
          {comparison.length} cards evaluated
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-zinc-300">
          <thead className="bg-zinc-950/60 text-zinc-400 uppercase tracking-wider text-[10px] border-b border-zinc-800">
            <tr>
              <th className="py-3 px-3">Rank</th>
              <th className="py-3 px-4">Card Name</th>
              <th className="py-3 px-3 text-right">Return Rate</th>
              <th className="py-3 px-3 text-right">Estimated Value</th>
              <th className="py-3 px-4">Rule / Rationale</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            {comparison.map((item, index) => {
              const isWinner = index === 0;
              return (
                <tr
                  key={item.card.id}
                  className={`transition-colors ${
                    isWinner
                      ? 'bg-emerald-500/5 font-medium text-white'
                      : 'hover:bg-zinc-800/30 text-zinc-300'
                  }`}
                >
                  <td className="py-3.5 px-3">
                    <span
                      className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-bold ${
                        isWinner
                          ? 'bg-emerald-500 text-black'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      #{index + 1}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-zinc-100">{item.card.name}</span>
                      <span className="text-[10px] text-zinc-500 font-mono">({item.card.network})</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-3 text-right font-semibold">
                    <span
                      className={
                        item.isExclusion
                          ? 'text-rose-400 font-normal'
                          : isWinner
                          ? 'text-emerald-400 font-bold'
                          : 'text-zinc-200'
                      }
                    >
                      {item.isExclusion ? '0.0%' : `${item.ratePercent}%`}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-right font-mono">
                    <span
                      className={
                        item.isExclusion
                          ? 'text-zinc-500'
                          : isWinner
                          ? 'text-emerald-400 font-bold'
                          : 'text-zinc-300'
                      }
                    >
                      ₹{item.effectiveSavingInr.toLocaleString('en-IN')}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-zinc-400 max-w-xs md:max-w-md truncate">
                    {item.isExclusion ? (
                      <span className="text-rose-400/90 flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3 shrink-0" />
                        {item.reason}
                      </span>
                    ) : (
                      item.reason
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
