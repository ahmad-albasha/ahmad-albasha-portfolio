import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { posts } from "@/data/posts";
import { site } from "@/data/site";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";

type Props = PageProps<"/[locale]/blog/[slug]">;

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => posts.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return pageMetadata({
    locale: locale as Locale,
    path: `/blog/${slug}`,
    title: post.title,
    description: post.description,
    noIndex: !site.features.blog,
  });
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const [{ default: Content }, t] = await Promise.all([import(`@/content/blog/${slug}.mdx`), getTranslations("blog")]);

  return (
    <article className="pt-36 pb-section md:pt-44">
      <Container className="max-w-prose">
        <Link href="/blog" className="group inline-flex items-center gap-2 text-sm transition-colors hover:text-gold">
          <ArrowLeft aria-hidden className="flip-rtl size-4" />
          {t("back")}
        </Link>
        <header className="mt-10 border-b border-line pb-10">
          <time dateTime={post.date} className="font-mono text-xs text-gold">
            {new Date(post.date).toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" })}
          </time>
          <h1 className="mt-4 text-display">{post.title}</h1>
          <p className="mt-4 text-lead">{post.description}</p>
        </header>
        <div className="mt-6">
          <Content />
        </div>
      </Container>
    </article>
  );
}
