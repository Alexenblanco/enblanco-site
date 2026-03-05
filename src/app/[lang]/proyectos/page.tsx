import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import JsonLd from "@/components/Seo/JsonLd";
import ProjectsView from "@/components/projects/ProjectsView";
import { getListingProjects } from "@/content/projects";
import { isValidLang } from "@/lib/i18n/path";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== "es") return {};
  return {
    title: "proyectos",
    description:
      "Selección de trabajos de enblanco: branding, diseño y dirección con criterio.",
    alternates: {
      canonical: "/es/proyectos",
      languages: { es: "/es/proyectos", en: "/en/projects", "x-default": "/es/proyectos" },
    },
  };
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "inicio", item: `${siteUrl}/es` },
    { "@type": "ListItem", position: 2, name: "proyectos", item: `${siteUrl}/es/proyectos` },
  ],
};

export default async function ProyectosPage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLang(lang) || lang !== "es") notFound();

  const listingProjects = getListingProjects();
  return (
    <main className="proyectos-page mx-auto w-full max-w-[100vw] overflow-x-hidden">
      <JsonLd data={breadcrumbJsonLd} />
      <Suspense fallback={null}>
        <ProjectsView listingProjects={listingProjects} />
      </Suspense>
    </main>
  );
}
