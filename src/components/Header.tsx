import React from 'react';
import { CreditCard, Sparkles, ShieldCheck, Zap } from 'lucide-react';

interface HeaderProps {
  walletCount: number;
  onOpenDeck: () => void;
}

export const Header: React.FC<HeaderProps> = ({ walletCount, onOpenDeck }) => {
  return (
    <header className="border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-[1px] shadow-lg shadow-emerald-500/10">
            <div className="w-full h-full bg-zinc-950 rounded-[11px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl tracking-tight text-white">TapWise</span>
              <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                India Engine
              </span>
            </div>
            <p className="text-xs text-zinc-400 hidden sm:block">
              Zero-friction credit card swipe optimizer for Indian cardholders
            </p>
          </div>
        </div>

        {/* Right side stats & wallet trigger */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-4 text-xs text-zinc-400 mr-2 border-r border-zinc-800 pr-4">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              0% KYC · 100% Private
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              MCC & POS Gateway AI
            </span>
          </div>

          <button
            onClick={onOpenDeck}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/60 text-sm font-medium text-zinc-200 transition-all hover:border-zinc-500 active:scale-[0.98]"
          >
            <CreditCard className="w-4 h-4 text-emerald-400" />
            <span>My Cards</span>
            <span className="px-1.5 py-0.2 text-xs font-semibold bg-emerald-500/20 text-emerald-300 rounded-md">
              {walletCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
