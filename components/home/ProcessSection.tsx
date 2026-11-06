import { getLocale, getTranslations } from "next-intl/server";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ScrollRail } from "@/components/ui/ScrollRail";
import { Section, SectionHeading } from "@/components/ui/Section";
import { processSteps } from "@/data/process";
import { cn } from "@/lib/cn";
import { localizeDigits, stepNumber } from "@/lib/i18n";

/** Drop-line length per step on large screens: the sequence reads as an elevation, stepping down. */
const drops = ["lg:h-8", "lg:h-20", "lg:h-32", "lg:h-44"];

export async function ProcessSection() {
  const [t, locale] = await Promise.all([getTranslations("process"), getLocale()]);

  return (
    <Section id="process" labelledBy="process-title" wide className="overflow-x-clip">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="light-pool start-[20%] top-[35%] size-[44rem] max-w-full bg-forest/80" />
        <div className="light-pool end-[5%] bottom-[10%] size-[26rem] bg-emerald/[0.1]" />
        <div className="column-guides absolute inset-0 opacity-60" />
      </div>
      <SectionHeading id="process-title" index={localizeDigits("03", locale)} eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />

      <div className="relative">
        <ScrollRail />
        <Stagger as="ol" className="relative grid gap-14 lg:grid-cols-4 lg:gap-8">
          {processSteps.map((step, i) => (
            <StaggerItem as="li" key={step.title.en} className="relative ps-16 lg:ps-0">
              {/* Node on the rail */}
              <span aria-hidden className="absolute start-0 top-0 grid size-11 place-items-center rounded-full border border-gold/50 bg-ink lg:static">
                <span className="size-2 rounded-full bg-gold shadow-[0_0_14px_2px_rgb(201_169_110/0.5)]" />
              </span>
              {/* Drop line from the rail to the step */}
              <span aria-hidden className={cn("ms-[1.375rem] hidden w-px bg-gradient-to-b from-gold/50 to-transparent lg:block", drops[i % drops.length])} />

              <div className="lg:pt-6">
                <div className="flex items-end justify-between gap-4 border-b border-line pb-4">
                  <span aria-hidden className="numeral-outline text-[3.5rem] lg:text-[5rem]">
                    {stepNumber(i, locale)}
                  </span>
                  <span className="pb-1 font-mono text-label uppercase text-emerald-soft rtl:font-sans">{step.duration[locale]}</span>
                </div>
                <h3 className="mt-6 text-[clamp(2rem,1.6rem+1.4vw,2.75rem)] leading-none font-light tracking-[-0.02em]">
                  <span className="sr-only">{stepNumber(i, locale)}. </span>
                  {step.title[locale]}
                </h3>
                <p className="mt-4 max-w-sm text-[0.975rem] leading-[1.75]">{step.description[locale]}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
