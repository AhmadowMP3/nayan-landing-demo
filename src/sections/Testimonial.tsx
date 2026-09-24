import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { testimonial } from "../content";
import { revealIn, revealWords } from "../lib/motion";
import Eyebrow from "../components/Eyebrow";
import PlaceholderBadge from "../components/PlaceholderBadge";
import Words from "../components/Words";

/** Section 5 — one large quote, revealed word by word. PLACEHOLDER quote + name (see content.ts). */
export default function Testimonial() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      revealIn("[data-top] > *", { trigger: section, start: "top 80%" });
      revealWords(section.querySelector("blockquote")!, { start: "top 85%", end: "bottom 55%" });
      revealIn("figcaption > *", { trigger: section.querySelector("figcaption"), start: "top 92%", y: 24 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="testimonial" className="bg-sand px-5 pb-28 text-ink md:px-12 md:pb-40 lg:pb-48">
      <figure className="mx-auto max-w-7xl border-t border-ink/15 pt-12 md:pt-16">
        <div data-top className="flex flex-wrap items-center justify-between gap-4">
          <Eyebrow>{testimonial.label}</Eyebrow>
          <PlaceholderBadge />
        </div>

        {/* Arabic opening quote (”), on the start side */}
        <svg aria-hidden="true" viewBox="5 7 14 10" className="mt-12 h-auto w-12 text-ink/20 md:mt-16 md:w-16">
          <path fill="currentColor" d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
        </svg>
        <blockquote
          className="mt-6 max-w-6xl text-balance font-light leading-[1.3] md:mt-8"
          style={{ fontSize: "clamp(1.75rem, 3.9vw, 4rem)" }}
        >
          <p>
            <Words text={testimonial.quote} />
          </p>
        </blockquote>

        <figcaption className="mt-10 flex items-center gap-4 md:mt-14">
          <span aria-hidden="true" className="block h-px w-10 bg-ink/40" />
          <span>
            <span className="block text-lg font-medium">{testimonial.name}</span>
            <span className="block text-sm text-ink/55">{testimonial.role}</span>
          </span>
        </figcaption>
      </figure>
    </section>
  );
}
