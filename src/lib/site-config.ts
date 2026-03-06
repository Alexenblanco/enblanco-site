/**
 * Site and brand constants. Single source for name, contact, and default URL.
 * Use for metadata, JSON-LD, links, and copy. SEO helpers (getSiteUrl, absoluteUrl)
 * live in lib/seo.ts and use SITE_URL_DEFAULT when env is not set.
 */

export const SITE_NAME = "enblanco";

export const CONTACT_EMAIL = "hola@agenciaenblanco.com";

/** Canonical production URL (www). Used by getSiteUrl when NEXT_PUBLIC_SITE_URL is unset or matches known domain. */
export const SITE_URL_DEFAULT = "https://www.agenciaenblanco.com";
