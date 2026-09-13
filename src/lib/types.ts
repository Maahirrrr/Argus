export type PaymentChannel = 'online' | 'offline_pos' | 'rupay_upi' | 'portal_smartbuy' | 'forex_intl';

export type SpendCategory = 
  | 'quick_commerce'
  | 'dining_food'
  | 'grocery_supermarket'
  | 'travel_flight_hotel'
  | 'ecommerce_shopping'
  | 'telecom_bills'
  | 'utility_govt'
  | 'entertainment_movies'
  | 'pharmacy_health'
  | 'fuel'
  | 'rent_maintenance'
  | 'jewelry_gold'
  | 'wallet_reload'
  | 'general_retail';

export interface CardPerk {
  title: string;
  description: string;
  badge?: string;
}

export interface CardRule {
  category: SpendCategory;
  channel?: PaymentChannel;
  merchantIds?: string[];
  rewardRatePercent: number; // e.g. 5.0 for 5%
  rewardType: 'cashback' | 'points' | 'miles' | 'neucoins' | 'coins';
  multiplierDescription: string;
  monthlyCapInr?: number;
  conditionDescription?: string;
  isExclusion?: boolean; // 0% rewards
}

export interface CreditCard {
  id: string;
  name: string;
  issuer: 'HDFC' | 'ICICI' | 'Axis' | 'SBI' | 'OneCard' | 'Federal';
  network: 'Visa' | 'Mastercard' | 'RuPay' | 'Diners';
  cardTier: 'Super Premium' | 'Premium' | 'Cashback' | 'Co-Branded' | 'Entry';
  annualFee: number;
  forexMarkupPercent: number;
  theme: {
    gradient: string;
    textColor: string;
    accentColor: string;
    border: string;
  };
  baseRewardPercent: number;
  rules: CardRule[];
  perks: CardPerk[];
  isRupayUPI: boolean;
  notes?: string;
}

export interface Merchant {
  id: string;
  name: string;
  category: SpendCategory;
  defaultChannel: PaymentChannel;
  mcc: string;
  aliases: string[];
  posDescriptors: string[]; // e.g., ["RAZORPAY*BLINKIT", "ZEPTO_MUMBAI"]
  specialTags?: string[];
  notes?: string;
}

export interface SwipeRecommendation {
  bestCard: CreditCard;
  bestRatePercent: number;
  bestRewardType: string;
  estimatedSavingInr: number;
  rationale: string;
  runnerUpCard?: CreditCard;
  runnerUpRatePercent?: number;
  channelAlert?: string;
  exclusionWarning?: string;
  comparison: {
    card: CreditCard;
    ratePercent: number;
    effectiveSavingInr: number;
    reason: string;
    isExclusion: boolean;
  }[];
}

export interface EvalTestCase {
  id: string;
  query: string;
  channel: PaymentChannel;
  amount: number;
  expectedCategory: SpendCategory;
  expectedWinnerCardId: string;
  expectedMinRate: number;
  edgeCaseType: 'channel_disparity' | 'pos_descriptor' | 'exclusion' | 'portal_boost' | 'co_branded_monopoly' | 'forex';
  notes: string;
}
