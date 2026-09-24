import { assets } from "../assets";
import { brand, loader } from "../content";

type Props = {
  /** 0 → 1 */
  progress: number;
  done: boolean;
};

/** Nayan logo + a thin progress line, shown until the first key frames are in. */
export default function Loader({ progress, done }: Props) {
  return (
    <div
      role="progressbar"
      aria-label={loader.label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      aria-hidden={done}
      className={`fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 bg-ink transition-[opacity,visibility] duration-1000 ease-calm ${
        done ? "invisible opacity-0" : "visible opacity-100"
      }`}
    >
      <img src={assets.logo} alt={brand.logoAlt} className="h-12 w-auto md:h-14" />
      <div className="h-px w-40 overflow-hidden bg-white/15 md:w-56">
        {/* grows from the start edge (right, in RTL) */}
        <div
          className="h-full origin-right bg-white/80 transition-transform duration-500 ease-calm"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </div>
  );
}
