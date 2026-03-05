import type { MetadataRoute } from "next";
import { PROJECT_DETAILS } from "@/data/project-details";
import { ES_SERVICE_SLUGS, EN_SERVICE_SLUGS } from "@/lib/proyectos-collections";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

/** Note slugs from es/notas and en/notes data; keep in sync with NOTAS_ES / NOTES_EN. */
const NOTE_SLUGS = ["ejemplo"] as const;

/** EN project detail slugs from PROJECTS_EN in en/projects/[slug]/page.tsx. */
const EN_PROJECT_SLUGS = ["ejemplo"] as const;

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
  ];

  // Project detail pages (ES: from PROJECT_DETAILS; EN: from PROJECTS_EN)
  for (const d of PROJECT_DETAILS) {
    entries.push(url(`/es/proyectos/${d.slug}`, now));
  }
  for (const slug of EN_PROJECT_SLUGS) {
    entries.push(url(`/en/projects/${slug}`, now));
  }

  // Project collection pages (static segments)
  for (const slug of ES_SERVICE_SLUGS) {
    entries.push(url(`/es/proyectos/${slug}`, now));
  }
  for (const slug of EN_SERVICE_SLUGS) {
    entries.push(url(`/en/projects/${slug}`, now));
  }

  // Notes index and note detail pages
  entries.push(url("/es/notas", now));
  entries.push(url("/en/notes", now));
  for (const slug of NOTE_SLUGS) {
    entries.push(url(`/es/notas/${slug}`, now));
    entries.push(url(`/en/notes/${slug}`, now));
  }

  return entries;
}
