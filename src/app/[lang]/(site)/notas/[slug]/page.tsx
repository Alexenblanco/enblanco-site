import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import JsonLd from "@/components/Seo/JsonLd";
import ProjectDetailBlurWrapper from "@/components/projects/ProjectDetailBlurWrapper";
import NoteDetailReady from "@/components/notes/NoteDetailReady";
import NoteDetailView from "@/components/notes/NoteDetailView";
import { withLang, isValidLang } from "@/lib/i18n/path";
import { getNotasSlugsEs } from "@/lib/static-routes";
import { getAdjacentNotes, getNoteBySlug } from "@/data/notes-index";
import {
  buildNoteArticleJsonLd,
  buildNoteBreadcrumbJsonLd,
  getNoteDetailMetadata,
} from "@/lib/note-detail-seo";

type Props = { params: Promise<{ lang: string; slug: string }> };

export async function generateStaticParams() {
  return getNotasSlugsEs().map((slug) => ({ lang: "es" as const, slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isValidLang(lang) || lang === "en") return {};
  const nota = getNoteBySlug("es", slug);
  if (!nota) return { title: "Nota" };
  return getNoteDetailMetadata({ lang: "es", slug, note: nota });
}

export default async function NotaSlugPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isValidLang(lang)) notFound();
  if (lang === "en") redirect(withLang("en", `notes/${slug}`));
  const nota = getNoteBySlug("es", slug);
  if (!nota) notFound();
  const { previous, next } = getAdjacentNotes("es", slug);
  const articleJsonLd = buildNoteArticleJsonLd({ lang: "es", slug, note: nota });
  const breadcrumbJsonLd = buildNoteBreadcrumbJsonLd({ lang: "es", slug, note: nota });

  return (
    <ProjectDetailBlurWrapper>
      <main>
        <NoteDetailReady />
        <JsonLd data={articleJsonLd} />
        <JsonLd data={breadcrumbJsonLd} />
        <NoteDetailView lang="es" note={nota} previousNote={previous} nextNote={next} />
      </main>
    </ProjectDetailBlurWrapper>
  );
}
