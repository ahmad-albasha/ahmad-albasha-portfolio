import { getLocale, getTranslations } from "next-intl/server";
import { ContactChannels } from "@/components/contact/ContactChannels";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";
import { Link } from "@/i18n/navigation";
import { localizeDigits } from "@/lib/i18n";
import { Logo } from "./Logo";
import { navLinks } from "./navLinks";

export async function Footer() {
  const [t, nav, locale] = await Promise.all([getTranslations("footer"), getTranslations("nav"), getLocale()]);
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-espresso/40">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1.4fr]">
        <div className="flex flex-col gap-5">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed">{t("tagline")}</p>
          <p className="font-mono text-label uppercase text-muted">{site.location[locale]}</p>
        </div>

        <nav aria-label={t("navTitle")}>
          <h2 className="mb-4 font-mono text-label uppercase text-gold">{t("navTitle")}</h2>
          <ul className="flex flex-col gap-2.5 text-sm">
            {[...navLinks, { href: "/book", key: "book" as const }].map(({ href, key }) => (
              <li key={href}>
                <Link href={href} className="inline-flex min-h-8 items-center transition-colors hover:text-fg">
                  {nav(key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 font-mono text-label uppercase text-gold">{t("contactTitle")}</h2>
          <ContactChannels />
        </div>
      </Container>
      {/* Signature wordmark, cropped by the page edge */}
      <Container className="max-w-wide">
        <p
          aria-hidden
          className="pointer-events-none -mb-[0.18em] bg-[linear-gradient(180deg,rgb(232_225_213/0.14),rgb(232_225_213/0.02))] bg-clip-text text-center font-display text-[clamp(3.5rem,0.5rem+13vw,15rem)] leading-none font-light tracking-[-0.04em] whitespace-nowrap text-transparent select-none"
        >
          {site.name[locale]}
        </p>
      </Container>
      <Container className="flex flex-col justify-between gap-2 border-t border-line py-6 text-xs sm:flex-row">
        <p>
          © {localizeDigits(year, locale)} {site.name[locale]}. {t("rights")}
        </p>
        <p className="font-mono">{site.role[locale]}</p>
      </Container>
    </footer>
  );
}
