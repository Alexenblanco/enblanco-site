import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/Seo/JsonLd";
import { EN_SERVICE_SLUGS } from "@/lib/proyectos-collections";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

const COLLECTION_SLUGS = new Set(EN_SERVICE_SLUGS);

const PROJECTS_EN: Record<
  string,
  { client: string; primaryService: string; description: string }
> = {
  "ejemplo": {
    client: "Example client",
    primaryService: "branding",
    description: "Example project for case structure.",
  },
};

export async function generateStaticParams() {
  return Object.keys(PROJECTS_EN)
    .filter((slug) => !COLLECTION_SLUGS.has(slug as (typeof EN_SERVICE_SLUGS)[number]))
    .map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (COLLECTION_SLUGS.has(slug as (typeof EN_SERVICE_SLUGS)[number])) return {};
  const p = PROJECTS_EN[slug];
  if (!p) return { title: "Project" };
  return {
    title: `${p.client} — ${p.primaryService}`,
    description: p.description,
    alternates: {
      canonical: `/en/projects/${slug}`,
      languages: {
        es: `/es/proyectos/${slug}`,
        en: `/en/projects/${slug}`,
        "x-default": `/es/proyectos/${slug}`,
      },
    },
  };
}

export default async function ProjectSlugPage({ params }: Props) {
  const { slug } = await params;
  if (COLLECTION_SLUGS.has(slug as (typeof EN_SERVICE_SLUGS)[number])) notFound();
  const project = PROJECTS_EN[slug];
  if (!project) notFound();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "home", item: `${siteUrl}/en` },
      { "@type": "ListItem", position: 2, name: "projects", item: `${siteUrl}/en/projects` },
      { "@type": "ListItem", position: 3, name: project.client, item: `${siteUrl}/en/projects/${slug}` },
    ],
  };

  return (
    <main className="project-detail-page mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />

      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">
          {project.client} — {project.primaryService}
        </h1>
      </header>

      <section id="context" aria-labelledby="context-heading" className="mb-8">
        <h2 id="context-heading" className="text-base font-semibold tracking-tight">
          context
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          {project.description} Project context is described here.
        </p>
      </section>

      <section id="objective" aria-labelledby="objective-heading" className="mb-8">
        <h2 id="objective-heading" className="text-base font-semibold tracking-tight">
          objective
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          Goals of the project and what we aimed to achieve.
        </p>
      </section>

      <section id="approach" aria-labelledby="approach-heading" className="mb-8">
        <h2 id="approach-heading" className="text-base font-semibold tracking-tight">
          approach
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          How we approached it: phases, decisions, and way of working.
        </p>
      </section>

      <section id="system" aria-labelledby="system-heading" className="mb-8">
        <h2 id="system-heading" className="text-base font-semibold tracking-tight">
          system
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          Brand system, identity, or assets delivered.
        </p>
      </section>

      <section id="applications" aria-labelledby="applications-heading" className="mb-8">
        <h2 id="applications-heading" className="text-base font-semibold tracking-tight">
          applications
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          Key applications: packaging, web, campaign, etc.
        </p>
      </section>

      <section id="outcome" aria-labelledby="outcome-heading" className="mb-8">
        <h2 id="outcome-heading" className="text-base font-semibold tracking-tight">
          outcome
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          Result and scope of the project.
        </p>
      </section>

      <section id="related" aria-labelledby="related-heading" className="mb-8">
        <h2 id="related-heading" className="text-base font-semibold tracking-tight">
          related
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          More projects in{" "}
          <Link href={`/en/projects/${project.primaryService}`} className="underline">
            {project.primaryService}
          </Link>
          , by <Link href="/en/areas" className="underline">area</Link> or in{" "}
          <Link href="/en/notes" className="underline">notes</Link>.{" "}
          <Link href="/en/contact" className="underline">Contact</Link>.
        </p>
      </section>
    </main>
  );
}
