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
  /** Slug estable para la página de detalle (ej. branding-acilica-studio). Si existe, los enlaces usan este en lugar de slug. */
  detailSlug?: string;
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
    year: "2025",
    industry: "Arts & Culture",
    categories: ["Branding", "Design"],
    services: ["branding"],
    coverImage: "/projects/acilica/desktop/cover-desktop.jpg",
    coverAlt: "Acilica Studio",
    detailSlug: "branding-acilica-studio",
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

export type ProjectFilters = {
  service: string | null;
  industry: string | null;
};

export function filterProjects(list: Project[], filters: ProjectFilters): Project[] {
  return list.filter((p) => {
    if (filters.service) {
      const match = p.services.some(
        (s) => s.toLowerCase() === filters.service!.toLowerCase()
      );
      if (!match) return false;
    }
    if (filters.industry) {
      if (p.industry !== filters.industry) return false;
    }
    return true;
  });
}

/** Servicios únicos presentes en los proyectos con su conteo (para filtros). */
export function getServiceCounts(list: Project[]): { value: string; count: number }[] {
  const map = new Map<string, number>();
  for (const p of list) {
    for (const s of p.services) {
      const key = s.trim();
      if (!key) continue;
      map.set(key, (map.get(key) ?? 0) + 1);
    }
  }
  return Array.from(map.entries())
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count);
}

/** Industrias únicas presentes en los proyectos con su conteo (para filtros). */
export function getIndustryCounts(list: Project[]): { value: string; count: number }[] {
  const map = new Map<string, number>();
  for (const p of list) {
    const key = p.industry.trim();
    if (!key) continue;
    map.set(key, (map.get(key) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count);
}
