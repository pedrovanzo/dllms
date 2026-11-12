import { connection } from "next/server";
import { Suspense } from "react";
import { IconLegend } from "@/components/IconLegend";
import { LoadingState } from "@/components/LoadingState";
import { SessionsBrowser } from "@/components/SessionsBrowser";
import { groupByDir, listSessions } from "@/lib/sessions";

export default function SessionsPage() {
  return (
    <div className="space-y-5">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Sessions</h1>
        <IconLegend />
      </header>

      <Suspense fallback={<LoadingState text="Reading sessions from disk…" />}>
        <SessionsContent />
      </Suspense>
    </div>
  );
}

async function SessionsContent() {
  await connection();
  // connection() above opts this subtree into per-request dynamic rendering, so Date.now() is stable for this render.
  // eslint-disable-next-line react-hooks/purity
  const now = Date.now();
  const sessions = await listSessions();
  const groups = groupByDir(sessions);

  return (
    <div className="space-y-6">
      <p className="text-neutral-600 dark:text-neutral-400">
        {sessions.length} sessions in {groups.length} directories
      </p>
      <SessionsBrowser groups={groups} now={now} />
    </div>
  );
}
