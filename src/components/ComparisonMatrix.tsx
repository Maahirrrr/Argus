import React from 'react';
import { ShieldAlert, ChevronUp } from 'lucide-react';
import type { SwipeRecommendation } from '../lib/types';

interface ComparisonMatrixProps {
  comparison: SwipeRecommendation['comparison'];
  spendAmount: number;
}

export const ComparisonMatrix: React.FC<ComparisonMatrixProps> = ({ comparison, spendAmount }) => {
  const max = comparison[0]?.ratePercent || 1;

  return (
    <div
      className="rounded-2xl overflow-hidden animate-fade-up delay-100"
      style={{
        background: 'rgba(8, 12, 22, 0.8)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Header */}
      <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div>
          <h3 className="font-display text-sm font-bold tracking-tight" style={{ color: '#f0f4ff' }}>
            Wallet Leaderboard
          </h3>
          <p className="text-[11px] mt-0.5" style={{ color: '#454d62' }}>
            All {comparison.length} cards ranked for ₹{spendAmount.toLocaleString('en-IN')}
          </p>
        </div>
        <div
          className="flex items-center gap-1 text-[10px] font-semibold font-display px-2.5 py-1 rounded-lg"
          style={{ background: 'rgba(79,70,229,0.1)', color: '#818cf8', border: '1px solid rgba(79,70,229,0.2)' }}
        >
          <ChevronUp className="w-3 h-3" />
          {comparison.length} evaluated
        </div>
      </div>

      {/* Table — desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              {['#', 'Card', 'Reward Rate', 'Estimated Value', 'Rule'].map((h, i) => (
                <th
                  key={h}
                  className={`py-3 px-4 text-[10px] font-bold uppercase tracking-widest font-display ${i > 1 ? 'text-right' : 'text-left'}`}
                  style={{ color: '#454d62', background: 'rgba(5,8,16,0.4)' }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparison.map((item, index) => {
              const isWinner = index === 0;
              const isExclusion = item.isExclusion;
              const barWidth = max > 0 ? Math.max(0, (item.ratePercent / max) * 100) : 0;

              return (
                <tr
                  key={item.card.id}
                  className="transition-colors"
                  style={{
                    background: isWinner ? 'rgba(201,168,76,0.04)' : 'transparent',
                    borderBottom: '1px solid rgba(255,255,255,0.03)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isWinner) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = isWinner ? 'rgba(201,168,76,0.04)' : 'transparent';
                  }}
                >
                  {/* Rank */}
                  <td className="py-3.5 px-4 w-12">
                    <span
                      className="inline-flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-bold font-display"
                      style={
                        isWinner
                          ? { background: 'linear-gradient(135deg, #c9a84c, #e2c06a)', color: '#0a0810' }
                          : index === 1
                          ? { background: 'rgba(99,102,241,0.12)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.25)' }
                          : { background: 'rgba(255,255,255,0.04)', color: '#454d62', border: '1px solid rgba(255,255,255,0.06)' }
                      }
                    >
                      {index + 1}
                    </span>
                  </td>

                  {/* Card name */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      {/* Color dot */}
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: item.card.theme.accentColor, opacity: isWinner ? 1 : 0.5 }}
                      />
                      <span
                        className="text-sm font-semibold"
                        style={{ color: isWinner ? '#f0f4ff' : '#8892aa' }}
                      >
                        {item.card.name}
                      </span>
                      <span
                        className="text-[9px] font-mono"
                        style={{ color: '#454d62' }}
                      >
                        {item.card.network}
                      </span>
                    </div>
                  </td>

                  {/* Rate with mini bar */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      {/* Mini bar */}
                      <div className="hidden lg:block w-20 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${isExclusion ? 0 : barWidth}%`,
                            background: isWinner
                              ? 'linear-gradient(90deg, #c9a84c, #e2c06a)'
                              : 'rgba(99,102,241,0.6)',
                          }}
                        />
                      </div>
                      <span
                        className="font-display text-sm font-bold tabular-nums"
                        style={{
                          color: isExclusion
                            ? '#ef4444'
                            : isWinner
                            ? '#c9a84c'
                            : index === 1
                            ? '#818cf8'
                            : '#8892aa',
                        }}
                      >
                        {isExclusion ? '0.0%' : `${item.ratePercent}%`}
                      </span>
                    </div>
                  </td>

                  {/* Estimated value */}
                  <td className="py-3.5 px-4 text-right">
                    <span
                      className="font-display text-sm font-bold tabular-nums"
                      style={{
                        color: isExclusion
                          ? '#454d62'
                          : isWinner
                          ? '#22c55e'
                          : '#8892aa',
                      }}
                    >
                      ₹{item.effectiveSavingInr.toLocaleString('en-IN')}
                    </span>
                  </td>

                  {/* Rule */}
                  <td className="py-3.5 px-4 max-w-xs">
                    {isExclusion ? (
                      <span className="flex items-center gap-1.5 text-xs" style={{ color: '#ef444488' }}>
                        <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#ef4444' }} />
                        {item.reason}
                      </span>
                    ) : (
                      <span className="text-xs truncate block" style={{ color: '#454d62' }}>
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

      {/* Mobile card list */}
      <div className="md:hidden divide-y" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
        {comparison.map((item, index) => {
          const isWinner = index === 0;
          return (
            <div
              key={item.card.id}
              className="px-4 py-3.5 flex items-center gap-3"
              style={{ background: isWinner ? 'rgba(201,168,76,0.04)' : 'transparent' }}
            >
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold font-display flex-shrink-0"
                style={
                  isWinner
                    ? { background: 'linear-gradient(135deg, #c9a84c, #e2c06a)', color: '#0a0810' }
                    : { background: 'rgba(255,255,255,0.04)', color: '#454d62', border: '1px solid rgba(255,255,255,0.06)' }
                }
              >
                {index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: isWinner ? '#f0f4ff' : '#8892aa' }}>
                  {item.card.name}
                </p>
                <p className="text-[11px] truncate" style={{ color: '#454d62' }}>
                  {item.isExclusion ? '0% Exclusion' : item.reason}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p
                  className="font-display text-sm font-bold"
                  style={{ color: item.isExclusion ? '#ef4444' : isWinner ? '#c9a84c' : '#8892aa' }}
                >
                  {item.isExclusion ? '0%' : `${item.ratePercent}%`}
                </p>
                <p
                  className="font-display text-xs"
                  style={{ color: item.isExclusion ? '#454d62' : isWinner ? '#22c55e' : '#454d62' }}
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
