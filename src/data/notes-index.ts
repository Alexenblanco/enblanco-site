/**
 * Single source for notes (list, slug pages, RSS, sitemap).
 * Add or edit notes here only.
 */
import { SITE_NAME } from "@/lib/site-config";

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

export const NOTAS_ES: NoteItem[] = [
  {
    slug: "editar-tambien-es-disenar",
    index: "20",
    type: "decisión",
    title: "editar también es diseñar",
    date: "2026-09-18",
    displayDate: "sep 2026",
    author: "clara",
    description: "nota de enblanco sobre edición, síntesis y criterio en sistemas de marca.",
  },
  {
    slug: "la-primera-version-siempre-sobra",
    index: "19",
    type: "pensamiento",
    title: "la primera versión siempre sobra",
    date: "2026-09-04",
    displayDate: "sep 2026",
    author: "alex",
    description: "nota de enblanco sobre iteración, descarte y precisión antes de publicar.",
  },
  {
    slug: "si-todo-destaca-nada-guia",
    index: "18",
    type: "criterio",
    title: "si todo destaca, nada guía",
    date: "2026-08-22",
    displayDate: "ago 2026",
    author: "clara",
    description: "nota de enblanco sobre jerarquía visual y foco en piezas editoriales.",
  },
  {
    slug: "el-silencio-en-una-interfaz",
    index: "17",
    type: "observación",
    title: "el silencio en una interfaz",
    date: "2026-08-07",
    displayDate: "ago 2026",
    author: "alex",
    description: "nota de enblanco sobre ritmo, aire y pausas en experiencias digitales.",
  },
  {
    slug: "una-marca-tambien-se-corrige",
    index: "16",
    type: "reflexión",
    title: "una marca también se corrige",
    date: "2026-07-26",
    displayDate: "jul 2026",
    author: "clara",
    description: "nota de enblanco sobre mejora continua y aprendizaje dentro del sistema de marca.",
  },
  {
    slug: "menos-recursos-mas-intencion",
    index: "15",
    type: "decisión",
    title: "menos recursos, más intención",
    date: "2026-07-11",
    displayDate: "jul 2026",
    author: "alex",
    description: "nota de enblanco sobre decisiones de producción y dirección creativa con límites reales.",
  },
  {
    slug: "no-todo-problema-es-de-diseno",
    index: "14",
    type: "criterio",
    title: "no todo problema es de diseño",
    date: "2026-06-27",
    displayDate: "jun 2026",
    author: "clara",
    description: "nota de enblanco sobre diagnóstico estratégico antes de ejecutar soluciones visuales.",
  },
  {
    slug: "el-tono-se-prueba-en-contexto",
    index: "13",
    type: "pensamiento",
    title: "el tono se prueba en contexto",
    date: "2026-06-12",
    displayDate: "jun 2026",
    author: "clara",
    description: "nota de enblanco sobre lenguaje, canal y adecuación editorial de la marca.",
  },
  {
    slug: "lo-urgente-no-siempre-es-lo-importante",
    index: "12",
    type: "observación",
    title: "lo urgente no siempre es lo importante",
    date: "2026-05-29",
    displayDate: "may 2026",
    author: "alex",
    description: "nota de enblanco sobre prioridades, calendario y decisiones de impacto real.",
  },
  {
    slug: "la-consistencia-tambien-emociona",
    index: "11",
    type: "reflexión",
    title: "la consistencia también emociona",
    date: "2026-05-15",
    displayDate: "may 2026",
    author: "clara",
    description: "nota de enblanco sobre coherencia, memoria de marca y vínculo a largo plazo.",
  },
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
    body: [
      "Antes incluso de empezar, había una duda sobre la mesa:",
      "La diéresis en Mernë.",
      "Nos preguntábamos si prescindir de ella. Visualmente podía simplificar el nombre, hacerlo más neutro, incluso acercarlo a un imaginario más nórdico. La decisión parecía casi técnica, y durante un momento dimos por hecho que acabaríamos eliminándola.",
      "Antes de recibir el briefing, esa era nuestra intuición.",
      "Habíamos preparado una serie de preguntas para entender el origen del estudio, cómo había nacido la marca, qué significaba para él, qué quería proyectar. Y fue ahí donde todo cambió.",
      "Al leer el briefing entendimos que la diéresis no era un adorno ni una rareza tipográfica. Era parte del origen del nombre, de su construcción y de su sentido. No estaba ahí para destacar, sino para ser fiel a una historia concreta.",
      "La decisión dejó de ser si eliminarla o no.",
      "Pasó a ser cómo trabajar con ella.",
      "En lugar de esconderla, la convertimos en el centro del sistema. Dos puntos que empezaron a ordenar la identidad gráfica, a generar ritmo, estructura y lenguaje propio. Lo que en un principio parecía un problema se convirtió en el elemento más reconocible del conjunto.",
      "A partir de ahí, el resto acompañó: una paleta cálida, un tono cercano, una identidad que ya no buscaba parecer otra cosa, sino expresar lo que siempre había estado ahí.",
      "La marca empezó a encajar.",
      "A veces creemos que una identidad necesita simplificarse eliminando elementos.",
      "Y otras veces, lo que necesita es ser leída con más atención.",
      "Porque entender bien el origen suele cambiar por completo las decisiones que parecían evidentes al principio.",
    ],
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
    body: [
      "Antes incluso de empezar, había una duda sobre la mesa:",
      "La diéresis en Mernë.",
      "Nos preguntábamos si prescindir de ella. Visualmente podía simplificar el nombre, hacerlo más neutro, incluso acercarlo a un imaginario más nórdico. La decisión parecía casi técnica, y durante un momento dimos por hecho que acabaríamos eliminándola.",
      "Antes de recibir el briefing, esa era nuestra intuición.",
      "Habíamos preparado una serie de preguntas para entender el origen del estudio, cómo había nacido la marca, qué significaba para él, qué quería proyectar. Y fue ahí donde todo cambió.",
      "Al leer el briefing entendimos que la diéresis no era un adorno ni una rareza tipográfica. Era parte del origen del nombre, de su construcción y de su sentido. No estaba ahí para destacar, sino para ser fiel a una historia concreta.",
      "La decisión dejó de ser si eliminarla o no.",
      "Pasó a ser cómo trabajar con ella.",
      "En lugar de esconderla, la convertimos en el centro del sistema. Dos puntos que empezaron a ordenar la identidad gráfica, a generar ritmo, estructura y lenguaje propio. Lo que en un principio parecía un problema se convirtió en el elemento más reconocible del conjunto.",
      "A partir de ahí, el resto acompañó: una paleta cálida, un tono cercano, una identidad que ya no buscaba parecer otra cosa, sino expresar lo que siempre había estado ahí.",
      "La marca empezó a encajar.",
      "A veces creemos que una identidad necesita simplificarse eliminando elementos.",
      "Y otras veces, lo que necesita es ser leída con más atención.",
      "Porque entender bien el origen suele cambiar por completo las decisiones que parecían evidentes al principio.",
    ],
  },
];

