import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { ContactChannels } from "@/components/contact/ContactChannels";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { EditorialTitle } from "@/components/ui/Section";
import { site } from "@/data/site";

const ARCS = [120, 200, 280, 360, 440, 520];

/**
 * The closing chapter: a horizon of champagne light rising behind concentric arcs (the orbit motif,
 * now seen edge-on), a very large headline, one prominent action and the contact details.
 */
export async function FinalCta({ title, body }: { title?: string; body?: string }) {
  const [t, locale] = await Promise.all([getTranslations("cta"), getLocale()]);

  return (
    <section id="contact" aria-labelledby="cta-title" className="relative isolate overflow-hidden border-t border-line pt-section pb-20 md:pb-28">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-ink),rgb(20_37_31/0.6)_55%,rgb(27_25_21))]" />
        <div className="column-guides absolute inset-0 hidden md:block" />
        {/* Horizon light */}
        <div className="absolute start-1/2 bottom-[-30%] h-[70%] w-[130%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgb(201_169_110/0.32),rgb(201_169_110/0.08)_40%,transparent_70%)] blur-2xl rtl:translate-x-1/2" />
        <div className="light-pool start-[-10%] top-[20%] size-[28rem] bg-emerald/20" />
        <div className="light-pool end-[-10%] top-[35%] size-[24rem] bg-emerald/15" />
        <svg viewBox="-600 -600 1200 600" preserveAspectRatio="xMidYMax slice" className="absolute inset-x-0 bottom-0 h-[80%] w-full" fill="none">
          {ARCS.map((r, i) => (
            <circle
              key={r}
              r={r}
              stroke="#c9a96e"
              strokeOpacity={0.28 - i * 0.035}
              strokeWidth="0.8"
              strokeDasharray={i % 2 ? "2 7" : undefined}
              className="animate-draw"
              style={{ "--len": Math.ceil(2 * Math.PI * r), "--delay": `${i * 120}ms` } as CSSProperties}
            />
          ))}
          <circle r="5" fill="#e8e1d5" />
          <circle r="16" stroke="#c9a96e" strokeOpacity="0.6" className="animate-pulse-ring" />
        </svg>
      </div>

      <Container className="max-w-wide">
        <Reveal className="flex flex-col items-center text-center">
          <p className="flex items-center gap-4 font-mono text-label uppercase text-gold">
            <span aria-hidden className="h-px w-10 bg-gold/60" />
            {t("eyebrow")}
            <span aria-hidden className="h-px w-10 bg-gold/60" />
          </p>
          <h2 id="cta-title" className="mt-8 max-w-[16ch] text-mega font-light text-fg rtl:max-w-[20ch]">
            <EditorialTitle text={title ?? t("title")} accent={2} />
          </h2>
          <p className="mt-8 max-w-xl text-lead text-fg/75">{body ?? t("body")}</p>

          <Link
            href="/book"
            className="group mt-12 inline-flex h-16 items-center gap-4 rounded-full bg-gold ps-8 pe-2 text-base font-medium text-ink shadow-[0_0_0_1px_rgb(201_169_110/0.4),0_20px_60px_-15px_rgb(201_169_110/0.55)] transition-all duration-500 ease-luxe hover:bg-gold-soft hover:shadow-[0_0_0_1px_rgb(226_204_159/0.6),0_24px_80px_-12px_rgb(201_169_110/0.75)] active:scale-[0.98] md:h-[4.5rem] md:text-lg"
          >
            {t("primary")}
            <span className="grid size-12 place-items-center rounded-full bg-ink text-gold transition-transform duration-500 ease-luxe group-hover:translate-x-1 md:size-14 rtl:group-hover:-translate-x-1">
              <ArrowRight aria-hidden className="flip-rtl size-5" />
            </span>
          </Link>
        </Reveal>

        <Reveal delay={0.15} className="mt-24 grid gap-10 border-t border-line pt-10 md:mt-32 md:grid-cols-12 md:items-end md:gap-8">
          <div className="md:col-span-6">
            <p className="font-mono text-label uppercase text-muted rtl:font-sans">{t("orReach")}</p>
            <a
              href={`mailto:${site.contact.email}`}
              dir="ltr"
              className="link-draw mt-4 inline-block font-display text-[clamp(1.5rem,1rem+2vw,2.75rem)] leading-tight font-light break-all text-fg transition-colors duration-300 hover:text-gold-soft"
            >
              {site.contact.email}
            </a>
          </div>
          <div className="flex flex-col gap-4 md:col-span-6 md:items-end">
            <ContactChannels className="md:justify-end" />
            <p className="font-mono text-label uppercase text-muted rtl:font-sans">{site.location[locale]}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
