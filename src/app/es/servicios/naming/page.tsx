import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/Seo/JsonLd";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

export const metadata: Metadata = {
  title: "naming",
  description:
    "nombres que encajan con la estrategia y funcionan en la realidad.",
  alternates: {
    canonical: "/es/servicios/naming",
    languages: {
      es: "/es/servicios/naming",
      en: "/en/services/naming",
      "x-default": "/es/servicios/naming",
    },
  },
};

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
    {
      "@type": "ListItem",
      position: 3,
      name: "naming",
      item: `${siteUrl}/es/servicios/naming`,
    },
  ],
};

export default function NamingServicioPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />

      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">naming</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          nombres que encajan con la estrategia y funcionan en la realidad.
        </p>
      </header>

      <section id="criterios" aria-labelledby="criterios-heading" className="mb-8">
        <h2
          id="criterios-heading"
          className="text-base font-semibold tracking-tight"
        >
          criterios
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          trabajamos con criterios claros: encaje estratégico, registro de
          lenguaje, capacidad de extensión y disponibilidad básica. el nombre
          tiene que aguantar el día a día, no solo una presentación.
        </p>
      </section>

      <section id="enfoque" aria-labelledby="enfoque-heading" className="mb-8">
        <h2
          id="enfoque-heading"
          className="text-base font-semibold tracking-tight"
        >
          enfoque
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          combinamos investigación ligera, workshops con el equipo y sesiones
          de exploración creativa. el resultado es un shortlist argumentado,
          con pros y contras reales para decidir con calma.
        </p>
      </section>

      <section
        id="entregables"
        aria-labelledby="entregables-heading"
        className="mb-8"
      >
        <h2
          id="entregables-heading"
          className="text-base font-semibold tracking-tight"
        >
          entregables
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          propuestas de nombre con racional, primeras comprobaciones básicas y
          recomendaciones para registro y dominios. si el proyecto lo pide,
          dejamos también una guía breve de uso.
        </p>
      </section>

      <section
        id="casos-relacionados"
        aria-labelledby="casos-relacionados-heading"
        className="mb-8"
      >
        <h2
          id="casos-relacionados-heading"
          className="text-base font-semibold tracking-tight"
        >
          casos relacionados
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          algunos de los trabajos de naming se pueden ver en{" "}
          <Link href="/es/proyectos/naming" className="underline">
            proyectos de naming
          </Link>{" "}
          y en notas donde hablamos de criterios en{" "}
          <Link href="/es/notas" className="underline">
            notas
          </Link>
          .
        </p>
      </section>

      <section id="faq" aria-labelledby="faq-heading" className="mb-8">
        <h2
          id="faq-heading"
          className="text-base font-semibold tracking-tight"
        >
          preguntas frecuentes
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          qué pasa si ninguna propuesta encaja, cómo gestionamos cambios de
          alcance y qué tiempos son realistas: lo dejamos cerrado por escrito
          antes de empezar el proyecto.
        </p>
      </section>

      <section
        id="contacto"
        aria-labelledby="contacto-heading"
        className="mb-8"
      >
        <h2
          id="contacto-heading"
          className="text-base font-semibold tracking-tight"
        >
          contacto
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          si estás valorando un cambio de nombre o la creación de una nueva
          marca, puedes escribirnos desde{" "}
          <Link href="/es/contacto" className="underline">
            contacto
          </Link>{" "}
          o a{" "}
          <a href="mailto:hola@agenciaenblanco.com" className="underline">
            hola@agenciaenblanco.com
          </a>
          .
        </p>
      </section>
    </main>
  );
}

