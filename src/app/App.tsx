import { useEffect, useState } from "react";
import { Hero } from "./components/Hero";
import { HologramInterface } from "./components/HologramInterface";
import { About } from "./components/About";
import { ExperienceTimeline } from "./components/ExperienceTimeline";
import { Impact } from "./components/Impact";
import { Featured } from "./components/Featured";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Contact } from "./components/Contact";
import { useIsMobile } from "../hooks/useMediaQuery";
import { useHashScroll } from "../hooks/useHashScroll";
import { LazyMotion, domAnimation } from "motion/react";

export default function App() {
  const isMobile = useIsMobile();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [thumbRatio, setThumbRatio] = useState(0.2);
  useHashScroll();

  useEffect(() => {
    const el = document.querySelector(
      ".hologram-interface",
    ) as HTMLElement | null;
    if (!el) return;

    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight;
      const progress = max > 0 ? el.scrollTop / max : 0;
      setScrollProgress(progress);
      setThumbRatio(
        el.scrollHeight > 0 ? el.clientHeight / el.scrollHeight : 1,
      );
    };
    el.addEventListener("scroll", onScroll, { passive: true });

    (window as any).__portfolioScrollTop = (top: number) => {
      el.scrollTo({
        top: Math.max(0, Math.min(top, el.scrollHeight - el.clientHeight)),
        behavior: "smooth",
      });
    };

    return () => {
      el.removeEventListener("scroll", onScroll);
      delete (window as any).__portfolioScrollTop;
    };
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <div className="spatial-scene">
        <HologramInterface>
          <Hero />
          <About />
          <ExperienceTimeline />
          <Impact />
          <Featured />
          <Projects />
          <Skills />
          <Contact />
        </HologramInterface>
      </div>

      {/* Scroll progress pill - right edge */}
      <div
        style={{
          position: "fixed",
          right: "6px",
          top: "1rem",
          bottom: "1rem",
          width: "3px",
          zIndex: 998,
          borderRadius: "3px",
          background: "rgba(255,255,255,0.05)",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            width: "100%",
            height: `${Math.max(thumbRatio * 100, 8)}%`,
            top: `${scrollProgress * (100 - Math.max(thumbRatio * 100, 8))}%`,
            borderRadius: "3px",
            background: "rgba(255,255,255,0.22)",
          }}
        />
      </div>
    </LazyMotion>
  );
}
