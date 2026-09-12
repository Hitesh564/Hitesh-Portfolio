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

export function RetinalProjectPage({
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
            color: "#EAB308",
            marginBottom: "1rem",
          }}
        >
          MEDICAL AI • EXPLAINABLE VISION TRANSFORMERS
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
          Retinal Age Gap Prediction & Biomarker Analysis
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
          An explainable medical AI framework predicting biological age from 23,000+ retinal fundus images using RETFound Vision Transformers, Frangi vascular biomarker extraction, and SHAP interpretability.
        </p>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1rem" }}>
          <a
            href="https://github.com/Hitesh564/Retinal-Age-Gap"
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
              background: "#EAB308",
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
          The retina is the only microvascular bed that can be directly visualized non-invasively. Differences between a person's biological retinal age and chronological age (the Retinal Age Gap) correlate strongly with systemic cardiovascular and neurological health risks.
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
          However, standard deep learning models act as uninterpretable black boxes in clinical environments. This project builds a transparent pipeline combining foundation Vision Transformers (RETFound) with vascular morphology extraction (Frangi filtering) and SHAP feature attribution.
        </p>
      </section>

      {/* SECTION 01: FROM OPAQUE CNN PREDICTION TO EXPLAINABLE RETINAL BIOMARKERS */}
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
          01 / From Opaque CNN Prediction to Explainable Biomarkers
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
          Standard CNN age regressors output a single number without indicating which retinal features (e.g., vessel density, tortuosity, caliber narrowing) influenced the decision. Our hybrid pipeline isolates clinical biomarkers and attributes predictions directly.
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
            Workflow — Before (Black-Box CNN Age Regression)
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
    FUNDUS[Retinal Fundus Image] --> CNN[Standard CNN Backbone]
    CNN --> AGE[Predicted Age Output]
    AGE -.->|No Clinical Transparency| OPAQUE[Clinician Cannot Verify Reason]`}
          </pre>
        </div>

        {/* Diagram A: Retinal Pipeline */}
        <div
          style={{
            margin: "2rem 0",
            padding: "1.25rem 1.5rem 1.5rem",
            border: "1px solid rgba(234, 179, 8, 0.25)",
            borderRadius: "4px",
            background: "rgba(234, 179, 8, 0.01)",
          }}
        >
          <span
            style={{
              display: "block",
              fontFamily: '"DM Mono", monospace',
              fontSize: "0.56rem",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "#EAB308",
              marginBottom: "1.25rem",
            }}
          >
            Workflow — Explainable RETFound + Biomarker Pipeline
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
    FUNDUS[Retinal Fundus Image 23K+ Dataset] --> PREPROC[Preprocessing: CLAHE + Quality Filter]
    PREPROC --> VIT[RETFound Vision Transformer Embeddings]
    PREPROC --> FRANGI[Frangi Filter Vessel Segmentation]
    FRANGI --> MORPH[Vascular Biomarkers: Tortuosity, Density, Caliber]
    VIT --> HYBRID[Hybrid XGBoost Regressor]
    MORPH --> HYBRID
    HYBRID --> RAG[Retinal Age Gap: Predicted Age - Chronological Age]
    HYBRID --> SHAP[SHAP Feature Importance & Clinical Attribution]`}
          </pre>
        </div>
      </section>

      {/* SECTION 02: DATASET & PREPROCESSING SCALE */}
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
          02 / 23,000+ Multi-Cohort Preprocessing Pipeline
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
          The pipeline was developed across diverse cohorts including BRSET and ODIR-5K, enforcing rigorous image quality gating, CLAHE contrast equalization, and multi-scale vascular enhancement.
        </p>

        <div
          style={{
            margin: "2rem 0",
            padding: "1.25rem 1.5rem 1.5rem",
            border: "1px solid rgba(234, 179, 8, 0.25)",
            borderRadius: "4px",
            background: "rgba(234, 179, 8, 0.01)",
          }}
        >
          <span
            style={{
              display: "block",
              fontFamily: '"DM Mono", monospace',
              fontSize: "0.56rem",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "#EAB308",
              marginBottom: "1.25rem",
            }}
          >
            End-to-End Image & Metadata Ingestion Flow
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
    RAW[Raw Cohorts: BRSET + ODIR-5K] --> CLEAN[Quality Filter & Metadata Alignment]
    CLEAN --> CLAHE[CLAHE Illumination Normalization]
    CLEAN --> AUG[Medical Data Augmentation]
    CLAHE --> SPLIT[Stratified Patient Train / Val / Test Split]
    AUG --> SPLIT
    SPLIT --> EMBED[RETFound Pretrained ViT Extraction]`}
          </pre>
        </div>
      </section>

      {/* SECTION 03: VASCULAR BIOMARKER & EXPLAINABILITY */}
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
          03 / Vascular Biomarker Extraction & SHAP Attribution
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
          Vessel segmentation via Frangi filtering extracts clinical morphometrics including vessel density, fractal dimension, and branching angles. SHAP explains the exact contribution of each biomarker to the Retinal Age Gap.
        </p>

        <div
          style={{
            margin: "2rem 0",
            padding: "1.25rem 1.5rem 1.5rem",
            border: "1px solid rgba(234, 179, 8, 0.25)",
            borderRadius: "4px",
            background: "rgba(234, 179, 8, 0.01)",
          }}
        >
          <span
            style={{
              display: "block",
              fontFamily: '"DM Mono", monospace',
              fontSize: "0.56rem",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "#EAB308",
              marginBottom: "1.25rem",
            }}
          >
            Explainability Workflow
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
    SEG[Segmented Vessels] --> SKELETON[Skeletonization & Graph Analysis]
    SKELETON --> METRICS[Tortuosity + Density + Caliber Index]
    METRICS --> SHAP_ENGINE[SHAP TreeExplainer]
    SHAP_ENGINE --> CLINICAL[Clinician Risk Report & Feature Ranking]`}
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
              title: "RETFound ViT Backbone",
              desc: "Leverages retinal foundation models pretrained on massive ophthalmic datasets for robust feature embeddings.",
            },
            {
              title: "Frangi Vascular Extraction",
              desc: "Multi-scale Hessian vessel enhancement for robust segmentation across varying retinal illumination.",
            },
            {
              title: "SHAP Explainability",
              desc: "Quantifies individual biomarker impacts on biological age estimates to provide clinical auditability.",
            },
            {
              title: "Retinal Age Gap Analysis",
              desc: "Computes delta biological age (Predicted - Chronological) as a non-invasive systemic risk biomarker.",
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
                  color: "#EAB308",
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
            "PyTorch",
            "Torchvision",
            "RETFound (ViT)",
            "Frangi Filtering",
            "scikit-image",
            "XGBoost",
            "SHAP",
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
              heading: "Foundation Models Outperform Standard CNNs in Medical Scarcity",
              text: "RETFound's self-supervised pretraining on 1.6M retinal images captures subtle microvascular textures that standard ImageNet-pretrained CNNs overlook.",
            },
            {
              heading: "Hybrid Architectures Ensure Clinical Transparency",
              text: "Coupling high-dimensional ViT representations with explicit morphological features (vessel caliber, tortuosity) bridges deep learning performance with clinician interpretability.",
            },
            {
              heading: "Cohort Stratification and Quality Filtering",
              text: "In retinal fundus analysis across multiple cameras and clinical sites, contrast equalization (CLAHE) and quality gating prevent artifact-driven spurious age correlations.",
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
                  color: "#EAB308",
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
