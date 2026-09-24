import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { assets } from "../assets";
import { brand, nav } from "../content";
import { prefersReducedMotion } from "../lib/motion";

/**
 * Floating pill nav: light translucent pill with the dark logo on the start side (right, in RTL),
 * the links in the middle, and the language switch + copper CTA on the end side.
 * - drops in once the loader has gone
 * - hides on scroll down, comes back on scroll up; tightens and turns more opaque once scrolled
 * - a copper dot marks the section in view
 * - below md the links move into a menu panel under the pill
 */
export default function Nav() {
  const headerRef = useRef<HTMLElement>(null);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(nav.links[0].href);
  const [open, setOpen] = useState(false);

  // drop in when the loader releases the page (it locks scrolling via html.scroll-locked)
  useEffect(() => {
    const html = document.documentElement;
    const header = headerRef.current!;
    const reduce = prefersReducedMotion();
    gsap.set(header, { autoAlpha: 0, y: reduce ? 0 : -24 });
    let played = false;
    const play = () => {
      if (played || html.classList.contains("scroll-locked")) return;
      played = true;
      gsap.to(header, { autoAlpha: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.2, clearProps: "transform" });
    };
    const mo = new MutationObserver(play);
    mo.observe(html, { attributes: true, attributeFilter: ["class"] });
    // the loader may already be gone (or never shown)
    const t = window.setTimeout(play, 50);
    return () => {
      mo.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    const direction = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const y = self.scroll();
        setScrolled(y > 40);
        const down = self.direction === 1 && y > 160;
        setHidden(down);
        if (down) setOpen(false);
      },
    });

    const sections = nav.links.map((link) => {
      const el = document.querySelector(link.href);
      return el
        ? ScrollTrigger.create({
            trigger: el,
            start: "top center",
            end: "bottom center",
            onToggle: (self) => self.isActive && setActive(link.href),
          })
        : null;
    });

    return () => {
      direction.kill();
      sections.forEach((s) => s?.kill());
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={`invisible fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-transform duration-700 ease-calm md:px-6 md:pt-5 ${
        hidden ? "-translate-y-[130%]" : "translate-y-0"
      }`}
    >
      <nav
        className={`relative mx-auto flex max-w-[1400px] items-center justify-between gap-4 rounded-full ps-5 pe-2 text-ink ring-1 ring-black/5 backdrop-blur-xl transition-[height,background-color,box-shadow] duration-700 ease-calm md:ps-8 ${
          scrolled
            ? "h-[60px] bg-white/90 shadow-[0_10px_40px_-12px_rgba(22,19,15,0.35)] md:h-[68px]"
            : "h-[64px] bg-white/75 shadow-[0_10px_40px_-18px_rgba(22,19,15,0.25)] md:h-[80px]"
        }`}
      >
        <a href="#film" aria-label={nav.homeLabel} className="shrink-0">
          <img
            src={assets.logoDark}
            alt={brand.logoAlt}
            className={`w-auto transition-[height] duration-700 ease-calm ${scrolled ? "h-8 md:h-9" : "h-9 md:h-11"}`}
          />
        </a>

        <ul className="hidden items-center gap-10 text-[15px] font-medium lg:gap-14 md:flex">
          {nav.links.map((link) => {
            const on = active === link.href;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={on ? "true" : undefined}
                  className={`relative block py-2 transition-colors duration-500 ${on ? "text-ink" : "text-ink/60 hover:text-ink"}`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-copper transition-[opacity,transform] duration-500 ease-calm ${
                      on ? "scale-100 opacity-100" : "scale-0 opacity-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex shrink-0 items-center gap-2 md:gap-5">
          <a
            href={nav.lang.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={nav.lang.aria}
            className="hidden items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-60 md:flex"
            dir="ltr"
          >
            <GlobeIcon className="h-5 w-5" />
            {nav.lang.label}
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="nav-menu"
            aria-label={open ? nav.menuClose : nav.menuOpen}
            className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-ink/5 md:hidden"
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute inset-x-0 top-0 h-px bg-ink transition-transform duration-500 ease-calm ${open ? "translate-y-[5.5px] rotate-45" : ""}`}
              />
              <span
                className={`absolute inset-x-0 bottom-0 h-px bg-ink transition-transform duration-500 ease-calm ${open ? "-translate-y-[5.5px] -rotate-45" : ""}`}
              />
            </span>
          </button>

          <a
            href={brand.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={nav.ctaLabel}
            className={`group flex items-center gap-3 rounded-full bg-copper ps-2 pe-5 font-semibold text-white transition-[height,background-color] duration-700 ease-calm hover:bg-[#7a4b31] md:gap-4 md:pe-8 ${
              scrolled ? "h-11 md:h-[52px]" : "h-12 md:h-16"
            }`}
          >
            <span
              className={`flex items-center justify-center rounded-full bg-white text-ink transition-[height,width] duration-700 ease-calm ${
                scrolled ? "h-8 w-8 md:h-10 md:w-10" : "h-9 w-9 md:h-12 md:w-12"
              }`}
            >
              {/* ↖ — mirrored ↗ for RTL; turns to point left ("forward") on hover */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-500 ease-calm group-hover:-rotate-45 md:h-5 md:w-5"
              >
                <path d="M17 17 7 7m0 0h8M7 7v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-sm md:text-base">{nav.cta}</span>
          </a>
        </div>
      </nav>

      {/* mobile menu */}
      <div
        id="nav-menu"
        className={`mx-auto mt-2 max-w-[1400px] overflow-hidden rounded-3xl bg-white/90 text-ink ring-1 ring-black/5 backdrop-blur-xl transition-[opacity,transform,visibility] duration-500 ease-calm md:hidden ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <ul className="px-6 py-3">
          {nav.links.map((link) => (
            <li key={link.href} className="border-b border-ink/10 last:border-0">
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between py-4 text-lg ${active === link.href ? "text-ink" : "text-ink/60"}`}
              >
                {link.label}
                {active === link.href && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-copper" />}
              </a>
            </li>
          ))}
          <li>
            <a
              href={nav.lang.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={nav.lang.aria}
              className="flex items-center gap-2 py-4 text-sm font-semibold"
              dir="ltr"
            >
              <GlobeIcon className="h-5 w-5" />
              {nav.lang.label}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

function GlobeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
