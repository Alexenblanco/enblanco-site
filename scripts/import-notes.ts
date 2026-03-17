import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@sanity/client";

type Locale = "es" | "en";
type NoteAuthor = "alex" | "clara";

type PortableTextSpan = {
  _key: string;
  _type: "span";
  marks: string[];
  text: string;
};

type PortableTextBlock = {
  _key: string;
  _type: "block";
  children: PortableTextSpan[];
  markDefs: [];
  style: "normal";
};

type SanityImageField = {
  _type: "image";
  asset: {
    _type: "reference";
    _ref: string;
  };
};

type InputNote = {
  translationKey?: string;
  title?: unknown;
  slug?: unknown;
  language?: unknown;
  type?: unknown;
  author?: unknown;
  publishedAt?: unknown;
  excerpt?: unknown;
  body?: unknown;
  cover?: unknown;
  translationOf?: unknown;
};

type NormalizedInputNote = {
  translationKey?: string;
  title: string;
  slug: string;
  language: Locale;
  type: string;
  author: NoteAuthor;
  publishedAt: string;
  excerpt?: string;
  body?: PortableTextBlock[];
  cover?: SanityImageField;
  translationOfSlug?: string;
};

type ExistingNote = {
  _id: string;
  slug: string;
  language: Locale;
  translationOf?: { _id?: string } | null;
};

type ProcessedNote = NormalizedInputNote & {
  documentId: string;
  existed: boolean;
};

type Summary = {
  created: number;
  updated: number;
  omitted: number;
  errors: number;
};

const SUPPORTED_LANGUAGES = new Set<Locale>(["es", "en"]);
const SUPPORTED_AUTHORS = new Set<NoteAuthor>(["alex", "clara"]);

function randomKey(): string {
  return Math.random().toString(36).slice(2, 12);
}

function loadLocalEnv() {
  const envFiles = [".env.local", ".env"];

  for (const file of envFiles) {
    const absolute = resolve(process.cwd(), file);
    if (!existsSync(absolute)) continue;

    const content = readFileSync(absolute, "utf8");
    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      const separatorIndex = trimmed.indexOf("=");
      if (separatorIndex === -1) continue;

      const key = trimmed.slice(0, separatorIndex).trim();
      if (!key || process.env[key]) continue;

      const rawValue = trimmed.slice(separatorIndex + 1).trim();
      process.env[key] = rawValue.replace(/^['"]|['"]$/g, "");
    }
  }
}

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function asNonEmptyString(value: unknown, field: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`El campo "${field}" es obligatorio y debe ser texto no vacío.`);
  }

  return value.trim();
}

function normalizeOptionalString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function normalizeLanguage(value: unknown): Locale {
  const language = asNonEmptyString(value, "language") as Locale;
  if (!SUPPORTED_LANGUAGES.has(language)) {
    throw new Error(`language inválido "${language}". Solo se permite "es" o "en".`);
  }
  return language;
}

function normalizeAuthor(value: unknown): NoteAuthor {
  const author = asNonEmptyString(value, "author") as NoteAuthor;
  if (!SUPPORTED_AUTHORS.has(author)) {
    throw new Error(`author inválido "${author}". Solo se permite "alex" o "clara".`);
  }
  return author;
}

function normalizePublishedAt(value: unknown): string {
  const publishedAt = asNonEmptyString(value, "publishedAt");
  const parsed = new Date(publishedAt);

  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`publishedAt inválido "${publishedAt}". Debe ser una fecha ISO válida.`);
  }

  return parsed.toISOString();
}

