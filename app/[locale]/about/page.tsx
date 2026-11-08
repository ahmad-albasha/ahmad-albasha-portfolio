import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CertificationCard } from "@/components/about/CertificationCard";
import { EducationTimeline } from "@/components/about/EducationTimeline";
import { Portrait } from "@/components/about/Portrait";
import { FinalCta } from "@/components/home/FinalCta";
import { SvgPathIcon } from "@/components/icons/BrandIcons";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { EditorialTitle, Eyebrow } from "@/components/ui/Section";
import { certifications } from "@/data/certifications";
import { education } from "@/data/education";
import { gallery } from "@/data/gallery";
import { site } from "@/data/site";
import { techStack } from "@/data/stack";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { stepNumber } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({ locale, path: "/about", title: t("aboutTitle"), description: t("aboutDescription") });
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const tg = await getTranslations("gallery");
  const galleryTeaser = ["06", "46", "70", "63", "49"].map((n) => gallery.find((p) => p.src.endsWith(`activity-${n}.jpg`))!);

  const values = [
    { title: t("values.clarityTitle"), body: t("values.clarity") },
    { title: t("values.qualityTitle"), body: t("values.quality") },
    { title: t("values.ownershipTitle"), body: t("values.ownership") },
  ];

  return (
    <>
      <section className="relative isolate overflow-hidden pt-36 pb-section md:pt-44">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="column-guides absolute inset-0 hidden md:block" />
          <div className="light-pool -top-32 end-0 size-[32rem] bg-gold/[0.06]" />
        </div>
        <Container className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <div className="animate-fade-up">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h1 className="mt-8 text-mega font-light">
              <EditorialTitle text={t("pageTitle")} />
            </h1>
            <p className="mt-8 text-lead text-fg/90">{t("pageLead")}</p>
            <div className="mt-10 flex flex-col gap-6 leading-relaxed">
              {(["story1", "story2", "story3", "story4", "story5"] as const).map((key) => (
                <p key={key}>{t(key)}</p>
              ))}
            </div>
            <p className="mt-10 font-mono text-label uppercase text-muted">{site.location[locale]}</p>
          </div>
          <Portrait alt={site.name[locale]} priority shape="arch" className="animate-fade-up mx-auto w-full max-w-sm [--delay:200ms] lg:sticky lg:top-28 lg:max-w-none lg:self-start" />
        </Container>
      </section>

      <section aria-labelledby="values-title" className="border-y border-line bg-surface/30 py-section">
        <Container>
          <Reveal>
            <h2 id="values-title" className="text-display">
              {t("valuesTitle")}
            </h2>
          </Reveal>
          <Stagger as="ul" className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <StaggerItem as="li" key={v.title} className="rounded-card border border-line surface-card p-8">
                <span className="font-mono text-label text-gold">{stepNumber(i, locale)}</span>
                <h3 className="mt-6 text-title">{v.title}</h3>
                <p className="mt-3 leading-relaxed">{v.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section id="education" aria-labelledby="education-title" className="py-section">
        <Container>
          <Reveal>
            <h2 id="education-title" className="text-display">
              {t("education.title")}
            </h2>
            <p className="mt-5 max-w-2xl text-lead">{t("education.intro")}</p>
          </Reveal>
          <EducationTimeline items={education} />
        </Container>
      </section>

      <section aria-labelledby="skills-title" className="border-t border-line py-section">
        <Container>
          <Reveal>
            <h2 id="skills-title" className="text-display">
              {t("skillsTitle")}
            </h2>
          </Reveal>
          <Stagger as="ul" className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {techStack.map((tech) => (
              <StaggerItem
                as="li"
                key={tech.name}
                className="flex items-center gap-3 rounded-control border border-line bg-surface px-4 py-3.5 text-sm text-fg/90"
              >
                <SvgPathIcon path={tech.path} className="size-4 shrink-0 text-gold" />
                {tech.name}
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section aria-labelledby="gallery-title" className="border-t border-line py-section">
        <Container>
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 id="gallery-title" className="text-display">
                {tg("teaserTitle")}
              </h2>
              <p className="mt-5 max-w-2xl text-lead">{tg("teaserIntro")}</p>
            </div>
            <Link href="/gallery" className="inline-flex items-center gap-1.5 text-sm text-gold hover:underline">
              {tg("teaserLink")}
              <ArrowUpRight aria-hidden className="flip-rtl size-4" />
            </Link>
          </Reveal>
          <Stagger as="ul" className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {galleryTeaser.map((photo, i) => (
              <StaggerItem as="li" key={photo.src} className={i === 0 ? "col-span-2 row-span-2" : undefined}>
                <Link
                  href="/gallery"
                  className="group relative block aspect-square h-full overflow-hidden rounded-control border border-line bg-surface-2 transition-all duration-500 ease-luxe hover:border-gold/40 hover:shadow-glow"
                >
                  <Image
                    src={photo.src}
                    alt={tg(`alt.${photo.category}`)}
                    fill
                    sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                    className="object-cover transition-transform duration-[900ms] ease-luxe group-hover:scale-[1.05]"
                  />
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section id="certifications" aria-labelledby="certifications-title" className="border-t border-line bg-surface/30 py-section">
        <Container>
          <Reveal>
            <h2 id="certifications-title" className="text-display">
              {t("certifications.title")}
            </h2>
            <p className="mt-5 max-w-2xl text-lead">{t("certifications.intro")}</p>
          </Reveal>
          <Stagger as="ul" className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((c) => (
              <StaggerItem as="li" key={c.title}>
                <CertificationCard certification={c} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
