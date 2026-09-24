import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { FRAME_COUNT, still } from "../assets";
import { brand, cta } from "../content";
import { prefersReducedMotion, revealIn } from "../lib/motion";
import { useFrameSet } from "../lib/useFrameSet";
import Arrow from "../components/Arrow";

/** Section 8 — CTA over the last frame of the active set (desktop / mobile), under a dark overlay. */
export default function Cta() {
  const sectionRef = useRef<HTMLElement>(null);
  const set = useFrameSet();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      revealIn("[data-content] > *", { trigger: section, start: "top 65%", stagger: 0.15 });
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-bg]",
        { scale: 1.2 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom bottom", scrub: 0.8 },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink px-5 py-32 text-white md:px-12"
    >
      <img
        data-bg
        src={still(FRAME_COUNT, set)}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-black/55" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink/70" />

      <div data-content className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
        <h2
          className="text-balance font-light leading-[1.25] [text-shadow:0_2px_28px_rgba(0,0,0,0.35)]"
          style={{ fontSize: "clamp(2.25rem, 5.2vw, 5.25rem)" }}
        >
          {cta.headline}
        </h2>
        <a
          href={brand.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-10 inline-flex items-center gap-3 rounded-full bg-white py-4 pe-7 ps-8 text-base font-medium text-ink transition-colors duration-300 hover:bg-sand md:mt-14"
        >
          {cta.button}
          <Arrow className="h-4 w-4 transition-transform duration-500 ease-calm group-hover:-translate-x-1" />
        </a>
      </div>
    </section>
  );
}
