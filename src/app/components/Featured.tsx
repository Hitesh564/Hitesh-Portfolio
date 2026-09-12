import { m } from "motion/react";
import { useState } from "react";
import type React from "react";
import { useIsMobile } from "../../hooks/useMediaQuery";

function renderBullet(text: string): React.ReactNode {
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

const FONT_SERIF = '"Playfair Display", Georgia, serif';
const FONT_MONO = '"DM Mono", monospace';
const FONT_SANS = '"DM Sans", sans-serif';

type ItemType = "production" | "patent" | "thesis" | "open-source";

type FeaturedItem = {
  type: ItemType;
  slug: string;
  name: string;
  title: string;
  subtitle: string;
  link: string;
  secondaryBadge?: string;
  bullets: [string, string, string, string];
};

const TYPE_META: Record<
  ItemType,
  { label: string; color: string; border: string; bg: string; glow: string }
> = {
  production: {
    label: "Completed • Real-Time Voice",
    color: "#4ade80",
    border: "rgba(74,222,128,0.45)",
    bg: "rgba(74,222,128,0.10)",
    glow: "0 0 4px rgba(74,222,128,0.28)",
  },
  patent: {
    label: "Commercial Software • In Development",
    color: "#ffffff",
    border: "rgba(139,92,246,0.55)",
    bg: "rgba(93,33,182,0.22)",
    glow: "0 0 8px rgba(139,92,246,0.35)",
  },
  thesis: {
    label: "Research Lab • 23K+ Images",
    color: "#EAB308",
    border: "rgba(234,179,8,0.45)",
    bg: "rgba(234,179,8,0.10)",
    glow: "0 0 4px rgba(234,179,8,0.28)",
  },
  "open-source": {
    label: "Open Source SDK",
    color: "#60A5FA",
    border: "rgba(96,165,250,0.45)",
    bg: "rgba(96,165,250,0.10)",
    glow: "0 0 4px rgba(96,165,250,0.28)",
  },
};

const LABELS = ["Context", "Approach", "System", "Outcome"];

const ITEMS: FeaturedItem[] = [
  {
    type: "production",
    slug: "veriq-ai-interview-platform",
    name: "Veriq",
    title:
      "AI Interview Platform - LangGraph Agents & Real-Time Low-Latency Voice",
    subtitle: "Personal / Plaksha • May 2026 – July 2026",
    link: "/projects/veriq-ai-interview-platform",
    bullets: [
      "Developed an **AI-powered interview platform** using LangGraph and **LLM agents** for adaptive questioning and evidence-based evaluation.",
      "Built an **LLM-based reasoning engine** verifying project claims through **multi-turn evidence collection** across system design & debugging.",
      "Implemented **semantic retrieval**, RAG, context-aware prompt optimization, and persistent memory to improve **factual grounding**.",
      "Integrated **real-time voice interaction**, personalized feedback generation, and low-latency production deployment.",
    ],
  },
  {
    type: "thesis",
    slug: "explainable-retinal-age-gap-prediction",
    name: "Explainable Retinal AI",
    title:
      "Retinal Age Gap Prediction - Vision Transformers (RETFound), Frangi Biomarkers & SHAP",
    subtitle: "Plaksha University ML Lab • Feb 2026 – May 2026",
    link: "/projects/explainable-retinal-age-gap-prediction",
    secondaryBadge: "23K+ Images • SHAP",
    bullets: [
      "Developed an **explainable deep learning pipeline** for retinal age prediction using **Vision Transformers (RETFound)** and XGBoost.",
      "Engineered a preprocessing pipeline for **23K+ retinal images** across **BRSET and ODIR-5K** (CLAHE enhancement, quality filtering).",
      "Implemented **vascular biomarker extraction** with **Frangi filtering** and employed **SHAP** for clinical transparency.",
      "Designed a **hybrid deep learning + classical ML pipeline** combining Vision Transformers and explainable AI for systemic risk assessment.",
    ],
  },
  {
    type: "open-source",
    slug: "agenteval-failure-diagnosis",
    name: "AgentEval",
    title:
      "Failure Diagnosis for LLM Agents - Causal Attribution SDK & ICML 2025 Benchmark",
    subtitle: "Open Source • June 2026 – July 2026",
    link: "/projects/agenteval-failure-diagnosis",
    secondaryBadge: "100% Attribution Accuracy",
    bullets: [
      "Developed a pip-installable SDK for **LLM agent evaluation**, achieving **100% failure attribution accuracy** across 4 topologies.",
      "Designed a **health-propagation algorithm** for **causal failure attribution** with sibling-scoped ambiguity detection.",
      "Engineered **claim-level groundedness** and retrieval-quality evaluation via **LLM judgment** with ICML 2025 benchmark ingestion.",
      "Developed a **multi-user diagnostic platform** (FastAPI + React) with **causal-chain visualization** and CLI regression testing.",
    ],
  },
];

// Top Full-Width Card for Veriq
function TopFeaturedCard({ item }: { item: FeaturedItem }) {
  const [hovered, setHovered] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const isMobile = useIsMobile();
  const meta = TYPE_META[item.type];
  const showOutcome = hovered || revealed;

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4, scale: 1.008 }}
      transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        if (isMobile && !revealed) {
          setRevealed(true);
          return;
        }
        window.location.href = item.link;
      }}
      style={{
        padding: isMobile ? "1.6rem" : "2.4rem",
        borderRadius: "10px",
        border: `1px solid ${hovered ? meta.border : "rgba(255,255,255,0.14)"}`,
        background: "rgba(255,255,255,0.02)",
        transition: "border-color 0.25s, transform 0.2s",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        width: "100%",
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
          background: meta.color,
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
        {/* Left column */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "1rem",
            }}
          >
            <span
              style={{
                fontFamily: FONT_MONO,
                fontSize: "0.54rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "3px 10px",
                borderRadius: "20px",
                color: meta.color,
                border: `1px solid ${meta.border}`,
                background: meta.bg,
                boxShadow: meta.glow,
              }}
            >
              ● {meta.label}
            </span>
          </div>

          <h3
            style={{
              fontFamily: FONT_SERIF,
              fontWeight: 800,
              fontSize: isMobile ? "1.6rem" : "2.2rem",
              color: "#fafaf8",
              lineHeight: 1.15,
              margin: "0 0 0.8rem",
            }}
          >
            {item.name}
          </h3>

          <p
            style={{
              fontFamily: FONT_SANS,
              fontSize: "0.92rem",
              color: "rgba(255,255,255,0.72)",
              lineHeight: 1.55,
              margin: "0 0 1.2rem",
            }}
          >
            {item.title}
          </p>

          <p
            style={{
              fontFamily: FONT_MONO,
              fontSize: "0.68rem",
              color: "rgba(255,255,255,0.35)",
              margin: "0 0 1.8rem",
            }}
          >
            {item.subtitle}
          </p>

          {/* CTA Button */}
          <a
            href={item.link}
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = item.link;
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: FONT_MONO,
              fontSize: "0.65rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#000",
              background: "#fafaf8",
              fontWeight: 600,
              textDecoration: "none",
              borderRadius: "6px",
              padding: "10px 18px",
              transition: "transform 0.2s, background 0.2s",
            }}
          >
            View Full Project & Dashboard →
          </a>
        </div>

        {/* Right column: 4 summary bullets (Accordion hover-to-expand) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.8rem",
            maxHeight: showOutcome ? "1000px" : "15rem",
            overflow: "hidden",
            transition: "max-height 0.5s cubic-bezier(0.76, 0, 0.24, 1)",
            ...(!showOutcome
              ? {
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 70%, transparent 100%)",
                  maskImage:
                    "linear-gradient(to bottom, black 70%, transparent 100%)",
                }
              : {}),
          }}
        >
          {item.bullets.map((bullet, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "0.75rem",
                alignItems: "flex-start",
                padding: "0.5rem 0",
                borderBottom:
                  i < item.bullets.length - 1
                    ? "1px solid rgba(255,255,255,0.05)"
                    : "none",
              }}
            >
              <span
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: "0.58rem",
                  color: meta.color,
                  marginTop: "4px",
                  flexShrink: 0,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  width: "64px",
                }}
              >
                {LABELS[i]}
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
    </m.div>
  );
}

// 2-Column Grid Card for Retinal Age Gap & AgentEval
function SecondaryFeaturedCard({ item }: { item: FeaturedItem }) {
  const [hovered, setHovered] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const isMobile = useIsMobile();
  const meta = TYPE_META[item.type];
  const showOutcome = hovered || revealed;

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
        if (isMobile && !revealed) {
          setRevealed(true);
          return;
        }
        window.location.href = item.link;
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "1.6rem",
        borderRadius: "10px",
        border: `1px solid ${hovered ? meta.border : "rgba(255,255,255,0.12)"}`,
        background: "rgba(255,255,255,0.02)",
        transition: "border-color 0.25s",
        cursor: "pointer",
        minWidth: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxHeight: showOutcome ? "1000px" : "16rem",
          overflow: "hidden",
          transition: "max-height 0.5s cubic-bezier(0.76, 0, 0.24, 1)",
          ...(!showOutcome
            ? {
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 72%, transparent 100%)",
                maskImage:
                  "linear-gradient(to bottom, black 72%, transparent 100%)",
              }
            : {}),
        }}
      >
        {/* Title & Badge */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "10px" }}>
          <h3
            style={{
              fontFamily: FONT_SERIF,
              fontWeight: 800,
              fontSize: isMobile ? "1.35rem" : "1.5rem",
              color: "#fafaf8",
              lineHeight: 1.2,
              margin: 0,
              flex: 1,
            }}
          >
            {item.name}
          </h3>
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: "0.52rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "3px 9px",
              borderRadius: "20px",
              color: meta.color,
              border: `1px solid ${meta.border}`,
              background: meta.bg,
              flexShrink: 0,
            }}
          >
            {meta.label}
          </span>
        </div>

        {/* Title Subtitle */}
        <p
          style={{
            fontFamily: FONT_SANS,
            fontSize: "0.86rem",
            lineHeight: 1.55,
            color: "rgba(255,255,255,0.7)",
            margin: 0,
          }}
        >
          {item.title}
        </p>

        <div style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />

        {/* Bullets */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {item.bullets.map((bullet, i) => (
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
                  color: meta.color,
                  marginTop: "3px",
                  flexShrink: 0,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  width: "58px",
                }}
              >
                {LABELS[i]}
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
            color: hovered ? meta.color : "rgba(255,255,255,0.5)",
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
            color: hovered ? meta.color : "rgba(255,255,255,0.5)",
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

// ── Section ───────────────────────────────────────────────────────────────
export function Featured() {
  const isMobile = useIsMobile();
  const veriqItem = ITEMS[0];
  const bottomTwoItems = ITEMS.slice(1);

  return (
    <section
      id="featured"
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
              Featured Systems
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
              What the arc produced.
            </m.h2>
          </div>
        </div>

        {/* Content Container */}
        <div style={{ padding: isMobile ? "2rem 0 0" : "1.5rem 6vw 4rem", display: "flex", flexDirection: "column", gap: "2rem" }}>
          {/* Top Full-Width Card: Veriq */}
          <TopFeaturedCard item={veriqItem} />

          {/* Bottom 2-Column Grid: Retinal AI & AgentEval */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: "1.5rem",
            }}
          >
            {bottomTwoItems.map((item) => (
              <SecondaryFeaturedCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
