import { m } from "motion/react";
import { useState } from "react";
import {
  useIsMobile,
  useIsTablet,
  useIsDesktop,
} from "../../hooks/useMediaQuery";
import { useEqualRows } from "../../hooks/useCollageGrid";
import { EqualGridRenderer } from "./CollageRenderer";
import { researchItems, ResearchCard } from "./Research";

const FONT_SERIF = '"Playfair Display", Georgia, serif';
const FONT_MONO = '"DM Mono", monospace';
const FONT_SANS = '"DM Sans", sans-serif';

export type Project = {
  index: string;
  slug: string;
  title: string;
  company: string;
  logo: string;
  logoHeight: number;
  status: string;
  devStatus?: string;
  tags: string[];
  impact: string;
  summary: [string, string, string, string];
  bullets: string[];
  github: string | null;
  dashboardImage?: string;
  keyMetrics?: Array<{ label: string; val: string }>;
};

export function renderBullet(text: string): React.ReactNode {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} style={{ color: "#e8e0d0", fontWeight: 600 }}>
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

export const projects: Project[] = [
  {
    index: "01",
    slug: "veriq-ai-interview-platform",
    title: "Veriq - AI Interview Platform",
    company: "Personal / Plaksha",
    logo: "/logos/github.svg",
    logoHeight: 18,
    status: "Completed",
    devStatus: "completed",
    dashboardImage: "/dashboards/veriq.png",
    keyMetrics: [
      { label: "Voice Latency", val: "<250ms" },
      { label: "Verification Acc", val: "94.8%" },
      { label: "State Graph", val: "LangGraph" },
      { label: "Factual Grounding", val: "Semantic RAG" },
    ],
    tags: [
      "LangGraph",
      "LLM Agents",
      "FastAPI",
      "Gemini API",
      "PostgreSQL",
      "Semantic RAG",
      "Real-Time Voice",
    ],
    impact:
      "Developed an AI-powered interview platform using LangGraph agents for adaptive questioning, multi-turn claim verification, and low-latency voice interaction.",
    summary: [
      "Developed an **AI-powered interview platform** using LangGraph and **LLM agents** for **adaptive questioning**, **evidence-based candidate evaluation**, and recruiter analytics.",
      "Built an **LLM-based reasoning engine** verifying project claims through **multi-turn evidence collection** across architecture, debugging, scalability, and system design.",
      "Implemented **semantic retrieval**, **RAG**, context-aware prompt optimization, and persistent memory to improve **factual grounding** and long-horizon reasoning.",
      "Integrated **real-time voice interaction**, personalized feedback generation, and low-latency production deployment for AI-driven interviews.",
    ],
    bullets: [
      "Developed an **AI-powered interview platform** using LangGraph and **LLM agents** for **adaptive questioning**, **evidence-based candidate evaluation**, and structured recruiter insights.",
      "Built an **LLM-based reasoning engine** capable of verifying project claims through **multi-turn evidence collection** and competency evaluation across architecture, implementation, debugging, scalability, and system design.",
      "Implemented **semantic retrieval**, **retrieval-augmented generation (RAG)**, context-aware prompt optimization, and persistent conversation memory to improve **factual grounding** and long-horizon reasoning.",
      "Integrated **real-time voice interaction**, personalized feedback generation, recruiter analytics, and **production deployment** for AI-driven interviews at low latency.",
    ],
    github: "https://github.com/Hitesh564",
  },
  {
    index: "02",
    slug: "explainable-retinal-age-gap-prediction",
    title: "Explainable Retinal Age Gap Prediction",
    company: "Plaksha University ML Lab",
    logo: "/logos/github.svg",
    logoHeight: 18,
    status: "Completed",
    devStatus: "completed",
    dashboardImage: "/dashboards/retinal.png",
    keyMetrics: [
      { label: "Retinal Scans", val: "23,000+" },
      { label: "Datasets", val: "BRSET & ODIR-5K" },
      { label: "ViT Backbone", val: "RETFound" },
      { label: "Explainability", val: "SHAP + Frangi" },
    ],
    tags: [
      "Python",
      "PyTorch",
      "RETFound (ViT)",
      "Vascular Biomarkers",
      "Frangi Filtering",
      "XGBoost",
      "SHAP Explainability",
    ],
    impact:
      "Processed 23K+ retinal images across BRSET & ODIR-5K using RETFound Vision Transformers, Frangi filtering, and SHAP explainability.",
    summary: [
      "Developed an **explainable deep learning pipeline** for retinal age prediction using **Vision Transformers (RETFound)**, vascular feature extraction, and XGBoost to estimate **biological aging**.",
      "Engineered a preprocessing pipeline for **23K+ retinal images** across **BRSET and ODIR-5K** (metadata alignment, quality filtering, normalization, CLAHE enhancement, and data augmentation).",
      "Implemented **vascular biomarker extraction** with **Frangi filtering** and employed **SHAP** to attribute retinal age predictions to clinically relevant vessel characteristics.",
      "Designed a **hybrid deep learning and classical ML pipeline** combining Vision Transformers and explainable AI to support Retinal Age Gap analysis for early disease risk assessment.",
    ],
    bullets: [
      "Developed an **explainable deep learning pipeline** for retinal age prediction using **Vision Transformers (RETFound)**, vascular feature extraction, and XGBoost to estimate **biological aging**.",
      "Engineered a preprocessing pipeline for **23K+ retinal images** across **BRSET** and **ODIR-5K**, including metadata alignment, quality filtering, normalization, CLAHE enhancement, and augmentation to improve training robustness.",
      "Implemented **vascular biomarker extraction** with **Frangi filtering** and employed **SHAP** to attribute retinal age predictions to clinically relevant vessel characteristics, improving transparency of model decisions.",
      "Designed a **hybrid deep learning and classical ML pipeline** combining Vision Transformers, vascular biomarker engineering, and explainable AI to support clinically interpretable Retinal Age Gap analysis for early systemic disease risk assessment.",
    ],
    github: "https://github.com/Hitesh564",
  },
  {
    index: "03",
    slug: "agenteval-failure-diagnosis",
    title: "AgentEval - Failure Diagnosis for LLM Agents",
    company: "Personal / Open Source",
    logo: "/logos/github.svg",
    logoHeight: 18,
    status: "Completed",
    devStatus: "completed",
    dashboardImage: "/dashboards/agenteval.png",
    keyMetrics: [
      { label: "Attribution Acc", val: "100%" },
      { label: "Topologies", val: "4 Graph Types" },
      { label: "Benchmark", val: "ICML 2025" },
      { label: "Platform", val: "Pip SDK + React" },
    ],
    tags: [
      "Python",
      "FastAPI",
      "SQLite",
      "LangChain",
      "LiteLLM",
      "Causal Diagnosis",
      "ICML 2025 Benchmark",
      "React UI",
    ],
    impact:
      "Pip-installable SDK for agent root-cause diagnosis, achieving 100% failure attribution accuracy across 4 topologies.",
    summary: [
      "Developed a pip-installable SDK for **LLM agent evaluation and root-cause diagnosis**, achieving **100% failure attribution accuracy** across linear, branching, retry-loops, and multi-agent handoffs.",
      "Designed a **health-propagation algorithm** for **causal failure attribution** across agent graphs with sibling-scoped ambiguity detection and retry-aware health scoring.",
      "Engineered **claim-level groundedness** and retrieval-quality evaluation via **LLM-based judgment**, with an ingestion adapter for an **ICML 2025 multi-agent failure benchmark**.",
      "Developed a **multi-user diagnostic platform** (FastAPI + React) with per-user data isolation, **causal-chain visualization**, and CLI regression testing.",
    ],
    bullets: [
      "Developed a pip-installable SDK for **LLM agent evaluation and root-cause diagnosis**, achieving **100% failure attribution accuracy** across four agent topologies (linear, branching, retry-loops, and multi-agent handoffs) on hand-labeled benchmarks.",
      "Designed a **health-propagation algorithm** for **causal failure attribution** across agent graphs with sibling-scoped ambiguity detection and retry-aware health scoring for robust multi-agent evaluation.",
      "Engineered a **claim-level groundedness** and **retrieval-quality evaluation pipeline** via **LLM-based judgment**, and built an ingestion adapter extending evaluation to an **ICML 2025 multi-agent failure benchmark** alongside internal test data.",
      "Developed a **multi-user diagnostic platform** (FastAPI + React) with per-user data isolation, **causal-chain visualization**, and a CLI regression suite for pre-deployment agent benchmarking.",
    ],
    github: "https://github.com/Hitesh564",
  },
  {
    index: "04",
    slug: "gco-optimizer",
    title: "Gradient Coherence Optimizer (GCO)",
    company: "Personal / Open Source",
    logo: "/logos/github.svg",
    logoHeight: 18,
    status: "Open Source",
    devStatus: "completed",
    dashboardImage: "",
    keyMetrics: [
      { label: "Signal", val: "Cosine Sim" },
      { label: "Second Order", val: "Zero O(N²)" },
      { label: "Framework", val: "PyTorch" },
      { label: "Step Scaling", val: "Direction-Aware" },
    ],
    tags: [
      "Python",
      "PyTorch",
      "Custom Optimizer",
      "Deep Learning",
      "Adaptive Optimization",
      "Loss Landscapes",
    ],
    impact:
      "Direction-aware adaptive optimizer dynamically modulating effective step sizes via gradient-momentum cosine similarity.",
    summary: [
      "Momentum optimizers **blindly trust accumulated velocity**, overshooting sharp curvature changes and oscillating across narrow ravines.",
      "Calculates **cosine similarity between instantaneous gradient and historical momentum** to dynamically throttle or accelerate effective learning rate.",
      "**Directional gating**: Alignment accelerates descent, conflict applies progressive braking, and uncertainty maintains baseline step size.",
      "Stabilizes **training trajectories on ill-conditioned loss surfaces** without expensive second-order Hessian computation.",
    ],
    bullets: [
      "Momentum optimizers **blindly trust accumulated velocity**, overshooting sharp curvature changes and oscillating across narrow ravines.",
      "Calculates **cosine similarity between instantaneous gradient and historical momentum** to dynamically throttle or accelerate effective learning rate.",
      "**Directional gating**: Alignment accelerates descent, conflict applies progressive braking, and uncertainty maintains baseline step size.",
      "Stabilizes **training trajectories on ill-conditioned loss surfaces** without expensive second-order Hessian computation.",
    ],
    github: "https://github.com/Hitesh564/GCO_optimizer",
  },
];

