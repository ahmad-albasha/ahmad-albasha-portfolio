import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

export function Section({
  id,
  children,
  className,
  labelledBy,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("relative py-section", className)}>
      <Container>{children}</Container>
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

/** Repeats a SectionHeading's action under the content on small screens, where the heading hides it. */
export function MobileAction({ children }: { children: ReactNode }) {
  return <div className="mt-10 flex justify-center md:hidden">{children}</div>;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  align = "start",
  action,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "start" | "center";
  action?: ReactNode;
}) {
  const centered = align === "center";
  return (
    <Reveal
      className={cn(
        "mb-12 flex flex-col gap-6 md:mb-16",
        centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
      )}
    >
      <div className={cn("max-w-2xl", centered && "flex flex-col items-center")}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={id} className="mt-5 text-display">
          {title}
        </h2>
        {intro && <p className="mt-5 text-lead">{intro}</p>}
      </div>
      {action && <div className="hidden md:block">{action}</div>}
    </Reveal>
  );
}
