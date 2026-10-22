import { ArrowRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { ServiceIcon } from "@/components/services/ServiceIcon";
import { ButtonLink } from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { MobileAction, Section, SectionHeading } from "@/components/ui/Section";
import { services } from "@/data/services";
import { Link } from "@/i18n/navigation";
import { stepNumber } from "@/lib/i18n";

export async function ServicesSection() {
  const [t, locale] = await Promise.all([getTranslations("services"), getLocale()]);
  const explore = (
    <ButtonLink href="/services" variant="secondary">
      {t("explore")}
    </ButtonLink>
  );

  return (
    <Section id="services" labelledBy="services-title">
      <SectionHeading
        id="services-title"
        eyebrow={t("eyebrow")}
        title={t("title")}
        intro={t("intro")}
        action={explore}
      />
      <Stagger as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, i) => (
          <StaggerItem as="li" key={service.id}>
            <Link
              href={`/services#${service.id}`}
              className="group relative flex h-full flex-col rounded-card border border-line bg-surface p-7 transition-all duration-500 ease-luxe hover:-translate-y-1 hover:border-gold/30 hover:bg-surface-2"
            >
              <div className="flex items-start justify-between">
                <ServiceIcon name={service.icon} />
                <span className="font-mono text-label text-muted">{stepNumber(i, locale)}</span>
              </div>
              <h3 className="mt-8 text-title">{service.title[locale]}</h3>
              <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed">{service.benefit[locale]}</p>
              <ArrowRight
                aria-hidden
                className="flip-rtl mt-8 size-4 text-gold opacity-60 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100 rtl:group-hover:-translate-x-1"
              />
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
      <MobileAction>{explore}</MobileAction>
    </Section>
  );
}
