import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/Seo/JsonLd";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectGalleryItem from "@/components/projects/ProjectGalleryItem";
import ProjectDetailBlurWrapper from "@/components/projects/ProjectDetailBlurWrapper";
import { EN_SERVICE_SLUGS } from "@/lib/proyectos-collections";
import { getProjectBySlug, PROJECT_SLUGS } from "@/content/projects";
import {
  getProjectDetailBySlug,
  type ContentSection,
} from "@/data/project-details";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

const COLLECTION_SLUGS = new Set(EN_SERVICE_SLUGS);

const PROJECTS_EN: Record<
  string,
  { client: string; primaryService: string; description: string }
> = {
  ejemplo: {
    client: "Example client",
    primaryService: "branding",
    description: "Example project for case structure.",
  },
};

function groupSections(sections: ContentSection[]): { heading: string; blocks: { body: string; mediaRef?: number }[] }[] {
  const groups: { heading: string; blocks: { body: string; mediaRef?: number }[] }[] = [];
  let current: (typeof groups)[number] | null = null;
  for (const s of sections) {
    if (!current || current.heading !== s.heading) {
      current = { heading: s.heading, blocks: [] };
      groups.push(current);
    }
    current.blocks.push({ body: s.body, mediaRef: s.mediaRef });
  }
  return groups;
}

const PADDING = 32;

export async function generateStaticParams() {
  const allSlugs = [...Object.keys(PROJECTS_EN), ...PROJECT_SLUGS];
  return allSlugs
    .filter((slug) => !COLLECTION_SLUGS.has(slug as (typeof EN_SERVICE_SLUGS)[number]))
    .map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (COLLECTION_SLUGS.has(slug as (typeof EN_SERVICE_SLUGS)[number])) return {};
  const detail = getProjectDetailBySlug(slug);
  if (detail) {
    const desc = detail.overview.slice(0, 155) + (detail.overview.length > 155 ? "…" : "");
    return {
      title: `${detail.title} – ${detail.servicePrimary} | enblanco`,
      description: desc,
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

  const contentProject = getProjectBySlug(slug);
  const detail = getProjectDetailBySlug(slug);
  const legacyEn = PROJECTS_EN[slug];

  if (contentProject && detail) {
    const grouped = groupSections(detail.sections);
    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "home", item: `${siteUrl}/en` },
        { "@type": "ListItem", position: 2, name: "projects", item: `${siteUrl}/en/projects` },
        { "@type": "ListItem", position: 3, name: detail.title, item: `${siteUrl}/en/projects/${slug}` },
      ],
    };

    return (
      <ProjectDetailBlurWrapper>
        <main className="page project-detail-page mx-auto min-h-screen max-w-[1600px] pb-20">
          <JsonLd data={breadcrumbJsonLd} />
          <ProjectHero
            hero={contentProject.hero}
            alt={detail.coverAlt}
            title={detail.title}
            year={detail.year}
            industry={detail.industry}
            padding={PADDING}
          />
          <section
            aria-labelledby="overview-heading"
            className="mx-auto grid w-full gap-8 py-10 md:grid-cols-[minmax(0,1fr)_2fr]"
            style={{ paddingLeft: PADDING, paddingRight: PADDING }}
          >
            <div>
              <h2 id="services-heading" className="mb-3 text-sm font-normal uppercase tracking-wide opacity-80">
                Services
              </h2>
              <ul className="space-y-1 text-base">
                {detail.services.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 id="overview-heading" className="mb-3 text-xl font-normal tracking-tight">
                Overview
              </h2>
              <p className="whitespace-pre-line text-base leading-relaxed opacity-90">
                {detail.overview}
              </p>
            </div>
          </section>
          {grouped.map((group, groupIndex) => {
            const sectionId =
              group.heading.trim() === ""
                ? `media-${groupIndex}`
                : group.heading.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
            const isMediaOnly = group.heading.trim() === "";
            return (
              <article
                key={groupIndex}
                id={sectionId}
                aria-labelledby={isMediaOnly ? undefined : `${sectionId}-heading`}
                className="mx-auto w-full py-8"
                style={{ paddingLeft: PADDING, paddingRight: PADDING }}
              >
                {!isMediaOnly && (
                  <h2 id={`${sectionId}-heading`} className="mb-6 text-xl font-normal tracking-tight">
                    {group.heading}
                  </h2>
                )}
                <div className="space-y-10">
                  {group.blocks.map((block, blockIndex) => (
                    <div key={blockIndex} className="space-y-4">
                      {block.body.trim() !== "" && (
                        <div className="whitespace-pre-line text-base leading-relaxed opacity-90">
                          {block.body}
                        </div>
                      )}
                      {block.mediaRef != null && contentProject.gallery[block.mediaRef] != null && (
                        <div className={block.body.trim() !== "" ? "mt-6" : ""}>
                          <ProjectGalleryItem
                            item={contentProject.gallery[block.mediaRef]!}
                            fullWidth
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
          <section
            id="related"
            aria-labelledby="related-heading"
            className="mx-auto w-full py-12"
            style={{ paddingLeft: PADDING, paddingRight: PADDING }}
          >
            <h2 id="related-heading" className="mb-6 text-xl font-normal tracking-tight">
              Related
            </h2>
            <p className="text-sm opacity-80">
              <Link href="/en/projects/branding" className="underline">
                More branding projects
              </Link>{" "}
              or{" "}
              <Link href="/en/projects" className="underline">
                all projects
              </Link>
              . <Link href="/en/contact" className="underline">Contact</Link>.
            </p>
          </section>
        </main>
      </ProjectDetailBlurWrapper>
    );
  }

  if (!legacyEn) notFound();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "home", item: `${siteUrl}/en` },
      { "@type": "ListItem", position: 2, name: "projects", item: `${siteUrl}/en/projects` },
      { "@type": "ListItem", position: 3, name: legacyEn.client, item: `${siteUrl}/en/projects/${slug}` },
    ],
  };

  return (
    <main className="project-detail-page mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />
      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">
          {legacyEn.client} — {legacyEn.primaryService}
        </h1>
      </header>
      <section id="context" aria-labelledby="context-heading" className="mb-8">
        <h2 id="context-heading" className="text-base font-semibold tracking-tight">
          context
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          {legacyEn.description} Project context is described here.
        </p>
      </section>
      <section id="related" aria-labelledby="related-heading" className="mb-8">
        <h2 id="related-heading" className="text-base font-semibold tracking-tight">
          related
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          <Link href={`/en/projects/${legacyEn.primaryService}`} className="underline">
            {legacyEn.primaryService}
          </Link>
          , <Link href="/en/areas" className="underline">areas</Link>,{" "}
          <Link href="/en/notes" className="underline">notes</Link>.{" "}
          <Link href="/en/contact" className="underline">Contact</Link>.
        </p>
      </section>
    </main>
  );
}
