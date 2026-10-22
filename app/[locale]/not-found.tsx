import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
      <p className="font-mono text-label uppercase text-gold">404</p>
      <h1 className="mt-4 text-display">{t("title")}</h1>
      <p className="mt-4 max-w-md">{t("body")}</p>
      <ButtonLink href="/" variant="secondary" className="mt-8">
        {t("back")}
      </ButtonLink>
    </Container>
  );
}
