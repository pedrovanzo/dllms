import "server-only";
import { existsSync } from "node:fs";
import os from "node:os";
import path from "node:path";

/**
 * Folder where Claude Code keeps its sessions.
 * Default: `~/.claude/projects`, which resolves on macOS, Linux and Windows.
 * Override with the `DLLMS_SESSIONS_DIR` environment variable (see `.env.example`).
 */
export function getSessionsDir(): string {
  const override = process.env.DLLMS_SESSIONS_DIR?.trim();
  return override ? path.resolve(override) : path.join(os.homedir(), ".claude", "projects");
}

export function getSessionsSource() {
  const dir = getSessionsDir();
  return {
    dir,
    overridden: Boolean(process.env.DLLMS_SESSIONS_DIR?.trim()),
    exists: existsSync(dir),
    platform: process.platform,
  };
}
