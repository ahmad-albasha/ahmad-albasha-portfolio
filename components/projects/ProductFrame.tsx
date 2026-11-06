import Image from "next/image";
import type { CSSProperties } from "react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/cn";
import { ProjectVisual } from "./ProjectVisual";

/** Stage lighting per accent, as RGB triplets: a key light from above and a fill light from the far corner. */
const stageLight: Record<Project["accent"], CSSProperties> = {
  gold: { "--stage-a": "201 169 110", "--stage-b": "82 125 112" } as CSSProperties,
  cool: { "--stage-a": "127 166 151", "--stage-b": "117 137 181" } as CSSProperties,
};

function hostLabel(project: Pick<Project, "liveUrl" | "slug">) {
  if (project.liveUrl) {
    try {
      return new URL(project.liveUrl).host.replace(/^www\./, "");
    } catch {
      /* fall through */
    }
  }
  return `${project.slug}.app`;
}

/**
 * Presents a project's real screenshot as a product window on a lit stage. On hover the window lifts
 * and the screenshot slowly scrolls, previewing more of the product. Projects without a screenshot
 * get their branded title-card artwork instead (never stock imagery).
 */
export function ProductFrame({
  project,
  sizes,
  priority,
  className,
  aspect = "aspect-[16/10]",
}: {
  project: Pick<Project, "title" | "image" | "accent" | "categories" | "liveUrl" | "slug">;
  sizes: string;
  priority?: boolean;
  className?: string;
  aspect?: string;
}) {
  return (
    <div style={stageLight[project.accent]} className={cn("stage relative isolate overflow-hidden rounded-card border border-line", className)}>
      {/* Fine top highlight and a horizon line, like light catching the edge of a plinth */}
      <span aria-hidden className="hairline absolute inset-x-0 top-0 opacity-70" />
      {project.image ? (
        <div className="px-[5%] pt-[6%]">
          <div
            dir="ltr"
            className={cn(
              "overflow-hidden rounded-t-[0.85rem] border border-b-0 border-line-strong bg-ink",
              "shadow-[0_-20px_60px_-20px_rgb(0_0_0/0.8),0_0_0_1px_rgb(0_0_0/0.4)] transition-transform duration-[900ms] ease-luxe group-hover:-translate-y-2",
            )}
          >
            <div aria-hidden className="flex h-7 items-center gap-1.5 border-b border-line bg-surface px-3 md:h-8">
              <span className="size-2 rounded-full bg-fg/15" />
              <span className="size-2 rounded-full bg-fg/15" />
              <span className="size-2 rounded-full bg-fg/15" />
              <span className="mx-auto rounded-full bg-ink/70 px-3 py-0.5 font-mono text-[0.625rem] text-muted/80">{hostLabel(project)}</span>
              <span className="w-8" />
            </div>
            <div className={cn("relative", aspect)}>
              <Image
                src={project.image}
                alt=""
                fill
                sizes={sizes}
                priority={priority}
                className="object-cover object-top transition-[object-position] duration-[2400ms] ease-in-out group-hover:object-[50%_40%]"
              />
            </div>
          </div>
        </div>
      ) : (
        <ProjectVisual project={project} sizes={sizes} className={cn("rounded-none", aspect)} />
      )}
    </div>
  );
}
