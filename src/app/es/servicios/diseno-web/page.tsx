import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/Seo/JsonLd";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

export const metadata: Metadata = {
  title: "diseño web",
  description:
    "estructura, experiencia y rendimiento, sin fricción.",
  alternates: {
    canonical: "/es/servicios/diseno-web",
    languages: {
      es: "/es/servicios/diseno-web",
      en: "/en/services/web-design",
      "x-default": "/es/servicios/diseno-web",
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
      name: "diseño web",
      item: `${siteUrl}/es/servicios/diseno-web`,
    },
  ],
};

export default function DisenoWebServicioPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />

      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">diseño web</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          estructura, experiencia y rendimiento, sin fricción.
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
          webs que crecen por acumulación acaban siendo difíciles de usar y de
          mantener. el diseño web ordena estructura, contenidos y
          funcionalidades para que todo tenga sentido para quien entra y para
          quien lo gestiona.
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
          combinamos arquitectura de información, diseño de interacción y
          sistema visual. cuidamos tiempos de carga y mantenimiento para que el
          sitio sea útil durante años, no solo en el lanzamiento.
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
          mapas de navegación, wireframes, diseños de páginas clave y sistemas
          de componentes. podemos coordinar también la implementación con el
          equipo técnico.
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
          puedes ver ejemplos de diseño web en{" "}
          <Link href="/es/proyectos/diseno-web" className="underline">
            proyectos de diseño web
          </Link>{" "}
          y en contextos de{" "}
          <Link href="/es/areas/startups-tecnologia" className="underline">
            startups y tecnología
          </Link>{" "}
          y{" "}
          <Link href="/es/areas/cultura" className="underline">
            cultura
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
          con qué tecnologías solemos trabajar, cómo coordinamos equipo interno
          y partners externos, y qué pasa con el mantenimiento: lo definimos
          siempre antes de avanzar.
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
          si estás valorando una nueva web o una revisión de la actual, puedes
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

