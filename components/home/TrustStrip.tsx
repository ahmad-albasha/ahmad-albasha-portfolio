import { Fragment } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { localizeDigits } from "@/lib/i18n";

/**
 * Key figures under the hero, set as an editorial ledger, over a slow marquee of the practice areas.
 * Edit the figures in data/site.ts (stats); the marquee reads the service titles from data/services.ts.
 */
export async function TrustStrip() {
  const [t, locale] = await Promise.all([getTranslations("trust"), getLocale()]);
  const disciplines = services.map((s) => s.title[locale]);
  // Two identical halves so the loop is seamless at -50%.
  const run = [...disciplines, ...disciplines, ...disciplines];

  return (
    <section aria-label={t("statsLabel")} className="relative">
      <div aria-hidden className="relative overflow-hidden border-y border-line py-6 md:py-8 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="animate-marquee flex w-max">
          {[0, 1].map((half) => (
            <div key={half} className="flex shrink-0 items-center">
              {run.map((label, i) => (
                <Fragment key={`${half}-${i}`}>
                  <span className="px-8 font-display text-[clamp(1.75rem,1.2rem+2vw,3rem)] font-light whitespace-nowrap text-fg/80 italic md:px-12 rtl:not-italic">
                    {label}
                  </span>
                  <svg viewBox="0 0 16 16" className="size-3 shrink-0 text-gold" fill="currentColor">
                    <path d="M8 0 9.4 6.6 16 8 9.4 9.4 8 16 6.6 9.4 0 8 6.6 6.6Z" />
                  </svg>
                </Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>

      <Container className="max-w-wide">
        <dl className="grid sm:grid-cols-3">
          {site.stats.map((stat, i) => (
            <div
              key={stat.value + stat.label.en}
              className="flex items-end gap-6 border-b border-line py-8 last:border-b-0 sm:flex-col sm:items-start sm:gap-4 sm:border-b-0 sm:border-s sm:px-8 sm:py-12 sm:first:border-s-0 sm:first:ps-0 lg:px-12"
            >
              <dt className="order-2 max-w-[16rem] text-sm leading-snug">
                <span className="mb-2 block font-mono text-micro text-cool">{localizeDigits(String(i + 1).padStart(2, "0"), locale)}</span>
                {stat.label[locale]}
              </dt>
              <dd className="order-1 shrink-0 font-display text-[clamp(3.5rem,2.5rem+3vw,6rem)] leading-[0.85] font-light text-fg">
                {localizeDigits(stat.value, locale)}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
