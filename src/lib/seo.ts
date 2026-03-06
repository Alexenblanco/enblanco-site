/**
 * Central SEO URL and metadata helpers.
 * Canonical domain from site-config (www only).
 */

import { SITE_URL_DEFAULT } from "@/lib/site-config";

/**
 * Returns the canonical site URL. Uses SITE_URL_DEFAULT for production domain.
 * Use for metadataBase, sitemap, robots, JSON-LD, and OG URLs.
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || "";
  if (!raw || raw === "") return SITE_URL_DEFAULT;
  try {
    const u = new URL(raw.startsWith("http") ? raw : `https://${raw}`);
    const host = u.hostname.toLowerCase();
    if (host === "www.agenciaenblanco.com") return SITE_URL_DEFAULT;
    if (host === "agenciaenblanco.com" || host.endsWith("agenciaenblanco.com"))
      return SITE_URL_DEFAULT;
    return SITE_URL_DEFAULT;
  } catch {
    return SITE_URL_DEFAULT;
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
