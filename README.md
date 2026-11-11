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
- **Session details.** Title, created and modified timestamps, working directory and quick actions: open the folder in VS Code, copy the exact resume command, and more.
- **Summaries: later.** How to summarize a session is still to be decided.

## Status

MVP placeholder: pages and layout use **mocked session data**. Reading real session files comes next.

## Privacy

Session files can contain sensitive information. dllms is meant to read them locally only and never send them anywhere.
