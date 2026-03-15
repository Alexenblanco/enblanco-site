import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import JsonLd from "@/components/Seo/JsonLd";
import NoteDetailView from "@/components/notes/NoteDetailView";
import { withLang, isValidLang } from "@/lib/i18n/path";
import { getNotesSlugsEn } from "@/lib/static-routes";
import { getAdjacentNotes, getNoteBySlug } from "@/data/notes-index";
import { getSiteUrl } from "@/lib/seo";

const siteUrl = getSiteUrl();

type Props = { params: Promise<{ lang: string; slug: string }> };

export async function generateStaticParams() {
  return getNotesSlugsEn().map((slug) => ({ lang: "en" as const, slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isValidLang(lang) || lang === "es") return {};
  const note = getNoteBySlug("en", slug);
  if (!note) return { title: "Note" };
  return {
    title: note.title,
    description: `enblanco note: ${note.type}. ${note.date}.`,
    alternates: {
      canonical: `/en/notes/${slug}`,
      languages: {
        es: `/es/notas/${slug}`,
        en: `/en/notes/${slug}`,
        "x-default": `/es/notas/${slug}`,
      },
    },
  };
}

export default async function NoteSlugPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isValidLang(lang)) notFound();
  if (lang === "es") redirect(withLang("es", `notas/${slug}`));
  const note = getNoteBySlug("en", slug);
  if (!note) notFound();
  const { previous, next } = getAdjacentNotes("en", slug);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: note.title,
    datePublished: note.date,
    dateModified: note.date,
    author: {
      "@type": "Person",
      name: note.author,
    },
    publisher: {
      "@type": "Organization",
      name: "enblanco",
      url: `${siteUrl}/en`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/en/notes/${slug}`,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "home", item: `${siteUrl}/en` },
      { "@type": "ListItem", position: 2, name: "notes", item: `${siteUrl}/en/notes` },
      { "@type": "ListItem", position: 3, name: note.title, item: `${siteUrl}/en/notes/${slug}` },
    ],
  };

  return (
    <main>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <NoteDetailView lang="en" note={note} previousNote={previous} nextNote={next} />
    </main>
  );
}
