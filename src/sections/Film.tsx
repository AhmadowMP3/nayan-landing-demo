import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { assets, FRAME_COUNT, pickFrameSet, type FrameSet } from "../assets";
import { brand, film } from "../content";
import { FrameStore, KEY_FRAMES, preloadOrder } from "../lib/frames";
import { prefersReducedMotion } from "../lib/motion";
import { jumpTo, setScrollLocked } from "../lib/smoothScroll";
import Arrow from "../components/Arrow";
import Loader from "../components/Loader";

gsap.registerPlugin(ScrollTrigger);

/**
 * Section 1 — the scroll film.
 * A ~700vh section with a sticky full-screen canvas; scroll progress 0→1 plays frames 1→240.
 * The timeline is measured in frames (time 0 = frame 1, time 239 = frame 240), so the
 * chapter overlays below are placed by frame number.
 */

const LAST = FRAME_COUNT - 1;
/** Timeline position of a 1-based frame number. */
const at = (frame: number) => frame - 1;

export default function Film() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInnerRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const statementRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  // ——— frames + canvas + scroll timeline ———
  useLayoutEffect(() => {
    const section = sectionRef.current!;
    const canvas = canvasRef.current!;
    const ctx2d = canvas.getContext("2d")!;
    const reduce = prefersReducedMotion();

    let set: FrameSet = pickFrameSet();
    let target = 0; // frame index the scroll asks for
    let drawnImg: HTMLImageElement | null = null;
    let raf = 0;
    let isReady = false;

    const gate = reduce ? [0] : KEY_FRAMES; // what the loader waits for

    const store = new FrameStore((s) => {
      if (s !== set) return;
      if (!isReady) {
        const settled = gate.filter((i) => store.isSettled(set, i)).length;
        setProgress(settled / gate.length);
        if (settled === gate.length) {
          isReady = true;
          setReady(true);
          if (store.hasFailures(set)) console.warn(`[film] some frames in /frames/${set}/ failed to load`);
        }
      }
      schedule();
    });

    const loadSet = () => store.load(set, reduce ? [0] : preloadOrder(target));

    const draw = () => {
      raf = 0;
      const other: FrameSet = set === "desktop" ? "mobile" : "desktop";
      // nearest loaded frame of the active set; fall back to the other set right after a switch
      const img = store.nearest(set, target) ?? store.nearest(other, target);
      if (!img || img === drawnImg) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight); // cover
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx2d.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
      drawnImg = img;
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };

    // The section is 700vh, so a resize / rotation changes its length. Keep the viewer on the
    // same moment of the film, not the same pixel offset: note the progress when the window
    // resizes (before ScrollTrigger's debounced refresh) and restore it after the refresh.
    let st: ScrollTrigger | undefined;
    let savedProgress: number | null = null;
    const restoreProgress = () => {
      if (st && savedProgress !== null && savedProgress > 0 && savedProgress < 1) {
        jumpTo(st.start + savedProgress * (st.end - st.start));
      }
      savedProgress = null;
    };
    ScrollTrigger.addEventListener("refresh", restoreProgress);

    const resize = () => {
      if (st && savedProgress === null) savedProgress = st.progress;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      ctx2d.imageSmoothingQuality = "high";
      drawnImg = null; // resizing clears the canvas
      const next = pickFrameSet();
      if (next !== set) {
        set = next; // keep `target`, just swap sets
        loadSet();
      }
      schedule();
    };

    resize();
    loadSet();
    window.addEventListener("resize", resize);
    window.addEventListener("orientationchange", resize);

    const gctx = gsap.context(() => {
      const statements = statementRefs.current.filter(Boolean) as HTMLDivElement[];
      const rise = reduce ? 0 : 1; // reduced motion: fades only
      const proxy = { frame: 0 };

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: reduce ? true : 0.6,
        },
      });

      // the film itself (reduced motion keeps frame 1 as a still)
      tl.to(
        proxy,
        {
          frame: reduce ? 0 : LAST,
          duration: LAST,
          onUpdate: () => {
            const i = Math.round(proxy.frame);
            if (i !== target) {
              target = i;
              schedule();
            }
          },
        },
        0,
      );

      // frames 1–64: hero — visible at frame 1, gone by ~40
      tl.to(hintRef.current, { autoAlpha: 0, duration: 5 }, 0);
      tl.to(heroRef.current, { autoAlpha: 0, y: -48 * rise, duration: 28, ease: "power2.in" }, at(12));

      // chapters: fade + rise in, hold, fade out before the next
      const chapter = (el: HTMLElement, inFrame: number, outFrame?: number) => {
        tl.fromTo(
          el,
          { autoAlpha: 0, y: 40 * rise },
          { autoAlpha: 1, y: 0, duration: 10, ease: "power2.out" },
          at(inFrame),
        );
        if (outFrame) tl.to(el, { autoAlpha: 0, y: -32 * rise, duration: 9, ease: "power2.in" }, at(outFrame) - 9);
      };
      chapter(statements[0], 97, 144); // the living room
      chapter(statements[1], 147, 192); // out through the window, across to B
      chapter(statements[2], 225); // B's interior — holds as the film unpins

      st = tl.scrollTrigger;
    }, section);

    return () => {
      ScrollTrigger.removeEventListener("refresh", restoreProgress);
      window.removeEventListener("resize", resize);
      window.removeEventListener("orientationchange", resize);
      cancelAnimationFrame(raf);
      store.destroy();
      gctx.revert();
    };
  }, []);

  // ——— loader: lock scroll until ready, then play the hero in ———
  useLayoutEffect(() => {
    if (!ready) {
      setScrollLocked(true);
      gsap.set([...heroInnerRef.current!.children, ...hintRef.current!.children], { autoAlpha: 0 });
      return;
    }
    setScrollLocked(false);
    const rise = prefersReducedMotion() ? 0 : 1;
    const tween = gsap.fromTo(
      // children only — the wrappers belong to the scroll timeline
      [...heroInnerRef.current!.children, ...hintRef.current!.children],
      { autoAlpha: 0, y: 24 * rise },
      { autoAlpha: 1, y: 0, duration: 1.6, ease: "power3.out", stagger: 0.12, delay: 0.35 },
    );
    return () => {
      tween.revert();
    };
  }, [ready]);

  useEffect(() => () => setScrollLocked(false), []);

  return (
    <>
      <Loader progress={progress} done={ready} />

      <section ref={sectionRef} id="film" aria-label={film.label} className="relative h-[700vh] bg-ink">
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />

          {/* subtle dark gradient so overlay text stays readable */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {/* frames 1–40: hero */}
          <div ref={heroRef} className="absolute inset-x-0 bottom-0 px-5 pb-[13vh] md:px-12 md:pb-[14vh]">
            <div ref={heroInnerRef} className="max-w-3xl text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.3)]">
              <img src={assets.logo} alt={brand.logoAlt} className="mb-8 h-11 w-auto md:mb-10 md:h-14" />
              <h1 className="font-light leading-[1.1]" style={{ fontSize: "clamp(2.75rem, 7vw, 6.5rem)" }}>
                {film.headline}
              </h1>
              <p className="mt-3 text-xl font-light text-white/85 md:mt-4 md:text-3xl">{film.subline}</p>
              <div className="mt-9 md:mt-11">
                <a
                  href={brand.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full bg-white py-3.5 pe-6 ps-7 text-[15px] font-medium text-ink transition-colors duration-300 hover:bg-sand"
                >
                  {film.cta}
                  <Arrow className="h-4 w-4 transition-transform duration-500 ease-calm group-hover:-translate-x-1" />
                </a>
              </div>
            </div>
          </div>

          {/* frame 1 only: scroll hint */}
          <div
            ref={hintRef}
            className="absolute bottom-8 end-5 flex items-center gap-3 text-xs text-white/75 md:bottom-12 md:end-12"
          >
            <span>{film.scrollHint}</span>
            <span className="relative block h-10 w-px overflow-hidden bg-white/25">
              <span className="absolute inset-x-0 top-0 h-1/2 bg-white motion-safe:animate-[scrollHint_2.4s_cubic-bezier(0.22,1,0.36,1)_infinite]" />
            </span>
          </div>

          {/* chapter statements */}
          {film.statements.map((line, i) => (
            <div
              key={line}
              ref={(el) => {
                statementRefs.current[i] = el;
              }}
              className="invisible absolute inset-x-0 bottom-0 px-5 pb-[14vh] md:px-12 md:pb-[16vh]"
            >
              <p
                className="max-w-5xl text-balance font-light leading-[1.2] text-white [text-shadow:0_2px_28px_rgba(0,0,0,0.4)]"
                style={{ fontSize: "clamp(2.25rem, 5.5vw, 5.25rem)" }}
              >
                {line}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
