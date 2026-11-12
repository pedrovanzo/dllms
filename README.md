# dllms

**dllms** stands for *demo LLM sessions*.

## Why

Resuming an LLM coding session today means remembering which directory it was started in. Claude Code, for example, keeps each session's history tied to its working directory, so you have to open VS Code in the right folder, open a terminal, start `claude` and only then pick the session. That works, but it gets confusing when you use it often across many projects.

## What it will be

A local app with a navigable UI that works like a **map of every LLM session on the machine**:

- **Assembled on the spot.** Every time the app runs, it reads the session files the LLM tools already write. No database, no index files, no persistence of its own.
- **Predefined sources.** The app knows where and how to read each tool's session files, starting with Claude Code (`~/.claude/projects`).
- **Cross-platform.** The default sessions folder resolves on both macOS and Windows, and it can be changed.
- **Grouped by directory.** Sessions are listed in groups, one per working directory.
- **Session details.** Title, created and modified timestamps, working directory and quick actions: copy a VS Code command to open the folder, copy the exact resume command, and more.
- **Summaries: later.** How to summarize a session is still to be decided.

## Status

MVP: reads real Claude Code session files from disk on every page load. No auto-refresh — use the Refresh button on the Sessions page to pick up anything new.

| Page | Route | What it shows |
|---|---|---|
| Home | `/` | Presentation, plus the sessions folder dllms would read and whether it exists |
| Sessions | `/sessions` | All sessions, grouped by working directory |
| Session | `/sessions/<id>` | Details and quick actions: copy VS Code commands for the folder or transcript, copy the resume command, folder path or session ID |

## Platform support

Officially supported: **macOS** and **Windows**. Linux is untested and not officially supported.

Windows note: the resume/start commands are emitted as separate lines (not chained with `;` or `&&`), since Command Prompt doesn't support `;` and Windows PowerShell 5.1 doesn't support `&&`. Pasting multiple lines into any Windows shell runs them in order regardless.

The "Copy VS Code command" actions produce `code -n "<path>"`, which requires the `code` CLI on your `PATH` (VS Code: Command Palette → "Shell Command: Install 'code' command in PATH"). They deliberately don't use `vscode://file/...` links — that URI scheme reuses an already-open VS Code window by default, which can silently replace one you're actively working in.

## Run it

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

For a production build: `npm run build`, then `npm start`.

## Configuration

By default, dllms reads Claude Code sessions from `~/.claude/projects`. To use another folder, copy `.env.example` to `.env.local` and set `DLLMS_SESSIONS_DIR`.

## Stack

Next.js 16 (App Router, Cache Components), React 19, TypeScript and Tailwind CSS 4. The server side runs on Node, so it can read local session files directly. `src/lib/sessions.ts` parses Claude Code's JSONL session files straight off disk.

## Privacy

Session files can contain sensitive information. dllms is meant to read them locally only and never send them anywhere.
