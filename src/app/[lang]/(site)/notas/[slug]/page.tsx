import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import JsonLd from "@/components/Seo/JsonLd";
import NoteDetailView from "@/components/notes/NoteDetailView";
import { withLang, isValidLang } from "@/lib/i18n/path";
import { getNotasSlugsEs } from "@/lib/static-routes";
import { getAdjacentNotes, getNoteBySlug } from "@/data/notes-index";
import { getSiteUrl } from "@/lib/seo";

const siteUrl = getSiteUrl();

type Props = { params: Promise<{ lang: string; slug: string }> };

export async function generateStaticParams() {
  return getNotasSlugsEs().map((slug) => ({ lang: "es" as const, slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isValidLang(lang) || lang === "en") return {};
  const nota = getNoteBySlug("es", slug);
  if (!nota) return { title: "Nota" };
  return {
    title: nota.title,
    description: `Nota de enblanco: ${nota.type}. ${nota.date}.`,
    alternates: {
      canonical: `/es/notas/${slug}`,
      languages: {
        es: `/es/notas/${slug}`,
        en: `/en/notes/${slug}`,
        "x-default": `/es/notas/${slug}`,
      },
    },
  };
}

export default async function NotaSlugPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isValidLang(lang)) notFound();
  if (lang === "en") redirect(withLang("en", `notes/${slug}`));
  const nota = getNoteBySlug("es", slug);
  if (!nota) notFound();
  const { previous, next } = getAdjacentNotes("es", slug);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: nota.title,
    datePublished: nota.date,
    dateModified: nota.date,
    author: {
      "@type": "Person",
      name: nota.author,
    },
    publisher: {
      "@type": "Organization",
      name: "enblanco",
      url: `${siteUrl}/es`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/es/notas/${slug}`,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "inicio", item: `${siteUrl}/es` },
      { "@type": "ListItem", position: 2, name: "notas", item: `${siteUrl}/es/notas` },
      { "@type": "ListItem", position: 3, name: nota.title, item: `${siteUrl}/es/notas/${slug}` },
    ],
  };

  return (
    <main>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <NoteDetailView lang="es" note={nota} previousNote={previous} nextNote={next} />
    </main>
  );
}
