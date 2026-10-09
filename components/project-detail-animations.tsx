"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { gsap } from "@/animations/gsap";

export function ProjectDetailAnimations() {
  useEffect(() => {
    const root = document.querySelector("[data-project-detail]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (!root || reduceMotion || coarsePointer) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils
        .toArray<HTMLElement>("[data-gsap='section']")
        .forEach((item) => {
          gsap.fromTo(
            item,
            { autoAlpha: 0, y: 14 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.45,
              scrollTrigger: {
                trigger: item,
                start: "top 82%",
                once: true,
              },
            },
          );
        });

      gsap.utils.toArray<HTMLElement>("[data-gsap='image']").forEach((item) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0.9, scale: 1.02 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.5,
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      gsap.utils
        .toArray<HTMLElement>("[data-parallax-image]")
        .forEach((item) => {
          gsap.fromTo(
            item,
            { yPercent: -2 },
            {
              yPercent: 4,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top top",
                end: "bottom top",
                scrub: 0.8,
              },
            },
          );
        });

    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return null;
}
