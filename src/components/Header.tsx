import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CreditCard as CardIcon, Lock, Zap } from 'lucide-react';

interface HeaderProps {
  walletCount: number;
  onOpenDeck: () => void;
}

export const Header: React.FC<HeaderProps> = ({ walletCount, onOpenDeck }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#060608]/95 backdrop-blur-2xl border-b border-white/[0.06]'
          : 'bg-transparent backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">

        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/5 border border-[#d4af37]/30 flex items-center justify-center">
            <span className="font-syne font-bold text-xs text-[#d4af37] tracking-wider">TW</span>
          </div>
          <div>
            <span className="font-syne font-bold text-base tracking-tight text-white">TapWise</span>
            <span className="hidden sm:inline text-zinc-500 text-xs ml-2">India Engine</span>
          </div>
        </div>

        {/* Center: Live indicator */}
        <div className="hidden md:flex items-center gap-2">
          <span className="live-badge">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Sub-second
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-[#d4af37]" />
              Zero KYC
            </span>
            <span className="text-zinc-700">|</span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-emerald-400" />
              100% Local
            </span>
          </div>

          <motion.button
            onClick={onOpenDeck}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="btn-cred-dark flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer"
          >
            <CardIcon className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="text-zinc-200">Vault</span>
            <motion.span
              key={walletCount}
              initial={{ scale: 1.4 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#d4af37]/20 text-[#f3e5ab] font-display"
            >
              {walletCount}
            </motion.span>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};
