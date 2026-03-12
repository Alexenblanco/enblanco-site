import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import JsonLd from "@/components/Seo/JsonLd";
import NotesIndexView from "@/components/notes/NotesIndexView";
import { withLang, isValidLang } from "@/lib/i18n/path";
import { NOTES_EN } from "@/data/notes-index";
import { getSiteUrl } from "@/lib/seo";

const siteUrl = getSiteUrl();

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang) || lang === "es") return {};
  return {
    title: "notes on creativity, design, and brand process at enblanco",
    description:
      "Notes on creativity, design, and brand process at enblanco. Decisions, nuances, and criteria applied in our work.",
    alternates: {
      canonical: "/en/notes",
      languages: { es: "/es/notas", en: "/en/notes", "x-default": "/es/notas" },
    },
    openGraph: {
      title: "notes on creativity, design, and brand process at enblanco — enblanco",
      description:
        "Notes on creativity, design, and brand process at enblanco. Decisions, nuances, and criteria applied in our work.",
      url: `${siteUrl}/en/notes`,
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
    { "@type": "ListItem", position: 1, name: "home", item: `${siteUrl}/en` },
    { "@type": "ListItem", position: 2, name: "notes", item: `${siteUrl}/en/notes` },
  ],
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListOrder: "https://schema.org/ItemListOrderDescending",
  numberOfItems: NOTES_EN.length,
  itemListElement: NOTES_EN.map((note, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `${siteUrl}/en/notes/${note.slug}`,
    name: note.title,
  })),
};

export default async function NotesPage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();
  if (lang === "es") redirect(withLang("es", "notas"));

  return (
    <main className="mx-auto max-w-[1440px] px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={itemListJsonLd} />
      <NotesIndexView
        lang="en"
        notes={NOTES_EN}
        headingLead="notes"
        headingFirstLineRemainder="on creativity,"
        headingLines={["design, and brand process", "at enblanco"]}
        introLines={[
          "a collection of",
          "decisions, nuances, and",
          "criteria applied in",
          "enblanco's work.",
        ]}
        listHeading="notes index"
        emptyText="notes will be listed here."
      />
    </main>
  );
}
