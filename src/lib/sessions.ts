import "server-only";
import { mockSessions } from "./mock-sessions";
import type { Session, SessionGroup } from "./types";

// MVP: everything reads from mocked data. Swap these for a real reader of getSessionsDir() later.

export async function listSessions(): Promise<Session[]> {
  return [...mockSessions].sort((a, b) => b.modified.localeCompare(a.modified));
}

export async function getSession(id: string): Promise<Session | undefined> {
  return mockSessions.find((s) => s.id === id);
}

export function groupByDir(sessions: Session[]): SessionGroup[] {
  const groups = new Map<string, Session[]>();
  for (const s of sessions) groups.set(s.cwd, [...(groups.get(s.cwd) ?? []), s]);
  return [...groups.entries()]
    .map(([cwd, list]) => {
      const sorted = list.sort((a, b) => b.modified.localeCompare(a.modified));
      return { cwd, sessions: sorted, lastModified: sorted[0].modified };
    })
    .sort((a, b) => b.lastModified.localeCompare(a.lastModified));
}
