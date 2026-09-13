import React from 'react';
import {
  Search,
  IndianRupee,
  Store,
  Globe,
  QrCode,
  Plane,
  Compass,
  Sparkles,
  Wallet,
  Plus
} from 'lucide-react';
import type { PaymentChannel, CreditCard } from '../lib/types';
import { PRESET_WALLETS } from '../lib/storage';

interface SearchOptimizerProps {
  query: string;
  onQueryChange: (q: string) => void;
  amount: number;
  onAmountChange: (a: number) => void;
  selectedChannel: PaymentChannel | 'auto';
  onChannelChange: (c: PaymentChannel | 'auto') => void;
  onQuickSelectQuery: (q: string, channel?: PaymentChannel | 'auto', amount?: number) => void;
  activeCards?: CreditCard[];
  onToggleCard?: (cardId: string) => void;
  onSelectPreset?: (cardIds: string[]) => void;
  onOpenDeck?: () => void;
}

const QUICK_SPENDS = [500, 1000, 2500, 10000, 50000];

const CHANNELS: { id: PaymentChannel | 'auto'; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'auto', label: 'Auto', icon: Sparkles },
  { id: 'online', label: 'Online', icon: Globe },
  { id: 'offline_pos', label: 'In-Store', icon: Store },
  { id: 'rupay_upi', label: 'UPI QR', icon: QrCode },
  { id: 'portal_smartbuy', label: 'SmartBuy', icon: Plane },
  { id: 'forex_intl', label: 'Forex', icon: Compass },
];

const CURATED_TESTS = [
  { label: 'DMart Ready', query: 'DMart Ready', channel: 'online' as PaymentChannel, amount: 3500, tag: '5%' },
  { label: 'PAYTM*DMART', query: 'PAYTM*DMART INDORE', channel: 'offline_pos' as PaymentChannel, amount: 3500, tag: 'POS Trap' },
  { label: 'RAZORPAY*BLINKIT', query: 'RAZORPAY*BLINKIT GURGAON', channel: 'online' as PaymentChannel, amount: 850, tag: 'Gateway' },
  { label: 'Swiggy', query: 'Swiggy', channel: 'online' as PaymentChannel, amount: 1200, tag: '10%' },
  { label: 'MakeMyTrip', query: 'MakeMyTrip', channel: 'online' as PaymentChannel, amount: 28000, tag: 'SmartBuy' },
  { label: 'BESCOM Utility', query: 'BILLDESK*BESCOM', channel: 'online' as PaymentChannel, amount: 2400, tag: 'Utility' },
  { label: 'Airtel Fiber', query: 'Airtel Thanks', channel: 'online' as PaymentChannel, amount: 1199, tag: '25%' },
  { label: 'Kirana UPI', query: 'Kirana Store UPI', channel: 'rupay_upi' as PaymentChannel, amount: 450, tag: 'RuPay' },
  { label: 'CRED RentPay', query: 'DREAMPLUG RENTPAY', channel: 'online' as PaymentChannel, amount: 35000, tag: '0% Excl' },
  { label: 'Tanishq Gold', query: 'TITAN TANISHQ STORE', channel: 'offline_pos' as PaymentChannel, amount: 75000, tag: 'Jewelry' },
  { label: 'Airbnb USD', query: 'Airbnb Tokyo USD', channel: 'forex_intl' as PaymentChannel, amount: 42000, tag: 'Forex' },
];

