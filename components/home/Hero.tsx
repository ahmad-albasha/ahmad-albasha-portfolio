import { Fragment, type CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { SignalOrbit } from "./SignalOrbit";

/** Splits a line into words that rise from behind a mask, one after another (CSS-only, runs before hydration). */
function RevealLine({ text, startIndex, className, wordClassName }: { text: string; startIndex: number; className?: string; wordClassName?: string }) {
  return (
    <span className={cn("block", className)}>
      {text.split(" ").map((word, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          <span className="inline-block overflow-hidden pb-[0.14em] align-bottom rtl:py-[0.2em]">
            <span className={cn("animate-rise inline-block", wordClassName)} style={{ "--i": startIndex + i } as CSSProperties}>
              {word}
            </span>
          </span>
        </Fragment>
      ))}
    </span>
  );
}

export async function Hero() {
  const [t, locale] = await Promise.all([getTranslations("hero"), getLocale()]);
  const lines = [t("line1"), t("line2"), t("line3")];
  const starts = lines.map((_, i) => lines.slice(0, i).reduce((n, l) => n + l.split(" ").length, 0));
  const fade = (delay: number) => ({ "--delay": `${delay}ms` }) as CSSProperties;

  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-24 pb-8 md:pt-28 md:pb-10">
      {/* Environment: column guides, two light sources, the signal orbit and a floor fade */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgb(20_37_31/0.55)_85%,var(--color-ink))]" />
        <div className="column-guides absolute inset-0 hidden md:block" />
        <div className="light-pool end-[2%] top-[22%] size-[34rem] max-w-[90vw] bg-emerald/25 md:end-[8%] md:size-[44rem]" />
        <div className="light-pool -top-40 start-[-10%] size-[30rem] bg-gold/[0.07]" />
        <SignalOrbit className="animate-fade-up absolute end-[-38%] top-[7%] size-[118vw] opacity-55 [--delay:400ms] sm:end-[-20%] sm:size-[88vw] md:end-[-14%] md:top-[54%] md:size-[min(56rem,62vw)] md:-translate-y-1/2 md:opacity-90" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <Container className="flex max-w-wide flex-1 flex-col">
        {/* Meta row — reads like the header of an instrument panel */}
        <div className="animate-fade-up flex items-center justify-between gap-6 border-b border-line pb-5 font-mono text-label uppercase" style={fade(0)}>
          <p className="flex items-center gap-3 normal-case text-fg rtl:font-sans">
            <span aria-hidden className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-soft/60 [animation-duration:2.4s]" />
              <span className="relative size-2 rounded-full bg-emerald-soft" />
            </span>
            <span className="font-sans text-sm">{t("availability")}</span>
          </p>
          <p className="hidden text-cool lg:block">{t("eyebrow")}</p>
          <p className="hidden text-muted sm:block">{site.location[locale]}</p>
        </div>

        <h1 id="hero-title" className="relative mt-auto pt-16 text-mega font-light text-fg md:pt-24">
          <RevealLine text={lines[0]} startIndex={starts[0]} />
          <RevealLine text={lines[1]} startIndex={starts[1]} className="md:ps-[1.1em]" />
          <RevealLine
            text={lines[2]}
            startIndex={starts[2]}
            className="italic md:ps-[2.3em] rtl:not-italic"
            wordClassName="text-gold-gradient pe-[0.08em] font-normal"
          />
        </h1>

        {/* Lower register: description and actions sit on a shared ruled baseline */}
        <div className="mt-12 grid gap-10 border-t border-line pt-8 md:mt-16 md:grid-cols-12 md:gap-8">
          <div className="animate-fade-up md:col-span-6 lg:col-span-5" style={fade(700)}>
            <p className="max-w-md text-lead text-fg/75">{t("subtitle")}</p>
          </div>
          <div className="animate-fade-up flex flex-col gap-4 md:col-span-6 md:items-end lg:col-span-6 lg:col-start-7" style={fade(850)}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="/book" size="lg">
                {t("primaryCta")}
                <ArrowRight aria-hidden className="flip-rtl size-4 transition-transform duration-300 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1" />
              </ButtonLink>
              <ButtonLink href="/projects" size="lg" variant="secondary">
                {t("secondaryCta")}
              </ButtonLink>
            </div>
            <p className="font-mono text-label text-muted/80 rtl:font-sans">{t("note")}</p>
          </div>
        </div>

        {/* Scroll cue */}
        <div aria-hidden className="animate-fade-up mt-10 hidden items-center gap-4 md:flex" style={fade(1100)}>
          <span className="relative h-10 w-px overflow-hidden bg-line">
            <span className="animate-scroll-cue absolute inset-0 bg-gold" />
          </span>
          <span className="font-mono text-micro uppercase tracking-[0.3em] text-muted/70">↓</span>
        </div>
      </Container>
    </section>
  );
}
