import type { Project, ResponsiveSource } from "./types";
import { brandingAcilicaStudio } from "./branding-acilica-studio";
import { projects as dataProjects } from "@/data/projects";
import type { Project as DataProject } from "@/data/projects";

export type { Project, GalleryItem, GalleryImageItem, GalleryVideoItem, ResponsiveSource } from "./types";

const projects: Project[] = [brandingAcilicaStudio];

/** Stable list of project slugs for sitemap and static params. */
export const PROJECT_SLUGS = projects.map((p) => p.slug);

export function getProjectBySlug(slug: string): Project | null {
  return projects.find((p) => p.slug === slug) ?? null;
}

/** Returns desktop and mobile src; if mobile not provided, use desktop for both (no breakpoint logic in SSR). */
export function getResponsiveSources(source: ResponsiveSource): { desktop: string; mobile: string } {
  return {
    desktop: source.desktop,
    mobile: source.mobile ?? source.desktop,
  };
}

/**
 * Listing: merge data/projects with manifest covers. Use for projects list page.
 * When a manifest exists for the project (by detailSlug or slug), cover is taken from manifest.
 */
export function getListingProjects(): DataProject[] {
  return dataProjects.map((p) => {
    const slug = p.detailSlug ?? p.slug;
    const manifest = getProjectBySlug(slug);
    if (!manifest) return p;
    const { desktop } = getResponsiveSources(manifest.cover);
    return { ...p, coverImage: desktop };
  });
}
