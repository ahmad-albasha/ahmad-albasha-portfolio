import type { ReactNode } from "react";
import { Container } from "./Container";
import { EditorialTitle } from "./Section";

/**
 * Top of every inner page: a label, a large light serif title with an italic accent and the intro
 * set offset beneath, over the column guides and a pool of emerald light. CSS-animated so it paints immediately.
 */
export function PageHeader({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro?: string; children?: ReactNode }) {
  return (
    <header className="relative isolate overflow-hidden pt-36 pb-16 md:pt-48 md:pb-24">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="column-guides absolute inset-0 hidden md:block" />
        <div className="light-pool -top-32 end-[-5%] size-[36rem] bg-emerald/[0.16]" />
        <div className="light-pool -top-20 start-[10%] size-[22rem] bg-gold/[0.06]" />
      </div>
      <Container className="max-w-wide">
        <div className="animate-fade-up">
          <p className="flex items-center gap-3 border-b border-line pb-5 font-mono text-label uppercase text-gold">
            <span aria-hidden className="h-px w-6 bg-gold/60" />
            {eyebrow}
          </p>
          <h1 className="mt-10 max-w-[18ch] text-chapter font-light md:text-[clamp(3rem,1.2rem+5vw,6.5rem)]">
            <EditorialTitle text={title} />
          </h1>
          {intro && <p className="mt-8 max-w-xl text-lead md:ms-[12%]">{intro}</p>}
          {children}
        </div>
      </Container>
    </header>
  );
}
