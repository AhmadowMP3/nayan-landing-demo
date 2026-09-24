import { FRAME_COUNT, frameSrc, type FrameSet } from "../assets";

/** Frame 1 and every 8th frame — the loader waits for these. */
export const KEY_FRAMES = Array.from({ length: Math.ceil(FRAME_COUNT / 8) }, (_, i) => i * 8);

/**
 * Progressive load order: frame 1 → every 8th → every 4th → every 2nd → all.
 * `first` (the frame currently on screen) jumps the queue, e.g. after switching sets.
 */
export function preloadOrder(first = 0): number[] {
  const seen = new Set<number>();
  const order: number[] = [];
  const push = (i: number) => {
    if (!seen.has(i)) {
      seen.add(i);
      order.push(i);
    }
  };
  push(first);
  push(0);
  for (const step of [8, 4, 2, 1]) {
    for (let i = 0; i < FRAME_COUNT; i += step) push(i);
    if (step === 8) push(FRAME_COUNT - 1);
  }
  return order;
}

type Status = "idle" | "loading" | "loaded" | "failed";

const MAX_PARALLEL = 6;

/** Loads frames for both sets on demand and answers "what's the closest frame I can draw?". */
export class FrameStore {
  private images: Record<FrameSet, (HTMLImageElement | null)[]> = {
    desktop: Array(FRAME_COUNT).fill(null),
    mobile: Array(FRAME_COUNT).fill(null),
  };
  private status: Record<FrameSet, Status[]> = {
    desktop: Array(FRAME_COUNT).fill("idle"),
    mobile: Array(FRAME_COUNT).fill("idle"),
  };
  private queue: { set: FrameSet; index: number }[] = [];
  private active = 0;
  private destroyed = false;

  constructor(private onSettle: (set: FrameSet, index: number) => void) {}

  /** Replace the pending queue with `order` for `set` (requests already in flight finish). */
  load(set: FrameSet, order: number[]) {
    this.queue = order.filter((i) => this.status[set][i] === "idle").map((index) => ({ set, index }));
    this.pump();
  }

  /** Loaded or failed — either way the loader shouldn't wait for it any more. */
  isSettled(set: FrameSet, index: number) {
    const s = this.status[set][index];
    return s === "loaded" || s === "failed";
  }

  hasFailures(set: FrameSet) {
    return this.status[set].includes("failed");
  }

  /** The loaded frame closest to `index`, or null if none has loaded yet. */
  nearest(set: FrameSet, index: number): HTMLImageElement | null {
    const imgs = this.images[set];
    for (let d = 0; d < FRAME_COUNT; d++) {
      const before = imgs[index - d];
      if (before) return before;
      const after = imgs[index + d];
      if (after) return after;
    }
    return null;
  }

  destroy() {
    this.destroyed = true;
    this.queue = [];
  }

  private pump() {
    while (this.active < MAX_PARALLEL && this.queue.length) {
      const { set, index } = this.queue.shift()!;
      if (this.status[set][index] !== "idle") continue;
      this.fetch(set, index);
    }
  }

  private fetch(set: FrameSet, index: number) {
    this.status[set][index] = "loading";
    this.active++;
    const img = new Image();
    img.decoding = "async";
    img.src = frameSrc(set, index);
    img
      .decode()
      .then(() => {
        this.status[set][index] = "loaded";
        this.images[set][index] = img;
      })
      .catch(() => {
        this.status[set][index] = "failed";
      })
      .finally(() => {
        this.active--;
        if (this.destroyed) return;
        this.onSettle(set, index);
        this.pump();
      });
  }
}
