export interface CaseStudyData {
  title: string;
  role: string;
  timeline: string;
  problem: string;
  userResearch: {
    persona: string;
    quote: string;
    painPoint: string;
  }[];
  productHypothesis: string;
  solutionArchitecture: {
    layer: string;
    purpose: string;
    technologies: string;
  }[];
  keyProductDecisions: {
    decision: string;
    rationale: string;
    tradeoff: string;
  }[];
  metricsAndImpact: {
    metric: string;
    result: string;
    context: string;
  }[];
  futureRoadmap: string[];
}

export const PORTFOLIO_CASE_STUDY: CaseStudyData = {
  title: 'FinPilot: Designing an AI Operating System for Fintech PMs',
  role: 'AI Product Manager & Product Designer',
  timeline: '6-Week Concept to Working Institutional Prototype',
  problem: 'Fintech product managers drown in disparate data streams: ClickHouse event logs, core banking gateway webhooks, Zendesk dispute tickets, and volatile failure codes (U30, U69). When checkout success drops by 4%, PMs spend 3–4 days manually correlating logs with engineering before drafting a spec. By the time a PRD is approved, millions in GMV have bled out.',
  userResearch: [
    {
      persona: 'Senior Fintech PM (Payments & Acquiring)',
      quote: '"I have dashboards everywhere, but when failure rates spike on a Friday night, I have no way of knowing whether it is a UI bug, a bank switch failure, or an NPCI network choke without begging data engineering for SQL queries."',
      painPoint: 'Data silos between analytics, support, and payment routing.',
    },
    {
      persona: 'Engineering Lead (Core Banking Platform)',
      quote: '"PMs frequently ask us to rewrite checkout UI components when the real culprit is a 30-second timeout on a specific partner bank node. We waste sprints solving the wrong symptom."',
      painPoint: 'Misdiagnosed root causes leading to misallocated engineering sprints.',
    },
  ],
  productHypothesis: 'By combining telemetry anomaly detection, causal decomposition, dynamic RICE sensitivity modeling, and an AI Critic that challenges PRD assumptions, we can reduce the time from product anomaly detection to verified engineering PRD from 4 days to under 15 minutes.',
  solutionArchitecture: [
    {
      layer: '1. Ingestion & Sentry',
      purpose: 'Streams ClickHouse transaction logs, NPCI status webhooks, and Zendesk tickets in real time.',
      technologies: 'Kafka, ClickHouse, Webhook Gateway',
    },
    {
      layer: '2. Causal Intelligence Agent',
      purpose: 'Decomposes metric anomalies by bank, OS, ticket size, and time window with confidence scoring.',
      technologies: 'Python, Statistical Decomposition, Claude 3.5 Sonnet / Gemini Pro',
    },
    {
      layer: '3. Dynamic Sensitivity Workbench',
      purpose: 'Enables PMs to test roadmap trade-offs with live sliders and natural language trade-off explanations.',
      technologies: 'Deterministic RICE / ICE Engine, Sensitivity Simulator',
    },
    {
      layer: '4. PRD & Critic Agent',
      purpose: 'Drafts engineering-ready PRDs with Gherkin user stories, then acts as an adversarial critic challenging assumptions.',
      technologies: 'Structured LLM Output, Gherkin BDD Engine, Guardrail Rules',
    },
    {
      layer: '5. Experiment Lab',
      purpose: 'Calculates statistical sample sizes, MDE, and enforces automated circuit-breaker guardrails.',
      technologies: 'Statsig / LaunchDarkly SDK, Two-Sample Z-Test Engine',
    },
  ],
  keyProductDecisions: [
    {
      decision: 'Prioritization Engine as the Centerpiece (not just another PRD generator)',
      rationale: 'Generative AI that blindly writes PRDs adds noise. A PM’s core job is deciding what NOT to build. The Decision Simulator empowers thoughtful trade-off analysis.',
      tradeoff: 'Required developing a deterministic sensitivity calculation model instead of simply prompting an LLM.',
    },
    {
      decision: 'Adding the "Challenge My PRD" Critic Feature',
      rationale: 'PMs need an AI that acts as a skeptical staff PM questioning assumptions, not a sycophantic yes-machine.',
      tradeoff: 'Added an adversarial prompt pipeline that flags missing edge cases (e.g. device timeouts, cellular volatility).',
    },
    {
      decision: 'Strictly "Human in the Loop" for all Financial Decisions',
      rationale: 'In regulated fintech, autonomous deployment of routing rules without human sign-off creates severe compliance risks.',
      tradeoff: 'Eliminated autonomous auto-shipping in favor of structured "AI suggested, PM approved" workflow.',
    },
  ],
  metricsAndImpact: [
    { metric: 'Time from Anomaly to PRD', result: '93% reduction', context: 'From 3.5 days of cross-functional investigation to 12 minutes of verified analysis.' },
    { metric: 'Sprint Allocation Accuracy', result: '+38% expected ROI', context: 'Prioritization based on empirical GMV loss rather than subjective intuition.' },
    { metric: 'Edge Case Coverage in PRDs', result: '4.2× increase', context: 'The PRD Critic consistently surfaces device, OS, and network variables that PMs overlook.' },
  ],
  futureRoadmap: [
    'Direct integration with LaunchDarkly and Statsig for automated circuit breaker rollbacks.',
    'Multi-country regulatory compliance checks (RBI, MAS, FCA) embedded directly in PRD generation.',
    'Real-time synthetic transaction load simulation to test failover routing before A/B deployment.',
  ],
};
