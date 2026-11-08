import Image from "next/image";
import { ScrollZoom } from "@/components/ui/Cinematic";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

/**
 * Portrait frame. Uses `site.portrait` unless another `src` is passed;
 * with no photo at all a monogram placeholder is displayed.
 * `shape="arch"` is the editorial frame: a round-topped window with an inner champagne hairline,
 * lit from behind by an emerald glow.
 */
export function Portrait({
  src = site.portrait,
  alt,
  className,
  priority,
  shape = "rect",
}: {
  src?: string;
  alt: string;
  className?: string;
  priority?: boolean;
  shape?: "rect" | "arch";
}) {
  const arch = shape === "arch";
  return (
    <div className={cn("relative isolate", className)}>
      {arch && (
        <>
          <div aria-hidden className="light-pool inset-x-[-15%] top-[5%] bottom-[25%] -z-10 bg-emerald/30" />
          <svg aria-hidden viewBox="0 0 400 400" className="animate-spin-slow absolute start-1/2 top-[-9%] -z-10 w-[128%] -translate-x-1/2 rtl:translate-x-1/2" fill="none">
            <circle cx="200" cy="200" r="196" stroke="rgb(201 169 110 / 0.35)" strokeWidth="0.6" strokeDasharray="1 6" />
            <circle cx="200" cy="4" r="3" fill="#c9a96e" />
            <circle cx="396" cy="200" r="2" fill="#7fa697" />
          </svg>
        </>
      )}
      <div
        className={cn(
          "relative aspect-[4/5] overflow-hidden border border-line surface-card",
          arch ? "rounded-t-[999px] rounded-b-card" : "rounded-card",
        )}
      >
        {src ? (
          arch ? (
            <ScrollZoom>
              <Image
                src={src}
                alt={alt}
                fill
                priority={priority}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-[50%_20%] brightness-[0.94] contrast-[1.04] saturate-[0.9]"
              />
            </ScrollZoom>
          ) : (
            <Image src={src} alt={alt} fill priority={priority} sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover object-[50%_20%]" />
          )
        ) : (
          <div aria-hidden className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_30%,rgb(201_169_110/0.18),transparent_70%)]" />
            <span dir="ltr" className="absolute inset-0 grid place-items-center font-[family-name:var(--font-cormorant)] text-[7rem] leading-none text-gold/70 italic">
              AA
            </span>
          </div>
        )}
        {/*
         * Cinematic grade, kept light so the person is never altered: a warm key from above, a faint
         * emerald rim from the far side (soft-light, so skin tones stay natural), a soft vignette and a
         * dark floor the caption can sit on.
         */}
        {arch && (
          <>
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgb(201_169_110/0.08),transparent_35%,transparent_62%,rgb(16_15_13/0.6))]" />
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_55%_70%_at_100%_45%,rgb(82_125_112/0.35),transparent_70%)] mix-blend-soft-light rtl:bg-[radial-gradient(ellipse_55%_70%_at_0%_45%,rgb(82_125_112/0.35),transparent_70%)]" />
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_40%,transparent_60%,rgb(0_0_0/0.35))]" />
          </>
        )}
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-3 border border-gold/25",
            arch ? "rounded-t-[999px] rounded-b-[calc(var(--radius-card)-0.5rem)]" : "rounded-[calc(var(--radius-card)-0.5rem)]",
          )}
        />
      </div>
    </div>
  );
}
