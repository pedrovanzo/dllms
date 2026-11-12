/** Helpers safe to use on server and client. */

export function isWindowsPath(p: string): boolean {
  return /^[A-Za-z]:[\\/]/.test(p) || p.startsWith("\\\\");
}

/** Last path segment, for compact display. */
export function baseName(p: string): string {
  const parts = p.split(/[\\/]/).filter(Boolean);
  return parts.at(-1) ?? p;
}

/**
 * VS Code CLI command, always forcing a new window (`-n`). Deliberately not a
 * `vscode://file/...` URI: that scheme reuses an already-open window by
 * default, which can silently replace one a user is actively working in.
 */
export function vscodeCommand(p: string): string {
  return `code -n "${p}"`;
}

/**
 * Command that resumes the session from the right directory, in the
 * platform's usual shell. Windows uses separate lines rather than a `;` or
 * `&&` chain: `;` isn't a statement separator in cmd.exe, and `&&` isn't
 * supported in Windows PowerShell 5.1 (only PowerShell 7+) — separate lines
 * run correctly when pasted into any of cmd.exe, PowerShell 5.1/7+, or a
 * POSIX shell.
 */
export function resumeCommand(cwd: string, id: string): string {
  return isWindowsPath(cwd)
    ? `cd "${cwd}"\nclaude --resume ${id}`
    : `cd "${cwd}" && claude --resume ${id}`;
}

/** Command that starts a fresh session in a group's directory (no session to resume). */
export function startCommand(cwd: string): string {
  return isWindowsPath(cwd) ? `cd "${cwd}"\nclaude` : `cd "${cwd}" && claude`;
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

export type RecencyTier = "today" | "week" | "month" | "older";

const DAY_MS = 86_400_000;

/** Bucket a timestamp by how long ago it was, relative to `now`. */
export function recencyTier(iso: string, now: number = Date.now()): RecencyTier {
  const age = now - new Date(iso).getTime();
  if (age < DAY_MS) return "today";
  if (age < 7 * DAY_MS) return "week";
  if (age < 30 * DAY_MS) return "month";
  return "older";
}

export const RECENCY_LABELS: Record<RecencyTier, string> = {
  today: "Today",
  week: "This week",
  month: "This month",
  older: "Older",
};

/** Tailwind classes that scale color and size with how recent a tier is. */
export const RECENCY_STYLES: Record<RecencyTier, { dot: string; border: string; title: string }> = {
  today: {
    dot: "bg-emerald-500",
    border: "border-l-emerald-500",
    title: "text-base font-semibold",
  },
  week: {
    dot: "bg-sky-500",
    border: "border-l-sky-500",
    title: "text-base font-medium",
  },
  month: {
    dot: "bg-amber-500",
    border: "border-l-amber-400",
    title: "text-sm font-medium",
  },
  older: {
    dot: "bg-neutral-400 dark:bg-neutral-600",
    border: "border-l-neutral-300 dark:border-l-neutral-700",
    title: "text-sm font-normal text-neutral-600 dark:text-neutral-400",
  },
};

/** "3 hours ago" style label. Standard MDN divisions recipe. */
export function relativeTime(iso: string, now: number = Date.now()): string {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const divisions: { amount: number; unit: Intl.RelativeTimeFormatUnit }[] = [
    { amount: 60, unit: "seconds" },
    { amount: 60, unit: "minutes" },
    { amount: 24, unit: "hours" },
    { amount: 7, unit: "days" },
    { amount: 4.34524, unit: "weeks" },
    { amount: 12, unit: "months" },
    { amount: Number.POSITIVE_INFINITY, unit: "years" },
  ];

  let duration = (new Date(iso).getTime() - now) / 1000;
  for (const division of divisions) {
    if (Math.abs(duration) < division.amount) {
      return rtf.format(Math.round(duration), division.unit);
    }
    duration /= division.amount;
  }
  return rtf.format(Math.round(duration), "years");
}
