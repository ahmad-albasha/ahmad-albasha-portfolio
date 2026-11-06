"use client";

import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * Drifts its content a few pixels against the scroll direction while it crosses the viewport.
 * Transform-only (no layout work) and disabled for reduced motion.
 */
export function Parallax({ children, className, distance = 40 }: { children: ReactNode; className?: string; distance?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <m.div ref={ref} className={className} style={reduced ? undefined : { y }}>
      {children}
    </m.div>
  );
}
