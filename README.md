# TapWise — Real-Time Indian Credit Card Swipe Optimizer

[![Live Demo](https://img.shields.io/badge/live%20demo-tapwise--app--seven.vercel.app-emerald.svg)](https://tapwise-app-seven.vercel.app/)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Benchmark Evals](https://img.shields.io/badge/evals-11%2F11%20passing%20(100%25)-emerald.svg)]()
[![Privacy](https://img.shields.io/badge/privacy-100%25%20client--side-blue.svg)]()
[![Cards Mapped](https://img.shields.io/badge/cards-15%20Indian%20Powerhouses-amber.svg)]()

> **Never swipe the wrong card in India again.**  
> 🔗 **Live Demo:** [https://tapwise-app-seven.vercel.app/](https://tapwise-app-seven.vercel.app/)  
> TapWise is a sub-second, zero-KYC credit card rewards optimizer designed specifically for urban Indian cardholders. It disambiguates cryptic payment gateway descriptors (`RAZORPAY*BLINKIT`, `PAYTM*DMART`), identifies online vs. offline channel disparity traps, and alerts users to fine-print regulatory exclusions.

---

## ⚡ Key Highlights

* **India-First Moat**: Laser-focused on the 15 powerhouse cards across HDFC, ICICI, Axis, SBI, OneCard, and Federal Bank.
* **Aggregator POS Disambiguation**: Intelligently strips and resolves raw bank statement strings (`RAZORPAY*BLINKIT GURGAON`, `BILLDESK*BESCOM`, `PINE LABS*CROMA`).
* **Channel Disparity Guardrail**: Resolves hard edge cases like **SBI Cashback** (5% online on DMart Ready vs. 1% offline at physical DMart store counters).
* **Fine-Print Exclusion Detection**: Alerts users to 0% rewards on rent payments, fuel surcharges, wallet reloads, and jewelry (MCC 5094/5944).
* **RuPay UPI & 0% Forex Optimization**: Routes UPI QR scans to RuPay cards (Tata Neu Infinity 1.5%) and foreign currency transactions to zero-markup cards (Scapia Federal 0%).
* **Zero Security Friction**: No card numbers, no CVVs, no bank logins. 100% client-side privacy.

---

## 🎯 Architecture & AI System Design

TapWise implements a **Two-Tier Hybrid Architecture** that combines instant deterministic evaluation with semantic descriptor normalization:

```
[User Input / POS String]
          │
          ▼
┌────────────────────────────────────────────────────────┐
│  Tier 2: Semantic Gateway & Descriptor Normalizer     │
│  - Strips gateway prefixes (Razorpay, Paytm, BillDesk) │
│  - Normalizes merchant aliases & detects channel       │
└─────────────────────────┬──────────────────────────────┘
                          │
                          ▼
┌────────────────────────────────────────────────────────┐
│  Tier 1: Multi-Card Deterministic Rules Engine        │
│  - Level 0: UPI / RuPay Network Compatibility Check    │
│  - Level 1: Strict Regulatory Exclusions (Rent, Fuel)  │
│  - Level 2: Specific Partner Multipliers (Swiggy, BB)  │
│  - Level 3: Channel-Specific Category Rules            │
│  - Level 4: Base Rewards & Forex Markup Deductions     │
└─────────────────────────┬──────────────────────────────┘
                          │
                          ▼
      [#1 Winner Card + Savings (₹) + Full Leaderboard]
```

---

## 📁 FinTech AI PM Portfolio Suite

This repository is structured as a production-grade FinTech portfolio showcasing AI Product Management rigor:

| Artifact | Description |
|---|---|
| 📄 [**PRD.md**](./PRD.md) | Comprehensive Product Requirements Document: Problem statement, Personas, Metric Hierarchy (North Star & Counter-Metrics), Edge Cases. |
| 🏗️ [**AI_SYSTEM_DESIGN.md**](./AI_SYSTEM_DESIGN.md) | AI System Architecture, Latency Budgets (P99 < 80ms), Token Economics vs. LLM wrappers, Rule Precedence Waterfall. |
| 🧪 [**EVALS_FRAMEWORK.md**](./EVALS_FRAMEWORK.md) | Test Suite & Evaluation Rubric with 11 core benchmark edge cases (Channel Disparity, POS Gateway parsing, Exclusions). |
| 🚀 [**GTM_LAUNCH_PLAYBOOK.md**](./GTM_LAUNCH_PLAYBOOK.md) | Tactical Go-To-Market strategy for r/CreditCardsIndia, FinTech Twitter/LinkedIn, and Product Hunt. |

---

## 💳 The 15 Curated Powerhouse Cards

1. **HDFC Infinia Metal** (3.3% base, 16.6% SmartBuy flights & hotels)
2. **HDFC Regalia Gold** (1.3% base, 6.6% SmartBuy / 5x retail brands)
3. **HDFC Millennia** (5% on 10 top partners: Amazon, Flipkart, Swiggy, Zomato, Uber)
4. **Tata Neu Infinity HDFC** (10% on Tata Neu ecosystem, 1.5% on RuPay UPI)
5. **Tata Neu Plus HDFC** (7% on Tata Neu, 1.0% on RuPay UPI)
6. **ICICI Amazon Pay** (5% unlimited Amazon Prime, 2% bills, 1% other)
7. **ICICI Sapphiro** (BookMyShow Buy-1-Get-1, premium airport lounges)
8. **Axis Atlas** (5x Edge Miles on direct airlines/hotels, 2x base)
9. **Airtel Axis Bank** (25% on Airtel bills, 10% on Swiggy/Zomato/BigBasket)
10. **Flipkart Axis Bank** (5% Flipkart, 4% Swiggy/Uber/Cleartrip/1mg)
11. **Axis ACE** (5% GPay bills, 4% Swiggy/Zomato, 1.5% flat offline)
12. **SBI Cashback** (5% on all online spends, 1% on physical store POS)
13. **SBI SimplyCLICK** (10x points on Apollo/BMS/Cleartrip, 5x online)
14. **OneCard Metal** (5x points on Top 2 monthly spend categories, 1% forex)
15. **Scapia Federal Bank** (0% forex markup, 2% Scapia coins on all spends)

---

## 🚀 Getting Started

### Prerequisites
* Node.js v18+ and npm

### Installation
```bash
# Clone repository
git clone https://github.com/your-username/tapwise.git
cd tapwise

# Install dependencies
npm install

# Run development server
npm run dev
```

### Running the AI PM Benchmark Evaluation
```bash
npx tsx test-optimizer.ts
```
Expected output:
```
📊 BENCHMARK SUMMARY: 11/11 test cases passed (100%)
🎉 ALL EDGE CASES VERIFIED ACCURATELY!
```

---

## 🛡️ Privacy & Compliance
TapWise is built with **Privacy-by-Design**:
* ❌ No bank account logins or OAuth tokens required.
* ❌ No card numbers, expiry dates, or CVVs requested.
* ❌ No backend database storing transaction histories.
* ✅ 100% executed locally inside the user's browser.
