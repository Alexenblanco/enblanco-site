/**
 * Central SEO URL and metadata helpers.
 * Canonical domain: https://www.agenciaenblanco.com (www only).
 */

const DEFAULT_SITE_URL = "https://www.agenciaenblanco.com";

/**
 * Returns the canonical site URL. Always https://www.agenciaenblanco.com for SEO.
 * Use for metadataBase, sitemap, robots, JSON-LD, and OG URLs. No mixed or non-www canonicals.
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || "";
  if (!raw || raw === "") return DEFAULT_SITE_URL;
  try {
    const u = new URL(raw.startsWith("http") ? raw : `https://${raw}`);
    const host = u.hostname.toLowerCase();
    if (host === "www.agenciaenblanco.com") return DEFAULT_SITE_URL;
    if (host === "agenciaenblanco.com" || host.endsWith("agenciaenblanco.com"))
      return DEFAULT_SITE_URL;
    return DEFAULT_SITE_URL;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

/**
 * Builds an absolute URL for the given path.
 * Path should start with / (e.g. "/es/notas").
 */
export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

/**
 * Returns alternates.languages for Next.js Metadata API.
 * x-default points to the Spanish (es) version.
 */
export function alternatesLanguages(esPath: string, enPath: string): {
  es: string;
  en: string;
  "x-default": string;
} {
  return {
    es: esPath.startsWith("/") ? esPath : `/${esPath}`,
    en: enPath.startsWith("/") ? enPath : `/${enPath}`,
    "x-default": esPath.startsWith("/") ? esPath : `/${esPath}`,
  };
}
