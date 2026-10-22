/**
 * Blog index. Each entry maps to /content/blog/<slug>.mdx.
 * The blog stays hidden from navigation until `site.features.blog` is true.
 */
export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO date
}

export const posts: PostMeta[] = [
  {
    slug: "hello-world",
    title: "Hello, world",
    description: "The first post — a template showing how MDX posts work on this site.",
    date: "2026-10-01",
  },
];
