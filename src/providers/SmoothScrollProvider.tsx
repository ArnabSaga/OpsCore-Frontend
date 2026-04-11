"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const SmoothScrollContext = createContext<Lenis | null>(null);

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        console.log("SmoothScroll: Reduced motion detected, falling back to native scroll.");
        return;
      }

      // 2. Initialize Lenis
      const lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5, // Slightly soften touch for premium feel as requested
        infinite: false,
      });

      // 3. Sync with GSAP ScrollTrigger
      lenisInstance.on("scroll", ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenisInstance.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);

      setLenis(lenisInstance);

      // Clean up
      return () => {
        lenisInstance.destroy();
        gsap.ticker.remove((time) => {
          lenisInstance.raf(time * 1000);
        });
        setLenis(null);
      };
    },
    { scope: containerRef }
  );

  // Re-sync ScrollTrigger on resize or orientation change
  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={lenis}>
      <div ref={containerRef} className="smooth-scroll-wrapper">
        {children}
      </div>
    </SmoothScrollContext.Provider>
  );
}
