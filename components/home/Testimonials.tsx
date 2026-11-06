import { getLocale, getTranslations } from "next-intl/server";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { testimonials } from "@/data/testimonials";

/** Renders nothing until data/testimonials.ts has at least one entry. */
export async function Testimonials() {
  if (testimonials.length === 0) return null;
  const [t, locale] = await Promise.all([getTranslations("testimonials"), getLocale()]);

  return (
    <Section id="testimonials" labelledBy="testimonials-title">
      <SectionHeading id="testimonials-title" eyebrow={t("eyebrow")} title={t("title")} />
      <Stagger as="ul" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((item) => (
          <StaggerItem as="li" key={item.name}>
            <figure className="flex h-full flex-col rounded-card border border-line surface-card p-8">
              <span aria-hidden className="font-display text-5xl leading-none text-gold">
                &ldquo;
              </span>
              <blockquote className="mt-2 flex-1 text-[1.0625rem] leading-relaxed text-fg/90">{item.quote[locale]}</blockquote>
              <figcaption className="mt-8 border-t border-line pt-5">
                <p className="text-fg">{item.name}</p>
                <p className="text-sm">{item.role[locale]}</p>
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
