import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { getSessionsDir } from "./config";
import type { Session, SessionGroup } from "./types";

const TITLE_PREVIEW_LENGTH = 80;

export async function listSessions(): Promise<Session[]> {
  const projectDirs = await listProjectDirs();

  const sessions = await Promise.all(
    projectDirs.map(async (projectDir) => {
      const files = await listSessionFiles(projectDir);
      const parsed = await Promise.all(files.map(parseSessionFile));
      return parsed.filter((s): s is Session => s !== null);
    }),
  );

  return sessions.flat().sort((a, b) => b.modified.localeCompare(a.modified));
}

export async function getSession(id: string): Promise<Session | undefined> {
  const projectDirs = await listProjectDirs();

  for (const projectDir of projectDirs) {
    const candidate = path.join(projectDir, `${id}.jsonl`);
    const session = await parseSessionFile(candidate).catch(() => null);
    if (session) return session;
  }

  return undefined;
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

async function listProjectDirs(): Promise<string[]> {
  const dir = getSessionsDir();
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    return entries.filter((e) => e.isDirectory()).map((e) => path.join(dir, e.name));
  } catch {
    return [];
  }
}

async function listSessionFiles(projectDir: string): Promise<string[]> {
  try {
    const entries = await fs.readdir(projectDir, { withFileTypes: true });
    return entries
      .filter((e) => e.isFile() && e.name.endsWith(".jsonl"))
      .map((e) => path.join(projectDir, e.name));
  } catch {
    return [];
  }
}

/**
 * Claude Code session files are JSONL with mixed line types (user/assistant
 * turns, ai-title, and internal bookkeeping like attachments and hooks).
 * Lines are append-only chronological, so the last qualifying timestamp wins
 * as `modified`, and a parse error on a trailing line (an in-progress session
 * still being written) is tolerated rather than failing the whole file.
 */
async function parseSessionFile(filePath: string): Promise<Session | null> {
  let raw: string;
  try {
    raw = await fs.readFile(filePath, "utf8");
  } catch {
    return null;
  }

  let cwd: string | null = null;
  let created: string | null = null;
  let modified: string | null = null;
  let messageCount = 0;
  let firstPrompt: string | null = null;
  let aiTitle: string | null = null;

  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    let entry: Record<string, unknown>;
    try {
      entry = JSON.parse(trimmed);
    } catch {
      continue;
    }

    if (entry.type === "ai-title" && typeof entry.aiTitle === "string") {
      aiTitle = entry.aiTitle;
      continue;
    }

    if (entry.type !== "user" && entry.type !== "assistant") continue;
    if (entry.isSidechain) continue;

    if (typeof entry.cwd === "string") cwd ??= entry.cwd;
    if (typeof entry.timestamp === "string") {
      created ??= entry.timestamp;
      modified = entry.timestamp;
    }
    messageCount++;

    if (firstPrompt === null && entry.type === "user") {
      const text = extractText((entry.message as { content?: unknown } | undefined)?.content);
      if (text) firstPrompt = text;
    }
  }

  if (!cwd || !created || !modified) return null;

  return {
    id: path.basename(filePath, ".jsonl"),
    tool: "claude-code",
    title: aiTitle ?? truncate(firstPrompt ?? "Untitled session", TITLE_PREVIEW_LENGTH),
    cwd,
    transcriptPath: filePath,
    created,
    modified,
    messageCount,
    firstPrompt: firstPrompt ?? "",
  };
}

function extractText(content: unknown): string | null {
  if (typeof content === "string") return content.trim() || null;
  if (Array.isArray(content)) {
    for (const block of content) {
      if (block && typeof block === "object" && (block as { type?: unknown }).type === "text") {
        const text = (block as { text?: unknown }).text;
        if (typeof text === "string" && text.trim()) return text.trim();
      }
    }
  }
  return null;
}

function truncate(text: string, max: number): string {
  const singleLine = text.replace(/\s+/g, " ").trim();
  return singleLine.length > max ? `${singleLine.slice(0, max - 1)}…` : singleLine;
}
