import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";
import { localizeDigits } from "@/lib/i18n";

/**
 * Key figures under the hero. Edit them in data/site.ts (stats).
 * The technology logos live on the About page, where they read as skills rather than decoration.
 */
export async function TrustStrip() {
  const [t, locale] = await Promise.all([getTranslations("trust"), getLocale()]);

  return (
    <section aria-label={t("statsLabel")} className="relative border-y border-line bg-surface/40">
      <Container className="py-10 md:py-12">
        <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-3">
          {site.stats.map((stat) => (
            <div
              key={stat.value + stat.label.en}
              className="flex items-baseline gap-4 border-b border-line pb-6 last:border-b-0 last:pb-0 sm:flex-col sm:items-start sm:gap-1 sm:border-b-0 sm:pb-0"
            >
              <dt className="order-2 text-sm leading-snug">{stat.label[locale]}</dt>
              <dd className="order-1 shrink-0 font-display text-4xl text-gold sm:text-5xl">{localizeDigits(stat.value, locale)}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
