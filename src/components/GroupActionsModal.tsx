"use client";

import { useEffect } from "react";
import { CopyButton } from "./CopyButton";
import { baseName, startCommand, vscodeCommand } from "@/lib/format";

export function GroupActionsModal({ cwd, onClose }: { cwd: string; onClose: () => void }) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const start = startCommand(cwd);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-lg border border-neutral-200 bg-white p-5 shadow-xl dark:border-neutral-800 dark:bg-neutral-950"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="font-semibold">{baseName(cwd)}</h2>
            <p className="mt-0.5 truncate font-mono text-xs text-neutral-500">{cwd}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-md border border-neutral-300 px-2 py-1 text-xs hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
          >
            Close
          </button>
        </div>

        <div className="mt-4 space-y-3">
          <h3 className="text-sm font-semibold text-neutral-500">Actions</h3>
          <div className="flex flex-wrap gap-2">
            <CopyButton text={vscodeCommand(cwd)} label="Copy VS Code command" />
            <CopyButton text={start} label="Copy start command" />
            <CopyButton text={cwd} label="Copy folder path" />
          </div>
          <pre className="overflow-x-auto rounded-md bg-neutral-100 p-3 text-sm dark:bg-neutral-900">
            <code>{start}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
