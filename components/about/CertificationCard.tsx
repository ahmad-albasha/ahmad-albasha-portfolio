import { Award, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Tag } from "@/components/ui/Tag";
import type { Certification } from "@/data/certifications";
import { monthYear } from "@/lib/i18n";

/** Certificate preview, issuer, date and links to the full file and the issuer's verification page. */
export function CertificationCard({ certification: c }: { certification: Certification }) {
  const t = useTranslations("about.certifications");
  const locale = useLocale();
  const full = c.file ?? c.image;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-line surface-card transition-all duration-500 ease-luxe hover:-translate-y-1 hover:border-gold/30 hover:shadow-glow">
      <div className="relative aspect-[4/3] overflow-hidden border-b border-line bg-surface-2">
        {c.image ? (
          <a href={full} target="_blank" rel="noopener noreferrer" aria-label={t("viewCertificate", { title: c.title })} className="absolute inset-0">
            <Image
              src={c.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-contain p-4 transition-transform duration-[900ms] ease-luxe group-hover:scale-[1.03]"
            />
          </a>
        ) : (
          <div aria-hidden className="flex h-full items-center justify-center bg-[radial-gradient(ellipse_60%_70%_at_50%_40%,rgb(201_169_110/0.16),transparent_70%)]">
            <Award className="size-14 text-gold/70" strokeWidth={1.25} />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-label uppercase text-muted">
          <span dir="ltr">{c.issuer}</span>
          {c.issued && <> · {monthYear(c.issued, locale)}</>}
        </p>
        <h3 dir="ltr" className="mt-3 text-start font-display text-xl leading-snug rtl:text-end">
          {c.title}
        </h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {c.skills.map((skill) => (
            <li key={skill}>
              <Tag>{skill}</Tag>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-6 text-sm text-gold">
          {full && (
            <a href={full} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:underline">
              {t("view")}
              <ArrowUpRight aria-hidden className="flip-rtl size-4" />
            </a>
          )}
          {c.credentialUrl && (
            <a href={c.credentialUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:underline">
              {t("verify")}
              <ArrowUpRight aria-hidden className="flip-rtl size-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
