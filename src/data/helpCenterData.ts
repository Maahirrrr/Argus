export interface HelpArticle {
  id: string;
  category: 'Getting Started' | 'Discovery & Signals' | 'Prioritization & RICE' | 'PRD & Specs' | 'AI Product Lab' | 'Experiments & Chaos';
  title: string;
  summary: string;
  content: string;
}

export const HELP_ARTICLES: HelpArticle[] = [
  {
    id: 'help-01',
    category: 'Getting Started',
    title: 'The Argus Product Lifecycle Loop',
    summary: 'How signals transform into causal insights, prioritized roadmaps, PRDs, and experiments.',
    content: 'Argus connects fragmented PM workflows into a unified flywheel: Raw Signals · Causal Insights · Opportunity Solution Trees · Dynamic RICE Prioritization · PRD with BDD Scenarios · Prototype Lab · A/B Experiments · Product Analytics · Permanent Decision Records.',
  },
  {
    id: 'help-02',
    category: 'Discovery & Signals',
    title: 'Signals vs Insights vs Opportunities',
    summary: 'Understanding the Argus epistemological hierarchy.',
    content: '• Signal: Telemetry anomaly or customer feedback spike (e.g. UPI success rate down 4.1%).\n• Insight: Bayesian root-cause attribution explaining why the signal occurred (e.g. HDFC bank node timeouts accounting for 74% of lost volume).\n• Opportunity: Concrete product problem ready for prioritization (e.g. Opportunity #014: Dynamic Multi-Bank Gateway Routing).',
  },
  {
    id: 'help-03',
    category: 'Prioritization & RICE',
    title: 'Dynamic Sensitivity Simulation & RICE Tuning',
    summary: 'How to use real-time sliders to stress-test roadmap trade-offs.',
    content: 'The Prioritization Workbench dynamically calculates RICE = (Reach × Impact × Confidence) / Effort. Use the interactive sliders to run optimistic and pessimistic sensitivity models, inspect causal trade-off explanations, and trigger the split-screen Adversarial Challenge Modal.',
  },
  {
    id: 'help-04',
    category: 'PRD & Specs',
    title: 'Adversarial AI Critic & Version Diff Inspector',
    summary: 'Hardening engineering specs against race conditions and edge cases.',
    content: 'Argus subjects your draft PRD to an adversarial AI critic that acts as a principal security architect. The AI Version Diff Inspector highlights vulnerabilities caught by the critic (such as missing distributed idempotency locks or unhandled bank timeouts) and presents color-coded side-by-side spec hardening diffs.',
  },
  {
    id: 'help-05',
    category: 'AI Product Lab',
    title: 'LLM Evaluation Rubric & Model Benchmarking for AI PMs',
    summary: 'Managing prompt versions, latency, cost per 1k tokens, and hallucination rates.',
    content: 'The AI Product Lab gives AI PMs an institutional workspace to compare Claude 3.5 Sonnet, GPT-4o, Gemini 1.5 Pro, and Llama 3 across latency, cost, and accuracy. You can version prompts, manage system prompts, run automated batch test datasets, and set human review fallbacks.',
  },
  {
    id: 'help-06',
    category: 'Experiments & Chaos',
    title: 'Real-Time Payment Chaos Simulator & Guardrails',
    summary: 'Simulating bank gateway outages and salvaging GMV with circuit breaker failovers.',
    content: 'Test product resilience by injecting real-world bank failures (HDFC latency spikes, Android 15 auth crashes, NPCI switch throttles). Watch the ticking GMV loss meter, deploy 1-click autonomous failovers, and auto-generate incident post-mortem PRDs.',
  },
];
