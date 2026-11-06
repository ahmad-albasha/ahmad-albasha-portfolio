import { ArrowRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Portrait } from "@/components/about/Portrait";
import { Link } from "@/i18n/navigation";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { EditorialTitle, Section } from "@/components/ui/Section";
import { site } from "@/data/site";
import { localizeDigits } from "@/lib/i18n";

/** Personal chapter: an arched portrait with caption, set against a large statement and a drop-cap introduction. */
export async function AboutTeaser() {
  const [t, locale] = await Promise.all([getTranslations("about"), getLocale()]);

  return (
    <Section id="about" labelledBy="about-title" wide className="overflow-x-clip">
      <div aria-hidden className="light-pool end-[10%] top-[10%] -z-10 size-[30rem] bg-gold/[0.06]" />
      <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-8">
        <Reveal className="mx-auto w-full max-w-[22rem] sm:max-w-sm lg:col-span-4 lg:col-start-2 lg:max-w-none">
          <figure>
          <Parallax distance={24}>
            <Portrait alt={site.name[locale]} shape="arch" />
          </Parallax>
          <figcaption className="mt-8 flex items-start justify-between gap-4 border-t border-line pt-4 font-mono text-label uppercase rtl:font-sans">
            <span className="text-fg">{site.name[locale]}</span>
            <span className="text-end text-muted">{site.role[locale]}</span>
          </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
          <div className="flex items-center gap-5">
            <span aria-hidden className="numeral-outline text-[3.25rem] lg:text-[4.5rem]">
              {localizeDigits("04", locale)}
            </span>
            <p className="flex items-center gap-3 font-mono text-label uppercase text-gold">
              <span aria-hidden className="h-px w-6 bg-gold/60" />
              {t("eyebrow")}
            </p>
          </div>
          <h2 id="about-title" className="mt-8 text-chapter font-light">
            <EditorialTitle text={t("title")} accent={2} />
          </h2>
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
    </Section>
  );
}
