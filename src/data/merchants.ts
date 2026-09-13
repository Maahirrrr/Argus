import type { Merchant } from '../lib/types';

export const INDIAN_MERCHANTS: Merchant[] = [
  // Quick Commerce
  {
    id: 'zepto',
    name: 'Zepto',
    category: 'quick_commerce',
    defaultChannel: 'online',
    mcc: '5411', // Grocery stores, supermarkets
    aliases: ['zepto', 'zeptonow', 'kirana quick', 'zepto delivery'],
    posDescriptors: ['RAZORPAY*ZEPTO', 'ZEPTO MUMBAI', 'KIRANAKART TECH', 'ZEPTO BANGALORE', 'ZEPTO DELHI'],
    notes: 'Codes as online groceries/supermarket. Eligible for SBI Cashback 5% online & Airtel Axis 10% (via BigBasket alternative).',
  },
  {
    id: 'blinkit',
    name: 'Blinkit',
    category: 'quick_commerce',
    defaultChannel: 'online',
    mcc: '5411',
    aliases: ['blinkit', 'grofers', 'blinkit grocery', 'blinkit delivery'],
    posDescriptors: ['RAZORPAY*BLINKIT GURGAON', 'BLINKIT COMMERCE', 'GROFERS INDIA PVT', 'ZOMATO*BLINKIT'],
    notes: 'Acquired by Zomato, but codes under grocery/supermarket MCC 5411 on online gateways.',
  },
  {
    id: 'swiggy_instamart',
    name: 'Swiggy Instamart',
    category: 'quick_commerce',
    defaultChannel: 'online',
    mcc: '5411',
    aliases: ['instamart', 'swiggy grocery', 'swiggy instant'],
    posDescriptors: ['SWIGGY*INSTAMART', 'BUNDL*INSTAMART BANGALORE', 'SWIGGY GROCERY'],
    notes: 'Trigger 5% cashback on HDFC Millennia and 10% on Airtel Axis (capped).',
  },

  // Food & Dining
  {
    id: 'swiggy',
    name: 'Swiggy',
    category: 'dining_food',
    defaultChannel: 'online',
    mcc: '5814', // Fast food restaurants
    aliases: ['swiggy', 'swiggy food', 'swiggy delivery', 'swiggy dineout'],
    posDescriptors: ['BUNDL TECHNOLOGIES', 'SWIGGY BANGALORE', 'SWIGGY GOURMET', 'SWIGGY PAYTM'],
    notes: 'Top cashback: Airtel Axis (10%), HDFC Millennia (5%), Flipkart Axis (4%), Axis ACE (4%).',
  },
  {
    id: 'zomato',
    name: 'Zomato',
    category: 'dining_food',
    defaultChannel: 'online',
    mcc: '5812', // Eating places, restaurants
    aliases: ['zomato', 'zomato food', 'zomato delivery', 'zomato gold'],
    posDescriptors: ['ZOMATO LTD GURGAON', 'ZOMATO MEDIA PVT', 'ZOMATO ONLINE', 'ZOMATO DINING'],
    notes: 'Top cashback: Airtel Axis (10%), HDFC Millennia (5%), SBI Cashback (5%), Axis ACE (4%).',
  },
  {
    id: 'dominos',
    name: 'Dominos Pizza',
    category: 'dining_food',
    defaultChannel: 'online',
    mcc: '5814',
    aliases: ['dominos', 'domino', 'dominos pizza'],
    posDescriptors: ['JUBILANT FOODWORKS', 'DOMINOS PIZZA NOIDA', 'JUBILANT FOODS'],
    notes: 'SBI SimplyCLICK gives 10x reward points on Dominos online orders.',
  },

  // Supermarkets & Groceries (Crucial Channel Disparity Zone!)
  {
    id: 'dmart_online',
    name: 'DMart Ready (Online App)',
    category: 'grocery_supermarket',
    defaultChannel: 'online',
    mcc: '5411',
    aliases: ['dmart ready', 'dmart online', 'dmart app'],
    posDescriptors: ['AVENUE ECOMMERCE LTD', 'DMART READY MUMBAI', 'RAZORPAY*DMARTREADY'],
    notes: 'Online grocery: Triggers 5% cashback on SBI Cashback!',
  },
  {
    id: 'dmart_offline',
    name: 'DMart Store (Physical POS)',
    category: 'grocery_supermarket',
    defaultChannel: 'offline_pos',
    mcc: '5311', // Department store or supermarket POS
    aliases: ['dmart', 'dmart store', 'dmart supermarket', 'dmart pos'],
    posDescriptors: ['PAYTM*DMART INDORE', 'AVENUE SUPERMARTS LTD', 'DMART STORE POS', 'PINE LABS*DMART'],
    notes: 'CHANNEL ALERT: Physical DMart POS only yields 1% on SBI Cashback! Axis ACE (1.5% uncapped offline) or OneCard beats it here.',
  },
  {
    id: 'bigbasket',
    name: 'BigBasket',
    category: 'grocery_supermarket',
    defaultChannel: 'online',
    mcc: '5411',
    aliases: ['bigbasket', 'bb daily', 'bbnow', 'big basket'],
    posDescriptors: ['INNOVATIVE RETAIL CONCEPTS', 'BIGBASKET BANGALORE', 'SUPERMARKET GROCERY SUPPLIES'],
    notes: 'Tata Neu Infinity gives 10% NeuCoins (5% card + 5% NeuPass) or Airtel Axis gives 10% cashback.',
  },
  {
    id: 'croma',
    name: 'Croma',
    category: 'ecommerce_shopping',
    defaultChannel: 'online',
    mcc: '5732', // Electronic sales
    aliases: ['croma', 'croma electronics', 'croma retail'],
    posDescriptors: ['INFINITI RETAIL CROMA', 'CROMA STORE POS', 'PINE LABS*CROMA', 'RAZORPAY*CROMA'],
    notes: 'Tata Neu Infinity yields 10% NeuCoins on Croma via Tata Neu app; Regalia Gold gives 5x on Reliance Digital competitor.',
  },

  // E-Commerce Shopping
  {
    id: 'amazon',
    name: 'Amazon India',
    category: 'ecommerce_shopping',
    defaultChannel: 'online',
    mcc: '5399',
    aliases: ['amazon', 'amazon.in', 'amazon prime', 'amazon shopping'],
    posDescriptors: ['AMAZON SELLER SERVICES', 'AMAZON PAY INDIA', 'AMZN MKTP IND', 'AMAZON RETAIL'],
    notes: 'ICICI Amazon Pay gives 5% unlimited cashback; HDFC Millennia gives 5% (capped ₹1,000); Infinia gives up to 16.6% via SmartBuy Gyftr vouchers.',
  },
  {
    id: 'flipkart',
    name: 'Flipkart',
    category: 'ecommerce_shopping',
    defaultChannel: 'online',
    mcc: '5399',
    aliases: ['flipkart', 'flipkart.com', 'flipkart supercoins'],
    posDescriptors: ['FLIPKART INTERNET PVT', 'FLIPKART PAYMENTS', 'FKART BANGALORE'],
    notes: 'Flipkart Axis gives 5% unlimited cashback; HDFC Millennia gives 5%; SBI Cashback gives 5%.',
  },
  {
    id: 'myntra',
    name: 'Myntra',
    category: 'ecommerce_shopping',
    defaultChannel: 'online',
    mcc: '5691', // Apparel
    aliases: ['myntra', 'myntra fashion'],
    posDescriptors: ['MYNTRA DESIGNS PVT', 'MYNTRA BANGALORE'],
    notes: 'HDFC Regalia Gold gives 5x points (6.66% return); HDFC Millennia gives 5%; SBI Cashback gives 5%.',
  },
  {
    id: 'nykaa',
    name: 'Nykaa',
    category: 'ecommerce_shopping',
    defaultChannel: 'online',
    mcc: '5977', // Cosmetic stores
    aliases: ['nykaa', 'nykaa beauty', 'nykaa man'],
    posDescriptors: ['FSN E-COMMERCE VENTURES', 'NYKAA E-RETAIL'],
    notes: 'HDFC Regalia Gold 5x partner brand (~6.66% return); SBI Cashback gives 5%.',
  },

  // Travel & Transport
  {
    id: 'makemytrip',
    name: 'MakeMyTrip',
    category: 'travel_flight_hotel',
    defaultChannel: 'online',
    mcc: '4722', // Travel agencies
    aliases: ['makemytrip', 'mmt', 'make my trip'],
    posDescriptors: ['MAKEMYTRIP (INDIA) PVT', 'MAKEMYTRIP GURGAON', 'MMT PAYMENTS'],
    notes: 'Axis Atlas gives 5x Edge Miles on direct airlines/hotels; Infinia gives 16.6% on SmartBuy flights.',
  },
  {
    id: 'cleartrip',
    name: 'Cleartrip',
    category: 'travel_flight_hotel',
    defaultChannel: 'online',
    mcc: '4722',
    aliases: ['cleartrip', 'clear trip'],
    posDescriptors: ['CLEARTRIP TRAVEL SERVICES', 'CLEARTRIP PVT LTD'],
    notes: 'Flipkart Axis gives 4% cashback; SBI SimplyCLICK gives 10x reward points (~2.5%).',
  },
  {
    id: 'air_india',
    name: 'Air India',
    category: 'travel_flight_hotel',
    defaultChannel: 'online',
    mcc: '4511', // Airlines
    aliases: ['air india', 'airindia', 'air india express'],
    posDescriptors: ['AIR INDIA LTD', 'AIR INDIA NEW DELHI', 'AIR INDIA TICKETING'],
    notes: 'Tata Neu Infinity gives 10% NeuCoins via Tata Neu app; Axis Atlas gives 5x Edge Miles direct.',
  },
  {
    id: 'uber',
    name: 'Uber India',
    category: 'travel_flight_hotel',
    defaultChannel: 'online',
    mcc: '4121', // Taxicabs, rideshare
    aliases: ['uber', 'uber rides', 'uber auto', 'uber india'],
    posDescriptors: ['UBER INDIA SYSTEMS', 'UBER BV AMSTERDAM', 'RAZORPAY*UBER'],
    notes: 'HDFC Millennia gives 5% cashback; Flipkart Axis gives 4% cashback.',
  },
  {
    id: 'ola',
    name: 'Ola Cabs',
    category: 'travel_flight_hotel',
    defaultChannel: 'online',
    mcc: '4121',
    aliases: ['ola', 'ola cabs', 'ola auto'],
    posDescriptors: ['ANI TECHNOLOGIES PVT', 'OLA CABS BANGALORE'],
    notes: 'Axis ACE gives 4% cashback on Ola.',
  },
  {
    id: 'irctc',
    name: 'IRCTC Railways',
    category: 'travel_flight_hotel',
    defaultChannel: 'online',
    mcc: '4112', // Passenger railways
    aliases: ['irctc', 'railway ticket', 'indian railways'],
    posDescriptors: ['IRCTC WEB APP', 'IRCTC MUMBAI', 'CRIS IRCTC NEW DELHI', 'IRCTC APP'],
    notes: 'EXCLUSION ALERT: SBI Cashback expressly excludes IRCTC/Railways from 5% cashback (0% or 1%). HDFC cards earn base points.',
  },

  // Telecom & Utility Bills
  {
    id: 'airtel',
    name: 'Airtel (Mobile & Broadband)',
    category: 'telecom_bills',
    defaultChannel: 'online',
    mcc: '4814',
    aliases: ['airtel', 'airtel thanks', 'airtel broadband', 'airtel fiber', 'airtel dth'],
    posDescriptors: ['BHARTI AIRTEL LTD', 'AIRTEL THANKS APP', 'AIRTEL PAYMENTS BANK'],
    notes: 'Airtel Axis card gives a massive 25% cashback (max ₹250/mo) via Airtel Thanks app!',
  },
  {
    id: 'bescom_electricity',
    name: 'BESCOM / Electricity Bill',
    category: 'utility_govt',
    defaultChannel: 'online',
    mcc: '4900', // Utilities (electric, gas, water)
    aliases: ['bescom', 'electricity bill', 'tneb', 'mseb', 'power bill'],
    posDescriptors: ['BILLDESK*BESCOM', 'BESCOM BANGALORE', 'MAHADISCOM BILL', 'TATA POWER MUMBAI'],
    notes: 'Airtel Axis gives 10% (max ₹250/mo); Axis ACE gives 5% on Google Pay; SBI Cashback yields 0% (excluded!).',
  },

  // Health & Pharmacy
  {
    id: 'apollo_247',
    name: 'Apollo 24/7',
    category: 'pharmacy_health',
    defaultChannel: 'online',
    mcc: '5912', // Drug stores & pharmacies
    aliases: ['apollo', 'apollo 247', 'apollo pharmacy', 'apollo medical'],
    posDescriptors: ['APOLLO PHARMACY LTD', 'APOLLO 247 ONLINE', 'APOLLO HEALTHRESOURCES'],
    notes: 'SBI SimplyCLICK gives 10x reward points (~2.5%); SBI Cashback gives 5% online.',
  },
  {
    id: 'tata_1mg',
    name: 'Tata 1mg',
    category: 'pharmacy_health',
    defaultChannel: 'online',
    mcc: '5912',
    aliases: ['1mg', 'tata 1mg', 'tata1mg', 'one mg'],
    posDescriptors: ['TATA 1MG HEALTHCARE', '1MG TECHNOLOGIES'],
    notes: 'Tata Neu Infinity gives 10% NeuCoins via Tata Neu app; Flipkart Axis gives 4% cashback.',
  },

  // Entertainment
  {
    id: 'bookmyshow',
    name: 'BookMyShow',
    category: 'entertainment_movies',
    defaultChannel: 'online',
    mcc: '7832', // Motion picture theaters
    aliases: ['bookmyshow', 'bms', 'book my show'],
    posDescriptors: ['BIGTREE ENTERTAINMENT', 'BOOKMYSHOW MUMBAI', 'BMS TICKETING'],
    notes: 'ICICI Sapphiro gives Buy 1 Get 1 Free (up to ₹500 off); HDFC Millennia gives 5%; SBI SimplyCLICK gives 10x points.',
  },

  // Strict Exclusions (Fine-Print Traps!)
  {
    id: 'fuel_petrol_bunk',
    name: 'HPCL / IOCL / BPCL Petrol Bunk',
    category: 'fuel',
    defaultChannel: 'offline_pos',
    mcc: '5541', // Service stations
    aliases: ['petrol', 'diesel', 'fuel', 'hpcl', 'iocl', 'bpcl', 'shell'],
    posDescriptors: ['IOCL PETROL PUMP', 'HPCL RETAIL OUTLET', 'BPCL PETROL BUNK', 'SHELL FUEL STATION'],
    notes: 'EXCLUSION ALERT: 0% reward points across all top cards. Only a 1% surcharge waiver applies between ₹400-₹5,000.',
  },
  {
    id: 'nobroker_rent',
    name: 'NoBroker / CRED Rent Payment',
    category: 'rent_maintenance',
    defaultChannel: 'online',
    mcc: '6513', // Real estate agents & rentals
    aliases: ['nobroker rent', 'cred rent', 'house rent', 'magicbricks rent', 'society maintenance'],
    posDescriptors: ['NOBROKER TECHNOLOGIES', 'DREAMPLUG RENTPAY', 'MAGICBRICKS RENT', 'HOUSING.COM RENT'],
    notes: 'EXCLUSION ALERT: 0% rewards + 1% extra processing fee levied by HDFC, SBI, and Axis on credit card rent payments!',
  },
  {
    id: 'tanishq_jewelry',
    name: 'Tanishq / Malabar Gold & Diamonds',
    category: 'jewelry_gold',
    defaultChannel: 'offline_pos',
    mcc: '5094', // Precious stones and metals, jewelry
    aliases: ['tanishq', 'malabar gold', 'kalyan jewellers', 'gold coin', 'jewelry'],
    posDescriptors: ['TITAN TANISHQ STORE', 'MALABAR GOLD & DIAMONDS', 'KALYAN JEWELLERS POS', 'JOYALUKKAS RETAIL'],
    notes: 'EXCLUSION ALERT: SBI Cashback, HDFC Millennia, and Axis Atlas expressly award 0% rewards on jewelry (MCC 5094/5944). Tata Neu Infinity on Tanishq via Tata Neu is an exception (Tata brand perk).',
  },
  {
    id: 'paytm_wallet_reload',
    name: 'Paytm / Mobikwik Wallet Reload',
    category: 'wallet_reload',
    defaultChannel: 'online',
    mcc: '6540', // Stored value card purchase
    aliases: ['paytm wallet', 'wallet reload', 'mobikwik wallet', 'add money'],
    posDescriptors: ['ONE97 COMMUNICATIONS WALLET', 'PAYTM WALLET LOAD', 'MOBIKWIK ADD MONEY'],
    notes: 'EXCLUSION ALERT: 0% reward points on wallet loads across HDFC, SBI, Axis, and ICICI.',
  },

  // Forex / International
  {
    id: 'international_forex',
    name: 'International Merchant (USD/EUR/JPY)',
    category: 'travel_flight_hotel',
    defaultChannel: 'forex_intl',
    mcc: '7372',
    aliases: ['airbnb tokyo', 'apple store us', 'steam games', 'openai subscription', 'booking.com foreign'],
    posDescriptors: ['AIRBNB IRELAND', 'OPENAI SAN FRANCISCO', 'STEAM GAMES VALVE', 'APPLE.COM/BILL US'],
    notes: 'FOREX CHAMPION: Scapia gives 0% forex markup (saving 4.13% in fees immediately!). Standard cards charge 3.5% + 18% GST.',
  },
];
