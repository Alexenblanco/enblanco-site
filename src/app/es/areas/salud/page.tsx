import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/Seo/JsonLd";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

export const metadata: Metadata = {
  title: "salud",
  description: "claridad, confianza y una comunicación que se sostiene.",
  alternates: {
    canonical: "/es/areas/salud",
    languages: {
      es: "/es/areas/salud",
      en: "/en/areas/health",
      "x-default": "/es/areas/salud",
    },
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "inicio", item: `${siteUrl}/es` },
    { "@type": "ListItem", position: 2, name: "áreas", item: `${siteUrl}/es/areas` },
    { "@type": "ListItem", position: 3, name: "salud", item: `${siteUrl}/es/areas/salud` },
  ],
};

export default function AreaSaludPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />

      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">
          salud: claridad, confianza y una comunicación que se sostiene
        </h1>
      </header>

      <section id="retos-del-contexto" aria-labelledby="retos-heading" className="mb-8">
        <h2 id="retos-heading" className="text-base font-semibold tracking-tight">
          retos del contexto
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          en salud la regulación y la confianza mandan. la comunicación tiene que ser precisa, accesible y coherente en el tiempo, sin caer en tecnicismos ni en mensajes vacíos.
        </p>
      </section>

      <section id="servicios-recomendados" aria-labelledby="servicios-heading" className="mb-8">
        <h2 id="servicios-heading" className="text-base font-semibold tracking-tight">
          servicios recomendados
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          <Link href="/es/servicios/consultoria-de-marca" className="underline">consultoría de marca</Link>,{" "}
          <Link href="/es/servicios/branding" className="underline">branding</Link> y{" "}
          <Link href="/es/servicios/estrategia-creativa-campanas" className="underline">estrategia creativa y campañas</Link> para alinear mensaje y tono antes de diseñar.
        </p>
      </section>

      <section id="como-lo-abordamos" aria-labelledby="abordamos-heading" className="mb-8">
        <h2 id="abordamos-heading" className="text-base font-semibold tracking-tight">
          cómo lo abordamos
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          partimos de la normativa y del mapa de audiencias. definimos un lenguaje que equilibre rigor y cercanía, y lo aplicamos de forma consistente en todos los soportes.
        </p>
      </section>

      <section id="proyectos-relacionados" aria-labelledby="proyectos-heading" className="mb-8">
        <h2 id="proyectos-heading" className="text-base font-semibold tracking-tight">
          proyectos relacionados
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          casos de salud en{" "}
          <Link href="/es/proyectos" className="underline">proyectos</Link> y en{" "}
          <Link href="/es/notas" className="underline">notas</Link> donde hablamos de comunicación en el sector.
        </p>
      </section>

      <section id="faq" aria-labelledby="faq-heading" className="mb-8">
        <h2 id="faq-heading" className="text-base font-semibold tracking-tight">
          preguntas frecuentes
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          cómo trabajamos con comités de aprobación, plazos de validación y adaptación a distintos mercados: lo dejamos definido desde el principio.
        </p>
      </section>

      <section id="contacto" aria-labelledby="contacto-heading" className="mb-8">
        <h2 id="contacto-heading" className="text-base font-semibold tracking-tight">
          contacto
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          para proyectos de comunicación en salud:{" "}
          <Link href="/es/contacto" className="underline">contacto</Link> o{" "}
          <a href="mailto:hola@agenciaenblanco.com" className="underline">hola@agenciaenblanco.com</a>.
        </p>
      </section>
    </main>
  );
}
