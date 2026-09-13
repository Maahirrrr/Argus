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
  { id: 'offline_pos', label: 'Physical Store POS', icon: Store },
  { id: 'rupay_upi', label: 'RuPay UPI QR', icon: QrCode },
  { id: 'portal_smartbuy', label: 'SmartBuy / Portal', icon: Plane },
  { id: 'forex_intl', label: 'Forex (USD/EUR)', icon: Compass },
];

const CURATED_TEST_CASES = [
  {
    label: 'DMart Ready (Online App)',
    query: 'DMart Ready',
    channel: 'online' as PaymentChannel,
    amount: 3500,
    tag: '5% Online Grocery',
  },
  {
    label: 'PAYTM*DMART INDORE (Physical POS)',
    query: 'PAYTM*DMART INDORE',
    channel: 'offline_pos' as PaymentChannel,
    amount: 3500,
    tag: '1% Offline Trap',
  },
  {
    label: 'RAZORPAY*BLINKIT GURGAON',
    query: 'RAZORPAY*BLINKIT GURGAON',
    channel: 'online' as PaymentChannel,
    amount: 850,
    tag: 'POS String Parsing',
  },
  {
    label: 'Swiggy Gourmet Order',
    query: 'Swiggy',
    channel: 'online' as PaymentChannel,
    amount: 1200,
    tag: 'Dining Multiplier',
  },
  {
    label: 'MakeMyTrip Flight Booking',
    query: 'MakeMyTrip',
    channel: 'online' as PaymentChannel,
    amount: 28000,
    tag: 'Travel & SmartBuy',
  },
  {
    label: 'BILLDESK*BESCOM Electricity',
    query: 'BILLDESK*BESCOM',
    channel: 'online' as PaymentChannel,
    amount: 2400,
    tag: 'Utility 10% vs 0%',
  },
  {
    label: 'Airtel Fiber Broadband',
    query: 'Airtel Thanks',
    channel: 'online' as PaymentChannel,
    amount: 1199,
    tag: '25% Airtel Cashback',
  },
  {
    label: 'Local Kirana UPI QR Code',
    query: 'Kirana Store UPI',
    channel: 'rupay_upi' as PaymentChannel,
    amount: 450,
    tag: 'RuPay UPI Routing',
  },
  {
    label: 'CRED RentPay / Society Rent',
    query: 'DREAMPLUG RENTPAY',
    channel: 'online' as PaymentChannel,
    amount: 35000,
    tag: 'Strict 0% Exclusion',
  },
  {
    label: 'Tanishq Gold Jewelry',
    query: 'TITAN TANISHQ STORE',
    channel: 'offline_pos' as PaymentChannel,
    amount: 75000,
    tag: 'Jewelry 0% Trap',
  },
  {
    label: 'Airbnb Tokyo (Forex)',
    query: 'Airbnb Tokyo USD',
    channel: 'forex_intl' as PaymentChannel,
    amount: 42000,
    tag: '0% Forex Advantage',
  },
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
    <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-5 shadow-xl">
      {/* Search Input and Amount row */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch">
        {/* Merchant Search input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Type merchant, POS string (e.g. RAZORPAY*BLINKIT, DMart, Swiggy, BESCOM)..."
            className="w-full pl-11 pr-4 py-3 bg-zinc-950/80 border border-zinc-700/80 hover:border-zinc-600 focus:border-emerald-500 rounded-xl text-white placeholder:text-zinc-500 text-sm md:text-base outline-none transition-all shadow-inner"
          />
        </div>

        {/* Spend Amount input */}
        <div className="relative w-full sm:w-44">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
            <IndianRupee className="w-4 h-4" />
          </div>
          <input
            type="number"
            min="10"
            step="100"
            value={amount || ''}
            onChange={(e) => onAmountChange(Number(e.target.value) || 0)}
            placeholder="Amount (₹)"
            className="w-full pl-9 pr-3 py-3 bg-zinc-950/80 border border-zinc-700/80 hover:border-zinc-600 focus:border-emerald-500 rounded-xl text-white font-medium text-sm md:text-base outline-none transition-all"
          />
        </div>
      </div>

      {/* Channel Selector Pills */}
      <div className="mt-4 pt-3 border-t border-zinc-800/60 flex flex-wrap items-center gap-1.5">
        <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mr-2 hidden sm:inline">
          Channel:
        </span>
        {CHANNELS.map((ch) => {
          const Icon = ch.icon;
          const isSelected = selectedChannel === ch.id;
          return (
            <button
              key={ch.id}
              onClick={() => onChannelChange(ch.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isSelected
                  ? 'bg-emerald-500 text-black font-semibold shadow-md shadow-emerald-500/20'
                  : 'bg-zinc-950/60 text-zinc-300 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-black' : 'text-zinc-400'}`} />
              <span>{ch.label}</span>
            </button>
          );
        })}
      </div>

      {/* Quick Edge-Case Test Scenarios */}
      <div className="mt-4 pt-3 border-t border-zinc-800/60">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            1-Click Benchmark Test Scenarios:
          </span>
          <span className="text-[10px] text-zinc-500 hidden md:inline">
            Click to test classification & channel rules
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {CURATED_TEST_CASES.map((tc) => (
            <button
              key={tc.label}
              onClick={() => onQuickSelectQuery(tc.query, tc.channel, tc.amount)}
              className="px-2.5 py-1 rounded-md bg-zinc-950/60 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-600 text-xs text-zinc-300 hover:text-white transition-all flex items-center gap-1.5 group"
            >
              <span className="font-medium text-zinc-200 group-hover:text-emerald-300">
                {tc.label}
              </span>
              <span className="px-1.5 py-0.2 text-[9px] bg-zinc-900 border border-zinc-700/60 text-zinc-400 rounded">
                {tc.tag}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
