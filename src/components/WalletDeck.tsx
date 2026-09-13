import React from 'react';
import { X, Check, Wallet, Sparkles, CreditCard as CardIcon } from 'lucide-react';
import { INDIAN_CARDS } from '../data/cards';
import { PRESET_WALLETS } from '../lib/storage';
import { ContactlessIcon } from './EmvChip';

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
      style={{ background: 'rgba(6, 6, 8, 0.85)', backdropFilter: 'blur(20px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full sm:max-w-4xl max-h-[92vh] sm:max-h-[88vh] rounded-t-3xl sm:rounded-3xl flex flex-col overflow-hidden cred-card"
        style={{
          boxShadow: '0 -24px 80px rgba(0,0,0,0.85), 0 0 0 1px rgba(212, 175, 55, 0.15)',
        }}
      >
        {/* Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-white/[0.07] flex items-center justify-between flex-shrink-0 bg-[#09090c]/80">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#d4af37]/10 border border-[#d4af37]/25">
              <Wallet className="w-5 h-5 text-[#d4af37]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-lg font-bold tracking-tight text-white">
                  Your Card Vault
                </h2>
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#d4af37]/15 text-[#f3e5ab] border border-[#d4af37]/30 font-display">
                  CRED Grade
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                {activeCardIds.length} of {INDIAN_CARDS.length} cards active · Stored in local sandbox, zero KYC
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer transition-all bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white border border-white/[0.06]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Presets Bar */}
        <div className="px-6 sm:px-8 py-3.5 border-b border-white/[0.05] bg-[#07070a]/90 flex-shrink-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mr-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#d4af37]" />
              Quick Deck:
            </span>
            {PRESET_WALLETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => onSelectPreset(preset.cardIds)}
                className="btn-cred-dark flex items-center gap-2 text-xs px-3 py-1.5 rounded-xl font-medium cursor-pointer transition-all"
              >
                <span>{preset.name}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#d4af37]/15 text-[#f3e5ab] font-display">
                  {preset.cardIds.length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Card Grid */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INDIAN_CARDS.map((card) => {
            const isActive = activeCardIds.includes(card.id);
            return (
              <button
                key={card.id}
                onClick={() => onToggleCard(card.id)}
                className={`group relative p-5 rounded-2xl text-left cursor-pointer transition-all duration-300 select-none ${
                  isActive
                    ? 'cred-card-gold shadow-lg shadow-black/40 scale-[1.01]'
                    : 'bg-[#0b0b0f] border border-white/[0.06] opacity-60 hover:opacity-90 hover:border-white/[0.12]'
                }`}
              >
                {/* Active Checkmark Pill */}
                {isActive && (
                  <div className="absolute top-3.5 right-3.5 w-6 h-6 rounded-full flex items-center justify-center bg-gradient-to-br from-[#f3e5ab] via-[#d4af37] to-[#aa8c2c] text-[#060608] shadow-md shadow-[#d4af37]/30">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}

                {/* Top: Issuer & Tier */}
                <div className="flex items-center justify-between pr-8 mb-2">
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.16em] font-display"
                    style={{ color: isActive ? card.theme.accentColor : '#888892' }}
                  >
                    {card.issuer}
                  </span>
                  <ContactlessIcon className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                </div>

                {/* Middle: Card Name */}
                <h4
                  className={`font-display text-sm font-bold tracking-tight mb-4 line-clamp-1 ${
                    isActive ? 'text-white' : 'text-zinc-400'
                  }`}
                >
                  {card.name}
                </h4>

                {/* Bottom: Yield & Network */}
                <div className="pt-3 border-t border-white/[0.06] flex items-end justify-between">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-zinc-500 block font-semibold">
                      Base Rate
                    </span>
                    <span
                      className={`font-display text-lg font-bold tabular-nums ${
                        isActive ? 'text-[#d4af37]' : 'text-zinc-500'
                      }`}
                    >
                      {card.baseRewardPercent}%
                    </span>
                  </div>

                  <div className="text-right flex flex-col items-end gap-1">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-zinc-400 font-display">
                      {card.network}
                    </span>
                    <span className="text-[9px] text-zinc-600 font-display">
                      {card.cardTier}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 sm:px-8 py-4 border-t border-white/[0.06] flex-shrink-0 flex items-center justify-between bg-[#08080a]">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <CardIcon className="w-4 h-4 text-[#d4af37]" />
            <span>
              <strong className="text-white font-display">{activeCardIds.length}</strong> card{activeCardIds.length !== 1 ? 's' : ''} active for evaluation
            </span>
          </div>
          <button
            onClick={onClose}
            className="btn-cred-gold px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer font-display"
          >
            Apply & Optimize
          </button>
        </div>
      </div>
    </div>
  );
};
