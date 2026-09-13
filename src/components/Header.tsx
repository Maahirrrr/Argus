import React from 'react';
import { Wallet, Cpu, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  walletCount: number;
  onOpenDeck: () => void;
}

export const Header: React.FC<HeaderProps> = ({ walletCount, onOpenDeck }) => {
  return (
    <header className="sticky top-0 z-50">
      {/* Animated gradient beam line at very top */}
      <div className="gradient-bar h-[2px] w-full" />

      <div className="glass border-b border-white/5">
        <div className="max-w-6xl mx-auto px-5 h-[62px] flex items-center justify-between">

          {/* Brand */}
          <div className="flex items-center gap-3">
            {/* Logo mark */}
            <div className="relative w-9 h-9 flex-shrink-0">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-[#c9a84c] opacity-80 blur-[6px]" />
              <div className="relative w-9 h-9 rounded-xl bg-[#080c18] border border-white/10 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="1" y="4" width="16" height="11" rx="2" stroke="#c9a84c" strokeWidth="1.5"/>
                  <rect x="1" y="7.5" width="16" height="2" fill="#c9a84c" opacity="0.6"/>
                  <circle cx="4.5" cy="12" r="1" fill="#6366f1"/>
                  <circle cx="7.5" cy="12" r="1" fill="#6366f1" opacity="0.6"/>
                </svg>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span
                  className="font-display text-[18px] font-bold tracking-[-0.03em]"
                  style={{ color: '#f0f4ff' }}
                >
                  TapWise
                </span>
                <span className="hidden sm:inline tag-indigo text-[10px] font-semibold px-2 py-0.5 rounded-full font-display tracking-wide">
                  India Engine
                </span>
              </div>
              <p className="hidden sm:block text-[11px] leading-none mt-0.5" style={{ color: '#454d62' }}>
                Credit card reward optimizer · 15 cards · Sub-second AI
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Trust badges — hidden on small screens */}
            <div className="hidden lg:flex items-center gap-4 pr-4 mr-1 border-r border-white/5 text-[11px]" style={{ color: '#454d62' }}>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" style={{ color: '#c9a84c' }} />
                Zero KYC
              </span>
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" style={{ color: '#6366f1' }} />
                MCC + POS Resolver
              </span>
            </div>

            {/* Wallet trigger */}
            <button
              onClick={onOpenDeck}
              className="relative flex items-center gap-2.5 px-4 py-2 rounded-xl btn-ghost text-sm font-medium cursor-pointer"
            >
              <Wallet className="w-4 h-4" />
              <span className="hidden sm:inline" style={{ color: '#8892aa' }}>My Wallet</span>
              {/* Count badge */}
              <span
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold font-display"
                style={{
                  background: 'linear-gradient(135deg, #c9a84c, #e2c06a)',
                  color: '#0a0810',
                }}
              >
                {walletCount}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
