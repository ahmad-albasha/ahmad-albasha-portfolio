import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { site } from "@/data/site";

export const ogImage = { url: "/og", width: 1200, height: 630, alt: `${site.name.en} — ${site.role.en}` };

export function absoluteUrl(locale: Locale, path = "") {
  return `${site.url}/${locale}${path}`;
}

/** hreflang map for a path, including x-default (English). */
export function languageAlternates(path = "") {
  return {
    ...Object.fromEntries(routing.locales.map((l) => [l, absoluteUrl(l, path)])),
    "x-default": absoluteUrl(routing.defaultLocale, path),
  };
}

/** Per-page metadata with canonical URL, hreflang alternates and Open Graph. */
export function pageMetadata({
  locale,
  path = "",
  title,
  description,
  noIndex = false,
}: {
  locale: Locale;
  path?: string;
  title?: string;
  description: string;
  noIndex?: boolean;
}): Metadata {
  return {
    ...(title && { title }),
    description,
    alternates: { canonical: absoluteUrl(locale, path), languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      url: absoluteUrl(locale, path),
      siteName: site.name[locale],
      ...(title && { title }),
      description,
      locale: locale === "ar" ? "ar_SA" : "en_US",
      alternateLocale: locale === "ar" ? ["en_US"] : ["ar_SA"],
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", ...(title && { title }), description, images: [ogImage.url] },
    ...(noIndex && { robots: { index: false, follow: true } }),
  };
}
