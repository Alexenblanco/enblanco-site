/**
 * Site and brand constants. Single source for name, contact, and default URL.
 * Use for metadata, JSON-LD, links, and copy. SEO helpers (getSiteUrl, absoluteUrl)
 * live in lib/seo.ts and use SITE_URL_DEFAULT when env is not set.
 */

export const SITE_NAME = "enblanco";
export const LEGAL_ENTITY_NAME = "ENBLANCO OEAR";
export const LEGAL_ENTITY_NIF = "E42886374";
export const LEGAL_ENTITY_ACTIVITY = "branding y publicidad";
export const LEGAL_ENTITY_ADDRESS =
  "Plaza Santa Catalina 4, Escalera 3, 3ºH, 30004, Murcia, Murcia, España";

export const CONTACT_EMAIL = "hola@agenciaenblanco.com";
export const CONTACT_PHONE = "+34 619 52 67 84";

/** Canonical production URL (www). Used by getSiteUrl when NEXT_PUBLIC_SITE_URL is unset or matches known domain. */
export const SITE_URL_DEFAULT = "https://www.agenciaenblanco.com";
