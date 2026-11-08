import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { DrawRule, MaskText } from "./Cinematic";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

export function Section({
  id,
  children,
  className,
  labelledBy,
  wide = false,
  scene,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  labelledBy?: string;
  /** Uses the wider editorial container (for sections with asymmetric layouts). */
  wide?: boolean;
  /** The ambient light environment the page cross-fades to while this section is in view (see SceneLight). */
  scene?: "warm" | "cool" | "emerald" | "dusk";
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} data-scene={scene} className={cn("relative py-section", className)}>
      <Container className={wide ? "max-w-wide" : undefined}>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("flex items-center gap-3 font-mono text-label uppercase text-gold", className)}>
      <span aria-hidden className="h-px w-8 bg-gold/60" />
      {children}
    </p>
  );
}

/**
 * A serif title whose last word(s) are set in champagne italic — the site's editorial signature.
 * In Arabic the accent keeps its colour but stays upright (Arabic has no true italic).
 */
export function EditorialTitle({ text, accent = 1 }: { text: string; accent?: number }) {
  const words = text.trim().split(/\s+/);
  if (words.length <= accent) return <>{text}</>;
  const head = words.slice(0, -accent).join(" ");
  const tail = words.slice(-accent).join(" ");
  return (
    <>
      {head} <span className="accent-italic pe-[0.06em]">{tail}</span>
    </>
  );
}

/** Repeats a SectionHeading's action under the content on small screens, where the heading hides it. */
export function MobileAction({ children }: { children: ReactNode }) {
  return <div className="mt-12 flex justify-center md:hidden">{children}</div>;
}

/**
 * Chapter opener. On wide screens it is an asymmetric two-column composition: a small index column
 * (outlined numeral + label) against a large serif title, with the intro set narrower and offset.
 */
export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  index,
  align = "start",
  action,
  accent = 1,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  intro?: string;
  /** Chapter number shown as an outlined numeral, e.g. "01". */
  index?: string;
  align?: "start" | "center";
  action?: ReactNode;
  /** How many trailing words of the title get the italic accent. */
  accent?: number;
}) {
  if (align === "center") {
    return (
      <div className="mb-14 flex flex-col items-center text-center md:mb-20">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <h2 id={id} className="mt-6 max-w-4xl text-chapter font-light">
          <MaskText text={title} accent={accent} />
        </h2>
        {intro && (
          <Reveal delay={0.3}>
            <p className="mt-6 max-w-xl text-lead">{intro}</p>
          </Reveal>
        )}
      </div>
    );
  }

  return (
    <div className="mb-16 grid gap-y-6 md:mb-24 lg:grid-cols-12 lg:gap-x-8">
      <Reveal className="flex items-center gap-5 lg:col-span-3 lg:flex-col lg:items-start lg:gap-6 lg:pt-3">
        {index && (
          <span aria-hidden className="numeral-outline text-[3.25rem] lg:text-[5.5rem]">
            {index}
          </span>
        )}
        <p className="flex items-center gap-3 font-mono text-label uppercase text-gold">
          <DrawRule className="h-px w-6 bg-gold/60" delay={0.2} />
          {eyebrow}
        </p>
      </Reveal>
      <div className="lg:col-span-9">
        <h2 id={id} className="max-w-[14ch] text-chapter font-light rtl:max-w-[18ch]">
          <MaskText text={title} accent={accent} delay={0.1} />
        </h2>
        {(intro || action) && (
          <Reveal delay={0.35} className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between lg:mt-10">
            {intro && <p className="max-w-md text-lead md:ms-[8%]">{intro}</p>}
            {action && <div className="hidden shrink-0 md:block">{action}</div>}
          </Reveal>
        )}
      </div>
    </div>
  );
}
