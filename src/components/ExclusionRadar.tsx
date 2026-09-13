import React, { useState } from 'react';
import {
  ShieldAlert,
  Search,
  Fuel,
  Home,
  Gem,
  Wallet,
  Landmark,
  Zap,
  CheckCircle2,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { INDIAN_CARDS } from '../data/cards';
import type { CreditCard } from '../lib/types';

interface ExclusionRadarProps {
  activeCards: CreditCard[];
  onOpenDeck?: () => void;
}

interface ExclusionCategory {
  id: string;
  name: string;
  icon: React.FC<{ className?: string }>;
  mcc: string;
  riskLevel: 'HIGH' | 'CRITICAL' | 'MODERATE';
  description: string;
  industryRule: string;
}

const EXCLUSION_CATEGORIES: ExclusionCategory[] = [
  {
    id: 'rent',
    name: 'Rent & Maintenance',
    icon: Home,
    mcc: '6513, 7349',
    riskLevel: 'CRITICAL',
    description: 'CRED RentPay, Dreamplug, Paytm Rent, MagicBricks, Housing.com',
    industryRule: '0% rewards on nearly all Indian cards + 1% processing surcharge (plus 18% GST).',
  },
  {
    id: 'fuel',
    name: 'Fuel & Gas Stations',
    icon: Fuel,
    mcc: '5541, 5542',
    riskLevel: 'HIGH',
    description: 'HPCL, IOCL, BPCL, Shell petrol pumps',
    industryRule: 'Strictly 0% base rewards on non-co-branded cards. Only 1% fuel surcharge waiver (typically capped at ₹250–₹1,000/mo).',
  },
  {
    id: 'jewelry',
    name: 'Jewelry & Gold Coins',
    icon: Gem,
    mcc: '5094, 5944',
    riskLevel: 'HIGH',
    description: 'Tanishq, Malabar Gold, Kalyan, MMTC Bullion, CaratLane',
    industryRule: 'Excluded from milestone & accelerated points on HDFC Infinia/Diners and SBI Cashback.',
  },
  {
    id: 'wallet',
    name: 'Prepaid Wallet Reload',
    icon: Wallet,
    mcc: '6540',
    riskLevel: 'HIGH',
    description: 'Paytm Wallet, Mobikwik, Amazon Pay Balance Top-up',
    industryRule: '0% reward points across 95% cards + 2-3% convenience fee on most platforms.',
  },
  {
    id: 'govt',
    name: 'Government & Taxes',
    icon: Landmark,
    mcc: '9311, 9399',
    riskLevel: 'MODERATE',
    description: 'Income Tax advance tax, Property Tax, Stamp Duty, Challans',
    industryRule: 'Devalued across major issuers since late 2023. Few cards offer base points.',
  },
  {
    id: 'utilities',
    name: 'Utilities & Insurance',
    icon: Zap,
    mcc: '4900, 6300',
    riskLevel: 'MODERATE',
    description: 'Electricity (BESCOM/Tata Power), Gas, LIC & Health Insurance',
    industryRule: 'Monthly reward caps introduced (e.g. ₹1,500/mo max points on utilities).',
  },
];

export const ExclusionRadar: React.FC<ExclusionRadarProps> = ({ activeCards }) => {
  const [selectedCat, setSelectedCat] = useState<string>('rent');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [filterActiveOnly, setFilterActiveOnly] = useState<boolean>(false);

  const activeCategory = EXCLUSION_CATEGORIES.find((c) => c.id === selectedCat) || EXCLUSION_CATEGORIES[0];

  const cardsToDisplay = (filterActiveOnly ? activeCards : INDIAN_CARDS).filter((card) =>
    card.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    card.issuer.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const getCardStatus = (card: CreditCard, catId: string) => {
    if (catId === 'rent') {
      const rule = card.rules.find((r) => r.category === 'rent_maintenance');
      if (rule && rule.isExclusion) {
        return {
          status: 'EXCLUDED',
          badge: '0% + 1% Fee',
          detail: rule.multiplierDescription,
          safe: false,
        };
      }
      return {
        status: 'EXCLUDED',
        badge: '0% Rewards',
        detail: 'Standard RBI/issuer rent exclusion applies.',
        safe: false,
      };
    }

    if (catId === 'fuel') {
      const rule = card.rules.find((r) => r.category === 'fuel');
      if (card.id.includes('fuel') || card.id.includes('bpcl') || card.id.includes('iocl')) {
        return {
          status: 'REWARDED',
          badge: 'Co-Branded 4-5%',
          detail: 'Accelerated fuel points applicable.',
          safe: true,
        };
      }
      return {
        status: 'WAIVER_ONLY',
        badge: '1% Surcharge Waiver Only',
        detail: rule?.multiplierDescription || '0% reward points. ₹400-₹4,000 spend waiver.',
        safe: false,
      };
    }

    if (catId === 'jewelry') {
      const rule = card.rules.find((r) => r.category === 'jewelry_gold');
      if (rule && rule.isExclusion) {
        return {
          status: 'EXCLUDED',
          badge: '0% Rewards',
          detail: rule.multiplierDescription,
          safe: false,
        };
      }
      return {
        status: 'BASE_POINTS',
        badge: `${card.baseRewardPercent}% Base Points`,
        detail: 'Eligible for regular base points; milestone points excluded.',
        safe: true,
      };
    }

    if (catId === 'wallet') {
      const rule = card.rules.find((r) => r.category === 'wallet_reload');
      if (rule && rule.isExclusion) {
        return {
          status: 'EXCLUDED',
          badge: '0% Rewards',
          detail: rule.multiplierDescription,
          safe: false,
        };
      }
      return {
        status: 'EXCLUDED',
        badge: '0% Devalued',
        detail: 'Prepaid loading devalued across standard programs.',
        safe: false,
      };
    }

    if (catId === 'utilities') {
      const rule = card.rules.find((r) => r.category === 'utility_govt');
      if (rule && rule.rewardRatePercent > 0) {
        return {
          status: 'REWARDED',
          badge: `${rule.rewardRatePercent}% Cashback/Points`,
          detail: rule.multiplierDescription,
          safe: true,
        };
      }
      return {
        status: 'BASE_POINTS',
        badge: `${card.baseRewardPercent}% Base`,
        detail: 'Subject to monthly category capping.',
        safe: true,
      };
    }

    return {
      status: 'EXCLUDED',
      badge: '0% Rewards',
      detail: 'Government taxes & duties excluded from reward computation.',
      safe: false,
    };
  };

  return (
    <div className="cred-card rounded-3xl p-6 sm:p-8 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-rose-500/10 border border-rose-500/25">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-lg font-bold tracking-tight text-white">
                Fine-Print Exclusion Radar
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30 font-display">
                Trap Detector
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Avoid wasting swipes on deceptive zero-reward categories across 15 premier Indian cards
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterActiveOnly(!filterActiveOnly)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all border ${
              filterActiveOnly
                ? 'bg-[#d4af37]/20 text-[#fce79a] border-[#d4af37]/40'
                : 'bg-white/[0.04] text-zinc-400 border-white/[0.08] hover:text-white'
            }`}
          >
            {filterActiveOnly ? `Your Active Vault (${activeCards.length})` : 'All 15 Cards'}
          </button>
        </div>
      </div>

      <div className="py-4 border-b border-white/[0.05] flex gap-2 overflow-x-auto scroll-x">
        {EXCLUSION_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCat === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer whitespace-nowrap transition-all flex-shrink-0 border ${
                isSelected
                  ? 'bg-rose-500/15 border-rose-500/40 text-rose-200 shadow-sm shadow-rose-500/10'
                  : 'bg-white/[0.03] border-white/[0.06] text-zinc-400 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-rose-400' : 'text-zinc-500'}`} />
              <span>{cat.name}</span>
              <span
                className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold ${
                  cat.riskLevel === 'CRITICAL'
                    ? 'bg-rose-500/30 text-rose-300'
                    : 'bg-amber-500/20 text-amber-300'
                }`}
              >
                {cat.riskLevel}
              </span>
            </button>
          );
        })}
      </div>

      <div className="my-5 p-4 rounded-2xl bg-rose-500/[0.04] border border-rose-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-rose-300 font-display">
              {activeCategory.name} Policy (MCC: {activeCategory.mcc})
            </span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed max-w-3xl">
            <strong>Target Vendors:</strong> {activeCategory.description}.
          </p>
          <p className="text-xs text-zinc-400 mt-0.5">
            <strong>Rule:</strong> {activeCategory.industryRule}
          </p>
        </div>

        <div className="relative w-full md:w-56 flex-shrink-0">
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter cards..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#d4af37]/40"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {cardsToDisplay.map((card) => {
          const evalResult = getCardStatus(card, activeCategory.id);
          const isSafe = evalResult.safe;

          return (
            <div
              key={card.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col justify-between select-none ${
                isSafe
                  ? 'bg-emerald-500/[0.03] border-emerald-500/20'
                  : 'bg-[#09090d] border-white/[0.06]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 font-display">
                    {card.issuer} · {card.network}
                  </span>
                  {isSafe ? (
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                      Eligible
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30">
                      <XCircle className="w-2.5 h-2.5 text-rose-400" />
                      Excluded
                    </span>
                  )}
                </div>

                <h4 className="font-display text-sm font-bold text-white truncate mb-1">
                  {card.name}
                </h4>

                <p className="text-[11px] font-mono text-zinc-400 mb-2">
                  {evalResult.badge}
                </p>
              </div>

              <div className="pt-2 border-t border-white/[0.06]">
                <p className="text-[10px] text-zinc-500 leading-snug">
                  {evalResult.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
