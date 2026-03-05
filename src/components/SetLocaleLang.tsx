"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Sets document lang for i18n SEO: /en → en, else es.
 * Root layout cannot know segment; this runs on client after first paint.
 */
export default function SetLocaleLang() {
  const pathname = usePathname();
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = pathname?.startsWith("/en") ? "en" : "es";
  }, [pathname]);
  return null;
}
