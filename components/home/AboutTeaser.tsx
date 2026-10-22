import { ArrowRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Portrait } from "@/components/about/Portrait";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, Section } from "@/components/ui/Section";
import { site } from "@/data/site";

export async function AboutTeaser() {
  const [t, locale] = await Promise.all([getTranslations("about"), getLocale()]);

  return (
    <Section id="about" labelledBy="about-title">
      <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <Portrait alt={site.name[locale]} className="mx-auto max-w-sm lg:max-w-none" />
        </Reveal>
        <Reveal delay={0.1}>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 id="about-title" className="mt-5 text-display">
            {t("title")}
          </h2>
          <p className="mt-6 text-lead">{t("body")}</p>
          <ButtonLink href="/about" variant="ghost" className="mt-8 px-0">
            {t("more")}
            <ArrowRight aria-hidden className="flip-rtl size-4 transition-transform duration-300 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1" />
          </ButtonLink>
        </Reveal>
      </div>
    </Section>
  );
}
