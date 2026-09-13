import React from 'react';
import { X, Check, Wallet } from 'lucide-react';
import { INDIAN_CARDS } from '../data/cards';
import { PRESET_WALLETS } from '../lib/storage';

interface WalletDeckProps {
  isOpen: boolean;
  onClose: () => void;
  activeCardIds: string[];
  onToggleCard: (cardId: string) => void;
  onSelectPreset: (cardIds: string[]) => void;
}

export const WalletDeck: React.FC<WalletDeckProps> = ({
  isOpen,
  onClose,
  activeCardIds,
  onToggleCard,
  onSelectPreset,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(2,4,9,0.85)', backdropFilter: 'blur(16px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full sm:max-w-4xl max-h-[92vh] sm:max-h-[88vh] rounded-t-3xl sm:rounded-2xl flex flex-col overflow-hidden animate-fade-up"
        style={{
          background: 'rgba(8,12,22,0.97)',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 -24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.08)',
        }}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b flex items-center justify-between flex-shrink-0" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }}
            >
              <Wallet className="w-4 h-4" style={{ color: '#c9a84c' }} />
            </div>
            <div>
              <h2 className="font-display text-base font-bold tracking-tight" style={{ color: '#f0f4ff' }}>
                Your Card Deck
              </h2>
              <p className="text-[11px]" style={{ color: '#454d62' }}>
                {activeCardIds.length} of {INDIAN_CARDS.length} active · stored locally, never sent
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center cursor-pointer transition-all btn-ghost"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Presets bar */}
        <div className="px-6 py-3 border-b flex-shrink-0" style={{ background: 'rgba(5,8,16,0.5)', borderColor: 'rgba(255,255,255,0.05)' }}>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest mr-1" style={{ color: '#454d62' }}>
              Quick stack
            </span>
            {PRESET_WALLETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => onSelectPreset(preset.cardIds)}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-all btn-ghost"
              >
                <span>{preset.name}</span>
                <span
                  className="text-[9px] font-bold px-1.5 py-0.5 rounded font-display"
                  style={{ background: 'rgba(99,102,241,0.12)', color: '#818cf8' }}
                >
                  {preset.cardIds.length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Card grid */}
        <div className="p-5 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {INDIAN_CARDS.map((card) => {
            const isActive = activeCardIds.includes(card.id);
            return (
              <button
                key={card.id}
                onClick={() => onToggleCard(card.id)}
                className={`card-3d card-holo relative p-4 rounded-xl text-left cursor-pointer transition-all select-none ${
                  isActive ? '' : 'opacity-50 hover:opacity-80'
                }`}
                style={
                  isActive
                    ? {
                        background: `linear-gradient(135deg, ${card.theme.accentColor}14 0%, rgba(8,12,22,0.9) 70%)`,
                        border: `1px solid ${card.theme.accentColor}40`,
                        boxShadow: `0 8px 32px rgba(0,0,0,0.3)`,
                      }
                    : {
                        background: 'rgba(8,12,22,0.6)',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }
                }
              >
                {/* Active check */}
                {isActive && (
                  <div
                    className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #c9a84c, #e2c06a)' }}
                  >
                    <Check className="w-3 h-3" style={{ color: '#0a0810' }} />
                  </div>
                )}

                {/* Card info */}
                <div>
                  <p
                    className="text-[9px] font-bold uppercase tracking-[0.15em] mb-1"
                    style={{ color: card.theme.accentColor, opacity: 0.7 }}
                  >
                    {card.issuer}
                  </p>
                  <p
                    className="font-display text-sm font-bold tracking-tight leading-tight mb-3"
                    style={{ color: isActive ? '#f0f4ff' : '#8892aa' }}
                  >
                    {card.name}
                  </p>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[9px] uppercase tracking-wider mb-0.5" style={{ color: '#454d62' }}>
                      Base reward
                    </p>
                    <p
                      className="font-display text-lg font-bold"
                      style={{ color: isActive ? card.theme.accentColor : '#454d62' }}
                    >
                      {card.baseRewardPercent}%
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className="text-[9px] font-semibold px-2 py-0.5 rounded font-display"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        color: '#454d62',
                      }}
                    >
                      {card.network}
                    </span>
                  </div>
                </div>

                {/* Tier tag */}
                <div className="mt-2">
                  <span
                    className="text-[9px] font-semibold font-display"
                    style={{ color: '#454d62' }}
                  >
                    {card.cardTier}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex-shrink-0 flex items-center justify-between" style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(5,8,16,0.5)' }}>
          <p className="text-xs" style={{ color: '#454d62' }}>
            {activeCardIds.length} card{activeCardIds.length !== 1 ? 's' : ''} active
          </p>
          <button
            onClick={onClose}
            className="btn-gold px-5 py-2 rounded-xl text-sm cursor-pointer"
          >
            Optimize →
          </button>
        </div>
      </div>
    </div>
  );
};
