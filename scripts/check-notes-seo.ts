import {
  getNoteAlternatePaths,
  type Locale,
} from "@/data/notes-index";
import {
  getIndexableNotesSlugsEnStatic,
  getIndexableNotasSlugsEsStatic,
} from "@/lib/static-routes";
import { getSiteUrl } from "@/lib/seo";
import { getNoteDetailPath } from "@/lib/note-detail-seo";

type CheckCase = {
  lang: Locale;
  slug: string;
  path: string;
};

type HtmlAttributes = Record<string, string>;

function normalizeBaseUrl(value: string): string {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

async function getCheckCases(): Promise<CheckCase[]> {
  const [slugsEs, slugsEn] = await Promise.all([
    getIndexableNotasSlugsEsStatic(),
    getIndexableNotesSlugsEnStatic(),
  ]);

  return [
    ...slugsEs.map((slug) => ({
      lang: "es" as const,
      slug,
      path: getNoteDetailPath("es", slug),
    })),
    ...slugsEn.map((slug) => ({
      lang: "en" as const,
      slug,
      path: getNoteDetailPath("en", slug),
    })),
  ];
}

function parseTagAttributes(tag: string): HtmlAttributes {
  const attrs: HtmlAttributes = {};
  const attrRegex = /([^\s=/>]+)\s*=\s*["']([^"']*)["']/gi;

  for (const match of tag.matchAll(attrRegex)) {
    const key = match[1]?.toLowerCase();
    const value = match[2];
    if (key && typeof value === "string") attrs[key] = value;
  }

  return attrs;
}

function extractHtmlLang(html: string): string | null {
  const htmlTag = html.match(/<html\b[^>]*>/i)?.[0];
  if (!htmlTag) return null;
  return parseTagAttributes(htmlTag).lang ?? null;
}

function extractCanonicalHref(html: string): string | null {
  const linkTags = html.match(/<link\b[^>]*>/gi) ?? [];

  for (const tag of linkTags) {
    const attrs = parseTagAttributes(tag);
    const rel = attrs.rel?.toLowerCase().split(/\s+/) ?? [];
    if (rel.includes("canonical")) return attrs.href ?? null;
  }

  return null;
}

function extractAlternateHrefs(html: string): Map<string, string> {
  const alternates = new Map<string, string>();
  const linkTags = html.match(/<link\b[^>]*>/gi) ?? [];

  for (const tag of linkTags) {
    const attrs = parseTagAttributes(tag);
    const rel = attrs.rel?.toLowerCase().split(/\s+/) ?? [];
    const hreflang = attrs.hreflang?.toLowerCase();
    const href = attrs.href;

    if (rel.includes("alternate") && hreflang && href) {
      alternates.set(hreflang, href);
    }
  }

  return alternates;
}

async function fetchHtml(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      "user-agent": "enblanco-notes-seo-check/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} al cargar ${url}`);
  }

  return response.text();
}

async function main() {
  const baseUrl = normalizeBaseUrl(process.env.SEO_CHECK_BASE_URL || getSiteUrl());
  const cases = await getCheckCases();
  const failures: string[] = [];

  for (const current of cases) {
    const url = `${baseUrl}${current.path}`;
    const html = await fetchHtml(url);
    const htmlLang = extractHtmlLang(html);
    const canonicalHref = extractCanonicalHref(html);
    const alternates = extractAlternateHrefs(html);
    const expectedAlternates = await getNoteAlternatePaths(current.lang, current.slug);

    if (htmlLang !== current.lang) {
      failures.push(
        `${current.path}: html lang esperado "${current.lang}" pero recibido "${htmlLang ?? "null"}"`
      );
    }

    if (canonicalHref !== url) {
      failures.push(
        `${current.path}: canonical esperado "${url}" pero recibido "${canonicalHref ?? "null"}"`
      );
    }

    for (const [hreflang, path] of Object.entries(expectedAlternates)) {
      const expectedHref = `${baseUrl}${path}`;
      const actualHref = alternates.get(hreflang);

      if (actualHref !== expectedHref) {
        failures.push(
          `${current.path}: alternate ${hreflang} esperado "${expectedHref}" pero recibido "${actualHref ?? "null"}"`
        );
      }
    }

    for (const hreflang of ["es", "en", "x-default"] as const) {
      if (!(hreflang in expectedAlternates) && alternates.has(hreflang)) {
        failures.push(
          `${current.path}: alternate ${hreflang} no debería existir y apunta a "${alternates.get(hreflang)}"`
        );
      }
    }
  }

  if (failures.length > 0) {
    console.error(`SEO de notas: ${failures.length} fallo(s) detectado(s)\n`);
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }

  console.log(
    `SEO de notas OK: ${cases.length} URL(s) validadas en ${baseUrl}`
  );
}

main().catch((error) => {
  console.error("No se pudo completar la validación SEO de notas.");
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
