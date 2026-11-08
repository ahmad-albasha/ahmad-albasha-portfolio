import { ArrowRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { ProductFrame } from "@/components/projects/ProductFrame";
import { ButtonLink } from "@/components/ui/Button";
import { CinematicFrame, DrawRule, MaskText } from "@/components/ui/Cinematic";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { MobileAction, Section, SectionHeading } from "@/components/ui/Section";
import { featuredProjects, type FeaturedProject } from "@/data/projects";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { localizeDigits } from "@/lib/i18n";
import type { Locale } from "@/i18n/routing";

type T = Awaited<ReturnType<typeof getTranslations<"projects">>>;
type ChapterProps = { project: FeaturedProject; index: number; t: T; locale: Locale };

function indexOf(i: number, locale: Locale) {
  return localizeDigits(String(i + 1).padStart(2, "0"), locale);
}

function disciplines(project: FeaturedProject, t: T) {
  return project.categories.map((c) => t(`filters.${c}`)).join(" · ");
}

/**
 * Each project is a chapter, and its number is the chapter's visual anchor: an oversized serif
 * numeral, lit from above in champagne, drifting a little slower than the content around it.
 */
function Numeral({ value, size, className, drift = 52 }: { value: string; size: string; className?: string; drift?: number }) {
  return (
    <Parallax distance={drift} className={cn("pointer-events-none select-none", className)}>
      <span aria-hidden className={cn("numeral-chapter block", size)}>
        {value}
      </span>
    </Parallax>
  );
}

/** Chapter line: "Chapter 02 ——◇ 2025 · Mobile · AI", with the hairline drawing in on arrival. */
function ChapterRule({ project, index, t, locale, className }: ChapterProps & { className?: string }) {
  return (
    <div className={cn("flex items-center gap-4 font-mono text-label uppercase rtl:font-sans", className)}>
      <span className="shrink-0 text-gold">
        {t("chapter")} {indexOf(index, locale)}
      </span>
      <DrawRule className="h-px min-w-6 flex-1 bg-gradient-to-r from-gold/60 to-line-strong rtl:bg-gradient-to-l" />
      <span aria-hidden className="size-1.5 shrink-0 rotate-45 border border-gold/70" />
      <span className="shrink-0 text-muted">
        {localizeDigits(project.year, locale)} · {disciplines(project, t)}
      </span>
    </div>
  );
}

/** Project title: oversized light serif; multi-word titles end on the champagne italic. */
function Title({ project, className }: { project: FeaturedProject; className?: string }) {
  const accent = project.title.trim().split(/\s+/).length > 1 ? 1 : 0;
  return (
    <h3 className={cn("relative font-light text-fg transition-colors duration-700 ease-luxe group-hover:text-gold-soft", className)}>
      <MaskText text={project.title} accent={accent} />
    </h3>
  );
}

/** Year · discipline · role, set as a small ruled specification table. */
function Spec({ project, t, locale, className }: ChapterProps & { className?: string }) {
  const rows = [
    { label: t("meta.year"), value: localizeDigits(project.year, locale) },
    { label: t("meta.discipline"), value: disciplines(project, t) },
    { label: t("meta.role"), value: project.role[locale] },
  ];
  return (
    <dl className={cn("border-t border-line text-sm", className)}>
      {rows.map((row) => (
        <div key={row.label} className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-3">
          <dt className="font-mono text-label uppercase text-muted rtl:font-sans">{row.label}</dt>
          <dd className="text-fg/85">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function StackLine({ tags }: { tags: string[] }) {
  return (
    <p dir="ltr" className="font-mono text-label tracking-wide text-cool rtl:text-end">
      {tags.slice(0, 5).join("  /  ")}
    </p>
  );
}

function CaseLink({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-3 text-sm font-medium text-gold">
      <span className="link-draw pb-1">{label}</span>
      <span className="grid size-10 place-items-center rounded-full border border-gold/40 transition-all duration-500 ease-luxe group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
        <ArrowRight aria-hidden className="flip-rtl size-4 transition-transform duration-500 ease-luxe group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
      </span>
    </span>
  );
}

/** The product frame on its lit stage, with the curtain-and-drift entrance. */
function Frame({ project, sizes, aspect, priority, drift, glow }: { project: FeaturedProject; sizes: string; aspect?: string; priority?: boolean; drift?: number; glow?: string }) {
  return (
    <div className="relative">
      {glow && <div aria-hidden className={cn("light-pool -z-10", glow)} />}
      <CinematicFrame drift={drift}>
        <ProductFrame project={project} sizes={sizes} aspect={aspect} priority={priority} />
      </CinematicFrame>
    </div>
  );
}

/**
 * Chapter 01 — the cover story. The title is set at poster scale directly over a giant numeral,
 * followed by the brief and spec sheet, then a full-width product frame.
 */
function CoverChapter(props: ChapterProps) {
  const { project, t, locale } = props;
  return (
    <Link href={`/projects/${project.slug}`} className="group relative block">
      <div className="relative">
        <Numeral
          value={indexOf(0, locale)}
          drift={70}
          size="text-[clamp(11rem,5rem+26vw,30rem)]"
          className="absolute end-[-4%] top-6 -z-10 sm:end-0 lg:end-[6%] lg:top-0"
        />
        <ChapterRule {...props} className="max-w-3xl" />
        <Title project={project} className="mt-12 max-w-[11ch] text-[clamp(4.25rem,1.6rem+9vw,11.5rem)] leading-[0.84] tracking-[-0.045em] lg:mt-20 rtl:leading-[1.15] rtl:tracking-normal" />
        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:items-end lg:gap-8">
          <Reveal className="lg:col-span-6">
            <p className="flex items-center gap-3 font-mono text-label uppercase text-emerald-soft rtl:font-sans">
              <span aria-hidden className="size-1.5 rounded-full bg-emerald-soft" />
              {t("tiers.featured")}
            </p>
            <p className="mt-5 max-w-xl text-lead text-fg/80">{project.tagline[locale]}</p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-6 lg:col-span-5 lg:col-start-8">
            <Spec {...props} />
            <StackLine tags={project.tags} />
            <CaseLink label={t("viewCase")} />
          </Reveal>
        </div>
      </div>
      <div className="mt-14 lg:mt-20">
        <Frame
          project={project}
          priority
          drift={28}
          sizes="(min-width: 1280px) 88rem, 100vw"
          aspect="aspect-[16/10] sm:aspect-[16/9] lg:aspect-[2/1]"
          glow="-inset-x-10 -bottom-16 top-1/3 bg-gold/[0.08]"
        />
      </div>
    </Link>
  );
}

/**
 * Chapter 02 — the numeral reaches across into the product frame and the title is layered over
 * the numeral's lower half. Frame on the reading start, text on the end.
 */
function OverlapChapter(props: ChapterProps) {
  const { project, index, t, locale } = props;
  return (
    <Link href={`/projects/${project.slug}`} className="group relative grid gap-y-10 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-0">
      <header className="relative z-10 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:self-end">
        <Numeral value={indexOf(index, locale)} size="text-[clamp(8.5rem,4rem+15vw,18rem)]" className="lg:-ms-[42%]" />
        <Title project={project} className="-mt-12 text-[clamp(3.5rem,1.8rem+5vw,7rem)] leading-[0.88] tracking-[-0.035em] sm:-mt-16 lg:-mt-24 rtl:leading-[1.2] rtl:tracking-normal" />
        <ChapterRule {...props} className="mt-8" />
      </header>
      <div className="lg:col-span-7 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:self-center">
        <Frame project={project} sizes="(min-width: 1024px) 55vw, 100vw" glow="start-[-10%] top-[10%] size-[28rem] bg-emerald/[0.14]" />
      </div>
      <Reveal className="lg:col-span-4 lg:col-start-8 lg:row-start-2 lg:pt-8">
        <p className="text-[1.0625rem] leading-[1.7] text-fg/80">{project.tagline[locale]}</p>
        <p className="mt-3 text-sm leading-[1.7]">{project.role[locale]}</p>
        <div className="mt-8 flex flex-col gap-6">
          <StackLine tags={project.tags} />
          <CaseLink label={t("viewCase")} />
        </div>
      </Reveal>
    </Link>
  );
}

/**
 * Chapter 03 — the title runs wide across the top, the numeral hangs at the far end and settles
 * onto the top edge of the product frame; the text sits in a narrow column along a gold spine.
 */
function SpineChapter(props: ChapterProps) {
  const { project, index, t, locale } = props;
  return (
    <Link href={`/projects/${project.slug}`} className="group relative grid gap-y-10 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-0">
      <Numeral
        value={indexOf(index, locale)}
        size="text-[clamp(8.5rem,4rem+15vw,17rem)]"
        className="relative z-10 lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:self-end lg:justify-self-end lg:translate-y-[38%]"
      />
      <header className="-mt-6 sm:-mt-10 lg:col-span-8 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:self-end lg:pb-14">
        <ChapterRule {...props} className="max-w-xl" />
        <Title project={project} className="mt-8 text-[clamp(3.5rem,1.6rem+6vw,8.5rem)] leading-[0.86] tracking-[-0.04em] rtl:leading-[1.2] rtl:tracking-normal" />
      </header>
      <div className="lg:col-span-8 lg:col-start-5 lg:row-start-2">
        <Frame project={project} sizes="(min-width: 1024px) 62vw, 100vw" glow="end-[-8%] bottom-[-10%] size-[30rem] bg-cool/[0.08]" />
      </div>
      <Reveal className="border-s border-gold/30 ps-6 lg:col-span-3 lg:col-start-1 lg:row-start-2 lg:mt-24 lg:self-start lg:ps-8">
        <p className="text-[1.0625rem] leading-[1.7] text-fg/80">{project.tagline[locale]}</p>
        <p className="mt-3 text-sm leading-[1.7]">{project.role[locale]}</p>
        <div className="mt-8 flex flex-col gap-6">
          <StackLine tags={project.tags} />
          <CaseLink label={t("viewCase")} />
        </div>
      </Reveal>
    </Link>
  );
}

/**
 * Chapter 04 — a statement spread: the title at full measure with its numeral set against it,
 * and an opaque brief panel laid over the corner of the product frame.
 */
function StatementChapter(props: ChapterProps) {
  const { project, index, t, locale } = props;
  return (
    <Link href={`/projects/${project.slug}`} className="group relative block">
      <ChapterRule {...props} />
      <div className="mt-10 flex items-start justify-between gap-6">
        <Title project={project} className="min-w-0 text-[clamp(3.5rem,1.4rem+7.5vw,10rem)] leading-[0.86] tracking-[-0.045em] [overflow-wrap:anywhere] rtl:leading-[1.2] rtl:tracking-normal" />
        <Numeral value={indexOf(index, locale)} size="text-[clamp(5rem,2.5rem+8vw,11rem)]" drift={36} className="shrink-0 -mt-2" />
      </div>
      <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-0">
        <div className="lg:col-span-8 lg:col-start-1 lg:row-start-1">
          <Frame project={project} sizes="(min-width: 1024px) 62vw, 100vw" glow="start-[20%] top-[20%] size-[30rem] bg-emerald/[0.12]" />
        </div>
        <Reveal
          delay={0.15}
          className="relative z-10 lg:col-span-4 lg:col-start-8 lg:row-start-1 lg:-ms-6 lg:self-end lg:rounded-card lg:border lg:border-line-strong lg:bg-surface/95 lg:p-10 lg:shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)] lg:backdrop-blur-md"
        >
          <p className="text-[1.0625rem] leading-[1.7] text-fg/80">{project.tagline[locale]}</p>
          <Spec {...props} className="mt-8" />
          <div className="mt-8 flex flex-col gap-6">
            <StackLine tags={project.tags} />
            <CaseLink label={t("viewCase")} />
          </div>
        </Reveal>
      </div>
    </Link>
  );
}

/** Chapters 05–06 — an offset pair; each numeral rests on the top edge of its frame. */
function PairChapter(props: ChapterProps) {
  const { project, index, t, locale } = props;
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div className="relative">
        <Frame project={project} sizes="(min-width: 1024px) 45vw, 100vw" />
        <Numeral
          value={indexOf(index, locale)}
          size="text-[clamp(6.5rem,4rem+7vw,10.5rem)]"
          drift={22}
          className="absolute end-5 top-0 z-10 -translate-y-[58%]"
        />
      </div>
      <ChapterRule {...props} className="mt-10" />
      <Title project={project} className="mt-6 text-[clamp(2.75rem,1.7rem+3.2vw,5rem)] leading-[0.92] tracking-[-0.03em] rtl:leading-[1.25] rtl:tracking-normal" />
      <Reveal className="mt-6">
        <p className="max-w-md leading-[1.7] text-fg/80">{project.tagline[locale]}</p>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
          <StackLine tags={project.tags} />
          <CaseLink label={t("viewCase")} />
        </div>
      </Reveal>
    </Link>
  );
}

/** Chapters 02–04 cycle through three distinct spreads so no two neighbours share a composition. */
const middleChapters = [OverlapChapter, SpineChapter, StatementChapter];

export async function FeaturedProjects() {
  const [t, locale] = await Promise.all([getTranslations("projects"), getLocale() as Promise<Locale>]);
  const [cover, ...rest] = featuredProjects;
  const middle = rest.slice(0, 3);
  const pair = rest.slice(3);

  const viewAll = (
    <ButtonLink href="/projects" variant="secondary">
      {t("viewAll")}
    </ButtonLink>
  );

  return (
    <Section id="work" labelledBy="work-title" wide scene="warm" className="overflow-x-clip">
      <div aria-hidden className="light-pool start-[-10%] top-[8%] -z-10 size-[40rem] bg-emerald/[0.12]" />
      <SectionHeading id="work-title" index={localizeDigits("01", locale)} eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} action={viewAll} />

      <ol className="flex flex-col gap-32 md:gap-48">
        {cover && (
          <li>
            <CoverChapter project={cover} index={0} t={t} locale={locale} />
          </li>
        )}
        {middle.map((project, i) => {
          const Chapter = middleChapters[i % middleChapters.length];
          return (
            <li key={project.slug}>
              <Chapter project={project} index={i + 1} t={t} locale={locale} />
            </li>
          );
        })}
        {pair.length > 0 && (
          <li>
            <ol className="grid gap-32 pt-16 md:grid-cols-2 md:gap-10 lg:gap-16">
              {pair.map((project, i) => (
                <li key={project.slug} className={cn(i % 2 === 1 && "md:mt-48")}>
                  <PairChapter project={project} index={i + 4} t={t} locale={locale} />
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
