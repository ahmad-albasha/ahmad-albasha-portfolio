import type { Locale } from "@/i18n/routing";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { absoluteUrl } from "@/lib/seo";

/** Person + ProfessionalService structured data, rendered once per page in the locale layout. */
export function JsonLd({ locale }: { locale: Locale }) {
  const personId = `${site.url}/#person`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: site.name[locale],
        alternateName: site.name[locale === "en" ? "ar" : "en"],
        jobTitle: site.role[locale],
        url: absoluteUrl(locale),
        image: `${site.url}${site.portrait}`,
        email: `mailto:${site.contact.email}`,
        sameAs: Object.values(site.socials),
        knowsLanguage: ["en", "ar"],
        knowsAbout: ["Artificial Intelligence", "Retrieval-Augmented Generation", "Machine Learning", "Web Development", "Mobile App Development", "Flutter", "Next.js"],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${site.url}/#service`,
        name: `${site.name[locale]} — ${site.role[locale]}`,
        url: absoluteUrl(locale),
        founder: { "@id": personId },
        areaServed: site.areaServed,
        availableLanguage: ["English", "Arabic"],
        email: site.contact.email,
        telephone: `+${site.contact.whatsapp}`,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title[locale], description: s.description[locale] },
          })),
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here; "<" is escaped to avoid closing the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }}
    />
  );
}
