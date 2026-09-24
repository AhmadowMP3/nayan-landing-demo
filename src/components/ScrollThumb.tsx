import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { jumpTo } from "../lib/smoothScroll";

/**
 * Branded scrollbar with no track: a gold thumb floating over the page (the native scrollbar is
 * hidden on mouse/trackpad devices in index.css — touch devices keep their own overlay scrollbar).
 * Draggable; dims when idle.
 */
export default function ScrollThumb() {
  const thumbRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const thumb = thumbRef.current!;
    let idle = 0;
    let dragging = false;

    const metrics = () => {
      const vh = window.innerHeight;
      const max = document.documentElement.scrollHeight - vh;
      const h = Math.max(48, (vh * vh) / (max + vh));
      return { vh, max, h };
    };

    const place = () => {
      const { vh, max, h } = metrics();
      const p = max > 0 ? window.scrollY / max : 0;
      thumb.style.height = `${h}px`;
      thumb.style.transform = `translateY(${p * (vh - h - 8)}px)`;
      thumb.style.display = max > 0 ? "block" : "none";
    };

    const wake = () => {
      setActive(true);
      window.clearTimeout(idle);
      idle = window.setTimeout(() => !dragging && setActive(false), 1200);
    };

    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: () => {
        place();
        wake();
      },
      onRefresh: place,
    });
    window.addEventListener("resize", place);
    place();

    let startY = 0;
    let startScroll = 0;
    const onDown = (e: PointerEvent) => {
      e.preventDefault();
      dragging = true;
      startY = e.clientY;
      startScroll = window.scrollY;
      thumb.setPointerCapture(e.pointerId);
      wake();
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const { vh, max, h } = metrics();
      jumpTo(startScroll + ((e.clientY - startY) * max) / (vh - h - 8));
    };
    const onUp = () => {
      dragging = false;
      wake();
    };
    thumb.addEventListener("pointerdown", onDown);
    thumb.addEventListener("pointermove", onMove);
    thumb.addEventListener("pointerup", onUp);
    thumb.addEventListener("pointercancel", onUp);

    return () => {
      st.kill();
      window.removeEventListener("resize", place);
      window.clearTimeout(idle);
      thumb.removeEventListener("pointerdown", onDown);
      thumb.removeEventListener("pointermove", onMove);
      thumb.removeEventListener("pointerup", onUp);
      thumb.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <div
      ref={thumbRef}
      aria-hidden="true"
      onMouseEnter={() => setActive(true)}
      className={`fixed right-1 top-1 z-[55] hidden w-1.5 cursor-grab touch-none rounded-full bg-gradient-to-b from-[#d4b37c] to-[#b8955a] shadow-[0_0_0_1px_rgba(22,19,15,0.12),0_2px_8px_rgba(22,19,15,0.25)] transition-[opacity,width] duration-500 ease-calm hover:w-2 active:cursor-grabbing ${
        active ? "opacity-100" : "opacity-60"
      }`}
    />
  );
}
