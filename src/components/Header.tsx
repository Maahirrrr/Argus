import React from 'react';
import { CreditCard as CardIcon, ShieldCheck, Lock } from 'lucide-react';

interface HeaderProps {
  walletCount: number;
  onOpenDeck: () => void;
}

export const Header: React.FC<HeaderProps> = ({ walletCount, onOpenDeck }) => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#060608]/90 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Brand: Private Banking Luxury Vibe */}
        <div className="flex items-center gap-3.5">
          {/* Foil Stamped Monogram */}
          <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-gradient-to-b from-[#1c1c24] to-[#0c0c10] p-[1px] shadow-lg shadow-black/60 border border-white/10">
            <div className="w-full h-full rounded-[11px] bg-[#08080c] flex items-center justify-center relative">
              <span className="font-display font-bold text-xs tracking-wider text-gold-foil">
                TW
              </span>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent pointer-events-none" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-lg font-bold tracking-tight text-white">
                TapWise
              </span>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest bg-[#d4af37]/10 text-[#e5c07b] border border-[#d4af37]/25 font-display">
                India Engine
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 hidden sm:block">
              Credit Card Rewards & POS Classifier · 15 Cards Mapped
            </p>
          </div>
        </div>

        {/* Right Side: Security & Deck Pill */}
        <div className="flex items-center gap-3.5">
          <div className="hidden md:flex items-center gap-4 pr-4 border-r border-white/10 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5 text-zinc-400">
              <Lock className="w-3.5 h-3.5 text-[#d4af37]" />
              Zero KYC
            </span>
            <span className="flex items-center gap-1.5 text-zinc-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Client-Side
            </span>
          </div>

          <button
            onClick={onOpenDeck}
            className="btn-cred-dark flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer active:scale-[0.98] transition-all"
          >
            <CardIcon className="w-4 h-4 text-[#d4af37]" />
            <span className="text-zinc-200">My Deck</span>
            <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-[#d4af37]/20 text-[#f3e5ab] font-display">
              {walletCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
