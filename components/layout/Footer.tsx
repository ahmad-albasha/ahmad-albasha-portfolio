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
    <footer className="relative border-t border-line">
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
      <Container className="flex flex-col justify-between gap-2 border-t border-line py-6 text-xs sm:flex-row">
        <p>
          © {localizeDigits(year, locale)} {site.name[locale]}. {t("rights")}
        </p>
        <p className="font-mono">{site.role[locale]}</p>
      </Container>
    </footer>
  );
}
