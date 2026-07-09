"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { gsap } from "@/animations/gsap";

export function ProjectDetailAnimations() {
  useEffect(() => {
    const root = document.querySelector("[data-project-detail]");

    if (!root) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const cleanups: Array<() => void> = [];
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-gsap='text']").forEach((item) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0, y: 22 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            scrollTrigger: {
              trigger: item,
              start: "top 86%",
              once: true,
            },
          },
        );
      });

      gsap.utils
        .toArray<HTMLElement>("[data-gsap='section']")
        .forEach((item) => {
          gsap.fromTo(
            item,
            { autoAlpha: 0, y: 28 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
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
          { autoAlpha: 0.72, scale: 1.06 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 1.2,
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      gsap.utils
        .toArray<HTMLElement>("[data-gsap='button']")
        .forEach((item, index) => {
          gsap.fromTo(
            item,
            { autoAlpha: 0, y: 12 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.65,
              delay: index * 0.04,
              scrollTrigger: {
                trigger: item,
                start: "top 90%",
                once: true,
              },
            },
          );
        });

      gsap.utils
        .toArray<HTMLElement>("[data-gsap='gallery']")
        .forEach((item) => {
          const image = item.querySelector("img");

          if (!image) {
            return;
          }

          gsap.fromTo(
            image,
            { scale: 1.08 },
            {
              scale: 1,
              duration: 1.25,
              scrollTrigger: {
                trigger: item,
                start: "top 88%",
                once: true,
              },
            },
          );

          const onEnter = () => {
            gsap.to(image, {
              scale: 1.045,
              duration: 0.9,
              ease: "power3.out",
            });
          };
          const onLeave = () => {
            gsap.to(image, {
              scale: 1,
              duration: 0.9,
              ease: "power3.out",
            });
          };

          item.addEventListener("mouseenter", onEnter);
          item.addEventListener("mouseleave", onLeave);
          cleanups.push(() => {
            item.removeEventListener("mouseenter", onEnter);
            item.removeEventListener("mouseleave", onLeave);
          });
        });
    }, root);

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, []);

  return null;
}
