/** Helpers safe to use on server and client. */

export function isWindowsPath(p: string): boolean {
  return /^[A-Za-z]:[\\/]/.test(p) || p.startsWith("\\\\");
}

/** Last path segment, for compact display. */
export function baseName(p: string): string {
  const parts = p.split(/[\\/]/).filter(Boolean);
  return parts.at(-1) ?? p;
}

/** `vscode://file/...` URI that opens a folder or file in VS Code. */
export function vscodeUri(p: string): string {
  const normalized = p.replace(/\\/g, "/");
  return `vscode://file/${normalized.startsWith("/") ? normalized.slice(1) : normalized}`;
}

/** Command that resumes the session from the right directory, in the platform's usual shell. */
export function resumeCommand(cwd: string, id: string): string {
  return isWindowsPath(cwd)
    ? `cd "${cwd}"; claude --resume ${id}`
    : `cd "${cwd}" && claude --resume ${id}`;
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}
