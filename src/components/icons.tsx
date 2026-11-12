import type { ComponentType } from "react";
import type { ActivityStatus } from "@/lib/activity";

type IconProps = { className?: string };

const common = {
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function SparkleIcon({ className }: IconProps) {
  return (
    <svg className={className} {...common}>
      <path d="M8 1.5l1.1 3.4L12.5 6l-3.4 1.1L8 10.5l-1.1-3.4L3.5 6l3.4-1.1z" />
      <path d="M13 9.5l.5 1.5 1.5.5-1.5.5-.5 1.5-.5-1.5L11 11.5l1.5-.5z" />
    </svg>
  );
}

function PulseIcon({ className }: IconProps) {
  return (
    <svg className={className} {...common}>
      <path d="M1 8.5h2.8l1.2-4 2.6 7 1.2-3h3.4l1.3 2" />
    </svg>
  );
}

function HourglassIcon({ className }: IconProps) {
  return (
    <svg className={className} {...common}>
      <path d="M4 1.5h8M4 14.5h8" />
      <path d="M4.6 1.5c0 3.3 3.1 3.6 3.4 4.8.3-1.2 3.4-1.5 3.4-4.8" />
      <path d="M4.6 14.5c0-3.3 3.1-3.6 3.4-4.8.3 1.2 3.4 1.5 3.4 4.8" />
    </svg>
  );
}

function MoonIcon({ className }: IconProps) {
  return (
    <svg className={className} {...common}>
      <path d="M10.8 2.3a6 6 0 1 0 2.9 10.4A6.5 6.5 0 0 1 10.8 2.3z" />
    </svg>
  );
}

function ArchiveIcon({ className }: IconProps) {
  return (
    <svg className={className} {...common}>
      <rect x="2" y="2.5" width="12" height="2.5" rx="0.6" />
      <path d="M3 5v7.5a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V5" />
      <path d="M6.5 8.2h3" />
    </svg>
  );
}

export const ACTIVITY_ICONS: Record<ActivityStatus, ComponentType<IconProps>> = {
  new: SparkleIcon,
  active: PulseIcon,
  aging: HourglassIcon,
  stale: MoonIcon,
  deprecated: ArchiveIcon,
};

/** Caret that points right when collapsed, down when expanded — rotate via className. */
export function ChevronIcon({ className }: IconProps) {
  return (
    <svg className={className} {...common}>
      <path d="M5 2.5l5.5 5.5-5.5 5.5" />
    </svg>
  );
}

/** Terminal prompt glyph — used for the group actions trigger. */
export function TerminalIcon({ className }: IconProps) {
  return (
    <svg className={className} {...common}>
      <rect x="1.5" y="2" width="13" height="12" rx="1.3" />
      <path d="M4.3 6l2.6 2.3L4.3 10.6" />
      <path d="M8.5 10.6h3.2" />
    </svg>
  );
}
