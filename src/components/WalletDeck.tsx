import React from 'react';
import { CreditCard as CardIcon, Check, X } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-zinc-950 border border-zinc-800 w-full max-w-4xl max-h-[90vh] rounded-2xl flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <CardIcon className="w-5 h-5 text-emerald-400" />
              Your Credit Card Deck
              <span className="text-xs font-normal text-zinc-400 ml-2">
                ({activeCardIds.length} of {INDIAN_CARDS.length} active)
              </span>
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Select the cards you currently carry. TapWise calculates real-time rewards exclusively across your active deck.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Presets Bar */}
        <div className="px-6 py-3 bg-zinc-900/60 border-b border-zinc-800/80 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mr-1">
            Quick Presets:
          </span>
          {PRESET_WALLETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => onSelectPreset(preset.cardIds)}
              className="text-xs px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 hover:border-zinc-500 transition-all flex items-center gap-1.5"
            >
              <span>{preset.name}</span>
              <span className="text-[10px] text-zinc-400">({preset.cardIds.length})</span>
            </button>
          ))}
        </div>

        {/* Card Grid */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {INDIAN_CARDS.map((card) => {
            const isActive = activeCardIds.includes(card.id);
            return (
              <div
                key={card.id}
                onClick={() => onToggleCard(card.id)}
                className={`group relative p-4 rounded-xl border transition-all cursor-pointer select-none card-sheen ${
                  isActive
                    ? 'border-emerald-500/50 bg-gradient-to-br from-zinc-900 to-zinc-950 shadow-lg shadow-emerald-500/5'
                    : 'border-zinc-800/60 bg-zinc-900/30 opacity-60 hover:opacity-90 hover:border-zinc-700'
                }`}
              >
                {/* Active Checkbox badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                      {card.issuer}
                    </span>
                    {card.isRupayUPI && (
                      <span className="px-1.5 py-0.5 text-[9px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded">
                        RuPay UPI
                      </span>
                    )}
                  </div>
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                      isActive
                        ? 'bg-emerald-500 border-emerald-400 text-black'
                        : 'border-zinc-700 bg-zinc-800/50 text-transparent'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </div>

                {/* Card Title & Tier */}
                <h3 className="font-semibold text-white text-sm tracking-tight mb-1">
                  {card.name}
                </h3>
                <div className="flex items-center gap-2 text-xs text-zinc-400 mb-3">
                  <span>{card.cardTier}</span>
                  <span>•</span>
                  <span>{card.network}</span>
                  <span>•</span>
                  <span>{card.annualFee === 0 ? 'Free' : `₹${card.annualFee}/yr`}</span>
                </div>

                {/* Key Highlight Perk */}
                {card.perks[0] && (
                  <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-lg p-2 text-xs">
                    <div className="font-medium text-emerald-400 flex items-center justify-between">
                      <span>{card.perks[0].title}</span>
                      {card.perks[0].badge && (
                        <span className="text-[10px] font-bold text-amber-400">
                          {card.perks[0].badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1">
                      {card.perks[0].description}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-zinc-800 bg-zinc-950 flex items-center justify-between">
          <div className="text-xs text-zinc-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Changes saved locally. No sign-up required.
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm rounded-lg transition-all active:scale-[0.98]"
          >
            Done Selecting
          </button>
        </div>
      </div>
    </div>
  );
};
