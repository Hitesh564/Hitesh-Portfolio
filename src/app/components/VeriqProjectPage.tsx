import { useEffect, useRef } from "react";
import { m } from "motion/react";
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

export function VeriqProjectPage({
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
            color: "#4ade80",
            marginBottom: "1rem",
          }}
        >
          AI SYSTEMS • REAL-TIME VOICE
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
          Veriq - AI Interview Platform
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
          An interviewer that remembers what you said — and knows what to ask next. Stateful AI interview intelligence platform combining adaptive questioning, claim verification, real-time voice orchestration, and evidence-grounded evaluation.
        </p>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1rem" }}>
          <a
            href="https://veriq-flax.vercel.app"
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
              background: "#4ade80",
              fontWeight: 600,
              textDecoration: "none",
              borderRadius: "4px",
              padding: "9px 18px",
            }}
          >
            OPEN LIVE PRODUCT <ArrowUpRight size={14} />
          </a>
          <a
            href="https://github.com/Hitesh564/Veriq"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: '"DM Mono", monospace',
              fontSize: "0.68rem",
              letterSpacing: "0.08em",
              color: "#fff",
              background: "rgba(255,255,255,0.04)",
              fontWeight: 600,
              textDecoration: "none",
              borderRadius: "4px",
              padding: "9px 18px",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            SOURCE CODE <Github size={14} />
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
          Most mock interview platforms ask static, pre-scripted questions and return generic scores. They do not adapt meaningfully to candidate responses, track interview state properly, or verify technical claims deeply.
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
          Veriq was designed to make the interview behave more like an experienced human interviewer: understanding what the candidate has said, deciding what should be probed or advanced next, and evaluating answers using collected evidence.
        </p>
      </section>

      {/* SECTION 01: FROM SCRIPTED QUESTIONS TO ADAPTIVE REASONING */}
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
          01 / From Scripted Questions to Adaptive Reasoning
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
          Traditional mock platforms follow a rigid, linear question list without evaluating candidate depth. Veriq uses a stateful reasoning loop: every candidate response is evaluated against interview objectives to determine whether to probe, clarify, or advance to the next technical topic.
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
            Workflow — Before (Scripted Question Queue)
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
    Q1[Question 01] --> Q2[Question 02]
    Q2 --> Q3[Question 03]
    Q3 --> Q4[Question 04]
    Q4 --> GEN[Generic Result]`}
          </pre>
        </div>

        {/* Diagram A: Veriq */}
        <div
          style={{
            margin: "2rem 0",
            padding: "1.25rem 1.5rem 1.5rem",
            border: "1px solid rgba(74, 222, 128, 0.2)",
            borderRadius: "4px",
            background: "rgba(74, 222, 128, 0.01)",
          }}
        >
          <span
            style={{
              display: "block",
              fontFamily: '"DM Mono", monospace',
              fontSize: "0.56rem",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "#4ade80",
              marginBottom: "1.25rem",
            }}
          >
            Workflow — Veriq Adaptive Reasoning Loop
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
    ANS[Candidate Answer] --> EXTRACT[Claims & Topics Extraction]
    EXTRACT --> STATE[Coverage + Evidence State]
    STATE --> DECIDE{Decision Node}
    DECIDE -->|Need Depth| PROBE[Probe Claim / Clarify]
    DECIDE -->|Sufficient Evidence| ADVANCE[Move to Next Objective]
    DECIDE -->|Coverage Met| WRAP[Wrap Up Stage]
    PROBE --> NEXT[Next Context-Aware Question]
    ADVANCE --> NEXT
    WRAP --> NEXT
    NEXT -->|Candidate Responds| ANS`}
          </pre>
        </div>
      </section>

      {/* SECTION 02: FROM A SCORE TO EVIDENCE */}
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
          02 / From a Score to Evidence
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
          Instead of passing the entire transcript into a single LLM prompt to generate an arbitrary numerical score, Veriq decomposes the session into extracted claims, grounds each competency against concrete transcript evidence, and compiles an auditable evaluation report.
        </p>

        {/* Diagram B: Before */}
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
            Evaluation Flow — Before (Opaque Prompt Score)
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
    TR[Raw Transcript] --> LLM[LLM Prompt]
    LLM --> SCORE[Generic Score / Impression]`}
          </pre>
        </div>

        {/* Diagram B: Veriq */}
        <div
          style={{
            margin: "2rem 0",
            padding: "1.25rem 1.5rem 1.5rem",
            border: "1px solid rgba(74, 222, 128, 0.2)",
            borderRadius: "4px",
            background: "rgba(74, 222, 128, 0.01)",
          }}
        >
          <span
            style={{
              display: "block",
              fontFamily: '"DM Mono", monospace',
              fontSize: "0.56rem",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "#4ade80",
              marginBottom: "1.25rem",
            }}
          >
            Evaluation Flow — Veriq Evidence-Grounded Pipeline
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
    TR[Session Transcript] --> CLAIMS[Claims & Responses Decomposition]
    CLAIMS --> EVIDENCE[Evidence Matching & Attribution]
    EVIDENCE --> DIM[Multi-Dimension Competency Evaluation]
    DIM --> STRENGTHS[Strengths & Gaps Analysis]
    DIM --> MATRIX[Verification Matrix & Learning Priorities]
    STRENGTHS --> REPORT[Final Recruiter-Grade Audit Report]
    MATRIX --> REPORT`}
          </pre>
        </div>
      </section>

      {/* SECTION 03: REAL-TIME INTERVIEW PIPELINE */}
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
          03 / Real-Time Interview Pipeline
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
          A voice interviewer requires coordinated streaming across speech recognition, state orchestration, and voice synthesis. The pipeline maintains turn-by-turn conversational state while streaming sentences to keep latency natural.
        </p>

        {/* Diagram C: Pipeline Architecture */}
        <div
          style={{
            margin: "2rem 0",
            padding: "1.25rem 1.5rem 1.5rem",
            border: "1px solid rgba(74, 222, 128, 0.2)",
            borderRadius: "4px",
            background: "rgba(74, 222, 128, 0.01)",
          }}
        >
          <span
            style={{
              display: "block",
              fontFamily: '"DM Mono", monospace',
              fontSize: "0.56rem",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "#4ade80",
              marginBottom: "1.25rem",
            }}
          >
            Architecture — End-to-End Voice Orchestration Pipeline
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
    VOICE_IN[Candidate Voice] --> STT[Whisper STT]
    STT --> TR[Transcript Tokenizer]
    TR --> STATE[Context + Interview State]
    STATE --> AGENT[LLM Interview Agent]
    AGENT --> RESP[Sentence Token Stream]
    RESP --> TTS[TTS Synthesis Pipeline]
    TTS --> VOICE_OUT[Interviewer Voice]`}
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
              title: "Adaptive Questioning",
              desc: "Dynamically plans the next probe based on candidate answers and interview objectives.",
            },
            {
              title: "Claim Verification",
              desc: "Probes specific technical claims to verify genuine practical depth.",
            },
            {
              title: "Stateful Interview Flow",
              desc: "Maintains stage progression, topic coverage history, and turn memory across the session.",
            },
            {
              title: "Evidence-Grounded Evaluation",
              desc: "Evaluates candidates using concrete transcript evidence rather than subjective impressions.",
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
                  color: "#4ade80",
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
            "Next.js",
            "FastAPI",
            "LangGraph",
            "Gemini",
            "PostgreSQL",
            "Supabase",
            "WebSockets",
            "STT / TTS",
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
              heading: "State Graphs over Context Stuffing",
              text: "Stuffing long raw transcripts into every LLM prompt leads to lost context and erratic question transitions. Maintaining structured interview state (stages, covered topics, verified claims) produces consistent conversational flow.",
            },
            {
              heading: "Evidence Grounding over Black-Box Scoring",
              text: "Interview evaluation requires concrete justification. Linking dimension scores directly to verified transcript excerpts turns subjective impressions into reproducible assessments.",
            },
            {
              heading: "Streaming Latency in Conversational AI",
              text: "In voice systems, sentence-level streaming pipelines directly determine whether the interaction feels like a natural conversation or a series of awkward pauses.",
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
                  color: "#4ade80",
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
