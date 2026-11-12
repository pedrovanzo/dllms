import { ACTIVITY_COLORS, ACTIVITY_LABELS, ACTIVITY_STATUSES } from "@/lib/activity";
import { ACTIVITY_ICONS, ChevronIcon } from "./icons";

/** Always-visible reminder of what the activity icons, magnitude chip and chevron mean. */
export function IconLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-500">
      {ACTIVITY_STATUSES.map((status) => {
        const Icon = ACTIVITY_ICONS[status];
        return (
          <span
            key={status}
            className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 ${ACTIVITY_COLORS[status]}`}
          >
            <Icon className="h-2.5 w-2.5" />
            {ACTIVITY_LABELS[status]}
          </span>
        );
      })}
      <span className="inline-flex items-center gap-1">
        <span className="rounded-full bg-neutral-800 px-1.5 py-0.5 font-mono text-[10px] text-neutral-300 dark:bg-neutral-700">
          ±N
        </span>
        order of magnitude, in days
      </span>
      <span className="inline-flex items-center gap-1">
        <ChevronIcon className="h-3 w-3 rotate-90" />
        expand / collapse a group
      </span>
    </div>
  );
}
