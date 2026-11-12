"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Spinner } from "./Spinner";

export function RefreshButton({ className = "" }: { className?: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => startTransition(() => router.refresh())}
      className={`inline-flex items-center gap-1.5 rounded-full border border-neutral-300 px-3 py-1 text-xs text-neutral-600 hover:bg-neutral-100 disabled:opacity-50 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-900 ${className}`}
    >
      {isPending && <Spinner className="h-3 w-3" />}
      {isPending ? "Refreshing…" : "Refresh"}
    </button>
  );
}
