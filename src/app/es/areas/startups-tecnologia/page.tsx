import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/Seo/JsonLd";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

export const metadata: Metadata = {
  title: "startups y tecnología",
  description: "marca y producto con sistema, sin fricción.",
  alternates: {
    canonical: "/es/areas/startups-tecnologia",
    languages: {
      es: "/es/areas/startups-tecnologia",
      en: "/en/areas/startups-technology",
      "x-default": "/es/areas/startups-tecnologia",
    },
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "inicio", item: `${siteUrl}/es` },
    { "@type": "ListItem", position: 2, name: "áreas", item: `${siteUrl}/es/areas` },
    { "@type": "ListItem", position: 3, name: "startups y tecnología", item: `${siteUrl}/es/areas/startups-tecnologia` },
  ],
};

export default function AreaStartupsTecnologiaPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />

      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">
          startups y tecnología: marca y producto con sistema, sin fricción
        </h1>
      </header>

      <section id="retos-del-contexto" aria-labelledby="retos-heading" className="mb-8">
        <h2 id="retos-heading" className="text-base font-semibold tracking-tight">
          retos del contexto
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          en startups y tech la marca crece a la vez que el producto. hace falta un sistema que escale: naming, identidad y presencia digital que no se queden obsoletos en seis meses.
        </p>
      </section>

      <section id="servicios-recomendados" aria-labelledby="servicios-heading" className="mb-8">
        <h2 id="servicios-heading" className="text-base font-semibold tracking-tight">
          servicios recomendados
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          <Link href="/es/servicios/naming" className="underline">naming</Link>,{" "}
          <Link href="/es/servicios/branding" className="underline">branding</Link>,{" "}
          <Link href="/es/servicios/diseno-web" className="underline">diseño web</Link> y a veces{" "}
          <Link href="/es/servicios/consultoria-de-marca" className="underline">consultoría de marca</Link> para alinear posicionamiento antes de lanzar.
        </p>
      </section>

      <section id="como-lo-abordamos" aria-labelledby="abordamos-heading" className="mb-8">
        <h2 id="abordamos-heading" className="text-base font-semibold tracking-tight">
          cómo lo abordamos
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          definimos una base sólida desde el principio: nombre, identidad y sistema visual que permitan crecer sin rediseñar cada seis meses. la marca tiene que convivir con el producto sin competir con él.
        </p>
      </section>

      <section id="proyectos-relacionados" aria-labelledby="proyectos-heading" className="mb-8">
        <h2 id="proyectos-heading" className="text-base font-semibold tracking-tight">
          proyectos relacionados
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          casos en{" "}
          <Link href="/es/proyectos/diseno-web" className="underline">diseño web</Link>,{" "}
          <Link href="/es/proyectos/naming" className="underline">naming</Link> y{" "}
          <Link href="/es/proyectos" className="underline">proyectos</Link>. más en{" "}
          <Link href="/es/notas" className="underline">notas</Link>.
        </p>
      </section>

      <section id="faq" aria-labelledby="faq-heading" className="mb-8">
        <h2 id="faq-heading" className="text-base font-semibold tracking-tight">
          preguntas frecuentes
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          plazos para MVP, coordinación con equipos de producto y evolución de la marca: lo hablamos en la primera conversación.
        </p>
      </section>

      <section id="contacto" aria-labelledby="contacto-heading" className="mb-8">
        <h2 id="contacto-heading" className="text-base font-semibold tracking-tight">
          contacto
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          para proyectos de startups o tecnología:{" "}
          <Link href="/es/contacto" className="underline">contacto</Link> o{" "}
          <a href="mailto:hola@agenciaenblanco.com" className="underline">hola@agenciaenblanco.com</a>.
        </p>
      </section>
    </main>
  );
}
