/**
 * Base de datos simple de proyectos (MVP).
 * Preparado para filtrado, detalle y más assets en el futuro.
 */

export type Project = {
  id: string;
  slug: string;
  title: string;
  year: string;
  industry: string;
  categories: string[];
  services: string[];
  coverImage: string;
  coverAlt: string;
  /** Para futuro: descripción larga */
  description?: string;
  /** Para futuro: galería de imágenes */
  gallery?: string[];
};

export const PROJECT_CATEGORIES = [
  "Branding",
  "Advertising",
  "Design",
  "Web",
] as const;

export const PROJECT_INDUSTRIES = [
  "Fashion",
  "Sports",
  "Health",
  "Arts & Culture",
  "Industrial",
] as const;

export const projects: Project[] = [
  {
    id: "1",
    slug: "branding-run-club-vol-4",
    title: "Branding Run Club Vol.4",
    year: "2025",
    industry: "Sports",
    categories: ["Branding"],
    services: ["branding"],
    coverImage: "/projects/covers/run-club.png",
    coverAlt: "Branding Run Club Vol.4",
  },
  {
    id: "2",
    slug: "acilica-studio",
    title: "Acilica Studio",
    year: "2026",
    industry: "Arts & Culture",
    categories: ["Branding", "Design"],
    services: ["branding"],
    coverImage: "/projects/covers/acilica.png",
    coverAlt: "Acilica Studio",
  },
  {
    id: "3",
    slug: "luciela-lingerie",
    title: "Luciela Lingerie",
    year: "2024",
    industry: "Fashion",
    categories: ["Branding", "Design"],
    services: ["branding"],
    coverImage: "/projects/covers/luciela.png",
    coverAlt: "Luciela Lingerie",
  },
  {
    id: "4",
    slug: "gafas-murcia-campaign",
    title: "Gafas Murcia Campaign",
    year: "2022",
    industry: "Fashion",
    categories: ["Advertising", "Design"],
    services: ["dirección de arte"],
    coverImage: "/projects/covers/gafas-murcia.png",
    coverAlt: "Gafas Murcia Campaign",
  },
  {
    id: "5",
    slug: "flos-et-umbra",
    title: "Flos et Umbra",
    year: "2022",
    industry: "Fashion",
    categories: ["Branding", "Design"],
    services: ["branding"],
    coverImage: "/projects/covers/flos-et-umbra.png",
    coverAlt: "Flos et Umbra",
  },
];

export function filterProjects(
  list: Project[],
  filters: { category: string | null; industry: string | null }
): Project[] {
  return list.filter((p) => {
    if (filters.category && filters.category !== "All projects") {
      if (!p.categories.includes(filters.category)) return false;
    }
    if (filters.industry && filters.industry !== "All industries") {
      if (p.industry !== filters.industry) return false;
    }
    return true;
  });
}
