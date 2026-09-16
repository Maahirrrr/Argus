# ARGUS Architecture & Developer Directives (`CLAUDE.md`)

Welcome to the **ARGUS** repository (`c:\Users\MAHIR\Desktop\tapwise`).

ARGUS is an AI Product Management Operating System that guides product teams through the continuous loop:
$$\text{SIGNAL} \longrightarrow \text{INSIGHT} \longrightarrow \text{PROBLEM} \longrightarrow \text{OPPORTUNITY} \longrightarrow \text{DECISION} \longrightarrow \text{ROADMAP} \longrightarrow \text{PRD} \longrightarrow \text{EXPERIMENT} \longrightarrow \text{SHIP} \longrightarrow \text{MEASURE} \longrightarrow \text{LEARN} \longrightarrow \text{NEXT DECISION}$$

---

## 1. Mandatory Design & Quality Directives

Any agent or developer modifying this repository **MUST** strictly adhere to the standards documented in the following three specifications:

1. **[`ARGUS_DESIGN.md`](./ARGUS_DESIGN.md)**:
   - Institutional dark color palette (`#050505` canvas, `#0A0A0A` surface, `#111111` hover, `#1D1D1D` border, `#0066FF` functional accent).
   - Strict radius discipline: `2px`–`4px` for inputs/buttons/badges, `8px` for cards/drawers. Never use `rounded-3xl` or `rounded-full` for dashboard elements.
   - Spacing on 4px grid. Flush divided containers (`divide-x divide-[#1D1D1D]`) over floating cards.

2. **[`ARGUS_UX.md`](./ARGUS_UX.md)**:
   - Zero Context Loss: Deep-dive investigations occur in slide-out drawers (`ArgusDrawer`), preserving the user's workspace context.
   - Grounded AI Causal Attribution: Always provide concrete evidence links (source event volume, ClickHouse partition, ticket spikes), never ambiguous summaries.
   - Wayfinding: Sidebar active indicator is a `2px` left border in `#0066FF` with transparent background (no blue pill). Global shortcut `⌘K` for Command Palette.

3. **[`ARGUS_ANTI_SLOP.md`](./ARGUS_ANTI_SLOP.md)**:
   - **Zero Tolerance**: No purple/pink gradients, no neon glow, no pseudo-glassmorphism on opaque dashboards, no repetitive 8-identical-card grids, no decorative ALL-CAPS copy, no fake pulsing dots on mock data.
   - Apply the **20% Removal Rule** on every view before shipping.
   - Rigorous technical copy (e.g. "HDFC UPI switch latency spike", "14,200 ClickHouse rows", not "AI is supercharging your insights").

---

## 2. Common Developer Commands

```powershell
# Install dependencies
npm install

# Start local Vite development server
npm run dev

# Run TypeScript type check (Zero errors required)
npx tsc -b

# Build production bundle
npm run build

# Sync built assets to docs and assets folders for GitHub Pages deployment
Copy-Item -Recurse -Force dist\* docs\ ; Copy-Item -Recurse -Force dist\assets assets\
```

---

## 3. Project Structure & Key Directories

- `src/components/landing/`:
  - `LandingPage.tsx`: Narrative 9-part product story.
  - `InteractiveProductDemo.tsx`: Signature "Follow a Signal" 6-step interactive simulator tagged `DEMO WORKSPACE`.
  - `ProductShowcaseLoop.tsx`: Real interactive production preview of ARGUS modules.
- `src/components/cockpit/`:
  - `CockpitGrid.tsx`: Operational command center featuring Flush KPI Strip, Anomaly Timeline, Signals Table, Split Decision Ledger, Roadmap Matrix, and Audit Stream.
  - `CockpitDrawer.tsx`: Contextual slide-out inspection sheet.
  - `CockpitHeader.tsx`: Date, customization, and Chaos Simulator trigger.
- `src/components/argus/`:
  - `SignalGraph/SignalGraph.tsx`: Systematic 4-stage pipeline (Sources → Sentry → Engine → Product Objects) with real particle motion and hover telemetry.
  - `ArgusSignalFabric/`: Live stream aggregator and anomaly clustering engine.
- `src/styles/argus-dashboard.css`: Design tokens, institutional utilities, `.argus-table`, `.argus-slider`, and focus rings.

---

## 4. Verification Checklist Before Committing

- [ ] `npx tsc -b` passes with 0 errors.
- [ ] `npm run build` succeeds without warnings.
- [ ] All interactive components (tabs, sliders, drawers, filters) respond to user clicks.
- [ ] No generic SaaS slop, decorative gradients, or unearned glow effects.
- [ ] Built bundle synced to `docs/` and `assets/`.
