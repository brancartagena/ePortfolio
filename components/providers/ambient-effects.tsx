"use client";

import { useEffect } from "react";

const particles = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  top: `${(index * 53) % 100}%`,
  delay: `${(index % 6) * 0.8}s`,
  duration: `${10 + (index % 5) * 2}s`,
}));

export function AmbientEffects() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    let nextX = window.innerWidth / 2;
    let nextY = window.innerHeight / 2;

    const update = () => {
      root.style.setProperty("--mouse-x", `${nextX}px`);
      root.style.setProperty("--mouse-y", `${nextY}px`);
      frame = 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        return;
      }

      nextX = event.clientX;
      nextY = event.clientY;

      if (!frame) {
        frame = requestAnimationFrame(update);
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);

      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <div className="ambient-gradient" />
      <div className="mouse-light" />
      <div className="ambient-particles">
        {particles.map((particle) => (
          <span
            key={particle.id}
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}
      </div>
    </div>
  );
}
