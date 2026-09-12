import { useEffect, useRef, useState, useCallback } from "react";
import { m, AnimatePresence } from "motion/react";
import { useIsMobile, useIsTouchDevice } from "../../hooks/useMediaQuery";

const FONT_MONO = '"DM Mono", monospace';
const FONT_SERIF = '"Editorial New", "Playfair Display", Georgia, serif';
const FONT_SANS = '"DM Sans", sans-serif';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  originX: number;
  originY: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  color: string;
  isSpecial?: boolean;
  orbitAngle?: number;
  orbitSpeed?: number;
  orbitRadius?: number;
  pulsePhase?: number;
  glitchTimer?: number;
}

interface EasterEggSnippet {
  id: number;
  text: string;
  x: number;
  y: number;
  opacity: number;
}

const SNIPPETS = [
  "signal detected",
  "trace active",
  "pattern unstable",
  "hello, curious human",
  "keep exploring",
  "neural sync 98%",
];

export function HeroCuriosityField({
  photoUrl = "/hitesh_avatar.png",
}: {
  photoUrl?: string;
}) {
  const isMobile = useIsMobile();
  const isTouch = useIsTouchDevice();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Reveal states: 0 = hidden, 1 = engaging (near hidden node), 2 = fully revealed
  const [revealProgress, setRevealProgress] = useState<number>(0);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [showScrollCue, setShowScrollCue] = useState<boolean>(false);
  const [snippets, setSnippets] = useState<EasterEggSnippet[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>("SYSTEM IDLE // FIELD ACTIVE");

  // Interaction refs
  const mousePos = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });
  const revealProgressRef = useRef<number>(0);
  const isRevealedRef = useRef<boolean>(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSnippetTimeRef = useRef<number>(0);

  // Keep refs in sync
  useEffect(() => {
    revealProgressRef.current = revealProgress;
  }, [revealProgress]);

  useEffect(() => {
    isRevealedRef.current = isRevealed;
    if (isRevealed) {
      const t = setTimeout(() => setShowScrollCue(true), 1200);
      return () => clearTimeout(t);
    } else {
      setShowScrollCue(false);
    }
  }, [isRevealed]);

  // Main canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1));
    let height = (canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1));

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
      height = canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);
    };
    window.addEventListener("resize", handleResize);

    // Color palette: cyan, teal, warm gold/amber, off-white
    const colors = [
      "rgba(34, 211, 238, ", // cyan
      "rgba(45, 212, 191, ", // teal
      "rgba(245, 158, 11, ", // amber
      "rgba(232, 224, 208, ", // off-white
      "rgba(148, 163, 184, ", // slate
    ];

    const count = isMobile ? 48 : 84;
    const particles: Particle[] = [];

    // Special Hidden Node location (placed slightly off-center top-right quadrant for discovery)
    const specialTargetNorm = { x: 0.52, y: 0.44 };

    for (let i = 0; i < count; i++) {
      const isSpecial = i === 0;
      const x = isSpecial ? width * specialTargetNorm.x : Math.random() * width;
      const y = isSpecial ? height * specialTargetNorm.y : Math.random() * height;
      const baseAlpha = isSpecial ? 0.95 : 0.2 + Math.random() * 0.55;
      const color = isSpecial
        ? "rgba(34, 211, 238, "
        : colors[Math.floor(Math.random() * colors.length)];

      particles.push({
        x,
        y,
        originX: x,
        originY: y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: isSpecial ? 3.5 : 1.2 + Math.random() * 2,
        alpha: baseAlpha,
        baseAlpha,
        color,
        isSpecial,
        orbitAngle: Math.random() * Math.PI * 2,
        orbitSpeed: (Math.random() - 0.5) * 0.015,
        orbitRadius: 15 + Math.random() * 35,
        pulsePhase: Math.random() * Math.PI * 2,
        glitchTimer: 0,
      });
    }

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      const dpr = window.devicePixelRatio || 1;
      const mx = mousePos.current.x * dpr;
      const my = mousePos.current.y * dpr;
      const mActive = mousePos.current.active;

      const specialP = particles[0];
      const distToSpecial = mActive
        ? Math.hypot(mx - specialP.x, my - specialP.y) / dpr
        : 999;

      // Special node proximity check
      const triggerDist = isMobile ? 85 : 65;
      const nearDist = isMobile ? 140 : 110;

      if (distToSpecial < triggerDist) {
        if (!isRevealedRef.current) {
          setIsRevealed(true);
          setStatusMessage("IDENTITY RESOLVED // SIGNAL LOCKED");
        }
      }

      // Smoothly update reveal progress
      const targetProgress = isRevealedRef.current
        ? 1
        : distToSpecial < nearDist
        ? (1 - (distToSpecial - triggerDist) / (nearDist - triggerDist)) * 0.4
        : 0;

      revealProgressRef.current += (targetProgress - revealProgressRef.current) * 0.08;
      setRevealProgress(revealProgressRef.current);

      const rev = revealProgressRef.current;
      const clearCenterX = width * specialTargetNorm.x;
      const clearCenterY = height * specialTargetNorm.y;
      const clearRadius = (isMobile ? 120 : 145) * dpr * rev;

      // Draw faint connections between nearby particles (except inside cleared space)
      ctx.lineWidth = 0.6 * dpr;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const d = Math.hypot(dx, dy);
          const maxD = (isMobile ? 55 : 75) * dpr;

          if (d < maxD) {
            // Check if inside photo cleared area
            const midX = (p1.x + p2.x) / 2;
            const midY = (p1.y + p2.y) / 2;
            const dToClear = Math.hypot(midX - clearCenterX, midY - clearCenterY);

            if (dToClear > clearRadius * 0.8) {
              const lineAlpha = (1 - d / maxD) * 0.15 * (1 - rev * 0.4);
              ctx.strokeStyle = `rgba(232, 224, 208, ${lineAlpha})`;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }

      // Update & Draw Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Ambient gentle drift & orbit
        p.pulsePhase = (p.pulsePhase || 0) + 0.025;
        p.orbitAngle = (p.orbitAngle || 0) + (p.orbitSpeed || 0.005);

        let targetX = p.originX + Math.cos(p.orbitAngle) * (p.orbitRadius || 10) * dpr;
        let targetY = p.originY + Math.sin(p.orbitAngle) * (p.orbitRadius || 10) * dpr;

        // Repel from photo clearing when reveal happens
        if (rev > 0.01) {
          const dToClear = Math.hypot(targetX - clearCenterX, targetY - clearCenterY);
          if (dToClear < clearRadius + 40 * dpr) {
            const angle = Math.atan2(targetY - clearCenterY, targetX - clearCenterX);
            const push = (clearRadius + 40 * dpr - dToClear) * 1.1;
            targetX += Math.cos(angle) * push;
            targetY += Math.sin(angle) * push;
          }
        }

        // Mouse interaction (repel / slight trail)
        if (mActive) {
          const dx = targetX - mx;
          const dy = targetY - my;
          const dist = Math.hypot(dx, dy) / dpr;
          const maxMouseDist = 90;

          if (dist < maxMouseDist && dist > 0.1) {
            const force = (1 - dist / maxMouseDist) * 32 * dpr;
            targetX += (dx / dist) * force;
            targetY += (dy / dist) * force;

            // Trigger rare Easter egg text snippet near curious cursor explorations
            if (
              !isRevealedRef.current &&
              Date.now() - lastSnippetTimeRef.current > 3500 &&
              Math.random() < 0.03
            ) {
              lastSnippetTimeRef.current = Date.now();
              const text = SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)];
              const id = Date.now();
              setSnippets((prev) => [
                ...prev.slice(-2),
                { id, text, x: mousePos.current.x, y: mousePos.current.y, opacity: 1 },
              ]);
              setTimeout(() => {
                setSnippets((prev) => prev.filter((s) => s.id !== id));
              }, 1600);
            }
          }
        }

        // Smooth position easing
        p.x += (targetX - p.x) * 0.06;
        p.y += (targetY - p.y) * 0.06;

        // Draw particle
        let pulse = Math.sin(p.pulsePhase) * 0.25;
        let pAlpha = Math.max(0.1, Math.min(1, p.baseAlpha + pulse));

        if (p.isSpecial) {
          // Special Node has unique radiant breathing glow and ripple
          const specGlow = 0.7 + Math.sin(frame * 0.06) * 0.3;
          ctx.shadowColor = "rgba(34, 211, 238, 0.9)";
          ctx.shadowBlur = (10 + Math.sin(frame * 0.08) * 6) * dpr;

          ctx.fillStyle = `rgba(34, 211, 238, ${specGlow})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * dpr * (1 + rev * 0.5), 0, Math.PI * 2);
          ctx.fill();

          // Outer faint halo pulse
          if (rev < 0.8) {
            const haloR = (12 + Math.sin(frame * 0.04) * 5) * dpr;
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.25 * (1 - rev)})`;
            ctx.lineWidth = 1 * dpr;
            ctx.beginPath();
            ctx.arc(p.x, p.y, haloR, 0, Math.PI * 2);
            ctx.stroke();
          }

          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = `${p.color}${pAlpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * dpr, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  // Handle Mouse / Touch interactions
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch) return;
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handleMouseLeave = () => {
    mousePos.current.active = false;
    // Auto reset back to mysterious field after 3.2s inactivity
    if (isRevealed) {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        setIsRevealed(false);
        setStatusMessage("SYSTEM IDLE // FIELD ACTIVE");
      }, 3200);
    }
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // For touch / click exploration: toggle or trigger reveal
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mousePos.current = { x, y, active: true };

    if (!isRevealed) {
      setIsRevealed(true);
      setStatusMessage("IDENTITY RESOLVED // SIGNAL LOCKED");
    } else {
      setIsRevealed(false);
      setStatusMessage("SYSTEM IDLE // FIELD ACTIVE");
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleContainerClick}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: isMobile ? "340px" : "440px",
        aspectRatio: "1 / 1",
        margin: isMobile ? "0 auto" : "0 0 0 auto",
        borderRadius: "8px",
        border: "1px solid rgba(255,255,255,0.08)",
        background: "radial-gradient(circle at 50% 50%, rgba(18,22,28,0.7) 0%, rgba(6,7,9,0.95) 100%)",
        boxShadow: "0 20px 50px rgba(0,0,0,0.7), inset 0 0 40px rgba(0,0,0,0.5)",
        overflow: "hidden",
        cursor: "crosshair",
        userSelect: "none",
      }}
      aria-label="Interactive Curiosity Signal Field - Explore to discover identity"
    >
      {/* HUD Header Bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          background: "rgba(6,7,9,0.4)",
          backdropFilter: "blur(6px)",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: isRevealed ? "#22d3ee" : "#10b981",
              boxShadow: `0 0 6px ${isRevealed ? "#22d3ee" : "#10b981"}`,
              animation: "pulse 2s infinite",
            }}
          />
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: "0.56rem",
              letterSpacing: "0.14em",
              color: isRevealed ? "#22d3ee" : "rgba(255,255,255,0.45)",
              textTransform: "uppercase",
            }}
          >
            {isRevealed ? "SIG // NODE_01 UNLOCKED" : "SIGNAL FIELD // 0.84 GHZ"}
          </span>
        </div>

        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: "0.52rem",
            letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.3)",
            textTransform: "uppercase",
          }}
        >
          {isMobile ? "TAP TO DISCOVER" : "HOVER TO DISCOVER"}
        </span>
      </div>

      {/* Background Interactive Particle Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 2,
        }}
      />

      {/* Floating Micro Easter Egg Snippets */}
      <AnimatePresence>
        {snippets.map((snip) => (
          <m.div
            key={snip.id}
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 0.85, y: -8, scale: 1 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6 }}
            style={{
              position: "absolute",
              left: snip.x,
              top: snip.y,
              transform: "translate(-50%, -100%)",
              fontFamily: FONT_MONO,
              fontSize: "0.58rem",
              color: "#22d3ee",
              background: "rgba(6,7,9,0.85)",
              padding: "2px 6px",
              borderRadius: "3px",
              border: "1px solid rgba(34,211,238,0.25)",
              pointerEvents: "none",
              zIndex: 12,
              whiteSpace: "nowrap",
            }}
          >
            {snip.text}
          </m.div>
        ))}
      </AnimatePresence>

      {/* REVEALED PHOTO LAYER (Masked into the clearing inside the field) */}
      <m.div
        animate={{
          opacity: isRevealed ? 1 : revealProgress > 0.05 ? revealProgress * 0.8 : 0,
          scale: isRevealed ? 1 : 0.88 + revealProgress * 0.12,
        }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        style={{
          position: "absolute",
          top: "44%",
          left: "52%",
          transform: "translate(-50%, -50%)",
          width: isMobile ? "180px" : "210px",
          height: isMobile ? "180px" : "210px",
          borderRadius: "50%",
          padding: "4px",
          background: "linear-gradient(135deg, rgba(34,211,238,0.4) 0%, rgba(45,212,191,0.1) 50%, transparent 100%)",
          boxShadow: isRevealed
            ? "0 0 35px rgba(34,211,238,0.25), inset 0 0 20px rgba(34,211,238,0.15)"
            : "none",
          zIndex: 5,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.18)",
            background: "#080a0e",
          }}
        >
          <img
            src={photoUrl}
            alt="Hitesh Jindal"
            width={400}
            height={400}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "50% 15%",
              filter: isRevealed
                ? "grayscale(15%) contrast(1.08)"
                : "grayscale(60%) brightness(0.7)",
              transition: "filter 0.5s ease",
            }}
          />
          {/* Subtle cyan vignette & scanlines */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 50% 50%, transparent 40%, rgba(6,7,9,0.7) 100%)",
            }}
          />
        </div>
      </m.div>

      {/* Bottom Status & Caption Readout */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "12px 16px",
          background: "linear-gradient(to top, rgba(6,7,9,0.95) 0%, rgba(6,7,9,0.6) 70%, transparent 100%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          pointerEvents: "none",
        }}
      >
        <AnimatePresence mode="wait">
          {isRevealed ? (
            <m.div
              key="revealed"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.35 }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_SERIF,
                    fontSize: "0.92rem",
                    fontWeight: 800,
                    letterSpacing: "0.02em",
                    color: "#fafaf8",
                  }}
                >
                  IDENTITY RESOLVED
                </span>
                <span
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: "0.6rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    color: "#22d3ee",
                    textTransform: "uppercase",
                  }}
                >
                  HITESH JINDAL
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "2px",
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: "0.68rem",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  AI Systems • RETFound • Multi-Agent Research
                </span>

                {showScrollCue && (
                  <m.span
                    initial={{ opacity: 0, x: 4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: "0.58rem",
                      letterSpacing: "0.08em",
                      color: "#f59e0b",
                      textTransform: "uppercase",
                      display: "flex",
                      alignItems: "center",
                      gap: "2px",
                    }}
                  >
                    SCROLL TO EXPLORE ↓
                  </m.span>
                )}
              </div>
            </m.div>
          ) : (
            <m.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: "0.6rem",
                  letterSpacing: "0.08em",
                  color: "rgba(255,255,255,0.4)",
                  textTransform: "uppercase",
                }}
              >
                {statusMessage}
              </span>

              <span
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: "0.55rem",
                  letterSpacing: "0.05em",
                  color: "rgba(255,255,255,0.25)",
                }}
              >
                [01 HIDDEN NODE]
              </span>
            </m.div>
          )}
        </AnimatePresence>
      </div>

      {/* Outer Glow Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 25px rgba(0,0,0,0.8)",
          pointerEvents: "none",
          zIndex: 8,
        }}
      />
    </div>
  );
}
