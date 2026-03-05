import { withLang } from "@/lib/i18n/path";

/**
 * Configuración del FloatingDock por locale.
 * Rutas: base es "es" | "en" según pathname. Usa withLang para URLs canónicas /{lang}/...
 */
export type Locale = "es" | "en";

export function getLocaleFromPathname(pathname: string): Locale {
  if (pathname.startsWith("/en")) return "en";
  return "es";
}

export const DESKTOP_ITEMS: Record<
  Locale,
  Array<{ id: string; label: string; href: string; isLogo?: boolean }>
> = {
  es: [
    { id: "proyectos", label: "proyectos", href: withLang("es", "proyectos") },
    { id: "about", label: "about", href: withLang("es", "enblanco") },
    { id: "logo", label: "enbl nco.", href: withLang("es", ""), isLogo: true },
    { id: "notas", label: "notas", href: withLang("es", "notas") },
    { id: "contacto", label: "contacto", href: withLang("es", "contacto") },
  ],
  en: [
    { id: "proyectos", label: "projects", href: withLang("en", "projects") },
    { id: "about", label: "about", href: withLang("en", "enblanco") },
    { id: "logo", label: "enbl nco.", href: withLang("en", ""), isLogo: true },
    { id: "notas", label: "notes", href: withLang("en", "notes") },
    { id: "contacto", label: "contact", href: withLang("en", "contact") },
  ],
};

/** Enlaces del drawer de menú móvil */
export const MOBILE_MENU_ITEMS: Record<
  Locale,
  Array<{ label: string; href: string }>
> = {
  es: [
    { label: "proyectos", href: withLang("es", "proyectos") },
    { label: "áreas", href: withLang("es", "areas") },
    { label: "enblanco", href: withLang("es", "enblanco") },
    { label: "notas", href: withLang("es", "notas") },
    { label: "contacto", href: withLang("es", "contacto") },
  ],
  en: [
    { label: "projects", href: withLang("en", "projects") },
    { label: "areas", href: withLang("en", "areas") },
    { label: "enblanco", href: withLang("en", "enblanco") },
    { label: "notes", href: withLang("en", "notes") },
    { label: "contact", href: withLang("en", "contact") },
  ],
};

/** Acción contextual móvil por pathname: texto y tipo (external href vs "filtros" panel) */
export type ContextAction = { label: string; href?: string; type: "link" | "filtros" | "none" };

const WHATSAPP_URL = "https://wa.me/34619526784";

export function getMobileContextAction(pathname: string, locale: Locale): ContextAction {
  const base = withLang(locale, "");
  if (pathname === base || pathname === `${base}/`) return { label: "whatsapp", href: WHATSAPP_URL, type: "link" };
  if (pathname.startsWith(withLang(locale, "proyectos")) || pathname.startsWith(withLang(locale, "projects")))
    return { label: "filtros", type: "filtros" };
  return { label: "—", type: "none" };
}
