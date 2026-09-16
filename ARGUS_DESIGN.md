# ARGUS Design System Specification (`ARGUS_DESIGN.md`)

> **Version**: 2.0.0  
> **Status**: Institutional Production Standard  
> **Classification**: AI Product Management Operating System (PM OS)  
> **Repository Target**: `c:\Users\MAHIR\Desktop\tapwise`

---

## 1. Design Philosophy & Vision

ARGUS is not a generic SaaS dashboard, nor an AI marketing experiment. It is a precision **AI Product Management Operating System** built for high-conviction product teams. It closes the critical gap between telemetry and execution:

$$\text{SIGNAL} \longrightarrow \text{INSIGHT} \longrightarrow \text{PROBLEM} \longrightarrow \text{OPPORTUNITY} \longrightarrow \text{DECISION} \longrightarrow \text{ROADMAP} \longrightarrow \text{PRD} \longrightarrow \text{EXPERIMENT} \longrightarrow \text{SHIP} \longrightarrow \text{MEASURE} \longrightarrow \text{LEARN} \longrightarrow \text{NEXT DECISION}$$

### Core Aesthetic Pillars
1. **Institutional Density**: Information density is valued over decorative whitespace. Screens present structured operational data, not floating generic cards.
2. **Terminal Clarity**: Typography and layouts feel engineered, reminiscent of high-performance tools (Bloomberg Terminal, Datadog, Linear, Stripe Dashboard).
3. **Earned Motion**: Microinteractions are instantaneous (80ms–150ms). Motion serves exclusively to communicate state transitions, causal attribution, and data flow.
4. **Zero AI Cliché**: No generic purple/pink gradients, no neon drop-shadows, no pseudo-glassmorphism everywhere, and zero marketing filler.

---

## 2. Color System & Design Tokens

ARGUS operates strictly on an institutional dark palette designed for extended engineering and product operations.

```css
:root {
  /* ───── Base Surfaces ───── */
  --surface-0: #050505; /* Primary canvas / page background */
  --surface-1: #0A0A0A; /* Module container surface */
  --surface-2: #111111; /* Hover / elevated interactive state */
  --surface-3: #161616; /* Active elements & pressed states */
  --surface-elevated: #1C1C1C; /* Modal & Drawer elevated sheets */

  /* ───── Structural Hairline Borders ───── */
  --border-subtle: #1D1D1D; /* Primary 1px dividing hairline */
  --border-default: #262626; /* Container boundary */
  --border-strong: #333333;  /* Hover / interactive border */
  --border-focus: #0066FF;   /* Active selection ring */

  /* ───── Typography & Content Contrast ───── */
  --text-primary: #F5F5F0;   /* High-contrast headlines & values */
  --text-secondary: #A3A3A3; /* Descriptive metadata & labels */
  --text-tertiary: #666666;  /* Auxiliary timestamps & breadcrumbs */
  --text-disabled: #404040;  /* Disabled state */

  /* ───── Precision Semantic Accents ───── */
  --signal-blue: #0066FF;    /* Primary brand & causal conviction */
  --signal-blue-dim: #0052CC;/* Hover state for primary action */
  --signal-green: #10B981;   /* High conviction, healthy, statistical significance */
  --signal-amber: #F59E0B;   /* Degraded, warnings, reviewing state */
  --signal-red: #EF4444;     /* Critical anomalies, latency spikes, blockers */
}
```

### Accent Application Rules
- **Blue (`#0066FF`)**: Strictly reserved for primary call-to-action buttons, active sidebar indicators (2px left border), selected tabs, and confidence indicators. It is **never** used as a diffuse gradient or ambient glow.
- **Red (`#EF4444`)**: Reserved for critical system anomalies, P99 timeouts, and roadmap blockers.
- **Green (`#10B981`)**: Reserved for verified causal links, positive A/B experiment deltas, and healthy service states.

---

## 3. Typography Rhythm & Hierarchy

ARGUS uses a high-performance typographical stack:
- **Headlines & Display**: Space Grotesk / Syne (tight letter-spacing, authoritative punch).
- **Interface & Body**: Inter / DM Sans (maximum readability at 12px–14px).
- **Data, Delimiters & Code**: JetBrains Mono / Space Mono (tabular figures for metrics, logs, queries, and deltas).

