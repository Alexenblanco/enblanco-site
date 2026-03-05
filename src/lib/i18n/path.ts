export type Locale = "es" | "en";

const LOCALES: Locale[] = ["es", "en"];

/**
 * Builds a path with the given locale prefix. Path should start without leading slash for consistency.
 * Example: withLang("es", "proyectos") => "/es/proyectos"
 */
export function withLang(lang: Locale, path: string): string {
  const p = path.startsWith("/") ? path.slice(1) : path;
  return p ? `/${lang}/${p}` : `/${lang}`;
}

/**
 * Infers locale from pathname. Returns "en" if pathname starts with /en, else "es".
 */
export function getLangFromPathname(pathname: string): Locale {
  if (pathname.startsWith("/en")) return "en";
  return "es";
}

export function isValidLang(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}
