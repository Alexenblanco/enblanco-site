import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/Seo/JsonLd";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

export const metadata: Metadata = {
  title: "alimentación",
  description: "packaging y marca para elegir en segundos.",
  alternates: {
    canonical: "/es/areas/alimentacion",
    languages: {
      es: "/es/areas/alimentacion",
      en: "/en/areas/food",
      "x-default": "/es/areas/alimentacion",
    },
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "inicio", item: `${siteUrl}/es` },
    { "@type": "ListItem", position: 2, name: "áreas", item: `${siteUrl}/es/areas` },
    { "@type": "ListItem", position: 3, name: "alimentación", item: `${siteUrl}/es/areas/alimentacion` },
  ],
};

export default function AreaAlimentacionPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />

      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">
          alimentación: packaging y marca para elegir en segundos
        </h1>
      </header>

      <section id="retos-del-contexto" aria-labelledby="retos-heading" className="mb-8">
        <h2 id="retos-heading" className="text-base font-semibold tracking-tight">
          retos del contexto
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          en alimentación el envase compite en lineal y en pantalla. la marca y el packaging tienen que transmitir origen, calidad y diferencia en muy poco tiempo y espacio.
        </p>
      </section>

      <section id="servicios-recomendados" aria-labelledby="servicios-heading" className="mb-8">
        <h2 id="servicios-heading" className="text-base font-semibold tracking-tight">
          servicios recomendados
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          <Link href="/es/servicios/packaging" className="underline">packaging</Link>,{" "}
          <Link href="/es/servicios/branding" className="underline">branding</Link> y{" "}
          <Link href="/es/servicios/naming" className="underline">naming</Link> para marcas y gamas. a veces{" "}
          <Link href="/es/servicios/direccion-de-arte" className="underline">dirección de arte</Link> para campañas y contenido.
        </p>
      </section>

      <section id="como-lo-abordamos" aria-labelledby="abordamos-heading" className="mb-8">
        <h2 id="abordamos-heading" className="text-base font-semibold tracking-tight">
          cómo lo abordamos
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          jerarquizamos la información del envase: qué es el producto, para quién y por qué elegirlo. la identidad tiene que funcionar en múltiples referencias y formatos sin perder legibilidad ni impacto.
        </p>
      </section>

      <section id="proyectos-relacionados" aria-labelledby="proyectos-heading" className="mb-8">
        <h2 id="proyectos-heading" className="text-base font-semibold tracking-tight">
          proyectos relacionados
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          ejemplos en{" "}
          <Link href="/es/proyectos/packaging" className="underline">proyectos de packaging</Link> y{" "}
          <Link href="/es/proyectos" className="underline">proyectos</Link>. más contexto en{" "}
          <Link href="/es/notas" className="underline">notas</Link>.
        </p>
      </section>

      <section id="faq" aria-labelledby="faq-heading" className="mb-8">
        <h2 id="faq-heading" className="text-base font-semibold tracking-tight">
          preguntas frecuentes
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          normativa alimentaria, plazos de producción y ampliación de gamas: lo acordamos al inicio.
        </p>
      </section>

      <section id="contacto" aria-labelledby="contacto-heading" className="mb-8">
        <h2 id="contacto-heading" className="text-base font-semibold tracking-tight">
          contacto
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          para proyectos de alimentación:{" "}
          <Link href="/es/contacto" className="underline">contacto</Link> o{" "}
          <a href="mailto:hola@agenciaenblanco.com" className="underline">hola@agenciaenblanco.com</a>.
        </p>
      </section>
    </main>
  );
}
