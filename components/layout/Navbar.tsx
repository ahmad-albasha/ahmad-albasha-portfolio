"use client";

import { AnimatePresence, m } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { buttonClasses } from "@/components/ui/Button";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { navLinks } from "./navLinks";

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  // Close the mobile menu whenever the route changes.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const close = () => setOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ease-luxe",
        scrolled || open ? "glass border-line" : "border-transparent",
      )}
    >
      <div className="mx-auto flex h-18 w-full max-w-site items-center justify-between gap-4 px-gutter">
        <Logo onClick={close} />

        <nav aria-label={t("label")} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map(({ href, key }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm transition-colors duration-300 hover:text-fg",
                    isActive(href) ? "text-fg" : "text-muted",
                  )}
                >
                  {t(key)}
                  {isActive(href) && <span aria-hidden className="absolute inset-x-4 -bottom-0.5 h-px bg-gold/70" />}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
          <Link href="/book" className={buttonClasses({ size: "md", className: "px-4 sm:px-5" })}>
            <span className="lg:hidden">{t("bookShort")}</span>
            <span className="hidden lg:inline">{t("book")}</span>
            <ArrowRight aria-hidden className="flip-rtl hidden size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 sm:block rtl:group-hover/btn:-translate-x-0.5" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            className="grid size-11 place-items-center rounded-full border border-line text-fg transition-colors hover:border-gold/50 md:hidden"
          >
            {open ? <X className="size-4" aria-hidden /> : <Menu className="size-4" aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100dvh - 4.5rem)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-ink md:hidden"
          >
            <nav aria-label={t("label")} className="flex h-full flex-col justify-between px-gutter pt-8 pb-10">
              <ul className="flex flex-col">
                {[{ href: "/", key: "home" as const }, ...navLinks].map(({ href, key }, i) => (
                  <m.li
                    key={href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                    className="border-b border-line"
                  >
                    <Link
                      href={href}
                      onClick={close}
                      aria-current={pathname === href || (href !== "/" && isActive(href)) ? "page" : undefined}
                      className="flex items-center justify-between py-5 font-display text-3xl text-fg aria-[current=page]:text-gold"
                    >
                      {t(key)}
                      <ArrowRight aria-hidden className="flip-rtl size-5 text-muted" />
                    </Link>
                  </m.li>
                ))}
              </ul>
              <LanguageSwitcher className="self-start" />
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
