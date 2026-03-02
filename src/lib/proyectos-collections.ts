/**
 * Slugs de colección por servicio (rutas estáticas).
 * Deben coincidir con los segmentos usados en /es/proyectos/[slug] y /en/projects/[slug]
 * para que las colecciones tengan prioridad sobre [slug] dinámico.
 */
export const ES_SERVICE_SLUGS = [
  "branding",
  "naming",
  "direccion-de-arte",
  "consultoria-de-marca",
  "estrategia-creativa",
  "packaging",
  "diseno-web",
] as const;

export const EN_SERVICE_SLUGS = [
  "branding",
  "naming",
  "art-direction",
  "brand-consulting",
  "creative-strategy",
  "packaging",
  "web-design",
] as const;

export type EsProyectosCollectionSlug = (typeof ES_SERVICE_SLUGS)[number];
export type EnProjectsCollectionSlug = (typeof EN_SERVICE_SLUGS)[number];

export const ES_COLLECTION_TITLES: Record<EsProyectosCollectionSlug, string> = {
  branding: "proyectos de branding",
  naming: "proyectos de naming",
  "direccion-de-arte": "proyectos de dirección de arte",
  "consultoria-de-marca": "proyectos de consultoría de marca",
  "estrategia-creativa": "proyectos de estrategia creativa",
  packaging: "proyectos de packaging",
  "diseno-web": "proyectos de diseño web",
};

export const EN_COLLECTION_TITLES: Record<EnProjectsCollectionSlug, string> = {
  branding: "branding projects",
  naming: "naming projects",
  "art-direction": "art direction projects",
  "brand-consulting": "brand consulting projects",
  "creative-strategy": "creative strategy projects",
  packaging: "packaging projects",
  "web-design": "web design projects",
};
