import { site } from "@/data/site";

type NavLink = { href: string; key: "projects" | "services" | "about" | "blog" };

/** Primary navigation. The blog appears only when enabled in data/site.ts. */
export const navLinks: NavLink[] = [
  { href: "/projects", key: "projects" },
  { href: "/services", key: "services" },
  { href: "/about", key: "about" },
  ...(site.features.blog ? [{ href: "/blog", key: "blog" } satisfies NavLink] : []),
];
