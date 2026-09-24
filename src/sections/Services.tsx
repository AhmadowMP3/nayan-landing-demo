import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { assets } from "../assets";
import { services, servicesSection } from "../content";
import { prefersReducedMotion, revealIn } from "../lib/motion";
import Arrow from "../components/Arrow";
import Eyebrow from "../components/Eyebrow";

/**
 * Section 6 — services (dark). Four huge rows, each with a left-pointing arrow. Hovering a row
 * opens a still behind it from the centre line outwards. Touch screens can't hover, so there
 * the row crossing the middle of the viewport is the "hovered" one.
 */
export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [reduce] = useState(prefersReducedMotion);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      revealIn("[data-head] > *", { trigger: section, start: "top 75%" });
      revealIn("[data-row]", { trigger: section.querySelector("ol"), stagger: 0.1, y: 48 });

      if (!window.matchMedia("(hover: none)").matches) return;
      gsap.utils.toArray<HTMLElement>("[data-row]").forEach((row, i) => {
        ScrollTrigger.create({
          trigger: row,
          start: "top 55%",
          end: "bottom 45%",
          onToggle: (self) => setActive((cur) => (self.isActive ? i : cur === i ? null : cur)),
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="bg-ink py-28 text-white md:py-40">
      <div data-head className="mx-auto max-w-7xl px-5 md:px-12">
        <Eyebrow>{servicesSection.label}</Eyebrow>
        <h2 className="mt-6 font-light leading-[1.15]" style={{ fontSize: "clamp(2.25rem, 4vw, 4rem)" }}>
          {servicesSection.title}
        </h2>
      </div>

      <ol className="mt-14 border-b border-white/15 md:mt-20">
        {services.map((service, i) => {
          const on = active === i;
          return (
            <li key={service} data-row>
              <a
                href="#contact"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive((cur) => (cur === i ? null : cur))}
                onFocus={() => setActive(i)}
                onBlur={() => setActive((cur) => (cur === i ? null : cur))}
                className="relative block overflow-hidden border-t border-white/15 outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-white/60"
              >
                {/* the still behind the row */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 transition-[clip-path,opacity] duration-[1100ms] ease-calm"
                  style={
                    reduce
                      ? { opacity: on ? 1 : 0 }
                      : { clipPath: on ? "inset(0% 0% 0% 0%)" : "inset(50% 0% 50% 0%)" }
                  }
                >
                  <img
                    src={assets.services[i]}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-calm ${
                      on && !reduce ? "scale-100" : "scale-110"
                    }`}
                  />
                  <div className="absolute inset-0 bg-black/50" />
                </div>

                <div className="relative mx-auto flex max-w-7xl items-center gap-4 px-5 py-8 md:gap-10 md:px-12 md:py-12">
                  <span className="shrink-0 self-start pt-2 text-sm tabular-nums text-white/45 md:pt-5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`flex-1 font-light leading-[1.15] transition-transform duration-700 ease-calm ${
                      on && !reduce ? "-translate-x-3" : ""
                    }`}
                    style={{ fontSize: "clamp(1.85rem, 5vw, 5.25rem)" }}
                  >
                    {service}
                  </span>
                  {/* points left — "forward" in RTL; nudges further left when active */}
                  <Arrow
                    className={`h-7 w-7 shrink-0 transition-[transform,opacity] duration-700 ease-calm md:h-14 md:w-14 ${
                      on ? `opacity-100 ${reduce ? "" : "-translate-x-2"}` : "opacity-50"
                    }`}
                  />
                </div>
              </a>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
