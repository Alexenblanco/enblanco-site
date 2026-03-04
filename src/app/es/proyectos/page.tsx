import type { Metadata } from "next";
import { Suspense } from "react";
import JsonLd from "@/components/Seo/JsonLd";
import ProjectsView from "@/components/projects/ProjectsView";

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
    <main className="proyectos-page mx-auto w-full max-w-[100vw] overflow-x-hidden">
      <JsonLd data={breadcrumbJsonLd} />
      <Suspense fallback={null}>
        <ProjectsView />
      </Suspense>
    </main>
  );
}
