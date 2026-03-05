import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import JsonLd from "@/components/Seo/JsonLd";
import { withLang, isValidLang } from "@/lib/i18n/path";
import { NOTES_EN } from "@/data/notes-index";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang) || lang === "es") return {};
  return {
    title: "notes",
    description:
      "Notes on creativity, design, and brand process at enblanco. Decisions, nuances, and criteria applied in our work.",
    alternates: {
      canonical: "/en/notes",
      languages: { es: "/es/notas", en: "/en/notes", "x-default": "/es/notas" },
    },
  };
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "home", item: `${siteUrl}/en` },
    { "@type": "ListItem", position: 2, name: "notes", item: `${siteUrl}/en/notes` },
  ],
};

export default async function NotesPage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();
  if (lang === "es") redirect(withLang("es", "notas"));

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />
      <header className="mb-10 grid gap-6 md:grid-cols-2">
        <h1 className="text-2xl font-semibold tracking-tight">notes</h1>
        <div className="space-y-2 text-sm text-zinc-700">
          <p>notes on creativity, design, and brand process at enblanco.</p>
          <p>a collection of decisions, nuances, and criteria applied in enblanco&apos;s work.</p>
        </div>
      </header>
      <section aria-labelledby="index-heading" className="mb-12">
        <h2 id="index-heading" className="sr-only text-base font-semibold tracking-tight">notes index</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-t border-zinc-200 text-sm">
            <thead className="border-b border-zinc-200 text-left text-xs uppercase tracking-wide text-zinc-500">
              <tr>
                <th scope="col" className="w-16 py-3 pr-4">index</th>
                <th scope="col" className="py-3 pr-4">type</th>
                <th scope="col" className="py-3 pr-4">title</th>
                <th scope="col" className="py-3 pr-4">date</th>
                <th scope="col" className="py-3 pr-4">author</th>
              </tr>
            </thead>
            <tbody>
              {NOTES_EN.length > 0 ? (
                NOTES_EN.map((note) => (
                  <tr key={note.slug} className="border-b border-zinc-100 last:border-b-0">
                    <td className="py-3 pr-4 font-mono text-zinc-500">[{note.index}]</td>
                    <td className="py-3 pr-4 text-zinc-700">{note.type}</td>
                    <td className="py-3 pr-4 font-medium text-zinc-900">
                      <Link href={withLang("en", `notes/${note.slug}`)} className="underline hover:no-underline">
                        {note.title}
                      </Link>
                    </td>
                    <td className="py-3 pr-4 text-zinc-600"><time dateTime={note.date}>{note.date}</time></td>
                    <td className="py-3 pr-4 text-zinc-600">{note.author}</td>
                  </tr>
                ))
              ) : (
                <tr className="border-b border-zinc-100">
                  <td colSpan={5} className="py-6 pr-4 text-center text-sm text-zinc-500">Notes will be listed here.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
      <section aria-labelledby="relations-heading" className="mt-8">
        <h2 id="relations-heading" className="text-base font-semibold tracking-tight">more at enblanco</h2>
        <p className="mt-2 text-sm text-zinc-700">
          <Link href={withLang("en", "projects")} className="underline">projects</Link>,{" "}
          <Link href={withLang("en", "services")} className="underline">services</Link>,{" "}
          <Link href={withLang("en", "areas")} className="underline">areas</Link>,{" "}
          <Link href={withLang("en", "enblanco")} className="underline">enblanco</Link>,{" "}
          <Link href={withLang("en", "contact")} className="underline">contact</Link>.
        </p>
      </section>
    </main>
  );
}
