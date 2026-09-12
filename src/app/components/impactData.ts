export type ImpactCategory =
  | "accuracy"
  | "scale"
  | "systems"
  | "research"
  | "efficiency"
  | "reliability"
  | "stack";

export const CATEGORY_META: Record<
  ImpactCategory,
  { label: string; color: string }
> = {
  accuracy: { label: "Accuracy & Quality", color: "#eab308" }, // yellow/gold
  scale: { label: "Scale & Performance", color: "#22d3ee" }, // cyan
  systems: { label: "Systems Breadth", color: "#2dd4bf" }, // teal
  research: { label: "Research & Validation", color: "#f59e0b" }, // amber/gold
  efficiency: { label: "Efficiency & Optimization", color: "#10b981" }, // green
  reliability: { label: "Reliability & Ops", color: "#a78bfa" }, // violet
  stack: { label: "Stack & Languages", color: "#60a5fa" }, // blue
};

export const CATEGORY_ORDER: ImpactCategory[] = [
  "accuracy",
  "scale",
  "systems",
  "research",
  "efficiency",
  "reliability",
  "stack",
];

export type Impact = {
  value: string; // visible text beside node (number / compact metric / 1-2 words)
  title: string; // title in hover tooltip
  description: string; // 1-2 line explanation
  project: string; // which project it comes from
  category: ImpactCategory;
  magnitude: 1 | 2 | 3 | 4 | 5;
  href?: string; // route / link if available
};

