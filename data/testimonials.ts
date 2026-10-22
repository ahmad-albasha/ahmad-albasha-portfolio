import type { Localized } from "@/lib/i18n";

/**
 * Client testimonials. The section on the home page hides itself while this array is empty.
 * Example entry:
 * { quote: { en: "…", ar: "…" }, name: "Sara K.", role: { en: "Founder, Brand", ar: "مؤسسة، العلامة" } }
 */
export interface Testimonial {
  quote: Localized;
  name: string;
  role: Localized;
}

export const testimonials: Testimonial[] = [];
