import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/Seo/JsonLd";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

export const metadata: Metadata = {
  title: "estrategia creativa y campañas",
  description:
    "concepto, mensaje y un sistema de piezas que se sostiene.",
  alternates: {
    canonical: "/es/servicios/estrategia-creativa-campanas",
    languages: {
      es: "/es/servicios/estrategia-creativa-campanas",
      en: "/en/services/creative-strategy-campaigns",
      "x-default": "/es/servicios/estrategia-creativa-campanas",
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
      name: "estrategia creativa y campañas",
      item: `${siteUrl}/es/servicios/estrategia-creativa-campanas`,
    },
  ],
};

export default function EstrategiaCreativaServicioPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />

      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">
          estrategia creativa y campañas
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          concepto, mensaje y un sistema de piezas que se sostiene.
        </p>
      </header>

      <section
        id="que-resuelve"
        aria-labelledby="que-resuelve-heading"
        className="mb-8"
      >
        <h2
          id="que-resuelve-heading"
          className="text-base font-semibold tracking-tight"
        >
          qué resuelve
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          cuando cada campaña se plantea desde cero, se pierde energía en
          discutir básicos. una buena estrategia creativa define el marco:
          concepto, mensaje y qué papel juega cada canal.
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
          combinamos contexto, objetivos y marca para llegar a un concepto
          claro. a partir de ahí definimos territorios visuales y narrativos,
          así como la lógica de piezas y formatos.
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
          documentos de concepto, líneas de mensaje, estructura de campaña y
          ejemplos de piezas clave. según el caso, también bajamos a
          producción de creatividades y coordinación con medios.
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
          algunos ejemplos de estrategia creativa se ven en{" "}
          <Link href="/es/proyectos/estrategia-creativa" className="underline">
            proyectos de estrategia
          </Link>{" "}
          y en notas sobre campañas en{" "}
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
          cómo trabajamos con departamentos de marketing, qué información
          necesitamos y cómo medimos resultados: lo planteamos siempre desde
          el inicio del proyecto.
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
          si estás preparando una campaña o un lanzamiento, puedes escribirnos
          desde{" "}
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

