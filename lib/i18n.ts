import type { Locale } from "@/i18n/routing";

/** A value written once per language. Used throughout /data so content stays out of components. */
export type Localized<T = string> = Record<Locale, T>;

export function localize<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}

const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

/**
 * Writes the digits in a number or string with the locale's numeral system, so figures in the
 * Arabic pages (٣٠, ٤٨, ٢٠٢٥…) match the Arabic-Indic digits used in the copy.
 */
export function localizeDigits(value: string | number, locale: string): string {
  const text = String(value);
  return locale === "ar" ? text.replace(/[0-9]/g, (d) => ARABIC_DIGITS[Number(d)]) : text;
}

/** "Aug 2025" / "أغسطس ٢٠٢٥" from an ISO year-month ("2025-08"). */
export function monthYear(isoMonth: string, locale: string): string {
  const [year, month] = isoMonth.split("-").map(Number);
  const text = new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en", { month: "short", year: "numeric" }).format(new Date(year, month - 1));
  return localizeDigits(text, locale);
}

/** Two-digit index ("01", "02"…) in the locale's numerals. */
export function stepNumber(index: number, locale: string): string {
  return localizeDigits(String(index + 1).padStart(2, "0"), locale);
}
