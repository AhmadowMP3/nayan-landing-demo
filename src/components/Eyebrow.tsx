import type { ReactNode } from "react";

/** Small section label with a short rule before it (the rule sits on the start side — right, in RTL). */
export default function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-3 text-sm font-medium tracking-wide opacity-70 ${className}`}>
      <span aria-hidden="true" className="block h-px w-8 bg-current" />
      {children}
    </p>
  );
}
