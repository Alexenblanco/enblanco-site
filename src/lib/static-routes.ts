/**
 * Single source for static routes used by sitemap and generateStaticParams.
 * Add or change slugs in their canonical modules (data/*, lib/*-slugs, etc.);
 * this module aggregates them so sitemap and params stay in sync.
 */

import { PROJECT_DETAILS } from "@/data/project-details";
import type { EsProyectosCollectionSlug } from "@/lib/proyectos-collections";
import { NOTAS_ES, NOTES_EN } from "@/data/notes-index";
import {
  ES_SERVICE_SLUGS,
  EN_SERVICE_SLUGS,
  type EnProjectsCollectionSlug,
} from "@/lib/proyectos-collections";
import { ES_SERVICE_PAGE_SLUGS, EN_SERVICE_PAGE_SLUGS } from "@/lib/services-slugs";
import { ES_AREA_SLUGS, EN_AREA_SLUGS } from "@/lib/areas-slugs";
import { PROJECT_SLUGS } from "@/content/projects";

// —— Base paths (no dynamic segment) ——

export const BASE_PATHS: string[] = [
  "/es",
  "/en",
  "/es/proyectos",
  "/en/projects",
  "/es/servicios",
  "/en/services",
  "/es/notas",
  "/en/notes",
  "/es/contacto",
  "/en/contact",
  "/es/areas",
  "/en/areas",
  "/es/enblanco",
  "/en/enblanco",
  "/es/enblanco/equipo",
  "/en/enblanco/team",
  "/es/enblanco/metodologia",
  "/en/enblanco/methodology",
  "/es/enblanco/faq",
  "/en/enblanco/faq",
  "/es/privacidad",
  "/en/privacy",
  "/es/aviso-legal",
  "/en/legal-notice",
  "/es/cookies",
  "/en/cookies",
];

// —— Project detail slugs ——

/** ES: slugs from PROJECT_DETAILS that are not collection slugs. */
export function getProjectDetailSlugsEs(): string[] {
  const collectionSet = new Set(ES_SERVICE_SLUGS);
  return PROJECT_DETAILS.filter(
    (d) => !collectionSet.has(d.slug as EsProyectosCollectionSlug)
  ).map((d) => d.slug);
}

/**
 * EN: legacy detail slugs (PROJECTS_EN) + PROJECT_SLUGS from content, minus collection slugs.
 * When adding a legacy EN-only project, add its slug here and the metadata in projects/[slug]/page.
 */
export const EN_LEGACY_PROJECT_DETAIL_SLUGS = ["ejemplo"] as const;

const EN_COLLECTION_SET = new Set(EN_SERVICE_SLUGS);

export function getProjectDetailSlugsEn(): string[] {
  return [
    ...EN_LEGACY_PROJECT_DETAIL_SLUGS,
    ...PROJECT_SLUGS,
  ].filter((s) => !EN_COLLECTION_SET.has(s as EnProjectsCollectionSlug));
}

// —— Project collection slugs (by service) ——

export { ES_SERVICE_SLUGS as projectCollectionSlugsEs };
export { EN_SERVICE_SLUGS as projectCollectionSlugsEn };

// —— Note slugs ——

const NOTE_SLUGS_SET = new Set([
  ...NOTAS_ES.map((n) => n.slug),
  ...NOTES_EN.map((n) => n.slug),
]);
export function getNoteSlugs(): string[] {
  return [...NOTE_SLUGS_SET];
}

export function getNotasSlugsEs(): string[] {
  return NOTAS_ES.map((n) => n.slug);
}

export function getNotesSlugsEn(): string[] {
  return NOTES_EN.map((n) => n.slug);
}

// —— Area slugs ——

export { ES_AREA_SLUGS as areaSlugsEs };
export { EN_AREA_SLUGS as areaSlugsEn };

// —— Service page slugs ——

export { ES_SERVICE_PAGE_SLUGS as servicePageSlugsEs };
export { EN_SERVICE_PAGE_SLUGS as servicePageSlugsEn };
