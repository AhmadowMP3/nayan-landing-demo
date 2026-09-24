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
  /** Section 2 chevrons — living room, building B, B's interior. */
  chevrons: [still(100), still(170), still(235)],
  /** Section 6 — one still per service row, in the order of `services` in content.ts. */
  services: [still(170), still(100), still(235), still(1)],
  /** Section 4 — building B from the street. */
  project: still(170),
};
