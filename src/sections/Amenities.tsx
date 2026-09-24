import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { amenities } from "../content";
import { revealIn } from "../lib/motion";
import Eyebrow from "../components/Eyebrow";
import PlaceholderBadge from "../components/PlaceholderBadge";

/** Section 7 — amenities as cards. PLACEHOLDER list (see content.ts), marked on the page. */
export default function Amenities() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      revealIn("[data-head] > *", { trigger: section, start: "top 75%" });
      revealIn("[data-card]", { trigger: section.querySelector("ul"), stagger: 0.08, y: 36 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="amenities" className="bg-sand px-5 py-28 text-ink md:px-12 md:py-40 lg:py-48">
      <div className="mx-auto max-w-7xl">
        <div data-head className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>{amenities.label}</Eyebrow>
            <h2 className="mt-6 font-light leading-[1.15]" style={{ fontSize: "clamp(2.25rem, 4vw, 4rem)" }}>
              {amenities.title}
            </h2>
          </div>
          <PlaceholderBadge />
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 md:mt-16 md:gap-5 lg:grid-cols-3">
          {amenities.items.map((item, i) => (
            <li
              key={item}
              data-card
              className="group flex min-h-[170px] flex-col justify-between border border-ink/10 bg-white/35 p-5 transition-colors duration-700 ease-calm hover:bg-white md:min-h-[260px] md:p-8"
            >
              <span className="text-sm tabular-nums text-ink/40">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-xl font-light leading-[1.3] transition-transform duration-700 ease-calm group-hover:-translate-x-2 md:text-3xl">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
