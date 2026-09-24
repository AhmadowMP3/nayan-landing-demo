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
      } ${solid ? "bg-ink/55 backdrop-blur-xl" : "bg-transparent"}`}
    >
      <nav className="mx-auto flex h-[72px] items-center justify-between gap-6 px-5 text-white md:h-[88px] md:px-12">
        <a
          href="#film"
          aria-label={nav.homeLabel}
          className={`shrink-0 transition-opacity duration-700 ease-calm ${
            showLogo ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <img src={assets.logo} alt={brand.logoAlt} className="h-8 w-auto md:h-10" />
        </a>

        <ul className="hidden items-center gap-9 text-[15px] font-medium md:flex">
          {nav.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="opacity-80 transition-opacity duration-300 hover:opacity-100">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={brand.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-full border border-white/40 px-5 py-2.5 text-sm font-medium transition-colors duration-500 ease-calm hover:bg-white hover:text-ink md:px-6"
        >
          {nav.cta}
        </a>
      </nav>
    </header>
  );
}
