# ARGUS Anti-Slop Directive & Quality Gates (`ARGUS_ANTI_SLOP.md`)

> **Version**: 2.0.0  
> **Status**: Mandatory Production Standard  
> **Target Audience**: All Engineering & Design Agents Contributing to ARGUS

---

## 1. The Anti-Slop Manifesto

"AI-generated UI" has become an identifiable visual pathology characterized by:
- Purple/pink pastel gradients that communicate zero information.
- Floating cards with identical border-radii, identical padding, and identical layouts.
- Neon outer glows, diffuse backdrop blurs, and fake 3D blobs.
- ALL-CAPS tracked-out labels used as substitute for information hierarchy.
- Vague, bloated marketing buzzwords ("Harness the power of autonomous intelligence").

**ARGUS aggressively rejects this aesthetic.**  
ARGUS is engineered like a high-reliability operating console for technical product managers. Every pixel must earn its right to exist.

---

## 2. Forbidden Visual Patterns (Zero-Tolerance List)

Any pull request or code change introducing the following patterns will be rejected:

| Forbidden Pattern | Why It Is Slop | Mandatory ARGUS Alternative |
| :--- | :--- | :--- |
| **Purple/Pink Gradients** (`bg-gradient-to-r from-purple-600 to-pink-600`) | Generic AI template signifier; zero semantic meaning. | Deep obsidian `#050505` with structural 1px `#1D1D1D` borders and `#0066FF` functional accent. |
| **Neon Drop-Shadows & Glows** (`box-shadow: 0 0 40px rgba(99,102,241,0.5)`) | Visual noise that obscures hairline borders and data values. | Clean 1px solid border (`#262626`) with 0px blur or tight `0 1px 2px rgba(0,0,0,0.5)`. |
| **Glassmorphism Everywhere** (`backdrop-blur-xl bg-white/5 border-white/10`) | Low-contrast legibility nightmare that looks like a prototype. | Solid opaque surfaces (`#0A0A0A`, `#111111`) with high contrast text. |
| **Card Monotony (8 Identical Cards)** | Treats every type of information as a rounded rectangle. | Diverse structural primitives: Flush Divided KPI Strips, Tables, Horizontal Timelines, Split Ledgers, Audit Streams. |
| **Unearned ALL-CAPS Copy** (`WELCOME TO THE FUTURE OF AI PM`) | Visual screaming that destroys readability and typographical hierarchy. | Sentence case for headlines, section titles, and body copy. Uppercase strictly reserved for 2-letter codes (`01`, `02`) or status badges (`CRITICAL`, `LIVE`). |
| **Fake Pulsing "LIVE" Dots** | False urgency applied to static mock data. | Factual state tags (`SIMULATION`, `STREAMING`, `CACHED`). Pulsing dot reserved only when real-time WebSocket frames are actively arriving. |
| **Emojis as Feature Icons** (🚀, 💡, 🔮, ✨) | Juvenile aesthetic unsuited for enterprise fintech PMs. | Lucide SVG icons rendered at `14px` or `16px` with precise stroke-widths (`1.5px`–`1.75px`). |
| **Exaggerated Border Radius** (`rounded-3xl`, `rounded-full` buttons) | Consumer toy aesthetic. | Strict radii: `2px`–`4px` for inputs/buttons/tags, `8px` for cards/drawers. |

---

## 3. The 20% Removal Rule

Before marking any UI screen or component complete, apply the **20% Removal Rule**:

1. **Audit Every Border**: If two adjacent sections already have distinct surface shades, remove the dividing border.
2. **Audit Every Badge**: If the status is obvious from the text or table column, remove the colored pill.
3. **Audit Every Helper String**: Delete explanations that tell users what is already obvious (e.g. "Click here to view your signals").
4. **Audit Every Icon**: If an icon does not aid rapid visual scanning in a list of 10+ items, delete it.
5. **Audit Padding**: Tighten loose 32px vertical gaps to structured 16px or 20px rhythm.

---

## 4. Copy Rigor & Technical Specificity

ARGUS copy must sound like an experienced Principal Product Manager collaborating with a Staff Reliability Engineer.

### Copy Replacement Matrix

| Generic Slop Copy | Rigorous Technical ARGUS Copy |
| :--- | :--- |
| "AI is analyzing your product data" | "Correlating 14,200 ClickHouse events across HDFC switch timeout queues" |
| "Boost your conversion rate" | "Mitigate 18.4% checkout drop on secondary UPI payment gateway" |
| "Next-Gen AI Roadmap" | "Quarterly Roadmap & Dependency Matrix · Q1-Q2 Execution Pipeline" |
| "Smart Insights & Recommendations" | "Bayesian Causal Attribution: 94% confidence linked to HDFC gateway 504 errors" |
| "Seamless Collaboration" | "Export Gherkin acceptance criteria to Linear & Jira backlog" |

---

## 5. The 10-Point Distinctiveness Scorecard

Every major surface in ARGUS must score at least **9 / 10** against this audit:

- [x] **1. Palette Purity**: Does the page rely on `#050505` canvas, `#0A0A0A` surface, and `#0066FF` functional blue without rogue pastels?
- [x] **2. Card Diversity**: Are there fewer than 4 identical card containers visible in the primary viewport?
- [x] **3. Data Realism**: Are all metrics formatted with concrete units (`14.2k txns`, `142ms P99`, `₹4.2Cr GMV`)?
- [x] **4. Interaction Readiness**: Does clicking any signal or opportunity trigger an immediate, useful response (drawer slide-out or tab navigation)?
- [x] **5. Focus Ring Discipline**: Are keyboard navigation focus rings clean, subtle (`rgba(0,102,255,0.3)`), and non-blurry?
- [x] **6. Motion Purpose**: Does every animation represent state change, causal flow, or data ingestion rather than passive decoration?
- [x] **7. Typographical Tension**: Is there an intentional rhythm between Space Grotesk display headers, Inter body, and JetBrains Mono tabular figures?
- [x] **8. Information Density**: Is the screen capable of showing 10+ actionable data points without requiring scrolling?
- [x] **9. Context Preservation**: Can the user inspect deep anomaly evidence without losing their place on the dashboard?
- [x] **10. Zero Marketing Noise**: Does the page respect the PM's intelligence by omitting empty promotional fluff?
