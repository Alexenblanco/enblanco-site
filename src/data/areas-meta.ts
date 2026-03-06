/**
 * Metadata (title, description) for area pages. Single source for generateMetadata in areas/[areaSlug]/page.tsx.
 */

import type { EnAreaSlug, EsAreaSlug } from "@/lib/areas-slugs";

export type AreaMeta = { title: string; description: string };

export const AREA_META_EN: Record<EnAreaSlug, AreaMeta> = {
  retail: { title: "retail", description: "brand, packaging, and digital built for fast decisions." },
  health: { title: "health", description: "clarity, trust, and communication that holds up." },
  food: { title: "food", description: "packaging and brand built to be chosen in seconds." },
  industry: { title: "industry", description: "a solid brand is clarity, consistency, and rigor." },
  "startups-technology": { title: "startups & technology", description: "brand and product with system, without friction." },
  culture: { title: "culture", description: "identity and art direction with narrative and judgment." },
};

export const AREA_META_ES: Record<EsAreaSlug, AreaMeta> = {
  retail: { title: "retail", description: "marca, packaging y digital para decidir rápido." },
  salud: { title: "salud", description: "claridad, confianza y comunicación que se sostiene." },
  alimentacion: { title: "alimentación", description: "packaging y marca para elegir en segundos." },
  industria: { title: "industria", description: "una marca sólida es claridad, coherencia y rigor." },
  "startups-tecnologia": { title: "startups y tecnología", description: "marca y producto con sistema, sin fricción." },
  cultura: { title: "cultura", description: "identidad y dirección de arte con narrativa y criterio." },
};

export type AreaLang = "en" | "es";

export function getAreaMeta(
  lang: AreaLang,
  slug: EnAreaSlug | EsAreaSlug
): AreaMeta | null {
  if (lang === "en" && slug in AREA_META_EN) return AREA_META_EN[slug as EnAreaSlug];
  if (lang === "es" && slug in AREA_META_ES) return AREA_META_ES[slug as EsAreaSlug];
  return null;
}
