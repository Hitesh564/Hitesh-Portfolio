import { m } from "motion/react";
import { useState } from "react";
import type React from "react";
import { useIsMobile, useIsDesktop } from "../../hooks/useMediaQuery";

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
const pinnsPdfUrl = "/PINNs_whitepaper.pdf";

const FONT_SERIF = '"Playfair Display", Georgia, serif';
const FONT_MONO = '"DM Mono", monospace';
const FONT_SANS = '"DM Sans", sans-serif';

type ItemType = "paper" | "whitepaper" | "github" | "commercial";

type ResearchItem = {
  type: ItemType;
  name: string;
  title: string;
  subtitle?: string;
  link: string;
  bullets: [string, string, string, string];
};

const TYPE_META: Record<
  ItemType,
  { label: string; color: string; border: string; bg: string; glow: string }
> = {
  paper: {
    label: "Published",
    color: "#EAB308",
    border: "rgba(234,179,8,0.45)",
    bg: "rgba(234,179,8,0.10)",
    glow: "0 0 2px rgba(234,179,8,0.35)",
  },
  whitepaper: {
    label: "White Paper",
    color: "#10B981",
    border: "rgba(16,185,129,0.45)",
    bg: "rgba(16,185,129,0.10)",
    glow: "0 0 2px rgba(16,185,129,0.35)",
  },
  github: {
    label: "Open Source",
    color: "#60A5FA",
    border: "rgba(96,165,250,0.45)",
    bg: "rgba(96,165,250,0.10)",
    glow: "0 0 2px rgba(96,165,250,0.35)",
  },
  commercial: {
    label: "Commercial Software • In Development",
    color: "#ffffff",
    border: "rgba(139,92,246,0.55)",
    bg: "rgba(93,33,182,0.22)",
    glow: "0 0 8px rgba(139,92,246,0.35)",
  },
};

const RESEARCH_LABELS = ["Problem", "Method", "System design", "Insight"];

export const researchItems: ResearchItem[] = [
  {
    type: "github",
    name: "GCO Optimizer",
    title: "Gradient Coherence Optimizer - Direction-Aware Adaptive Optimization in PyTorch",
    subtitle: "Open Source • Custom PyTorch Optimizer • Deep Learning",
    link: "/projects/gco-optimizer",
    bullets: [
      "Standard momentum optimizers **blindly trust accumulated velocity** — overshooting sharp curvature changes and oscillating across conflicting ravines.",
      "Measures **cosine similarity between instantaneous gradient and historical momentum**, dynamically modulating the effective step size without second-order Hessians.",
      "**Directional gating**: Alignment (cos > 0) accelerates velocity, conflict (cos < 0) applies progressive braking, and orthogonal uncertainty reverts to base step.",
      "Achieves **faster loss descent and stabilized trajectories** across ill-conditioned loss surfaces, preventing catastrophic divergence in deep networks.",
    ],
  },
  {
    type: "commercial",
    name: "Portfolio Architecture",
    title: "Spatial Portfolio Engine - Three-Layer System Rebuilt for 60fps & Sub-5ms Latency",
    subtitle: "Shipped • Personal • Interactive Spatial Interface",
    link: "/work/portfolio-dev",
    bullets: [
      "Traditional portfolios ship **heavy unoptimized DOM trees** and bloated scripts — sacrificing framerate, responsiveness, and clean systems thinking.",
      "Re-architected as a **three-layer spatial interface** (environment shell, Canvas 2D particle field, and interactive hologram viewport) with single RAF loop.",
      "Eliminated **400+ animated DOM nodes**, cut JS bundle by 72%, optimized image assets by 90%, and pre-rendered scanline textures to offscreen canvas.",
      "Maintains **rock-solid 60 FPS** under CPU throttling with sub-5ms canvas frame times and persistent state transitions across routes.",
    ],
  },
];

export function ResearchCard({ item }: { item: ResearchItem }) {
  const [hovered, setHovered] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const isMobile = useIsMobile();
  const isDesktop = useIsDesktop();
  const showOutcome = hovered || revealed;

  return (
    <m.a
      href={item.link}
      target={item.link.startsWith("/") ? undefined : "_blank"}
      rel={item.link.startsWith("/") ? undefined : "noopener noreferrer"}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={isMobile ? { y: -4 } : { y: -6, scale: 1.025 }}
      transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={(e) => {
        if (isMobile && !revealed) {
          e.preventDefault();
          setRevealed(true);
        }
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "1.6rem",
        borderRadius: "8px",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.15)"}`,
        background: "transparent",
        transition: "border-color 0.2s, color 0.2s",
        textDecoration: "none",
        color: "inherit",
        cursor: "pointer",
        minWidth: 0,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          overflow: "hidden",
          maxHeight: showOutcome ? "1000px" : "14rem",
          minHeight: showOutcome ? undefined : "14rem",
          transition: "max-height 0.5s cubic-bezier(0.76, 0, 0.24, 1)",
          ...(!showOutcome
            ? {
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 75%, transparent 100%)",
                maskImage:
                  "linear-gradient(to bottom, black 75%, transparent 100%)",
              }
            : {}),
        }}
      >
        {/* Name + badge row */}
        <div
          style={{
            display: "flex",
            flexDirection: isDesktop ? "row" : "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "0.5rem",
          }}
        >
          <p
            style={{
              fontFamily: FONT_SERIF,
              fontWeight: 800,
              fontSize: "1.75rem",
              color: "#fafaf8",
              lineHeight: 1.2,
              margin: 0,
              minWidth: 0,
            }}
          >
            {item.name}
          </p>
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: "0.52rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              padding: "3px 9px",
              borderRadius: "20px",
              flexShrink: 0,
              alignSelf: "flex-start",
              color: TYPE_META[item.type].color,
              border: `1px solid ${TYPE_META[item.type].border}`,
              background: TYPE_META[item.type].bg,
              boxShadow: TYPE_META[item.type].glow,
            }}
          >
            {TYPE_META[item.type].label}
          </span>
        </div>

        {/* Title (former subtitle) */}
        <p
          style={{
            fontFamily: FONT_SANS,
            fontWeight: 400,
            fontSize: "0.85rem",
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.45,
            margin: 0,
            textAlign: "justify",
            textJustify: "inter-word",
          }}
        >
          {item.title}
        </p>

        {/* Subtitle */}
        {item.subtitle && (
          <p
            style={{
              fontFamily: FONT_MONO,
              fontSize: "0.7rem",
              color: "rgba(255,255,255,0.28)",
              margin: 0,
              letterSpacing: "0.02em",
              textAlign: "justify",
              textJustify: "inter-word",
            }}
          >
            {item.subtitle}
          </p>
        )}

        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.06)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          {item.bullets.map((bullet, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "0.65rem",
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: "0.62rem",
                  color: "rgba(255,255,255,0.22)",
                  marginTop: "4px",
                  flexShrink: 0,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  width: isMobile ? "56px" : "76px",
                  lineHeight: 1.5,
                }}
              >
                {RESEARCH_LABELS[i]}
              </span>
              <span
                style={{
                  fontFamily: FONT_SANS,
                  fontSize: "0.88rem",
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,0.56)",
                  textAlign: "justify",
                  textJustify: "inter-word",
                }}
              >
                {renderBullet(bullet)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          marginTop: "auto",
          paddingTop: "0.5rem",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: "0.72rem",
            color: hovered
              ? "rgba(255,255,255,0.95)"
              : "rgba(255,255,255,0.35)",
            transition: "color 0.2s",
          }}
        >
          ↗
        </span>
      </div>
    </m.a>
  );
}
