"use client";

import { AnimatePresence, m } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { gallery, galleryCategories, type GalleryCategory } from "@/data/gallery";
import { cn } from "@/lib/cn";
import { localizeDigits } from "@/lib/i18n";

type Filter = "all" | GalleryCategory;
const filters: Filter[] = ["all", ...galleryCategories];
const ease = [0.22, 1, 0.36, 1] as const;

/** "All" deals the categories out in turn, so every masonry column mixes honors, talks and activities. */
const interleaved = (() => {
  const queues = galleryCategories.map((c) => gallery.filter((p) => p.category === c));
  const out: typeof gallery = [];
  while (queues.some((q) => q.length)) for (const q of queues) if (q.length) out.push(q.shift()!);
  return out;
})();

/** Category filter, masonry grid and a full-screen lightbox with keyboard and swipe navigation. */
export function GalleryExplorer() {
  const t = useTranslations("gallery");
  const locale = useLocale();
  const [filter, setFilter] = useState<Filter>("all");
  const [index, setIndex] = useState<number | null>(null);
  const portalReady = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const visible = filter === "all" ? interleaved : gallery.filter((p) => p.category === filter);
  const total = visible.length;
  const num = (n: number) => localizeDigits(n, locale);

  const step = useCallback((dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + total) % total)), [total]);

  useEffect(() => {
    if (index === null) return;
    // In RTL the "next" photo sits to the left, so the arrow keys swap.
    const rtl = document.documentElement.dir === "rtl";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      else if (e.key === "ArrowRight") step(rtl ? -1 : 1);
      else if (e.key === "ArrowLeft") step(rtl ? 1 : -1);
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [index, step]);

  const current = index === null ? null : visible[index];

  return (
    <>
      <div role="group" aria-label={t("filterLabel")} className="mb-12 flex flex-wrap gap-2">
        {filters.map((f) => {
          const count = f === "all" ? gallery.length : gallery.filter((p) => p.category === f).length;
          const active = filter === f;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f)}
              className={cn(
                "relative inline-flex h-11 items-center gap-2 rounded-full border px-4 text-sm transition-colors duration-300",
                active ? "border-gold/60 text-fg" : "border-line text-muted hover:border-line-strong hover:text-fg",
              )}
            >
              {active && (
                <m.span layoutId="gallery-filter-pill" className="absolute inset-0 -z-10 rounded-full bg-gold/10" transition={{ duration: 0.4, ease }} />
              )}
              {t(`filters.${f}`)}
              <span className="font-mono text-micro text-muted">{num(count)}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {`${t(`filters.${filter}`)}: ${num(total)}`}
      </p>

      <m.ul key={filter} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }} className="columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4">
        {visible.map((photo, i) => (
          <li key={photo.src} className="mb-3 break-inside-avoid md:mb-4">
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={t("open", { n: num(i + 1), total: num(total) })}
              className="group relative block w-full overflow-hidden rounded-control border border-line bg-surface-2 transition-all duration-500 ease-luxe hover:border-gold/40 hover:shadow-glow focus-visible:border-gold/60"
            >
              <Image
                src={photo.src}
                alt={t(`alt.${photo.category}`)}
                width={photo.width}
                height={photo.height}
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                priority={i < 4}
                className="h-auto w-full transition-transform duration-[900ms] ease-luxe group-hover:scale-[1.04]"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end bg-gradient-to-t from-ink/80 via-ink/10 to-transparent p-3 pt-12 font-mono text-micro uppercase text-fg/90 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              >
                {t(`filters.${photo.category}`)}
              </span>
            </button>
          </li>
        ))}
      </m.ul>

      {/* Portalled to <body>: the page template's entrance animation leaves a transform that would trap `fixed`. */}
      {portalReady &&
        createPortal(
          <AnimatePresence>
            {current && index !== null && (
              <m.div
                role="dialog"
                aria-modal="true"
                aria-label={t(`alt.${current.category}`)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease }}
                className="fixed inset-0 z-[60] flex flex-col bg-ink/95 backdrop-blur-md"
                onClick={() => setIndex(null)}
              >
                <div className="flex items-center justify-between px-gutter py-4" onClick={(e) => e.stopPropagation()}>
                  <span className="font-mono text-label text-muted" dir="ltr">
                    {t("counter", { n: num(index + 1), total: num(total) })}
                  </span>
                  <button
                    type="button"
                    autoFocus
                    onClick={() => setIndex(null)}
                    aria-label={t("close")}
                    className="grid size-11 place-items-center rounded-full border border-line text-fg transition-colors hover:border-gold/50"
                  >
                    <X aria-hidden className="size-4" />
                  </button>
                </div>

                <div className="relative flex-1">
                  <AnimatePresence initial={false} mode="popLayout">
                    <m.div
                      key={current.src}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.4}
                      onDragEnd={(_, info) => {
                        const rtl = document.documentElement.dir === "rtl";
                        if (Math.abs(info.offset.x) > 80) step((info.offset.x < 0) !== rtl ? 1 : -1);
                      }}
                      className="absolute inset-x-gutter inset-y-2 md:inset-x-24"
                    >
                      <Image
                        src={current.src}
                        alt={t(`alt.${current.category}`)}
                        fill
                        sizes="100vw"
                        draggable={false}
                        className="object-contain"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </m.div>
                  </AnimatePresence>

                  {total > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          step(-1);
                        }}
                        aria-label={t("previous")}
                        className="absolute start-3 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-line bg-ink/60 text-fg transition-colors hover:border-gold/50 md:grid"
                      >
                        <ChevronLeft aria-hidden className="flip-rtl size-5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          step(1);
                        }}
                        aria-label={t("next")}
                        className="absolute end-3 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-line bg-ink/60 text-fg transition-colors hover:border-gold/50 md:grid"
                      >
                        <ChevronRight aria-hidden className="flip-rtl size-5" />
                      </button>
                    </>
                  )}
                </div>

                <p className="px-gutter py-5 text-center font-mono text-label uppercase text-gold">{t(`filters.${current.category}`)}</p>
              </m.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
