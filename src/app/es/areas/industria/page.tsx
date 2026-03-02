import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/Seo/JsonLd";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

export const metadata: Metadata = {
  title: "industria",
  description: "una marca sólida es claridad, coherencia y rigor.",
  alternates: {
    canonical: "/es/areas/industria",
    languages: {
      es: "/es/areas/industria",
      en: "/en/areas/industry",
      "x-default": "/es/areas/industria",
    },
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "inicio", item: `${siteUrl}/es` },
    { "@type": "ListItem", position: 2, name: "áreas", item: `${siteUrl}/es/areas` },
    { "@type": "ListItem", position: 3, name: "industria", item: `${siteUrl}/es/areas/industria` },
  ],
};

export default function AreaIndustriaPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />

      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">
          industria: una marca sólida es claridad, coherencia y rigor
        </h1>
      </header>

      <section id="retos-del-contexto" aria-labelledby="retos-heading" className="mb-8">
        <h2 id="retos-heading" className="text-base font-semibold tracking-tight">
          retos del contexto
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          en industria B2B la marca suele ser invisible hasta que hace falta: licitaciones, partners, empleados. la identidad tiene que transmitir solidez y claridad sin ruido ni modas.
        </p>
      </section>

      <section id="servicios-recomendados" aria-labelledby="servicios-heading" className="mb-8">
        <h2 id="servicios-heading" className="text-base font-semibold tracking-tight">
          servicios recomendados
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          <Link href="/es/servicios/consultoria-de-marca" className="underline">consultoría de marca</Link>,{" "}
          <Link href="/es/servicios/branding" className="underline">branding</Link> y{" "}
          <Link href="/es/servicios/diseno-web" className="underline">diseño web</Link> para presencia coherente. a menudo{" "}
          <Link href="/es/servicios/estrategia-creativa-campanas" className="underline">estrategia creativa</Link> para comunicar valor a distintos públicos.
        </p>
      </section>

      <section id="como-lo-abordamos" aria-labelledby="abordamos-heading" className="mb-8">
        <h2 id="abordamos-heading" className="text-base font-semibold tracking-tight">
          cómo lo abordamos
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          ordenamos posicionamiento y mensaje antes de diseñar. el sistema visual tiene que aguantar años, múltiples divisiones y canales sin parecer disperso ni anticuado.
        </p>
      </section>

      <section id="proyectos-relacionados" aria-labelledby="proyectos-heading" className="mb-8">
        <h2 id="proyectos-heading" className="text-base font-semibold tracking-tight">
          proyectos relacionados
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          casos industriales en{" "}
          <Link href="/es/proyectos/consultoria-de-marca" className="underline">consultoría</Link> y{" "}
          <Link href="/es/proyectos" className="underline">proyectos</Link>. más en{" "}
          <Link href="/es/notas" className="underline">notas</Link>.
        </p>
      </section>

      <section id="faq" aria-labelledby="faq-heading" className="mb-8">
        <h2 id="faq-heading" className="text-base font-semibold tracking-tight">
          preguntas frecuentes
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          involucración de equipos internos, plazos y evolución de la marca a largo plazo: lo definimos desde el inicio.
        </p>
      </section>

      <section id="contacto" aria-labelledby="contacto-heading" className="mb-8">
        <h2 id="contacto-heading" className="text-base font-semibold tracking-tight">
          contacto
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          para proyectos en industria:{" "}
          <Link href="/es/contacto" className="underline">contacto</Link> o{" "}
          <a href="mailto:hola@agenciaenblanco.com" className="underline">hola@agenciaenblanco.com</a>.
        </p>
      </section>
    </main>
  );
}
