"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ActivityBadge } from "./ActivityBadge";
import { GroupActionsModal } from "./GroupActionsModal";
import { ChevronIcon, TerminalIcon } from "./icons";
import {
  RECENCY_LABELS,
  RECENCY_STYLES,
  baseName,
  formatDate,
  recencyTier,
  relativeTime,
  type RecencyTier,
} from "@/lib/format";
import type { SessionGroup } from "@/lib/types";

type Tab = "all" | RecencyTier;

const TABS: Tab[] = ["all", "today", "week", "month", "older"];

export function SessionsBrowser({ groups, now }: { groups: SessionGroup[]; now: number }) {
  const [tab, setTab] = useState<Tab>("all");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [actionsCwd, setActionsCwd] = useState<string | null>(null);

  function toggleExpanded(cwd: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(cwd)) next.delete(cwd);
      else next.add(cwd);
      return next;
    });
  }

  const withTier = useMemo(
    () => groups.map((group) => ({ ...group, tier: recencyTier(group.lastModified, now) })),
    [groups, now],
  );

  const counts = useMemo(() => {
    const result: Record<Tab, number> = { all: withTier.length, today: 0, week: 0, month: 0, older: 0 };
    for (const group of withTier) result[group.tier]++;
    return result;
  }, [withTier]);

  const tabFiltered = tab === "all" ? withTier : withTier.filter((group) => group.tier === tab);

  const query = search.trim().toLowerCase();
  const visible = useMemo(() => {
    if (!query) return tabFiltered.map((group) => ({ ...group, sessionTitleMatch: false }));
    return tabFiltered
      .map((group) => {
        const groupNameMatches = baseName(group.cwd).toLowerCase().includes(query);
        if (groupNameMatches) return { ...group, sessionTitleMatch: false };
        const matchingSessions = group.sessions.filter((s) => s.title.toLowerCase().includes(query));
        if (matchingSessions.length === 0) return null;
        return { ...group, sessions: matchingSessions, sessionTitleMatch: true };
      })
      .filter((g): g is NonNullable<typeof g> => g !== null);
  }, [tabFiltered, query]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 border-b border-neutral-200 pb-4 dark:border-neutral-800">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-full px-3 py-1 text-sm transition ${
              tab === t
                ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800"
            }`}
          >
            {t === "all" ? "All" : RECENCY_LABELS[t]} · {counts[t]}
          </button>
        ))}
      </div>

      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search groups or session titles…"
        className="w-full rounded-md border border-neutral-300 px-3 py-1.5 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:border-neutral-700 dark:bg-neutral-900 dark:placeholder:text-neutral-600"
      />

      {tabFiltered.length === 0 && (
        <p className="text-sm text-neutral-500">No groups in this range.</p>
      )}

      {tabFiltered.length > 0 && visible.length === 0 && (
        <p className="text-sm text-neutral-500">No groups or sessions match “{search.trim()}”.</p>
      )}

      {visible.map((group) => {
        const groupStyle = RECENCY_STYLES[group.tier];
        const isCollapsed = !expanded.has(group.cwd) && !group.sessionTitleMatch;
        return (
          <section
            key={group.cwd}
            className={`rounded-lg border border-l-4 border-neutral-200 dark:border-neutral-800 ${groupStyle.border}`}
          >
            <div className="flex flex-wrap items-center gap-x-3 border-b border-neutral-200 pr-2 dark:border-neutral-800">
              <button
                type="button"
                onClick={() => toggleExpanded(group.cwd)}
                aria-expanded={!isCollapsed}
                className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 px-4 py-3 text-left"
              >
                <ChevronIcon
                  className={`h-3 w-3 shrink-0 text-neutral-400 transition-transform ${isCollapsed ? "" : "rotate-90"}`}
                />
                <span className={`h-2 w-2 rounded-full ${groupStyle.dot}`} aria-hidden />
                <h2 className="font-semibold">{baseName(group.cwd)}</h2>
                <span className="font-mono text-xs text-neutral-500 break-all">{group.cwd}</span>
              </button>
              <span className="ml-auto flex items-center gap-2">
                <ActivityBadge iso={group.lastModified} now={now} />
                <span className="text-xs text-neutral-500">
                  {group.sessions.length} · {relativeTime(group.lastModified, now)}
                </span>
                <button
                  type="button"
                  onClick={() => setActionsCwd(group.cwd)}
                  title="Project actions"
                  className="rounded-md border border-neutral-300 p-1.5 text-neutral-600 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800"
                >
                  <TerminalIcon className="h-3.5 w-3.5" />
                </button>
              </span>
            </div>
            {!isCollapsed && (
              <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {group.sessions.map((s) => {
                  const sessionTier = recencyTier(s.modified, now);
                  const sessionStyle = RECENCY_STYLES[sessionTier];
                  return (
                    <li key={s.id}>
                      <Link
                        href={`/sessions/${s.id}`}
                        className="flex flex-wrap items-center gap-x-4 px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${sessionStyle.dot}`} aria-hidden />
                        <span className={sessionStyle.title}>{s.title}</span>
                        <span className="text-sm text-neutral-500">{s.messageCount} messages</span>
                        <span className="ml-auto flex items-center gap-2">
                          <ActivityBadge iso={s.modified} now={now} size="sm" />
                          <span className="text-xs text-neutral-500">{relativeTime(s.modified, now)}</span>
                          <span className="text-xs text-neutral-400">{formatDate(s.modified)}</span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        );
      })}

      {actionsCwd && <GroupActionsModal cwd={actionsCwd} onClose={() => setActionsCwd(null)} />}
    </div>
  );
}
