import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { assets } from "../assets";
import { discover } from "../content";
import { prefersReducedMotion, revealIn, revealWords } from "../lib/motion";
import Eyebrow from "../components/Eyebrow";
import Words from "../components/Words";

/**
 * Section 2 — a large statement over a row of chevrons pointing LEFT ("forward" in RTL),
 * filled with stills from the film. The row starts on the right and fades out towards the left;
 * as it scrolls in, each chevron slides leftwards into place.
 */

// Left-pointing chevron: the point is on the left, the notch on the right.
const CHEVRON = "polygon(28% 0, 100% 0, 72% 50%, 100% 100%, 28% 100%, 0 50%)";
// Opacity of each chevron in the row; the last one is an empty "ghost".
const FADE = [1, 0.85, 0.6, 0.22];

export default function Discover() {
  const sectionRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLHeadingElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = prefersReducedMotion();
      revealIn("[data-eyebrow]", { trigger: sectionRef.current });
      revealWords(statementRef.current!, { start: "top 85%", end: "bottom 45%" });

      const chevrons = gsap.utils.toArray<HTMLElement>("[data-chevron]");
      if (reduce) {
        revealIn(chevrons, { trigger: rowRef.current, y: 0, stagger: 0 });
        return;
      }
      gsap.fromTo(
        chevrons,
        { x: (i) => 90 + i * 40, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: (i) => FADE[i],
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: { trigger: rowRef.current, start: "top 95%", end: "center 55%", scrub: 0.8 },
        },
      );
      gsap.fromTo(
        "[data-chevron] img",
        { scale: 1.25 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: rowRef.current, start: "top bottom", end: "bottom top", scrub: 0.8 },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const images = [...assets.chevrons, null];

  return (
    <section
      ref={sectionRef}
      id="discover"
      className="relative overflow-hidden bg-sand px-5 py-28 text-ink md:px-12 md:py-40 lg:py-48"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
        <div data-eyebrow>
          <Eyebrow>{discover.label}</Eyebrow>
        </div>
        <h2
          ref={statementRef}
          className="mt-8 max-w-5xl text-balance font-light leading-[1.25]"
          style={{ fontSize: "clamp(2rem, 4.8vw, 4.75rem)" }}
        >
          <Words text={discover.statement} />
        </h2>

        <div
          ref={rowRef}
          className="mt-16 flex justify-center md:mt-24"
          style={{ ["--w" as string]: "clamp(96px, 22vw, 340px)" }}
        >
          {images.map((src, i) => (
            <div
              key={i}
              data-chevron
              className="relative aspect-[4/5] shrink-0 overflow-hidden"
              style={{
                width: "var(--w)",
                clipPath: CHEVRON,
                // nest each chevron's point into the next one's notch, leaving a thin gap
                marginInlineStart: i === 0 ? 0 : "calc(var(--w) * -0.22)",
                opacity: FADE[i],
              }}
            >
              {src ? (
                <img
                  src={src}
                  alt={discover.imageAlts[i]}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div aria-hidden="true" className="absolute inset-0 bg-ink/25" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
