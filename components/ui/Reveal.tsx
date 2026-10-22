"use client";

import { m, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: (delay: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease, delay } }),
};

const viewport = { once: true, margin: "0px 0px -10% 0px" } as const;

/** Fades content up when it scrolls into view. */
export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={item}
      custom={delay}
    >
      {children}
    </m.div>
  );
}

/** Reveals its <StaggerItem> children one after another. */
export function Stagger({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "ul" | "ol" }) {
  const Component = as === "ul" ? m.ul : as === "ol" ? m.ol : m.div;
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{ show: { transition: { staggerChildren: 0.06 } } }}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "li" }) {
  const Component = as === "li" ? m.li : m.div;
  return (
    <Component className={className} variants={item}>
      {children}
    </Component>
  );
}
