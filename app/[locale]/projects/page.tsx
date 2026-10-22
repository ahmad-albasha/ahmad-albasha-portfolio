import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FinalCta } from "@/components/home/FinalCta";
import { ProjectsExplorer } from "@/components/projects/ProjectsExplorer";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/projects">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({ locale, path: "/projects", title: t("projectsTitle"), description: t("projectsDescription") });
}

export default async function ProjectsPage({ params }: PageProps<"/[locale]/projects">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("projects");

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("pageTitle")} intro={t("pageIntro")} />
      <Container>
        <ProjectsExplorer />
      </Container>
      <FinalCta />
    </>
  );
}
