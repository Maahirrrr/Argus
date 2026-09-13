# AI System Design & Architecture
## TapWise: Two-Tier Hybrid Reward Engine & Gateway Classifier

**Document Version:** 1.0  
**Domain:** FinTech / Probabilistic-Deterministic Hybrid Systems  
**Audience:** FinTech Engineering Leads, Staff PMs, Model Evaluators  

---

## 1. Architectural Philosophy: The Hybrid Frontier

In FinTech product development, using an end-to-end LLM for financial calculation is an anti-pattern:
1. **Unacceptable Latency**: LLM round-trip latency (400ms – 1,800ms) introduces fatal friction for a user standing at a physical POS counter or in a checkout countdown.
2. **Hallucination Risk in Arithmetic**: LLMs frequently make subtle mathematical rounding errors and miss fine-print caps (e.g., claiming 5% cashback on a ₹30,000 spend when the card has a ₹1,000/month cap).
3. **Unit Economics**: At 100,000 daily active queries, calling a full model on every query costs \$300+/day in inference tokens.

**The TapWise Solution**: A **Tiered Hybrid Architecture** pairing a deterministic mathematical rules engine with a lightweight semantic POS normalizer.

```mermaid
graph TD
    UserQuery[Raw User Query or POS String] --> GatewayParser[Tier 2: Semantic Gateway & Descriptor Normalizer]
    GatewayParser --> ChannelResolver[Channel & MCC Extraction]
    
    subgraph Execution Pipeline
    ChannelResolver --> L0[Level 0: Channel / Network Filter e.g. RuPay on UPI]
    L0 --> L1[Level 1: Universal Exclusion Guardrails e.g. Rent, Fuel, Jewelry]
    L1 --> L2[Level 2: Exact Merchant Partner Multipliers]
    L2 --> L3[Level 3: Channel-Specific Category Multipliers]
    L3 --> L4[Level 4: Base Reward Calculations]
    end

    Execution Pipeline --> Ranker[Multi-Card Comparator & Net Benefit Ranker]
    Ranker --> Output[Rank #1 Winner + Channel Alert + Full Matrix]
```

---

## 2. Latency Budget & Token Economics

### 2.1 Latency Budget (Target: P99 < 80ms)
| Processing Stage | Target Latency (P50) | Target Latency (P99) | Execution Target |
|---|---|---|---|
| Query Sanitization & Gateway Strip | 0.8 ms | 2.5 ms | Client WebAssembly / JS |
| Tier 1 Deterministic Lookup | 1.2 ms | 4.0 ms | In-Memory Hash Map |
| Tier 2 Semantic Keyword Heuristic | 2.5 ms | 8.0 ms | Regex / Trie Matcher |
| Multi-Card Rule Evaluation (15 Cards) | 3.0 ms | 12.0 ms | Deterministic Execution Loop |
| Result Ranking & Delta Calculation | 1.0 ms | 3.5 ms | Client-Side Sorting |
| **Total End-to-End Latency** | **8.5 ms** | **30.0 ms** | **Sub-Second Real-Time** |

### 2.2 Cost Model: Hybrid vs. Pure LLM Architecture (per 100,000 Daily Active Queries)
* **Pure LLM Approach (e.g. GPT-4o-mini / Claude 3.5 Haiku)**:
  - Input: ~350 tokens (card rules + query) @ \$0.15 / 1M tokens = \$0.0525
  - Output: ~120 tokens @ \$0.60 / 1M tokens = \$0.072
  - Daily Cost: \$12.45 / 100k queries → **\$4,544 / year** in unnecessary cloud spend.
* **TapWise Two-Tier Client-Side Engine**:
  - Direct cost: **\$0.00** (Runs 100% locally in browser memory).
  - Cloud serverless API calls required: 0.
  - Scale capacity: Unlimited concurrency with zero API rate limits.

---

## 3. Strict Precedence Hierarchy

To guarantee mathematical correctness and eliminate edge-case errors, rule evaluation follows a non-negotiable waterfall:

### Level 0: Channel & Network Incompatibility
* If `channel === 'rupay_upi'`, only cards with `isRupayUPI === true` can earn rewards. Non-RuPay cards receive **0%** and are marked `Incompatible with UPI QR`.

### Level 1: Universal Exclusion Traps
* Indian banking regulations and recent issuer devaluations strictly exclude:
  - `fuel` (MCC 5541) → 0% reward, 1% surcharge waiver only.
  - `rent_maintenance` (MCC 6513) → 0% reward, +1% processing fee.
  - `jewelry_gold` (MCC 5094/5944) → 0% reward on SBI Cashback, HDFC Millennia, Axis Atlas.
  - `wallet_reload` (MCC 6540) → 0% reward across all issuers.

### Level 2: Specific Merchant ID Multipliers
* Direct contractual co-branded or preferred partner multipliers:
  - Tata Neu Infinity on BigBasket / Croma → 10% NeuCoins.
  - ICICI Amazon Pay on Amazon.in Prime → 5% unlimited.
  - Flipkart Axis on Flipkart → 5% unlimited.
  - Airtel Axis on Airtel Thanks App → 25% (capped).

### Level 3: Channel-Specific Category Multipliers
* Category rules that explicitly depend on the transaction channel:
  - **SBI Cashback**: 5% on `online` across all valid merchants; drops to 1% on `offline_pos` store swipes.
  - **Axis ACE**: 5% on `online` Google Pay bills; 1.5% uncapped on `offline_pos` retail.

### Level 4: Base Rewards & Forex Adjustments
* If no higher rule triggers, apply `card.baseRewardPercent`.
* On `forex_intl` transactions, deduct issuer forex markup (standard: 3.5% + 18% GST = 4.13%) against base reward, giving Scapia Federal (0% forex markup) a decisive advantage.

---

## 4. Guardrails & Failure Modes

1. **The Merchant ID Leak Bug**: A rule containing `merchantIds` (e.g. BigBasket) must NEVER match generic category transactions if the merchant is different (e.g. DMart Ready). Guarded via strict `!rule.merchantIds || rule.merchantIds.length === 0` validation.
2. **Channel Masking**: If a user does not specify a channel, the engine detects keywords in the query (`APP`, `STORE`, `POS`, `UPI`, `SCAN`, `USD`) before falling back to the merchant's canonical default channel.
3. **Transparent Auditing**: Every recommendation returns an explicit `rationale` string tied to the exact rule and issuer clause, ensuring complete explainability for users and compliance audits.
