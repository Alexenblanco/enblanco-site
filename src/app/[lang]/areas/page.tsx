import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/Seo/JsonLd";
import { withLang, isValidLang } from "@/lib/i18n/path";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

const AREAS_EN = [
  { slug: "retail" as const, name: "retail", description: "brand, packaging, and digital built for fast decisions." },
  { slug: "health" as const, name: "health", description: "clarity, trust, and communication that holds up." },
  { slug: "food" as const, name: "food", description: "packaging and brand built to be chosen in seconds." },
  { slug: "industry" as const, name: "industry", description: "a solid brand is clarity, consistency, and rigor." },
  { slug: "startups-technology" as const, name: "startups & technology", description: "brand and product with system, without friction." },
  { slug: "culture" as const, name: "culture", description: "identity and art direction with narrative and judgment." },
];

const AREAS_ES = [
  { slug: "retail" as const, name: "retail", description: "marca, packaging y digital para decidir rápido." },
  { slug: "salud" as const, name: "salud", description: "claridad, confianza y comunicación que se sostiene." },
  { slug: "alimentacion" as const, name: "alimentación", description: "packaging y marca para elegir en segundos." },
  { slug: "industria" as const, name: "industria", description: "una marca sólida es claridad, coherencia y rigor." },
  { slug: "startups-tecnologia" as const, name: "startups y tecnología", description: "marca y producto con sistema, sin fricción." },
  { slug: "cultura" as const, name: "cultura", description: "identidad y dirección de arte con narrativa y criterio." },
];

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang)) return {};
  const isEn = lang === "en";
  return {
    title: isEn ? "areas" : "áreas",
    description: isEn
      ? "contexts where priorities change—not the standard."
      : "contextos de trabajo donde cambian las prioridades, no el estándar.",
    alternates: {
      canonical: `/${lang}/areas`,
      languages: { es: "/es/areas", en: "/en/areas", "x-default": "/es/areas" },
    },
  };
}

export default async function AreasPage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();
  const isEn = lang === "en";
  const areas = isEn ? AREAS_EN : AREAS_ES;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isEn ? "home" : "inicio", item: `${siteUrl}/${lang}` },
      { "@type": "ListItem", position: 2, name: isEn ? "areas" : "áreas", item: `${siteUrl}/${lang}/areas` },
    ],
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />
      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">{isEn ? "areas" : "áreas"}</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          {isEn
            ? "contexts where priorities change—not the standard."
            : "contextos de trabajo donde cambian las prioridades, no el estándar."}
        </p>
      </header>
      <section aria-labelledby="areas-heading" className="mb-12">
        <h2 id="areas-heading" className="sr-only text-base font-semibold tracking-tight">
          {isEn ? "areas list" : "listado de áreas"}
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-t border-zinc-200 text-sm">
            <thead className="border-b border-zinc-200 text-left text-xs uppercase tracking-wide text-zinc-500">
              <tr>
                <th scope="col" className="py-3 pr-4">{isEn ? "area" : "área"}</th>
                <th scope="col" className="py-3 pr-4">{isEn ? "description" : "descripción"}</th>
                <th scope="col" className="py-3 pr-4">{isEn ? "link" : "enlace"}</th>
              </tr>
            </thead>
            <tbody>
              {areas.map((area) => (
                <tr key={area.slug} className="border-b border-zinc-100 last:border-b-0">
                  <th scope="row" className="py-3 pr-4 text-sm font-medium text-zinc-900">
                    {area.name}
                  </th>
                  <td className="py-3 pr-4 text-sm text-zinc-700">{area.description}</td>
                  <td className="py-3 pr-4 text-sm">
                    <Link href={withLang(lang, `areas/${area.slug}`)} className="text-zinc-900 underline">
                      {isEn ? "view area" : "ver área"}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section aria-labelledby="relations-heading" className="mt-8">
        <h2 id="relations-heading" className="text-base font-semibold tracking-tight">
          {isEn ? "areas, services, and projects" : "áreas, servicios y proyectos"}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          {isEn ? "each area connects with specific services and real projects. explore " : "cada área conecta con servicios concretos y proyectos reales. explora "}
          <Link href={withLang(lang, isEn ? "services" : "servicios")} className="underline">{isEn ? "services" : "servicios"}</Link>
          {isEn ? ", " : ", "}
          <Link href={withLang(lang, isEn ? "projects" : "proyectos")} className="underline">{isEn ? "projects" : "proyectos"}</Link>
          {isEn ? ", or " : " o "}
          <Link href={withLang(lang, isEn ? "notes" : "notas")} className="underline">{isEn ? "notes" : "notas"}</Link>
          {isEn ? " to see how we apply judgment in each context." : " para ver cómo aplicamos el criterio en cada contexto."}
        </p>
      </section>
    </main>
  );
}
