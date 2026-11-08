"use client";

import { m, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { Fragment, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/*
 * The site's motion vocabulary. Every piece shares one easing curve and is transform/opacity/clip
 * only, so nothing shifts layout. Each content type gets its own gesture:
 *   headlines → words rise from behind a mask        (MaskText)
 *   images    → a curtain opens, then a slow drift   (CinematicFrame)
 *   numerals  → a slow counter-drift for depth       (Parallax, in ./Parallax)
 *   rules     → hairlines draw in from reading start (DrawRule)
 *   body copy → a short fade-up                      (Reveal, in ./Reveal)
 */

const ease = [0.22, 1, 0.36, 1] as const;
const once = { once: true, margin: "0px 0px -12% 0px" } as const;

const wordParent: Variants = {
  hidden: {},
  show: (delay: number = 0) => ({ transition: { staggerChildren: 0.055, delayChildren: delay } }),
};
const word: Variants = {
  hidden: { y: "108%" },
  show: { y: "0%", transition: { duration: 1, ease } },
};

/**
 * A headline whose words rise from behind a mask in sequence. `accent` trailing words get the
 * champagne italic (the site's editorial signature). Words stay real text, so wrapping, selection,
 * search and screen readers are unaffected.
 */
export function MaskText({ text, accent = 0, delay = 0, className }: { text: string; accent?: number; delay?: number; className?: string }) {
  const words = text.trim().split(/\s+/);
  const accentFrom = accent > 0 && words.length > accent ? words.length - accent : Infinity;
  return (
    <m.span className={cn("block", className)} initial="hidden" whileInView="show" viewport={once} variants={wordParent} custom={delay}>
      {words.map((w, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          {/* Padding gives descenders, italics and Arabic marks room inside the mask */}
          <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom rtl:-my-[0.2em] rtl:py-[0.2em]">
            <m.span variants={word} className={cn("inline-block", i >= accentFrom && "accent-italic pe-[0.06em]")}>
              {w}
            </m.span>
          </span>
        </Fragment>
      ))}
    </m.span>
  );
}

/** A hairline that draws itself from the reading start when it enters the viewport. */
export function DrawRule({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <m.span
      aria-hidden
      className={cn("block origin-left rtl:origin-right", className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={once}
      transition={{ duration: 1.4, ease, delay }}
    />
  );
}

/**
 * Product imagery: a curtain opens from a slightly inset frame as it enters, then the image keeps a
 * slow counter-drift while it crosses the viewport. Reduced motion shows the frame as it is.
 */
export function CinematicFrame({ children, className, drift = 32 }: { children: ReactNode; className?: string; drift?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [drift, -drift]);

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <m.div ref={ref} className={className} style={{ y }}>
      <m.div
        initial={{ clipPath: "inset(7% 5% 7% 5% round 1.25rem)", scale: 0.97 }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0% round 1.25rem)", scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        transition={{ duration: 1.5, ease }}
      >
        {children}
      </m.div>
    </m.div>
  );
}

/**
 * A very slow push-out on a photograph as it crosses the viewport (1.07 → 1), like a camera easing
 * back. Fills its (overflow-hidden) parent; transform-only.
 */
export function ScrollZoom({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.07, 1]);
  return (
    <m.div ref={ref} className={cn("absolute inset-0", className)} style={reduced ? undefined : { scale }}>
      {children}
    </m.div>
  );
}
