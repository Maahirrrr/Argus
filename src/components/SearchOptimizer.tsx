import React from 'react';
import { motion } from 'motion/react';
import { Search, IndianRupee, Store, Globe, QrCode, Plane, Compass, Sparkles } from 'lucide-react';
import type { PaymentChannel } from '../lib/types';

interface SearchOptimizerProps {
  query: string;
  onQueryChange: (q: string) => void;
  amount: number;
  onAmountChange: (a: number) => void;
  selectedChannel: PaymentChannel | 'auto';
  onChannelChange: (c: PaymentChannel | 'auto') => void;
  onQuickSelectQuery: (q: string, channel?: PaymentChannel | 'auto', amount?: number) => void;
}

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
}) => {
  return (
    <div className="glass-surface gradient-ring rounded-3xl p-6 sm:p-8 relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="shimmer-orb w-64 h-64 bg-[#d4af37]/8 -top-20 -right-20" />

      {/* Section header */}
      <div className="flex items-center gap-2 mb-6">
        <span className="section-label">Optimization Engine</span>
        <div className="flex-1 h-px bg-gradient-to-r from-[#d4af37]/30 to-transparent" />
      </div>

      {/* Search Inputs */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-zinc-600 group-focus-within:text-[#d4af37] transition-colors" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Merchant, POS string, descriptor (e.g. RAZORPAY*BLINKIT)..."
            className="input-floating w-full pl-11 pr-4 py-4 rounded-2xl text-sm font-medium placeholder:text-zinc-600"
          />
        </div>

        <div className="relative w-full sm:w-40">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <IndianRupee className="w-4 h-4 text-zinc-600" />
          </div>
          <input
            type="number"
            min="10"
            step="100"
            value={amount || ''}
            onChange={(e) => onAmountChange(Number(e.target.value) || 0)}
            placeholder="Amount"
            className="input-floating w-full pl-10 pr-4 py-4 rounded-2xl text-sm font-display font-semibold"
          />
        </div>
      </div>

      {/* Channel Pills */}
      <div className="mt-5 scroll-x flex gap-2 pb-1">
        {CHANNELS.map((ch, idx) => {
          const Icon = ch.icon;
          const isSelected = selectedChannel === ch.id;
          return (
            <motion.button
              key={ch.id}
              onClick={() => onChannelChange(ch.id)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04, duration: 0.3 }}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.96 }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors flex-shrink-0 ${
                isSelected
                  ? 'bg-[#d4af37] text-[#060608] font-bold shadow-md shadow-[#d4af37]/20'
                  : 'bg-white/[0.04] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.07] border border-white/[0.06]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{ch.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Curated Tests */}
      <div className="mt-5 pt-4 border-t border-white/[0.05]">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-3 h-3 text-[#d4af37]" />
          <span className="section-label">Benchmark edge cases</span>
        </div>
        <div className="scroll-x flex gap-2 pb-1">
          {CURATED_TESTS.map((tc, idx) => (
            <motion.button
              key={tc.label}
              onClick={() => onQuickSelectQuery(tc.query, tc.channel, tc.amount)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.03 + 0.2 }}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05] hover:border-[#d4af37]/30 text-xs text-zinc-400 hover:text-zinc-200 transition-all cursor-pointer whitespace-nowrap flex-shrink-0"
            >
              <span className="text-zinc-300 font-medium">{tc.label}</span>
              <span className="text-[9px] font-bold font-display text-[#d4af37] opacity-70">{tc.tag}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};
