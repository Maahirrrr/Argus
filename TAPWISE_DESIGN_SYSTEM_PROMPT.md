# APPLY THE TAPWISE UI/UX DESIGN SYSTEM TO THIS PROJECT

> **Reference Website:** [https://maahirrrr.github.io/TapWise/](https://maahirrrr.github.io/TapWise/)  
> **Source Repository Reference:** `tapwise` (Desktop/tapwise)  
> **Target Audience:** Any codebase, application, or web tool undergoing design transformation.

---

```markdown
APPLY THE TAPWISE UI/UX DESIGN SYSTEM TO THIS PROJECT
You are a senior product designer, creative frontend engineer, interaction designer, and design-system architect.
I have an existing project that already has its own functionality, pages, components, logic, and features.
I want you to completely transform the visual design and UX layer of this project so that it uses the same visual language, design philosophy, typography, colors, loading experience, spacing, component styling, animations, transitions, and interaction quality as my TapWise website.

REFERENCE WEBSITE:
https://maahirrrr.github.io/TapWise/

IMPORTANT:
The TapWise website is the visual reference.
Do NOT redesign TapWise.
Do NOT copy the content or product functionality of TapWise.
Do NOT copy TapWise's fintech-specific UI.
Instead:
EXTRACT THE VISUAL DESIGN LANGUAGE OF TAPWISE
and apply that language to THIS PROJECT.
The current project's:
functionality
business logic
features
data
routes
workflows
APIs
existing functionality
must remain intact unless a change is required purely for UX consistency.

CORE GOAL
Make this project feel like it belongs to the exact same product family as TapWise.
If TapWise were a design system, this project should look like another flagship product built using that same system.
The user should immediately feel:
"This has the same design DNA as TapWise."
Not:
"This is a different website that happens to use dark mode."

ABSOLUTE DESIGN PRINCIPLE
DO NOT APPROXIMATE THE STYLE.
Do not interpret this as:
"Make it a dark modern website."
That is NOT enough.
Analyze the TapWise reference carefully and reproduce its visual characteristics:
color relationships
background tones
typography
font weights
font sizing
letter spacing
border treatment
card treatment
button treatment
spacing
page margins
navigation
loading animation
entrance animation
hover behavior
transition timing
panel hierarchy
visual density
content hierarchy
icon treatment
chart treatment
modal treatment
dropdown treatment
responsive behavior
overall visual rhythm

The goal is:
SAME DESIGN LANGUAGE
not:
SIMILAR DARK THEME.

STEP 1 — STUDY THE TAPWISE REFERENCE
Before modifying the project, inspect:
https://maahirrrr.github.io/TapWise/
Study the interface visually.
Analyze:
COLOR
Determine:
primary background
secondary background
elevated background
card background
border color
primary text
secondary text
muted text
accent color
success
warning
error
hover states
active states
disabled states
Do not blindly invent a new palette.
The TapWise palette should be the source of truth.
Create design tokens from it.
Example structure:
:root {
  --background: #050505;
  --surface: #0A0A0A;
  --surface-panel: #101010;
  --surface-elevated: #141414;
  --border: #1D1D1D;
  --border-hover: #2E2E2E;
  --border-focus: #3A3A3A;
  --text-primary: #F5F5F0;
  --text-secondary: #8A8A8A;
  --text-muted: #525252;
  --text-ghost: #262626;
  --accent: #0066FF;
  --accent-hover: #1A75FF;
  --accent-subtle: rgba(0, 102, 255, 0.1);
  --accent-border: rgba(0, 102, 255, 0.3);
  --success: #10B981;
  --warning: #F59E0B;
  --danger: #EF4444;
}
Use the actual visual relationships observed in TapWise.

STEP 2 — TYPOGRAPHY
Typography is one of the most important parts of this transformation.
Reproduce the TapWise typography hierarchy.
Analyze:
font family
font fallback
font weight
font size
line height
letter spacing
uppercase usage
heading proportions
paragraph width
metadata sizing
button typography
navigation typography
numerical typography

The typography should feel:
clean
technical
premium
modern
minimal
confident

Do NOT use:
futuristic display fonts
gaming fonts
decorative fonts
unnecessary serif fonts
excessive font weights

TYPOGRAPHIC HIERARCHY
Create a complete type scale:
Display: 'Inter', 'Space Grotesk', -apple-system, sans-serif (tracking: -0.025em)
Editorial: 'Syne', sans-serif (tracking: -0.04em, line-height: 0.95)
Body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
Technical / Numerics: 'JetBrains Mono', monospace (font-feature-settings: 'tnum' 1, 'zero' 1)

Headings:
Tight line-height, calculated negative space, strong hierarchy.
Reserved for hero sections and major section introductions.

Body:
Compact, readable, high contrast, controlled max-width. Never giant runaway paragraphs.

Numbers:
Strong numerical typography with tabular numbers ('tnum') and monospace precision.

STEP 3 — BACKGROUND
The background is fundamental.
Do not use a generic #000000 everywhere.
Create subtle layers:
BODY: #050505 (Primary deepest base)
SECTION: #0A0A0A (Secondary background)
SURFACE / CARD: #101010 (Panel surface)
ELEVATED SURFACE: #141414 (Floating/Modal surface)
INTERACTIVE SURFACE: #181818 (Hover/Active surface)

The differences should be subtle.
The interface should feel dimensional without relying on:
huge shadows
glassmorphism
blur
gradients
glowing cards

NO GENERIC AI AESTHETIC
Absolutely avoid:
purple-blue gradients
AI sparkles
neon glows
excessive glassmorphism
floating holograms
random particles
3D blobs
rainbow gradients
giant blurred circles
"AI" decorative graphics
generic futuristic backgrounds
The TapWise aesthetic works because it is restrained.
Keep that restraint.

STEP 4 — SPACING SYSTEM
Extract the spacing rhythm from TapWise.
Tokens: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px, 96px, 128px.
Use the system consistently.
Desktop content should not touch the viewport edges (max-width: 1280px / 1440px with generous side margins).
Sections should have deliberate rhythm with large whitespace and content grouping.

STEP 5 — BORDERS
Use the TapWise border philosophy:
subtle
thin (1px)
low contrast (#1D1D1D)
functional
consistent
Avoid thick white borders, bright neon borders, and heavy outlines.
Use borders primarily to communicate separation, interaction (#2E2E2E), focus (#3A3A3A or 1.5px #0066FF), and hierarchy.

STEP 6 — CARDS
Transform all existing cards to the TapWise visual language:
quiet
premium
structured
minimal
information-focused
Structure: small uppercase metadata -> strong title -> supporting information -> primary info -> optional action.
Radius: restrained (2px to 6px, max 8px). Zero pill-shaped slop.
Hover: border shifts subtly (#1D1D1D -> #2E2E2E), surface shifts subtly (#101010 -> #141414), subtle 1-2px shift. No dramatic scaling, no giant glows.

STEP 7 — BUTTON SYSTEM
Standardize: Primary, Secondary, Ghost, Text, Icon, Destructive, Small, Large.
Primary: High contrast (#F5F5F0 on #050505 or #0066FF on white), crisp 3px-4px radius, fast feedback.
Secondary: Surface #101010, border #1D1D1D, text #F5F5F0.
Animations: Fast (150-200ms) with smooth easing cubic-bezier(0.16, 1, 0.3, 1). Avoid bouncy or sluggish motion.

STEP 8 — NAVIGATION
Minimal, quiet, structured, premium.
Active state uses subtle background shift (rgba(255,255,255,0.04)), crisp contrast, or subtle indicator line. No giant colored pills. Transitions: 150-200ms.

STEP 9 — TOP BAR
Small height (48px-56px), clean alignment, minimal controls, subtle bottom border (#1D1D1D), uncluttered header.

STEP 10 — LOADING EXPERIENCE
Create the branded initializing sequence:
Phase 1: Deep #050505 background.
Phase 2: Wordmark subtly appears with tracking (0.25em).
Phase 3: Subsystem metadata (e.g., 'INITIALIZING CORE / 001' in JetBrains Mono).
Phase 4: Ultra-thin 1px horizontal progress bar with numeric percentage readout.
Phase 5: Seamless exit transition (opacity: 0, scale: 0.98) blending directly into the app.
Keep duration concise (~1.0-1.4s). Never fake an agonizingly long delay.

STEP 11 — PAGE TRANSITIONS
Fast, smooth, intentional, quiet. Opacity and subtle translate (y: 6-8px -> 0px), 200-300ms, easing [0.16, 1, 0.3, 1].

STEP 12 — MICROINTERACTIONS
Every interactive element has subtle states: hover, focus, active, disabled, loading, success, error.
Subtle 1-2px micro-movement, hairline border shifts, zero 3D bouncing or bloated glow.

STEP 13 — INPUTS
Dark surface (#0A0A0A / #101010), subtle border (#1D1D1D), crisp text (#F5F5F0), muted placeholder (#525252).
Focus: 1.5px crisp ring (#0066FF), no giant blurry shadows.

STEP 14 — DROPDOWNS
Dark elevated surface (#141414), subtle border (#1D1D1D), 4px radius, smooth instant entrance, full keyboard navigation.

STEP 15 — MODALS
Elevated surface (#141414), hairline border (#2E2E2E), dimmed backdrop, strong title hierarchy, clear primary/secondary actions. Prefer contextual drawers or inline panels when appropriate.

STEP 16 — TOOLTIPS
11px mono/sans, tight padding, border #2E2E2E, high contrast, reserved for technical metrics or abbreviations.

STEP 17 — ICONOGRAPHY
One icon family (Lucide icons), thin stroke (1.5px to 1.75px), consistent size hierarchy (14px, 16px, 18px, 20px).

STEP 18 — TABLES
Dense, clean, technical, premium. Subtle separators (#1D1D1D), compact tabular mono typography, hover row highlights.

STEP 19 — DATA VISUALIZATION
Restrained color palette (accent blue #0066FF, emerald #10B981, amber #F59E0B, crimson #EF4444). Thin lines, subtle grid lines, clean axes, animated line/bar entrance.

STEP 20 — DASHBOARD DESIGN
Strong information hierarchy: primary insight -> key telemetry -> supporting context -> recent activity feed.

STEP 21 — HERO SECTIONS
Large typography, strong negative space, minimal supporting text, one clear primary CTA and one secondary CTA.

STEP 22 — SCROLL EXPERIENCE
Smooth, natural, controlled. Subtle viewport entrance reveal for content blocks.

STEP 23 & 24 — RESPONSIVE DESIGN & TYPOGRAPHY
Fully responsive across 1440px, 1280px, 1024px, 768px, 430px, 375px. Desktop sidebars collapse gracefully into clean slide-over drawers or bottom menus. Typographic scale scales down gracefully without awkward overflows.

STEP 25 & 26 — DARK & LIGHT MODES
Dark mode is the primary default. If light mode is supported, maintain identical surface layering, border discipline, and contrast rules.

STEP 27 & 28 — MOTION SYSTEM & REDUCED MOTION
Fast (150-200ms), Normal (200-300ms), Slow (300-450ms). Full respect for prefers-reduced-motion.

STEP 29 & 30 — SCROLLBAR & SELECTION
Minimal thin scrollbar (4px-6px, #262626 thumb on #050505 track). Selection: #0066FF bg with #FFFFFF text.

STEP 31 — CURSOR
Subtle desktop-only cursor touches. Disabled on touch and reduced-motion.

STEP 32 — NOTIFICATIONS / TOASTS
Quiet dark floating toasts with hairline borders and status indicator badges.

STEP 33, 34, 35 — EMPTY, ERROR & SUCCESS STATES
Minimal mono icons, crisp concise technical explanation, clear recovery action.

STEP 36 — DESIGN TOKENS
Centralized CSS custom properties in :root for colors, typography, spacing, radius, shadows, and motion.

STEP 37 & 38 — COMPONENT SYSTEM & CONSISTENCY
Standardized reusable components: Button, Input, Card, Modal, Dropdown, Table, Navigation, Toast, Loader.

STEP 39 & 40 — LOADING SKELETONS & PAGE TRANSITIONS
Standardized shimmer skeletons (#101010 with #181818 shimmer) and unified transitions.

STEP 41 & 42 — PERFORMANCE & ACCESSIBILITY
Zero bloat, pure CSS/Motion, full keyboard navigation (:focus-visible), ARIA compliant, AAA/AA contrast.

STEP 43 & 44 — PRESERVE EXISTING FUNCTIONALITY & DATA SEPARATION
Never break existing business logic, routing, features, or APIs. Elevate presentation while keeping logic intact.

STEP 45 — BRAND IDENTITY INTEGRITY
Retain the project's own name, domain context, copy, and purpose. Do NOT rename the project to TapWise. Do NOT insert fintech terminology into non-fintech applications.

STEP 46 — VISUAL PERSONALITY
Intelligence, precision, calmness, technical sophistication, trust, speed, clarity, restraint, premium quality.

STEP 47 — WHAT TO COPY VS WHAT NOT TO COPY
Copy: Design language, dark surfaces, typography hierarchy, spacing rhythm, border treatment, loading experience, motion philosophy.
Do NOT Copy: TapWise product features, text copy, fintech logic, branding name, unrelated data models.

STEP 48, 49 & 50 — VISUAL QA, SCREENSHOT AUDIT & FINAL POLISH
Test across viewports (1440px to 375px). Eliminate visual clutter, excessive animations, random colors, and generic AI slop.
Ensure the final application feels like an intentional, expensive, flagship product from the TapWise design studio.
```
