import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import JsonLd from "@/components/Seo/JsonLd";
import NoteDetailReady from "@/components/notes/NoteDetailReady";
import NoteDetailView from "@/components/notes/NoteDetailView";
import { withLang, isValidLang } from "@/lib/i18n/path";
import { getNotasSlugsEsStatic } from "@/lib/static-routes";
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
  const slugs = await getNotasSlugsEsStatic();
  return slugs.map((slug) => ({ lang: "es" as const, slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isValidLang(lang) || lang === "en") return {};
  const nota = await getNoteBySlug("es", slug);
  if (!nota) return { title: "Nota" };
  return getNoteDetailMetadata({ lang: "es", slug, note: nota });
}

export default async function NotaSlugPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isValidLang(lang)) notFound();
  if (lang === "en") {
    const translatedHref =
      (await getTranslatedNoteHref("es", slug, "en")) ??
      withLang("en", "notes");
    redirect(translatedHref);
  }
  const nota = await getNoteBySlug("es", slug);
  if (!nota) notFound();
  const { previous, next } = await getAdjacentNotes("es", slug);
  const articleJsonLd = buildNoteArticleJsonLd({ lang: "es", slug, note: nota });
  const breadcrumbJsonLd = buildNoteBreadcrumbJsonLd({ lang: "es", slug, note: nota });

  return (
    <main>
      <NoteDetailReady />
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <NoteDetailView lang="es" note={nota} previousNote={previous} nextNote={next} />
    </main>
  );
}
