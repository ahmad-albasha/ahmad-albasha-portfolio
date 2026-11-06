import { ArrowRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { ProductFrame } from "@/components/projects/ProductFrame";
import { ButtonLink } from "@/components/ui/Button";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { MobileAction, Section, SectionHeading } from "@/components/ui/Section";
import { featuredProjects, type FeaturedProject } from "@/data/projects";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { localizeDigits } from "@/lib/i18n";
import type { Locale } from "@/i18n/routing";

type T = Awaited<ReturnType<typeof getTranslations<"projects">>>;

function indexOf(i: number, locale: Locale) {
  return localizeDigits(String(i + 1).padStart(2, "0"), locale);
}

/** Year · discipline · role, set as a small ruled specification table. */
function Spec({ project, t, locale, className }: { project: FeaturedProject; t: T; locale: Locale; className?: string }) {
  const rows = [
    { label: t("meta.year"), value: localizeDigits(project.year, locale) },
    { label: t("meta.discipline"), value: project.categories.map((c) => t(`filters.${c}`)).join(" · ") },
    { label: t("meta.role"), value: project.role[locale] },
  ];
  return (
    <dl className={cn("border-t border-line text-sm", className)}>
      {rows.map((row) => (
        <div key={row.label} className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-3">
          <dt className="font-mono text-label uppercase text-muted/80 rtl:font-sans">{row.label}</dt>
          <dd className="text-fg/85">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function StackLine({ tags }: { tags: string[] }) {
  return (
    <p dir="ltr" className="font-mono text-micro tracking-wide text-cool rtl:text-end">
      {tags.slice(0, 5).join("  /  ")}
    </p>
  );
}

function CaseLink({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-3 text-sm font-medium text-gold">
      <span className="link-draw pb-1">{label}</span>
      <span className="grid size-9 place-items-center rounded-full border border-gold/40 transition-all duration-500 ease-luxe group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
        <ArrowRight aria-hidden className="flip-rtl size-4" />
      </span>
    </span>
  );
}

/** 01 — the cover story: oversized title and spec sheet above a full-width cinematic product frame. */
function CoverProject({ project, t, locale }: { project: FeaturedProject; t: T; locale: Locale }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="lg:col-span-7">
          <p className="flex items-center gap-4 font-mono text-label uppercase text-gold">
            <span className="numeral-outline text-[4rem] lg:text-[6.5rem]" aria-hidden>
              {indexOf(0, locale)}
            </span>
            <span className="text-emerald-soft rtl:font-sans">{t("tiers.featured")}</span>
          </p>
          <h3 className="mt-4 text-[clamp(3.25rem,1.6rem+6vw,8rem)] leading-[0.9] font-light tracking-[-0.035em] transition-colors duration-500 group-hover:text-gold-soft">
            {project.title}
          </h3>
          <p className="mt-6 max-w-xl text-lead text-fg/75">{project.tagline[locale]}</p>
        </div>
        <div className="flex flex-col gap-6 lg:col-span-4 lg:col-start-9">
          <Spec project={project} t={t} locale={locale} />
          <StackLine tags={project.tags} />
          <CaseLink label={t("viewCase")} />
        </div>
      </div>
      <Parallax className="relative mt-12 lg:mt-16" distance={30}>
        <div aria-hidden className="light-pool -inset-x-10 -bottom-16 top-1/3 bg-gold/[0.08]" />
        <ProductFrame project={project} priority sizes="(min-width: 1280px) 88rem, 100vw" aspect="aspect-[16/9] lg:aspect-[2/1]" className="relative" />
      </Parallax>
    </Link>
  );
}

/** 02–04 — alternating editorial rows: a large product frame against a narrow column of text. */
function RowProject({ project, index, t, locale }: { project: FeaturedProject; index: number; t: T; locale: Locale }) {
  const flipped = index % 2 === 0;
  return (
    <Link href={`/projects/${project.slug}`} className="group grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
      <Parallax className={cn("lg:col-span-7", flipped && "lg:order-2 lg:col-start-6")} distance={36}>
        <ProductFrame project={project} sizes="(min-width: 1024px) 55vw, 100vw" />
      </Parallax>
      <div className={cn("lg:col-span-4", flipped ? "lg:order-1 lg:col-start-1" : "lg:col-start-9")}>
        <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
          <span aria-hidden className="numeral-outline text-[3.5rem] lg:text-[4.5rem]">
            {indexOf(index, locale)}
          </span>
          <span className="font-mono text-label uppercase text-muted rtl:font-sans">
            {localizeDigits(project.year, locale)} · {project.categories.map((c) => t(`filters.${c}`)).join(" · ")}
          </span>
        </div>
        <h3 className="mt-6 text-[clamp(2.5rem,1.6rem+3vw,4.25rem)] leading-[0.95] font-light tracking-[-0.03em] transition-colors duration-500 group-hover:text-gold-soft">
          {project.title}
        </h3>
        <p className="mt-5 text-[1.0625rem] leading-[1.7] text-fg/75">{project.tagline[locale]}</p>
        <p className="mt-4 text-sm leading-[1.7]">{project.role[locale]}</p>
        <div className="mt-8 flex flex-col gap-6">
          <StackLine tags={project.tags} />
          <CaseLink label={t("viewCase")} />
        </div>
      </div>
    </Link>
  );
}

/** 05–06 — an offset pair, the second set lower to keep the rhythm asymmetric. */
function PairProject({ project, index, t, locale }: { project: FeaturedProject; index: number; t: T; locale: Locale }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <ProductFrame project={project} sizes="(min-width: 1024px) 45vw, 100vw" />
      <div className="mt-7 grid grid-cols-[auto_1fr] gap-x-6 gap-y-3">
        <span aria-hidden className="numeral-outline row-span-3 text-[3.5rem]">
          {indexOf(index, locale)}
        </span>
        <h3 className="text-[clamp(2rem,1.5rem+1.8vw,3rem)] leading-none font-light tracking-[-0.025em] transition-colors duration-500 group-hover:text-gold-soft">
          {project.title}
        </h3>
        <p className="max-w-md leading-[1.7] text-fg/75">{project.tagline[locale]}</p>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
          <StackLine tags={project.tags} />
          <CaseLink label={t("viewCase")} />
        </div>
      </div>
    </Link>
  );
}

export async function FeaturedProjects() {
  const [t, locale] = await Promise.all([getTranslations("projects"), getLocale() as Promise<Locale>]);
  const [cover, ...rest] = featuredProjects;
  const rows = rest.slice(0, 3);
  const pair = rest.slice(3);

  const viewAll = (
    <ButtonLink href="/projects" variant="secondary">
      {t("viewAll")}
    </ButtonLink>
  );

  return (
    <Section id="work" labelledBy="work-title" wide className="overflow-x-clip">
      <div aria-hidden className="light-pool start-[-10%] top-[8%] -z-10 size-[40rem] bg-emerald/[0.12]" />
      <SectionHeading id="work-title" index={localizeDigits("01", locale)} eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} action={viewAll} />

      <ol className="flex flex-col gap-28 md:gap-40">
        {cover && (
          <li>
            <Reveal>
              <CoverProject project={cover} t={t} locale={locale} />
            </Reveal>
          </li>
        )}
        {rows.map((project, i) => (
          <li key={project.slug}>
            <Reveal>
              <RowProject project={project} index={i + 1} t={t} locale={locale} />
            </Reveal>
          </li>
        ))}
        {pair.length > 0 && (
          <li>
            <ol className="grid gap-20 md:grid-cols-2 md:gap-10 lg:gap-16">
              {pair.map((project, i) => (
                <li key={project.slug} className={cn(i % 2 === 1 && "md:mt-40")}>
                  <Reveal>
                    <PairProject project={project} index={i + 4} t={t} locale={locale} />
                  </Reveal>
                </li>
              ))}
            </ol>
          </li>
        )}
      </ol>
      <MobileAction>{viewAll}</MobileAction>
    </Section>
  );
}