| Role | Font Family | Size | Weight | Line Height | Tracking | Case |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Page Title** | Space Grotesk | 24px / 1.5rem | 700 Bold | 1.2 | -0.02em | Title Case |
| **Section Header** | Space Grotesk | 14px / 0.875rem | 600 SemiBold | 1.3 | -0.01em | Sentence Case |
| **Body Text** | Inter / System | 13px / 0.8125rem | 400 Regular | 1.5 | normal | Sentence Case |
| **Data / Metric Value** | JetBrains Mono | 24px–28px | 700 Bold | 1.0 | -0.03em | Tabular Nums |
| **Metadata & Badges**| JetBrains Mono | 10px / 0.625rem | 600 SemiBold | 1.2 | +0.05em | Uppercase |
| **Code / Log Telemetry**| JetBrains Mono | 11px / 0.6875rem | 500 Medium | 1.4 | 0 | Raw |

> **Anti-Slop Typography Directives**:
> - Never apply uppercase tracked-out typography to standard paragraph copy or section titles.
> - Reserve uppercase strictly for compact status badges (`CRITICAL`, `LIVE`, `SIMULATION`) and system stage codes (`01`, `02`).

---

## 4. Spacing, Grids & Radii Discipline

### Spacing Grid
All spacing is derived from a **4px modular grid**:
- Micro: `4px` (`gap-1`), `8px` (`gap-2`)
- Compact: `12px` (`p-3`), `16px` (`p-4`)
- Structural: `20px` (`p-5`), `24px` (`p-6`), `32px` (`py-8`)

### Flush Containers with Hairline Dividers
Avoid arbitrary floating card grids with excessive margins. Instead, combine related metrics into **flush modular strips** divided by 1px rules:
```tsx
<div className="w-full min-h-[88px] flex rounded-[4px] bg-[#0A0A0A] border border-[#1D1D1D] divide-x divide-[#1D1D1D]">
  <div className="flex-1 p-4">...</div>
  <div className="flex-1 p-4">...</div>
</div>
```

### Radius Scale Discipline
- **`2px` / `3px`**: Badges, table row pills, tag chips, code snippets.
- **`4px`**: Form inputs, standard buttons, range slider thumbs, tooltip containers.
- **`6px`**: Structural panels, preview canvases, modal dialogs.
- **`8px`**: Slide-out inspection drawers (`ArgusDrawer`).
- **Never use `rounded-2xl` or `rounded-3xl` for operational dashboard components.**

---

## 5. Component Standards

### 1. High-Density Operational Tables (`.argus-table`)
- High information density with minimal vertical padding (`py-2.5 px-3`).
- 1px hairline border separation (`divide-y divide-[#141414]`).
- Row hover transitions (`hover:bg-[#0D0D0D]`) with direct action trigger (e.g. `Investigate →`).
- Monospace tabular figures for metrics, anomalies, and deltas.

### 2. Contextual Slide-out Inspection Drawer (`ArgusDrawer`)
- Slides in from right viewport edge without obscuring primary workspace navigation.
- Fixed 88px header with badge classification, title, and close trigger (`Escape` key supported).
- Tabbed investigation view: Evidence Chain, Ingestion Payload, Causal Reasoning, Action Triggers.

### 3. Systematic Signal Pipeline Graph
- Structured into 4 distinct physical columns:
  1. Data Sources (`Payments`, `Banking Switch`, `Support`, `Feedback`, `Competitor`)
  2. Signal Sentry (`Spike Detector`, `P99 Latency Sentry`, `Anomaly Cluster`)
  3. Argus Engine (`Signal Fusion & Causal Deduction`)
  4. Product Objects (`Opportunities`, `PRD Studio`, `Prioritize`, `Experiments`)
- Animated bezier SVG connectors with moving data particles.
- Contextual hover tooltips detailing concrete volume and causal links.

### 4. Custom Sliders (`.argus-slider`)
- Clean rectangular 14px thumb with 2px radius and `#0066FF` background.
- 4px track with subtle background (`#1F1F1F`) and blue fill.
- Real-time numerical value callout above thumb.

---

## 6. Motion & Microinteraction System

- **Duration**: Fast transitions default to `120ms`–`180ms`. Drawer slides use `240ms`.
- **Easing Curve**: `cubic-bezier(0.16, 1, 0.3, 1)` for snappy, mechanical responsiveness.
- **Accessibility**: All CSS transitions and animations must adhere to `@media (prefers-reduced-motion: reduce)` rules by dropping durations to `0ms`.