const PROJECT_DETAIL_PATHS: Partial<Record<string, string>> = {
  "portfolio-dev": "/work/portfolio-dev",
  pageindexollama: "/work/pageindexollama",
  "azure-infra-docs": "/work/azure-infra-docs",
  "skill-recommendation-engine": "/work/skill-recommendation-engine",
};

const SUMMARY_LABELS = ["Problem", "System", "Design", "Outcome"];

// Featured card for Veriq / top projects
function FeaturedCard({
  p,
  caseStudyHref,
  caseStudyLabel,
}: {
  p: Project;
  caseStudyHref: string;
  caseStudyLabel: string;
}) {
  const [hovered, setHovered] = useState(false);
  const isMobile = useIsMobile();

  const accentColor = "#4ade80";
  const accentBorder = "rgba(74,222,128,0.35)";

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        window.location.href = caseStudyHref;
      }}
      style={{
        padding: isMobile ? "1.6rem" : "2.4rem",
        borderRadius: "10px",
        border: `1px solid ${hovered ? accentBorder : "rgba(255,255,255,0.14)"}`,
        background: "rgba(255,255,255,0.02)",
        transition: "border-color 0.25s, transform 0.2s",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      {/* Accent top line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: accentColor,
          opacity: hovered ? 0.9 : 0.4,
          transition: "opacity 0.25s",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "1.5rem" : "3vw",
          alignItems: "start",
        }}
      >
        {/* Left: header info */}
        <div>
          {/* Company + status */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "1.2rem",
            }}
          >
            <img
              src={p.logo}
              alt={p.company}
              loading="lazy"
              decoding="async"
              style={{
                height: `${p.logoHeight}px`,
                width: "auto",
                maxWidth: "60px",
                objectFit: "contain",
                opacity: 0.85,
              }}
              onError={(e) =>
                ((e.currentTarget as HTMLImageElement).style.display = "none")
              }
            />
            <span
              style={{
                fontFamily: FONT_MONO,
                fontSize: "0.62rem",
                letterSpacing: "0.09em",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              {p.company}
            </span>
            <span
              style={{
                fontFamily: FONT_MONO,
                fontSize: "0.52rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "3px 10px",
                borderRadius: "20px",
                color: accentColor,
                border: `1px solid ${accentBorder}`,
                background: "rgba(74,222,128,0.06)",
              }}
            >
              ● {p.status}
            </span>
          </div>

          <h3
            style={{
              fontFamily: FONT_SERIF,
              fontWeight: 800,
              fontSize: isMobile ? "1.6rem" : "2rem",
              color: "#fafaf8",
              lineHeight: 1.15,
              margin: "0 0 1rem",
              letterSpacing: "0.01em",
            }}
          >
            {p.title}
          </h3>

          <p
            style={{
              fontFamily: FONT_SANS,
              fontSize: "0.92rem",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.7)",
              marginBottom: "1.8rem",
            }}
          >
            {p.impact}
          </p>

          {/* CTA button */}
          <a
            href={caseStudyHref}
            onClick={(e) => e.stopPropagation()}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: FONT_MONO,
              fontSize: "0.65rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#000",
              background: accentColor,
              fontWeight: 600,
              textDecoration: "none",
              borderRadius: "6px",
              padding: "10px 18px",
              transition: "transform 0.2s",
            }}
          >
            {caseStudyLabel} →
          </a>
        </div>

        {/* Right: summary bullets */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}
        >
          {p.summary.map((bullet, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "0.75rem",
                alignItems: "flex-start",
                padding: "0.6rem 0",
                borderBottom:
                  i < p.summary.length - 1
                    ? "1px solid rgba(255,255,255,0.05)"
                    : "none",
              }}
            >
              <span
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: "0.58rem",
                  color: "#4ade80",
                  marginTop: "4px",
                  flexShrink: 0,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  width: "64px",
                }}
              >
                {SUMMARY_LABELS[i]}
              </span>
              <span
                style={{
                  fontFamily: FONT_SANS,
                  fontSize: "0.86rem",
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.65)",
                }}
              >
                {renderBullet(bullet)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div
        style={{
          display: "flex",
          gap: "6px",
          flexWrap: "wrap",
          marginTop: "1.8rem",
          paddingTop: "1.2rem",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {p.tags.map((t) => (
          <span
            key={t}
            style={{
              fontFamily: FONT_MONO,
              fontSize: "0.54rem",
              letterSpacing: "0.07em",
              color: "rgba(255,255,255,0.45)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: "3px",
              padding: "3px 8px",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </m.div>
  );
}

// Grid card for Retinal Age Gap & AgentEval
function ProjectCard({ p }: { p: Project }) {
  const [hovered, setHovered] = useState(false);
  const isMobile = useIsMobile();

  const statusColor = "#4ade80";
  const statusBorder = "rgba(74,222,128,0.35)";
  const statusBg = "rgba(74,222,128,0.06)";

  const caseStudyHref = `/projects/${p.slug}`;

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        window.location.href = caseStudyHref;
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "1.6rem",
        borderRadius: "10px",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.12)"}`,
        background: "rgba(255,255,255,0.02)",
        transition: "border-color 0.2s",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {/* Title & Status */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "10px" }}>
          <h3
            style={{
              fontFamily: FONT_SERIF,
              fontWeight: 800,
              fontSize: isMobile ? "1.3rem" : "1.45rem",
              color: "#fafaf8",
              lineHeight: 1.2,
              margin: 0,
              flex: 1,
            }}
          >
            {p.title}
          </h3>
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: "0.5rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "3px 8px",
              borderRadius: "20px",
              flexShrink: 0,
              color: statusColor,
              border: `1px solid ${statusBorder}`,
              background: statusBg,
            }}
          >
            {p.status}
          </span>
        </div>

        {/* Company */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: "0.62rem",
              letterSpacing: "0.09em",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            {p.company}
          </span>
        </div>

        <div style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />

        {/* Impact Subtitle */}
        <p
          style={{
            fontFamily: FONT_SANS,
            fontSize: "0.86rem",
            lineHeight: 1.55,
            color: "rgba(255,255,255,0.7)",
            margin: 0,
          }}
        >
          {p.impact}
        </p>

        {/* Summary bullets */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {p.summary.slice(0, 3).map((bullet, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "0.6rem",
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: "0.56rem",
                  color: "#4ade80",
                  marginTop: "3px",
                  flexShrink: 0,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  width: "58px",
                }}
              >
                {SUMMARY_LABELS[i]}
              </span>
              <span
                style={{
                  fontFamily: FONT_SANS,
                  fontSize: "0.82rem",
                  lineHeight: 1.55,
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                {renderBullet(bullet)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button pill at bottom of card */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "auto",
          paddingTop: "1.2rem",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: "0.6rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: hovered ? "#4ade80" : "rgba(255,255,255,0.5)",
            transition: "color 0.2s",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          View Full Project & Dashboard
        </span>
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: "0.75rem",
            color: hovered ? "#4ade80" : "rgba(255,255,255,0.5)",
            transition: "transform 0.2s, color 0.2s",
            transform: hovered ? "translateX(3px)" : "none",
          }}
        >
          →
        </span>
      </div>
    </m.div>
  );
}

export function Projects() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const maxPerRow = isMobile ? 1 : isTablet ? 2 : 2;
  const rows = useEqualRows(researchItems.length, maxPerRow);

  return (
    <section
      id="projects"
      style={{
        position: "relative",
        background: "transparent",
        padding: isMobile ? "5rem 4vw" : "4rem 0",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div style={isMobile ? {} : { padding: "0.85rem 6vw 2rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            <span
              style={{
                fontFamily: FONT_MONO,
                fontSize: "0.62rem",
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.4)",
                textTransform: "uppercase",
              }}
            >
              Research & Systems
            </span>
            <div
              style={{
                flex: 1,
                height: "1px",
                background: "rgba(255,255,255,0.07)",
              }}
            />
          </div>

          <div style={{ overflow: "hidden" }}>
            <m.h2
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              style={{
                fontFamily: FONT_SERIF,
                fontSize: isMobile
                  ? "clamp(1.8rem, 7vw, 4rem)"
                  : "clamp(2.6rem, 4.5vw, 4rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "0.02em",
                color: "#fafaf8",
                margin: 0,
              }}
            >
              Systems that had to hold.
            </m.h2>
          </div>
        </div>

        {/* Content strip */}
        <div style={{ padding: isMobile ? "2rem 0 0" : "1.5rem 6vw 4rem" }}>
          <EqualGridRenderer
            rows={rows}
            renderCard={(idx) => <ResearchCard item={researchItems[idx]} />}
          />
        </div>
      </div>
    </section>
  );
}
