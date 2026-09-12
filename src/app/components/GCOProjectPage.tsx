import { useEffect, useRef } from "react";
import { ArrowUpRight, Github } from "lucide-react";

declare global {
  interface Window {
    mermaid?: any;
  }
}

const MERMAID_CONFIG = {
  startOnLoad: false,
  theme: "base",
  themeVariables: {
    background: "transparent",
    primaryColor: "transparent",
    primaryTextColor: "#ffffff",
    primaryBorderColor: "rgba(255,255,255,0.28)",
    secondaryColor: "transparent",
    secondaryTextColor: "#ffffff",
    tertiaryColor: "transparent",
    tertiaryTextColor: "#ffffff",
    lineColor: "rgba(255,255,255,0.55)",
    textColor: "#ffffff",
    mainBkg: "transparent",
    nodeBorder: "rgba(255,255,255,0.28)",
    clusterBkg: "rgba(255,255,255,0.03)",
    clusterBorder: "rgba(255,255,255,0.15)",
    titleColor: "#ffffff",
    edgeLabelBackground: "rgba(6,6,8,0.7)",
    fontSize: "12px",
    actorBkg: "transparent",
    actorTextColor: "#ffffff",
    actorLineColor: "rgba(255,255,255,0.3)",
    signalColor: "rgba(255,255,255,0.55)",
    signalTextColor: "#ffffff",
    labelBoxBkgColor: "transparent",
    labelBoxBorderColor: "rgba(255,255,255,0.2)",
    labelTextColor: "#ffffff",
    loopTextColor: "#ffffff",
    noteBkgColor: "rgba(255,255,255,0.04)",
    noteTextColor: "#ffffff",
    noteBorderColor: "rgba(255,255,255,0.2)",
    activationBkgColor: "rgba(255,255,255,0.06)",
    activationBorderColor: "rgba(255,255,255,0.3)",
  },
};

