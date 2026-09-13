# Argus — AI Operating System for Fintech Product Teams

[![Live App](https://img.shields.io/badge/live%20app-maahirrrr.github.io%2FArgus-blue.svg)](https://maahirrrr.github.io/Argus/)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Product Stack](https://img.shields.io/badge/fintech-UPI%20%7C%20Gateways%20%7C%20Chaos%20Failover-cyan.svg)]()
[![Decision Engine](https://img.shields.io/badge/prioritization-Dynamic%20RICE%20Workbench-purple.svg)]()

> **Cursor / Claude for a Fintech PM.**  
> Go from Problem Discovery → Telemetry Insight → Dynamic Prioritization → Production PRD → Causal A/B Experimentation → Chaos Failover Simulation in seconds.
>
> 🔗 **Live Interactive Platform:** [https://maahirrrr.github.io/Argus/](https://maahirrrr.github.io/Argus/)

---

## 👁️ What is Argus?

**Argus** is an **AI-powered Product Operating System** built specifically for fintech product teams managing high-volume payment systems, onboarding funnels, banking switches, and fraud/compliance pipelines.

When a payment anomaly occurs—such as a 4.1% drop in UPI checkout success rate—Argus correlates telemetry streams across millions of events, isolates the causal root contributors, lets PMs test roadmap trade-offs on an interactive RICE sensitivity workbench, drafts an engineering-hardened PRD with BDD test cases, and runs chaos outage failover simulations.

---

## ⚡ Core Product Capabilities

### 1. 🔎 Telemetry Anomaly Sentry & Signals Triage
* **Real-time Anomaly Sentry**: Detects metric regressions across transacting cohorts (e.g. UPI SR: 94.2% → 90.1%).
* **Causal Root Cause Decomposition**: Breaks down failure attribution across Bank Switches, OS Regressions, Ticket Sizes, and Peak Traffic.
* **AI Actionable Advice**: Suggests dynamic multi-bank routing over UI redesigns.

### 2. ⚡ Real-Time Payment Chaos & Failover Simulator
* **Bank Outage Injection**: Simulate live HDFC latency spikes (+1,400ms), Android 15 auth crashes, and NPCI switch throttling.
* **Live Ticking GMV Loss Meter**: Real-time revenue at risk calculation.
* **1-Click Autonomous Failover**: Reroutes degraded traffic to secondary gateways and displays salvaged GMV counter.
* **Incident Post-Mortem PRD Export**: Converts failure telemetry into an incident post-mortem and PRD spec.

### 3. 🧠 Dynamic RICE Prioritization Workbench
* **Interactive Sensitivity Sliders**: Live controls for Reach, Impact, Confidence, and Effort.
* **Instant Re-Ranking**: Dynamically re-sorts initiatives across RICE, ICE, or MoSCoW models.
* **Causal Explainer**: Argus automatically explains why rankings shifted.

### 4. 📄 PRD Studio & Adversarial AI Critic
* **Production-Grade Specs**: Problem statement, scope, functional specs with Gherkin BDD test cases, rollout phases.
* **AI Version Diff Inspector (v1 vs v2)**: Side-by-side comparison of PM draft against AI-critic hardened specs.

### 5. 🧪 Experiment Lab & Causal A/B Testing
* **Hypothesis Formulation**: Formalizes Null vs Alternative causal hypotheses.
* **Dynamic Traffic Allocation**: Slider splitting volume between Control and Variant.
* **Guardrail Constraints & Rollback Kill Switch**: Circuit breaker thresholds with automated rollback triggers.

### 6. 📊 Contextual Telemetry Copilot & ClickHouse Studio
* **Natural Language to SQL**: Converts PM inquiries into ClickHouse queries.
* **Diagnostic Funnels**: Funnel drop-offs, bank latency heatmaps, and retention curves.

### 7. 🎓 Interactive Onboarding Tutorial
* Step-by-step interactive onboarding guide accessible via top header, keyboard shortcut T, or ⌘K command palette.

---

## 🛠 Tech Stack & Design System

* **Framework**: React 19 + TypeScript (Strict mode, 0 warnings)
* **Styling**: Tailwind CSS v4 + Obsidian Dark Design System (#050505 base, #0066FF electric blue accent)
* **Animation & Motion**: Motion (Framer Motion v13 engine)
* **Icons**: Lucide React
* **Typography**: Syne (Hero headlines), Space Grotesk (UI headers), JetBrains Mono (Telemetry/Data), Inter (Body)
* **Build**: Vite 8

---

## 🚀 Getting Started Locally

`ash
# 1. Clone repository
git clone https://github.com/Maahirrrr/Argus.git
cd Argus

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

# 4. Build for production
npm run build
`

---

## 🌐 GitHub Pages Deployment Setup

To ensure GitHub Pages serves Argus properly:
1. In your GitHub repository, go to **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**:
   - Select **GitHub Actions** (Recommended — builds and deploys automatically via .github/workflows/deploy.yml).
   - *Or* select **Deploy from a branch** > Branch: main > Folder: /docs.
3. Your live site will be available at: **[https://maahirrrr.github.io/Argus/](https://maahirrrr.github.io/Argus/)**

---

## 👤 Author & Architecture

Crafted as a flagship Fintech Product Management & AI Copilot system showcase.  
Live deployment: [https://maahirrrr.github.io/Argus/](https://maahirrrr.github.io/Argus/)
