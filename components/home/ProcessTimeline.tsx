"use client";

import { m, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export type TimelineStep = { number: string; title: string; description: string; duration: string };

const ease = [0.22, 1, 0.36, 1] as const;

/** Drop-line length per step on large screens: the sequence reads as an elevation, stepping down. */
const drops = ["lg:h-8", "lg:h-20", "lg:h-32", "lg:h-44"];

/**
 * The process as a lit sequence. A champagne → emerald rail draws itself as the section scrolls
 * (horizontal on large screens, vertical along the reading start below), an emerald light travels
 * with its leading edge, and each stage switches on — gold node, drawn drop line, full-strength
 * type — the moment the rail reaches it. Reduced motion shows the whole sequence lit.
 */
export function ProcessTimeline({ steps, rtl }: { steps: TimelineStep[]; rtl: boolean }) {
  const railRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const thresholds = useRef<number[]>([]);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: railRef, offset: ["start 85%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const headX = useTransform(progress, (v) => `${(rtl ? -v : v) * 100}%`);
  const headY = useTransform(progress, (v) => `${v * 100}%`);

  // Where along the rail each node sits (0–1), measured from the rail's start in the current layout.
  const measure = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const box = rail.getBoundingClientRect();
    const horizontal = window.matchMedia("(min-width: 1024px)").matches;
    thresholds.current = nodeRefs.current.map((node) => {
      if (!node) return 1;
      const r = node.getBoundingClientRect();
      if (!horizontal) return (r.top + r.height / 2 - box.top) / box.height;
      const fromStart = rtl ? box.right - (r.left + r.width / 2) : r.left + r.width / 2 - box.left;
      return fromStart / box.width;
    });
  }, [rtl]);

  const update = useCallback((v: number) => {
    const lit = thresholds.current.filter((t) => v >= t - 0.015).length;
    setActive((prev) => (prev === lit ? prev : lit));
  }, []);

  useEffect(() => {
    measure();
    update(progress.get());
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure, update, progress]);

  useMotionValueEvent(progress, "change", update);

  const lit = reduced ? steps.length : active;

  return (
    <div className="relative">
      {/* Rail */}
      <div ref={railRef} aria-hidden className="pointer-events-none absolute inset-0">
        {/* Horizontal (lg+) */}
        <div className="absolute inset-x-0 top-[1.375rem] hidden h-px bg-line lg:block" />
        <m.div
          style={reduced ? undefined : { scaleX: progress }}
          className="absolute inset-x-0 top-[1.375rem] hidden h-px origin-left bg-[linear-gradient(90deg,var(--color-gold),var(--color-emerald-soft))] lg:block rtl:origin-right rtl:bg-[linear-gradient(270deg,var(--color-gold),var(--color-emerald-soft))]"
        />
        {!reduced && (
          <m.div style={{ x: headX }} className="absolute inset-x-0 top-[1.375rem] hidden lg:block">
            <span className="absolute start-0 top-0 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald/25 blur-[70px] rtl:translate-x-1/2" />
            <span className="absolute start-0 top-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-soft shadow-[0_0_16px_4px_rgb(201_169_110/0.55)] rtl:translate-x-1/2" />
          </m.div>
        )}
        {/* Vertical (< lg) */}
        <div className="absolute inset-y-0 start-[1.375rem] w-px bg-line lg:hidden" />
        <m.div
          style={reduced ? undefined : { scaleY: progress }}
          className="absolute inset-y-0 start-[1.375rem] w-px origin-top bg-[linear-gradient(180deg,var(--color-gold),var(--color-emerald-soft))] lg:hidden"
        />
        {!reduced && (
          <m.div style={{ y: headY }} className="absolute inset-y-0 start-[1.375rem] lg:hidden">
            <span className="absolute start-0 top-0 size-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald/25 blur-[60px] rtl:translate-x-1/2" />
            <span className="absolute start-0 top-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-soft shadow-[0_0_16px_4px_rgb(201_169_110/0.55)] rtl:translate-x-1/2" />
          </m.div>
        )}
      </div>

      <ol className="relative grid gap-16 lg:grid-cols-4 lg:gap-8">
        {steps.map((step, i) => {
          const on = i < lit;
          return (
            <m.li
              key={step.title}
              className="relative ps-16 lg:ps-0"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.9, ease, delay: i * 0.08 }}
            >
              {/* Node on the rail */}
              <span
                ref={(el) => {
                  nodeRefs.current[i] = el;
                }}
                aria-hidden
                className={cn(
                  "absolute start-0 top-0 grid size-11 place-items-center rounded-full border bg-ink transition-[border-color,box-shadow] duration-700 ease-luxe lg:relative",
                  on ? "border-gold shadow-[0_0_0_6px_rgb(201_169_110/0.08),0_0_28px_-4px_rgb(201_169_110/0.55)]" : "border-line-strong",
                )}
              >
                <span
                  className={cn(
                    "size-2 rounded-full transition-[background-color,scale,box-shadow] duration-700 ease-luxe",
                    on ? "scale-125 bg-gold shadow-[0_0_14px_2px_rgb(201_169_110/0.6)]" : "scale-100 bg-fg/20",
                  )}
                />
              </span>
              {/* Drop line from the rail to the step */}
              <span
                aria-hidden
                className={cn(
                  "ms-[1.375rem] hidden w-px origin-top bg-gradient-to-b from-gold/60 to-transparent transition-transform duration-1000 ease-luxe lg:block",
                  drops[i % drops.length],
                  on ? "scale-y-100" : "scale-y-0",
                )}
              />

              <div className={cn("transition-opacity duration-700 ease-luxe lg:pt-6", on ? "opacity-100" : "opacity-60")}>
                <div className="flex items-end justify-between gap-4 border-b border-line pb-4">
                  <span aria-hidden className={cn("numeral-chapter text-[3.5rem] transition-opacity duration-700 ease-luxe lg:text-[5rem]", on ? "opacity-100" : "opacity-45")}>
                    {step.number}
                  </span>
                  <span className={cn("pb-1 font-mono text-label uppercase transition-colors duration-700 rtl:font-sans", on ? "text-emerald-soft" : "text-muted")}>
                    {step.duration}
                  </span>
                </div>
                <h3
                  className={cn(
                    "mt-6 text-[clamp(2rem,1.6rem+1.4vw,2.75rem)] leading-none font-light tracking-[-0.02em] transition-colors duration-700 ease-luxe",
                    on ? "text-fg" : "text-fg/70",
                  )}
                >
                  <span className="sr-only">{step.number}. </span>
                  {step.title}
                </h3>
                <p className="mt-4 max-w-sm text-[0.975rem] leading-[1.75]">{step.description}</p>
              </div>
            </m.li>
          );
        })}
      </ol>
    </div>
  );
}
