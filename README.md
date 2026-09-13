# FinPilot — AI Copilot for Fintech Product Managers

[![Live App](https://img.shields.io/badge/live%20app-maahirrrr.github.io%2FTapWise-indigo.svg)](https://maahirrrr.github.io/TapWise/)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Product Stack](https://img.shields.io/badge/fintech-UPI%20%7C%20eKYC%20%7C%20Refunds-cyan.svg)]()
[![Decision Engine](https://img.shields.io/badge/prioritization-Dynamic%20RICE%20Workbench-purple.svg)]()

> **"Cursor / Claude for a Fintech PM."**  
> Go from Problem Discovery → Telemetry Insight → Dynamic Prioritization → Production PRD → Causal A/B Experimentation → Weekly Autonomous Review in seconds.
>
> 🔗 **Live Interactive App:** [https://maahirrrr.github.io/TapWise/](https://maahirrrr.github.io/TapWise/)

---

## 🎯 What is FinPilot?

FinPilot is an **AI Product Management Decision Cockpit** built specifically for fintech product teams managing high-volume payment systems, onboarding funnels, and fraud/compliance pipelines.

When a product anomaly occurs—such as a 4.1% drop in UPI checkout success rate—FinPilot correlates millions of telemetry events, decomposes the root contributors, lets PMs test roadmap trade-offs on an interactive RICE workbench, drafts an engineering-ready PRD, and configures guarded A/B experiments.

---

## ⚡ The 7 Core Product Modules

### 1. 🔎 Incident Discovery & Product Intelligence
* **Real-time Anomaly Sentry**: Detects metric regressions across 4.8M transacting users (e.g. UPI SR: 94.2% → 90.1%).
* **Root Cause Decomposition**: Breaks down failure share across:
  * **Bank Switches**: Bank X core banking node timeouts (>30s) accounting for 52% of lost volume.
  * **OS Regressions**: Android 15 background service policy terminating intent handshakes (24% share).
  * **Ticket Sizes**: High-value ₹10,000+ fraud velocity check drops (15% share).
  * **Peak Traffic**: 8:00 PM – 10:30 PM evening congestion surges (9% share).
* **AI Actionable Advice**: Suggests dynamic multi-bank routing over UI redesigns.

### 2. 🧠 AI Prioritization Engine (The Centerpiece)
* **Dynamic Sensitivity & Trade-Off Workbench**: Live interactive sliders for **Reach**, **Impact (1-10)**, **Confidence (1-10)**, and **Effort (Sprints)**.
* **Instant Re-Ranking**: Dynamically re-sorts initiatives across **RICE**, **ICE**, or **MoSCoW** algorithms.
* **Causal Sensitivity Explainer**: FinPilot automatically explains *why* the ranking shifted (e.g., *"Increasing effort on Dynamic Failover from 3 to 6 sprints reduces RICE score by 44%, dropping it to #3 below Aadhaar Face-RD"*).

### 3. 📄 PRD Copilot (Production-Grade Specs)
* Generates comprehensive product requirements:
  * **Problem Statement & User Impact**
  * **Goals & Non-Goals (Scope Boundaries)**
  * **Prioritized Functional Specs (P0 / P1 / P2)**
  * **Gherkin Acceptance Criteria (Given / When / Then)**
  * **Edge Cases & Graceful Degradation Safeguards**
  * **Phased Rollout Strategy (Canary 5% → Staged 25% → 100%)**
* **1-Click Markdown Export**: Ready to paste directly into Notion, Linear, Jira, or Confluence.

### 4. 🧪 Experiment Designer & Causal A/B Testing
* **Hypothesis Formulation**: Formalizes Null vs Alternative causal hypotheses.
* **Dynamic Traffic Split**: Visual slider allocating volume between Control and Variant A (Smart Failover).
* **Sample Size & MDE Estimation**: Statistical power calculations (α = 0.05, 80% power).
* **Guardrail Constraints (Circuit Breakers)**: Enforces hard thresholds on retry rate and gateway latency with automated rollback triggers.

### 5. 📊 Product Analytics Copilot (ClickHouse Telemetry)
* **Natural Language to SQL**: Converts PM inquiries into high-performance ClickHouse warehouse queries.
* **Instant Diagnostic Visualizations**: Funnel drop-offs, bank latency heatmaps, and retention cohort decay curves.
* **Preset Benchmarks**: Quick exploration of failure rates, Day-7 retention impact, and merchant categories.

### 6. 🤖 Autonomous Weekly PM Agent
* **Monday 8:00 AM Executive Brief**: Synthesizes product health into a unified scorecard.
* **Core Metric Drift Tracker**: Quantifies deltas in UPI SR, new signups, refund tickets, and GMV.
* **Stakeholder Sign-Offs**: Interactive approval checkpoints for Engineering Leads, Risk & Compliance, and VP of Product.

### 7. ⚡ Fintech Brain Feed
* **Customer Voice Clustering**: Unifies Play Store reviews, Zendesk tickets, and Twitter/X complaints into thematic churn clusters.
* **Competitor Radar**: Tracks counter-strategies against PhonePe (1-Tap biometric), Google Pay (multi-bank fallback), CRED (P2P drops), and Paytm (Soundbox screen reversal).

---

## 🛠 Tech Stack & Design System

* **Framework**: React 19 + TypeScript (Strict mode, 0 lint/build warnings)
* **Styling**: Tailwind CSS v4 + Obsidian Dark Design System (Linear / Cursor aesthetic)
* **Animation & Motion**: Motion (Framer Motion v13 engine)
* **Icons**: Lucide React
* **Typography**: Syne (Hero headlines), Space Grotesk (UI headers), JetBrains Mono (Telemetry/Data), DM Sans (Body)
* **Build**: Vite 8

---

## 🚀 Getting Started Locally

```bash
# 1. Clone repository
git clone https://github.com/Maahirrrr/TapWise.git
cd TapWise

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

# 4. Build for production
npm run build
```

---

## 👤 Author & Architecture

Crafted as a flagship Fintech Product Management & AI Copilot system showcase.  
Live deployment: [https://maahirrrr.github.io/TapWise/](https://maahirrrr.github.io/TapWise/)
