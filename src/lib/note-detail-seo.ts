import type { Metadata } from "next";
import {
  type Locale,
  type NoteItem,
  getAuthorDisplayName,
  getNoteAlternatePaths,
  getNoteBodyText,
  getNoteSeoDescription,
  getNoteWordCount,
  hasNoteBody,
} from "@/data/notes-index";
import { SITE_NAME } from "@/lib/site-config";
import { absoluteUrl } from "@/lib/seo";

type NoteDetailSeoParams = {
  lang: Locale;
  slug: string;
  note: NoteItem;
};

function getListPath(lang: Locale): string {
  return lang === "es" ? "/es/notas" : "/en/notes";
}

export function getNoteDetailPath(lang: Locale, slug: string): string {
  return lang === "es" ? `/es/notas/${slug}` : `/en/notes/${slug}`;
}

function getLanguageTag(lang: Locale): string {
  return lang === "es" ? "es-ES" : "en";
}

export async function getNoteDetailMetadata({
  lang,
  slug,
  note,
}: NoteDetailSeoParams): Promise<Metadata> {
  const description = getNoteSeoDescription(note, lang);
  const canonicalPath = getNoteDetailPath(lang, slug);
  const canonicalUrl = absoluteUrl(canonicalPath);
  const alternatePaths = await getNoteAlternatePaths(lang, slug);

  return {
    title: note.title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: alternatePaths,
    },
    openGraph: {
      type: "article",
      title: note.title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      publishedTime: note.date,
      modifiedTime: note.date,
      authors: [getAuthorDisplayName(note.author)],
      images: [
        {
          url: absoluteUrl("/og-default.jpg"),
          width: 1200,
          height: 630,
          alt: `${note.title} — ${SITE_NAME}`,
        },
      ],
    },
    robots: {
      index: hasNoteBody(note),
      follow: true,
    },
  };
}

export function buildNoteArticleJsonLd({
  lang,
  slug,
  note,
}: NoteDetailSeoParams): Record<string, unknown> {
  const canonicalUrl = absoluteUrl(getNoteDetailPath(lang, slug));
  const bodyText = getNoteBodyText(note);
  const wordCount = getNoteWordCount(note);
  const listUrl = absoluteUrl(getListPath(lang));

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: note.title,
    description: getNoteSeoDescription(note, lang),
    url: canonicalUrl,
    datePublished: note.date,
    dateModified: note.date,
    inLanguage: getLanguageTag(lang),
    author: {
      "@type": "Person",
      name: getAuthorDisplayName(note.author),
    },
    publisher: {
      "@id": `${absoluteUrl("/")}#organization`,
      "@type": "Organization",
      name: SITE_NAME,
      url: absoluteUrl("/"),
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo.png"),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    isPartOf: {
      "@type": "CollectionPage",
      "@id": listUrl,
      url: listUrl,
      name: lang === "es" ? "notas" : "notes",
    },
    ...(bodyText ? { articleBody: bodyText } : {}),
    ...(wordCount ? { wordCount } : {}),
  };
}

export function buildNoteBreadcrumbJsonLd({
  lang,
  slug,
  note,
}: NoteDetailSeoParams): Record<string, unknown> {
  const homeUrl = absoluteUrl(`/${lang}`);
  const listUrl = absoluteUrl(getListPath(lang));
  const detailUrl = absoluteUrl(getNoteDetailPath(lang, slug));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: lang === "es" ? "inicio" : "home",
        item: homeUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: lang === "es" ? "notas" : "notes",
        item: listUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: note.title,
        item: detailUrl,
      },
    ],
  };
}
