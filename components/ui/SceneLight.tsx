"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * One fixed layer of light per environment. As sections marked `data-scene` cross the middle of the
 * viewport, the page slowly cross-fades between them, so moving from the champagne-lit work to the
 * emerald process feels like walking from one room into the next rather than cutting between blocks.
 * Opacity-only (composited); with reduced motion the global CSS rule makes the change instant.
 */
const scenes = {
  warm: "bg-[radial-gradient(ellipse_70%_55%_at_85%_15%,rgb(201_169_110/0.075),transparent_70%),radial-gradient(ellipse_55%_50%_at_5%_85%,rgb(82_125_112/0.07),transparent_70%)]",
  cool: "bg-[radial-gradient(ellipse_60%_55%_at_95%_45%,rgb(117_137_181/0.07),transparent_70%),radial-gradient(ellipse_50%_45%_at_10%_20%,rgb(201_169_110/0.04),transparent_70%)]",
  emerald:
    "bg-[radial-gradient(ellipse_75%_60%_at_25%_55%,rgb(20_37_31/0.9),transparent_75%),radial-gradient(ellipse_50%_45%_at_90%_80%,rgb(82_125_112/0.12),transparent_70%)]",
  dusk: "bg-[radial-gradient(ellipse_55%_50%_at_80%_30%,rgb(82_125_112/0.12),transparent_70%),radial-gradient(ellipse_50%_45%_at_15%_70%,rgb(201_169_110/0.06),transparent_70%)]",
} as const;

type Scene = keyof typeof scenes;

export function SceneLight() {
  const [active, setActive] = useState<Scene | null>(null);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
    if (targets.length === 0) return;
    // A thin band across the middle of the viewport decides which environment is "current".
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.getAttribute("data-scene") as Scene);
          else if (entry.boundingClientRect.top > 0 && entry.target === targets[0]) setActive(null);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20">
      {(Object.keys(scenes) as Scene[]).map((key) => (
        <div
          key={key}
          className={cn("absolute inset-0 transition-opacity duration-[1600ms] ease-luxe", scenes[key], active === key ? "opacity-100" : "opacity-0")}
        />
      ))}
    </div>
  );
}