function toPortableTextBlocks(body: unknown): PortableTextBlock[] | undefined {
  if (body == null) return undefined;

  if (typeof body === "string") {
    const paragraphs = body
      .split(/\n\s*\n+/)
      .map((paragraph) => paragraph.replace(/\s*\n\s*/g, " ").trim())
      .filter(Boolean);

    return paragraphs.length > 0
      ? paragraphs.map((paragraph) => ({
          _key: randomKey(),
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: randomKey(),
              _type: "span",
              marks: [],
              text: paragraph,
            },
          ],
        }))
      : undefined;
  }

  if (Array.isArray(body)) {
    if (body.every((item) => typeof item === "string")) {
      const paragraphs = body.map((item) => item.trim()).filter(Boolean);
      return paragraphs.length > 0
        ? paragraphs.map((paragraph) => ({
            _key: randomKey(),
            _type: "block",
            style: "normal",
            markDefs: [],
            children: [
              {
                _key: randomKey(),
                _type: "span",
                marks: [],
                text: paragraph,
              },
            ],
          }))
        : undefined;
    }

    if (
      body.every(
        (item) =>
          !!item &&
          typeof item === "object" &&
          "_type" in item &&
          (item as { _type?: unknown })._type === "block"
      )
    ) {
      return body as PortableTextBlock[];
    }
  }

  throw new Error(
    'El campo "body" debe ser string, string[] o Portable Text válido.'
  );
}

function normalizeCover(value: unknown): SanityImageField | undefined {
  if (value == null || value === "") return undefined;

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return undefined;
    if (!trimmed.startsWith("image-")) {
      throw new Error(
        'El campo "cover" como string debe ser un asset ref de Sanity que empiece por "image-".'
      );
    }

    return {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: trimmed,
      },
    };
  }

  if (
    typeof value === "object" &&
    value &&
    "asset" in value &&
    typeof (value as { asset?: { _ref?: unknown } }).asset?._ref === "string"
  ) {
    return value as SanityImageField;
  }

  throw new Error(
    'El campo "cover" debe ir vacío, como asset ref string de Sanity o como objeto image válido.'
  );
}

function buildDocumentId(language: Locale, slug: string): string {
  return `note-${language}-${slug}`;
}

function buildSlugField(slug: string) {
  return {
    _type: "slug" as const,
    current: slugify(slug),
  };
}

function normalizeRecord(record: InputNote): NormalizedInputNote {
  const title = asNonEmptyString(record.title, "title");
  const slugInput = asNonEmptyString(record.slug, "slug");
  const slug = slugify(slugInput);
  if (!slug) {
    throw new Error(`No se pudo generar un slug válido a partir de "${slugInput}".`);
  }

  return {
    translationKey: normalizeOptionalString(record.translationKey),
    title,
    slug,
    language: normalizeLanguage(record.language),
    type: asNonEmptyString(record.type, "type"),
    author: normalizeAuthor(record.author),
    publishedAt: normalizePublishedAt(record.publishedAt),
    excerpt: normalizeOptionalString(record.excerpt),
    body: toPortableTextBlocks(record.body),
    cover: normalizeCover(record.cover),
    translationOfSlug: normalizeOptionalString(record.translationOf),
  };
}

function getInputPath(argv: string[]): string {
  const fileArg = argv.find((arg) => !arg.startsWith("--"));
  if (!fileArg) {
    throw new Error(
      "Uso: npm run sanity:import-notes -- <ruta-json> [--dry-run]"
    );
  }

  return resolve(process.cwd(), fileArg);
}

function getFlags(argv: string[]) {
  return {
    dryRun: argv.includes("--dry-run"),
  };
}

