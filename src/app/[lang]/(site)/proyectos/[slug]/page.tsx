import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import JsonLd from "@/components/Seo/JsonLd";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectDetailMedia from "@/components/projects/ProjectDetailMedia";
import ProjectGalleryItem from "@/components/projects/ProjectGalleryItem";
import ProjectDetailFaq from "@/components/projects/ProjectDetailFaq";
import ProjectDetailReady from "@/components/projects/ProjectDetailReady";
import ProjectDetailBlurWrapper from "@/components/projects/ProjectDetailBlurWrapper";
import { ES_SERVICE_SLUGS, ES_COLLECTION_TITLES, ES_TO_EN_COLLECTION_SLUG, type EsProyectosCollectionSlug } from "@/lib/proyectos-collections";
import { getProjectDetailSlugsEs, projectCollectionSlugsEs } from "@/lib/static-routes";
import {
  getProjectDetailBySlug,
  getRelatedProjectDetails,
  type ProjectDetail,
  type ContentSection,
} from "@/data/project-details";
import { getProjectBySlug } from "@/content/projects";
import { withLang, isValidLang } from "@/lib/i18n/path";
import { getSiteUrl } from "@/lib/seo";
import { getProjectDetailMetadata, buildProjectBreadcrumbJsonLd } from "@/lib/project-detail-metadata";
import { groupSections } from "@/lib/project-sections";
import { buildCaseStudyJsonLd, buildFaqJsonLd } from "@/lib/project-jsonld";

const siteUrl = getSiteUrl();

/** Base path for ES project routes. Using <a> instead of Link to avoid Next 15 client router is-dynamic error on hydration. */
const ES_PROYECTOS_BASE = "/es/proyectos";
const ES_BASE = "/es";

const COLLECTION_SLUGS = new Set(ES_SERVICE_SLUGS);
const PADDING = 32;

export async function generateStaticParams() {
  const detailSlugs = getProjectDetailSlugsEs().map((slug) => ({ lang: "es" as const, slug }));
  const collectionSlugs = projectCollectionSlugsEs.map((slug) => ({ lang: "es" as const, slug }));
  return [...detailSlugs, ...collectionSlugs];
}

type Props = { params: Promise<{ lang: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isValidLang(lang) || lang === "en") return {};
  const isCollection = COLLECTION_SLUGS.has(slug as EsProyectosCollectionSlug);
  if (isCollection) {
    const title = ES_COLLECTION_TITLES[slug as EsProyectosCollectionSlug];
    const enSlug = ES_TO_EN_COLLECTION_SLUG[slug as EsProyectosCollectionSlug];
    return {
      title,
      description: `Proyectos de enblanco: ${title.toLowerCase()}.`,
      alternates: {
        canonical: `/es/proyectos/${slug}`,
        languages: {
          es: `/es/proyectos/${slug}`,
          en: `/en/projects/${enSlug}`,
          "x-default": `/es/proyectos/${slug}`,
        },
      },
    };
  }
  const detail = getProjectDetailBySlug(slug);
  if (!detail) return { title: "Proyecto" };
  return getProjectDetailMetadata(detail, slug, "es", siteUrl);
}

