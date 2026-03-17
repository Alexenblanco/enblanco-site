import { cache } from "react";
import {
  getIndexableNoteSlugsByLangFromSanity,
  getNoteBySlugFromSanity,
  getNoteSlugsByLangFromSanity,
  getNotesByLangFromSanity,
  type SanityNoteDetailItem,
  type SanityNoteListItem,
} from "@/lib/sanity/queries";
import { SITE_NAME } from "@/lib/site-config";

export type Locale = "es" | "en";

export type NoteItem = {
  slug: string;
  index: string;
  type: string;
  title: string;
  date: string;
  displayDate: string;
  author: string;
  description?: string;
  body?: string[];
};

type NoteAlternatePaths = Partial<Record<"es" | "en" | "x-default", string>>;

const AUTHOR_NAMES: Record<string, string> = {
  clara: "clara",
  alex: "alex",
};

const MONTHS: Record<Locale, string[]> = {
  es: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
  en: ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"],
};

function truncate(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value;
  return value.slice(0, maxLength).trimEnd() + "…";
}

function normalizeText(value: string | null | undefined): string {
  return typeof value === "string" ? value.trim() : "";
}

function padIndex(position: number, total: number): string {
  const width = Math.max(2, String(total).length);
  return String(Math.max(total - position, 1)).padStart(width, "0");
}

function formatDisplayDate(date: string, lang: Locale): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;

  const month = MONTHS[lang][parsed.getUTCMonth()] ?? MONTHS[lang][0];
  return `${month} ${parsed.getUTCFullYear()}`;
}

function portableTextToParagraphs(
  body: SanityNoteDetailItem["body"]
): string[] | undefined {
  if (!Array.isArray(body)) return undefined;

  const paragraphs = body
    .map((block) => {
      if (!block || block._type !== "block" || !Array.isArray(block.children)) return "";
      return block.children
        .map((child) => normalizeText(child?.text))
        .filter(Boolean)
        .join("");
    })
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return paragraphs.length > 0 ? paragraphs : undefined;
}

function getNotePath(lang: Locale, slug: string): string {
  return lang === "es" ? `/es/notas/${slug}` : `/en/notes/${slug}`;
}

function toNoteItem(
  note: SanityNoteListItem,
  lang: Locale,
  position: number,
  total: number
): NoteItem {
  const slug = normalizeText(note.slug);
  const title = normalizeText(note.title);
  const type = normalizeText(note.type);
  const author = getAuthorDisplayName(normalizeText(note.author));
  const date = normalizeText(note.publishedAt);

  return {
    slug,
    index: padIndex(position, total),
    type,
    title,
    date,
    displayDate: formatDisplayDate(date, lang),
    author,
    description: normalizeText(note.excerpt) || undefined,
  };
}

const getNotesByLangCached = cache(async (lang: Locale): Promise<NoteItem[]> => {
  const notes = await getNotesByLangFromSanity(lang);
  const total = notes.length;

  return notes.map((note, index) => toNoteItem(note, lang, index, total));
});

const getNoteDetailCached = cache(
  async (lang: Locale, slug: string): Promise<SanityNoteDetailItem | null> =>
    getNoteBySlugFromSanity(lang, slug)
);

export function hasNoteBody(note: NoteItem): boolean {
  return !!note.body?.some((paragraph) => paragraph.trim().length > 0);
}

export function getNoteBodyText(note: NoteItem): string {
  return (note.body ?? [])
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .join("\n\n");
}

export function getNoteSeoDescription(note: NoteItem, lang: Locale): string {
  if (note.description?.trim()) {
    return truncate(note.description.trim(), 160);
  }

  const bodyText = getNoteBodyText(note);
  if (bodyText) {
    return truncate(bodyText.replace(/\s+/g, " ").trim(), 160);
  }

  return lang === "es"
    ? `Nota de ${SITE_NAME} sobre ${note.type}.`
    : `${SITE_NAME} note about ${note.type}.`;
}

