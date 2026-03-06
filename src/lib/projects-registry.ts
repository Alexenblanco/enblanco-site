/**
 * Projects domain — single entry point for "where does what live".
 *
 * - List/index: data/projects (list of cards) + content/projects getListingProjects() for covers.
 * - Detail (SEO, copy, sections, FAQ): data/project-details (getProjectDetailBySlug, PROJECT_DETAILS).
 * - Manifest (hero, gallery, media): content/projects (getProjectBySlug, PROJECT_SLUGS).
 * - Legacy EN-only projects: app/[lang]/(site)/projects/[slug]/page.tsx PROJECTS_EN;
 *   slugs for static generation: lib/static-routes EN_LEGACY_PROJECT_DETAIL_SLUGS.
 *
 * To add a new project:
 * 1. Add list entry in data/projects (id, slug, title, coverImage, etc.).
 * 2. If it has a case study: add ProjectDetail in data/project-details (same slug or detailSlug).
 * 3. If it has custom hero/gallery: add manifest in content/projects and add to PROJECT_SLUGS list there.
 * 4. If EN-only legacy: add slug to EN_LEGACY_PROJECT_DETAIL_SLUGS in static-routes and entry in PROJECTS_EN in projects/[slug]/page.
 */

export {
  getProjectDetailBySlug,
  getRelatedProjectDetails,
  PROJECT_DETAILS,
  type ProjectDetail,
  type ContentSection,
  type FaqItem,
  type ContentMedia,
} from "@/data/project-details";

export {
  projects as projectsList,
  type Project as ProjectListItem,
} from "@/data/projects";

export {
  getProjectBySlug,
  getListingProjects,
  PROJECT_SLUGS,
  getResponsiveSources,
} from "@/content/projects";
export type { Project as ProjectManifest, ResponsiveSource, GalleryItem } from "@/content/projects";
