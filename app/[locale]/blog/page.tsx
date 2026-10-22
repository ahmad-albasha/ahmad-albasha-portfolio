import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { posts } from "@/data/posts";
import { site } from "@/data/site";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/blog">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({ locale, path: "/blog", title: t("blogTitle"), description: t("blogDescription"), noIndex: !site.features.blog });
}

export default async function BlogPage({ params }: PageProps<"/[locale]/blog">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("blog");
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <PageHeader eyebrow={t("title")} title={t("title")} intro={t("intro")} />
      <Container className="pb-section">
        <ul className="border-t border-line">
          {sorted.map((post) => (
            <li key={post.slug} className="border-b border-line">
              <Link href={`/blog/${post.slug}`} className="group grid gap-2 py-8 md:grid-cols-[10rem_1fr_auto] md:items-center md:gap-8">
                <time dateTime={post.date} className="font-mono text-xs text-muted">
                  {new Date(post.date).toLocaleDateString(locale, { year: "numeric", month: "short", day: "numeric" })}
                </time>
                <span>
                  <span className="block font-display text-2xl text-fg transition-colors group-hover:text-gold-soft">{post.title}</span>
                  <span className="mt-1 block text-sm">{post.description}</span>
                </span>
                <ArrowRight aria-hidden className="flip-rtl hidden size-5 text-gold transition-transform duration-300 group-hover:translate-x-1 md:block rtl:group-hover:-translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
