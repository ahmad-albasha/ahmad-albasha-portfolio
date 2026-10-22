import { Check } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BookingPanel } from "@/components/contact/BookingPanel";
import { ContactChannels } from "@/components/contact/ContactChannels";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { site } from "@/data/site";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/book">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({ locale, path: "/book", title: t("bookTitle"), description: t("bookDescription") });
}

export default async function BookPage({ params }: PageProps<"/[locale]/book">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("book");
  const expectations = [t("expect1"), t("expect2"), t("expect3")];

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")}>
        <div className="mt-10">
          <h2 className="font-mono text-label uppercase text-gold">{t("expect")}</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {expectations.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-fg/90">
                <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-gold" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </PageHeader>

      <Container className="pb-section">
        <BookingPanel calLink={site.calLink} contactFallback={<ContactChannels className="justify-center" />} />
      </Container>
    </>
  );
}
