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
import { areaSlugsEn, areaSlugsEs } from "@/lib/static-routes";
import { getAreaMeta } from "@/data/areas-meta";
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
  for (const slug of areaSlugsEn) params.push({ lang: "en", areaSlug: slug });
  for (const slug of areaSlugsEs) params.push({ lang: "es", areaSlug: slug });
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, areaSlug } = await params;
  if (!isValidLang(lang)) return {};
  const isEn = lang === "en";
  if (isEn && isEnAreaSlug(areaSlug)) {
    const meta = getAreaMeta("en", areaSlug);
    if (!meta) return {};
    const otherSlug = EN_TO_ES_AREA_SLUG[areaSlug];
    return {
      title: meta.title,
      description: meta.description,
      alternates: {
        canonical: `/en/areas/${areaSlug}`,
        languages: { es: `/es/areas/${otherSlug}`, en: `/en/areas/${areaSlug}`, "x-default": `/es/areas/${otherSlug}` },
      },
    };
  }
  if (!isEn && isEsAreaSlug(areaSlug)) {
    const meta = getAreaMeta("es", areaSlug);
    if (!meta) return {};
    const otherSlug = ES_TO_EN_AREA_SLUG[areaSlug];
    return {
      title: meta.title,
      description: meta.description,
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
