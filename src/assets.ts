// Paths to files in /public. Prefixed with Vite's BASE_URL so the site works from any base path.

const base = import.meta.env.BASE_URL.replace(/\/?$/, "/");
export const publicUrl = (path: string) => base + path.replace(/^\//, "");

export type FrameSet = "desktop" | "mobile";

/** Both sets have the same beats at the same frame numbers. */
export const FRAME_COUNT = 240;

/** Frame index is 0-based here; files are 0001.webp → 0240.webp. */
export const frameSrc = (set: FrameSet, index: number) =>
  publicUrl(`frames/${set}/${String(index + 1).padStart(4, "0")}.webp`);

/** A still from the film by its 1-based frame number (as named on disk). */
export const still = (frame: number, set: FrameSet = "desktop") => frameSrc(set, frame - 1);

/** Portrait (height > width) → mobile set, otherwise desktop. */
export const pickFrameSet = (): FrameSet =>
  window.innerHeight > window.innerWidth ? "mobile" : "desktop";

export const assets = {
  logo: publicUrl("assets/logowhite.webp"),
  logoDark: publicUrl("assets/logoblack.webp"),
  /** Section 2 chevrons — real project photos (files in /public/assets/nayan, see manifest.json). */
  chevrons: ["nayan-townhouse-22-01.webp", "nayan-30-01.webp", "nayan-23-01.webp"],
  /**
   * Section 6 — one real photo per service row, in the order of `services` in content.ts:
   * development → a finished townhouse, custom design → an interior, management → a rental
   * project, investment → Malqa Center.
   */
  services: ["nayan-townhouse-22-01.webp", "nayan-site-05.webp", "nayan-26-01.webp", "almalqa-center-01.webp"],
};
