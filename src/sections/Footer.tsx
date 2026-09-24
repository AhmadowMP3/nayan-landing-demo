import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { assets } from "../assets";
import { brand, footer, nav } from "../content";
import { revealIn } from "../lib/motion";
import Arrow from "../components/Arrow";

/** Section 9 — footer (dark): logo, contact details, links, copyright. */
export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      revealIn("[data-col]", { trigger: footerRef.current, start: "top 85%", stagger: 0.1, y: 28 });
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

        <div className="mt-20 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 py-8 text-xs text-white/45 md:mt-28">
          <span>
            © <span dir="ltr">{year}</span> {brand.name}. {footer.rights}
          </span>
        </div>
      </div>
    </footer>
  );
}
