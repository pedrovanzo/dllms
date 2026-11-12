import { Spinner } from "./Spinner";

/** Shared Suspense fallback: a spinner plus a short status text. */
export function LoadingState({
  text,
  size = "md",
}: {
  text: string;
  size?: "sm" | "md";
}) {
  const isSmall = size === "sm";
  return (
    <p
      className={`flex items-center gap-2 text-neutral-500 ${isSmall ? "text-sm" : "text-base"}`}
      role="status"
    >
      <Spinner className={isSmall ? "h-3.5 w-3.5" : "h-4 w-4"} />
      {text}
    </p>
  );
}
