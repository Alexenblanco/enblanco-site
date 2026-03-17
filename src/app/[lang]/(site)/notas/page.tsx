import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import JsonLd from "@/components/Seo/JsonLd";
import NotesIndexView from "@/components/notes/NotesIndexView";
import { withLang, isValidLang } from "@/lib/i18n/path";
import { getNotesByLang } from "@/data/notes-index";
import { getSiteUrl } from "@/lib/seo";

const siteUrl = getSiteUrl();

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang) || lang === "en") return {};
  return {
    title: "notas sobre creatividad, diseño y procesos de marca en enblanco",
    description:
      "Notas sobre creatividad, diseño y procesos de marca en enblanco. Decisiones, matices y criterios aplicados.",
    alternates: {
      canonical: "/es/notas",
      languages: { es: "/es/notas", en: "/en/notes", "x-default": "/es/notas" },
    },
    openGraph: {
      title: "notas sobre creatividad, diseño y procesos de marca en enblanco — enblanco",
      description:
        "Notas sobre creatividad, diseño y procesos de marca en enblanco. Decisiones, matices y criterios aplicados.",
      url: `${siteUrl}/es/notas`,
      siteName: "enblanco",
      images: [{ url: `${siteUrl}/og-default.jpg`, width: 1200, height: 630, alt: "enblanco" }],
    },
    robots: { index: true, follow: true },
  };
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "inicio", item: `${siteUrl}/es` },
    { "@type": "ListItem", position: 2, name: "notas", item: `${siteUrl}/es/notas` },
  ],
};

export default async function NotasPage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();
  if (lang === "en") redirect(withLang("en", "notes"));
  const notes = await getNotesByLang("es");
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    numberOfItems: notes.length,
    itemListElement: notes.map((nota, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteUrl}/es/notas/${nota.slug}`,
      name: nota.title,
    })),
  };

  return (
    <main className="mx-auto max-w-[1440px] px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={itemListJsonLd} />
      <NotesIndexView
        lang="es"
        notes={notes}
        headingLead="notas"
        headingFirstLineRemainder="sobre creatividad,"
        headingLines={["diseño y procesos de", "marca en enblanco."]}
        introLines={[
          "una colección de",
          "decisiones, matices y",
          "criterios aplicados en el",
          "trabajo de enblanco.",
        ]}
        listHeading="índice de notas"
        emptyText="las notas se listarán aquí."
      />
    </main>
  );
}
