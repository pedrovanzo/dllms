const HOUR = 3_600_000;
const DAY = 24 * HOUR;

/**
 * A richer, 5-step read on "how long since this was touched" than the
 * 4-tier recency used for tabs/colors elsewhere — meant for a standalone
 * icon+label badge, not for filtering.
 */
export type ActivityStatus = "new" | "active" | "aging" | "stale" | "deprecated";

export const ACTIVITY_STATUSES: ActivityStatus[] = ["new", "active", "aging", "stale", "deprecated"];

export function activityStatus(iso: string, now: number): ActivityStatus {
  const elapsed = now - new Date(iso).getTime();
  if (elapsed < HOUR) return "new";
  if (elapsed < 7 * DAY) return "active";
  if (elapsed < 30 * DAY) return "aging";
  if (elapsed < 180 * DAY) return "stale";
  return "deprecated";
}

export const ACTIVITY_LABELS: Record<ActivityStatus, string> = {
  new: "New",
  active: "Active",
  aging: "Aging",
  stale: "Stale",
  deprecated: "Deprecated",
};

export const ACTIVITY_COLORS: Record<ActivityStatus, string> = {
  new: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  active: "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300",
  aging: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  stale: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
  deprecated: "bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400",
};

/**
 * Signed base-10 order of magnitude of elapsed time in days, e.g. a session
 * from 2 hours ago is a fraction of a day old → negative; one from 3 months
 * ago is tens of days old → positive. Reads like a small "how far from
 * right-now" gauge: -4..-1 is minutes-to-hours, 0 is about a day, +1..+3 is
 * weeks to years.
 */
export function magnitudeBadge(iso: string, now: number): string {
  const elapsedDays = Math.max((now - new Date(iso).getTime()) / DAY, 1 / 1440);
  const magnitude = Math.floor(Math.log10(elapsedDays));
  return magnitude >= 0 ? `+${magnitude}` : `${magnitude}`;
}
