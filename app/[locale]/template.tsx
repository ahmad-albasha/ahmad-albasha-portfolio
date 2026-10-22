import type { ReactNode } from "react";

/** Re-mounts on every navigation, giving each route a soft CSS entrance (no JS needed, honours reduced motion). */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
