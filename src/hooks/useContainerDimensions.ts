"use client";

import { useEffect, useRef, useState } from "react";

type Dimensions = {
  width: number;
  height: number;
  isReady: boolean;
};

/**
 * A robust hook that uses ResizeObserver to track the dimensions of a container element.
 * Returning explicit pixel numbers allows components like Recharts' ResponsiveContainer
 * to bypass their internal (often buggy) measurement logic.
 */
export const useContainerDimensions = (containerRef: React.RefObject<HTMLElement | null>): Dimensions => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
    isReady: false,
  });

  useEffect(() => {
    const target = containerRef.current;
    if (!target) return;

    const observer = new ResizeObserver((entries) => {
      if (!Array.isArray(entries) || !entries.length) return;

      const entry = entries[0];
      const { width, height } = entry.contentRect;

      // Only update if dimensions are valid and have actually changed
      if (width > 0 && height > 0) {
        setDimensions((prev) => {
          if (prev.width === width && prev.height === height && prev.isReady) {
            return prev;
          }
          return { width, height, isReady: true };
        });
      }
    });

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [containerRef]);

  return dimensions;
};
