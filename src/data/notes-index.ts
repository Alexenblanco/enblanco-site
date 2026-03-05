/**
 * Single source for notes (list, slug pages, RSS, sitemap).
 * Add or edit notes here only.
 */
export type NoteItem = {
  slug: string;
  index: string;
  type: string;
  title: string;
  date: string;
  author: string;
  description?: string;
};

export const NOTAS_ES: NoteItem[] = [
  {
    slug: "ejemplo",
    index: "01",
    type: "criterio",
    title: "Ejemplo de nota",
    date: "2025-01-15",
    author: "enblanco",
    description: "Nota de enblanco: criterio. 2025-01-15.",
  },
];

export const NOTES_EN: NoteItem[] = [
  {
    slug: "ejemplo",
    index: "01",
    type: "criteria",
    title: "Example note",
    date: "2025-01-15",
    author: "enblanco",
    description: "enblanco note: criteria. 2025-01-15.",
  },
];

/** For RSS and sitemap (same data, alias). */
export const NOTES_INDEX_ES = NOTAS_ES;
export const NOTES_INDEX_EN = NOTES_EN;

export type Locale = "es" | "en";

export function getNoteBySlug(
  lang: Locale,
  slug: string
): { title: string; date: string; author: string; type: string } | null {
  const list = lang === "es" ? NOTAS_ES : NOTES_EN;
  const note = list.find((n) => n.slug === slug);
  if (!note) return null;
  return {
    title: note.title,
    date: note.date,
    author: note.author,
    type: note.type,
  };
}
