import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/cn";

const accents = {
  gold: { main: "201 169 110", alt: "125 166 200" },
  cool: { main: "125 166 200", alt: "201 169 110" },
};

/** Compositions for the placeholder, picked per project so cards without images don't all look the same. */
const layouts = [
  { glow: "78% 18%", rings: "-end-[12%] -top-[20%]" },
  { glow: "18% 22%", rings: "-start-[18%] -top-[28%]" },
  { glow: "75% 90%", rings: "-end-[8%] -bottom-[38%]" },
  { glow: "30% 85%", rings: "-start-[10%] -bottom-[34%]" },
];

function pickLayout(title: string) {
  const seed = [...title].reduce((n, c) => n + c.charCodeAt(0), 0);
  return layouts[seed % layouts.length];
}

/**
 * Project artwork: the real image when one is set in data/projects.ts,
 * otherwise an abstract placeholder in the site's palette.
 */
export function ProjectVisual({
  project,
  sizes,
  priority = false,
  className,
}: {
  project: Pick<Project, "title" | "image" | "accent" | "categories">;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const t = useTranslations("projects.filters");
  const zoom = "transition-transform duration-[900ms] ease-luxe group-hover:scale-[1.03]";

  if (project.image) {
    return (
      <div className={cn("relative overflow-hidden bg-surface-2", className)}>
        <Image src={project.image} alt="" fill sizes={sizes} priority={priority} className={cn("object-cover", zoom)} />
      </div>
    );
  }

  const { main, alt } = accents[project.accent];
  const layout = pickLayout(project.title);
  return (
    <div aria-hidden className={cn("@container relative overflow-hidden bg-surface-2", className)}>
      <div
        className={cn("absolute inset-0", zoom)}
        style={{
          background: `radial-gradient(ellipse 60% 70% at ${layout.glow}, rgb(${main} / 0.2), transparent 70%), radial-gradient(ellipse 50% 60% at 50% 120%, rgb(${alt} / 0.08), transparent 70%)`,
        }}
      >
        <svg viewBox="0 0 400 400" className={cn("absolute h-[140%] opacity-60", layout.rings)} fill="none">
          {[60, 110, 160, 210].map((r) => (
            <circle key={r} cx="200" cy="200" r={r} stroke={`rgb(${main} / 0.18)`} strokeWidth="0.75" />
          ))}
          <circle cx="200" cy="40" r="3" fill={`rgb(${main})`} />
          <circle cx="360" cy="200" r="2" fill={`rgb(${alt})`} />
        </svg>
      </div>
      <span dir="ltr" className="absolute inset-x-[7%] bottom-[12%] font-[family-name:var(--font-cormorant)] text-[clamp(1.75rem,10cqi,4rem)] leading-none break-words text-fg/90 italic">
        {project.title}
      </span>
      <span className="absolute top-[8%] start-[7%] font-mono text-micro text-fg/55 uppercase">
        {project.categories.map((c) => t(c)).join(" · ")}
      </span>
    </div>
  );
}
