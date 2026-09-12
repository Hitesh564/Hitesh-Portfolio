import { useState } from "react";
import { m, AnimatePresence } from "motion/react";
import { ArrowUpRight, Github, ExternalLink, Maximize2, Shield, Cpu, Activity, Database, CheckCircle2 } from "lucide-react";
import { useIsMobile } from "../../hooks/useMediaQuery";
import { projects, renderBullet } from "./Projects";
import { VeriqProjectPage } from "./VeriqProjectPage";
import { AgentEvalProjectPage } from "./AgentEvalProjectPage";
import { RetinalProjectPage } from "./RetinalProjectPage";
import { GCOProjectPage } from "./GCOProjectPage";

const FONT_SERIF = '"Playfair Display", Georgia, serif';
const FONT_MONO = '"DM Mono", monospace';
const FONT_SANS = '"DM Sans", sans-serif';

const BULLET_ICONS = ["⚡", "⚠️", "⚙️", "🛡️", "🚀"] as const;

export function ProjectPage({
  slug,
  backHref = "/#projects",
}: {
  slug: string;
  backHref?: string;
}) {
  const isMobile = useIsMobile();
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const p = projects.find((pr) => pr.slug === slug);
  const backSection = backHref.replace("/#", "");

  if (slug === "gco-optimizer") {
    return <GCOProjectPage backHref={backHref} />;
  }

  if (slug === "veriq-ai-interview-platform") {
    return <VeriqProjectPage backHref={backHref} />;
  }

  if (slug === "agenteval-failure-diagnosis") {
    return <AgentEvalProjectPage backHref={backHref} />;
  }

  if (slug === "explainable-retinal-age-gap-prediction") {
    return <RetinalProjectPage backHref={backHref} />;
  }

  if (!p) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgba(255,255,255,0.4)",
          fontFamily: FONT_MONO,
          fontSize: "0.8rem",
        }}
      >
        Project not found.
      </div>
    );
  }

  const isAward = p.status === "Best Outgoing Project • 2022–23";
  const statusColor = isAward
    ? "#facc15"
    : p.status === "Client Delivery"
      ? "#22d3ee"
      : p.devStatus === "completed"
        ? "#4ade80"
        : "#facc15";
  const statusBorder = isAward
    ? "rgba(250,204,21,0.35)"
    : p.status === "Client Delivery"
      ? "rgba(34,211,238,0.4)"
      : p.devStatus === "completed"
        ? "rgba(74,222,128,0.35)"
        : "rgba(250,204,21,0.35)";
  const statusBg = isAward
    ? "rgba(250,204,21,0.06)"
    : p.status === "Client Delivery"
      ? "rgba(34,211,238,0.08)"
      : p.devStatus === "completed"
        ? "rgba(74,222,128,0.06)"
        : "rgba(250,204,21,0.06)";

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "max(320px, 64vw)",
        margin: "0 auto",
        padding: "6rem 0 8rem",
      }}
    >
      {/* Back button */}
      <m.a
        href={backHref}
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          fontFamily: FONT_MONO,
          fontSize: "0.62rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.4)",
          textDecoration: "none",
          marginBottom: isMobile ? "2rem" : "3rem",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.95)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)";
        }}
      >
        ← Back to {backSection}
      </m.a>

      {/* Header */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.2rem",
          marginBottom: "2.5rem",
        }}
      >
        {/* Status + Company */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: "0.54rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "4px 12px",
              borderRadius: "20px",
              color: statusColor,
              border: `1px solid ${statusBorder}`,
              background: statusBg,
            }}
          >
            ● {p.status}
          </span>
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: "0.65rem",
              letterSpacing: "0.1em",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            {p.company}
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: FONT_SERIF,
            fontWeight: 800,
            fontSize: isMobile ? "clamp(1.8rem, 6vw, 2.8rem)" : "clamp(2.4rem, 3.8vw, 3.5rem)",
            color: "#fafaf8",
            lineHeight: 1.12,
            letterSpacing: "0.01em",
            margin: 0,
          }}
        >
          {p.title}
        </h1>

        {/* Impact Subtitle */}
        <p
          style={{
            fontFamily: FONT_SANS,
            fontSize: isMobile ? "0.95rem" : "1.05rem",
            color: "rgba(255,255,255,0.7)",
            lineHeight: 1.6,
            maxWidth: "760px",
            margin: 0,
          }}
        >
          {p.impact}
        </p>

        {/* Action Buttons: GitHub Repo Link */}
        {p.github && (
          <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem", flexWrap: "wrap" }}>
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: FONT_MONO,
                fontSize: "0.68rem",
                letterSpacing: "0.08em",
                color: "#000",
                background: "#fafaf8",
                fontWeight: 600,
                textDecoration: "none",
                borderRadius: "6px",
                padding: "10px 18px",
                transition: "transform 0.2s, background 0.2s",
                boxShadow: "0 4px 14px rgba(255,255,255,0.12)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "none";
              }}
            >
              <Github size={15} />
              View Repository on GitHub
              <ArrowUpRight size={14} />
            </a>
          </div>
        )}
      </m.div>

      {/* Key Metrics Grid */}
      {p.keyMetrics && p.keyMetrics.length > 0 && (
        <m.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
            gap: "1rem",
            marginBottom: "3rem",
          }}
        >
          {p.keyMetrics.map((mItem, idx) => (
            <div
              key={idx}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "8px",
                padding: "1.2rem 1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
              }}
            >
              <span
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: "0.55rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                {mItem.label}
              </span>
              <span
                style={{
                  fontFamily: FONT_SERIF,
                  fontSize: isMobile ? "1.2rem" : "1.4rem",
                  fontWeight: 700,
                  color: "#4ade80",
                }}
              >
                {mItem.val}
              </span>
            </div>
          ))}
        </m.div>
      )}

      {/* Dashboard Showcase Frame */}
      {p.dashboardImage && (
        <m.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            marginBottom: "4rem",
            borderRadius: "10px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "#0d0d12",
            boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
          }}
        >
          {/* Mock Browser Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.8rem 1.2rem",
              background: "rgba(255,255,255,0.04)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4444" }} />
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#eab308" }} />
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#22c55e" }} />
            </div>
            <div
              style={{
                fontFamily: FONT_MONO,
                fontSize: "0.58rem",
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.08em",
                background: "rgba(0,0,0,0.3)",
                padding: "3px 14px",
                borderRadius: "4px",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              https://hiteshjindal.dev/system/{p.slug}
            </div>
            <button
              onClick={() => setZoomImage(p.dashboardImage!)}
              style={{
                background: "transparent",
                border: "none",
                color: "rgba(255,255,255,0.5)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "0.6rem",
                fontFamily: FONT_MONO,
              }}
            >
              <Maximize2 size={13} />
              Expand
            </button>
          </div>

          {/* Screenshot Container */}
          <div
            style={{ position: "relative", cursor: "pointer" }}
            onClick={() => setZoomImage(p.dashboardImage!)}
          >
            <img
              src={p.dashboardImage}
              alt={`${p.title} Dashboard`}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                objectFit: "cover",
              }}
            />
          </div>
        </m.div>
      )}

      {/* Technical Breakdown Section */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          marginBottom: "4rem",
        }}
      >
        <h2
          style={{
            fontFamily: FONT_SERIF,
            fontSize: "1.6rem",
            fontWeight: 700,
            color: "#fafaf8",
            margin: 0,
          }}
        >
          System Architecture & Technical Execution
        </h2>

        {/* Bullets List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {p.bullets.map((b, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "1rem",
                alignItems: "flex-start",
                padding: "1.2rem 1.4rem",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "8px",
              }}
            >
              <span style={{ fontSize: "1.1rem", flexShrink: 0, marginTop: "2px" }}>
                {BULLET_ICONS[i] ?? "▸"}
              </span>
              <span
                style={{
                  fontFamily: FONT_SANS,
                  fontSize: isMobile ? "0.9rem" : "0.96rem",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.72)",
                }}
              >
                {renderBullet(b)}
              </span>
            </div>
          ))}
        </div>
      </m.div>

      {/* Tech Stack Badges */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          marginBottom: "4rem",
        }}
      >
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: "0.6rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          Technologies & Libraries
        </span>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {p.tags.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: FONT_MONO,
                fontSize: "0.6rem",
                letterSpacing: "0.08em",
                color: "#4ade80",
                border: "1px solid rgba(74,222,128,0.25)",
                background: "rgba(74,222,128,0.05)",
                borderRadius: "4px",
                padding: "6px 12px",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </m.div>

      {/* Bottom GitHub Banner */}
      {p.github && (
        <div
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
            padding: "2.5rem 2rem",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: FONT_SERIF,
                fontSize: "1.3rem",
                fontWeight: 700,
                color: "#fafaf8",
                margin: "0 0 0.4rem",
              }}
            >
              Explore {p.title} Codebase
            </h3>
            <p
              style={{
                fontFamily: FONT_SANS,
                fontSize: "0.85rem",
                color: "rgba(255,255,255,0.5)",
                margin: 0,
              }}
            >
              Source code, architecture diagrams, benchmarks, and installation guides on GitHub.
            </p>
          </div>
          <a
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: FONT_MONO,
              fontSize: "0.68rem",
              letterSpacing: "0.08em",
              color: "#000",
              background: "#4ade80",
              fontWeight: 600,
              textDecoration: "none",
              borderRadius: "6px",
              padding: "12px 22px",
              flexShrink: 0,
            }}
          >
            <Github size={16} />
            GitHub Repository
            <ArrowUpRight size={15} />
          </a>
        </div>
      )}

      {/* Image Modal Lightbox */}
      <AnimatePresence>
        {zoomImage && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomImage(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              background: "rgba(0,0,0,0.85)",
              backdropFilter: "blur(12px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem",
              cursor: "zoom-out",
            }}
          >
            <img
              src={zoomImage}
              alt="Expanded Preview"
              style={{
                maxWidth: "92vw",
                maxHeight: "90vh",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.15)",
                boxShadow: "0 25px 60px rgba(0,0,0,0.8)",
                objectFit: "contain",
              }}
            />
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
