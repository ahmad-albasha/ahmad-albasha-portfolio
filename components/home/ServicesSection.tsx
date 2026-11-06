import { ArrowRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { ServiceGlyph } from "@/components/services/ServiceGlyph";
import { ButtonLink } from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { MobileAction, Section, SectionHeading } from "@/components/ui/Section";
import { services } from "@/data/services";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { localizeDigits } from "@/lib/i18n";

/**
 * Each service gets its own composition inside a ruled editorial grid (no boxed cards):
 *  0 — wide, emerald-lit, emblem floating top-end, text settled at the bottom
 *  1 — narrow, emblem leading, text below
 *  2 — narrow, text leading, emblem anchored bottom-end
 *  3 — wide, emblem and text side by side
 */
const compositions = [
  {
    span: "lg:col-span-7",
    cell: "md:min-h-[34rem]",
    glyph: "size-40 text-emerald-soft opacity-80 md:size-48 lg:absolute lg:end-12 lg:top-12 lg:size-80",
    body: "mt-10 lg:mt-0",
    light: "bg-[radial-gradient(ellipse_60%_60%_at_85%_20%,rgb(82_125_112/0.22),transparent_70%)] opacity-60",
  },
  {
    span: "lg:col-span-5",
    cell: "",
    glyph: "size-36 text-fg/55 md:size-44",
    body: "mt-10",
    light: "bg-[radial-gradient(ellipse_70%_60%_at_30%_25%,rgb(201_169_110/0.12),transparent_70%)] opacity-0",
  },
  {
    span: "lg:col-span-5",
    cell: "",
    glyph: "order-last mt-6 size-40 self-end text-fg/45 md:size-48 lg:absolute lg:-bottom-6 lg:end-4 lg:mt-0 lg:size-52",
    body: "lg:pb-48",
    light: "bg-[radial-gradient(ellipse_70%_60%_at_80%_85%,rgb(117_137_181/0.14),transparent_70%)] opacity-0",
  },
  {
    span: "lg:col-span-7",
    cell: "lg:flex-row lg:items-center lg:gap-12",
    glyph: "size-40 shrink-0 text-fg/55 lg:size-56",
    body: "mt-10 lg:mt-0",
    light: "bg-[radial-gradient(ellipse_50%_70%_at_15%_50%,rgb(201_169_110/0.12),transparent_70%)] opacity-0",
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
    <Section id="services" labelledBy="services-title" wide className="overflow-x-clip">
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

                <ServiceGlyph
                  name={service.icon}
                  className={cn("transition-[transform,opacity] duration-700 ease-luxe group-hover:-translate-y-1 group-hover:opacity-100", c.glyph)}
                />

                <div className={cn("relative flex flex-1 flex-col", c.body)}>
                  <div className="flex items-center justify-between gap-4 font-mono text-label uppercase rtl:font-sans">
                    <span className="text-gold">{localizeDigits(String(i + 1).padStart(2, "0"), locale)}</span>
                    <span className="text-muted/80">
                      <span className="sr-only">{t("timeline")}: </span>
                      {service.timeline[locale]}
                    </span>
                  </div>
                  <h3 className="mt-5 text-[clamp(2.25rem,1.6rem+2vw,3.5rem)] leading-[0.95] font-light tracking-[-0.025em]">
                    {service.title[locale]}
                  </h3>
                  <p className="mt-4 max-w-sm leading-[1.7]">{service.benefit[locale]}</p>
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
