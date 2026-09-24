import { useEffect, useState } from "react";
import { pickFrameSet, type FrameSet } from "../assets";

/** The active frame set (portrait → mobile), re-checked on resize / orientation change. */
export function useFrameSet(): FrameSet {
  const [set, setSet] = useState<FrameSet>(pickFrameSet);
  useEffect(() => {
    const update = () => setSet(pickFrameSet());
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);
  return set;
}
