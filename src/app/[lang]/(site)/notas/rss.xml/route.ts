import { NextResponse } from "next/server";
import { NOTES_INDEX_ES } from "@/data/notes-index";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildRssXml(items: { slug: string; title: string; date: string; description?: string }[]): string {
  const itemXml = items
    .map(
      (n) =>
        `  <item>
    <title>${escapeXml(n.title)}</title>
    <link>${siteUrl}/es/notas/${escapeXml(n.slug)}</link>
    <pubDate>${new Date(n.date).toUTCString()}</pubDate>
    ${n.description ? `<description>${escapeXml(n.description)}</description>` : ""}
  </item>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>notas — enblanco</title>
    <link>${siteUrl}/es/notas</link>
    <description>Notas sobre creatividad, diseño y procesos de marca en enblanco.</description>
    <language>es</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/es/notas/rss.xml" rel="self" type="application/rss+xml"/>
${itemXml}
  </channel>
</rss>`;
}

type Context = { params: Promise<{ lang: string }> };

export async function GET(_request: Request, context: Context) {
  const { lang } = await context.params;
  if (lang === "en") {
    return NextResponse.redirect(`${siteUrl}/en/notes/rss.xml`, 302);
  }

  const items = NOTES_INDEX_ES;
  const xml = buildRssXml(items);

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
