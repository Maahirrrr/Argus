import type { CreditCard, Merchant, PaymentChannel, SpendCategory, SwipeRecommendation } from './types';
import { INDIAN_MERCHANTS } from '../data/merchants';

export interface ParsedTransaction {
  merchantName: string;
  category: SpendCategory;
  channel: PaymentChannel;
  detectedMerchant?: Merchant;
  gateway?: string;
  isExclusionCandidate: boolean;
  confidence: number;
  reasoning: string;
}

/**
 * Tier 2 Intelligence: Semantic POS Gateway & Descriptor Parser
 * Resolves mangled POS and payment gateway strings like "RAZORPAY*BLINKIT", "PAYTM*DMART INDORE", "BILLDESK*BESCOM"
 */
export function parsePOSDescriptor(rawQuery: string, forcedChannel?: PaymentChannel): ParsedTransaction {
  const query = rawQuery.trim().toUpperCase();
  let gateway: string | undefined;
  let cleanQuery = query;

  // Detect payment gateways common on Indian card statements
  if (query.includes('RAZORPAY*') || query.startsWith('RZP*')) {
    gateway = 'Razorpay';
    cleanQuery = cleanQuery.replace(/RAZORPAY\*/g, '').replace(/RZP\*/g, '');
  } else if (query.includes('PAYTM*') || query.startsWith('PYTM*')) {
    gateway = 'Paytm POS / Gateway';
    cleanQuery = cleanQuery.replace(/PAYTM\*/g, '').replace(/PYTM\*/g, '');
  } else if (query.includes('BILLDESK*')) {
    gateway = 'BillDesk Utility Gateway';
    cleanQuery = cleanQuery.replace(/BILLDESK\*/g, '');
  } else if (query.includes('PINE LABS*') || query.includes('PINELABS*')) {
    gateway = 'Pine Labs In-Store POS';
    cleanQuery = cleanQuery.replace(/PINE LABS\*/g, '').replace(/PINELABS\*/g, '');
  } else if (query.includes('DREAMPLUG')) {
    gateway = 'CRED (Dreamplug)';
    cleanQuery = cleanQuery.replace(/DREAMPLUG/g, 'CRED');
  }

  // Strip trailing Indian city names commonly stamped by POS machines
  cleanQuery = cleanQuery
    .replace(/\b(MUMBAI|BANGALORE|BENGALURU|DELHI|GURGAON|GURUGRAM|NOIDA|HYDERABAD|CHENNAI|PUNE|INDORE|AHMEDABAD|KOLKATA|JAIPUR)\b/g, '')
    .trim();

  // Channel determination
  let channel: PaymentChannel = forcedChannel || 'online';
  if (!forcedChannel) {
    if (query.includes('UPI') || query.includes('QR') || query.includes('SCAN')) {
      channel = 'rupay_upi';
    } else if (query.includes('STORE') || query.includes('POS') || gateway === 'Pine Labs In-Store POS' || query.includes('OUTLET') || query.includes('BUNK')) {
      channel = 'offline_pos';
    } else if (query.includes('SMARTBUY') || query.includes('GYFTR')) {
      channel = 'portal_smartbuy';
    } else if (query.includes('USD') || query.includes('EUR') || query.includes('FOREX') || query.includes('INTERNATIONAL') || query.includes('JAPAN') || query.includes('US')) {
      channel = 'forex_intl';
    }
  }

  // Match against Indian merchant catalog (Tier 1 exact / alias match)
  const normalized = cleanQuery.toLowerCase();
  for (const m of INDIAN_MERCHANTS) {
    // Check direct ID or name match
    if (m.name.toLowerCase().includes(normalized) || normalized.includes(m.name.toLowerCase())) {
      return {
        merchantName: m.name,
        category: m.category,
        channel: forcedChannel || (channel !== 'online' ? channel : m.defaultChannel),
        detectedMerchant: m,
        gateway,
        isExclusionCandidate: ['fuel', 'rent_maintenance', 'jewelry_gold', 'wallet_reload'].includes(m.category),
        confidence: 0.95,
        reasoning: `Direct match in verified merchant database. MCC ${m.mcc}.`,
      };
    }

    // Check aliases
    for (const alias of m.aliases) {
      if (normalized.includes(alias) || alias.includes(normalized)) {
        return {
          merchantName: m.name,
          category: m.category,
          channel: forcedChannel || (channel !== 'online' ? channel : m.defaultChannel),
          detectedMerchant: m,
          gateway,
          isExclusionCandidate: ['fuel', 'rent_maintenance', 'jewelry_gold', 'wallet_reload'].includes(m.category),
          confidence: 0.90,
          reasoning: `Matched via merchant alias "${alias}". MCC ${m.mcc}.`,
        };
      }
    }

    // Check known POS descriptors
    for (const pos of m.posDescriptors) {
      if (query.includes(pos) || pos.includes(query)) {
        return {
          merchantName: m.name,
          category: m.category,
          channel: forcedChannel || (channel !== 'online' ? channel : m.defaultChannel),
          detectedMerchant: m,
          gateway,
          isExclusionCandidate: ['fuel', 'rent_maintenance', 'jewelry_gold', 'wallet_reload'].includes(m.category),
          confidence: 0.98,
          reasoning: `Matched raw bank statement POS descriptor "${pos}". MCC ${m.mcc}.`,
        };
      }
    }
  }

  // Tier 2 Fallback: Semantic heuristic classification if merchant is uncatalogued
  let inferredCategory: SpendCategory = 'general_retail';
  let reasoning = 'Uncatalogued merchant. Classified via merchant keyword heuristics.';

  if (/GROCERY|VEGETABLE|SUPERMARKET|KIRANA|MART|PROVISION/i.test(cleanQuery)) {
    inferredCategory = 'grocery_supermarket';
    reasoning = 'Keyword indicates supermarket / grocery store (MCC 5411).';
  } else if (/FOOD|RESTAURANT|CAFE|PIZZA|BURGER|BAKERY|BISTRO|BAR/i.test(cleanQuery)) {
    inferredCategory = 'dining_food';
    reasoning = 'Keyword indicates dining or restaurant (MCC 5812/5814).';
  } else if (/FLIGHT|HOTEL|AIRWAYS|RESORT|TRAVEL|TRIP|AIRLINE/i.test(cleanQuery)) {
    inferredCategory = 'travel_flight_hotel';
    reasoning = 'Keyword indicates travel, airline, or hospitality.';
  } else if (/PETROL|DIESEL|FUEL|PUMP|GAS STATION|IOCL|HPCL|BPCL/i.test(cleanQuery)) {
    inferredCategory = 'fuel';
    channel = 'offline_pos';
    reasoning = 'Identified as Fuel Station (MCC 5541). High probability 0% reward exclusion.';
  } else if (/RENT|MAINTENANCE|HOUSING|SOCIETY|NOBROKER/i.test(cleanQuery)) {
    inferredCategory = 'rent_maintenance';
    reasoning = 'Identified as Rent / Real Estate. Strict 0% reward exclusion with added 1% surcharge on most cards.';
  } else if (/GOLD|JEWELLERY|JEWELRY|DIAMOND|SILVER/i.test(cleanQuery)) {
    inferredCategory = 'jewelry_gold';
    reasoning = 'Identified as Precious Metals / Jewelry (MCC 5094). Major cards exclude rewards.';
  } else if (/ELECTRICITY|POWER|WATER|BROADBAND|BILL|DTH/i.test(cleanQuery)) {
    inferredCategory = 'utility_govt';
    reasoning = 'Identified as Utility bill payment (MCC 4900).';
  }

  return {
    merchantName: cleanQuery || rawQuery,
    category: inferredCategory,
    channel,
    gateway,
    isExclusionCandidate: ['fuel', 'rent_maintenance', 'jewelry_gold', 'wallet_reload'].includes(inferredCategory),
    confidence: 0.75,
    reasoning,
  };
}

