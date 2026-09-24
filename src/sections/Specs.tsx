import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { specs } from "../content";
import { prefersReducedMotion, revealIn } from "../lib/motion";
import { photoByFile, photoSrc } from "../lib/nayanPhotos";
import Eyebrow from "../components/Eyebrow";
import PlaceholderBadge from "../components/PlaceholderBadge";

const photo = photoByFile(specs.photo);

/**
 * Section 4 — project specs for a real Nayan project (some values MOCK, see content.ts).
 * The photo opens upwards from its bottom edge; the spec rows fade + rise in one after another.
 */
export default function Specs() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const image = imageRef.current!;
      if (prefersReducedMotion()) {
        revealIn(image, { trigger: image, y: 0 });
      } else {
        gsap.fromTo(
          image,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.8,
            ease: "power3.inOut",
            scrollTrigger: { trigger: image, start: "top 80%", once: true },
          },
        );
      }
      const section = sectionRef.current!;
      revealIn("[data-intro] > *", { trigger: section.querySelector("[data-intro]") });
      revealIn("[data-spec]", { trigger: section.querySelector("[data-specs]"), stagger: 0.1, y: 28 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="project" className="bg-sand px-5 pb-28 text-ink md:px-12 md:pb-40 lg:pb-48">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* real project photo at its natural proportions — never cropped */}
        <div ref={imageRef} className="overflow-hidden bg-ink/10 lg:col-span-7">
          <img
            src={photoSrc(photo.file)}
            alt={specs.title}
            width={photo.width}
            height={photo.height}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full"
          />
        </div>

        <div className="lg:col-span-5">
          <div data-intro>
            <Eyebrow>{specs.label}</Eyebrow>
            <h2 className="mt-6 font-light leading-[1.15]" style={{ fontSize: "clamp(2.25rem, 4vw, 4rem)" }}>
              {specs.title}
            </h2>
            <PlaceholderBadge className="mt-5" />
          </div>

          <dl data-specs className="mt-10 grid grid-cols-2 gap-x-8 md:mt-14">
            {specs.items.map((item) => (
              <div key={item.label} data-spec className="border-t border-ink/15 py-5 md:py-6">
                <dt className="text-sm text-ink/55">{item.label}</dt>
                <dd className="mt-2 text-xl font-light md:text-2xl">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
