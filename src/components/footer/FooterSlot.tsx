"use client";

import { usePathname } from "next/navigation";
import SiteFooter from "./SiteFooter";
import { type Locale } from "@/lib/i18n/path";

function getLang(pathname: string): Locale {
  return pathname.startsWith("/en") ? "en" : "es";
}

function shouldShowFooter(pathname: string): boolean {
  const normalizedPathname =
    pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;

  if (!normalizedPathname.startsWith("/es") && !normalizedPathname.startsWith("/en")) return false;

  const lang = getLang(normalizedPathname);
  const root = `/${lang}`;
  const paths = new Set<string>([
    root,
    `${root}/enblanco`,
    `${root}/servicios`,
    `${root}/services`,
    `${root}/areas`,
    `${root}/notas`,
    `${root}/notes`,
    `${root}/contacto`,
    `${root}/contact`,
    `${root}/aviso-legal`,
    `${root}/legal-notice`,
    `${root}/privacidad`,
    `${root}/privacy`,
    `${root}/cookies`,
  ]);

  return paths.has(normalizedPathname);
}

export default function FooterSlot() {
  const pathname = usePathname() ?? "";
  if (!shouldShowFooter(pathname)) return null;

  return <SiteFooter lang={getLang(pathname)} />;
}
