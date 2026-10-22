import { getTranslations } from "next-intl/server";
import { FeaturedProjectCard } from "@/components/projects/ProjectCard";
import { ButtonLink } from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { MobileAction, Section, SectionHeading } from "@/components/ui/Section";
import { featuredProjects } from "@/data/projects";

export async function FeaturedProjects() {
  const t = await getTranslations("projects");
  const viewAll = (
    <ButtonLink href="/projects" variant="secondary">
      {t("viewAll")}
    </ButtonLink>
  );

  return (
    <Section id="work" labelledBy="work-title">
      <SectionHeading
        id="work-title"
        eyebrow={t("eyebrow")}
        title={t("title")}
        intro={t("intro")}
        action={viewAll}
      />
      <Stagger as="ul" className="grid gap-6 lg:grid-cols-2">
        {featuredProjects.map((project) => (
          <StaggerItem as="li" key={project.slug}>
            <FeaturedProjectCard project={project} />
          </StaggerItem>
        ))}
      </Stagger>
      <MobileAction>{viewAll}</MobileAction>
    </Section>
  );
}
