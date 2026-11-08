import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { site } from "@/data/site";

export function Logo({ onClick }: { onClick?: () => void }) {
  const locale = useLocale();
  return (
    <Link href="/" onClick={onClick} className="group flex items-center gap-3" aria-label={site.name[locale]}>
      <span
        aria-hidden
        className="relative size-10 shrink-0 overflow-hidden rounded-full border border-gold/40 bg-surface-2 transition-all duration-300 group-hover:border-gold group-hover:shadow-glow-sm"
      >
        <Image src={site.portrait} alt="" fill sizes="40px" className="object-cover" />
      </span>
      <span className="hidden text-[0.95rem] font-medium text-fg sm:inline">{site.name[locale]}</span>
    </Link>
  );
}
