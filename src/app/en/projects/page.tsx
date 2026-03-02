import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/Seo/JsonLd";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

export const metadata: Metadata = {
  title: "projects",
  description:
    "Selection of enblanco work: branding, design, and direction with clear judgment.",
  alternates: {
    canonical: "/en/projects",
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
  { slug: "art-direction", name: "art direction" },
  { slug: "brand-consulting", name: "brand consulting" },
  { slug: "creative-strategy", name: "creative strategy" },
  { slug: "packaging", name: "packaging" },
  { slug: "web-design", name: "web design" },
] as const;

const areas = [
  { slug: "retail", name: "retail" },
  { slug: "health", name: "health" },
  { slug: "food", name: "food" },
  { slug: "industry", name: "industry" },
  { slug: "startups-technology", name: "startups & technology" },
  { slug: "culture", name: "culture" },
] as const;

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "home", item: `${siteUrl}/en` },
    { "@type": "ListItem", position: 2, name: "projects", item: `${siteUrl}/en/projects` },
  ],
};

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />

      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">projects</h1>
      </header>

      <section id="selection" aria-labelledby="selection-heading" className="mb-10">
        <h2 id="selection-heading" className="text-base font-semibold tracking-tight">
          selection
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          A selection of work where you can see how we apply judgment, systems, and execution in each context. You can explore by service or by area.
        </p>
      </section>

      <section id="explore-by-service" aria-labelledby="por-servicio-heading" className="mb-10">
        <h2 id="por-servicio-heading" className="text-base font-semibold tracking-tight">
          explore by service
        </h2>
        <p className="mt-2 mb-4 max-w-2xl text-sm text-zinc-700">
          Projects grouped by type of work: branding, naming, art direction, brand consulting, creative strategy, packaging, web design.
        </p>
        <ul className="flex flex-wrap gap-2 text-sm">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/en/projects/${s.slug}`}
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

      <section id="explore-by-area" aria-labelledby="por-area-heading" className="mb-10">
        <h2 id="por-area-heading" className="text-base font-semibold tracking-tight">
          explore by area
        </h2>
        <p className="mt-2 mb-4 max-w-2xl text-sm text-zinc-700">
          The same projects can be viewed by industry or sector context: retail, health, food, industry, startups & technology, culture.
        </p>
        <ul className="flex flex-wrap gap-2 text-sm">
          {areas.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/en/areas/${a.slug}#related-projects`}
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

      <section id="contact" aria-labelledby="contacto-heading" className="mb-8">
        <h2 id="contacto-heading" className="text-base font-semibold tracking-tight">
          contact
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          If you want to tell us about a project or see more cases:{" "}
          <Link href="/en/contact" className="underline">contact</Link> or{" "}
          <a href="mailto:hola@agenciaenblanco.com" className="underline">hola@agenciaenblanco.com</a>.
        </p>
      </section>
    </main>
  );
}