function loadInputNotes(filePath: string): NormalizedInputNote[] {
  if (!existsSync(filePath)) {
    throw new Error(`No existe el archivo JSON: ${filePath}`);
  }

  const raw = readFileSync(filePath, "utf8");
  const parsed = JSON.parse(raw) as unknown;
  if (!Array.isArray(parsed)) {
    throw new Error("El archivo JSON debe contener un array de notas.");
  }

  return parsed.map((item, index) => {
    try {
      return normalizeRecord(item as InputNote);
    } catch (error) {
      throw new Error(
        `Error en el elemento ${index + 1}: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  });
}

function validateTranslationGroups(notes: NormalizedInputNote[]) {
  const byKey = new Map<string, Map<Locale, NormalizedInputNote>>();
  const seenNoteKeys = new Set<string>();

  for (const note of notes) {
    const uniqueKey = `${note.language}:${note.slug}`;
    if (seenNoteKeys.has(uniqueKey)) {
      throw new Error(
        `Hay dos entradas con la misma combinación slug + language: ${uniqueKey}`
      );
    }
    seenNoteKeys.add(uniqueKey);

    if (!note.translationKey) continue;

    const group = byKey.get(note.translationKey) ?? new Map<Locale, NormalizedInputNote>();
    if (group.has(note.language)) {
      throw new Error(
        `translationKey "${note.translationKey}" tiene más de una nota para "${note.language}".`
      );
    }
    group.set(note.language, note);
    byKey.set(note.translationKey, group);
  }
}

function createWriteClient() {
  loadLocalEnv();

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01";
  const token = process.env.SANITY_API_WRITE_TOKEN ?? "";

  if (!projectId) {
    throw new Error("Falta NEXT_PUBLIC_SANITY_PROJECT_ID.");
  }

  if (!token) {
    throw new Error("Falta SANITY_API_WRITE_TOKEN.");
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
    perspective: "published",
  });
}

async function fetchExistingNotes(
  client: ReturnType<typeof createWriteClient>,
  slugs: string[]
): Promise<Map<string, ExistingNote>> {
  if (slugs.length === 0) return new Map();

  const rows = await client.fetch<ExistingNote[]>(
    `*[_type == "note" && slug.current in $slugs]{
      _id,
      language,
      "slug": slug.current,
      "translationOf": translationOf->{_id}
    }`,
    { slugs }
  );

  const map = new Map<string, ExistingNote>();
  for (const row of rows) {
    const key = `${row.language}:${row.slug}`;
    if (map.has(key)) {
      throw new Error(`Sanity tiene duplicados para slug + language: ${key}`);
    }
    map.set(key, row);
  }

  return map;
}

function buildNoteFields(note: NormalizedInputNote) {
  return {
    title: note.title,
    slug: buildSlugField(note.slug),
    language: note.language,
    type: note.type,
    author: note.author,
    publishedAt: note.publishedAt,
    ...(note.excerpt ? { excerpt: note.excerpt } : {}),
    ...(note.body ? { body: note.body } : {}),
    ...(note.cover ? { cover: note.cover } : {}),
  };
}

function buildNoteDocument(note: NormalizedInputNote, documentId: string) {
  return {
    _id: documentId,
    _type: "note",
    ...buildNoteFields(note),
  };
}

async function upsertNotes(
  client: ReturnType<typeof createWriteClient>,
  notes: NormalizedInputNote[],
  existingMap: Map<string, ExistingNote>,
  dryRun: boolean
): Promise<{ processed: ProcessedNote[]; summary: Summary }> {
  const summary: Summary = { created: 0, updated: 0, omitted: 0, errors: 0 };
  const processed: ProcessedNote[] = [];

  for (const note of notes) {
    const existing = existingMap.get(`${note.language}:${note.slug}`);
    const documentId = existing?._id ?? buildDocumentId(note.language, note.slug);
    const fields = buildNoteFields(note);
    const document = buildNoteDocument(note, documentId);

    if (dryRun) {
      processed.push({ ...note, documentId, existed: !!existing });
      if (existing) summary.updated += 1;
      else summary.created += 1;
      continue;
    }

    if (existing) {
      const unsetFields = ["excerpt", "body", "cover"].filter((field) => !(field in fields));
      await client
        .patch(documentId)
        .set(fields)
        .unset(unsetFields)
        .commit({ autoGenerateArrayKeys: true });
      summary.updated += 1;
    } else {
      await client.create(document);
      summary.created += 1;
    }

    processed.push({ ...note, documentId, existed: !!existing });
    existingMap.set(`${note.language}:${note.slug}`, {
      _id: documentId,
      slug: note.slug,
      language: note.language,
      translationOf: null,
    });
  }

  return { processed, summary };
}

function chooseTranslationReference(
  note: ProcessedNote,
  processedByKey: Map<string, Map<Locale, ProcessedNote>>,
  existingBySlug: Map<string, ExistingNote[]>
): string | null {
  if (note.translationKey) {
    const group = processedByKey.get(note.translationKey);
    const spanish = group?.get("es");
    const english = group?.get("en");

    if (spanish && english) {
      return note.language === "en" ? spanish.documentId : null;
    }
  }

  if (!note.translationOfSlug) return null;

  const candidates = existingBySlug.get(note.translationOfSlug) ?? [];
  if (candidates.length === 0) return null;

  const opposite = candidates.find((candidate) => candidate.language !== note.language);
  return opposite?._id ?? candidates[0]?._id ?? null;
}

async function linkTranslations(
  client: ReturnType<typeof createWriteClient>,
  processed: ProcessedNote[],
  existingMap: Map<string, ExistingNote>,
  dryRun: boolean
) {
  const processedByKey = new Map<string, Map<Locale, ProcessedNote>>();
  const existingBySlug = new Map<string, ExistingNote[]>();

  for (const existing of existingMap.values()) {
    const list = existingBySlug.get(existing.slug) ?? [];
    list.push(existing);
    existingBySlug.set(existing.slug, list);
  }

  for (const note of processed) {
    if (!note.translationKey) continue;
    const group = processedByKey.get(note.translationKey) ?? new Map<Locale, ProcessedNote>();
    group.set(note.language, note);
    processedByKey.set(note.translationKey, group);
  }

  let updatedLinks = 0;
  let omittedLinks = 0;

  for (const note of processed) {
    const targetId = chooseTranslationReference(note, processedByKey, existingBySlug);

    if (dryRun) {
      if (targetId) updatedLinks += 1;
      else omittedLinks += 1;
      continue;
    }

    if (targetId) {
      await client
        .patch(note.documentId)
        .set({
          translationOf: {
            _type: "reference",
            _ref: targetId,
          },
        })
        .commit();
      updatedLinks += 1;
    } else {
      await client.patch(note.documentId).unset(["translationOf"]).commit();
      omittedLinks += 1;
    }
  }

  return { updatedLinks, omittedLinks };
}

async function main() {
  const argv = process.argv.slice(2);
  const inputPath = getInputPath(argv);
  const { dryRun } = getFlags(argv);
  const notes = loadInputNotes(inputPath);

  validateTranslationGroups(notes);

  const client = dryRun ? null : createWriteClient();
  const slugsToInspect = [...new Set(notes.flatMap((note) => [note.slug, note.translationOfSlug].filter(Boolean) as string[]))];
  const existingMap =
    client && !dryRun ? await fetchExistingNotes(client, slugsToInspect) : new Map<string, ExistingNote>();

  const { processed, summary } = await upsertNotes(
    client as ReturnType<typeof createWriteClient>,
    notes,
    existingMap,
    dryRun
  );

  const linkSummary = await linkTranslations(
    client as ReturnType<typeof createWriteClient>,
    processed,
    existingMap,
    dryRun
  );

  console.log("");
  console.log(dryRun ? "Importación simulada completada." : "Importación completada.");
  console.log(`- creadas: ${summary.created}`);
  console.log(`- actualizadas: ${summary.updated}`);
  console.log(`- omitidas: ${summary.omitted}`);
  console.log(`- errores: ${summary.errors}`);
  console.log(`- enlaces translationOf actualizados: ${linkSummary.updatedLinks}`);
  console.log(`- enlaces translationOf omitidos/vaciados: ${linkSummary.omittedLinks}`);
}

main().catch((error) => {
  console.error("Error en la importación de notas.");
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