export const NOTES_EN: NoteItem[] = [
  {
    slug: "editar-tambien-es-disenar",
    index: "20",
    type: "decision",
    title: "editing is also designing",
    date: "2026-09-18",
    displayDate: "sep 2026",
    author: "clara",
    description: "enblanco note on editing, synthesis, and criteria in brand systems.",
  },
  {
    slug: "la-primera-version-siempre-sobra",
    index: "19",
    type: "thought",
    title: "the first version is always too much",
    date: "2026-09-04",
    displayDate: "sep 2026",
    author: "alex",
    description: "enblanco note on iteration, elimination, and precision before release.",
  },
  {
    slug: "si-todo-destaca-nada-guia",
    index: "18",
    type: "criteria",
    title: "if everything stands out, nothing guides",
    date: "2026-08-22",
    displayDate: "aug 2026",
    author: "clara",
    description: "enblanco note on hierarchy and focus in editorial design pieces.",
  },
  {
    slug: "el-silencio-en-una-interfaz",
    index: "17",
    type: "observation",
    title: "silence in an interface",
    date: "2026-08-07",
    displayDate: "aug 2026",
    author: "alex",
    description: "enblanco note on rhythm, spacing, and pauses in digital experiences.",
  },
  {
    slug: "una-marca-tambien-se-corrige",
    index: "16",
    type: "reflection",
    title: "a brand is also corrected",
    date: "2026-07-26",
    displayDate: "jul 2026",
    author: "clara",
    description: "enblanco note on continuous improvement and learning inside a brand system.",
  },
  {
    slug: "menos-recursos-mas-intencion",
    index: "15",
    type: "decision",
    title: "fewer resources, more intention",
    date: "2026-07-11",
    displayDate: "jul 2026",
    author: "alex",
    description: "enblanco note on production decisions and creative direction under real constraints.",
  },
  {
    slug: "no-todo-problema-es-de-diseno",
    index: "14",
    type: "criteria",
    title: "not every problem is design",
    date: "2026-06-27",
    displayDate: "jun 2026",
    author: "clara",
    description: "enblanco note on strategic diagnosis before visual execution.",
  },
  {
    slug: "el-tono-se-prueba-en-contexto",
    index: "13",
    type: "thought",
    title: "tone is tested in context",
    date: "2026-06-12",
    displayDate: "jun 2026",
    author: "clara",
    description: "enblanco note on language, channel, and editorial fit.",
  },
  {
    slug: "lo-urgente-no-siempre-es-lo-importante",
    index: "12",
    type: "observation",
    title: "urgent is not always important",
    date: "2026-05-29",
    displayDate: "may 2026",
    author: "alex",
    description: "enblanco note on priorities, timing, and real impact decisions.",
  },
  {
    slug: "la-consistencia-tambien-emociona",
    index: "11",
    type: "reflection",
    title: "consistency can also be emotional",
    date: "2026-05-15",
    displayDate: "may 2026",
    author: "clara",
    description: "enblanco note on coherence, brand memory, and long-term connection.",
  },
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
    body: [
      "Before we even started, there was a question on the table:",
      "The diaeresis in Mernë.",
      "We wondered whether to drop it. Visually it could simplify the name, make it more neutral, even bring it closer to a more Nordic feel. The decision seemed almost technical, and for a moment we assumed we would end up removing it.",
      "Before we received the briefing, that was our intuition.",
      "We had prepared a set of questions to understand the origin of the studio, how the brand had been born, what it meant to them, what they wanted to project. And that was where everything changed.",
      "When we read the briefing we understood that the diaeresis was not an ornament or a typographic oddity. It was part of the origin of the name, of its construction and meaning. It was not there to stand out, but to be faithful to a specific story.",
      "The decision was no longer whether to remove it or not.",
      "It became how to work with it.",
      "Instead of hiding it, we made it the centre of the system. Two dots that began to organise the visual identity, to create rhythm, structure and a language of its own. What had at first seemed like a problem became the most recognisable element of the whole.",
      "From there, the rest followed: a warm palette, a close tone, an identity that no longer sought to look like something else, but to express what had always been there.",
      "The brand began to fit.",
      "Sometimes we think an identity needs to be simplified by removing elements.",
      "And other times, what it needs is to be read with more attention.",
      "Because understanding the origin well often changes completely the decisions that seemed obvious at the start.",
    ],
  },
];

/** For RSS and sitemap (same data, alias). */
export const NOTES_INDEX_ES = NOTAS_ES;
export const NOTES_INDEX_EN = NOTES_EN;

export type Locale = "es" | "en";

const AUTHOR_NAMES: Record<string, string> = {
  clara: "Clara",
  alex: "Alex",
};

function truncate(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value;
  return value.slice(0, maxLength).trimEnd() + "…";
}

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

export function getNoteBySlug(
  lang: Locale,
  slug: string
): NoteItem | null {
  const list = lang === "es" ? NOTAS_ES : NOTES_EN;
  return list.find((n) => n.slug === slug) ?? null;
}

export function getAdjacentNotes(
  lang: Locale,
  slug: string
): { previous: NoteItem | null; next: NoteItem | null } {
  const list = lang === "es" ? NOTAS_ES : NOTES_EN;
  const index = list.findIndex((note) => note.slug === slug);
  const total = list.length;

  if (index === -1 || total <= 1) {
    return { previous: null, next: null };
  }

  const previousIndex = index === 0 ? total - 1 : index - 1;
  const nextIndex = index === total - 1 ? 0 : index + 1;

  return {
    previous: list[previousIndex] ?? null,
    next: list[nextIndex] ?? null,
  };
}
