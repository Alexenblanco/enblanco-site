import JsonLd from "@/components/Seo/JsonLd";
import { getListingProjects } from "@/content/projects";
import type { Locale } from "@/lib/i18n/path";
import { withLang } from "@/lib/i18n/path";
import { absoluteUrl } from "@/lib/seo";
import type { HomeFeaturedProjectCard } from "@/lib/sanity/queries";
import HomeFeaturedWorksClient from "./HomeFeaturedWorksClient";

function projectDetailPath(lang: Locale, slug: string): string {
  return lang === "es"
    ? withLang("es", `proyectos/${slug}`)
    : withLang("en", `projects/${slug}`);
}

function projectsIndexPath(lang: Locale): string {
  return lang === "es" ? withLang("es", "proyectos") : withLang("en", "projects");
}

function buildFallbackProjects(lang: Locale): HomeFeaturedProjectCard[] {
  const listingProjects = getListingProjects();
  const cards: HomeFeaturedProjectCard[] = listingProjects.slice(0, 6).map((project) => {
    const slug = project.detailSlug ?? project.slug;
    const label =
      project.categories.length > 0
        ? project.categories.join(" | ")
        : project.services.length > 0
          ? project.services.join(" | ")
          : lang === "es"
            ? "Proyecto"
            : "Project";

    return {
      slug,
      title: project.title,
      label,
      imageUrl: project.coverImage || "/home/featured-work-default.svg",
      imageAlt: project.coverAlt || project.title,
    };
  });

  while (cards.length < 6) {
    const index = cards.length + 1;
    cards.push({
      slug: `placeholder-${index}`,
      title: lang === "es" ? "Explora más proyectos" : "Explore more projects",
      label: lang === "es" ? "Selección en progreso" : "Curated selection",
      imageUrl: "/home/featured-work-default.svg",
      imageAlt: lang === "es" ? "Imagen por defecto del bloque de trabajos destacados" : "Default selected works placeholder image",
      href: projectsIndexPath(lang),
    });
  }

  return cards;
}

function mergeProjects(
  lang: Locale,
  projects: HomeFeaturedProjectCard[],
): HomeFeaturedProjectCard[] {
  const merged: HomeFeaturedProjectCard[] = [];
  const seen = new Set<string>();

  for (const project of projects) {
    if (merged.length >= 6) break;
    if (seen.has(project.slug)) continue;
    seen.add(project.slug);
    merged.push({
      ...project,
      imageUrl: project.imageUrl || "/home/featured-work-default.svg",
    });
  }

  for (const project of buildFallbackProjects(lang)) {
    if (merged.length >= 6) break;
    if (seen.has(project.slug)) continue;
    seen.add(project.slug);
    merged.push(project);
  }

  return merged;
}

function buildFeaturedWorksJsonLd(projects: HomeFeaturedProjectCard[], lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: lang === "es" ? "Trabajos destacados" : "Selected works",
    numberOfItems: projects.length,
    itemListElement: projects.map((p, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: p.title,
      url: absoluteUrl(projectDetailPath(lang, p.slug)),
    })),
  };
}

type Props = {
  lang: Locale;
  projects: HomeFeaturedProjectCard[];
};

export default function HomeFeaturedWorks({ lang, projects }: Props) {
  const displayProjects = mergeProjects(lang, projects);

  return (
    <>
      <JsonLd data={buildFeaturedWorksJsonLd(displayProjects.filter((project) => !project.href), lang)} />
      <HomeFeaturedWorksClient lang={lang} projects={displayProjects} />
    </>
  );
}
