import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { projectsSection } from "../content";
import { revealIn } from "../lib/motion";
import { photoSrc, projectUrl, projects } from "../lib/nayanPhotos";
import Arrow from "../components/Arrow";
import Eyebrow from "../components/Eyebrow";

/**
 * "مشاريعنا" — the client's real projects, from /public/assets/nayan/manifest.json.
 * A masonry grid so every photo keeps its own proportions (nothing is cropped). Name and status
 * are shown exactly as nayan.sa writes them; each card opens the project's page there.
 */
export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      revealIn("[data-head] > *", { trigger: section, start: "top 75%" });
      gsap.utils.toArray<HTMLElement>("[data-card]").forEach((card) => {
        revealIn(card, { trigger: card, start: "top 92%", y: 36 });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="bg-sand px-5 pb-28 text-ink md:px-12 md:pb-40 lg:pb-48">
      <div className="mx-auto max-w-7xl">
        <div data-head className="flex flex-wrap items-end justify-between gap-6 border-t border-ink/15 pt-12 md:pt-16">
          <div>
            <Eyebrow>{projectsSection.label}</Eyebrow>
            <h2 className="mt-6 font-light leading-[1.15]" style={{ fontSize: "clamp(2.25rem, 4vw, 4rem)" }}>
              {projectsSection.title}
            </h2>
          </div>
          <a
            href={projectsSection.allProjectsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 text-sm font-medium"
          >
            {projectsSection.allProjects}
            <span className="sr-only">{projectsSection.newTab}</span>
            <Arrow className="h-4 w-4 transition-transform duration-500 ease-calm group-hover:-translate-x-1" />
          </a>
        </div>

        <ul className="mt-12 gap-5 sm:columns-2 md:mt-16 lg:columns-3">
          {projects.map((p) => {
            const name = p.project!.trim();
            const status = p.status?.trim();
            return (
              <li key={p.slug} data-card className="mb-5 break-inside-avoid">
                <a
                  href={projectUrl(p)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name} — ${projectsSection.viewProject} ${projectsSection.newTab}`}
                  className="group block"
                >
                  <div className="relative overflow-hidden bg-ink/10">
                    {/* natural aspect ratio — the photo is never cropped */}
                    <img
                      src={photoSrc(p.file)}
                      alt={name}
                      width={p.width}
                      height={p.height}
                      loading="lazy"
                      decoding="async"
                      className="block h-auto w-full transition-opacity duration-700 ease-calm group-hover:opacity-90"
                    />
                    {status && (
                      <span className="absolute start-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-ink backdrop-blur">
                        {status}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-4 pt-4">
                    <h3 className="text-xl font-light md:text-2xl">{name}</h3>
                    <Arrow className="h-5 w-5 shrink-0 opacity-50 transition-[transform,opacity] duration-500 ease-calm group-hover:-translate-x-1 group-hover:opacity-100" />
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
