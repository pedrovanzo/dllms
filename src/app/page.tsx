import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { getSessionsSource } from "@/lib/config";

const features = [
  ["Assembled on the spot", "Built from the tools' own files every time. Nothing is stored."],
  ["Grouped by directory", "One list per working directory, newest activity first."],
  ["Jump back in", "Open the folder in VS Code or copy the exact resume command."],
];

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Every LLM session, one map.</h1>
        <p className="max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
          dllms reads the session files your LLM tools already write and lays them out by working
          directory. No more opening the right folder first just to find a session to resume.
        </p>
        <Link
          href="/sessions"
          className="inline-block rounded-md bg-neutral-900 px-4 py-2 text-white hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
        >
          Browse sessions
        </Link>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {features.map(([title, text]) => (
          <div key={title} className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
            <h2 className="font-semibold">{title}</h2>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{text}</p>
          </div>
        ))}
      </section>

      <Suspense fallback={<p className="text-sm text-neutral-500">Checking sessions folder…</p>}>
        <SessionsSource />
      </Suspense>
    </div>
  );
}

/** Reads the machine at request time, not at build time. */
async function SessionsSource() {
  await connection();
  const source = getSessionsSource();

  return (
    <section className="rounded-lg border border-neutral-200 p-4 text-sm dark:border-neutral-800">
      <h2 className="font-semibold">Sessions source</h2>
      <dl className="mt-2 grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1">
        <dt className="text-neutral-500">Tool</dt>
        <dd>Claude Code</dd>
        <dt className="text-neutral-500">Folder</dt>
        <dd className="font-mono break-all">{source.dir}</dd>
        <dt className="text-neutral-500">Set by</dt>
        <dd>{source.overridden ? "DLLMS_SESSIONS_DIR" : "default (~/.claude/projects)"}</dd>
        <dt className="text-neutral-500">Found on disk</dt>
        <dd>{source.exists ? "yes" : "no"}</dd>
      </dl>
      <p className="mt-3 text-neutral-500">
        The MVP shows mocked sessions. Reading this folder comes next.
      </p>
    </section>
  );
}
