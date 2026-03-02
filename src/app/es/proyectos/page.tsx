import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/Seo/JsonLd";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

export const metadata: Metadata = {
  title: "proyectos",
  description:
    "Selección de trabajos de enblanco: branding, diseño y dirección con criterio.",
  alternates: {
    canonical: "/es/proyectos",
    languages: {
      es: "/es/proyectos",
      en: "/en/projects",
      "x-default": "/es/proyectos",
    },
  },
};

const services = [
  { slug: "branding", name: "branding" },
  { slug: "naming", name: "naming" },
  { slug: "direccion-de-arte", name: "dirección de arte" },
  { slug: "consultoria-de-marca", name: "consultoría de marca" },
  { slug: "estrategia-creativa", name: "estrategia creativa" },
  { slug: "packaging", name: "packaging" },
  { slug: "diseno-web", name: "diseño web" },
] as const;

const areas = [
  { slug: "retail", name: "retail" },
  { slug: "salud", name: "salud" },
  { slug: "alimentacion", name: "alimentación" },
  { slug: "industria", name: "industria" },
  { slug: "startups-tecnologia", name: "startups y tecnología" },
  { slug: "cultura", name: "cultura" },
] as const;

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "inicio", item: `${siteUrl}/es` },
    { "@type": "ListItem", position: 2, name: "proyectos", item: `${siteUrl}/es/proyectos` },
  ],
};

export default function ProyectosPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />

      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">proyectos</h1>
      </header>

      <section id="selection" aria-labelledby="selection-heading" className="mb-10">
        <h2 id="selection-heading" className="text-base font-semibold tracking-tight">
          selección
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          Una selección de trabajos donde se ve cómo aplicamos criterio, sistema y ejecución en cada contexto. Puedes explorar por servicio o por área.
        </p>
      </section>

      <section id="explorar-por-servicio" aria-labelledby="por-servicio-heading" className="mb-10">
        <h2 id="por-servicio-heading" className="text-base font-semibold tracking-tight">
          explorar por servicio
        </h2>
        <p className="mt-2 mb-4 max-w-2xl text-sm text-zinc-700">
          Proyectos agrupados por tipo de trabajo: branding, naming, dirección de arte, consultoría, estrategia creativa, packaging, diseño web.
        </p>
        <ul className="flex flex-wrap gap-2 text-sm">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/es/proyectos/${s.slug}`}
                className="text-zinc-900 underline hover:no-underline"
              >
                {s.name}
              </Link>
              {s.slug !== services[services.length - 1].slug && (
                <span className="ml-2 text-zinc-400" aria-hidden>·</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section id="explorar-por-area" aria-labelledby="por-area-heading" className="mb-10">
        <h2 id="por-area-heading" className="text-base font-semibold tracking-tight">
          explorar por área
        </h2>
        <p className="mt-2 mb-4 max-w-2xl text-sm text-zinc-700">
          Los mismos proyectos se pueden ver por contexto de industria o sector: retail, salud, alimentación, industria, startups y tecnología, cultura.
        </p>
        <ul className="flex flex-wrap gap-2 text-sm">
          {areas.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/es/areas/${a.slug}#proyectos-relacionados`}
                className="text-zinc-900 underline hover:no-underline"
              >
                {a.name}
              </Link>
              {a.slug !== areas[areas.length - 1].slug && (
                <span className="ml-2 text-zinc-400" aria-hidden>·</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section id="contacto" aria-labelledby="contacto-heading" className="mb-8">
        <h2 id="contacto-heading" className="text-base font-semibold tracking-tight">
          contacto
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          Si quieres contarnos un proyecto o ver más casos:{" "}
          <Link href="/es/contacto" className="underline">contacto</Link> o{" "}
          <a href="mailto:hola@agenciaenblanco.com" className="underline">hola@agenciaenblanco.com</a>.
        </p>
      </section>
    </main>
  );
}
