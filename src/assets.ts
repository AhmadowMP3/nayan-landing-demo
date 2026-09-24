// Paths to files in /public.

export const assets = {
  logo: "/assets/logowhite.webp",
};

export type FrameSet = "desktop" | "mobile";

/** Both sets have the same beats at the same frame numbers. */
export const FRAME_COUNT = 240;

/** Frame index is 0-based here; files are 0001.webp → 0240.webp. */
export const frameSrc = (set: FrameSet, index: number) =>
  `/frames/${set}/${String(index + 1).padStart(4, "0")}.webp`;

/** Portrait (height > width) → mobile set, otherwise desktop. */
export const pickFrameSet = (): FrameSet =>
  window.innerHeight > window.innerWidth ? "mobile" : "desktop";
