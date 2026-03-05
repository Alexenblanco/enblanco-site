import type { MetadataRoute } from "next";
import { PROJECT_DETAILS } from "@/data/project-details";
import { NOTAS_ES, NOTES_EN } from "@/data/notes-index";
import { ES_SERVICE_SLUGS, EN_SERVICE_SLUGS } from "@/lib/proyectos-collections";
import { ES_SERVICE_PAGE_SLUGS, EN_SERVICE_PAGE_SLUGS } from "@/lib/services-slugs";
import { PROJECT_SLUGS } from "@/content/projects";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

/** EN project detail slugs: keys of PROJECTS_EN (in projects/[slug]/page) + PROJECT_SLUGS, minus collection slugs. */
const EN_PROJECTS_EN_KEYS = ["ejemplo"] as const;
const EN_COLLECTION_SET = new Set(EN_SERVICE_SLUGS);
const EN_DETAIL_SLUGS = [
  ...EN_PROJECTS_EN_KEYS,
  ...PROJECT_SLUGS,
].filter((s) => !EN_COLLECTION_SET.has(s as (typeof EN_SERVICE_SLUGS)[number]));

/** Note slugs from single source (data/notes-index). */
const NOTE_SLUGS = [...new Set([...NOTAS_ES.map((n) => n.slug), ...NOTES_EN.map((n) => n.slug)])];

const AREA_SLUGS = ["retail", "health", "food", "industry", "startups-technology", "culture"] as const;

function url(path: string, lastModified?: Date): MetadataRoute.Sitemap[number] {
  return {
    url: `${siteUrl}${path}`,
    lastModified: lastModified ?? new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "/es" ? 1 : path === "/en" ? 0.95 : 0.8,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    url("/es", now),
    url("/en", now),
    url("/es/proyectos", now),
    url("/en/projects", now),
    url("/es/servicios", now),
    url("/en/services", now),
    url("/es/notas", now),
    url("/en/notes", now),
    url("/es/contacto", now),
    url("/en/contact", now),
    url("/es/areas", now),
    url("/en/areas", now),
    url("/es/enblanco", now),
    url("/en/enblanco", now),
    url("/es/enblanco/equipo", now),
    url("/en/enblanco/team", now),
    url("/es/enblanco/metodologia", now),
    url("/en/enblanco/methodology", now),
    url("/es/enblanco/faq", now),
    url("/en/enblanco/faq", now),
    url("/es/privacidad", now),
    url("/en/privacy", now),
    url("/es/aviso-legal", now),
    url("/en/legal-notice", now),
    url("/es/cookies", now),
    url("/en/cookies", now),
  ];

  // Project detail pages (ES: PROJECT_DETAILS; EN: same logic as generateStaticParams)
  for (const d of PROJECT_DETAILS) {
    entries.push(url(`/es/proyectos/${d.slug}`, now));
  }
  for (const slug of EN_DETAIL_SLUGS) {
    entries.push(url(`/en/projects/${slug}`, now));
  }

  // Project collection pages
  for (const slug of ES_SERVICE_SLUGS) {
    entries.push(url(`/es/proyectos/${slug}`, now));
  }
  for (const slug of EN_SERVICE_SLUGS) {
    entries.push(url(`/en/projects/${slug}`, now));
  }

  // Notes detail pages
  for (const slug of NOTE_SLUGS) {
    entries.push(url(`/es/notas/${slug}`, now));
    entries.push(url(`/en/notes/${slug}`, now));
  }

  // Areas detail pages
  for (const slug of AREA_SLUGS) {
    entries.push(url(`/es/areas/${slug}`, now));
    entries.push(url(`/en/areas/${slug}`, now));
  }

  // Services detail pages (servicios / services use their own slug sets)
  for (const slug of ES_SERVICE_PAGE_SLUGS) {
    entries.push(url(`/es/servicios/${slug}`, now));
  }
  for (const slug of EN_SERVICE_PAGE_SLUGS) {
    entries.push(url(`/en/services/${slug}`, now));
  }

  return entries;
}
