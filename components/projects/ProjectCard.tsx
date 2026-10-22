import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/data/projects";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { localizeDigits } from "@/lib/i18n";

import { ProjectVisual } from "./ProjectVisual";

/** Static card shell. Cards that link somewhere add `cardInteractive`; the others stay still on hover. */
const cardBase = "group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface";
const cardInteractive = "transition-all duration-500 ease-luxe hover:-translate-y-1.5 hover:border-gold/30 hover:shadow-glow";

function Meta({ project }: { project: Project }) {
  const t = useTranslations("projects.filters");
  const locale = useLocale();
  return (
    <p className="font-mono text-label uppercase text-muted">
      {localizeDigits(project.year, locale)} · {project.categories.map((c) => t(c)).join(" / ")}
    </p>
  );
}

/** Large card for featured projects — links to the case study. */
export function FeaturedProjectCard({ project, priority }: { project: Project; priority?: boolean }) {
  const t = useTranslations("projects");
  const locale = useLocale();
  return (
    <Link href={`/projects/${project.slug}`} className={cn(cardBase, cardInteractive)}>
      <ProjectVisual project={project} priority={priority} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[16/10] border-b border-line" />
      <div className="flex flex-1 flex-col p-7 md:p-9">
        <Meta project={project} />
        <h3 className="mt-4 text-title">{project.title}</h3>
        <p className="mt-3 text-[0.975rem] leading-relaxed">{project.tagline[locale]}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tags.slice(0, 5).map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
        <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm text-gold">
          {t("viewCase")}
          <ArrowRight aria-hidden className="flip-rtl size-4 transition-transform duration-500 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
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
      <ProjectVisual project={project} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="aspect-[4/3] border-b border-line" />
      <div className="flex flex-1 flex-col p-6">
        <Meta project={project} />
        <h3 className="mt-3 font-display text-2xl">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed">{project.summary[locale]}</p>
        {project.liveUrl && (
          <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm text-gold">
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
        <p className="mt-1 font-mono text-label text-muted">{project.tagline[locale]}</p>
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
