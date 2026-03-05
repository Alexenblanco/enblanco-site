/** Area slugs for /en/areas/[slug] */
export const EN_AREA_SLUGS = [
  "retail",
  "health",
  "food",
  "industry",
  "startups-technology",
  "culture",
] as const;

/** Area slugs for /es/areas/[slug] */
export const ES_AREA_SLUGS = [
  "retail",
  "salud",
  "alimentacion",
  "industria",
  "startups-tecnologia",
  "cultura",
] as const;

export type EnAreaSlug = (typeof EN_AREA_SLUGS)[number];
export type EsAreaSlug = (typeof ES_AREA_SLUGS)[number];

export const EN_TO_ES_AREA_SLUG: Record<EnAreaSlug, EsAreaSlug> = {
  retail: "retail",
  health: "salud",
  food: "alimentacion",
  industry: "industria",
  "startups-technology": "startups-tecnologia",
  culture: "cultura",
};

export const ES_TO_EN_AREA_SLUG: Record<EsAreaSlug, EnAreaSlug> = {
  retail: "retail",
  salud: "health",
  alimentacion: "food",
  industria: "industry",
  "startups-tecnologia": "startups-technology",
  cultura: "culture",
};
