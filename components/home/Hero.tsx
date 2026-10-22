import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { ParticleField } from "./ParticleField";

/** Splits a line into words that rise from behind a mask, one after another (CSS-only, runs before hydration). */
function RevealLine({ text, startIndex, className, wordClassName }: { text: string; startIndex: number; className?: string; wordClassName?: string }) {
  return (
    <span className={cn("block", className)}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom rtl:py-[0.18em]">
          <span className={cn("animate-rise inline-block", wordClassName)} style={{ "--i": startIndex + i } as CSSProperties}>
            {word}
          </span>
          {" "}
        </span>
      ))}
    </span>
  );
}

export async function Hero() {
  const t = await getTranslations("hero");
  const lines = [t("line1"), t("line2"), t("line3")];
  const starts = lines.map((_, i) => lines.slice(0, i).reduce((n, l) => n + l.split(" ").length, 0));
  const fade = (delay: number) => ({ "--delay": `${delay}ms` }) as CSSProperties;

  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16">
      {/* Background: the only place the grid and particles appear, so the hero stays the visual peak */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0" />
        <div className="absolute -top-40 end-[-10%] size-[42rem] rounded-full bg-gold/[0.07] blur-[120px]" />
        <div className="absolute bottom-[-20%] start-[-10%] size-[36rem] rounded-full bg-cool/[0.05] blur-[120px]" />
        <ParticleField />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <Container>
        <div className="max-w-5xl">
          <p className="animate-fade-up inline-flex items-center gap-3 rounded-full border border-line bg-white/[0.02] py-1.5 ps-2 pe-4 text-sm" style={fade(0)}>
            <span aria-hidden className="size-2 rounded-full bg-gold shadow-glow-sm" />
            <span className="text-fg">{t("availability")}</span>
            <span aria-hidden className="hidden h-3 w-px bg-line-strong sm:block" />
            <span className="hidden font-mono text-label uppercase text-muted sm:inline">{t("eyebrow")}</span>
          </p>

          <h1 id="hero-title" className="mt-8 text-hero">
            <RevealLine text={lines[0]} startIndex={starts[0]} />
            <RevealLine text={lines[1]} startIndex={starts[1]} />
            <RevealLine text={lines[2]} startIndex={starts[2]} className="italic rtl:not-italic" wordClassName="text-gold-gradient pe-[0.08em]" />
          </h1>

          <p className="animate-fade-up mt-8 max-w-2xl text-lead" style={fade(650)}>
            {t("subtitle")}
          </p>

          <div className="animate-fade-up mt-10 flex flex-col gap-3 sm:flex-row sm:items-center" style={fade(800)}>
            <ButtonLink href="/book" size="lg">
              {t("primaryCta")}
              <ArrowRight aria-hidden className="flip-rtl size-4 transition-transform duration-300 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1" />
            </ButtonLink>
            <ButtonLink href="/projects" size="lg" variant="secondary">
              {t("secondaryCta")}
            </ButtonLink>
          </div>
          <p className="animate-fade-up mt-5 font-mono text-label text-muted" style={fade(950)}>
            {t("note")}
          </p>
        </div>
      </Container>
    </section>
  );
}
