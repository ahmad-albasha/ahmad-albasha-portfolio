import { ArrowRight, Check, Clock } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FinalCta } from "@/components/home/FinalCta";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ServiceIcon } from "@/components/services/ServiceIcon";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { services } from "@/data/services";
import type { Locale } from "@/i18n/routing";
import { stepNumber } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/services">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({ locale, path: "/services", title: t("servicesTitle"), description: t("servicesDescription") });
}

export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("services");

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />

      <Container className="pb-section">
        <ul className="border-t border-line">
          {services.map((service, i) => (
            <li key={service.id} id={service.id} className="scroll-mt-28 border-b border-line py-14 md:py-20">
              <Reveal className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
                <div className="group">
                  <div className="flex items-center gap-4">
                    <ServiceIcon name={service.icon} />
                    <span className="font-mono text-label text-muted">{stepNumber(i, locale)}</span>
                  </div>
                  <h2 className="mt-8 text-display">{service.title[locale]}</h2>
                  <p className="mt-4 text-lead text-gold-soft/90">{service.benefit[locale]}</p>
                  <p className="mt-5 leading-relaxed">{service.description[locale]}</p>
                  <dl className="mt-8 grid gap-6 sm:grid-cols-2">
                    <div>
                      <dt className="font-mono text-label uppercase text-muted">{t("idealFor")}</dt>
                      <dd className="mt-2 text-sm text-fg/90">{service.idealFor[locale]}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-label uppercase text-muted">{t("timeline")}</dt>
                      <dd className="mt-2 flex items-center gap-2 text-sm text-fg/90">
                        <Clock aria-hidden className="size-4 text-gold" />
                        {service.timeline[locale]}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="flex flex-col gap-8 rounded-card border border-line surface-card p-7 md:p-9">
                  <div>
                    <h3 className="font-mono text-label uppercase text-gold">{t("deliverables")}</h3>
                    <ul className="mt-5 flex flex-col gap-3.5">
                      {service.deliverables[locale].map((d) => (
                        <li key={d} className="flex gap-3 text-[0.95rem]">
                          <Check aria-hidden className="mt-1 size-4 shrink-0 text-gold" />
                          <span className="text-fg/90">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-mono text-label uppercase text-gold">{t("stack")}</h3>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {service.stack.map((s) => (
                        <li key={s}>
                          <Tag>{s}</Tag>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <ButtonLink href="/book" variant="secondary" className="mt-auto self-start">
                    {t("discuss")}
                    <ArrowRight aria-hidden className="flip-rtl size-4" />
                  </ButtonLink>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>

      <ProcessSection />
      <FinalCta />
    </>
  );
}
