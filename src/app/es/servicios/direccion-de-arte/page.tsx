import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/Seo/JsonLd";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

export const metadata: Metadata = {
  title: "dirección de arte",
  description:
    "una estética con sistema: coherente en cada pieza y cada canal.",
  alternates: {
    canonical: "/es/servicios/direccion-de-arte",
    languages: {
      es: "/es/servicios/direccion-de-arte",
      en: "/en/services/art-direction",
      "x-default": "/es/servicios/direccion-de-arte",
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
      name: "dirección de arte",
      item: `${siteUrl}/es/servicios/direccion-de-arte`,
    },
  ],
};

export default function DireccionArteServicioPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />

      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">
          dirección de arte
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          una estética con sistema: coherente en cada pieza y cada canal.
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
          cuando cada campaña parece de una marca distinta, la dirección de
          arte define reglas claras: qué se repite, qué cambia y qué nunca se
          toca. así, la marca se reconoce incluso sin ver el logo.
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
          partimos de la plataforma de marca y la llevamos a decisiones
          concretas: tipo de imagen, ritmo de maquetación, uso de color y tono
          visual. buscamos un lenguaje que funcione igual en on y off.
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
          guías de dirección de arte, plantillas clave, referencias de
          fotografía e ilustración, y ejemplos de aplicaciones en campañas,
          social y piezas editoriales.
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
          algunos proyectos donde la dirección de arte es central están en{" "}
          <Link href="/es/proyectos/direccion-de-arte" className="underline">
            proyectos de dirección de arte
          </Link>{" "}
          y en{" "}
          <Link href="/es/areas/cultura" className="underline">
            cultura
          </Link>{" "}
          o{" "}
          <Link href="/es/areas/retail" className="underline">
            retail
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
          cómo trabajamos con equipos internos, qué pasa si hay agencias ya
          implicadas y cómo se traslada la dirección de arte a otros mercados:
          lo definimos siempre caso a caso.
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
          si necesitas una dirección de arte que conecte campaña, producto y
          digital, puedes escribirnos desde{" "}
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

