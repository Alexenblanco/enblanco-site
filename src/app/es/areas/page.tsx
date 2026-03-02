import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/Seo/JsonLd";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

export const metadata: Metadata = {
  title: "áreas",
  description:
    "contextos de trabajo donde cambian las prioridades, no el estándar.",
  alternates: {
    canonical: "/es/areas",
    languages: {
      es: "/es/areas",
      en: "/en/areas",
      "x-default": "/es/areas",
    },
  },
};

const areas = [
  { slug: "retail", name: "retail", description: "marca, packaging y digital para decidir rápido." },
  { slug: "salud", name: "salud", description: "claridad, confianza y comunicación que se sostiene." },
  { slug: "alimentacion", name: "alimentación", description: "packaging y marca para elegir en segundos." },
  { slug: "industria", name: "industria", description: "una marca sólida es claridad, coherencia y rigor." },
  { slug: "startups-tecnologia", name: "startups y tecnología", description: "marca y producto con sistema, sin fricción." },
  { slug: "cultura", name: "cultura", description: "identidad y dirección de arte con narrativa y criterio." },
] as const;

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "inicio", item: `${siteUrl}/es` },
    { "@type": "ListItem", position: 2, name: "áreas", item: `${siteUrl}/es/areas` },
  ],
};

export default function AreasPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />

      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">áreas</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          contextos de trabajo donde cambian las prioridades, no el estándar.
        </p>
      </header>

      <section aria-labelledby="areas-tabla-heading" className="mb-12">
        <h2 id="areas-tabla-heading" className="sr-only text-base font-semibold tracking-tight">
          listado de áreas
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-t border-zinc-200 text-sm">
            <thead className="border-b border-zinc-200 text-left text-xs uppercase tracking-wide text-zinc-500">
              <tr>
                <th scope="col" className="py-3 pr-4">área</th>
                <th scope="col" className="py-3 pr-4">descripción</th>
                <th scope="col" className="py-3 pr-4">enlace</th>
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
                    <Link href={`/es/areas/${area.slug}`} className="text-zinc-900 underline">
                      ver área
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="areas-relaciones-heading" className="mt-8">
        <h2 id="areas-relaciones-heading" className="text-base font-semibold tracking-tight">
          áreas, servicios y proyectos
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          cada área conecta con servicios concretos y proyectos reales. explora{" "}
          <Link href="/es/servicios" className="underline">servicios</Link>,{" "}
          <Link href="/es/proyectos" className="underline">proyectos</Link> o{" "}
          <Link href="/es/notas" className="underline">notas</Link> para ver cómo aplicamos el criterio en cada contexto.
        </p>
      </section>
    </main>
  );
}
