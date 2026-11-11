/** One LLM session, as dllms understands it regardless of the tool that wrote it. */
export type Session = {
  id: string;
  /** Tool that produced the session. Only Claude Code for now. */
  tool: "claude-code";
  title: string;
  /** Working directory the session was started in. Sessions are grouped by it. */
  cwd: string;
  /** Path of the raw session file on disk. */
  transcriptPath: string;
  /** ISO 8601 timestamps. */
  created: string;
  modified: string;
  messageCount: number;
  firstPrompt: string;
  /** Not decided yet: kept optional so the UI can show a placeholder. */
  summary?: string;
};

export type SessionGroup = {
  cwd: string;
  sessions: Session[];
  /** Most recent `modified` among the group's sessions. */
  lastModified: string;
};
