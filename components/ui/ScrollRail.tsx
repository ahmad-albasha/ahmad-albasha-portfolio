"use client";

import { m, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

/**
 * The process rail. A faint track with a champagne → emerald line that draws itself as the section
 * scrolls through the viewport: horizontal on large screens, vertical (along the reading start) below.
 * Place inside a `relative` container; it fills it. Fully drawn when reduced motion is requested.
 */
export function ScrollRail() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const style = reduced ? undefined : { scaleX: progress };
  const styleY = reduced ? undefined : { scaleY: progress };

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0">
      {/* Horizontal (lg+) */}
      <div className="absolute inset-x-0 top-[1.375rem] hidden h-px bg-line lg:block" />
      <m.div
        style={style}
        className="absolute inset-x-0 top-[1.375rem] hidden h-px origin-left bg-[linear-gradient(90deg,var(--color-gold),var(--color-emerald-soft))] lg:block rtl:origin-right rtl:bg-[linear-gradient(270deg,var(--color-gold),var(--color-emerald-soft))]"
      />
      {/* Vertical (< lg) */}
      <div className="absolute inset-y-0 start-[1.375rem] w-px bg-line lg:hidden" />
      <m.div
        style={styleY}
        className="absolute inset-y-0 start-[1.375rem] w-px origin-top bg-[linear-gradient(180deg,var(--color-gold),var(--color-emerald-soft))] lg:hidden"
      />
    </div>
  );
}
