import type { MetadataRoute } from "next";
import { posts } from "@/data/posts";
import { featuredProjects } from "@/data/projects";
import { site } from "@/data/site";
import { routing } from "@/i18n/routing";
import { absoluteUrl, languageAlternates } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/projects",
    "/services",
    "/about",
    "/book",
    ...featuredProjects.map((p) => `/projects/${p.slug}`),
    ...(site.features.blog ? ["/blog", ...posts.map((p) => `/blog/${p.slug}`)] : []),
  ];

  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(locale, path),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path === "/book" ? 0.9 : 0.7,
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
