import { setRequestLocale } from "next-intl/server";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { Testimonials } from "@/components/home/Testimonials";
import { TrustStrip } from "@/components/home/TrustStrip";
import type { Locale } from "@/i18n/routing";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <>
      <Hero />
      <TrustStrip />
      <FeaturedProjects />
      <ServicesSection />
      <ProcessSection />
      <Testimonials />
      <AboutTeaser />
      <FinalCta />
    </>
  );
}
