"use client";

import { AnimatePresence, m } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useState, type ReactNode } from "react";
import { projectCategories, projects, type Project, type ProjectCategory } from "@/data/projects";
import { cn } from "@/lib/cn";
import { localizeDigits } from "@/lib/i18n";
import { CompactProjectRow, FeaturedProjectCard, SecondaryProjectCard } from "./ProjectCard";

type Filter = "all" | ProjectCategory;
const filters: Filter[] = ["all", ...projectCategories];
const ease = [0.22, 1, 0.36, 1] as const;

function Tier({ title, count, children }: { title: string; count: number; children: ReactNode }) {
  const locale = useLocale();
  return (
    <m.section layout="position" className="mt-16 first:mt-0" aria-label={title}>
      <h2 className="mb-6 flex items-center gap-4 font-mono text-label uppercase text-gold">
        {title}
        <span className="h-px flex-1 bg-line" aria-hidden />
        <span className="text-muted">{localizeDigits(String(count).padStart(2, "0"), locale)}</span>
      </h2>
      {children}
    </m.section>
  );
}

function AnimatedItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <m.li
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.45, ease }}
      className={className}
    >
      {children}
    </m.li>
  );
}

export function ProjectsExplorer() {
  const t = useTranslations("projects");
  const locale = useLocale();
  const [filter, setFilter] = useState<Filter>("all");

  const visible = filter === "all" ? projects : projects.filter((p) => p.categories.includes(filter));
  const byTier = (tier: Project["tier"]) => visible.filter((p) => p.tier === tier);
  const featured = byTier("featured");
  const secondary = byTier("secondary");
  const more = byTier("more");

  return (
    <>
      <div role="group" aria-label={t("filterLabel")} className="mb-14 flex flex-wrap gap-2">
        {filters.map((f) => {
          const count = f === "all" ? projects.length : projects.filter((p) => p.categories.includes(f)).length;
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
                <m.span layoutId="filter-pill" className="absolute inset-0 -z-10 rounded-full bg-gold/10" transition={{ duration: 0.4, ease }} />
              )}
              {t(`filters.${f}`)}
              <span className="font-mono text-micro text-muted">{localizeDigits(count, locale)}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length === 0 ? t("empty") : `${t(`filters.${filter}`)}: ${localizeDigits(visible.length, locale)}`}
      </p>

      {visible.length === 0 && <p className="py-20 text-center">{t("empty")}</p>}

      {featured.length > 0 && (
        <Tier title={t("tiers.featured")} count={featured.length}>
          <ul className="grid gap-x-10 gap-y-20 lg:grid-cols-2">
            <AnimatePresence initial={false}>
              {featured.map((project, i) => (
                <AnimatedItem key={project.slug} className={cn(i === 0 && "lg:col-span-2", i > 0 && i % 2 === 0 && "lg:mt-24")}>
                  <FeaturedProjectCard project={project} priority={i < 2} index={i} large={i === 0} />
                </AnimatedItem>
              ))}
            </AnimatePresence>
          </ul>
        </Tier>
      )}

      {secondary.length > 0 && (
        <Tier title={t("tiers.secondary")} count={secondary.length}>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence initial={false}>
              {secondary.map((project) => (
                <AnimatedItem key={project.slug}>
                  <SecondaryProjectCard project={project} />
                </AnimatedItem>
              ))}
            </AnimatePresence>
          </ul>
        </Tier>
      )}

      {more.length > 0 && (
        <Tier title={t("tiers.more")} count={more.length}>
          <ul className="border-t border-line">
            <AnimatePresence initial={false}>
              {more.map((project) => (
                <AnimatedItem key={project.slug}>
                  <CompactProjectRow project={project} />
                </AnimatedItem>
              ))}
            </AnimatePresence>
          </ul>
        </Tier>
      )}
    </>
  );
}