/**
 * Calculates optimal swipe recommendation across user's active cards
 */
export function calculateBestSwipe(
  userWallet: CreditCard[],
  rawQuery: string,
  spendAmount: number = 1000,
  forcedChannel?: PaymentChannel
): SwipeRecommendation {
  if (userWallet.length === 0) {
    throw new Error('User wallet is empty. Please select at least 1 card.');
  }

  const parsed = parsePOSDescriptor(rawQuery, forcedChannel);
  const { category, channel, detectedMerchant } = parsed;

  const scoredCards = userWallet.map((card) => {
    let rate = card.baseRewardPercent;
    let reason = `Base reward of ${card.baseRewardPercent}%`;
    let isExclusion = false;

    // Check RuPay UPI compatibility
    if (channel === 'rupay_upi') {
      if (card.isRupayUPI) {
        const upiRule = card.rules.find((r) => r.channel === 'rupay_upi');
        if (upiRule) {
          rate = upiRule.rewardRatePercent;
          reason = upiRule.multiplierDescription;
        } else {
          rate = card.baseRewardPercent;
          reason = `RuPay credit card on UPI (${card.baseRewardPercent}%)`;
        }
      } else {
        rate = 0;
        isExclusion = true;
        reason = `Non-RuPay card (${card.network}). Cannot be scanned on standard UPI QR codes.`;
      }
      return { card, rate, reason, isExclusion };
    }

    // Check Forex / International transactions
    if (channel === 'forex_intl') {
      if (card.id === 'scapia_federal') {
        rate = 6.13; // 0% forex markup vs 3.5% + 18% GST (saving 4.13%) + 2% travel coins
        reason = 'ZERO Forex Markup (saves 4.13% fee) + 2% Scapia Travel Coins';
      } else if (card.id === 'onecard_metal') {
        rate = 2.5; // 1% forex markup saves 2.5% vs standard
        reason = 'Low 1% Forex markup + 5x category reward points';
      } else {
        // Standard cards incur 3.5% + 18% GST (= 4.13% fee)
        const netAfterForex = Math.max(0, rate - 3.5);
        rate = netAfterForex;
        reason = `${card.baseRewardPercent}% base reward, but charges 3.5% + GST foreign currency markup`;
      }
      return { card, rate, reason, isExclusion: false };
    }

    // Check universal Indian banking exclusions (Rent, Fuel, Wallet Loads)
    if (['rent_maintenance', 'fuel', 'wallet_reload'].includes(category)) {
      const specificRule = card.rules.find((r) => r.category === category && !r.isExclusion);
      if (!specificRule) {
        rate = 0;
        isExclusion = true;
        const exclusionRule = card.rules.find((r) => r.category === category && r.isExclusion);
        reason = exclusionRule
          ? `Excluded: ${exclusionRule.multiplierDescription}`
          : `0% Rewards: ${category.replace('_', ' ').toUpperCase()} is excluded on ${card.name}`;
        return { card, rate, reason, isExclusion };
      }
    }

    // Check card rules for matches
    for (const rule of card.rules) {
      // 1. Check strict exclusions (e.g. jewelry)
      if (rule.isExclusion && rule.category === category) {
        rate = 0;
        isExclusion = true;
        reason = `Excluded: ${rule.multiplierDescription}`;
        break;
      }

      // 2. Specific merchant ID match (e.g. BigBasket on Tata Neu or Flipkart on Flipkart Axis)
      if (detectedMerchant && rule.merchantIds?.includes(detectedMerchant.id)) {
        rate = rule.rewardRatePercent;
        reason = rule.multiplierDescription;
        break;
      }

      // 3. Category match (only if rule does NOT restrict to specific merchantIds)
      if (rule.category === category && (!rule.merchantIds || rule.merchantIds.length === 0)) {
        if (!rule.channel || rule.channel === channel) {
          rate = rule.rewardRatePercent;
          reason = rule.multiplierDescription;
          break;
        }
      }
    }

    // Special card-specific heuristics (SBI Cashback online vs offline channel disparity)
    if (card.id === 'sbi_cashback' && !isExclusion) {
      if (channel === 'online') {
        rate = 5.0;
        reason = '5% Cashback on online transactions (Max ₹5,000/mo)';
      } else if (channel === 'offline_pos') {
        rate = 1.0;
        reason = '1% Cashback only for offline POS store swipes (Online yields 5%)';
      }
    }

    // Special OneCard Top 2 category boost
    if (card.id === 'onecard_metal' && !isExclusion) {
      if (['dining_food', 'grocery_supermarket', 'quick_commerce'].includes(category)) {
        rate = 1.2;
        reason = '5x Reward Points (~1.2% return) as a Top 2 spend category';
      }
    }

    // Special SmartBuy / Travel Edge portal boost
    if (channel === 'portal_smartbuy') {
      if (card.id === 'hdfc_infinia') {
        rate = 16.66;
        reason = '5x Points on HDFC SmartBuy flights & hotels (1 RP = ₹1)';
      } else if (card.id === 'hdfc_regalia_gold') {
        rate = 6.66;
        reason = '5x Points on HDFC SmartBuy (1 RP = ₹0.50)';
      }
    }

    return { card, rate, reason, isExclusion };
  });

  // Sort descending by effective reward rate
  scoredCards.sort((a, b) => b.rate - a.rate);

  const best = scoredCards[0];
  const runnerUp = scoredCards.length > 1 ? scoredCards[1] : undefined;

  // Compute saving in INR
  const estimatedSavingInr = Math.round((spendAmount * best.rate) / 100);

  // Generate channel alerts & exclusion warnings
  let channelAlert: string | undefined;
  if (channel === 'offline_pos' && userWallet.some((c) => c.id === 'sbi_cashback')) {
    channelAlert = 'Channel Disparity: If you pay via the merchant app/online instead of physical POS swipe, SBI Cashback jumps from 1% to 5%!';
  } else if (channel === 'online' && category === 'travel_flight_hotel' && userWallet.some((c) => c.id === 'hdfc_infinia')) {
    channelAlert = 'Portal Boost: Booking this flight via HDFC SmartBuy unlocks 16.66% return (5x points) vs direct airline swipe!';
  }

  let exclusionWarning: string | undefined;
  if (parsed.isExclusionCandidate) {
    exclusionWarning = `Caution (${parsed.category.replace('_', ' ').toUpperCase()}): Most Indian credit cards award 0% rewards on fuel, rent, jewelry, and wallet reloads.`;
  }

  return {
    bestCard: best.card,
    bestRatePercent: best.rate,
    bestRewardType: best.card.rules.find((r) => r.category === category)?.rewardType || 'cashback',
    estimatedSavingInr,
    rationale: best.reason,
    runnerUpCard: runnerUp?.card,
    runnerUpRatePercent: runnerUp?.rate,
    channelAlert,
    exclusionWarning,
    comparison: scoredCards.map((sc) => ({
      card: sc.card,
      ratePercent: sc.rate,
      effectiveSavingInr: Math.round((spendAmount * sc.rate) / 100),
      reason: sc.reason,
      isExclusion: sc.isExclusion,
    })),
  };
}
