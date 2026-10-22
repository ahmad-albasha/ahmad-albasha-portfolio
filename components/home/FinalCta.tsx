import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ContactChannels } from "@/components/contact/ContactChannels";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, Section } from "@/components/ui/Section";

/** Closing call to action with the booking button and secondary contact channels. */
export async function FinalCta({ title, body }: { title?: string; body?: string }) {
  const t = await getTranslations("cta");

  return (
    <Section id="contact" labelledBy="cta-title">
      <Reveal className="relative isolate overflow-hidden rounded-card border border-line bg-surface px-6 py-16 text-center sm:px-12 md:py-24">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-x-0 top-0 mx-auto h-64 w-[36rem] max-w-full rounded-full bg-gold/10 blur-[100px]" />
          <div className="hairline absolute inset-x-0 top-0" />
        </div>
        <Eyebrow className="justify-center">{t("eyebrow")}</Eyebrow>
        <h2 id="cta-title" className="mx-auto mt-6 max-w-3xl text-display">
          {title ?? t("title")}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lead">{body ?? t("body")}</p>
        <ButtonLink href="/book" size="lg" className="mt-10">
          {t("primary")}
          <ArrowRight aria-hidden className="flip-rtl size-4 transition-transform duration-300 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1" />
        </ButtonLink>
        <div className="mt-12 flex flex-col items-center gap-4">
          <p className="text-sm">{t("orReach")}</p>
          <ContactChannels className="justify-center" />
        </div>
      </Reveal>
    </Section>
  );
}
