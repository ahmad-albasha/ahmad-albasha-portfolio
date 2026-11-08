import { ArrowRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { ServiceGlyph } from "@/components/services/ServiceGlyph";
import { ButtonLink } from "@/components/ui/Button";
import { Parallax } from "@/components/ui/Parallax";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { MobileAction, Section, SectionHeading } from "@/components/ui/Section";
import { services } from "@/data/services";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { localizeDigits } from "@/lib/i18n";

/**
 * Each service gets its own composition, colour of light and emblem scale inside a ruled editorial
 * grid (no boxed cards). The emblem wrapper (`wrap`) owns placement and drift; `glyph` owns size and tone.
 *  0 AI systems      — wide, permanently emerald-lit, a large living network floating top-end
 *  1 Web             — narrow, dusty-blue light, emblem leading
 *  2 Mobile          — narrow, warm light, text leading, emblem anchored bottom-end
 *  3 Custom software — wide, champagne-lit, chip and text side by side, signals running out of the core
 */
const compositions = [
  {
    span: "lg:col-span-7",
    cell: "md:min-h-[36rem]",
    wrap: "lg:absolute lg:end-8 lg:top-10 xl:end-10",
    glyph: "size-52 text-emerald-soft md:size-60 lg:size-56 xl:size-80",
    body: "mt-12 lg:mt-0 lg:max-w-[48%]",
    light: "bg-[radial-gradient(ellipse_60%_65%_at_80%_28%,rgb(82_125_112/0.26),transparent_70%)] opacity-80",
  },
  {
    span: "lg:col-span-5",
    cell: "",
    wrap: "",
    glyph: "size-44 text-cool/80 md:size-52",
    body: "mt-12",
    light: "bg-[radial-gradient(ellipse_70%_60%_at_30%_25%,rgb(117_137_181/0.14),transparent_70%)] opacity-40",
  },
  {
    span: "lg:col-span-5",
    cell: "",
    wrap: "order-last mt-10 self-end lg:absolute lg:-bottom-4 lg:end-6 lg:mt-0",
    glyph: "size-44 text-fg/60 md:size-52 lg:size-60",
    body: "lg:pb-56",
    light: "bg-[radial-gradient(ellipse_70%_60%_at_80%_85%,rgb(201_169_110/0.1),transparent_70%)] opacity-40",
  },
  {
    span: "lg:col-span-7",
    cell: "lg:flex-row lg:items-center lg:gap-16",
    wrap: "shrink-0",
    glyph: "size-48 text-gold-soft/70 md:size-56 lg:size-72",
    body: "mt-12 lg:mt-0",
    light: "bg-[radial-gradient(ellipse_50%_70%_at_18%_50%,rgb(201_169_110/0.16),transparent_70%)] opacity-70",
  },
];

export async function ServicesSection() {
  const [t, locale] = await Promise.all([getTranslations("services"), getLocale()]);
  const explore = (
    <ButtonLink href="/services" variant="secondary">
      {t("explore")}
    </ButtonLink>
  );

  return (
    <Section id="services" labelledBy="services-title" wide scene="cool" className="overflow-x-clip">
      <div aria-hidden className="light-pool end-[-12%] top-[30%] -z-10 size-[36rem] bg-cool/[0.06]" />
      <SectionHeading id="services-title" index={localizeDigits("02", locale)} eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} action={explore} accent={2} />

      <Stagger as="ul" className="grid border-t border-line md:grid-cols-2 lg:grid-cols-12">
        {services.map((service, i) => {
          const c = compositions[i % compositions.length];
          return (
            <StaggerItem
              as="li"
              key={service.id}
              className={cn("border-b border-line md:odd:border-e", c.span)}
            >
              <Link
                href={`/services#${service.id}`}
                className={cn(
                  "group relative isolate flex h-full min-h-[26rem] flex-col overflow-hidden px-2 py-10 md:p-10 lg:p-12",
                  c.cell,
                )}
              >
                {/* Local light: always on for the AI cell, rises on hover for the others */}
                <span aria-hidden className={cn("absolute inset-0 -z-10 transition-opacity duration-700 ease-luxe group-hover:opacity-100", c.light)} />
                <span aria-hidden className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-luxe group-hover:scale-x-100 rtl:origin-right" />

                <Parallax distance={18} className={cn("relative", c.wrap)}>
                  <ServiceGlyph
                    name={service.icon}
                    className={cn("transition-[translate,scale] duration-[900ms] ease-luxe group-hover:-translate-y-1.5 group-hover:scale-[1.03]", c.glyph)}
                  />
                </Parallax>

                <div className={cn("relative flex flex-1 flex-col", c.body)}>
                  <div className="flex items-end justify-between gap-4 border-b border-line pb-4 font-mono text-label uppercase rtl:font-sans">
                    <span aria-hidden className="numeral-outline text-[2.75rem]">
                      {localizeDigits(String(i + 1).padStart(2, "0"), locale)}
                    </span>
                    <span className="pb-1 text-muted">
                      <span className="sr-only">{t("timeline")}: </span>
                      {service.timeline[locale]}
                    </span>
                  </div>
                  <h3 className="mt-6 text-[clamp(2.25rem,1.6rem+2vw,3.5rem)] leading-[0.95] font-light tracking-[-0.025em]">
                    {service.title[locale]}
                  </h3>
                  <p className="mt-5 max-w-sm leading-[1.75] text-fg/70">{service.benefit[locale]}</p>
                  <span className="mt-8 flex items-center gap-3 text-sm text-gold md:mt-auto md:pt-8">
                    <span className="grid size-10 place-items-center rounded-full border border-gold/40 transition-all duration-500 ease-luxe group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                      <ArrowRight aria-hidden className="flip-rtl size-4" />
                    </span>
                    <span className="link-draw pb-0.5">{service.stack.slice(0, 3).join(" · ")}</span>
                  </span>
                </div>
              </Link>
            </StaggerItem>
          );
        })}
      </Stagger>
      <MobileAction>{explore}</MobileAction>
    </Section>
  );
}
