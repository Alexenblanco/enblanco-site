import type { Locale } from "@/lib/i18n/path";
import es from "./es.json";
import en from "./en.json";

export type Dictionary = typeof es;

const dictionaries: Record<Locale, Dictionary> = { es, en };

/**
 * Load UI translations for the given language.
 * Use in server components: const dict = getDictionary(lang);
 */
export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}
