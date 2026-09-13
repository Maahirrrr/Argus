import React from 'react';
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
  { id: 'auto', label: 'Auto Detect', icon: Sparkles },
  { id: 'online', label: 'Online App', icon: Globe },
  { id: 'offline_pos', label: 'In-Store POS', icon: Store },
  { id: 'rupay_upi', label: 'RuPay UPI', icon: QrCode },
  { id: 'portal_smartbuy', label: 'SmartBuy / Portal', icon: Plane },
  { id: 'forex_intl', label: 'Forex (USD/EUR)', icon: Compass },
];

const CURATED_TESTS = [
  { label: 'DMart Ready', query: 'DMart Ready', channel: 'online' as PaymentChannel, amount: 3500, tag: '5% Online' },
  { label: 'PAYTM*DMART', query: 'PAYTM*DMART INDORE', channel: 'offline_pos' as PaymentChannel, amount: 3500, tag: 'POS Trap' },
  { label: 'RAZORPAY*BLINKIT', query: 'RAZORPAY*BLINKIT GURGAON', channel: 'online' as PaymentChannel, amount: 850, tag: 'POS String' },
  { label: 'Swiggy', query: 'Swiggy', channel: 'online' as PaymentChannel, amount: 1200, tag: 'Dining 10%' },
  { label: 'MakeMyTrip Flight', query: 'MakeMyTrip', channel: 'online' as PaymentChannel, amount: 28000, tag: 'SmartBuy' },
  { label: 'BILLDESK*BESCOM', query: 'BILLDESK*BESCOM', channel: 'online' as PaymentChannel, amount: 2400, tag: 'Utility' },
  { label: 'Airtel Fiber', query: 'Airtel Thanks', channel: 'online' as PaymentChannel, amount: 1199, tag: '25% Back' },
  { label: 'Kirana Store UPI', query: 'Kirana Store UPI', channel: 'rupay_upi' as PaymentChannel, amount: 450, tag: 'RuPay' },
  { label: 'CRED RentPay', query: 'DREAMPLUG RENTPAY', channel: 'online' as PaymentChannel, amount: 35000, tag: '0% Exclusion' },
  { label: 'Tanishq Gold', query: 'TITAN TANISHQ STORE', channel: 'offline_pos' as PaymentChannel, amount: 75000, tag: 'Jewelry 0%' },
  { label: 'Airbnb Tokyo USD', query: 'Airbnb Tokyo USD', channel: 'forex_intl' as PaymentChannel, amount: 42000, tag: '0% Forex' },
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
    <div className="cred-card rounded-2xl p-6 relative overflow-hidden">
      {/* Top Search Inputs Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Merchant / Descriptor Input */}
        <div className="relative flex-1 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-[#d4af37] transition-colors">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Type merchant, POS string (e.g. RAZORPAY*BLINKIT, DMart, BESCOM)..."
            className="cred-input w-full pl-12 pr-4 py-3.5 rounded-xl text-sm font-medium text-white placeholder:text-zinc-600"
          />
        </div>

        {/* Spend Amount Input */}
        <div className="relative w-full sm:w-44">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
            <IndianRupee className="w-4 h-4" />
          </div>
          <input
            type="number"
            min="10"
            step="100"
            value={amount || ''}
            onChange={(e) => onAmountChange(Number(e.target.value) || 0)}
            placeholder="Amount (₹)"
            className="cred-input w-full pl-10 pr-4 py-3.5 rounded-xl text-sm font-display font-semibold text-white"
          />
        </div>
      </div>

      {/* Segmented Channel Selector Pills */}
      <div className="mt-5 pt-4 border-t border-white/[0.06] flex flex-wrap items-center gap-1.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 mr-2 hidden sm:inline font-display">
          Channel:
        </span>
        {CHANNELS.map((ch) => {
          const Icon = ch.icon;
          const isSelected = selectedChannel === ch.id;
          return (
            <button
              key={ch.id}
              onClick={() => onChannelChange(ch.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                isSelected
                  ? 'btn-cred-gold'
                  : 'bg-[#0a0a0e] text-zinc-400 border border-white/[0.07] hover:border-white/20 hover:text-zinc-200'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#060608]' : 'text-zinc-500'}`} />
              <span>{ch.label}</span>
            </button>
          );
        })}
      </div>

      {/* Benchmark Edge-Case Scenarios */}
      <div className="mt-5 pt-4 border-t border-white/[0.06]">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-1 font-display">
            <Sparkles className="w-3 h-3 text-[#d4af37]" />
            1-Click Benchmark Edge Cases:
          </span>
          <span className="text-[10px] text-zinc-600 hidden md:inline">
            Test gateway disambiguation & exclusion rules
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {CURATED_TESTS.map((tc) => (
            <button
              key={tc.label}
              onClick={() => onQuickSelectQuery(tc.query, tc.channel, tc.amount)}
              className="group px-3 py-1.5 rounded-lg bg-[#0b0b0e] hover:bg-[#15151a] border border-white/[0.06] hover:border-[#d4af37]/40 text-xs text-zinc-400 hover:text-zinc-200 transition-all flex items-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <span className="font-medium text-zinc-300 group-hover:text-white">
                {tc.label}
              </span>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold font-display bg-[#d4af37]/10 text-[#e5c07b] border border-[#d4af37]/20">
                {tc.tag}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