export const SearchOptimizer: React.FC<SearchOptimizerProps> = ({
  query,
  onQueryChange,
  amount,
  onAmountChange,
  selectedChannel,
  onChannelChange,
  onQuickSelectQuery,
  activeCards = [],
  onSelectPreset,
  onOpenDeck,
}) => {
  return (
    <div className="glass-surface gradient-ring rounded-3xl p-5 sm:p-7 relative overflow-hidden flex flex-col gap-5">
      {/* Ambient glow */}
      <div className="shimmer-orb w-64 h-64 bg-[#d4af37]/8 -top-20 -right-20 pointer-events-none" />

      {/* Header & Mode */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="section-label">Optimization Console</span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
        </div>
        <span className="text-[10px] font-mono text-zinc-500 uppercase">
          Live POS Engine
        </span>
      </div>

      {/* Main Search Inputs */}
      <div className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1 group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-zinc-500 group-focus-within:text-[#d4af37] transition-colors" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Merchant, POS string, descriptor (e.g. RAZORPAY*BLINKIT)…"
            className="input-floating w-full pl-10 pr-4 py-3.5 rounded-2xl text-xs sm:text-sm font-medium placeholder:text-zinc-600"
          />
        </div>

        <div className="relative w-full sm:w-36 flex-shrink-0">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <IndianRupee className="w-3.5 h-3.5 text-zinc-500" />
          </div>
          <input
            type="number"
            min="10"
            step="100"
            value={amount || ''}
            onChange={(e) => onAmountChange(Number(e.target.value) || 0)}
            placeholder="1,000"
            className="input-floating w-full pl-9 pr-3 py-3.5 rounded-2xl text-xs sm:text-sm font-display font-semibold"
          />
        </div>
      </div>

      {/* Quick Spend Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto scroll-x -mt-2">
        <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-600 font-display flex-shrink-0 mr-1">
          Amount:
        </span>
        {QUICK_SPENDS.map((val) => (
          <button
            key={val}
            onClick={() => onAmountChange(val)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-display font-semibold cursor-pointer transition-all flex-shrink-0 ${
              amount === val
                ? 'bg-[#d4af37]/20 text-[#f3e5ab] border border-[#d4af37]/40'
                : 'bg-white/[0.02] text-zinc-500 hover:text-zinc-300 border border-white/[0.04]'
            }`}
          >
            ₹{val.toLocaleString('en-IN')}
          </button>
        ))}
      </div>

      {/* Channel Pills */}
      <div>
        <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-display mb-2">
          Payment Route
        </div>
        <div className="scroll-x flex gap-1.5 pb-1">
          {CHANNELS.map((ch) => {
            const Icon = ch.icon;
            const isSelected = selectedChannel === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => onChannelChange(ch.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all flex-shrink-0 border ${
                  isSelected
                    ? 'bg-[#d4af37] text-[#060608] font-bold border-[#d4af37] shadow-sm shadow-[#d4af37]/20'
                    : 'bg-white/[0.03] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.06] border-white/[0.06]'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{ch.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Vault Quick Switcher */}
      {activeCards.length > 0 && onSelectPreset && onOpenDeck && (
        <div className="pt-3 border-t border-white/[0.05]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Wallet className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 font-display">
                Active Vault ({activeCards.length} Cards)
              </span>
            </div>
            <button
              onClick={onOpenDeck}
              className="text-[10px] font-bold text-[#d4af37] hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>Manage Vault</span>
              <Plus className="w-3 h-3" />
            </button>
          </div>

          {/* Quick Preset Selector */}
          <div className="flex gap-1.5 overflow-x-auto scroll-x mb-2">
            {PRESET_WALLETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => onSelectPreset(preset.cardIds)}
                className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-white/[0.03] hover:bg-white/[0.06] text-zinc-400 hover:text-white border border-white/[0.05] whitespace-nowrap cursor-pointer transition-all"
                title={preset.tag}
              >
                {preset.name}
              </button>
            ))}
          </div>

          {/* Active Card Mini Chips */}
          <div className="flex flex-wrap gap-1.5">
            {activeCards.map((card) => (
              <span
                key={card.id}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[10px] font-medium bg-white/[0.03] border border-white/[0.06] text-zinc-300"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: card.theme.accentColor }}
                />
                <span className="truncate max-w-[140px]">{card.name}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Curated Benchmark Edge Cases */}
      <div className="pt-3 border-t border-white/[0.05]">
        <div className="flex items-center gap-1.5 mb-2">
          <Sparkles className="w-3 h-3 text-[#d4af37]" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-display">
            Benchmark Edge Cases
          </span>
        </div>
        <div className="scroll-x flex gap-1.5 pb-1">
          {CURATED_TESTS.map((tc) => (
            <button
              key={tc.label}
              onClick={() => onQuickSelectQuery(tc.query, tc.channel, tc.amount)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.05] hover:border-[#d4af37]/30 text-[11px] text-zinc-400 hover:text-zinc-200 transition-all cursor-pointer whitespace-nowrap flex-shrink-0"
            >
              <span className="text-zinc-300 font-medium">{tc.label}</span>
              <span className="text-[9px] font-bold font-display text-[#d4af37] opacity-80">{tc.tag}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
