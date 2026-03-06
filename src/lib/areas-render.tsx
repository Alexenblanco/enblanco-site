/**
 * Renders area section body (data from data/areas-content) into React nodes.
 * Single place for contact CTA and inline links.
 */

import Link from "next/link";
import { withLang } from "@/lib/i18n/path";
import type { AreaSectionBody } from "@/data/areas-content";

import { CONTACT_EMAIL } from "@/lib/site-config";

export type AreaLang = "en" | "es";

export function renderAreaSectionBody(
  body: AreaSectionBody,
  lang: AreaLang
): React.ReactNode {
  switch (body.type) {
    case "text":
      return <p>{body.text}</p>;
    case "contact": {
      const contactPath = lang === "en" ? "contact" : "contacto";
      const contactLabel = lang === "en" ? "contact" : "contacto";
      return (
        <p>
          {body.intro}
          <Link href={withLang(lang, contactPath)} className="underline">
            {contactLabel}
          </Link>
          {lang === "en" ? " or at " : " o a "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      );
    }
    case "links": {
      return (
        <p>
          {body.segments.map((seg, i) =>
            typeof seg === "string" ? (
              <span key={i}>{seg}</span>
            ) : (
              <Link
                key={i}
                href={withLang(lang, seg.path)}
                className="underline"
              >
                {seg.label}
              </Link>
            )
          )}
        </p>
      );
    }
  }
}
