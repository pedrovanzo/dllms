import Link from "next/link";
import { baseName, formatDate } from "@/lib/format";
import { groupByDir, listSessions } from "@/lib/sessions";

export default async function SessionsPage() {
  const sessions = await listSessions();
  const groups = groupByDir(sessions);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Sessions</h1>
        <p className="mt-1 text-neutral-600 dark:text-neutral-400">
          {sessions.length} sessions in {groups.length} directories
        </p>
      </header>

      {groups.map((group) => (
        <section
          key={group.cwd}
          className="rounded-lg border border-neutral-200 dark:border-neutral-800"
        >
          <header className="flex flex-wrap items-baseline gap-x-3 border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
            <h2 className="font-semibold">{baseName(group.cwd)}</h2>
            <span className="font-mono text-xs text-neutral-500 break-all">{group.cwd}</span>
            <span className="ml-auto text-xs text-neutral-500">
              {group.sessions.length} · last active {formatDate(group.lastModified)}
            </span>
          </header>
          <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {group.sessions.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/sessions/${s.id}`}
                  className="flex flex-wrap items-baseline gap-x-4 px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                >
                  <span className="font-medium">{s.title}</span>
                  <span className="text-sm text-neutral-500">{s.messageCount} messages</span>
                  <span className="ml-auto text-sm text-neutral-500">{formatDate(s.modified)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
