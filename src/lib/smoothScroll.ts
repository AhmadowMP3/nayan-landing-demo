import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;
let locked = false;

/** Lenis smooth scroll driven by GSAP's ticker so ScrollTrigger stays in sync. */
export function startSmoothScroll() {
  lenis = new Lenis({
    duration: 1.4,
    easing: (t) => 1 - Math.pow(1 - t, 3),
    smoothWheel: true,
  });
  if (locked) lenis.stop();

  lenis.on("scroll", ScrollTrigger.update);
  const tick = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  };
}

/** Freeze page scrolling (e.g. while the loader is up). Works with or without Lenis. */
export function setScrollLocked(value: boolean) {
  locked = value;
  document.documentElement.classList.toggle("scroll-locked", value);
  if (value) lenis?.stop();
  else lenis?.start();
}

/** Jump to a scroll position instantly, keeping Lenis's internal target in sync. */
export function jumpTo(y: number) {
  if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
  else window.scrollTo(0, y);
}
