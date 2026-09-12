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

export function AgentEvalProjectPage({
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
          color: "rgba(255, 255, 255, 0.35)",
          textDecoration: "none",
          marginBottom: "3.5rem",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.35)")}
      >
        ← Back to {backSection}
      </a>

      {/* Header */}
      <header style={{ marginBottom: "2.5rem" }}>
        <div
          style={{
            fontFamily: '"DM Mono", monospace',
            fontSize: "0.56rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#60A5FA",
            marginBottom: "1rem",
          }}
        >
          AGENTIC SYSTEMS • CAUSAL DIAGNOSIS
        </div>
        <h1
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "0.05em",
            color: "#fafaf8",
            margin: "0 0 1rem",
          }}
        >
          AgentEval - Failure Diagnosis for LLM Agents
        </h1>
        <p
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: "1rem",
            lineHeight: 1.6,
            color: "rgba(255, 255, 255, 0.55)",
            margin: "0 0 1.5rem",
            textAlign: "justify",
          }}
        >
          An evaluation and failure-attribution SDK for complex multi-agent graphs. Captures traces, computes node-level health scores, propagates causal failures across execution topologies, and surfaces exact root causes.
        </p>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1rem" }}>
          <a
            href="https://github.com/Hitesh564/AgentEval"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: '"DM Mono", monospace',
              fontSize: "0.68rem",
              letterSpacing: "0.08em",
              color: "#000",
              background: "#60A5FA",
              fontWeight: 600,
              textDecoration: "none",
              borderRadius: "4px",
              padding: "9px 18px",
            }}
          >
            VIEW REPOSITORY <Github size={14} />
          </a>
        </div>
      </header>

      <div style={{ height: "1px", background: "rgba(255, 255, 255, 0.07)", margin: "2.5rem 0" }} />

      {/* SECTION: WHY THIS EXISTS */}
      <section style={{ marginBottom: "3.5rem" }}>
        <h2
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: "1.15rem",
            fontWeight: 800,
            color: "#fafaf8",
            margin: "0 0 1.2rem",
            letterSpacing: "0.05em",
          }}
        >
          Why This Exists
        </h2>
        <p
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: "0.95rem",
            lineHeight: 1.8,
            color: "rgba(255, 255, 255, 0.62)",
            margin: "0 0 1rem",
            textAlign: "justify",
          }}
        >
          When complex multi-agent systems fail, symptoms often appear downstream far from the actual broken node. Standard logging treats workflows as black-boxes, forcing developers to manually step through massive trace logs to pinpoint what went wrong.
        </p>
        <p
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: "0.95rem",
            lineHeight: 1.8,
            color: "rgba(255, 255, 255, 0.62)",
            margin: "0 0 1rem",
            textAlign: "justify",
          }}
        >
          AgentEval automates this diagnosis. It models the execution as a directed dependency graph, calculates node health from output groundedness and tool contracts, and uses causal propagation to isolate the exact origin of failure.
        </p>
      </section>

      {/* SECTION 01: FROM BLACK-BOX LOGS TO CAUSAL ATTRIBUTION */}
      <section style={{ marginBottom: "3.5rem" }}>
        <h2
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: "1.15rem",
            fontWeight: 800,
            color: "#fafaf8",
            margin: "0 0 1.2rem",
            letterSpacing: "0.05em",
          }}
        >
          01 / From Black-Box Logs to Causal Attribution
        </h2>
        <p
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: "0.95rem",
            lineHeight: 1.8,
            color: "rgba(255, 255, 255, 0.62)",
            margin: "0 0 1rem",
            textAlign: "justify",
          }}
        >
          Standard logging merely flags the final node that crashed or produced garbage. AgentEval walks backwards through execution dependencies, evaluating contract health at each step to isolate the true root cause from cascading downstream failures.
        </p>

        {/* Diagram A: Before */}
        <div
          style={{
            margin: "2rem 0",
            padding: "1.25rem 1.5rem 1.5rem",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "4px",
            background: "transparent",
          }}
        >
          <span
            style={{
              display: "block",
              fontFamily: '"DM Mono", monospace',
              fontSize: "0.56rem",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "rgba(255, 255, 255, 0.4)",
              marginBottom: "1.25rem",
            }}
          >
            Diagnosis — Before (Manual Log Step-Through)
          </span>
          <pre
            className="mermaid"
            style={{
              overflowX: "auto",
              background: "transparent",
              margin: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
{`flowchart LR
    N1[Agent 1: OK] --> N2[Agent 2: Silent Hallucination]
    N2 --> N3[Agent 3: Propagated Error]
    N3 --> N4[Final Output: CRASH / Garbage]
    N4 -.->|Manual Log Inspection 1-2 hrs| BUG[Guess Root Cause]`}
          </pre>
        </div>

        {/* Diagram A: AgentEval */}
        <div
          style={{
            margin: "2rem 0",
            padding: "1.25rem 1.5rem 1.5rem",
            border: "1px solid rgba(96, 165, 250, 0.25)",
            borderRadius: "4px",
            background: "rgba(96, 165, 250, 0.01)",
          }}
        >
          <span
            style={{
              display: "block",
              fontFamily: '"DM Mono", monospace',
              fontSize: "0.56rem",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "#60A5FA",
              marginBottom: "1.25rem",
            }}
          >
            Diagnosis — AgentEval Causal Propagation Engine
          </span>
          <pre
            className="mermaid"
            style={{
              overflowX: "auto",
              background: "transparent",
              margin: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
{`flowchart TD
    TRACE[Execution Trace Graph] --> SCORER[Node-Level Health Scorer]
    SCORER --> CONTRACTS[Tool Schema + Groundedness Check]
    CONTRACTS --> PROPAGATE[Causal Failure Propagation]
    PROPAGATE --> ATTRIBUTION[Root-Cause Isolation: Node 2 Identified]
    ATTRIBUTION --> REPORT[Interactive Causal Chain + Remediation Suggestion]`}
          </pre>
        </div>
      </section>

      {/* SECTION 02: MULTI-TOPOLOGY HEALTH ATTRIBUTION */}
      <section style={{ marginBottom: "3.5rem" }}>
        <h2
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: "1.15rem",
            fontWeight: 800,
            color: "#fafaf8",
            margin: "0 0 1.2rem",
            letterSpacing: "0.05em",
          }}
        >
          02 / Multi-Topology Failure Attribution
        </h2>
        <p
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: "0.95rem",
            lineHeight: 1.8,
            color: "rgba(255, 255, 255, 0.62)",
            margin: "0 0 1rem",
            textAlign: "justify",
          }}
        >
          Agent architectures are rarely strictly linear. AgentEval handles 4 distinct topological structures: linear sequences, branching fan-outs, retry loops, and hierarchical multi-agent handoffs with sibling-scoped ambiguity detection.
        </p>

        <div
          style={{
            margin: "2rem 0",
            padding: "1.25rem 1.5rem 1.5rem",
            border: "1px solid rgba(96, 165, 250, 0.25)",
            borderRadius: "4px",
            background: "rgba(96, 165, 250, 0.01)",
          }}
        >
          <span
            style={{
              display: "block",
              fontFamily: '"DM Mono", monospace',
              fontSize: "0.56rem",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "#60A5FA",
              marginBottom: "1.25rem",
            }}
          >
            Graph Topologies Evaluated
          </span>
          <pre
            className="mermaid"
            style={{
              overflowX: "auto",
              background: "transparent",
              margin: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
{`flowchart LR
    subgraph TOPOLOGIES ["Supported Agent Topologies"]
        direction TB
        T1["Linear Pipeline: A → B → C"]
        T2["Branching Graph: Fan-Out / Aggregation"]
        T3["Retry Loop: Self-Correction Cycles"]
        T4["Multi-Agent Handoff: Hierarchical Dispatch"]
    end
    TOPOLOGIES --> BENCHMARK["ICML 2025 Benchmark Validation"]
    BENCHMARK --> ACCURACY["100% Failure Attribution Accuracy"]`}
          </pre>
        </div>
      </section>

      {/* SECTION 03: PLATFORM ARCHITECTURE */}
      <section style={{ marginBottom: "3.5rem" }}>
        <h2
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: "1.15rem",
            fontWeight: 800,
            color: "#fafaf8",
            margin: "0 0 1.2rem",
            letterSpacing: "0.05em",
          }}
        >
          03 / Ingestion & Deployment Architecture
        </h2>
        <p
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: "0.95rem",
            lineHeight: 1.8,
            color: "rgba(255, 255, 255, 0.62)",
            margin: "0 0 1rem",
            textAlign: "justify",
          }}
        >
          AgentEval operates in both local development mode (SQLite + local runner) and secure hosted deployment (FastAPI backend with API-key hashed authentication and PostgreSQL / Supabase persistence).
        </p>

        <div
          style={{
            margin: "2rem 0",
            padding: "1.25rem 1.5rem 1.5rem",
            border: "1px solid rgba(96, 165, 250, 0.25)",
            borderRadius: "4px",
            background: "rgba(96, 165, 250, 0.01)",
          }}
        >
          <span
            style={{
              display: "block",
              fontFamily: '"DM Mono", monospace',
              fontSize: "0.56rem",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "#60A5FA",
              marginBottom: "1.25rem",
            }}
          >
            System Architecture — SDK to Storage
          </span>
          <pre
            className="mermaid"
            style={{
              overflowX: "auto",
              background: "transparent",
              margin: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
{`flowchart LR
    APP[Agent / LangGraph App] --> SDK[AgentEval SDK Callback]
    SDK --> LOCAL[Local: SQLite Trace Store]
    SDK --> HOSTED[Hosted: HTTPS Ingestion API]
    HOSTED --> FASTAPI[FastAPI Auth + Token Validator]
    FASTAPI --> DB[(PostgreSQL / Supabase)]
    DB --> DASHBOARD[React Diagnostic Dashboard]`}
          </pre>
        </div>
      </section>

      {/* SECTION 04: CORE CAPABILITIES */}
      <section style={{ marginBottom: "3.5rem" }}>
        <h2
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: "1.15rem",
            fontWeight: 800,
            color: "#fafaf8",
            margin: "0 0 1.2rem",
            letterSpacing: "0.05em",
          }}
        >
          04 / Core Capabilities
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem",
            margin: "1.5rem 0",
          }}
        >
          {[
            {
              title: "Causal Failure Propagation",
              desc: "Graph-based health propagation that traces errors back to root causes across branching dependencies.",
            },
            {
              title: "100% Attribution Accuracy",
              desc: "Validated across linear, branching, retry loops, and multi-agent handoffs on benchmark datasets.",
            },
            {
              title: "Claim-Level Groundedness",
              desc: "Evaluates node outputs against tool returns and source documents using LLM judgment.",
            },
            {
              title: "Dual Ingestion Engine",
              desc: "Seamlessly switches from zero-config local SQLite to authenticated hosted PostgreSQL / Supabase.",
            },
          ].map((card, idx) => (
            <div
              key={idx}
              style={{
                padding: "1.2rem",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "4px",
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
              }}
            >
              <span
                style={{
                  fontFamily: '"DM Mono", monospace',
                  fontSize: "0.58rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#60A5FA",
                }}
              >
                // 0{idx + 1}
              </span>
              <span
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  color: "#fafaf8",
                }}
              >
                {card.title}
              </span>
              <p
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 05: BUILT WITH */}
      <section style={{ marginBottom: "3.5rem" }}>
        <h2
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: "1.15rem",
            fontWeight: 800,
            color: "#fafaf8",
            margin: "0 0 1.2rem",
            letterSpacing: "0.05em",
          }}
        >
          05 / Built With
        </h2>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {[
            "Python",
            "FastAPI",
            "SQLAlchemy",
            "Alembic",
            "SQLite / PostgreSQL",
            "LangChain",
            "LiteLLM",
            "React",
          ].map((tech) => (
            <span
              key={tech}
              style={{
                fontFamily: '"DM Mono", monospace',
                fontSize: "0.65rem",
                letterSpacing: "0.06em",
                color: "rgba(255,255,255,0.8)",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "3px",
                padding: "6px 12px",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* SECTION 06: ENGINEERING NOTES */}
      <section style={{ marginBottom: "5rem" }}>
        <h2
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: "1.15rem",
            fontWeight: 800,
            color: "#fafaf8",
            margin: "0 0 1.2rem",
            letterSpacing: "0.05em",
          }}
        >
          06 / What an Engineer Should Take Away
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[
            {
              heading: "Failures Compound Across Multi-Agent Handoffs",
              text: "A slight semantic hallucination at node 1 frequently causes a catastrophic syntax crash at node 4. Diagnosing without dependency graph awareness yields false positives on the symptom rather than the cause.",
            },
            {
              heading: "Sibling-Scoped Ambiguity Resolution",
              text: "In parallel fan-out graphs, determining which sibling branch corrupted the joint context requires scoping attribution to execution subtrees.",
            },
            {
              heading: "Local-First with Zero Overhead Ingestion",
              text: "An evaluation SDK must be easy to run in unit tests via local SQLite while supporting asynchronous API streaming for production fleet monitoring.",
            },
          ].map((note, idx) => (
            <div
              key={idx}
              style={{
                padding: "1rem 1.2rem",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "4px",
              }}
            >
              <div
                style={{
                  fontFamily: '"DM Mono", monospace',
                  fontSize: "0.72rem",
                  color: "#60A5FA",
                  letterSpacing: "0.06em",
                  marginBottom: "0.4rem",
                }}
              >
                // {note.heading}
              </div>
              <p
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: "0.88rem",
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {note.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <div
        style={{
          marginTop: "6rem",
          paddingTop: "2rem",
          borderTop: "1px solid rgba(255, 255, 255, 0.07)",
          fontFamily: '"DM Mono", monospace',
          fontSize: "0.58rem",
          letterSpacing: "0.12em",
          color: "rgba(255, 255, 255, 0.25)",
          textTransform: "uppercase",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <a
          href="/#projects"
          style={{
            color: "rgba(255,255,255,0.4)",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#fafaf8")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
        >
          ← All Projects
        </a>
        <span>© 2026 Hitesh Jindal • AI & ML Engineer</span>
      </div>
    </div>
  );
}
