import type { MetadataRoute } from "next";
import {
  BASE_PATHS,
  getProjectDetailSlugsEs,
  getProjectDetailSlugsEn,
  projectCollectionSlugsEs,
  projectCollectionSlugsEn,
  getNoteSlugs,
  areaSlugsEs,
  areaSlugsEn,
  servicePageSlugsEs,
  servicePageSlugsEn,
} from "@/lib/static-routes";
import { getSiteUrl } from "@/lib/seo";

const siteUrl = getSiteUrl();

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
  const entries: MetadataRoute.Sitemap = BASE_PATHS.map((path) => url(path, now));

  for (const slug of getProjectDetailSlugsEs()) {
    entries.push(url(`/es/proyectos/${slug}`, now));
  }
  for (const slug of getProjectDetailSlugsEn()) {
    entries.push(url(`/en/projects/${slug}`, now));
  }

  for (const slug of projectCollectionSlugsEs) {
    entries.push(url(`/es/proyectos/${slug}`, now));
  }
  for (const slug of projectCollectionSlugsEn) {
    entries.push(url(`/en/projects/${slug}`, now));
  }

  for (const slug of getNoteSlugs()) {
    entries.push(url(`/es/notas/${slug}`, now));
    entries.push(url(`/en/notes/${slug}`, now));
  }

  for (const slug of areaSlugsEs) {
    entries.push(url(`/es/areas/${slug}`, now));
  }
  for (const slug of areaSlugsEn) {
    entries.push(url(`/en/areas/${slug}`, now));
  }

  for (const slug of servicePageSlugsEs) {
    entries.push(url(`/es/servicios/${slug}`, now));
  }
  for (const slug of servicePageSlugsEn) {
    entries.push(url(`/en/services/${slug}`, now));
  }

  return entries;
}
