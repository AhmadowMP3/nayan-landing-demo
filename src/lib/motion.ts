import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Slow, calm defaults shared by every section after the film. */
export const EASE = "power3.out";
export const DURATION = 1.4;

type RevealOptions = {
  trigger?: Element | null;
  start?: string;
  y?: number;
  stagger?: number;
  delay?: number;
  duration?: number;
};

/**
 * Fade + rise `targets` in once when `trigger` scrolls into view.
 * Reduced motion: fades only.
 */
export function revealIn(targets: gsap.TweenTarget, opts: RevealOptions = {}) {
  const { trigger, start = "top 82%", y = 40, stagger = 0.12, delay = 0, duration = DURATION } = opts;
  const reduce = prefersReducedMotion();
  return gsap.from(targets, {
    autoAlpha: 0,
    y: reduce ? 0 : y,
    duration: reduce ? 0.8 : duration,
    ease: EASE,
    stagger: reduce ? 0 : stagger,
    delay,
    scrollTrigger: trigger ? { trigger, start, once: true } : undefined,
  });
}

/**
 * Words go from faint to full colour as the block scrolls through the viewport (scrubbed).
 * Reduced motion: the whole block simply fades in.
 */
export function revealWords(container: Element, opts: { start?: string; end?: string; from?: number } = {}) {
  const { start = "top 85%", end = "bottom 55%", from = 0.16 } = opts;
  const words = container.querySelectorAll<HTMLElement>("[data-word]");
  if (prefersReducedMotion()) {
    return gsap.from(container, {
      autoAlpha: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: { trigger: container, start, once: true },
    });
  }
  return gsap.fromTo(
    words,
    { opacity: from },
    {
      opacity: 1,
      ease: "none",
      stagger: 0.1,
      scrollTrigger: { trigger: container, start, end, scrub: 0.6 },
    },
  );
}
