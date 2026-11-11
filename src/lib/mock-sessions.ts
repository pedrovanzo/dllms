import type { Session } from "./types";

/**
 * MVP placeholder data. Paths and contents are invented.
 * Mixes Windows and macOS paths on purpose to exercise both formats.
 */
export const mockSessions: Session[] = [
  {
    id: "3f2a9c1e-7b4d-4e8a-9f10-2c6d8e1a5b01",
    tool: "claude-code",
    title: "Clean npm and yarn caches safely",
    cwd: "C:\\Users\\demo\\Desktop\\dcleaner",
    transcriptPath:
      "C:\\Users\\demo\\.claude\\projects\\C--Users-demo-Desktop-dcleaner\\3f2a9c1e-7b4d-4e8a-9f10-2c6d8e1a5b01.jsonl",
    created: "2026-11-07T14:02:11Z",
    modified: "2026-11-08T23:43:05Z",
    messageCount: 184,
    firstPrompt: "Scan my computer for dependency temp files like node, npm and yarn ones.",
    summary:
      "Scanned and cleaned npm, Yarn and node-gyp caches plus stale node_modules. Documented the run in FIRST_RUN.md.",
  },
  {
    id: "8c1d2e3f-4a5b-4c6d-8e7f-9a0b1c2d3e02",
    tool: "claude-code",
    title: "Write the line endings footnote",
    cwd: "C:\\Users\\demo\\Desktop\\dcleaner",
    transcriptPath:
      "C:\\Users\\demo\\.claude\\projects\\C--Users-demo-Desktop-dcleaner\\8c1d2e3f-4a5b-4c6d-8e7f-9a0b1c2d3e02.jsonl",
    created: "2026-11-06T10:15:00Z",
    modified: "2026-11-06T10:48:30Z",
    messageCount: 22,
    firstPrompt: "Explain the LF and CRLF warning and add a .gitattributes.",
  },
  {
    id: "5e6f7a8b-9c0d-4e1f-a2b3-c4d5e6f7a803",
    tool: "claude-code",
    title: "Scaffold the dllms MVP",
    cwd: "C:\\Users\\demo\\Desktop\\dllms",
    transcriptPath:
      "C:\\Users\\demo\\.claude\\projects\\C--Users-demo-Desktop-dllms\\5e6f7a8b-9c0d-4e1f-a2b3-c4d5e6f7a803.jsonl",
    created: "2026-11-11T18:20:00Z",
    modified: "2026-11-11T19:05:42Z",
    messageCount: 41,
    firstPrompt: "Assemble a Next.js app with placeholder pages for listing LLM sessions.",
  },
  {
    id: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c04",
    tool: "claude-code",
    title: "Fix hydration warning on the landing page",
    cwd: "/Users/demo/code/portfolio-site",
    transcriptPath:
      "/Users/demo/.claude/projects/-Users-demo-code-portfolio-site/a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c04.jsonl",
    created: "2026-10-28T09:12:44Z",
    modified: "2026-10-28T11:30:02Z",
    messageCount: 63,
    firstPrompt: "The landing page logs a hydration mismatch. Find the cause.",
    summary:
      "Traced the mismatch to a locale-dependent date format rendered on both server and client.",
  },
  {
    id: "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d05",
    tool: "claude-code",
    title: "Add dark mode toggle",
    cwd: "/Users/demo/code/portfolio-site",
    transcriptPath:
      "/Users/demo/.claude/projects/-Users-demo-code-portfolio-site/b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d05.jsonl",
    created: "2026-10-30T20:01:10Z",
    modified: "2026-10-31T00:14:55Z",
    messageCount: 37,
    firstPrompt: "Add a dark mode toggle that remembers the choice.",
  },
  {
    id: "c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e06",
    tool: "claude-code",
    title: "Rate limiting middleware",
    cwd: "/Users/demo/work/api-gateway",
    transcriptPath:
      "/Users/demo/.claude/projects/-Users-demo-work-api-gateway/c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e06.jsonl",
    created: "2026-09-15T13:40:00Z",
    modified: "2026-09-16T17:22:18Z",
    messageCount: 112,
    firstPrompt: "Design a token bucket rate limiter for the gateway.",
  },
  {
    id: "d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f07",
    tool: "claude-code",
    title: "Brainstorm a session map",
    cwd: "C:\\Users\\demo\\Desktop",
    transcriptPath:
      "C:\\Users\\demo\\.claude\\projects\\C--Users-demo-Desktop\\d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f07.jsonl",
    created: "2026-11-11T17:30:00Z",
    modified: "2026-11-11T18:10:12Z",
    messageCount: 9,
    firstPrompt: "Is it possible to have a map of all my Claude sessions?",
  },
  {
    id: "e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a08",
    tool: "claude-code",
    title: "Investigate unclean shutdowns",
    cwd: "C:\\Users\\demo\\Desktop",
    transcriptPath:
      "C:\\Users\\demo\\.claude\\projects\\C--Users-demo-Desktop\\e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a08.jsonl",
    created: "2026-11-10T21:00:00Z",
    modified: "2026-11-10T22:45:31Z",
    messageCount: 27,
    firstPrompt: "Why does Windows try to auto repair on almost every boot?",
  },
];
