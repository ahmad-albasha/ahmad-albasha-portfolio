import { Mail } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { BrandIcon, type Brand } from "@/components/icons/BrandIcons";
import { site, whatsappHref } from "@/data/site";
import { cn } from "@/lib/cn";

/** WhatsApp first and prominent (preferred by Gulf clients), then smaller icon links. */
export async function ContactChannels({ className }: { className?: string }) {
  const [t, locale] = await Promise.all([getTranslations("channels"), getLocale()]);

  type Channel = { key: Brand | "email"; href: string; label: string };
  const channels: Channel[] = [
    { key: "email", href: `mailto:${site.contact.email}`, label: t("email") },
    { key: "linkedin", href: site.socials.linkedin, label: t("linkedin") },
    { key: "instagram", href: site.socials.instagram, label: t("instagram") },
    { key: "facebook", href: site.socials.facebook, label: t("facebook") },
    { key: "github", href: site.socials.github, label: t("github") },
    // Profiles still set to the "your-handle" placeholder in data/site.ts are hidden instead of linking nowhere.
  ];
  const secondary = channels.filter(({ href }) => !href.includes("your-handle"));

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <a
        href={whatsappHref(site.contact.whatsappMessage[locale])}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex h-12 items-center gap-3 rounded-full border border-gold/40 bg-gold/[0.06] ps-4 pe-5 text-sm text-fg transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:shadow-glow-sm"
      >
        <BrandIcon name="whatsapp" className="size-5 text-gold" />
        <span className="font-medium">{t("whatsapp")}</span>
        <span className="font-mono text-micro text-muted transition-colors group-hover:text-gold-soft">{t("whatsappHint")}</span>
      </a>

      <ul className="flex items-center gap-2">
        {secondary.map(({ key, href, label }) => (
          <li key={key}>
            <a
              href={href}
              aria-label={label}
              title={label}
              {...(key === "email" ? {} : { target: "_blank", rel: "noopener noreferrer" })}
              className="grid size-12 place-items-center rounded-full border border-line text-muted transition-all duration-300 hover:border-gold/50 hover:text-gold"
            >
              {key === "email" ? <Mail className="size-4" aria-hidden /> : <BrandIcon name={key} />}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
