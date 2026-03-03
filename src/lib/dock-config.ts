/**
 * Configuración del FloatingDock por locale.
 * Rutas: base es "es" | "en" según pathname.
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
    { id: "proyectos", label: "proyectos", href: "/es/proyectos" },
    { id: "about", label: "about", href: "/es/enblanco" },
    { id: "logo", label: "enbl nco.", href: "/es", isLogo: true },
    { id: "notas", label: "notas", href: "/es/notas" },
    { id: "contacto", label: "contacto", href: "/es/contacto" },
  ],
  en: [
    { id: "proyectos", label: "projects", href: "/en/projects" },
    { id: "about", label: "about", href: "/en/enblanco" },
    { id: "logo", label: "enbl nco.", href: "/en", isLogo: true },
    { id: "notas", label: "notes", href: "/en/notes" },
    { id: "contacto", label: "contact", href: "/en/contact" },
  ],
};

/** Enlaces del drawer de menú móvil */
export const MOBILE_MENU_ITEMS: Record<
  Locale,
  Array<{ label: string; href: string }>
> = {
  es: [
    { label: "proyectos", href: "/es/proyectos" },
    { label: "áreas", href: "/es/areas" },
    { label: "enblanco", href: "/es/enblanco" },
    { label: "notas", href: "/es/notas" },
    { label: "contacto", href: "/es/contacto" },
  ],
  en: [
    { label: "projects", href: "/en/projects" },
    { label: "areas", href: "/en/areas" },
    { label: "enblanco", href: "/en/enblanco" },
    { label: "notes", href: "/en/notes" },
    { label: "contact", href: "/en/contact" },
  ],
};

/** Acción contextual móvil por pathname: texto y tipo (external href vs "filtros" panel) */
export type ContextAction = { label: string; href?: string; type: "link" | "filtros" | "none" };

const WHATSAPP_URL = "https://wa.me/34619526784";

export function getMobileContextAction(pathname: string, locale: Locale): ContextAction {
  const base = locale === "en" ? "/en" : "/es";
  if (pathname === base || pathname === `${base}/`) return { label: "whatsapp", href: WHATSAPP_URL, type: "link" };
  if (pathname.startsWith(`${base}/proyectos`) || pathname.startsWith(`${base}/projects`))
    return { label: "filtros", type: "filtros" };
  return { label: "—", type: "none" };
}