export default async function ProyectoSlugPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isValidLang(lang)) notFound();
  if (lang === "en") redirect(withLang("en", `projects/${ES_TO_EN_COLLECTION_SLUG[slug as EsProyectosCollectionSlug] ?? slug}`));
  const isCollection = COLLECTION_SLUGS.has(slug as EsProyectosCollectionSlug);
  if (isCollection) {
    const title = ES_COLLECTION_TITLES[slug as EsProyectosCollectionSlug];
    const breadcrumbJsonLd = buildProjectBreadcrumbJsonLd({
      lang: "es",
      slug,
      title,
      siteUrl,
    });
    return (
      <main className="mx-auto max-w-5xl px-6 py-10">
        <JsonLd data={breadcrumbJsonLd} />
        <header className="mb-10">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-700">
            Trabajos por servicio. También puedes explorar por{" "}
            <a href={`${ES_BASE}/areas`} className="underline">área</a> o ver el{" "}
            <a href={`${ES_BASE}/servicios/${slug}`} className="underline">servicio</a>.
          </p>
        </header>
        <section aria-labelledby="list-heading" className="mb-10">
          <h2 id="list-heading" className="sr-only">listado de proyectos</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-t border-zinc-200 text-sm">
              <thead className="border-b border-zinc-200 text-left text-xs uppercase tracking-wide text-zinc-500">
                <tr>
                  <th scope="col" className="py-3 pr-4">proyecto</th>
                  <th scope="col" className="py-3 pr-4">cliente / contexto</th>
                  <th scope="col" className="py-3 pr-4">enlace</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-100">
                  <td className="py-3 pr-4 text-zinc-700">—</td>
                  <td className="py-3 pr-4 text-zinc-500">Los proyectos de esta colección se listarán aquí.</td>
                  <td className="py-3 pr-4">
                    <a href={ES_PROYECTOS_BASE} className="underline">ver todos los proyectos</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <p className="text-sm text-zinc-600">
          {ES_SERVICE_SLUGS.filter((s) => s !== slug).map((s) => (
            <span key={s}>
              <a href={`${ES_PROYECTOS_BASE}/${s}`} className="underline">{ES_COLLECTION_TITLES[s]}</a>
              {" · "}
            </span>
          ))}
          <a href={ES_PROYECTOS_BASE} className="underline">proyectos</a>.
        </p>
      </main>
    );
  }
  const detail = getProjectDetailBySlug(slug);
  if (!detail) notFound();

  const project = getProjectBySlug(slug);
  const related = getRelatedProjectDetails(detail);
  const grouped = groupSections(detail.sections);
  const breadcrumbJsonLd = buildProjectBreadcrumbJsonLd({
    lang: "es",
    slug,
    title: detail.title,
    siteUrl,
  });
  const caseStudyJsonLd = buildCaseStudyJsonLd(
    detail,
    `${siteUrl}/es/proyectos/${detail.slug}`,
    siteUrl
  );
  const faqJsonLd = buildFaqJsonLd(detail);

  return (
    <ProjectDetailBlurWrapper>
      <main className="page project-detail-page mx-auto min-h-screen max-w-[1600px] pb-20">
        <ProjectDetailReady />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={caseStudyJsonLd} />
      <JsonLd data={faqJsonLd} />

      {project ? (
        <ProjectHero
          hero={project.hero}
          alt={detail.coverAlt}
          title={detail.title}
          year={detail.year}
          industry={detail.industry}
          padding={PADDING}
        />
      ) : (
        <ProjectHero
          hero={{ desktop: detail.coverImage, mobile: detail.coverImageMobile }}
          alt={detail.coverAlt}
          title={detail.title}
          year={detail.year}
          industry={detail.industry}
          padding={PADDING}
        />
      )}

      <section
        aria-labelledby="overview-heading"
        className="mx-auto grid w-full gap-8 py-10 md:grid-cols-[minmax(0,1fr)_2fr]"
        style={{ paddingLeft: PADDING, paddingRight: PADDING }}
      >
        <div>
          <h2 id="services-heading" className="mb-3 text-sm font-normal uppercase tracking-wide opacity-80">
            Servicios
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
            : group.heading
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, "");
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
              <h2
                id={`${sectionId}-heading`}
                className="mb-6 text-xl font-normal tracking-tight"
              >
                {group.heading}
              </h2>
            )}
            <div className="space-y-10">
              {group.blocks.map((block, blockIndex) => (
                <div key={blockIndex} className="space-y-4">
                  {block.eyebrow && (
                    <h3 className="text-sm font-normal uppercase tracking-wide opacity-80">
                      {block.eyebrow}
                    </h3>
                  )}
                  {block.body.trim() !== "" && (
                    <div className="whitespace-pre-line text-base leading-relaxed opacity-90">
                      {block.body}
                    </div>
                  )}
                  {project &&
                    block.mediaRef != null &&
                    project.gallery[block.mediaRef] != null && (
                      <div className={block.body.trim() !== "" ? "mt-6" : ""}>
                        <ProjectGalleryItem
                          item={project.gallery[block.mediaRef]!}
                          fullWidth
                        />
                      </div>
                    )}
                  {!project && block.media && (
                    <div className={block.body.trim() !== "" ? "mt-6" : ""}>
                      <ProjectDetailMedia media={block.media} fullWidth />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </article>
        );
      })}

      {detail.faqs.length > 0 && (
        <ProjectDetailFaq items={detail.faqs} id="faq-proyecto" />
      )}

      <section
        id="relacionados"
        aria-labelledby="relacionados-heading"
        className="mx-auto w-full py-12"
        style={{ paddingLeft: PADDING, paddingRight: PADDING }}
      >
        <h2 id="relacionados-heading" className="mb-6 text-xl font-normal tracking-tight">
          Proyectos relacionados
        </h2>
        {related.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => {
              const detailSlug = p.detailSlug ?? p.slug;
              return (
                <li key={p.id}>
                  <a
                    href={`${ES_PROYECTOS_BASE}/${detailSlug}`}
                    className="block font-normal no-underline opacity-90 transition-opacity hover:opacity-100"
                  >
                    <span className="font-normal">{p.title}</span>
                    <span className="ml-1 text-sm opacity-80">
                      — {p.industry} · {p.year}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-sm opacity-80">
            <a href={`${ES_PROYECTOS_BASE}/branding`} className="underline">
              Ver más proyectos de branding
            </a>{" "}
            o{" "}
            <a href={ES_PROYECTOS_BASE} className="underline">
              todos los proyectos
            </a>
            .
          </p>
        )}
      </section>
      </main>
    </ProjectDetailBlurWrapper>
  );
}
