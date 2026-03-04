import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/Seo/JsonLd";
import ProjectDetailMedia from "@/components/projects/ProjectDetailMedia";
import ProjectDetailFaq from "@/components/projects/ProjectDetailFaq";
import { ES_SERVICE_SLUGS } from "@/lib/proyectos-collections";
import {
  getProjectDetailBySlug,
  getRelatedProjectDetails,
  PROJECT_DETAILS,
  type ProjectDetail,
  type ContentSection,
} from "@/data/project-details";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

const COLLECTION_SLUGS = new Set(ES_SERVICE_SLUGS);
const PADDING = 32;

type GroupedBlock = {
  eyebrow?: string;
  body: string;
  media?: ContentSection["media"];
};

function groupSections(sections: ContentSection[]): { heading: string; blocks: GroupedBlock[] }[] {
  const groups: { heading: string; blocks: GroupedBlock[] }[] = [];
  let current: { heading: string; blocks: GroupedBlock[] } | null = null;
  for (const s of sections) {
    if (!current || current.heading !== s.heading) {
      current = { heading: s.heading, blocks: [] };
      groups.push(current);
    }
    current.blocks.push({
      eyebrow: s.eyebrow,
      body: s.body,
      media: s.media,
    });
  }
  return groups;
}

export async function generateStaticParams() {
  return PROJECT_DETAILS.filter(
    (d) => !COLLECTION_SLUGS.has(d.slug as (typeof ES_SERVICE_SLUGS)[number])
  ).map((d) => ({ slug: d.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (COLLECTION_SLUGS.has(slug as (typeof ES_SERVICE_SLUGS)[number])) return {};
  const detail = getProjectDetailBySlug(slug);
  if (!detail) return { title: "Proyecto" };
  const description =
    detail.overview.slice(0, 155) + (detail.overview.length > 155 ? "…" : "");
  const ogImage = detail.ogImage ?? detail.coverImage;
  const canonical = `${siteUrl}/es/proyectos/${slug}`;
  return {
    title: `${detail.title} – ${detail.servicePrimary} | enblanco`,
    description,
    alternates: {
      canonical,
      languages: {
        es: `/es/proyectos/${slug}`,
        en: `/en/projects/${slug}`,
        "x-default": `/es/proyectos/${slug}`,
      },
    },
    openGraph: {
      title: `${detail.title} – ${detail.servicePrimary} | enblanco`,
      description,
      url: canonical,
      images: ogImage ? [{ url: ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage}` }] : [],
    },
  };
}

function buildCaseStudyJsonLd(detail: ProjectDetail) {
  const canonical = `${siteUrl}/es/proyectos/${detail.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "CaseStudy",
    name: detail.title,
    about: [
      "Naming",
      "Brand Strategy",
      "Identidad visual",
      "Litografía",
      ...detail.services.slice(0, 3),
    ],
    dateCreated: detail.year,
    industry: detail.industry,
    author: {
      "@type": "Organization",
      name: "enblanco",
      url: siteUrl,
    },
    provider: {
      "@type": "Organization",
      name: "enblanco",
      url: siteUrl,
    },
    url: canonical,
    image: detail.coverImage.startsWith("http") ? detail.coverImage : `${siteUrl}${detail.coverImage}`,
  };
}

function buildFaqJsonLd(detail: ProjectDetail) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: detail.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export default async function ProyectoSlugPage({ params }: Props) {
  const { slug } = await params;
  if (COLLECTION_SLUGS.has(slug as (typeof ES_SERVICE_SLUGS)[number])) notFound();
  const detail = getProjectDetailBySlug(slug);
  if (!detail) notFound();

  const related = getRelatedProjectDetails(detail);
  const grouped = groupSections(detail.sections);
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "inicio", item: `${siteUrl}/es` },
      { "@type": "ListItem", position: 2, name: "proyectos", item: `${siteUrl}/es/proyectos` },
      { "@type": "ListItem", position: 3, name: detail.title, item: `${siteUrl}/es/proyectos/${slug}` },
    ],
  };
  const caseStudyJsonLd = buildCaseStudyJsonLd(detail);
  const faqJsonLd = buildFaqJsonLd(detail);

  return (
    <main className="page mx-auto min-h-screen max-w-[1600px] pb-20">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={caseStudyJsonLd} />
      <JsonLd data={faqJsonLd} />

      {/* Hero: imagen de portada con padding 32px y border-radius 8px */}
      <header
        className="relative mx-auto mt-0 w-full"
        style={{ paddingLeft: PADDING, paddingRight: PADDING, paddingTop: PADDING }}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[8px] bg-[var(--color-bg)] md:aspect-[16/9]">
          <Image
            src={detail.coverImage}
            alt={detail.coverAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 1600px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 flex flex-col justify-between p-6 text-white md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <h1 className="text-3xl font-normal tracking-tight md:text-4xl lg:text-5xl">
                {detail.title}
              </h1>
              <span className="text-base opacity-90 md:text-lg">{detail.year}</span>
            </div>
            <div className="flex justify-center md:justify-end">
              <span className="text-base opacity-90 md:text-lg">{detail.industry}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Dos columnas: servicios (izq) + Overview (derecha) */}
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

      {/* Bloques de contenido: H2, H3 (eyebrow), body, media opcional */}
      {grouped.map((group, groupIndex) => {
        const sectionId = group.heading
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "");
        return (
          <article
            key={groupIndex}
            id={sectionId}
            aria-labelledby={`${sectionId}-heading`}
            className="mx-auto w-full py-8"
            style={{ paddingLeft: PADDING, paddingRight: PADDING }}
          >
            <h2
              id={`${sectionId}-heading`}
              className="mb-6 text-xl font-normal tracking-tight"
            >
              {group.heading}
            </h2>
            <div className="space-y-10">
              {group.blocks.map((block, blockIndex) => (
                <div key={blockIndex} className="space-y-4">
                  {block.eyebrow && (
                    <h3 className="text-sm font-normal uppercase tracking-wide opacity-80">
                      {block.eyebrow}
                    </h3>
                  )}
                  <div className="whitespace-pre-line text-base leading-relaxed opacity-90">
                    {block.body}
                  </div>
                  {block.media && (
                    <div className="mt-6">
                      <ProjectDetailMedia media={block.media} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </article>
        );
      })}

      {/* FAQ */}
      {detail.faqs.length > 0 && (
        <ProjectDetailFaq items={detail.faqs} id="faq-proyecto" />
      )}

      {/* Proyectos relacionados */}
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
                  <Link
                    href={`/es/proyectos/${detailSlug}`}
                    className="block font-normal no-underline opacity-90 transition-opacity hover:opacity-100"
                  >
                    <span className="font-normal">{p.title}</span>
                    <span className="ml-1 text-sm opacity-80">
                      — {p.industry} · {p.year}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-sm opacity-80">
            <Link href="/es/proyectos/branding" className="underline">
              Ver más proyectos de branding
            </Link>{" "}
            o{" "}
            <Link href="/es/proyectos" className="underline">
              todos los proyectos
            </Link>
            .
          </p>
        )}
      </section>
    </main>
  );
}
