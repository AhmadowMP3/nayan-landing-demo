import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { assets } from "../assets";
import { brand, footer, nav } from "../content";
import { prefersReducedMotion, revealIn } from "../lib/motion";
import Arrow from "../components/Arrow";

/**
 * Section 9 — footer (dark): contact details, links, then a giant "نيــــان" wordmark that spans the
 * full content width (sized from its measured width) and rises into place as the footer scrolls in.
 */
export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const markBoxRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);

  // fit the wordmark to the container width
  useLayoutEffect(() => {
    const box = markBoxRef.current!;
    const mark = markRef.current!;
    const fit = () => {
      mark.style.fontSize = "100px";
      const ratio = box.clientWidth / mark.getBoundingClientRect().width;
      mark.style.fontSize = `${Math.floor(100 * ratio * 0.995)}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    document.fonts?.ready.then(() => {
      fit();
      ScrollTrigger.refresh();
    });
    return () => ro.disconnect();
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const el = footerRef.current!;
      revealIn("[data-col]", { trigger: el, start: "top 85%", stagger: 0.1, y: 28 });
      if (prefersReducedMotion()) {
        revealIn(markRef.current, { trigger: markBoxRef.current, y: 0, start: "top 95%" });
        return;
      }
      gsap.fromTo(
        markRef.current,
        { yPercent: 70, opacity: 0.2 },
        {
          yPercent: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: { trigger: markBoxRef.current, start: "top bottom", end: "bottom bottom", scrub: 0.8 },
        },
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer ref={footerRef} id="footer" className="bg-ink px-5 pt-24 text-white md:px-12 md:pt-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div data-col className="md:col-span-6 lg:col-span-5">
            <img src={assets.logo} alt={brand.logoAlt} loading="lazy" className="h-10 w-auto md:h-12" />
            <p className="mt-10 text-sm text-white/45">{footer.contactTitle}</p>
            <dl className="mt-5 space-y-5">
              <div>
                <dt className="text-xs text-white/40">{footer.emailLabel}</dt>
                <dd className="mt-1 text-lg">
                  <a href={`mailto:${footer.email}`} dir="ltr" className="transition-opacity hover:opacity-70">
                    {footer.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs text-white/40">{footer.phoneLabel}</dt>
                <dd className="mt-1 text-lg">
                  <a href={footer.phoneHref} dir="ltr" className="transition-opacity hover:opacity-70">
                    {footer.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs text-white/40">{footer.addressLabel}</dt>
                <dd className="mt-1 text-lg leading-relaxed text-white/85">{footer.address}</dd>
              </div>
            </dl>
          </div>

          <nav data-col aria-label={footer.linksTitle} className="md:col-span-3 lg:col-span-3 lg:col-start-8">
            <p className="text-sm text-white/45">{footer.linksTitle}</p>
            <ul className="mt-5 space-y-3 text-lg">
              {nav.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-opacity hover:opacity-70">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={brand.whatsapp} target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">
                  {footer.whatsappLabel}
                </a>
              </li>
            </ul>
          </nav>

          <div data-col className="md:col-span-3 md:justify-self-end lg:col-span-2">
            <a href="#film" className="group inline-flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white">
              {footer.backToTop}
              <Arrow className="h-4 w-4 rotate-90 transition-transform duration-500 ease-calm group-hover:-translate-y-1" />
            </a>
          </div>
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-6 text-xs text-white/45 md:mt-28">
          <span>
            © <span dir="ltr">{year}</span> {brand.name}. {footer.rights}
          </span>
        </div>

        {/* giant wordmark */}
        <div ref={markBoxRef} className="overflow-hidden pb-[2vw] pt-8 md:pt-12" aria-hidden="true">
          <span ref={markRef} className="block w-max whitespace-nowrap font-semibold leading-[1.15]">
            {footer.wordmark}
          </span>
        </div>
      </div>
    </footer>
  );
}
