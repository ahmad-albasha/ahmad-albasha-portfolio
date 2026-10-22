import type { ReactNode } from "react";
import { Container } from "./Container";
import { Eyebrow } from "./Section";

/** Top of every inner page: eyebrow, h1 and intro over a soft glow. Animated with CSS so it paints immediately. */
export function PageHeader({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro?: string; children?: ReactNode }) {
  return (
    <header className="relative isolate overflow-hidden pt-36 pb-16 md:pt-44 md:pb-20">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -top-32 end-0 size-[32rem] rounded-full bg-gold/[0.06] blur-[120px]" />
      </div>
      <Container>
        <div className="animate-fade-up max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-6 text-display md:text-[clamp(2.75rem,1.5rem+3.6vw,5rem)]">{title}</h1>
          {intro && <p className="mt-6 max-w-2xl text-lead">{intro}</p>}
          {children}
        </div>
      </Container>
    </header>
  );
}
