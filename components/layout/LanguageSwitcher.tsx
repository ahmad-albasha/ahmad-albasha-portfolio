"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const target = locale === "en" ? "ar" : "en";

  return (
    <Link
      href={pathname}
      locale={target}
      hrefLang={target}
      lang={target}
      aria-label={`${t("language")}: ${t("switchTo")}`}
      className={cn(
        "inline-flex h-11 items-center rounded-full border border-line px-4 text-sm text-fg transition-colors duration-300 hover:border-gold/50 hover:text-gold",
        target === "ar" ? "font-[family-name:var(--font-arabic),sans-serif]" : "font-sans",
        className,
      )}
    >
      {t("switchTo")}
    </Link>
  );
}
