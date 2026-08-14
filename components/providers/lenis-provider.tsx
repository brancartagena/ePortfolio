"use client";

import Lenis from "lenis";
import { type ReactNode, useEffect, useMemo } from "react";

type LenisProviderProps = {
  children: ReactNode;
};

export function LenisProvider({ children }: LenisProviderProps) {
  const options = useMemo(
    () => ({
      // Keep the inertia responsive. A long duration makes wheel input feel
      // delayed, especially when the project grid comes into view.
      duration: 0.65,
      easing: (time: number) => Math.min(1, 1.001 - 2 ** (-10 * time)),
      smoothWheel: true,
    }),
    [],
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis(options);

    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [options]);

  return children;
}
