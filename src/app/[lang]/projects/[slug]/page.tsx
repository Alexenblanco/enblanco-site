import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import JsonLd from "@/components/Seo/JsonLd";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectGalleryItem from "@/components/projects/ProjectGalleryItem";
import ProjectDetailBlurWrapper from "@/components/projects/ProjectDetailBlurWrapper";
import { EN_SERVICE_SLUGS, EN_COLLECTION_TITLES, EN_TO_ES_COLLECTION_SLUG, type EnProjectsCollectionSlug } from "@/lib/proyectos-collections";
import { getProjectBySlug, PROJECT_SLUGS } from "@/content/projects";
import {
  getProjectDetailBySlug,
  type ContentSection,
} from "@/data/project-details";
import { withLang, isValidLang } from "@/lib/i18n/path";

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
  const detailSlugs = [...Object.keys(PROJECTS_EN), ...PROJECT_SLUGS].filter(
    (s) => !COLLECTION_SLUGS.has(s as EnProjectsCollectionSlug)
  );
  const collectionSlugs = [...EN_SERVICE_SLUGS];
  return [
    ...detailSlugs.map((slug) => ({ lang: "en" as const, slug })),
    ...collectionSlugs.map((slug) => ({ lang: "en" as const, slug })),
  ];
}

type Props = { params: Promise<{ lang: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isValidLang(lang) || lang === "es") return {};
  const isCollection = COLLECTION_SLUGS.has(slug as EnProjectsCollectionSlug);
  if (isCollection) {
    const title = EN_COLLECTION_TITLES[slug as EnProjectsCollectionSlug];
    const esSlug = EN_TO_ES_COLLECTION_SLUG[slug as EnProjectsCollectionSlug];
    return {
      title,
      description: `enblanco ${slug.replace(/-/g, " ")} projects.`,
      alternates: {
        canonical: `/en/projects/${slug}`,
        languages: {
          es: `/es/proyectos/${esSlug}`,
          en: `/en/projects/${slug}`,
          "x-default": `/es/proyectos/${esSlug}`,
        },
      },
    };
  }
  const detail = getProjectDetailBySlug(slug);
  if (detail) {
    const desc = detail.overview.slice(0, 155) + (detail.overview.length > 155 ? "…" : "");
    return {
      title: `${detail.title} – ${detail.servicePrimary} | enblanco`,
      description: desc,
      alternates: {
        canonical: "/en/projects/" + slug,
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
      canonical: "/en/projects/" + slug,
      languages: {
        es: `/es/proyectos/${slug}`,
        en: `/en/projects/${slug}`,
        "x-default": `/es/proyectos/${slug}`,
      },
    },
  };
}

export default async function ProjectSlugPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isValidLang(lang)) notFound();
  if (lang === "es") redirect(withLang("es", `proyectos/${EN_TO_ES_COLLECTION_SLUG[slug as EnProjectsCollectionSlug] ?? slug}`));
  const isCollection = COLLECTION_SLUGS.has(slug as EnProjectsCollectionSlug);
  if (isCollection) {
    const title = EN_COLLECTION_TITLES[slug as EnProjectsCollectionSlug];
    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "home", item: `${siteUrl}/en` },
        { "@type": "ListItem", position: 2, name: "projects", item: `${siteUrl}/en/projects` },
        { "@type": "ListItem", position: 3, name: title, item: `${siteUrl}/en/projects/${slug}` },
      ],
    };
    return (
      <main className="mx-auto max-w-5xl px-6 py-10">
        <JsonLd data={breadcrumbJsonLd} />
        <header className="mb-10">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-700">
            Explore by <Link href={withLang("en", "areas")} className="underline">area</Link> or <Link href={withLang("en", `services/${slug}`)} className="underline">service</Link>.
          </p>
        </header>
        <section aria-labelledby="list-heading" className="mb-10">
          <h2 id="list-heading" className="sr-only">project list</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-t border-zinc-200 text-sm">
              <thead className="border-b border-zinc-200 text-left text-xs uppercase text-zinc-500">
                <tr><th scope="col" className="py-3 pr-4">project</th><th scope="col" className="py-3 pr-4">client / context</th><th scope="col" className="py-3 pr-4">link</th></tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-100">
                  <td className="py-3 pr-4 text-zinc-700">—</td>
                  <td className="py-3 pr-4 text-zinc-500">Projects in this collection will be listed here.</td>
                  <td className="py-3 pr-4"><Link href={withLang("en", "projects")} className="underline">view all</Link></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <p className="text-sm text-zinc-600">
          {EN_SERVICE_SLUGS.filter((s) => s !== slug).map((s) => (
            <span key={s}><Link href={withLang("en", `projects/${s}`)} className="underline">{EN_COLLECTION_TITLES[s]}</Link> · </span>
          ))} <Link href={withLang("en", "projects")} className="underline">projects</Link>.
        </p>
      </main>
    );
  }

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
              <Link href={withLang("en", "projects/branding")} className="underline">
                More branding projects
              </Link>{" "}
              or{" "}
              <Link href={withLang("en", "projects")} className="underline">
                all projects
              </Link>
              . <Link href={withLang("en", "contact")} className="underline">Contact</Link>.
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
          <Link href={withLang("en", `projects/${legacyEn.primaryService}`)} className="underline">
            {legacyEn.primaryService}
          </Link>
          , <Link href={withLang("en", "areas")} className="underline">areas</Link>,{" "}
          <Link href={withLang("en", "notes")} className="underline">notes</Link>.{" "}
          <Link href={withLang("en", "contact")} className="underline">Contact</Link>.
        </p>
      </section>
    </main>
  );
}
