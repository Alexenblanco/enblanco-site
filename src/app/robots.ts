import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

/**
 * Environment-aware robots.
 * Block indexing on preview/staging so only production is indexed.
 */
export default function robots(): MetadataRoute.Robots {
  const env = process.env.VERCEL_ENV ?? process.env.NODE_ENV;
  const isProduction = env === "production";

  if (!isProduction) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
