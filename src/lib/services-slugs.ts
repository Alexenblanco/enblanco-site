/** Service page slugs for /en/services/[slug] */
export const EN_SERVICE_PAGE_SLUGS = [
  "branding",
  "naming",
  "art-direction",
  "brand-consulting",
  "creative-strategy-campaigns",
  "packaging",
  "web-design",
] as const;

/** Service page slugs for /es/servicios/[slug] */
export const ES_SERVICE_PAGE_SLUGS = [
  "branding",
  "naming",
  "direccion-de-arte",
  "consultoria-de-marca",
  "estrategia-creativa-campanas",
  "packaging",
  "diseno-web",
] as const;

export type EnServicePageSlug = (typeof EN_SERVICE_PAGE_SLUGS)[number];
export type EsServicePageSlug = (typeof ES_SERVICE_PAGE_SLUGS)[number];

export const EN_TO_ES_SERVICE_SLUG: Record<EnServicePageSlug, EsServicePageSlug> = {
  branding: "branding",
  naming: "naming",
  "art-direction": "direccion-de-arte",
  "brand-consulting": "consultoria-de-marca",
  "creative-strategy-campaigns": "estrategia-creativa-campanas",
  packaging: "packaging",
  "web-design": "diseno-web",
};

export const ES_TO_EN_SERVICE_SLUG: Record<EsServicePageSlug, EnServicePageSlug> = {
  branding: "branding",
  naming: "naming",
  "direccion-de-arte": "art-direction",
  "consultoria-de-marca": "brand-consulting",
  "estrategia-creativa-campanas": "creative-strategy-campaigns",
  packaging: "packaging",
  "diseno-web": "web-design",
};
