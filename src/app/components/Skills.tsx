import { m } from "motion/react";
import { useIsMobile } from "../../hooks/useMediaQuery";

const FONT_SERIF = '"Playfair Display", Georgia, serif';
const FONT_MONO = '"DM Mono", monospace';
const FONT_SANS = '"DM Sans", sans-serif';

type Unit = { f: string; chip?: boolean; filter?: boolean };
type Tech = {
  n: string;
  f?: string;
  parts?: Unit[];
  brk?: string;
  chip?: boolean;
  filter?: boolean;
};
type Category = { label: string; color: string; techs: Tech[] };

const C = {
  lang: "#a78bfa",
  backend: "#10b981",
  data: "#60a5fa",
  ai: "#f5ca40",
  cloud: "#22d3ee",
};

const CATEGORIES: Category[] = [
  {
    label: "Languages",
    color: C.lang,
    techs: [
      { n: "Python", f: "python.svg", brk: "PyTorch · LangGraph" },
      {
        n: "C / C++",
        parts: [{ f: "c.svg" }, { f: "cplusplus.svg" }],
        brk: "Data Structures & Algos",
      },
      {
        n: "SQL / MySQL",
        parts: [{ f: "postgresql.svg" }, { f: "mysql.svg" }],
        brk: "PostgreSQL · SQLite",
      },
      { n: "TypeScript", f: "typescript.svg", brk: "Next.js · Frontend" },
    ],
  },
  {
    label: "Backend & Systems",
    color: C.backend,
    techs: [
      { n: "FastAPI", f: "fastapi.svg", brk: "REST APIs & WebSockets" },
      { n: "Redis", f: "redis.svg", brk: "Caching & Sessions" },
      { n: "Observability", parts: [{ f: "grafana.svg" }, { f: "prometheus.svg" }], brk: "Metrics & Logs" },
    ],
  },
  {
    label: "Data & Storage",
    color: C.data,
    techs: [
      {
        n: "SQL Databases",
        parts: [{ f: "postgresql.svg" }, { f: "mysql.svg" }],
        brk: "Schema Design & Optimization",
      },
      {
        n: "Vector DBs",
        parts: [{ f: "qdrant.svg" }, { f: "chroma.svg" }],
        brk: "Qdrant · Chroma Search",
      },
    ],
  },
  {
    label: "AI & ML Systems",
    color: C.ai,
    techs: [
      {
        n: "Agents & Orchestration",
        parts: [{ f: "langgraph.svg" }, { f: "langchain.svg" }],
        brk: "LangGraph · LangChain",
      },
      {
        n: "Deep Learning & ViT",
        parts: [{ f: "pytorch.svg" }, { f: "huggingface.svg" }],
        brk: "PyTorch · RETFound ViT",
      },
      {
        n: "Local LLMs & Fine-Tuning",
        parts: [{ f: "ollama.svg" }, { f: "unsloth.png" }],
        brk: "Ollama · LoRA Tuning",
      },
      {
        n: "RAG & Semantic Retrieval",
        f: "tb-components.svg",
        brk: "Dense & Sparse Search",
      },
      {
        n: "AgentEval & SHAP",
        parts: [{ f: "tb-shield-check.svg" }, { f: "tb-gauge.svg" }],
        brk: "Failure Attribution & XAI",
      },
    ],
  },
  {
    label: "Cloud & DevOps",
    color: C.cloud,
    techs: [
      {
        n: "Cloud Platforms",
        parts: [{ f: "azure.svg" }, { f: "aws.svg" }],
        brk: "Azure · AWS Cloud",
      },
      {
        n: "Containers & Orch",
        parts: [{ f: "docker.svg" }, { f: "kubernetes.svg" }],
        brk: "Docker · Kubernetes",
      },
      {
        n: "CI / CD & Versioning",
        parts: [{ f: "githubactions.svg" }, { f: "github.svg" }],
        brk: "Automated Workflows",
      },
    ],
  },
];

