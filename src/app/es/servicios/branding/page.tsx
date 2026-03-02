import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/Seo/JsonLd";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

export const metadata: Metadata = {
  title: "branding",
  description:
    "construimos sistemas de marca: claros, sostenibles y fáciles de aplicar.",
  alternates: {
    canonical: "/es/servicios/branding",
    languages: {
      es: "/es/servicios/branding",
      en: "/en/services/branding",
      "x-default": "/es/servicios/branding",
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
      name: "branding",
      item: `${siteUrl}/es/servicios/branding`,
    },
  ],
};

export default function BrandingServicioPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />

      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">branding</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          construimos sistemas de marca: claros, sostenibles y fáciles de
          aplicar.
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
          cuando la marca crece a base de piezas sueltas, cada canal cuenta una
          historia distinta. el branding pone orden: una idea clara, un sistema
          visual y un tono aplicable a cualquier formato.
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
          trabajamos con pocas capas: diagnóstico, plataforma de marca y
          sistema visual. el objetivo es que el equipo interno y los partners
          externos puedan tomar decisiones rápidas sin perder coherencia.
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
          según el caso: plataforma de marca, identidad visual completa,
          sistemas tipográficos y cromáticos, aplicaciones clave y un manual
          claro donde se resume cómo usar todo sin depender de nosotros.
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
          puedes ver ejemplos de branding aplicado en la sección de{" "}
          <Link href="/es/proyectos/branding" className="underline">
            proyectos de branding
          </Link>{" "}
          y en contextos específicos dentro de{" "}
          <Link href="/es/areas" className="underline">
            áreas de trabajo
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
          plazos, formato de entregables, acompañamiento y actualizaciones de
          marca: solemos resolverlo en una primera llamada y dejarlo por
          escrito antes de empezar.
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
          si quieres revisar si un proyecto encaja en esta línea de trabajo,
          puedes escribirnos desde la página de{" "}
          <Link href="/es/contacto" className="underline">
            contacto
          </Link>{" "}
          o directamente a{" "}
          <a href="mailto:hola@agenciaenblanco.com" className="underline">
            hola@agenciaenblanco.com
          </a>
          .
        </p>
      </section>
    </main>
  );
}

