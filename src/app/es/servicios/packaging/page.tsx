import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/Seo/JsonLd";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

export const metadata: Metadata = {
  title: "packaging",
  description:
    "jerarquía, claridad y presencia. lo demás es ruido.",
  alternates: {
    canonical: "/es/servicios/packaging",
    languages: {
      es: "/es/servicios/packaging",
      en: "/en/services/packaging",
      "x-default": "/es/servicios/packaging",
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
      name: "packaging",
      item: `${siteUrl}/es/servicios/packaging`,
    },
  ],
};

export default function PackagingServicioPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />

      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">packaging</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          jerarquía, claridad y presencia. lo demás es ruido.
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
          en lineal o en digital, el tiempo para decidir es mínimo. el
          packaging ordena la información para que sea fácil ver qué es,
          para quién es y por qué elegirlo.
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
          trabajamos con jerarquías claras: marca, categoría, beneficio y
          argumentos de apoyo. cruzamos contexto físico y digital para que la
          pieza funcione igual en mano y en pantalla.
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
          propuestas de arquitectura de gama, diseños de envase, adaptaciones a
          formatos clave y guías de uso de marca y claims en packaging.
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
          puedes ver ejemplos en{" "}
          <Link href="/es/proyectos/packaging" className="underline">
            proyectos de packaging
          </Link>{" "}
          y en contextos de{" "}
          <Link href="/es/areas/alimentacion" className="underline">
            alimentación
          </Link>{" "}
          y{" "}
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
          cómo manejamos cambios regulatorios, ampliaciones de gama y
          adaptaciones a otros mercados: lo dejamos previsto desde el inicio
          del proyecto.
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
          si estás revisando el packaging de una marca o categoría, puedes
          escribirnos desde{" "}
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

