import React from 'react';
import { Search, IndianRupee, Wifi, Store, QrCode, Plane, Globe, Zap } from 'lucide-react';
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

const CHANNELS: { id: PaymentChannel | 'auto'; label: string; short: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'auto', label: 'Auto Detect', short: 'Auto', icon: Zap },
  { id: 'online', label: 'Online / App', short: 'Online', icon: Globe },
  { id: 'offline_pos', label: 'Physical POS', short: 'POS', icon: Store },
  { id: 'rupay_upi', label: 'RuPay UPI QR', short: 'UPI', icon: QrCode },
  { id: 'portal_smartbuy', label: 'SmartBuy Portal', short: 'Portal', icon: Plane },
  { id: 'forex_intl', label: 'Forex (USD/EUR)', short: 'Forex', icon: Wifi },
];

const QUICK_TESTS = [
  { label: 'DMart Ready', query: 'DMart Ready', channel: 'online' as PaymentChannel, amount: 3500, badge: '5% Online' },
  { label: 'PAYTM*DMART', query: 'PAYTM*DMART INDORE', channel: 'offline_pos' as PaymentChannel, amount: 3500, badge: 'POS Trap' },
  { label: 'RAZORPAY*BLINKIT', query: 'RAZORPAY*BLINKIT GURGAON', channel: 'online' as PaymentChannel, amount: 850, badge: 'Gateway Parse' },
  { label: 'Swiggy', query: 'Swiggy', channel: 'online' as PaymentChannel, amount: 1200, badge: 'Dining 10%' },
  { label: 'MakeMyTrip', query: 'MakeMyTrip', channel: 'online' as PaymentChannel, amount: 28000, badge: 'Travel' },
  { label: 'BILLDESK*BESCOM', query: 'BILLDESK*BESCOM', channel: 'online' as PaymentChannel, amount: 2400, badge: 'Utility' },
  { label: 'Airtel Broadband', query: 'Airtel Thanks', channel: 'online' as PaymentChannel, amount: 1199, badge: '25% Back' },
  { label: 'Kirana UPI QR', query: 'Kirana Store UPI', channel: 'rupay_upi' as PaymentChannel, amount: 450, badge: 'RuPay' },
  { label: 'CRED RentPay', query: 'DREAMPLUG RENTPAY', channel: 'online' as PaymentChannel, amount: 35000, badge: '0% Exclusion' },
  { label: 'Tanishq Gold', query: 'TITAN TANISHQ STORE', channel: 'offline_pos' as PaymentChannel, amount: 75000, badge: 'Jewelry 0%' },
  { label: 'Airbnb Tokyo', query: 'Airbnb Tokyo USD', channel: 'forex_intl' as PaymentChannel, amount: 42000, badge: 'Forex' },
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
    <div className="glass-gold rounded-2xl shadow-2xl overflow-hidden beam-scan">
      {/* Top section — Search inputs */}
      <div className="p-5 pb-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Merchant search */}
          <div className="relative flex-1 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-[#c9a84c]">
              <Search className="w-4.5 h-4.5" style={{ color: '#454d62' }} />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Merchant, POS string, or gateway descriptor…"
              className="input-field w-full pl-11 pr-4 py-3.5 rounded-xl text-sm font-medium"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            />
          </div>

          {/* Amount */}
          <div className="relative w-full sm:w-40">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <IndianRupee className="w-4 h-4" style={{ color: '#454d62' }} />
            </div>
            <input
              type="number"
              min="10"
              step="100"
              value={amount || ''}
              onChange={(e) => onAmountChange(Number(e.target.value) || 0)}
              placeholder="Amount"
              className="input-field w-full pl-9 pr-3 py-3.5 rounded-xl text-sm font-display font-semibold"
            />
          </div>
        </div>
      </div>

      {/* Channel selector */}
      <div className="px-5 pb-4">
        <div className="divider mb-3.5" />
        <div className="flex flex-wrap gap-1.5">
          {CHANNELS.map((ch) => {
            const Icon = ch.icon;
            const active = selectedChannel === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => onChannelChange(ch.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all"
                style={
                  active
                    ? {
                        background: 'linear-gradient(135deg, #c9a84c, #e2c06a)',
                        color: '#0a0810',
                        fontWeight: 700,
                        boxShadow: '0 4px 16px rgba(201, 168, 76, 0.25)',
                      }
                    : {
                        background: 'rgba(5, 8, 16, 0.6)',
                        color: '#8892aa',
                        border: '1px solid rgba(255,255,255,0.07)',
                      }
                }
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{ch.label}</span>
                <span className="sm:hidden">{ch.short}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick test scenarios */}
      <div className="px-5 pb-5 pt-1">
        <div className="divider mb-3.5" />
        <p className="text-[10px] font-semibold uppercase tracking-widest mb-2.5" style={{ color: '#454d62' }}>
          Benchmark edge cases
        </p>
        <div className="flex flex-wrap gap-1.5">
          {QUICK_TESTS.map((tc) => (
            <button
              key={tc.label}
              onClick={() => onQuickSelectQuery(tc.query, tc.channel, tc.amount)}
              className="group flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer"
              style={{
                background: 'rgba(5, 8, 16, 0.6)',
                border: '1px solid rgba(255,255,255,0.06)',
                color: '#8892aa',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.25)';
                (e.currentTarget as HTMLElement).style.color = '#c9a84c';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
                (e.currentTarget as HTMLElement).style.color = '#8892aa';
              }}
            >
              <span>{tc.label}</span>
              <span
                className="px-1.5 py-0.5 rounded text-[9px] font-bold font-display"
                style={{ background: 'rgba(79,70,229,0.15)', color: '#818cf8' }}
              >
                {tc.badge}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
