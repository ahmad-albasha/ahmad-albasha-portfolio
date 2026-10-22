import { getLocale, getTranslations } from "next-intl/server";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { processSteps } from "@/data/process";
import { stepNumber } from "@/lib/i18n";

export async function ProcessSection() {
  const [t, locale] = await Promise.all([getTranslations("process"), getLocale()]);

  return (
    <Section id="process" labelledBy="process-title" className="bg-surface/30">
      <SectionHeading id="process-title" eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <div className="relative">
        <span aria-hidden className="hairline absolute inset-x-0 top-[1.375rem] hidden lg:block" />
        <Stagger as="ol" className="relative grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {processSteps.map((step, i) => (
            <StaggerItem as="li" key={step.title.en}>
              <span className="relative grid size-11 place-items-center rounded-full border border-gold/40 bg-ink font-mono text-sm text-gold rtl:font-sans">
                {stepNumber(i, locale)}
              </span>
              <p className="mt-6 font-mono text-label uppercase text-muted">{step.duration[locale]}</p>
              <h3 className="mt-2 text-title">{step.title[locale]}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed">{step.description[locale]}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
