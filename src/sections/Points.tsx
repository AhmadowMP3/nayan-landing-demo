import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { points, pointsSection } from "../content";
import { revealIn, revealWords } from "../lib/motion";
import Words from "../components/Words";

/**
 * Section 3 — three points. A sticky heading on the start side (right, in RTL); the points on the
 * other side turn from grey to near-black, word by word, as they scroll into view.
 */
export default function Points() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      revealIn("[data-heading]", { trigger: sectionRef.current, start: "top 75%" });
      gsap.utils.toArray<HTMLElement>("[data-point]").forEach((point) => {
        revealIn(point.querySelector("[data-rule]"), { trigger: point, y: 0, start: "top 90%" });
        revealWords(point.querySelector("[data-text]")!, { start: "top 88%", end: "bottom 60%", from: 0.14 });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="why" className="bg-sand px-5 pb-28 text-ink md:px-12 md:pb-40 lg:pb-48">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <h2
            data-heading
            className="font-light leading-[1.15] lg:sticky lg:top-32"
            style={{ fontSize: "clamp(2.25rem, 4vw, 4rem)" }}
          >
            {pointsSection.label}
          </h2>
        </div>

        <ol className="lg:col-span-8">
          {points.map((point, i) => (
            <li key={point.title} data-point className="relative py-10 first:pt-0 md:py-14">
              <span
                data-rule
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 block h-px bg-ink/15 [li:last-child>&]:hidden"
              />
              <div className="flex gap-5 md:gap-10">
                <span className="pt-2 text-sm font-medium tabular-nums text-ink/40 md:pt-4">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div data-text>
                  <h3 className="font-medium leading-[1.2]" style={{ fontSize: "clamp(1.75rem, 3.2vw, 3rem)" }}>
                    <Words text={point.title} />
                  </h3>
                  <p
                    className="mt-3 max-w-2xl font-light leading-[1.5] md:mt-4"
                    style={{ fontSize: "clamp(1.2rem, 1.9vw, 1.75rem)" }}
                  >
                    <Words text={point.body} />
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
