import type { ProjectDetail } from "@/data/project-details";

/**
 * Builds CaseStudy JSON-LD for project detail pages. Shared by ES and EN.
 */
export function buildCaseStudyJsonLd(
  detail: ProjectDetail,
  canonicalUrl: string,
  siteUrl: string
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "CaseStudy",
    name: detail.title,
    about: [detail.industry, ...detail.services].slice(0, 5),
    dateCreated: detail.year,
    industry: detail.industry,
    author: {
      "@type": "Organization",
      name: "enblanco",
      url: siteUrl,
    },
    provider: {
      "@type": "Organization",
      name: "enblanco",
      url: siteUrl,
    },
    url: canonicalUrl,
    image: detail.coverImage.startsWith("http")
      ? detail.coverImage
      : `${siteUrl}${detail.coverImage}`,
  };
}

/**
 * Builds FAQPage JSON-LD from project detail FAQs. Shared by ES and EN.
 */
export function buildFaqJsonLd(detail: ProjectDetail): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: detail.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}
