import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { withLang, isValidLang } from "@/lib/i18n/path";
import {
  EN_AREA_SLUGS,
  ES_AREA_SLUGS,
  EN_TO_ES_AREA_SLUG,
  ES_TO_EN_AREA_SLUG,
} from "@/lib/areas-slugs";
import type { EnAreaSlug, EsAreaSlug } from "@/lib/areas-slugs";
import { AreaDetail } from "./AreaDetail";

type Props = { params: Promise<{ lang: string; areaSlug: string }> };

function isEnAreaSlug(s: string): s is EnAreaSlug {
  return (EN_AREA_SLUGS as readonly string[]).includes(s);
}
function isEsAreaSlug(s: string): s is EsAreaSlug {
  return (ES_AREA_SLUGS as readonly string[]).includes(s);
}

export async function generateStaticParams() {
  const params: { lang: string; areaSlug: string }[] = [];
  for (const slug of EN_AREA_SLUGS) {
    params.push({ lang: "en", areaSlug: slug });
  }
  for (const slug of ES_AREA_SLUGS) {
    params.push({ lang: "es", areaSlug: slug });
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, areaSlug } = await params;
  if (!isValidLang(lang)) return {};
  const isEn = lang === "en";
  if (isEn && isEnAreaSlug(areaSlug)) {
    const meta: Record<EnAreaSlug, { title: string; description: string }> = {
      retail: { title: "retail", description: "brand, packaging, and digital built for fast decisions." },
      health: { title: "health", description: "clarity, trust, and communication that holds up." },
      food: { title: "food", description: "packaging and brand built to be chosen in seconds." },
      industry: { title: "industry", description: "a solid brand is clarity, consistency, and rigor." },
      "startups-technology": { title: "startups & technology", description: "brand and product with system, without friction." },
      culture: { title: "culture", description: "identity and art direction with narrative and judgment." },
    };
    const m = meta[areaSlug];
    const canonical = `/${lang}/areas/${areaSlug}`;
    const otherSlug = EN_TO_ES_AREA_SLUG[areaSlug];
    return {
      title: m.title,
      description: m.description,
      alternates: {
        canonical: `/en/areas/${areaSlug}`,
        languages: { es: `/es/areas/${otherSlug}`, en: `/en/areas/${areaSlug}`, "x-default": `/es/areas/${otherSlug}` },
      },
    };
  }
  if (!isEn && isEsAreaSlug(areaSlug)) {
    const meta: Record<EsAreaSlug, { title: string; description: string }> = {
      retail: { title: "retail", description: "marca, packaging y digital para decidir rápido." },
      salud: { title: "salud", description: "claridad, confianza y comunicación que se sostiene." },
      alimentacion: { title: "alimentación", description: "packaging y marca para elegir en segundos." },
      industria: { title: "industria", description: "una marca sólida es claridad, coherencia y rigor." },
      "startups-tecnologia": { title: "startups y tecnología", description: "marca y producto con sistema, sin fricción." },
      cultura: { title: "cultura", description: "identidad y dirección de arte con narrativa y criterio." },
    };
    const m = meta[areaSlug];
    const otherSlug = ES_TO_EN_AREA_SLUG[areaSlug];
    return {
      title: m.title,
      description: m.description,
      alternates: {
        canonical: `/es/areas/${areaSlug}`,
        languages: { es: `/es/areas/${areaSlug}`, en: `/en/areas/${otherSlug}`, "x-default": `/es/areas/${areaSlug}` },
      },
    };
  }
  return {};
}

export default async function AreaSlugPage({ params }: Props) {
  const { lang, areaSlug } = await params;
  if (!isValidLang(lang)) notFound();

  const isEn = lang === "en";
  if (isEn) {
    if (isEsAreaSlug(areaSlug)) {
      redirect(withLang("en", `areas/${ES_TO_EN_AREA_SLUG[areaSlug]}`));
    }
    if (!isEnAreaSlug(areaSlug)) notFound();
    return <AreaDetail lang="en" areaSlug={areaSlug} />;
  }

  if (isEnAreaSlug(areaSlug)) {
    redirect(withLang("es", `areas/${EN_TO_ES_AREA_SLUG[areaSlug]}`));
  }
  if (!isEsAreaSlug(areaSlug)) notFound();
  return <AreaDetail lang="es" areaSlug={areaSlug} />;
}
