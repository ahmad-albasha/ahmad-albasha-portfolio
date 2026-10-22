import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, IBM_Plex_Sans_Arabic, Inter, JetBrains_Mono, Noto_Naskh_Arabic } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { JsonLd } from "@/components/seo/JsonLd";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { site } from "@/data/site";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/seo";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const sans = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains", display: "swap", preload: false });
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  variable: "--font-arabic",
  display: "swap",
  preload: false,
});
// Arabic display face for headings — the Naskh counterpart to Cormorant.
const arabicDisplay = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["500", "600", "700"],
  variable: "--font-arabic-display",
  display: "swap",
  preload: false,
});

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(site.url),
    applicationName: site.name[locale],
    authors: [{ name: site.name.en, url: site.url }],
    creator: site.name.en,
    formatDetection: { telephone: false },
    ...pageMetadata({ locale, title: t("siteTitle"), description: t("siteDescription") }),
    // After the spread so child pages get the "Page — Name" template.
    title: { default: t("siteTitle"), template: `%s — ${site.name[locale]}` },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "nav" });

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={cn(display.variable, sans.variable, mono.variable, locale === "ar" && arabic.variable, locale === "ar" && arabicDisplay.variable)}
    >
      <body className="bg-noise">
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-gold px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
        >
          {t("skip")}
        </a>
        <NextIntlClientProvider>
          <MotionProvider>
            <Navbar />
            <main id="main" className="relative z-10">
              {children}
            </main>
            <Footer />
          </MotionProvider>
        </NextIntlClientProvider>
        <JsonLd locale={locale} />
      </body>
    </html>
  );
}
