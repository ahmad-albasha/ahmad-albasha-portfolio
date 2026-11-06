import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/cn";

/** RGB triplets. "gold" leads with champagne; "cool" leads with muted emerald and a dusty-blue echo. */
const accents = {
  gold: { main: "201 169 110", alt: "82 125 112" },
  cool: { main: "127 166 151", alt: "117 137 181" },
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
  framed = false,
}: {
  project: Pick<Project, "title" | "image" | "accent" | "categories">;
  sizes: string;
  priority?: boolean;
  className?: string;
  /**
   * Cards: present the screenshot as a product window resting on a tinted stage, anchored to the top
   * of the page so every project reads the same regardless of the source image's proportions.
   */
  framed?: boolean;
}) {
  const t = useTranslations("projects.filters");
  const zoom = "transition-transform duration-[900ms] ease-luxe group-hover:scale-[1.03]";

  if (project.image && framed) {
    const { main, alt } = accents[project.accent];
    return (
      <div className={cn("relative isolate overflow-hidden bg-surface-2", className)}>
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background: `radial-gradient(ellipse 70% 80% at 50% 0%, rgb(${main} / 0.16), transparent 70%), radial-gradient(ellipse 60% 60% at 100% 100%, rgb(${alt} / 0.1), transparent 70%)`,
          }}
        />
        <div
          className={cn(
            "absolute inset-x-[6%] top-[9%] -bottom-px overflow-hidden rounded-t-control border border-b-0 border-line-strong bg-ink",
            "shadow-[0_-12px_40px_-16px_rgb(0_0_0/0.7)] transition-transform duration-[900ms] ease-luxe group-hover:-translate-y-1.5",
          )}
        >
          <Image src={project.image} alt="" fill sizes={sizes} priority={priority} className="object-cover object-top" />
        </div>
      </div>
    );
  }

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
    <div aria-hidden className={cn("@container relative overflow-hidden bg-[linear-gradient(180deg,#1d1b17,#12110f)]", className)}>
      <div
        className={cn("absolute inset-0", zoom)}
        style={{
          background: `radial-gradient(ellipse 60% 70% at ${layout.glow}, rgb(${main} / 0.22), transparent 70%), radial-gradient(ellipse 50% 60% at 50% 120%, rgb(${alt} / 0.12), transparent 70%)`,
        }}
      >
        {/* Orbital title card: concentric rings, a tilted orbit and an instrument arc */}
        <svg viewBox="0 0 400 400" className={cn("absolute h-[150%] opacity-80", layout.rings)} fill="none">
          {[60, 110, 160, 210].map((r) => (
            <circle key={r} cx="200" cy="200" r={r} stroke={`rgb(${main} / 0.16)`} strokeWidth="0.75" />
          ))}
          <ellipse cx="200" cy="200" rx="190" ry="60" transform="rotate(-24 200 200)" stroke={`rgb(${main} / 0.35)`} strokeWidth="0.75" />
          {Array.from({ length: 36 }, (_, i) => {
            const a = ((i * 5 - 120) * Math.PI) / 180;
            const r2 = i % 6 === 0 ? 222 : 228;
            return (
              <line
                key={i}
                x1={(200 + 234 * Math.cos(a)).toFixed(1)}
                y1={(200 + 234 * Math.sin(a)).toFixed(1)}
                x2={(200 + r2 * Math.cos(a)).toFixed(1)}
                y2={(200 + r2 * Math.sin(a)).toFixed(1)}
                stroke={`rgb(${main} / ${i % 6 === 0 ? 0.6 : 0.25})`}
                strokeWidth="0.75"
              />
            );
          })}
          <circle cx="200" cy="200" r="5" fill={`rgb(${main})`} />
          <circle cx="373" cy="123" r="3" fill={`rgb(${main})`} />
          <circle cx="40" cy="268" r="2.5" fill={`rgb(${alt})`} />
        </svg>
      </div>
      <span
        dir="ltr"
        className="absolute inset-x-[7%] bottom-[10%] font-[family-name:var(--font-cormorant)] text-[clamp(2.25rem,14cqi,6.5rem)] leading-[0.9] font-light break-words text-fg/90 italic"
      >
        {project.title}
      </span>
      <span className="absolute top-[8%] start-[7%] font-mono text-micro text-fg/55 uppercase">
        {project.categories.map((c) => t(c)).join(" · ")}
      </span>
    </div>
  );
}