export function GCOProjectPage({
  backHref = "/#projects",
}: {
  backHref?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const backSection = backHref.replace("/#", "");

  useEffect(() => {
    let timer: any;
    const renderMermaid = () => {
      if (typeof window !== "undefined" && window.mermaid) {
        try {
          window.mermaid.initialize(MERMAID_CONFIG);
          const nodes = Array.from(
            containerRef.current?.querySelectorAll(".mermaid:not([data-processed])") || []
          );
          if (nodes.length) {
            window.mermaid.run({ nodes });
          }
        } catch (e) {
          console.error("Mermaid error:", e);
        }
      } else {
        timer = setTimeout(renderMermaid, 50);
      }
    };

    renderMermaid();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: "100vh",
        width: "max(320px, 60vw)",
        margin: "0 auto",
        padding: "6rem 0 8rem",
      }}
    >
      {/* Back link */}
      <a
        href={backHref}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          fontFamily: '"DM Mono", monospace',
          fontSize: "0.62rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.35)",
          textDecoration: "none",
          marginBottom: "3.5rem",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
      >
        ← Back to {backSection || "projects"}
      </a>

      {/* Hero */}
      <header style={{ marginBottom: "2.5rem" }}>
        <div
          style={{
            display: "inline-block",
            fontFamily: '"DM Mono", monospace',
            fontSize: "0.54rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#60A5FA",
            border: "1px solid rgba(96,165,250,0.35)",
            background: "rgba(96,165,250,0.08)",
            padding: "4px 10px",
            borderRadius: "4px",
            marginBottom: "1.2rem",
          }}
        >
          Open Source • Custom PyTorch Optimizer • Deep Learning
        </div>

        <h1
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: "clamp(2rem, 5.5vw, 3.2rem)",
            fontWeight: 800,
            lineHeight: 1.12,
            letterSpacing: "0.03em",
            color: "#fafaf8",
            margin: "0 0 1.2rem",
          }}
        >
          Gradient Coherence Optimizer (GCO)
        </h1>

        <p
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: "1.05rem",
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.6)",
            margin: "0 0 1.8rem",
            textAlign: "justify",
            textJustify: "inter-word",
          }}
        >
          An adaptive optimizer that learns when to accelerate — and when to brake. Extending Adam-style optimization with real-time cosine similarity between current gradients and accumulated momentum to navigate complex loss landscapes without second-order computation.
        </p>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <a
            href="https://github.com/Hitesh564/GCO_optimizer"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: '"DM Mono", monospace',
              fontSize: "0.65rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.05)",
              padding: "9px 16px",
              borderRadius: "5px",
              textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
            }}
          >
            <Github size={13} />
            GitHub Repository
            <ArrowUpRight size={12} style={{ opacity: 0.6 }} />
          </a>
        </div>
      </header>

      <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", margin: "2.5rem 0" }} />

      {/* Key Metrics */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "1.2rem",
          margin: "2rem 0",
        }}
      >
        {[
          { val: "Directional", label: "Gradient × Momentum Signal" },
          { val: "Cosine Sim", label: "Dynamic Step Scaling Metric" },
          { val: "Zero O(N²)", label: "No Hessian Computation" },
          { val: "PyTorch", label: "Drop-in Custom Optimizer" },
        ].map(({ val, label }) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: "clamp(1.4rem, 3.5vw, 1.8rem)",
                fontWeight: 800,
                color: "#60A5FA",
                lineHeight: 1,
              }}
            >
              {val}
            </span>
            <span
              style={{
                fontFamily: '"DM Mono", monospace',
                fontSize: "0.56rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.38)",
                lineHeight: 1.4,
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", margin: "2.5rem 0" }} />

      {/* 01 / Problem */}
      <section style={{ marginBottom: "3.5rem" }}>
        <h2
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: "1.25rem",
            fontWeight: 800,
            color: "#fafaf8",
            margin: "0 0 1.2rem",
            letterSpacing: "0.04em",
          }}
        >
          01 / The Problem: Momentum Blindness in Complex Geometry
        </h2>
        <p
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: "0.95rem",
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.62)",
            margin: "0 0 1rem",
            textAlign: "justify",
            textJustify: "inter-word",
          }}
        >
          Momentum-based optimizers like SGD with momentum and Adam accumulate historical gradient vectors to smooth out stochastic noise and accelerate progress along flatter dimensions. However, when the optimization trajectory approaches a sharp cliff, a narrow ravine, or an abrupt curvature change, accumulated momentum blindly propels parameters forward — causing dangerous overshoots and erratic oscillations.
        </p>
        <p
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: "0.95rem",
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.62)",
            margin: 0,
            textAlign: "justify",
            textJustify: "inter-word",
          }}
        >
          Second-order methods (like Newton-Raphson or L-BFGS) can capture surface curvature directly, but computing or approximating the Hessian matrix is prohibitively expensive for modern deep networks. GCO solves this by extracting a rich directional curvature signal using only first-order gradients.
        </p>
      </section>

      {/* 02 / Workflow: GCO Decision Cycle */}
      <section style={{ marginBottom: "3.5rem" }}>
        <h2
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: "1.25rem",
            fontWeight: 800,
            color: "#fafaf8",
            margin: "0 0 0.5rem",
            letterSpacing: "0.04em",
          }}
        >
          02 / Core Mechanism: Direction-Aware Adaptive Scaling
        </h2>
        <p
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: "0.95rem",
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.62)",
            margin: "0 0 1.5rem",
            textAlign: "justify",
            textJustify: "inter-word",
          }}
        >
          GCO continuously evaluates the directional agreement between the instantaneous gradient <em>g<sub>t</sub></em> and historical momentum <em>m<sub>t</sub></em> via cosine similarity:
        </p>

        {/* Mermaid Diagram */}
        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "8px",
            padding: "2rem 1.5rem",
            margin: "1.5rem 0",
            overflowX: "auto",
          }}
        >
          <div className="mermaid">
{`graph TD
    A[Current Mini-Batch Gradient g_t] --> C[Calculate Cosine Similarity: cos_t = g_t · m_t-1 / ‖g_t‖‖m_t-1‖]
    B[Accumulated Momentum Vector m_t-1] --> C

    C --> D{Directional Gating Evaluation}

    D -->|cos_t > 0: Gradient & Momentum Agree| E[🟢 Alignment Zone: Accelerate Learning Rate]
    D -->|cos_t ≈ 0: Orthogonal Uncertainty| F[⚪ Neutral Zone: Maintain Base Step Size]
    D -->|cos_t < 0: Sharp Directional Conflict| G[🔴 Conflict Zone: Apply Progressive Braking]

    E --> H[Dynamic Scaling Multiplier: γ_t]
    F --> H
    G --> H

    H --> I[Update Parameter State: θ_t+1 = θ_t - γ_t · η · v_t]`}
          </div>
        </div>

        <p
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: "0.85rem",
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.45)",
            margin: "1rem 0 0",
            textAlign: "justify",
          }}
        >
          // Directional scaling prevents catastrophic gradient explosions on sharp curves while boosting convergence speed down smooth ravines.
        </p>
      </section>

      {/* 03 / The Three Regimes */}
      <section style={{ marginBottom: "3.5rem" }}>
        <h2
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: "1.25rem",
            fontWeight: 800,
            color: "#fafaf8",
            margin: "0 0 1.2rem",
            letterSpacing: "0.04em",
          }}
        >
          03 / Optimization Regimes
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem",
          }}
        >
          {[
            {
              title: "🟢 Alignment (Accelerate)",
              desc: "When current gradients point in the same direction as momentum (cos > 0), the optimizer gains confidence that the trajectory is consistent and safely expands step size.",
            },
            {
              title: "🔴 Conflict (Brake)",
              desc: "When gradients suddenly invert against historical momentum (cos < 0), GCO immediately throttles step size to avoid jumping past minimums or overshooting steep ravines.",
            },
            {
              title: "⚪ Uncertainty (Base Step)",
              desc: "When directional correlation is orthogonal (cos ≈ 0), the optimizer operates conservatively near its baseline learning rate until clear curvature trends re-emerge.",
            },
          ].map(({ title, desc }) => (
            <div
              key={title}
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "6px",
                padding: "1.4rem",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <h3
                style={{
                  fontFamily: '"DM Mono", monospace',
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#fafaf8",
                  margin: "0 0 0.6rem",
                  letterSpacing: "0.05em",
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: "0.85rem",
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.55)",
                  margin: 0,
                  textAlign: "justify",
                }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 04 / Built With */}
      <section style={{ marginBottom: "3.5rem" }}>
        <h2
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: "1.25rem",
            fontWeight: 800,
            color: "#fafaf8",
            margin: "0 0 1.2rem",
            letterSpacing: "0.04em",
          }}
        >
          04 / Technical Implementation
        </h2>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {["Python 3.10+", "PyTorch", "Custom torch.optim.Optimizer", "Vectorized Tensor Ops", "Adaptive Momentum", "Cosine Similarity"].map(
            (badge) => (
              <span
                key={badge}
                style={{
                  fontFamily: '"DM Mono", monospace',
                  fontSize: "0.6rem",
                  letterSpacing: "0.08em",
                  color: "rgba(255,255,255,0.6)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "4px",
                  padding: "5px 12px",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                {badge}
              </span>
            )
          )}
        </div>
      </section>

      {/* Footer Nav */}
      <div
        style={{
          marginTop: "6rem",
          paddingTop: "2rem",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <a
          href={backHref}
          style={{
            fontFamily: '"DM Mono", monospace',
            fontSize: "0.62rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
        >
          ← Back to {backSection || "projects"}
        </a>
        <a
          href="/projects/veriq-ai-interview-platform"
          style={{
            fontFamily: '"DM Mono", monospace',
            fontSize: "0.62rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#60A5FA",
            textDecoration: "none",
          }}
        >
          Next: Veriq AI Interview Platform →
        </a>
      </div>
    </div>
  );
}
