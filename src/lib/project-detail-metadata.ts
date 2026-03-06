import type { Metadata } from "next";
import type { ProjectDetail } from "@/data/project-details";
import { alternatesLanguages } from "@/lib/seo";

type ProjectDetailLang = "es" | "en";

/**
 * Metadata for project detail pages (when we have a ProjectDetail). Shared by ES and EN.
 */
export function getProjectDetailMetadata(
  detail: ProjectDetail,
  slug: string,
  lang: ProjectDetailLang,
  siteUrl: string
): Metadata {
  const description =
    detail.overview.slice(0, 155) + (detail.overview.length > 155 ? "…" : "");
  const ogImage = detail.ogImage ?? detail.coverImage;
  const ogImageUrl = ogImage
    ? ogImage.startsWith("http")
      ? ogImage
      : `${siteUrl}${ogImage}`
    : null;
  const basePath = lang === "es" ? "proyectos" : "projects";
  const canonical = `${siteUrl}/${lang}/${basePath}/${slug}`;
  const alternates = alternatesLanguages(
    `/es/proyectos/${slug}`,
    `/en/projects/${slug}`
  );

  return {
    title: `${detail.title} – ${detail.servicePrimary} | enblanco`,
    description,
    alternates: {
      canonical,
      languages: alternates,
    },
    openGraph: {
      title: `${detail.title} – ${detail.servicePrimary} | enblanco`,
      description,
      url: canonical,
      siteName: "enblanco",
      images: ogImageUrl
        ? [
            {
              url: ogImageUrl,
              width: 1200,
              height: 630,
              alt: `${detail.title} — enblanco`,
            },
          ]
        : [],
    },
    robots: { index: true, follow: true },
  };
}

type BreadcrumbParams = {
  lang: ProjectDetailLang;
  slug: string;
  title: string;
  siteUrl: string;
};

/**
 * Breadcrumb JSON-LD for project pages (detail or collection). Shared by ES and EN.
 */
export function buildProjectBreadcrumbJsonLd({
  lang,
  slug,
  title,
  siteUrl,
}: BreadcrumbParams): Record<string, unknown> {
  const basePath = lang === "es" ? "proyectos" : "projects";
  const homeLabel = lang === "es" ? "inicio" : "home";
  const listLabel = lang === "es" ? "proyectos" : "projects";
  const baseUrl = `${siteUrl}/${lang}`;
  const listUrl = `${baseUrl}/${basePath}`;
  const itemUrl = `${listUrl}/${slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: homeLabel, item: baseUrl },
      { "@type": "ListItem", position: 2, name: listLabel, item: listUrl },
      { "@type": "ListItem", position: 3, name: title, item: itemUrl },
    ],
  };
}
