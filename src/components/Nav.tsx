import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { assets } from "../assets";
import { brand, nav } from "../content";

/**
 * Transparent over the film; hides on scroll down, shows on scroll up;
 * blurred translucent background once past the film.
 * The nav logo waits until the hero (which has its own large logo) has faded out.
 */
export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const direction = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const y = self.scroll();
        setHidden(self.direction === 1 && y > 120);
        setShowLogo(y > window.innerHeight * 0.8);
      },
    });

    const film = document.getElementById("film");
    const pastFilm = film
      ? ScrollTrigger.create({
          trigger: film,
          start: "bottom top+=88",
          end: "max",
          onToggle: (self) => setSolid(self.isActive),
        })
      : null;

    return () => {
      direction.kill();
      pastFilm?.kill();
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,backdrop-filter] duration-700 ease-calm ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${solid ? "border-b border-white/10 bg-ink/85 backdrop-blur-xl" : "bg-transparent"} ${
        solid && !hidden ? "shadow-[0_8px_30px_rgba(0,0,0,0.18)]" : ""
      }`}
    >
      {/* over the film: a soft dark scrim so the links stay readable on bright skies */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/65 via-black/30 to-transparent transition-opacity duration-700 ease-calm md:h-44 ${
          solid ? "opacity-0" : "opacity-100"
        }`}
      />
      <nav className="relative mx-auto flex h-[72px] items-center justify-between gap-6 px-5 text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.45)] md:h-[88px] md:px-12">
        <a
          href="#film"
          aria-label={nav.homeLabel}
          className={`shrink-0 transition-opacity duration-700 ease-calm ${
            showLogo ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <img src={assets.logo} alt={brand.logoAlt} className="h-8 w-auto md:h-10" />
        </a>

        <ul className="hidden items-center gap-9 text-base font-medium md:flex">
          {nav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative py-2 transition-opacity duration-300 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-right after:scale-x-0 after:bg-white after:transition-transform after:duration-500 after:ease-calm hover:after:scale-x-100"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={brand.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-full border border-white/70 bg-white/10 px-5 py-2.5 text-sm font-medium backdrop-blur-md transition-colors duration-500 ease-calm [text-shadow:none] hover:bg-white hover:text-ink md:px-6"
        >
          {nav.cta}
        </a>
      </nav>
    </header>
  );
}
