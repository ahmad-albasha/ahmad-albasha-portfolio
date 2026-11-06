import type { ReactNode } from "react";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line bg-ink/40 px-2.5 py-1 font-mono text-micro leading-none tracking-wide text-muted rtl:tracking-normal">
      {children}
    </span>
  );
}
