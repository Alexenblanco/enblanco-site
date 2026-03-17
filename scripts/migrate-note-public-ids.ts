import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@sanity/client";

type Locale = "es" | "en";

type PortableTextSpan = {
  _key?: string;
  _type: "span";
  marks?: string[];
  text?: string;
};

type PortableTextBlock = {
  _key?: string;
  _type: string;
  children?: PortableTextSpan[];
  markDefs?: unknown[];
  style?: string;
  [key: string]: unknown;
};

type SanityImageField = {
  _type: "image";
  asset?: {
    _type: "reference";
    _ref: string;
  };
  [key: string]: unknown;
};

type LegacyNote = {
  _id: string;
  _type: "note";
  title?: string;
  slug?: { current?: string };
  language?: Locale;
  type?: string;
  author?: string;
  excerpt?: string;
  body?: PortableTextBlock[];
  cover?: SanityImageField;
  publishedAt?: string;
  translationRef?: string | null;
};

type PublicNote = {
  _id: string;
  slug?: string;
  language?: Locale;
  publishedAt?: string;
};

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

function createReadClient(withToken: boolean) {
  loadLocalEnv();

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01";
  const token = process.env.SANITY_API_READ_TOKEN ?? "";

  if (!projectId) throw new Error("Falta NEXT_PUBLIC_SANITY_PROJECT_ID.");
  if (withToken && !token) throw new Error("Falta SANITY_API_READ_TOKEN.");

  return createClient({
    projectId,
    dataset,
    apiVersion,
    ...(withToken ? { token } : {}),
    useCdn: false,
    perspective: "published",
  });
}

function createWriteClient() {
  loadLocalEnv();

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01";
  const token = process.env.SANITY_API_WRITE_TOKEN ?? "";

  if (!projectId) throw new Error("Falta NEXT_PUBLIC_SANITY_PROJECT_ID.");
  if (!token) throw new Error("Falta SANITY_API_WRITE_TOKEN.");

  return createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
    perspective: "published",
  });
}

function buildPublicId(language: Locale, slug: string): string {
  return `note-${language}-${slug}`;
}

function getFlags(argv: string[]) {
  return {
    dryRun: argv.includes("--dry-run"),
  };
}

async function fetchLegacyNotes() {
  const client = createReadClient(true);

  return client.fetch<LegacyNote[]>(
    `*[_type == "note" && _id match "note.*"] | order(language asc, slug.current asc) {
      _id,
      _type,
      title,
      slug,
      language,
      type,
      author,
      excerpt,
      body,
      cover,
      publishedAt,
      "translationRef": translationOf._ref
    }`
  );
}

async function fetchPublicCounts() {
  const client = createReadClient(false);

  const query = `*[_type == "note" && language == $lang && defined(slug.current)] | order(publishedAt desc, _createdAt desc) {
    _id,
    "slug": slug.current,
    language,
    publishedAt
  }`;

  const [es, en] = await Promise.all([
    client.fetch<PublicNote[]>(query, { lang: "es" }),
    client.fetch<PublicNote[]>(query, { lang: "en" }),
  ]);

  return { es, en };
}

function assertLegacyNotes(notes: LegacyNote[]) {
  for (const note of notes) {
    if (note._type !== "note") {
      throw new Error(`Documento inesperado ${note._id}: _type != "note".`);
    }

    if (!note.language || !note.slug?.current) {
      throw new Error(`Documento ${note._id} sin language o slug.current.`);
    }
  }
}

async function migrateNotes(notes: LegacyNote[], dryRun: boolean) {
  const client = createWriteClient();
  const oldToNewId = new Map<string, string>();

  for (const note of notes) {
    oldToNewId.set(note._id, buildPublicId(note.language as Locale, note.slug?.current as string));
  }

  const noteDocs = notes.map((note) => {
    const slug = note.slug?.current;
    const language = note.language;

    if (!slug || !language) {
      throw new Error(`Documento ${note._id} sin slug.current o language.`);
    }

    return {
      _id: buildPublicId(language, slug),
      _type: "note" as const,
      ...(note.title ? { title: note.title } : {}),
      slug: {
        _type: "slug" as const,
        current: slug,
      },
      language,
      ...(note.type ? { type: note.type } : {}),
      ...(note.author ? { author: note.author } : {}),
      ...(note.excerpt ? { excerpt: note.excerpt } : {}),
      ...(note.body ? { body: note.body } : {}),
      ...(note.cover ? { cover: note.cover } : {}),
      ...(note.publishedAt ? { publishedAt: note.publishedAt } : {}),
    };
  });

  if (dryRun) {
    return {
      createdOrReplaced: noteDocs.map((doc) => doc._id),
      deleted: notes.map((note) => note._id),
    };
  }

  let createTransaction = client.transaction();
  for (const doc of noteDocs) {
    createTransaction = createTransaction.createOrReplace(doc);
  }
  await createTransaction.commit({ autoGenerateArrayKeys: true });

  let linkTransaction = client.transaction();
  for (const note of notes) {
    const newId = oldToNewId.get(note._id);
    if (!newId) continue;

    const nextTranslationRef = note.translationRef
      ? oldToNewId.get(note.translationRef) ?? note.translationRef
      : null;

    if (nextTranslationRef) {
      linkTransaction = linkTransaction.patch(newId, (patch) =>
        patch.set({
          translationOf: {
            _type: "reference",
            _ref: nextTranslationRef,
          },
        })
      );
    } else {
      linkTransaction = linkTransaction.patch(newId, (patch) =>
        patch.unset(["translationOf"])
      );
    }
  }
  await linkTransaction.commit();

  let deleteTransaction = client.transaction();
  for (const note of notes) {
    deleteTransaction = deleteTransaction.delete(note._id);
  }
  await deleteTransaction.commit();

  return {
    createdOrReplaced: noteDocs.map((doc) => doc._id),
    deleted: notes.map((note) => note._id),
  };
}

async function main() {
  const { dryRun } = getFlags(process.argv.slice(2));
  const legacyNotes = await fetchLegacyNotes();
  assertLegacyNotes(legacyNotes);

  if (legacyNotes.length === 0) {
    console.log("No hay notas legacy con _id que contenga puntos.");
    return;
  }

  console.log("");
  console.log("[migrate-note-public-ids] notas legacy detectadas:");
  console.log(
    JSON.stringify(
      legacyNotes.map((note) => ({
        _id: note._id,
        slug: note.slug?.current ?? null,
        language: note.language ?? null,
        translationRef: note.translationRef ?? null,
      })),
      null,
      2
    )
  );

  const migration = await migrateNotes(legacyNotes, dryRun);
  const publicCounts = await fetchPublicCounts();

  console.log("");
  console.log(dryRun ? "Migración simulada completada." : "Migración completada.");
  console.log(`- legacy detectadas: ${legacyNotes.length}`);
  console.log(`- createOrReplace: ${migration.createdOrReplaced.length}`);
  console.log(`- eliminadas legacy: ${migration.deleted.length}`);
  console.log(`- públicas ES: ${publicCounts.es.length}`);
  console.log(`- públicas EN: ${publicCounts.en.length}`);
  console.log(
    JSON.stringify(
      {
        publicEsSlugs: publicCounts.es.map((note) => note.slug ?? null),
        publicEnSlugs: publicCounts.en.map((note) => note.slug ?? null),
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error("Error migrando IDs públicos de notas.");
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
