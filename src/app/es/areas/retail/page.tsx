import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/Seo/JsonLd";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

export const metadata: Metadata = {
  title: "retail",
  description: "marca, packaging y digital pensados para decidir rápido.",
  alternates: {
    canonical: "/es/areas/retail",
    languages: {
      es: "/es/areas/retail",
      en: "/en/areas/retail",
      "x-default": "/es/areas/retail",
    },
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "inicio", item: `${siteUrl}/es` },
    { "@type": "ListItem", position: 2, name: "áreas", item: `${siteUrl}/es/areas` },
    { "@type": "ListItem", position: 3, name: "retail", item: `${siteUrl}/es/areas/retail` },
  ],
};

export default function AreaRetailPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />

      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">
          retail: marca, packaging y digital pensados para decidir rápido
        </h1>
      </header>

      <section id="retos-del-contexto" aria-labelledby="retos-heading" className="mb-8">
        <h2 id="retos-heading" className="text-base font-semibold tracking-tight">
          retos del contexto
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          en retail el tiempo de decisión es mínimo: el cliente elige en segundos. la marca tiene que ser clara en lineal y coherente en digital para que la elección sea rápida y segura.
        </p>
      </section>

      <section id="servicios-recomendados" aria-labelledby="servicios-heading" className="mb-8">
        <h2 id="servicios-heading" className="text-base font-semibold tracking-tight">
          servicios recomendados
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          <Link href="/es/servicios/branding" className="underline">branding</Link>,{" "}
          <Link href="/es/servicios/packaging" className="underline">packaging</Link> y{" "}
          <Link href="/es/servicios/diseno-web" className="underline">diseño web</Link> son los que más encajan con este contexto. también{" "}
          <Link href="/es/servicios/direccion-de-arte" className="underline">dirección de arte</Link> cuando hay campañas y puntos de contacto múltiples.
        </p>
      </section>

      <section id="como-lo-abordamos" aria-labelledby="abordamos-heading" className="mb-8">
        <h2 id="abordamos-heading" className="text-base font-semibold tracking-tight">
          cómo lo abordamos
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          priorizamos jerarquía de información y coherencia entre canal físico y digital. el sistema de marca tiene que resistir ampliaciones de gama y cambios de temporada sin perder claridad.
        </p>
      </section>

      <section id="proyectos-relacionados" aria-labelledby="proyectos-heading" className="mb-8">
        <h2 id="proyectos-heading" className="text-base font-semibold tracking-tight">
          proyectos relacionados
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          puedes ver casos de retail en{" "}
          <Link href="/es/proyectos" className="underline">proyectos</Link> filtrados por{" "}
          <Link href="/es/proyectos/packaging" className="underline">packaging</Link> o{" "}
          <Link href="/es/proyectos/branding" className="underline">branding</Link>.
        </p>
      </section>

      <section id="faq" aria-labelledby="faq-heading" className="mb-8">
        <h2 id="faq-heading" className="text-base font-semibold tracking-tight">
          preguntas frecuentes
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          plazos, coordinación con equipos de compras o tienda y adaptación a distintos formatos: lo acordamos al inicio del proyecto.
        </p>
      </section>

      <section id="contacto" aria-labelledby="contacto-heading" className="mb-8">
        <h2 id="contacto-heading" className="text-base font-semibold tracking-tight">
          contacto
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          si tienes un proyecto de retail en mente, escríbenos desde{" "}
          <Link href="/es/contacto" className="underline">contacto</Link> o a{" "}
          <a href="mailto:hola@agenciaenblanco.com" className="underline">hola@agenciaenblanco.com</a>.
        </p>
      </section>
    </main>
  );
}
