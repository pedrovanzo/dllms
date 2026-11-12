import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ActivityBadge } from "@/components/ActivityBadge";
import { CopyButton } from "@/components/CopyButton";
import { LoadingState } from "@/components/LoadingState";
import { formatDate, resumeCommand, vscodeCommand } from "@/lib/format";
import { getSession } from "@/lib/sessions";

// The session ID is only known at request time, so it is read inside <Suspense>
// (Cache Components pattern from the bundled Next.js docs: dynamic-routes.md).
export default function SessionPage(props: PageProps<"/sessions/[id]">) {
  return (
    <div className="space-y-8">
      <Link href="/sessions" className="text-sm text-neutral-500 hover:underline">
        ← All sessions
      </Link>
      <Suspense fallback={<LoadingState text="Loading session…" />}>
        {props.params.then(({ id }) => (
          <SessionDetails id={id} />
        ))}
      </Suspense>
    </div>
  );
}

async function SessionDetails({ id }: { id: string }) {
  const session = await getSession(id);
  if (!session) notFound();

  const resume = resumeCommand(session.cwd, session.id);
  // Already request-time: `id` above came from the params promise, so this render can't be prerendered anyway.
  // eslint-disable-next-line react-hooks/purity
  const now = Date.now();

  return (
    <div className="space-y-8">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight">{session.title}</h1>
          <ActivityBadge iso={session.modified} now={now} />
        </div>
        <p className="mt-1 font-mono text-sm text-neutral-500 break-all">{session.cwd}</p>
      </div>

      <section className="space-y-3">
        <h2 className="font-semibold">Actions</h2>
        <div className="flex flex-wrap gap-2">
          <CopyButton text={vscodeCommand(session.cwd)} label="Copy VS Code command (folder)" />
          <CopyButton
            text={vscodeCommand(session.transcriptPath)}
            label="Copy VS Code command (transcript)"
          />
          <CopyButton text={resume} label="Copy resume command" />
          <CopyButton text={session.cwd} label="Copy folder path" />
          <CopyButton text={session.id} label="Copy session ID" />
        </div>
        <pre className="overflow-x-auto rounded-md bg-neutral-100 p-3 text-sm dark:bg-neutral-900">
          <code>{resume}</code>
        </pre>
      </section>

      <section className="space-y-2">
        <h2 className="font-semibold">Summary</h2>
        {session.summary ? (
          <p className="text-neutral-700 dark:text-neutral-300">{session.summary}</p>
        ) : (
          <p className="italic text-neutral-500">
            No summary yet. How to summarize is still to be decided.
          </p>
        )}
      </section>

      <section className="space-y-2">
        <h2 className="font-semibold">First prompt</h2>
        <blockquote className="border-l-4 border-neutral-300 pl-4 text-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
          {session.firstPrompt}
        </blockquote>
      </section>

      <section>
        <h2 className="font-semibold">Details</h2>
        <dl className="mt-2 grid grid-cols-[max-content_1fr] gap-x-6 gap-y-1 text-sm">
          <dt className="text-neutral-500">Tool</dt>
          <dd>Claude Code</dd>
          <dt className="text-neutral-500">Session ID</dt>
          <dd className="font-mono break-all">{session.id}</dd>
          <dt className="text-neutral-500">Created</dt>
          <dd>{formatDate(session.created)}</dd>
          <dt className="text-neutral-500">Modified</dt>
          <dd>{formatDate(session.modified)}</dd>
          <dt className="text-neutral-500">Messages</dt>
          <dd>{session.messageCount}</dd>
          <dt className="text-neutral-500">Transcript</dt>
          <dd className="font-mono break-all">{session.transcriptPath}</dd>
        </dl>
      </section>
    </div>
  );
}
