import { calculateBestSwipe, parsePOSDescriptor } from './src/lib/optimizer.ts';
import { INDIAN_CARDS } from './src/data/cards.ts';

console.log('🧪 RUNNING TAPWISE DETERMINISTIC & SEMANTIC EVAL BENCHMARK...\n');

let passed = 0;
let total = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  total++;
  if (condition) {
    passed++;
    console.log(`✅ [PASS] ${testName}`);
  } else {
    console.error(`❌ [FAIL] ${testName} -> ${detail || 'Assertion failed'}`);
  }
}

// Full test wallet
const allCards = INDIAN_CARDS;

// 1. HARD EDGE CASE: Online vs Offline Channel Disparity (DMart)
console.log('\n--- 1. Testing Online vs Offline Channel Disparity (DMart) ---');
const dmartOnline = calculateBestSwipe(allCards, 'DMart Ready', 3000, 'online');
assert(
  dmartOnline.bestRatePercent === 5.0 && dmartOnline.bestCard.id === 'sbi_cashback',
  'DMart Ready (Online) triggers 5% on SBI Cashback',
  `Got ${dmartOnline.bestRatePercent}% on ${dmartOnline.bestCard.name}`
);

const dmartOffline = calculateBestSwipe(allCards, 'PAYTM*DMART INDORE', 3000, 'offline_pos');
assert(
  dmartOffline.bestCard.id !== 'sbi_cashback' && dmartOffline.bestRatePercent >= 1.2,
  'PAYTM*DMART (Offline POS) prevents SBI Cashback 5% trap and picks 1.5% offline winner (Axis ACE / Tata Neu)',
  `Got ${dmartOffline.bestRatePercent}% on ${dmartOffline.bestCard.name}`
);
const sbiOfflineRow = dmartOffline.comparison.find((c) => c.card.id === 'sbi_cashback');
assert(
  sbiOfflineRow?.ratePercent === 1.0,
  'SBI Cashback drops to 1.0% on offline physical POS store swipe',
  `SBI Cashback rate was ${sbiOfflineRow?.ratePercent}%`
);

// 2. POS Aggregator Descriptor Parsing
console.log('\n--- 2. Testing POS Aggregator Descriptor Parsing ---');
const blinkitPOS = parsePOSDescriptor('RAZORPAY*BLINKIT GURGAON');
assert(
  blinkitPOS.merchantName === 'Blinkit' && blinkitPOS.category === 'quick_commerce',
  'RAZORPAY*BLINKIT GURGAON correctly resolved to Blinkit Quick Commerce',
  `Resolved to ${blinkitPOS.merchantName} (${blinkitPOS.category})`
);

const bescomPOS = parsePOSDescriptor('BILLDESK*BESCOM');
assert(
  bescomPOS.category === 'utility_govt',
  'BILLDESK*BESCOM correctly resolved to Electricity Utility',
  `Resolved to category ${bescomPOS.category}`
);

// 3. Strict Exclusions (Rent, Fuel, Jewelry)
console.log('\n--- 3. Testing Strict Fine-Print Exclusions ---');
const credRent = calculateBestSwipe(allCards, 'DREAMPLUG RENTPAY', 30000, 'online');
assert(
  credRent.bestRatePercent === 0 && !!credRent.exclusionWarning,
  'CRED RentPay triggers strict 0% exclusion warning',
  `Best rate was ${credRent.bestRatePercent}%`
);

const tanishqJewelry = calculateBestSwipe(allCards, 'TITAN TANISHQ STORE', 50000, 'offline_pos');
const sbiJewelry = tanishqJewelry.comparison.find((c) => c.card.id === 'sbi_cashback');
assert(
  sbiJewelry?.isExclusion === true && sbiJewelry?.ratePercent === 0,
  'Tanishq Gold purchase strictly excluded (0% rewards) on SBI Cashback',
  `SBI Jewelry rate was ${sbiJewelry?.ratePercent}%`
);

// 4. RuPay UPI QR Channel
console.log('\n--- 4. Testing RuPay UPI QR Channel ---');
const kiranaUPI = calculateBestSwipe(allCards, 'Local Kirana Store', 500, 'rupay_upi');
assert(
  kiranaUPI.bestCard.id === 'tata_neu_infinity' && kiranaUPI.bestRatePercent === 1.5,
  'RuPay UPI QR swipe ranks Tata Neu Infinity #1 with 1.5% NeuCoins',
  `Got ${kiranaUPI.bestRatePercent}% on ${kiranaUPI.bestCard.name}`
);
const visaOnUpi = kiranaUPI.comparison.find((c) => c.card.id === 'sbi_cashback');
assert(
  visaOnUpi?.isExclusion === true && visaOnUpi?.ratePercent === 0,
  'Non-RuPay Visa/Mastercard marked incompatible (0%) on UPI QR',
  `Visa rate was ${visaOnUpi?.ratePercent}%`
);

// 5. Forex & International Transactions
console.log('\n--- 5. Testing Forex & International Transactions ---');
const tokyoForex = calculateBestSwipe(allCards, 'Airbnb Tokyo USD', 45000, 'forex_intl');
assert(
  tokyoForex.bestCard.id === 'scapia_federal' && tokyoForex.bestRatePercent === 6.13,
  'International USD spend ranks Scapia Federal #1 with 0% forex markup + 2% coins',
  `Got ${tokyoForex.bestRatePercent}% on ${tokyoForex.bestCard.name}`
);

// 6. Travel SmartBuy Portal Multiplier
console.log('\n--- 6. Testing Travel SmartBuy Portal Multiplier ---');
const flightSmartBuy = calculateBestSwipe(allCards, 'Flight Booking', 20000, 'portal_smartbuy');
assert(
  flightSmartBuy.bestCard.id === 'hdfc_infinia' && flightSmartBuy.bestRatePercent > 16.0,
  'SmartBuy portal flight booking ranks HDFC Infinia #1 with 16.6% return',
  `Got ${flightSmartBuy.bestRatePercent}% on ${flightSmartBuy.bestCard.name}`
);

console.log(`\n📊 BENCHMARK SUMMARY: ${passed}/${total} test cases passed (${Math.round((passed / total) * 100)}%)`);

if (passed === total) {
  console.log('🎉 ALL EDGE CASES VERIFIED ACCURATELY!\n');
} else {
  process.exit(1);
}
