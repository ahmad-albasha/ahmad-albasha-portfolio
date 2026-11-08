import { ArrowRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Portrait } from "@/components/about/Portrait";
import { Link } from "@/i18n/navigation";
import { DrawRule, MaskText } from "@/components/ui/Cinematic";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { site } from "@/data/site";
import { localizeDigits } from "@/lib/i18n";

/** Personal chapter: an arched portrait with caption, set against a large statement and a drop-cap introduction. */
export async function AboutTeaser() {
  const [t, locale] = await Promise.all([getTranslations("about"), getLocale()]);

  return (
    <Section id="about" labelledBy="about-title" wide scene="dusk" className="overflow-x-clip">
      <div aria-hidden className="light-pool end-[10%] top-[10%] -z-10 size-[30rem] bg-gold/[0.06]" />
      <div aria-hidden className="light-pool animate-breathe start-[0%] top-[30%] -z-10 size-[26rem] bg-emerald/[0.1]" />
      <div className="relative grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        {/* A fine vertical rule with a champagne mark separates the portrait from the biography */}
        <div aria-hidden className="relative hidden w-px self-stretch justify-self-center bg-gradient-to-b from-transparent via-line-strong to-transparent lg:col-start-6 lg:row-start-1 lg:my-[8%] lg:block">
          <span className="absolute start-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-gold/60 bg-ink rtl:translate-x-1/2" />
        </div>
        <Reveal className="mx-auto w-full max-w-[22rem] sm:max-w-sm lg:col-span-4 lg:col-start-2 lg:row-start-1 lg:max-w-none">
          <figure>
          <Parallax distance={24}>
            <Portrait alt={site.name[locale]} shape="arch" />
          </Parallax>
          <figcaption className="mt-8 flex items-start justify-between gap-4 border-t border-line pt-4 font-mono text-label uppercase rtl:font-sans">
            <span className="flex items-center gap-2.5 text-fg">
              <span aria-hidden className="size-1.5 rounded-full bg-emerald-soft" />
              {site.name[locale]}
            </span>
            <span className="text-end text-muted">{site.role[locale]}</span>
          </figcaption>
          </figure>
        </Reveal>

        <div className="lg:col-span-5 lg:col-start-7 lg:row-start-1">
          <Reveal className="flex items-center gap-5">
            <span aria-hidden className="numeral-outline text-[3.25rem] lg:text-[4.5rem]">
              {localizeDigits("04", locale)}
            </span>
            <p className="flex items-center gap-3 font-mono text-label uppercase text-gold">
              <DrawRule className="h-px w-6 bg-gold/60" delay={0.2} />
              {t("eyebrow")}
            </p>
          </Reveal>
          <h2 id="about-title" className="mt-8 text-chapter font-light">
            <MaskText text={t("title")} accent={2} delay={0.1} />
          </h2>
          <Reveal delay={0.25}>
          <p className="mt-10 max-w-xl text-lead text-fg/80 first-letter:float-start first-letter:me-3 first-letter:mt-1 first-letter:font-display first-letter:text-[4.5rem] first-letter:leading-[0.8] first-letter:text-gold rtl:first-letter:float-none rtl:first-letter:m-0 rtl:first-letter:text-[length:inherit] rtl:first-letter:leading-[inherit]">
            {t("body")}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-line pt-6">
            <Link href="/about" className="group inline-flex items-center gap-3 text-sm font-medium text-gold">
              <span className="link-draw pb-1">{t("more")}</span>
              <span className="grid size-10 place-items-center rounded-full border border-gold/40 transition-all duration-500 ease-luxe group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                <ArrowRight aria-hidden className="flip-rtl size-4" />
              </span>
            </Link>
            <p className="font-mono text-label uppercase text-muted rtl:font-sans">{site.location[locale]}</p>
          </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