export const impacts: Impact[] = [
  // ── 1. ACCURACY & QUALITY (4 nodes) ──
  {
    value: "73.3%",
    title: "AgentEval Root-Cause Accuracy",
    description: "73.3% accuracy on an internal 45-case benchmark for identifying likely failure sources in agent workflows.",
    project: "AgentEval",
    category: "accuracy",
    magnitude: 5,
    href: "/projects/agenteval-failure-diagnosis",
  },
  {
    value: "76.2%",
    title: "Balanced Accuracy",
    description: "AgentEval achieved 76.2% balanced accuracy on its internal causal failure-diagnosis benchmark.",
    project: "AgentEval",
    category: "accuracy",
    magnitude: 4,
    href: "/projects/agenteval-failure-diagnosis",
  },
  {
    value: "~6.8 MAE",
    title: "Retinal Age Prediction",
    description: "RETFound-based retinal age models reached approximately the high-6-year MAE range on retinal age estimation.",
    project: "Retinal Age Gap",
    category: "accuracy",
    magnitude: 5,
    href: "/projects/explainable-retinal-age-gap-prediction",
  },
  {
    value: "97.83%",
    title: "MNIST Accuracy",
    description: "Gradient Coherence Optimizer achieved 97.83% test accuracy on the MNIST neural-network benchmark.",
    project: "Gradient Coherence Optimizer",
    category: "accuracy",
    magnitude: 4,
    href: "/projects/gco-optimizer",
  },

  // ── 2. SCALE & PERFORMANCE (4 nodes) ──
  {
    value: "23K+",
    title: "Retinal Imaging Scale",
    description: "Experiments were conducted across more than 23,000 retinal fundus images from BRSET and ODIR-5K.",
    project: "Retinal Age Gap",
    category: "scale",
    magnitude: 5,
    href: "/projects/explainable-retinal-age-gap-prediction",
  },
  {
    value: "8,250",
    title: "Rosenbrock Convergence",
    description: "GCO reached the target tolerance on the Rosenbrock benchmark in approximately 8,250 iterations.",
    project: "Gradient Coherence Optimizer",
    category: "scale",
    magnitude: 4,
    href: "/projects/gco-optimizer",
  },
  {
    value: "45 cases",
    title: "Internal Failure Benchmark",
    description: "AgentEval was validated on a 45-case benchmark for root-cause failure attribution.",
    project: "AgentEval",
    category: "scale",
    magnitude: 4,
    href: "/projects/agenteval-failure-diagnosis",
  },
  {
    value: "Real-time",
    title: "Real-Time Interview Pipeline",
    description: "Veriq runs an adaptive interview workflow with real-time conversation handling and WebSocket-based interaction.",
    project: "Veriq",
    category: "scale",
    magnitude: 5,
    href: "/projects/veriq-ai-interview-platform",
  },

  // ── 3. SYSTEMS BREADTH (5 nodes) ──
  {
    value: "5 modes",
    title: "Interview Modes",
    description: "Veriq supports five interview modes: Role, Resume, JD, Resume+JD, and Company Style.",
    project: "Veriq",
    category: "systems",
    magnitude: 4,
    href: "/projects/veriq-ai-interview-platform",
  },
  {
    value: "8 metrics",
    title: "Dynamic Evaluation Metrics",
    description: "AgentEval can map workflow nodes to executable evaluators such as instruction following, semantic quality, groundedness, retrieval evidence, tool selection, JSON validity, latency, and cost/tokens.",
    project: "AgentEval",
    category: "systems",
    magnitude: 5,
    href: "/projects/agenteval-failure-diagnosis",
  },
  {
    value: "Multi-Agent",
    title: "Multi-Agent Systems",
    description: "Built and evaluated multi-agent workflows across interview intelligence, conversational assistants, and agent failure diagnosis.",
    project: "Veriq, Multi-Agent Assistant, AgentEval",
    category: "systems",
    magnitude: 5,
    href: "/projects/agenteval-failure-diagnosis",
  },
  {
    value: "RAG",
    title: "Retrieval-Augmented Generation",
    description: "Implemented retrieval pipelines using FAISS, semantic search, hybrid retrieval strategies, and agent routing.",
    project: "Multi-Agent Conversational Assistant",
    category: "systems",
    magnitude: 4,
    href: "/projects/veriq-ai-interview-platform",
  },
  {
    value: "Voice AI",
    title: "Real-Time Voice Intelligence",
    description: "Veriq combines speech-to-text, text-to-speech, adaptive questioning, and real-time interview state management.",
    project: "Veriq",
    category: "systems",
    magnitude: 5,
    href: "/projects/veriq-ai-interview-platform",
  },

  // ── 4. RESEARCH & VALIDATION (5 nodes) ──
  {
    value: "RETFound",
    title: "Retinal Foundation Model",
    description: "Used RETFound, a retinal Vision Transformer foundation model, for retinal age prediction and transfer learning.",
    project: "Retinal Age Gap",
    category: "research",
    magnitude: 5,
    href: "/projects/explainable-retinal-age-gap-prediction",
  },
  {
    value: "Grad-CAM",
    title: "Visual Explainability",
    description: "Used Grad-CAM to inspect which retinal image regions contributed to age predictions.",
    project: "Retinal Age Gap",
    category: "research",
    magnitude: 4,
    href: "/projects/explainable-retinal-age-gap-prediction",
  },
  {
    value: "SHAP",
    title: "Biomarker Explainability",
    description: "Applied SHAP to analyze the influence of vascular biomarkers such as density, tortuosity, branching, fractal dimension, length, and thickness.",
    project: "Retinal Age Gap",
    category: "research",
    magnitude: 5,
    href: "/projects/explainable-retinal-age-gap-prediction",
  },
  {
    value: "GCO",
    title: "Custom Optimizer",
    description: "Designed and implemented Gradient Coherence Optimizer, an Adam-style optimizer that modulates step size using gradient–momentum alignment.",
    project: "Gradient Coherence Optimizer",
    category: "research",
    magnitude: 5,
    href: "/projects/gco-optimizer",
  },
  {
    value: "Who&When",
    title: "External Benchmark",
    description: "AgentEval was tested on the external Who&When failure-attribution benchmark.",
    project: "AgentEval",
    category: "research",
    magnitude: 4,
    href: "/projects/agenteval-failure-diagnosis",
  },

  // ── 5. EFFICIENCY & OPTIMIZATION (4 nodes) ──
  {
    value: "25% ↓",
    title: "Fewer Iterations vs Adam",
    description: "GCO required approximately 25% fewer iterations than Adam on the tested ill-conditioned quadratic benchmark.",
    project: "Gradient Coherence Optimizer",
    category: "efficiency",
    magnitude: 5,
    href: "/projects/gco-optimizer",
  },
  {
    value: "2–4 turns",
    title: "Context Optimization",
    description: "Veriq uses a compact recent-turn context window to reduce prompt size while preserving relevant interview state.",
    project: "Veriq",
    category: "efficiency",
    magnitude: 4,
    href: "/projects/veriq-ai-interview-platform",
  },
  {
    value: "Cached",
    title: "Deterministic Profile Caching",
    description: "AgentEval caches inferred workflow/node profiles using deterministic signatures to avoid repeated LLM profiling cost.",
    project: "AgentEval",
    category: "efficiency",
    magnitude: 4,
    href: "/projects/agenteval-failure-diagnosis",
  },
  {
    value: "Linear Probe",
    title: "Efficient Transfer Learning",
    description: "RETFound was evaluated using linear probing, keeping the encoder frozen while training only the regression head.",
    project: "Retinal Age Gap",
    category: "efficiency",
    magnitude: 4,
    href: "/projects/explainable-retinal-age-gap-prediction",
  },

  // ── 6. RELIABILITY & OPS (5 nodes) ──
  {
    value: "PostgreSQL",
    title: "Production Trace Storage",
    description: "AgentEval and Veriq use PostgreSQL-backed storage for persistent production data and analytics.",
    project: "AgentEval / Veriq",
    category: "reliability",
    magnitude: 5,
    href: "/projects/veriq-ai-interview-platform",
  },
  {
    value: "Hashed Keys",
    title: "Secure API Authentication",
    description: "AgentEval stores API keys as SHA-256 hashes rather than plaintext credentials.",
    project: "AgentEval",
    category: "reliability",
    magnitude: 4,
    href: "/projects/agenteval-failure-diagnosis",
  },
  {
    value: "Fallback",
    title: "Graceful Profiling Fallback",
    description: "AgentEval falls back to heuristic classification and default metrics when LLM profiling is unavailable.",
    project: "AgentEval",
    category: "reliability",
    magnitude: 4,
    href: "/projects/agenteval-failure-diagnosis",
  },
  {
    value: "Structured Logs",
    title: "Observability",
    description: "Veriq uses structured logging for interview-state transitions, latency tracking, evaluation behavior, and debugging.",
    project: "Veriq",
    category: "reliability",
    magnitude: 4,
    href: "/projects/veriq-ai-interview-platform",
  },
  {
    value: "WebSockets",
    title: "Real-Time Transport",
    description: "Veriq uses WebSockets to support low-latency interactive interview sessions.",
    project: "Veriq",
    category: "reliability",
    magnitude: 5,
    href: "/projects/veriq-ai-interview-platform",
  },

  // ── 7. STACK & LANGUAGES (5 nodes) ──
  {
    value: "Python",
    title: "Python",
    description: "Primary language used across AI/ML, agent systems, backend services, optimization, and data pipelines.",
    project: "Core Language",
    category: "stack",
    magnitude: 5,
    href: "#skills",
  },
  {
    value: "C++",
    title: "C++",
    description: "Used for algorithmic problem solving, systems coursework, and performance-oriented programming.",
    project: "Systems & Algorithms",
    category: "stack",
    magnitude: 4,
    href: "#skills",
  },
  {
    value: "SQL",
    title: "SQL",
    description: "Used across PostgreSQL-backed analytics, tracing, application storage, and data workflows.",
    project: "Database & Tracing",
    category: "stack",
    magnitude: 4,
    href: "#skills",
  },
  {
    value: "PyTorch",
    title: "PyTorch",
    description: "Used for custom optimizer development, retinal deep learning, CNNs, Vision Transformers, and experimentation.",
    project: "Deep Learning & GCO",
    category: "stack",
    magnitude: 5,
    href: "/projects/gco-optimizer",
  },
  {
    value: "FastAPI",
    title: "FastAPI",
    description: "Backend framework used for production AI APIs, agent ingestion, interview systems, and evaluation infrastructure.",
    project: "API Infrastructure",
    category: "stack",
    magnitude: 5,
    href: "/projects/agenteval-failure-diagnosis",
  },
];
