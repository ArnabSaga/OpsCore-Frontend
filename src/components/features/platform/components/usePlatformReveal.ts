"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RefObject } from "react";

gsap.registerPlugin(useGSAP);

export function usePlatformReveal(containerRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (!containerRef.current) return;

      const ctx = gsap.context(() => {
        const hero = containerRef.current?.querySelector("[data-platform-reveal='hero']");
        const toolbar = containerRef.current?.querySelector("[data-platform-reveal='toolbar']");
        const card = containerRef.current?.querySelector("[data-platform-reveal='card']");

        if (hero) {
          gsap.fromTo(
            hero,
            { opacity: 0, y: 20, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              ease: "power3.out",
            }
          );
        }

        if (toolbar) {
          gsap.fromTo(
            toolbar,
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out",
              delay: 0.1,
            }
          );
        }

        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              delay: 0.15,
            }
          );
        }
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef }
  );
}