export function getNoteWordCount(note: NoteItem): number | undefined {
  const bodyText = getNoteBodyText(note);
  if (!bodyText) return undefined;

  const words = bodyText
    .split(/\s+/)
    .map((word) => word.trim())
    .filter(Boolean);

  return words.length > 0 ? words.length : undefined;
}

export function getAuthorDisplayName(author: string): string {
  return AUTHOR_NAMES[author] ?? author;
}

export async function getNotesByLang(lang: Locale): Promise<NoteItem[]> {
  return getNotesByLangCached(lang);
}

export async function getNoteBySlug(
  lang: Locale,
  slug: string
): Promise<NoteItem | null> {
  const [notes, detail] = await Promise.all([
    getNotesByLangCached(lang),
    getNoteDetailCached(lang, slug),
  ]);

  if (!detail) return null;

  const summary = notes.find((note) => note.slug === slug);
  if (!summary) return null;

  const body = portableTextToParagraphs(detail.body);
  const description = normalizeText(detail.excerpt) || summary.description;

  return {
    ...summary,
    ...(description ? { description } : {}),
    ...(body ? { body } : {}),
  };
}

export async function getOtherNotes(lang: Locale, slug: string): Promise<NoteItem[]> {
  const notes = await getNotesByLangCached(lang);
  return notes.filter((note) => note.slug !== slug);
}

export async function getAdjacentNotes(
  lang: Locale,
  slug: string
): Promise<{ previous: NoteItem | null; next: NoteItem | null }> {
  const notes = await getNotesByLangCached(lang);
  const index = notes.findIndex((note) => note.slug === slug);
  const total = notes.length;

  if (index === -1 || total <= 1) {
    return { previous: null, next: null };
  }

  const previousIndex = index === 0 ? total - 1 : index - 1;
  const nextIndex = index === total - 1 ? 0 : index + 1;

  return {
    previous: notes[previousIndex] ?? null,
    next: notes[nextIndex] ?? null,
  };
}

export async function getNoteAlternatePaths(
  lang: Locale,
  slug: string
): Promise<NoteAlternatePaths> {
  const detail = await getNoteDetailCached(lang, slug);
  if (!detail) return {};

  const languages: NoteAlternatePaths = {};
  const currentBody = portableTextToParagraphs(detail.body);

  if (currentBody && currentBody.length > 0) {
    languages[lang] = getNotePath(lang, slug);
    if (lang === "es") languages["x-default"] = languages.es;
  }

  const translation = detail.translation;
  if (
    translation?.language &&
    translation?.slug &&
    translation.hasBody
  ) {
    const translationPath = getNotePath(translation.language, translation.slug);
    languages[translation.language] = translationPath;
    if (translation.language === "es") languages["x-default"] = translationPath;
  }

  if (!languages["x-default"]) {
    if (languages.es) languages["x-default"] = languages.es;
    else if (languages.en) languages["x-default"] = languages.en;
  }

  return languages;
}

export async function getTranslatedNoteHref(
  sourceLang: Locale,
  slug: string,
  targetLang: Locale
): Promise<string | null> {
  const detail = await getNoteDetailCached(sourceLang, slug);
  if (!detail?.translation?.language || !detail.translation.slug) return null;
  if (detail.translation.language !== targetLang) return null;

  return getNotePath(targetLang, detail.translation.slug);
}

export async function getNoteSlugs(): Promise<string[]> {
  const [es, en] = await Promise.all([
    getNoteSlugsByLangFromSanity("es"),
    getNoteSlugsByLangFromSanity("en"),
  ]);

  return [...new Set([...es, ...en])];
}

export async function getIndexableNotasSlugsEs(): Promise<string[]> {
  return getIndexableNoteSlugsByLangFromSanity("es");
}

export async function getIndexableNotesSlugsEn(): Promise<string[]> {
  return getIndexableNoteSlugsByLangFromSanity("en");
}

export async function getNotasSlugsEs(): Promise<string[]> {
  return getNoteSlugsByLangFromSanity("es");
}

export async function getNotesSlugsEn(): Promise<string[]> {
  return getNoteSlugsByLangFromSanity("en");
}
