import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/Seo/JsonLd";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

export const metadata: Metadata = {
  title: "servicios",
  description:
    "áreas de trabajo donde el criterio y la ejecución marcan la diferencia.",
  alternates: {
    canonical: "/es/servicios",
    languages: {
      es: "/es/servicios",
      en: "/en/services",
      "x-default": "/es/servicios",
    },
  },
};

const services = [
  {
    slug: "branding",
    name: "branding",
    description:
      "construimos sistemas de marca: claros, sostenibles y fáciles de aplicar.",
  },
  {
    slug: "naming",
    name: "naming",
    description:
      "nombres que encajan con la estrategia y funcionan en la realidad.",
  },
  {
    slug: "consultoria-de-marca",
    name: "consultoría de marca",
    description:
      "ordenamos posicionamiento, mensaje y prioridades antes de diseñar.",
  },
  {
    slug: "direccion-de-arte",
    name: "dirección de arte",
    description:
      "una estética con sistema: coherente en cada pieza y cada canal.",
  },
  {
    slug: "estrategia-creativa-campanas",
    name: "estrategia creativa y campañas",
    description:
      "concepto, mensaje y un sistema de piezas que se sostiene en el tiempo.",
  },
  {
    slug: "packaging",
    name: "packaging",
    description: "jerarquía, claridad y presencia. lo demás es ruido.",
  },
  {
    slug: "diseno-web",
    name: "diseño web",
    description: "estructura, experiencia y rendimiento, sin fricción.",
  },
] as const;

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "inicio",
      item: `${siteUrl}/es`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "servicios",
      item: `${siteUrl}/es/servicios`,
    },
  ],
};

export default function ServiciosPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />

      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">servicios</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          áreas de trabajo donde el criterio y la ejecución marcan la
          diferencia.
        </p>
      </header>

      <section aria-labelledby="servicios-tabla-heading" className="mb-12">
        <h2
          id="servicios-tabla-heading"
          className="sr-only text-base font-semibold tracking-tight"
        >
          listado de servicios
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-t border-zinc-200 text-sm">
            <thead className="border-b border-zinc-200 text-left text-xs uppercase tracking-wide text-zinc-500">
              <tr>
                <th scope="col" className="py-3 pr-4">
                  servicio
                </th>
                <th scope="col" className="py-3 pr-4">
                  descripción
                </th>
                <th scope="col" className="py-3 pr-4">
                  enlace
                </th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr
                  key={service.slug}
                  className="border-b border-zinc-100 last:border-b-0"
                >
                  <th
                    scope="row"
                    className="py-3 pr-4 text-sm font-medium text-zinc-900"
                  >
                    {service.name}
                  </th>
                  <td className="py-3 pr-4 text-sm text-zinc-700">
                    {service.description}
                  </td>
                  <td className="py-3 pr-4 text-sm">
                    <Link
                      href={`/es/servicios/${service.slug}`}
                      className="text-zinc-900 underline"
                    >
                      ver servicio
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="servicios-relaciones-heading" className="mt-8">
        <h2
          id="servicios-relaciones-heading"
          className="text-base font-semibold tracking-tight"
        >
          servicios, áreas y proyectos
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          cada servicio se cruza con contextos y proyectos distintos. desde
          aquí puedes explorar el trabajo de enblanco por{" "}
          <Link href="/es/areas" className="underline">
            áreas
          </Link>
          , revisar{" "}
          <Link href="/es/proyectos" className="underline">
            proyectos
          </Link>{" "}
          o leer{" "}
          <Link href="/es/notas" className="underline">
            notas
          </Link>{" "}
          donde contamos decisiones y procesos.
        </p>
      </section>
    </main>
  );
}

