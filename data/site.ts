import type { Localized } from "@/lib/i18n";

/**
 * Global site settings. Edit names, contact channels and stats here.
 * Values marked "placeholder" must be replaced before launch.
 */

const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const site = {
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000")).replace(/\/$/, ""),

  name: { en: "Ahmad Albasha", ar: "أحمد الباشا" } satisfies Localized,
  role: { en: "AI-focused Software Engineer", ar: "مهندس برمجيات متخصص في الذكاء الاصطناعي" } satisfies Localized,
  location: { en: "Remote · Serving the Gulf & Europe", ar: "عن بُعد · أخدم الخليج وأوروبا" } satisfies Localized,
  /** Profile photo shown on the home and about pages and in structured data. */
  portrait: "/images/profile.jpg",
  areaServed: ["Saudi Arabia", "United Arab Emirates", "Qatar", "Kuwait", "Bahrain", "Oman", "Europe"],

  /** Cal.com link in the form "username/event-slug". Set NEXT_PUBLIC_CAL_LINK in your environment. */
  calLink: process.env.NEXT_PUBLIC_CAL_LINK ?? "",

  contact: {
    email: "ahmad-albasha09@hotmail.com",
    /** International format, digits only (no "+", spaces or dashes). */
    whatsapp: "96176488463",
    whatsappMessage: {
      en: "Hi Ahmad, I'd like to talk about a project.",
      ar: "مرحباً أحمد، أود التحدث معك بخصوص مشروع.",
    } satisfies Localized,
  },

  socials: {
    linkedin: "https://www.linkedin.com/in/ahmad-a-9a0373123",
    instagram: "https://www.instagram.com/albasha8949",
    facebook: "https://www.facebook.com/ahmad.albasha.353803",
    github: "https://github.com/ahmad-albasha",
  },

  /** Numbers shown in the trust strip under the hero. */
  stats: [
    { value: "15+", label: { en: "Projects delivered", ar: "مشروع منجز" } },
    { value: "4", label: { en: "Platforms: AI, web, mobile, hardware", ar: "مجالات: ذكاء اصطناعي، ويب، جوال، عتاد" } },
    { value: "2", label: { en: "Languages: English & Arabic", ar: "لغتان: العربية والإنجليزية" } },
  ] satisfies { value: string; label: Localized }[],

  features: {
    /** Flip to true to show the blog in the navigation and sitemap and allow indexing. */
    blog: false,
  },
} as const;

export function whatsappHref(message: string) {
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
