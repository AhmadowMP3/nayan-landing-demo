import { placeholder } from "../content";

/**
 * Visible marker for content that is still to be confirmed with the client.
 * Hidden while `placeholder.showBadges` is false (the pitch shows mock data as if final).
 */
export default function PlaceholderBadge({ short = false, className = "" }: { short?: boolean; className?: string }) {
  if (!placeholder.showBadges) return null;
  return (
    <span
      data-placeholder
      className={`inline-flex items-center gap-2 rounded-full border border-dashed border-amber-600/60 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-700 ${className}`}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-amber-500" />
      {short ? placeholder.short : placeholder.badge}
    </span>
  );
}
