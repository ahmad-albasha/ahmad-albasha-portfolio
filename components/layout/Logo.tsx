import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { site } from "@/data/site";

export function Logo({ onClick }: { onClick?: () => void }) {
  const locale = useLocale();
  return (
    <Link href="/" onClick={onClick} className="group flex items-center gap-3" aria-label={site.name[locale]}>
      <span
        aria-hidden
        dir="ltr"
        className="grid size-10 place-items-center rounded-full border border-gold/40 font-[family-name:var(--font-cormorant)] text-lg font-semibold tracking-tight text-gold transition-all duration-300 group-hover:border-gold group-hover:shadow-glow-sm"
      >
        AA
      </span>
      <span className="hidden text-[0.95rem] font-medium text-fg sm:inline">{site.name[locale]}</span>
    </Link>
  );
}
