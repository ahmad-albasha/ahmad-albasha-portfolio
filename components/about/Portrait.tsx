import Image from "next/image";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

/**
 * Portrait frame. Uses `site.portrait` unless another `src` is passed;
 * with no photo at all a monogram placeholder is displayed.
 */
export function Portrait({ src = site.portrait, alt, className, priority }: { src?: string; alt: string; className?: string; priority?: boolean }) {
  return (
    <div className={cn("relative aspect-[4/5] overflow-hidden rounded-card border border-line bg-surface", className)}>
      {src ? (
        <Image src={src} alt={alt} fill priority={priority} sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover object-[50%_20%]" />
      ) : (
        <div aria-hidden className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_30%,rgb(201_169_110/0.18),transparent_70%)]" />
          <span dir="ltr" className="absolute inset-0 grid place-items-center font-[family-name:var(--font-cormorant)] text-[7rem] leading-none text-gold/70 italic">
            AA
          </span>
        </div>
      )}
      <span aria-hidden className="pointer-events-none absolute inset-3 rounded-[calc(var(--radius-card)-0.5rem)] border border-gold/20" />
    </div>
  );
}
