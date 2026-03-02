import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/Seo/JsonLd";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

export const metadata: Metadata = {
  title: "enblanco, agencia creativa",
  description:
    "enblanco es una agencia creativa de branding, diseño y dirección. Criterio, sistema y ejecución.",
  alternates: {
    canonical: "/es/enblanco",
    languages: {
      es: "/es/enblanco",
      en: "/en/enblanco",
      "x-default": "/es/enblanco",
    },
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "inicio", item: `${siteUrl}/es` },
    { "@type": "ListItem", position: 2, name: "enblanco", item: `${siteUrl}/es/enblanco` },
  ],
};

export default function EnblancoPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />

      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">
          enblanco, agencia creativa
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          Trabajamos marca, diseño y sistemas de comunicación con criterio: claridad, orden y ejecución sin ruido.
        </p>
      </header>

      <section id="que-hacemos" aria-labelledby="que-hacemos-heading" className="mb-8">
        <h2 id="que-hacemos-heading" className="text-base font-semibold tracking-tight">
          qué hacemos
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          Branding, naming, consultoría de marca, dirección de arte, estrategia creativa y campañas, packaging y diseño web. Cada proyecto parte de un diagnóstico y termina en un sistema aplicable.
        </p>
        <p className="mt-2 text-sm text-zinc-700">
          <Link href="/es/servicios" className="underline">Ver servicios</Link> y{" "}
          <Link href="/es/areas" className="underline">áreas</Link> de trabajo.
        </p>
      </section>

      <section id="como-pensamos" aria-labelledby="como-pensamos-heading" className="mb-8">
        <h2 id="como-pensamos-heading" className="text-base font-semibold tracking-tight">
          cómo pensamos
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          Priorizamos orden antes de diseño: posicionamiento, mensaje y prioridades. A partir de ahí construimos identidad y piezas que se sostienen en el tiempo.
        </p>
        <p className="mt-2 text-sm text-zinc-700">
          <Link href="/es/enblanco/metodologia" className="underline">Metodología enblanco</Link>.
        </p>
      </section>

      <section id="servicios-y-areas" aria-labelledby="servicios-areas-heading" className="mb-8">
        <h2 id="servicios-areas-heading" className="text-base font-semibold tracking-tight">
          servicios y áreas
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          Trabajamos por tipo de encargo (servicios) y por contexto de sector (áreas). Los proyectos cruzan ambos:{" "}
          <Link href="/es/proyectos" className="underline">proyectos</Link>,{" "}
          <Link href="/es/servicios" className="underline">servicios</Link>,{" "}
          <Link href="/es/areas" className="underline">áreas</Link>.
        </p>
      </section>

      <section id="faq" aria-labelledby="faq-heading" className="mb-8">
        <h2 id="faq-heading" className="text-base font-semibold tracking-tight">
          preguntas frecuentes
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          Plazos, presupuestos, entregables y formas de colaboración. Lo resolvemos en una primera conversación y lo dejamos por escrito.
        </p>
        <p className="mt-2 text-sm text-zinc-700">
          <Link href="/es/enblanco/faq" className="underline">Ver preguntas frecuentes</Link>.
        </p>
      </section>

      <section id="contacto" aria-labelledby="contacto-heading" className="mb-8">
        <h2 id="contacto-heading" className="text-base font-semibold tracking-tight">
          contacto
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          Para contarnos un proyecto o proponer una colaboración:{" "}
          <Link href="/es/contacto" className="underline">contacto</Link> o{" "}
          <a href="mailto:hola@agenciaenblanco.com" className="underline">hola@agenciaenblanco.com</a>.
        </p>
      </section>
    </main>
  );
}
