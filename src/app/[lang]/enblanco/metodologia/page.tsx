import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import JsonLd from "@/components/Seo/JsonLd";
import { withLang, isValidLang } from "@/lib/i18n/path";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang) || lang === "en") return {};
  return {
    title: "metodología enblanco",
    description:
      "Pensar con claridad, diseñar con sistema. Fases de trabajo en enblanco.",
    alternates: {
      canonical: "/es/enblanco/metodologia",
      languages: {
        es: "/es/enblanco/metodologia",
        en: "/en/enblanco/methodology",
        "x-default": "/es/enblanco/metodologia",
      },
    },
  };
}

export default async function MetodologiaPage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();
  if (lang === "en") redirect(withLang("en", "enblanco/methodology"));

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "inicio", item: `${siteUrl}/es` },
      { "@type": "ListItem", position: 2, name: "enblanco", item: `${siteUrl}/es/enblanco` },
      { "@type": "ListItem", position: 3, name: "metodología", item: `${siteUrl}/es/enblanco/metodologia` },
    ],
  };

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />
      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">
          metodología enblanco: pensar con claridad, diseñar con sistema
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          Cómo ordenamos el trabajo para que el resultado sea aplicable y sostenible.
        </p>
      </header>
      <section id="descubrimiento" aria-labelledby="descubrimiento-heading" className="mb-8">
        <h2 id="descubrimiento-heading" className="text-base font-semibold tracking-tight">descubrimiento</h2>
        <p className="mt-2 text-sm text-zinc-700">
          Entendemos contexto, audiencias y objetivos. Sesiones cortas, documentación mínima y conclusiones claras antes de pasar a la siguiente fase.
        </p>
      </section>
      <section id="estrategia" aria-labelledby="estrategia-heading" className="mb-8">
        <h2 id="estrategia-heading" className="text-base font-semibold tracking-tight">estrategia</h2>
        <p className="mt-2 text-sm text-zinc-700">
          Posicionamiento, mensaje y prioridades. Lo que debe decir la marca y en qué orden, para que el diseño no trabaje a ciegas.
        </p>
      </section>
      <section id="creatividad-y-diseno" aria-labelledby="creatividad-heading" className="mb-8">
        <h2 id="creatividad-heading" className="text-base font-semibold tracking-tight">creatividad y diseño</h2>
        <p className="mt-2 text-sm text-zinc-700">
          Identidad, sistema visual y piezas. Todo con criterio reutilizable: el cliente puede seguir aplicando el sistema sin depender de nosotros en cada detalle.
        </p>
      </section>
      <section id="produccion-y-lanzamiento" aria-labelledby="produccion-heading" className="mb-8">
        <h2 id="produccion-heading" className="text-base font-semibold tracking-tight">producción y lanzamiento</h2>
        <p className="mt-2 text-sm text-zinc-700">
          Acompañamos el despliegue: aplicaciones clave, coordinación con proveedores y entrega de guías para que el equipo interno pueda seguir.
        </p>
      </section>
      <section id="contacto" aria-labelledby="contacto-heading" className="mb-8">
        <h2 id="contacto-heading" className="text-base font-semibold tracking-tight">contacto</h2>
        <p className="mt-2 text-sm text-zinc-700">
          Si quieres conocer cómo lo aplicaríamos a tu proyecto:{" "}
          <Link href={withLang("es", "contacto")} className="underline">contacto</Link> o{" "}
          <a href="mailto:hola@agenciaenblanco.com" className="underline">hola@agenciaenblanco.com</a>.{" "}
          <Link href={withLang("es", "enblanco")} className="underline">Volver a enblanco</Link>.
        </p>
      </section>
    </main>
  );
}
