import { getLocale, getTranslations } from "next-intl/server";
import { Section, SectionHeading } from "@/components/ui/Section";
import { processSteps } from "@/data/process";
import { localizeDigits, stepNumber } from "@/lib/i18n";
import type { Locale } from "@/i18n/routing";
import { ProcessTimeline } from "./ProcessTimeline";

export async function ProcessSection() {
  const [t, locale] = await Promise.all([getTranslations("process"), getLocale() as Promise<Locale>]);
  const steps = processSteps.map((step, i) => ({
    number: stepNumber(i, locale),
    title: step.title[locale],
    description: step.description[locale],
    duration: step.duration[locale],
  }));

  return (
    <Section id="process" labelledBy="process-title" wide scene="emerald" className="overflow-x-clip">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="light-pool animate-breathe start-[20%] top-[35%] size-[44rem] max-w-full bg-forest/80" />
        <div className="light-pool animate-breathe end-[5%] bottom-[10%] size-[26rem] bg-emerald/[0.1] [--delay:3.5s]" />
        <div className="column-guides absolute inset-0 opacity-60" />
      </div>
      <SectionHeading id="process-title" index={localizeDigits("03", locale)} eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <ProcessTimeline steps={steps} rtl={locale === "ar"} />
    </Section>
  );
}