function Icon({ u, size }: { u: Unit; size: number }) {
  if (u.chip) {
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
          borderRadius: "6px",
          padding: "3px",
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        <img
          src={`/logos/${u.f}`}
          alt=""
          loading="lazy"
          decoding="async"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            display: "block",
          }}
        />
      </span>
    );
  }
  return (
    <img
      src={`/logos/${u.f}`}
      alt=""
      loading="lazy"
      decoding="async"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        objectFit: "contain",
        display: "block",
        filter: u.filter ? "brightness(0) invert(1)" : undefined,
      }}
    />
  );
}

function Tile({ t, isMobile }: { t: Tech; isMobile: boolean }) {
  const units: Unit[] = t.parts ?? [
    { f: t.f!, chip: t.chip, filter: t.filter },
  ];
  const size = t.parts ? 30 : 38;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        width: isMobile ? "96px" : "112px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
          justifyContent: "center",
          height: "44px",
        }}
      >
        {units.map((u, i) => (
          <Icon key={i} u={u} size={size} />
        ))}
      </div>
      <div
        style={{
          fontFamily: FONT_SANS,
          fontSize: "0.78rem",
          fontWeight: 500,
          color: "rgba(255,255,255,0.7)",
          textAlign: "center",
          lineHeight: 1.35,
        }}
      >
        {t.n}
        {t.brk && (
          <span
            style={{
              display: "block",
              fontFamily: FONT_MONO,
              color: "rgba(255,255,255,0.35)",
              fontSize: "0.58rem",
              marginTop: "3px",
              letterSpacing: "0.02em",
            }}
          >
            {t.brk}
          </span>
        )}
      </div>
    </div>
  );
}

export function Skills() {
  const isMobile = useIsMobile();

  return (
    <section
      id="stack"
      style={{
        padding: isMobile ? "4rem 4vw" : "4rem 6vw 10rem",
        background: "transparent",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: isMobile ? "3rem" : "5rem",
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
          Stack
        </span>
        <div
          style={{
            flex: 1,
            height: "1px",
            background: "rgba(255,255,255,0.07)",
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 2.4fr",
          gap: isMobile ? "4rem" : "6vw",
          alignItems: "start",
        }}
      >
        {/* LEFT - sticky heading */}
        <div
          style={{
            position: isMobile ? "relative" : "sticky",
            top: isMobile ? "0" : "6rem",
            marginBottom: isMobile ? "2rem" : "0",
          }}
        >
          <div style={{ overflow: "hidden" }}>
            <m.h2
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              style={{
                fontFamily: FONT_SERIF,
                fontSize: isMobile
                  ? "clamp(1.8rem, 7vw, 3.5rem)"
                  : "clamp(2.4rem, 4.2vw, 3.8rem)",
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: "0.02em",
                color: "#fafaf8",
                margin: "0 0 1.2rem",
              }}
            >
              What I run in production.
            </m.h2>
          </div>
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              fontFamily: FONT_SANS,
              fontSize: "0.88rem",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.48)",
              maxWidth: "280px",
            }}
          >
            Profiled under load. Not just imported.
          </m.p>
        </div>

        {/* RIGHT - tech stack by category */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {CATEGORIES.map((cat, ci) => (
            <div
              key={cat.label}
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: isMobile ? "1.5rem" : "28px",
                alignItems: isMobile ? "center" : "flex-start",
                padding: ci === 0 ? "0 0 32px" : "32px 0",
                borderTop:
                  ci === 0 ? "none" : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: "0.64rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: cat.color,
                  width: isMobile ? "100%" : "140px",
                  flexShrink: 0,
                  lineHeight: 1.5,
                  paddingTop: "8px",
                  textAlign: isMobile ? "center" : "left",
                }}
              >
                {cat.label}
              </div>
              <div
                style={
                  isMobile
                    ? {
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: "24px 16px",
                        width: "100%",
                      }
                    : { display: "flex", flexWrap: "wrap", gap: "24px 28px" }
                }
              >
                {cat.techs.map((t) => (
                  <Tile key={t.n} t={t} isMobile={isMobile} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
