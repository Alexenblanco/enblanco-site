import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { withLang, isValidLang } from "@/lib/i18n/path";
import {
  EN_SERVICE_PAGE_SLUGS,
  ES_SERVICE_PAGE_SLUGS,
  EN_TO_ES_SERVICE_SLUG,
  ES_TO_EN_SERVICE_SLUG,
} from "@/lib/services-slugs";
import type { EnServicePageSlug, EsServicePageSlug } from "@/lib/services-slugs";
import { servicePageSlugsEn, servicePageSlugsEs } from "@/lib/static-routes";
import { ServiceDetail } from "../../services/[slug]/ServiceDetail";

type Props = { params: Promise<{ lang: string; slug: string }> };

function isEnServiceSlug(s: string): s is EnServicePageSlug {
  return (EN_SERVICE_PAGE_SLUGS as readonly string[]).includes(s);
}
function isEsServiceSlug(s: string): s is EsServicePageSlug {
  return (ES_SERVICE_PAGE_SLUGS as readonly string[]).includes(s);
}

export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const slug of servicePageSlugsEn) params.push({ lang: "en", slug });
  for (const slug of servicePageSlugsEs) params.push({ lang: "es", slug });
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isValidLang(lang)) return {};
  if (lang === "es" && isEsServiceSlug(slug)) {
    const other = ES_TO_EN_SERVICE_SLUG[slug];
    return {
      title: slug,
      description: `Servicio: ${slug}.`,
      alternates: {
        canonical: `/es/servicios/${slug}`,
        languages: { es: `/es/servicios/${slug}`, en: `/en/services/${other}`, "x-default": `/es/servicios/${slug}` },
      },
    };
  }
  if (lang === "en" && isEnServiceSlug(slug)) {
    const other = EN_TO_ES_SERVICE_SLUG[slug];
    return {
      title: slug,
      description: `Service: ${slug}.`,
      alternates: {
        canonical: `/en/services/${slug}`,
        languages: { es: `/es/servicios/${other}`, en: `/en/services/${slug}`, "x-default": `/es/servicios/${other}` },
      },
    };
  }
  return {};
}

export default async function ServicioSlugPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isValidLang(lang)) notFound();

  if (lang === "es") {
    if (isEnServiceSlug(slug)) {
      const esSlug = EN_TO_ES_SERVICE_SLUG[slug as EnServicePageSlug];
      if (esSlug !== slug) redirect(withLang("es", `servicios/${esSlug}`));
    }
    if (!isEsServiceSlug(slug)) notFound();
    return <ServiceDetail lang="es" slug={slug} />;
  }

  if (isEsServiceSlug(slug)) {
    const enSlug = ES_TO_EN_SERVICE_SLUG[slug];
    if (enSlug !== slug) redirect(withLang("en", `services/${enSlug}`));
  }
  if (!isEnServiceSlug(slug)) notFound();
  return <ServiceDetail lang="en" slug={slug} />;
}
