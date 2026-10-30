import { site } from "@/data/site";

type NavLink = { href: string; key: "projects" | "services" | "about" | "gallery" | "blog" };

/** Primary navigation. The blog appears only when enabled in data/site.ts. */
export const navLinks: NavLink[] = [
  { href: "/projects", key: "projects" },
  { href: "/services", key: "services" },
  { href: "/about", key: "about" },
  { href: "/gallery", key: "gallery" },
  ...(site.features.blog ? [{ href: "/blog", key: "blog" } satisfies NavLink] : []),
];
