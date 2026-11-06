import { GraduationCap } from "lucide-react";
import { useLocale } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import type { Education } from "@/data/education";
import type { Locale } from "@/i18n/routing";
import { monthYear } from "@/lib/i18n";

/** Degrees on a vertical line, newest first, each with its dates, field, notes and skills. */
export function EducationTimeline({ items }: { items: Education[] }) {
  const locale = useLocale() as Locale;

  return (
    <ol className="relative mt-12 border-s border-line ps-8 md:ps-12">
      {items.map((e) => (
        <li key={`${e.abbreviation}-${e.start}`} className="relative pb-10 last:pb-0">
          <span
            aria-hidden
            className="absolute -start-[calc(2rem+1.125rem)] top-6 flex size-9 items-center justify-center rounded-full border border-gold/40 bg-ink text-gold md:-start-[calc(3rem+1.125rem)]"
          >
            <GraduationCap className="size-4" strokeWidth={1.5} />
          </span>
          <Reveal className="rounded-card border border-line surface-card p-6 transition-all duration-500 ease-luxe hover:border-gold/30 hover:shadow-glow md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-label uppercase text-muted">
                {monthYear(e.start, locale)} – {monthYear(e.end, locale)}
              </p>
              <span dir="ltr" className="rounded-full border border-gold/40 px-3 py-1 font-mono text-label text-gold">
                {e.abbreviation}
              </span>
            </div>
            <h3 className="mt-4 font-display text-2xl leading-snug">{e.degree[locale]}</h3>
            <p className="mt-1 text-fg/90">{e.field[locale]}</p>
            <p className="mt-3 text-sm text-gold">{e.school[locale]}</p>
            {e.description && <p className="mt-5 max-w-3xl leading-relaxed">{e.description[locale]}</p>}
            <ul className="mt-6 flex flex-wrap gap-2">
              {e.skills.map((skill) => (
                <li key={skill}>
                  <Tag>{skill}</Tag>
                </li>
              ))}
            </ul>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
