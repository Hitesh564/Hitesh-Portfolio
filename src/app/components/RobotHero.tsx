import React, { Suspense, lazy, useState, useEffect } from "react";
import { useIsMobile } from "../../hooks/useMediaQuery";

// Spline scene constant - easily customizable or replaceable later
const ROBOT_SCENE = "https://prod.spline.design/N0XhYbL9xXK7lBga/scene.splinecode";

// Lazy load Spline runtime to guarantee client-only WebGL execution
const Spline = lazy(() => import("@splinetool/react-spline"));

interface RobotHeroProps {
  sceneUrl?: string;
  className?: string;
}

export function RobotHero({
  sceneUrl = ROBOT_SCENE,
  className = "",
}: RobotHeroProps) {
  const isMobile = useIsMobile();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [canRenderSpline, setCanRenderSpline] = useState(false);

  useEffect(() => {
    // Defer heavy 3D WebGL runtime initialization so page elements display immediately
    const timer = setTimeout(() => {
      setCanRenderSpline(true);
    }, 120);

    return () => clearTimeout(timer);
  }, []);

  if (!canRenderSpline) {
    return (
      <div
        style={{
          width: "100%",
          height: isMobile ? "380px" : "620px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    );
  }

  return (
    <div
      className={`robot-hero-container ${className}`}
      style={{
        position: isMobile ? "relative" : "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: isMobile ? "auto" : 0,
        width: isMobile ? "100%" : "100%",
        height: isMobile ? "380px" : "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto",
        userSelect: "none",
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      {/* 3D Spline Canvas Wrapper */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: isMobile ? "100%" : "850px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "visible",
          pointerEvents: "auto",
          // Fine-tuned placement so the standing robot is framed perfectly in the hero right column
          transform: isMobile
            ? "scale(0.85) translateY(-10px)"
            : "translateX(22%) translateY(-40px) scale(0.92)",
          transition: "opacity 0.6s ease",
          opacity: isLoaded ? 1 : 0.05,
        }}
      >
        {!hasError && (
          <Suspense fallback={null}>
            <Spline
              scene={sceneUrl}
              onLoad={() => setIsLoaded(true)}
              onError={() => {
                setHasError(true);
                setIsLoaded(true);
              }}
              style={{
                width: "100%",
                height: "100%",
                background: "transparent",
              }}
            />
          </Suspense>
        )}
      </div>

    </div>
  );
}

export default RobotHero;
