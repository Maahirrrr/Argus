import type { CreditCard } from './types';
import { INDIAN_CARDS } from '../data/cards';

const STORAGE_KEY = 'tapwise_user_wallet_v1';

export const DEFAULT_WALLET_CARD_IDS = [
  'hdfc_millennia',
  'icici_amazon_pay',
  'sbi_cashback',
  'tata_neu_infinity',
  'axis_atlas',
];

export function getSavedWallet(): CreditCard[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return INDIAN_CARDS.filter((c) => DEFAULT_WALLET_CARD_IDS.includes(c.id));
    }
    const cardIds: string[] = JSON.parse(raw);
    const matched = INDIAN_CARDS.filter((c) => cardIds.includes(c.id));
    return matched.length > 0 ? matched : INDIAN_CARDS.filter((c) => DEFAULT_WALLET_CARD_IDS.includes(c.id));
  } catch {
    return INDIAN_CARDS.filter((c) => DEFAULT_WALLET_CARD_IDS.includes(c.id));
  }
}

export function saveWallet(cardIds: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cardIds));
  } catch (e) {
    console.error('Failed to persist wallet to localStorage', e);
  }
}

export const PRESET_WALLETS: { name: string; tag: string; cardIds: string[] }[] = [
  {
    name: 'Bangalore Techie',
    tag: 'Daily Driver Stack',
    cardIds: ['hdfc_millennia', 'icici_amazon_pay', 'sbi_cashback', 'tata_neu_infinity'],
  },
  {
    name: 'Travel & Luxury Churner',
    tag: 'Miles & SmartBuy Max',
    cardIds: ['hdfc_infinia', 'axis_atlas', 'scapia_federal', 'icici_sapphiro'],
  },
  {
    name: 'Cashback Purist (No Annual Fee)',
    tag: 'Zero Hassle Money Back',
    cardIds: ['icici_amazon_pay', 'axis_ace', 'onecard_metal', 'tata_neu_plus'],
  },
  {
    name: 'Full Deck (All 15 Cards)',
    tag: 'Max Benchmark Test',
    cardIds: INDIAN_CARDS.map((c) => c.id),
  },
];
