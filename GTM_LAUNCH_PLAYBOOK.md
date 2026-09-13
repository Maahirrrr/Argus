# Go-To-Market (GTM) Launch Playbook
## TapWise: Distribution Strategy for Indian Credit Card Communities

**Document Version:** 1.0  
**Target Milestone:** 10,000 Active Monthly Users in 30 Days  
**Budget:** ₹0 (Pure Product-Led Growth & Community Seeding)  

---

## 1. The Core Distribution Wedge: Zero-KYC Frictionlessness

Every existing financial optimization app (CRED, Fold, Jupiter) demands bank logins or SMS reading permissions. This creates massive drop-off:
* **TapWise Wedge**: **Zero KYC, Zero Permissions, Zero Sign-ups**.
* The user loads the URL, selects their 3 cards, and immediately sees value in under 5 seconds.
* This unlocks instant virality on platforms where privacy-conscious users hang out (Reddit, Twitter, Telegram).

---

## 2. Community Seeding Strategy

### 2.1 The r/CreditCardsIndia Play (Day 1 – Day 7)
r/CreditCardsIndia is the highest-density hub of credit card optimizers in the country (~150,000 members).

* **Post Title**:  
  *"I got tired of guessing whether DMart Ready vs Physical POS earns 5% on SBI Cashback, so I built a zero-KYC instant optimizer (TapWise)"*
* **Post Content Anatomy**:
  1. Acknowledge the shared pain: *"Card issuers keep stealth-devaluing categories. Last week, I realized my DMart physical swipe earned 1% while online gave 5%."*
  2. Explain the solution: Built a client-side tool with exact rules for 15 Indian cards (Infinia, Atlas, Millennia, Tata Neu RuPay, SBI Cashback).
  3. Include a raw POS descriptor test: *"Try typing `RAZORPAY*BLINKIT` or `BILLDESK*BESCOM`."*
  4. Privacy guarantee: *"No bank login, no card numbers, 100% runs in your browser."*
  5. Ask for feedback on card rules.

---

### 2.2 The FinTech Twitter / LinkedIn Teardown (Day 8 – Day 14)
Targeting PMs, Founders, and FinTech enthusiasts across Bangalore, Mumbai, and Delhi.

* **Hook**:  
  *"Why Indian Credit Card Rewards Are Broken (And How We Engineered an AI Gateway Classifier to Fix It) 🧵👇"*
* **Key Visuals to Attach**:
  - Screenshot of TapWise resolving `PAYTM*DMART INDORE` vs `DMart Ready`.
  - Architecture diagram comparing Two-Tier Hybrid engine vs. slow LLM wrappers.
  - Link to GitHub repository featuring the `PRD.md` and `EVALS_FRAMEWORK.md`.
* **Tagging Strategy**: Tag prominent Indian FinTech founders and card analysts (CardMaven, Technofino, CRED alumni).

---

### 2.3 Product Hunt & Hacker News (Day 15 – Day 21)
* **Show HN**: *"TapWise – A real-time credit card rewards optimizer for Indian payment gateways"*
* **Product Hunt**: Launch on Tuesday at 12:01 AM PT with GIF demonstrations of instant sub-second lookup.

---

## 3. Growth Loops & Retention Mechanics

1. **The Shareable Swipe Summary**:
   - The one-click "Share Recommendation" button outputs formatted text optimized for WhatsApp groups and Twitter:
     `💳 TapWise Recommendation for ₹1,200 on Swiggy: Use HDFC Millennia for 5% cashback (₹60 saved)!`
2. **PWA Mobile Add to Home Screen**:
   - Prompts mobile users to install TapWise to their home screen as a 1-tap utility before entering checkout lines.
3. **Crowdsourced Rule Verification**:
   - A direct link for power-users to suggest new MCC changes or issuer devaluations via GitHub pull requests.
