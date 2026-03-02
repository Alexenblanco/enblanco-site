import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/Seo/JsonLd";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

export const metadata: Metadata = {
  title: "consultoría de marca",
  description:
    "ordenamos posicionamiento, mensaje y prioridades antes de diseñar.",
  alternates: {
    canonical: "/es/servicios/consultoria-de-marca",
    languages: {
      es: "/es/servicios/consultoria-de-marca",
      en: "/en/services/brand-consulting",
      "x-default": "/es/servicios/consultoria-de-marca",
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
      name: "consultoría de marca",
      item: `${siteUrl}/es/servicios/consultoria-de-marca`,
    },
  ],
};

export default function ConsultoriaMarcaServicioPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />

      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">
          consultoría de marca
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          ordenamos posicionamiento, mensaje y prioridades antes de diseñar.
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
          cuando la marca quiere estar en muchos sitios a la vez, es fácil
          perder foco. la consultoría ayuda a decidir qué decimos, a quién y
          desde dónde, antes de invertir en diseño o campañas.
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
          trabajamos con sesiones cortas y documentación mínima pero clara:
          mapa de actores, posicionamiento, mensajes clave y prioridades por
          canal. todo orientado a tomar decisiones prácticas, no a añadir
          teoría.
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
          documento de plataforma de marca, líneas de mensaje y prioridades por
          audiencia. sirve como base para proyectos de{" "}
          <Link href="/es/servicios/branding" className="underline">
            branding
          </Link>{" "}
          o{" "}
          <Link
            href="/es/servicios/estrategia-creativa-campanas"
            className="underline"
          >
            estrategia creativa y campañas
          </Link>
          .
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
          puedes ver proyectos donde la consultoría de marca fue clave en{" "}
          <Link href="/es/proyectos/consultoria-de-marca" className="underline">
            proyectos de consultoría
          </Link>{" "}
          y en contextos de{" "}
          <Link href="/es/areas" className="underline">
            áreas
          </Link>{" "}
          como industria o startups.
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
          qué nivel de información necesitamos, cómo involucrar al equipo y
          qué pasa si las conclusiones afectan a la arquitectura de marca: lo
          aclaramos siempre al inicio.
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
          si estás revisando la estrategia de marca o preparando un cambio de
          rumbo, puedes escribirnos desde{" "}
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

