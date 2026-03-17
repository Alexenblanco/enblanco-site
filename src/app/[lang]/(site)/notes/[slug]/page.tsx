import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import JsonLd from "@/components/Seo/JsonLd";
import NoteDetailReady from "@/components/notes/NoteDetailReady";
import NoteDetailView from "@/components/notes/NoteDetailView";
import { withLang, isValidLang } from "@/lib/i18n/path";
import { getNotesSlugsEnStatic } from "@/lib/static-routes";
import {
  getAdjacentNotes,
  getNoteBySlug,
  getTranslatedNoteHref,
} from "@/data/notes-index";
import {
  buildNoteArticleJsonLd,
  buildNoteBreadcrumbJsonLd,
  getNoteDetailMetadata,
} from "@/lib/note-detail-seo";

type Props = { params: Promise<{ lang: string; slug: string }> };

export async function generateStaticParams() {
  const slugs = await getNotesSlugsEnStatic();
  return slugs.map((slug) => ({ lang: "en" as const, slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isValidLang(lang) || lang === "es") return {};
  const note = await getNoteBySlug("en", slug);
  if (!note) return { title: "Note" };
  return getNoteDetailMetadata({ lang: "en", slug, note });
}

export default async function NoteSlugPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isValidLang(lang)) notFound();
  if (lang === "es") {
    const translatedHref =
      (await getTranslatedNoteHref("en", slug, "es")) ??
      withLang("es", "notas");
    redirect(translatedHref);
  }
  const note = await getNoteBySlug("en", slug);
  if (!note) notFound();
  const { previous, next } = await getAdjacentNotes("en", slug);
  const articleJsonLd = buildNoteArticleJsonLd({ lang: "en", slug, note });
  const breadcrumbJsonLd = buildNoteBreadcrumbJsonLd({ lang: "en", slug, note });

  return (
    <main>
      <NoteDetailReady />
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <NoteDetailView lang="en" note={note} previousNote={previous} nextNote={next} />
    </main>
  );
}
