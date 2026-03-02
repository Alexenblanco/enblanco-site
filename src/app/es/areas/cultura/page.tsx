import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/Seo/JsonLd";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

export const metadata: Metadata = {
  title: "cultura",
  description: "identidad y dirección de arte con narrativa y criterio.",
  alternates: {
    canonical: "/es/areas/cultura",
    languages: {
      es: "/es/areas/cultura",
      en: "/en/areas/culture",
      "x-default": "/es/areas/cultura",
    },
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "inicio", item: `${siteUrl}/es` },
    { "@type": "ListItem", position: 2, name: "áreas", item: `${siteUrl}/es/areas` },
    { "@type": "ListItem", position: 3, name: "cultura", item: `${siteUrl}/es/areas/cultura` },
  ],
};

export default function AreaCulturaPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />

      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">
          cultura: identidad y dirección de arte con narrativa y criterio
        </h1>
      </header>

      <section id="retos-del-contexto" aria-labelledby="retos-heading" className="mb-8">
        <h2 id="retos-heading" className="text-base font-semibold tracking-tight">
          retos del contexto
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          en cultura la identidad tiene que conectar con un relato y un público exigente. la dirección de arte no es decoración: tiene que sostener el discurso y distinguir sin caer en lo previsible.
        </p>
      </section>

      <section id="servicios-recomendados" aria-labelledby="servicios-heading" className="mb-8">
        <h2 id="servicios-heading" className="text-base font-semibold tracking-tight">
          servicios recomendados
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          <Link href="/es/servicios/direccion-de-arte" className="underline">dirección de arte</Link>,{" "}
          <Link href="/es/servicios/branding" className="underline">branding</Link> y{" "}
          <Link href="/es/servicios/estrategia-creativa-campanas" className="underline">estrategia creativa y campañas</Link>. a veces{" "}
          <Link href="/es/servicios/naming" className="underline">naming</Link> para instituciones o proyectos nuevos.
        </p>
      </section>

      <section id="como-lo-abordamos" aria-labelledby="abordamos-heading" className="mb-8">
        <h2 id="abordamos-heading" className="text-base font-semibold tracking-tight">
          cómo lo abordamos
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          partimos del relato y del público. la identidad y la dirección de arte tienen que ser reconocibles y coherentes en el tiempo, sin renunciar a la singularidad ni al criterio editorial.
        </p>
      </section>

      <section id="proyectos-relacionados" aria-labelledby="proyectos-heading" className="mb-8">
        <h2 id="proyectos-heading" className="text-base font-semibold tracking-tight">
          proyectos relacionados
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          casos en{" "}
          <Link href="/es/proyectos/direccion-de-arte" className="underline">dirección de arte</Link> y{" "}
          <Link href="/es/proyectos" className="underline">proyectos</Link>. reflexiones en{" "}
          <Link href="/es/notas" className="underline">notas</Link>.
        </p>
      </section>

      <section id="faq" aria-labelledby="faq-heading" className="mb-8">
        <h2 id="faq-heading" className="text-base font-semibold tracking-tight">
          preguntas frecuentes
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          plazos, coordinación con equipos de contenido y presupuestos ajustados: lo hablamos con transparencia desde el inicio.
        </p>
      </section>

      <section id="contacto" aria-labelledby="contacto-heading" className="mb-8">
        <h2 id="contacto-heading" className="text-base font-semibold tracking-tight">
          contacto
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          para proyectos de cultura:{" "}
          <Link href="/es/contacto" className="underline">contacto</Link> o{" "}
          <a href="mailto:hola@agenciaenblanco.com" className="underline">hola@agenciaenblanco.com</a>.
        </p>
      </section>
    </main>
  );
}
