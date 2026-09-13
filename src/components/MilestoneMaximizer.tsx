import React, { useState } from 'react';
import {
  TrendingUp,
  Award,
  Sparkles,
  ShoppingBag,
  Carrot,
  Utensils,
  Plane,
  Receipt
} from 'lucide-react';
import type { CreditCard } from '../lib/types';

interface MilestoneMaximizerProps {
  activeCards: CreditCard[];
}

export const MilestoneMaximizer: React.FC<MilestoneMaximizerProps> = ({ activeCards }) => {
  const [onlineSpend, setOnlineSpend] = useState<number>(15000);
  const [grocerySpend, setGrocerySpend] = useState<number>(12000);
  const [diningSpend, setDiningSpend] = useState<number>(8000);
  const [travelSpend, setTravelSpend] = useState<number>(15000);
  const [utilitySpend, setUtilitySpend] = useState<number>(5000);

  const monthlyTotal = onlineSpend + grocerySpend + diningSpend + travelSpend + utilitySpend;
  const annualTotal = monthlyTotal * 12;

  // Calculate estimated annual return based on best active cards
  const calculateAnnualRewards = () => {
    // Determine effective rates from active wallet
    const hasSBI = activeCards.some((c) => c.id === 'sbi_cashback');
    const hasInfinia = activeCards.some((c) => c.id === 'hdfc_infinia');
    const hasMillennia = activeCards.some((c) => c.id === 'hdfc_millennia');
    const hasAxisAce = activeCards.some((c) => c.id === 'axis_ace');
    const hasTataNeu = activeCards.some((c) => c.id === 'tata_neu_infinity');
    const hasAmexPlat = activeCards.some((c) => c.id === 'amex_platinum_travel');

    // Online Shopping Return
    const onlineRate = hasSBI ? 0.05 : hasMillennia ? 0.05 : hasInfinia ? 0.033 : 0.015;
    const onlineReturn = onlineSpend * 12 * onlineRate;

    // Grocery Return
    const groceryRate = hasTataNeu ? 0.05 : hasSBI ? 0.05 : 0.015;
    const groceryReturn = grocerySpend * 12 * groceryRate;

    // Dining Return
    const diningRate = hasAxisAce ? 0.04 : hasSBI ? 0.05 : 0.02;
    const diningReturn = diningSpend * 12 * diningRate;

    // Travel Return
    const travelRate = hasInfinia ? 0.166 : hasAmexPlat ? 0.08 : 0.03;
    const travelReturn = travelSpend * 12 * travelRate;

    // Utility Return
    const utilityRate = hasAxisAce ? 0.05 : 0.01;
    const utilityReturn = utilitySpend * 12 * utilityRate;

    const grossAnnualSaving = onlineReturn + groceryReturn + diningReturn + travelReturn + utilityReturn;
    const totalFees = activeCards.reduce((acc, c) => acc + c.annualFee, 0);

    // Fee waivers unlocked
    const waivers: { cardName: string; condition: string; fee: number; unlocked: boolean }[] = [];
    if (hasInfinia) {
      waivers.push({
        cardName: 'HDFC Infinia Metal',
        condition: '₹4,00,000 Annual Spend',
        fee: 12500,
        unlocked: annualTotal >= 400000,
      });
    }
    if (hasSBI) {
      waivers.push({
        cardName: 'SBI Cashback',
        condition: '₹2,00,000 Annual Spend',
        fee: 999,
        unlocked: annualTotal >= 200000,
      });
    }
    if (hasAmexPlat) {
      waivers.push({
        cardName: 'Amex Platinum Travel',
        condition: '₹4,00,000 Milestone Bonus (48,000 MR + ₹10,000 Taj Voucher)',
        fee: 5000,
        unlocked: annualTotal >= 400000,
      });
    }

    const feeSavedFromWaiver = waivers.filter((w) => w.unlocked).reduce((acc, w) => acc + w.fee, 0);
    const netAnnualValue = grossAnnualSaving + feeSavedFromWaiver - totalFees;

    return {
      grossAnnualSaving: Math.round(grossAnnualSaving),
      feeSavedFromWaiver,
      netAnnualValue: Math.round(netAnnualValue),
      waivers,
      effectiveYieldPercent: annualTotal > 0 ? ((grossAnnualSaving / annualTotal) * 100).toFixed(1) : '0',
    };
  };

  const results = calculateAnnualRewards();

  return (
    <div className="cred-card rounded-3xl p-6 sm:p-8 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-emerald-500/10 border border-emerald-500/25">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-lg font-bold tracking-tight text-white">
                Annual Spend & Milestone Maximizer
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-display">
                Yield Simulator
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Simulate your monthly lifestyle spends and project annual cash returns and fee waivers
            </p>
          </div>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-[10px] uppercase tracking-wider text-zinc-500 block font-semibold">
            Projected Annual Portfolio Spend
          </span>
          <span className="font-display text-xl font-bold text-white tabular-nums">
            ₹{annualTotal.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* Main Grid: Sliders & Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Sliders Column */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-300 mb-1">
            <span>Adjust Monthly Spends</span>
            <span className="text-zinc-500 font-mono">Monthly Total: ₹{monthlyTotal.toLocaleString('en-IN')}/mo</span>
          </div>

          {[
            {
              label: 'Online Shopping',
              sub: 'Amazon, Flipkart, Myntra',
              icon: ShoppingBag,
              value: onlineSpend,
              setter: setOnlineSpend,
              max: 50000,
            },
            {
              label: 'Groceries & Quick Commerce',
              sub: 'Blinkit, Zepto, DMart Ready',
              icon: Carrot,
              value: grocerySpend,
              setter: setGrocerySpend,
              max: 40000,
            },
            {
              label: 'Dining & Delivery',
              sub: 'Swiggy, Zomato, Restaurants',
              icon: Utensils,
              value: diningSpend,
              setter: setDiningSpend,
              max: 30000,
            },
            {
              label: 'Flights & Hotels',
              sub: 'SmartBuy, MakeMyTrip, Airlines',
              icon: Plane,
              value: travelSpend,
              setter: setTravelSpend,
              max: 60000,
            },
            {
              label: 'Utilities & Bills',
              sub: 'Electricity, Broadband, Mobile',
              icon: Receipt,
              value: utilitySpend,
              setter: setUtilitySpend,
              max: 25000,
            },
          ].map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.label} className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                      <Icon className="w-3.5 h-3.5 text-[#d4af37]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">{cat.label}</p>
                      <p className="text-[10px] text-zinc-500">{cat.sub}</p>
                    </div>
                  </div>
                  <span className="font-display text-sm font-bold text-[#f3e5ab] tabular-nums">
                    ₹{cat.value.toLocaleString('en-IN')}/mo
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={cat.max}
                  step="1000"
                  value={cat.value}
                  onChange={(e) => cat.setter(Number(e.target.value))}
                  className="w-full accent-[#d4af37] h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                />
              </div>
            );
          })}
        </div>

        {/* Projections Card Column */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4">
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0c0c12] via-[#09090d] to-[#060608] border border-[#d4af37]/30 shadow-2xl relative overflow-hidden">
            <div className="shimmer-orb w-48 h-48 bg-[#d4af37]/10 -top-10 -right-10" />

            <div className="flex items-center justify-between mb-4">
              <span className="section-label">Annual Value Return</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-display">
                {results.effectiveYieldPercent}% Blended Yield
              </span>
            </div>

            <div className="mb-6">
              <span className="text-xs text-zinc-400 block mb-1 font-semibold">Estimated Gross Annual Rewards</span>
              <p className="display-number text-3xl sm:text-4xl text-gold-foil">
                ₹{results.grossAnnualSaving.toLocaleString('en-IN')}
              </p>
              <p className="text-[11px] text-zinc-500 mt-1">
                Calculated across your {activeCards.length} active wallet cards
              </p>
            </div>

            {/* Milestones / Fee Waivers */}
            <div className="pt-4 border-t border-white/[0.08]">
              <div className="flex items-center gap-1.5 mb-2.5">
                <Award className="w-3.5 h-3.5 text-[#d4af37]" />
                <span className="text-xs font-bold text-white font-display">
                  Milestones & Fee Waivers
                </span>
              </div>

              {results.waivers.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {results.waivers.map((w) => (
                    <div
                      key={w.cardName}
                      className={`p-2.5 rounded-xl text-xs flex items-center justify-between border ${
                        w.unlocked
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                          : 'bg-white/[0.02] border-white/[0.06] text-zinc-400'
                      }`}
                    >
                      <div>
                        <p className="font-semibold text-white">{w.cardName}</p>
                        <p className="text-[10px] text-zinc-400">{w.condition}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-display ${
                        w.unlocked ? 'bg-emerald-500/20 text-emerald-300' : 'bg-zinc-800 text-zinc-400'
                      }`}>
                        {w.unlocked ? 'UNLOCKED' : 'IN PROGRESS'}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-zinc-500">
                  Add high-tier cards like Infinia or Amex Platinum to track fee waiver progress.
                </p>
              )}
            </div>
          </div>

          <div className="p-4 rounded-2xl glass-surface flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-[#d4af37] flex-shrink-0" />
            <p className="text-xs text-zinc-400 leading-snug">
              Every card's rewards are computed with deterministic caps and merchant-specific exclusion policies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
