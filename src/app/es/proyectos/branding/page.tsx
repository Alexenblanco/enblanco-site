import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/Seo/JsonLd";
import {
  ES_SERVICE_SLUGS,
  ES_COLLECTION_TITLES,
  type EsProyectosCollectionSlug,
} from "@/lib/proyectos-collections";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

const slug: EsProyectosCollectionSlug = "branding";
const title = ES_COLLECTION_TITLES[slug];

export const metadata: Metadata = {
  title,
  description: "Proyectos de branding de enblanco: sistemas de marca claros y aplicables.",
  alternates: {
    canonical: `/es/proyectos/${slug}`,
    languages: {
      es: `/es/proyectos/${slug}`,
      en: "/en/projects/branding",
      "x-default": `/es/proyectos/${slug}`,
    },
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "inicio", item: `${siteUrl}/es` },
    { "@type": "ListItem", position: 2, name: "proyectos", item: `${siteUrl}/es/proyectos` },
    { "@type": "ListItem", position: 3, name: title, item: `${siteUrl}/es/proyectos/${slug}` },
  ],
};

export default function ProyectosBrandingPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />

      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          Trabajos de branding: identidad, sistema visual y aplicaciones. También puedes explorar por{" "}
          <Link href="/es/areas" className="underline">área</Link> o ver el{" "}
          <Link href="/es/servicios/branding" className="underline">servicio de branding</Link>.
        </p>
      </header>

      <section aria-labelledby="list-heading" className="mb-10">
        <h2 id="list-heading" className="sr-only text-base font-semibold tracking-tight">
          listado de proyectos
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-t border-zinc-200 text-sm">
            <thead className="border-b border-zinc-200 text-left text-xs uppercase tracking-wide text-zinc-500">
              <tr>
                <th scope="col" className="py-3 pr-4">proyecto</th>
                <th scope="col" className="py-3 pr-4">cliente / contexto</th>
                <th scope="col" className="py-3 pr-4">enlace</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-100">
                <td className="py-3 pr-4 text-zinc-700">—</td>
                <td className="py-3 pr-4 text-zinc-500">Los proyectos de esta colección se listarán aquí.</td>
                <td className="py-3 pr-4">
                  <Link href="/es/proyectos" className="underline">ver todos los proyectos</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="otras-colecciones-heading" className="mt-8">
        <h2 id="otras-colecciones-heading" className="text-base font-semibold tracking-tight">
          otras colecciones por servicio
        </h2>
        <p className="mt-2 mb-3 text-sm text-zinc-700">
          Explorar por:{" "}
          {ES_SERVICE_SLUGS.filter((s) => s !== slug).map((s) => (
            <span key={s}>
              <Link href={`/es/proyectos/${s}`} className="underline">{ES_COLLECTION_TITLES[s]}</Link>
              {" · "}
            </span>
          ))}
          <Link href="/es/proyectos" className="underline">proyectos</Link>.
        </p>
      </section>
    </main>
  );
}
