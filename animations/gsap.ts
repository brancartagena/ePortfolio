import { gsap } from "gsap";

gsap.config({
  nullTargetWarn: false,
});

gsap.defaults({
  ease: "power3.out",
  duration: 0.8,
});

export { gsap };
