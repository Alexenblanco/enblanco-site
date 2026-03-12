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
  displayDate: string;
  author: string;
  description?: string;
};

export const NOTAS_ES: NoteItem[] = [
  {
    slug: "nada-de-mayusculas",
    index: "10",
    type: "decisión",
    title: "nada de mayúsculas",
    date: "2025-12-10",
    displayDate: "dic 2025",
    author: "clara",
    description: "nota de enblanco sobre decisiones de identidad verbal y criterio tipográfico.",
  },
  {
    slug: "el-momento-previo",
    index: "09",
    type: "pensamiento",
    title: "el momento previo",
    date: "2025-12-09",
    displayDate: "dic 2025",
    author: "clara",
    description: "nota de enblanco sobre procesos previos, criterio y preparación.",
  },
  {
    slug: "el-contexto-tambien-disena",
    index: "08",
    type: "criterio",
    title: "el contexto también diseña",
    date: "2025-12-08",
    displayDate: "dic 2025",
    author: "clara",
    description: "nota de enblanco sobre cómo el contexto condiciona las decisiones de diseño.",
  },
  {
    slug: "forzar-una-identidad-no-la-vuelve-real",
    index: "07",
    type: "reflexión",
    title: "forzar una identidad no la vuelve real",
    date: "2025-12-07",
    displayDate: "dic 2025",
    author: "alex",
    description: "nota de enblanco sobre autenticidad, posicionamiento y sistema de marca.",
  },
  {
    slug: "los-galgos",
    index: "06",
    type: "observación",
    title: "los galgos",
    date: "2025-12-06",
    displayDate: "dic 2025",
    author: "clara",
    description: "nota de enblanco sobre observación y referencias aplicadas al trabajo de marca.",
  },
  {
    slug: "no-tocamos-el-simbolo",
    index: "05",
    type: "decisión",
    title: "no tocamos el símbolo",
    date: "2025-12-05",
    displayDate: "dic 2025",
    author: "clara",
    description: "nota de enblanco sobre decisiones de identidad y preservación del sistema visual.",
  },
  {
    slug: "todas-las-marcas-necesitan-algo-nuevo",
    index: "04",
    type: "criterio",
    title: "¿todas las marcas necesitan algo nuevo?",
    date: "2025-12-04",
    displayDate: "dic 2025",
    author: "clara",
    description: "nota de enblanco sobre revisión crítica, continuidad y cambio en branding.",
  },
  {
    slug: "el-sistema-ya-estaba-creado",
    index: "03",
    type: "reflexión",
    title: "el sistema ya estaba creado",
    date: "2026-03-12",
    displayDate: "mar 2026",
    author: "alex",
    description: "nota de enblanco sobre sistemas preexistentes y lectura estratégica de marca.",
  },
  {
    slug: "ni-bien-ni-mal-se-trata-de-una-decision",
    index: "02",
    type: "pensamiento",
    title: "ni bien ni mal, se trata de una decisión",
    date: "2026-01-15",
    displayDate: "ene 2026",
    author: "alex",
    description: "nota de enblanco sobre criterio, elecciones de diseño y consecuencias.",
  },
  {
    slug: "dos-blancos",
    index: "01",
    type: "observación",
    title: "dos blancos",
    date: "2025-12-01",
    displayDate: "dic 2025",
    author: "clara",
    description: "nota de enblanco sobre contraste, matiz y decisiones visuales mínimas.",
  },
];

export const NOTES_EN: NoteItem[] = [
  {
    slug: "nada-de-mayusculas",
    index: "10",
    type: "decision",
    title: "no uppercase",
    date: "2025-12-10",
    displayDate: "dec 2025",
    author: "clara",
    description: "enblanco note on verbal identity decisions and typographic criteria.",
  },
  {
    slug: "el-momento-previo",
    index: "09",
    type: "thought",
    title: "the moment before",
    date: "2025-12-09",
    displayDate: "dec 2025",
    author: "clara",
    description: "enblanco note on preparation, process, and criteria.",
  },
  {
    slug: "el-contexto-tambien-disena",
    index: "08",
    type: "criteria",
    title: "context designs too",
    date: "2025-12-08",
    displayDate: "dec 2025",
    author: "clara",
    description: "enblanco note on how context shapes design decisions.",
  },
  {
    slug: "forzar-una-identidad-no-la-vuelve-real",
    index: "07",
    type: "reflection",
    title: "forcing an identity does not make it real",
    date: "2025-12-07",
    displayDate: "dec 2025",
    author: "alex",
    description: "enblanco note on authenticity, positioning, and brand systems.",
  },
  {
    slug: "los-galgos",
    index: "06",
    type: "observation",
    title: "the greyhounds",
    date: "2025-12-06",
    displayDate: "dec 2025",
    author: "clara",
    description: "enblanco note on observation and references applied to brand work.",
  },
  {
    slug: "no-tocamos-el-simbolo",
    index: "05",
    type: "decision",
    title: "we are not touching the symbol",
    date: "2025-12-05",
    displayDate: "dec 2025",
    author: "clara",
    description: "enblanco note on identity decisions and preserving an existing visual system.",
  },
  {
    slug: "todas-las-marcas-necesitan-algo-nuevo",
    index: "04",
    type: "criteria",
    title: "does every brand need something new?",
    date: "2025-12-04",
    displayDate: "dec 2025",
    author: "clara",
    description: "enblanco note on continuity, revision, and change in branding.",
  },
  {
    slug: "el-sistema-ya-estaba-creado",
    index: "03",
    type: "reflection",
    title: "the system was already there",
    date: "2026-03-12",
    displayDate: "mar 2026",
    author: "alex",
    description: "enblanco note on pre-existing systems and strategic reading of a brand.",
  },
  {
    slug: "ni-bien-ni-mal-se-trata-de-una-decision",
    index: "02",
    type: "thought",
    title: "neither right nor wrong, it is a decision",
    date: "2026-01-15",
    displayDate: "jan 2026",
    author: "alex",
    description: "enblanco note on criteria, design choices, and consequences.",
  },
  {
    slug: "dos-blancos",
    index: "01",
    type: "observation",
    title: "two whites",
    date: "2025-12-01",
    displayDate: "dec 2025",
    author: "clara",
    description: "enblanco note on contrast, nuance, and minimal visual decisions.",
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
