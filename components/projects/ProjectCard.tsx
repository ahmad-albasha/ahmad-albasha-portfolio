import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/data/projects";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { localizeDigits } from "@/lib/i18n";

import { ProductFrame } from "./ProductFrame";
import { ProjectVisual } from "./ProjectVisual";

/** Static card shell. Cards that link somewhere add `cardInteractive`; the others stay still on hover. */
const cardBase = "group relative flex h-full flex-col overflow-hidden rounded-card border border-line surface-card";
const cardInteractive =
  "transition-[translate,border-color,box-shadow] duration-500 ease-luxe hover:-translate-y-1 hover:border-gold/30 hover:shadow-glow focus-visible:border-gold/50";

/** AI work is tagged in emerald, everything else technical in dusty blue. */
const categoryTone: Record<Project["categories"][number], string> = {
  ai: "text-emerald-soft",
  web: "text-cool",
  mobile: "text-cool",
  hardware: "text-cool",
};

function Meta({ project }: { project: Project }) {
  const t = useTranslations("projects.filters");
  const locale = useLocale();
  return (
    <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-label uppercase">
      <span className="text-muted">{localizeDigits(project.year, locale)}</span>
      {project.categories.map((c) => (
        <span key={c} className="flex items-center gap-2.5">
          <span aria-hidden className="size-1 rounded-full bg-line-strong" />
          <span className={categoryTone[c]}>{t(c)}</span>
        </span>
      ))}
    </p>
  );
}

/** Large card for featured projects — links to the case study. */
export function FeaturedProjectCard({ project, priority, index, large }: { project: Project; priority?: boolean; index?: number; large?: boolean }) {
  const t = useTranslations("projects");
  const locale = useLocale();
  return (
    <Link href={`/projects/${project.slug}`} className="group flex h-full flex-col">
      <ProductFrame
        project={project}
        priority={priority}
        sizes={large ? "(min-width: 1280px) 88rem, 100vw" : "(min-width: 1024px) 50vw, 100vw"}
        aspect={large ? "aspect-[16/10] lg:aspect-[21/9]" : "aspect-[16/10]"}
      />
      <div className="flex flex-1 flex-col pt-7">
        <div className="flex items-center justify-between gap-4 border-b border-line pb-3">
          <Meta project={project} />
          {index !== undefined && (
            <span aria-hidden className="numeral-outline text-[2.5rem]">
              {localizeDigits(String(index + 1).padStart(2, "0"), locale)}
            </span>
          )}
        </div>
        <h3 className={cn("mt-5 leading-[0.95] font-light tracking-[-0.025em] transition-colors duration-500 group-hover:text-gold-soft", large ? "text-[clamp(2.75rem,1.6rem+4vw,5.5rem)]" : "text-[clamp(2.25rem,1.6rem+2vw,3.25rem)]")}>
          {project.title}
        </h3>
        <p className="mt-3 max-w-prose text-[0.975rem] leading-[1.7]">{project.tagline[locale]}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tags.slice(0, 5).map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
        <span className="mt-auto inline-flex items-center gap-3 pt-8 text-sm font-medium text-gold">
          <span className="link-draw pb-1">{t("viewCase")}</span>
          <span className="grid size-9 place-items-center rounded-full border border-gold/40 transition-all duration-500 ease-luxe group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
            <ArrowRight aria-hidden className="flip-rtl size-4" />
          </span>
        </span>
      </div>
    </Link>
  );
}

/** Medium card — links to the live site when there is one. */
export function SecondaryProjectCard({ project }: { project: Project }) {
  const t = useTranslations("projects");
  const locale = useLocale();
  const content = (
    <>
      <ProjectVisual project={project} framed sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="aspect-[16/10] border-b border-line" />
      <div className="flex flex-1 flex-col p-6">
        <Meta project={project} />
        <h3 className="mt-3 font-display text-2xl">{project.title}</h3>
        <p className="mt-2.5 text-sm leading-[1.7]">{project.summary[locale]}</p>
        {project.liveUrl && (
          <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-gold">
            {t("visit")}
            <ArrowUpRight aria-hidden className="flip-rtl size-4 transition-transform duration-500 group-hover:-translate-y-0.5" />
          </span>
        )}
      </div>
    </>
  );

  return project.liveUrl ? (
    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={cn(cardBase, cardInteractive)}>
      {content}
    </a>
  ) : (
    <article className={cardBase}>{content}</article>
  );
}

/** Compact row for smaller or experimental work. */
export function CompactProjectRow({ project }: { project: Project }) {
  const locale = useLocale();
  return (
    <article className="grid gap-3 border-b border-line py-6 md:grid-cols-[1.2fr_2fr_auto] md:items-center md:gap-8">
      <div>
        <h3 className="font-display text-2xl">{project.title}</h3>
        <p className="mt-1.5 font-mono text-label text-cool">{project.tagline[locale]}</p>
      </div>
      <p className="text-sm leading-relaxed">{project.summary[locale]}</p>
      <ul className="flex flex-wrap gap-2 md:justify-end">
        {project.tags.map((tag) => (
          <li key={tag}>
            <Tag>{tag}</Tag>
          </li>
        ))}
      </ul>
    </article>
  );
}
