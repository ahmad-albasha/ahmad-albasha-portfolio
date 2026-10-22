import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FinalCta } from "@/components/home/FinalCta";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { featuredProjects, getFeaturedProject } from "@/data/projects";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { localizeDigits } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type Props = PageProps<"/[locale]/projects/[slug]">;

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => featuredProjects.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getFeaturedProject(slug);
  if (!project) return {};
  return pageMetadata({
    locale: locale as Locale,
    path: `/projects/${slug}`,
    title: project.title,
    description: project.summary[locale as Locale],
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug, locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);
  const project = getFeaturedProject(slug);
  if (!project) notFound();

  const [t, filters] = await Promise.all([getTranslations("projectDetail"), getTranslations("projects.filters")]);
  const index = featuredProjects.indexOf(project);
  const next = featuredProjects[(index + 1) % featuredProjects.length];

  const story = [
    { label: t("problem"), text: project.problem[locale] },
    { label: t("solution"), text: project.solution[locale] },
    { label: t("result"), text: project.result[locale] },
  ];

  return (
    <article>
      <header className="relative isolate overflow-hidden pt-32 md:pt-40">
        <div aria-hidden className="absolute -top-32 end-0 -z-10 size-[32rem] rounded-full bg-gold/[0.05] blur-[120px]" />
        <Container className="animate-fade-up">
          <Link href="/projects" className="group inline-flex items-center gap-2 text-sm transition-colors hover:text-gold">
            <ArrowLeft aria-hidden className="flip-rtl size-4 transition-transform duration-300 group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
            {t("back")}
          </Link>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <Eyebrow>{project.categories.map((c) => filters(c)).join(" / ")}</Eyebrow>
              <h1 className="mt-6 text-hero">{project.title}</h1>
              <p className="mt-6 max-w-2xl text-lead">{project.tagline[locale]}</p>
            </div>
            <dl className="grid grid-cols-2 gap-6 border-t border-line pt-6 text-sm lg:border-t-0 lg:border-s lg:ps-8 lg:pt-0">
              <div>
                <dt className="font-mono text-label uppercase text-muted">{t("role")}</dt>
                <dd className="mt-2 text-fg">{project.role[locale]}</dd>
              </div>
              <div>
                <dt className="font-mono text-label uppercase text-muted">{t("year")}</dt>
                <dd className="mt-2 text-fg">{localizeDigits(project.year, locale)}</dd>
              </div>
              {project.liveUrl && (
                <div className="col-span-2">
                  <ButtonLink href={project.liveUrl} external variant="secondary">
                    {t("live")}
                    <ArrowUpRight aria-hidden className="flip-rtl size-4" />
                  </ButtonLink>
                </div>
              )}
            </dl>
          </div>
        </Container>
        {/* The wide cover only earns its space with a real image; the abstract placeholder would just push the story down. */}
        {project.image ? (
          <Container className="mt-14">
            <ProjectVisual
              project={project}
              priority
              sizes="(min-width: 1216px) 1216px, 100vw"
              className="aspect-[16/9] rounded-card border border-line md:aspect-[21/9]"
            />
          </Container>
        ) : (
          <Container className="mt-14">
            <div aria-hidden className="hairline" />
          </Container>
        )}
      </header>

      <Container className="py-section">
        <div className="grid gap-16 lg:grid-cols-[1fr_20rem]">
          <div className="flex flex-col gap-14">
            {story.map(({ label, text }) => (
              <Reveal key={label} className="grid gap-4 md:grid-cols-[10rem_1fr] md:gap-10">
                <h2 className="font-mono text-label text-gold uppercase">{label}</h2>
                <p className="text-lead text-fg/85">{text}</p>
              </Reveal>
            ))}
          </div>

          <aside className="flex flex-col gap-10 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-card border border-line bg-surface p-7">
              <h2 className="font-mono text-label uppercase text-gold">{t("highlights")}</h2>
              <ul className="mt-5 flex flex-col gap-3 text-sm">
                {project.highlights[locale].map((h) => (
                  <li key={h} className="flex gap-3">
                    <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-gold" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-mono text-label uppercase text-gold">{t("tech")}</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li key={tag}>
                    <Tag>{tag}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {project.media.length > 0 && (
          <section aria-labelledby="media-title" className="mt-section">
            <h2 id="media-title" className="mb-8 font-mono text-label uppercase text-gold">
              {t("media")}
            </h2>
            <ul className="grid gap-6 md:grid-cols-2">
              {project.media.map((item) => (
                <li key={item.src}>
                  <figure>
                    <div className="relative aspect-[16/10] overflow-hidden rounded-card border border-line bg-surface">
                      <Image src={item.src} alt={item.alt[locale]} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                    </div>
                    {item.caption && <figcaption className="mt-3 text-sm text-muted">{item.caption[locale]}</figcaption>}
                  </figure>
                </li>
              ))}
            </ul>
          </section>
        )}

        <nav aria-label={t("next")} className="mt-section border-t border-line pt-10">
          <Link href={`/projects/${next.slug}`} className="group flex items-center justify-between gap-6">
            <span>
              <span className="block font-mono text-label uppercase text-muted">{t("next")}</span>
              <span className="mt-3 block font-display text-display text-fg transition-colors duration-300 group-hover:text-gold-soft">
                {next.title}
              </span>
            </span>
            <ArrowRight aria-hidden className="flip-rtl size-8 shrink-0 text-gold transition-transform duration-500 group-hover:translate-x-2 rtl:group-hover:-translate-x-2" />
          </Link>
        </nav>
      </Container>

      <FinalCta title={t("ctaTitle")} body={t("ctaBody")} />
    </article>
  );
}
