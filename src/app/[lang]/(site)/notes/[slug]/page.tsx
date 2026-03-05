import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import JsonLd from "@/components/Seo/JsonLd";
import { withLang, isValidLang } from "@/lib/i18n/path";
import { NOTES_EN, getNoteBySlug } from "@/data/notes-index";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

type Props = { params: Promise<{ lang: string; slug: string }> };

export async function generateStaticParams() {
  return NOTES_EN.map((n) => ({ lang: "en" as const, slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isValidLang(lang) || lang === "es") return {};
  const note = getNoteBySlug("en", slug);
  if (!note) return { title: "Note" };
  return {
    title: note.title,
    description: `enblanco note: ${note.type}. ${note.date}.`,
    alternates: {
      canonical: `/en/notes/${slug}`,
      languages: {
        es: `/es/notas/${slug}`,
        en: `/en/notes/${slug}`,
        "x-default": `/es/notas/${slug}`,
      },
    },
  };
}

export default async function NoteSlugPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isValidLang(lang)) notFound();
  if (lang === "es") redirect(withLang("es", `notas/${slug}`));
  const note = getNoteBySlug("en", slug);
  if (!note) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: note.title,
    datePublished: note.date,
    author: {
      "@type": "Organization",
      name: note.author,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "enblanco",
      url: `${siteUrl}/en`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/en/notes/${slug}`,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "home", item: `${siteUrl}/en` },
      { "@type": "ListItem", position: 2, name: "notes", item: `${siteUrl}/en/notes` },
      { "@type": "ListItem", position: 3, name: note.title, item: `${siteUrl}/en/notes/${slug}` },
    ],
  };

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <article>
        <header className="mb-10">
          <p className="text-xs uppercase tracking-wide text-zinc-500">{note.type}</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            {note.title}
          </h1>
          <p className="mt-2 text-sm text-zinc-600">
            <time dateTime={note.date}>{note.date}</time>
            {note.author && ` · ${note.author}`}
          </p>
        </header>

        <div className="prose prose-zinc prose-sm max-w-none">
          <p className="text-zinc-700">
            Note content. Replace with real content from CMS or markdown.
            Criteria, decisions, and reflections applied in enblanco&apos;s work.
          </p>
        </div>

        <footer className="mt-10 border-t border-zinc-200 pt-6 text-sm text-zinc-600">
          <p>
            More in{" "}
            <Link href={withLang("en", "notes")} className="underline">notes</Link>,{" "}
            <Link href={withLang("en", "projects")} className="underline">projects</Link>,{" "}
            <Link href={withLang("en", "services")} className="underline">services</Link>, and{" "}
            <Link href={withLang("en", "contact")} className="underline">contact</Link>.
          </p>
        </footer>
      </article>
    </main>
  );
}
