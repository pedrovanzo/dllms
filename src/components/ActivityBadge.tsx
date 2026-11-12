import { ACTIVITY_COLORS, ACTIVITY_LABELS, activityStatus, magnitudeBadge } from "@/lib/activity";
import { ACTIVITY_ICONS } from "./icons";

/** Icon + status label, plus a small signed order-of-magnitude chip, for a timestamp. */
export function ActivityBadge({
  iso,
  now,
  size = "md",
}: {
  iso: string;
  now: number;
  size?: "sm" | "md";
}) {
  const status = activityStatus(iso, now);
  const Icon = ACTIVITY_ICONS[status];
  const isSmall = size === "sm";

  return (
    <span className="inline-flex items-center gap-1">
      <span
        className={`inline-flex items-center gap-1 rounded-full font-medium ${ACTIVITY_COLORS[status]} ${
          isSmall ? "px-1.5 py-0.5 text-[11px]" : "px-2 py-0.5 text-xs"
        }`}
      >
        <Icon className={isSmall ? "h-2.5 w-2.5" : "h-3 w-3"} />
        {ACTIVITY_LABELS[status]}
      </span>
      <span
        className="rounded-full bg-neutral-800 px-1.5 py-0.5 font-mono text-[10px] text-neutral-300 dark:bg-neutral-700"
        title="Order of magnitude of elapsed time, in days"
      >
        {magnitudeBadge(iso, now)}
      </span>
    </span>
  );
}
