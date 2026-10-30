import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { GalleryExplorer } from "@/components/gallery/GalleryExplorer";
import { FinalCta } from "@/components/home/FinalCta";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/gallery">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({ locale, path: "/gallery", title: t("galleryTitle"), description: t("galleryDescription") });
}

export default async function GalleryPage({ params }: PageProps<"/[locale]/gallery">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("gallery");

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("pageTitle")} intro={t("pageIntro")} />
      <Container>
        <GalleryExplorer />
      </Container>
      <FinalCta />
    </>
  );
}
