import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/Seo/JsonLd";
import { ES_SERVICE_SLUGS } from "@/lib/proyectos-collections";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

/** Slugs que son colecciones por servicio; [slug] no debe usarlos. */
const COLLECTION_SLUGS = new Set(ES_SERVICE_SLUGS);

/** Datos de ejemplo para generar una página de detalle. Sustituir por CMS/API. */
const PROYECTOS_ES: Record<
  string,
  { cliente: string; servicioPrincipal: string; descripcion: string }
> = {
  "ejemplo": {
    cliente: "Cliente ejemplo",
    servicioPrincipal: "branding",
    descripcion: "Proyecto de ejemplo para estructura de caso.",
  },
};

export async function generateStaticParams() {
  return Object.keys(PROYECTOS_ES)
    .filter((slug) => !COLLECTION_SLUGS.has(slug as (typeof ES_SERVICE_SLUGS)[number]))
    .map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (COLLECTION_SLUGS.has(slug as (typeof ES_SERVICE_SLUGS)[number])) return {};
  const p = PROYECTOS_ES[slug];
  if (!p) return { title: "Proyecto" };
  return {
    title: `${p.cliente} — ${p.servicioPrincipal}`,
    description: p.descripcion,
    alternates: {
      canonical: `/es/proyectos/${slug}`,
      languages: {
        es: `/es/proyectos/${slug}`,
        en: `/en/projects/${slug}`,
        "x-default": `/es/proyectos/${slug}`,
      },
    },
  };
}

export default async function ProyectoSlugPage({ params }: Props) {
  const { slug } = await params;
  if (COLLECTION_SLUGS.has(slug as (typeof ES_SERVICE_SLUGS)[number])) notFound();
  const proyecto = PROYECTOS_ES[slug];
  if (!proyecto) notFound();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "inicio", item: `${siteUrl}/es` },
      { "@type": "ListItem", position: 2, name: "proyectos", item: `${siteUrl}/es/proyectos` },
      { "@type": "ListItem", position: 3, name: proyecto.cliente, item: `${siteUrl}/es/proyectos/${slug}` },
    ],
  };

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />

      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">
          {proyecto.cliente} — {proyecto.servicioPrincipal}
        </h1>
      </header>

      <section id="contexto" aria-labelledby="contexto-heading" className="mb-8">
        <h2 id="contexto-heading" className="text-base font-semibold tracking-tight">
          contexto
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          {proyecto.descripcion} El contexto del proyecto se describe aquí.
        </p>
      </section>

      <section id="objetivo" aria-labelledby="objetivo-heading" className="mb-8">
        <h2 id="objetivo-heading" className="text-base font-semibold tracking-tight">
          objetivo
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          Objetivos del encargo y qué se esperaba lograr.
        </p>
      </section>

      <section id="enfoque" aria-labelledby="enfoque-heading" className="mb-8">
        <h2 id="enfoque-heading" className="text-base font-semibold tracking-tight">
          enfoque
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          Cómo lo abordamos: fases, decisiones y método de trabajo.
        </p>
      </section>

      <section id="sistema" aria-labelledby="sistema-heading" className="mb-8">
        <h2 id="sistema-heading" className="text-base font-semibold tracking-tight">
          sistema
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          Sistema de marca, identidad o piezas que se entregaron.
        </p>
      </section>

      <section id="aplicaciones" aria-labelledby="aplicaciones-heading" className="mb-8">
        <h2 id="aplicaciones-heading" className="text-base font-semibold tracking-tight">
          aplicaciones
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          Aplicaciones clave: packaging, web, campaña, etc.
        </p>
      </section>

      <section id="resultado" aria-labelledby="resultado-heading" className="mb-8">
        <h2 id="resultado-heading" className="text-base font-semibold tracking-tight">
          resultado
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          Resultado y alcance del proyecto.
        </p>
      </section>

      <section id="relacionados" aria-labelledby="relacionados-heading" className="mb-8">
        <h2 id="relacionados-heading" className="text-base font-semibold tracking-tight">
          relacionados
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          Más proyectos en{" "}
          <Link href={`/es/proyectos/${proyecto.servicioPrincipal}`} className="underline">
            {proyecto.servicioPrincipal}
          </Link>
          , por{" "}
          <Link href="/es/areas" className="underline">área</Link> o en{" "}
          <Link href="/es/notas" className="underline">notas</Link>.{" "}
          <Link href="/es/contacto" className="underline">Contacto</Link>.
        </p>
      </section>
    </main>
  );
}
