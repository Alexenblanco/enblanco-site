import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import JsonLd from "@/components/Seo/JsonLd";
import { withLang, isValidLang } from "@/lib/i18n/path";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

const NOTAS_ES: Record<
  string,
  { title: string; date: string; author: string; type: string }
> = {
  ejemplo: {
    title: "Ejemplo de nota",
    date: "2025-01-15",
    author: "enblanco",
    type: "criterio",
  },
};

type Props = { params: Promise<{ lang: string; slug: string }> };

export async function generateStaticParams() {
  return Object.keys(NOTAS_ES).map((slug) => ({ lang: "es" as const, slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isValidLang(lang) || lang === "en") return {};
  const nota = NOTAS_ES[slug];
  if (!nota) return { title: "Nota" };
  return {
    title: nota.title,
    description: `Nota de enblanco: ${nota.type}. ${nota.date}.`,
    alternates: {
      canonical: `/es/notas/${slug}`,
      languages: {
        es: `/es/notas/${slug}`,
        en: `/en/notes/${slug}`,
        "x-default": `/es/notas/${slug}`,
      },
    },
  };
}

export default async function NotaSlugPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isValidLang(lang)) notFound();
  if (lang === "en") redirect(withLang("en", `notes/${slug}`));
  const nota = NOTAS_ES[slug];
  if (!nota) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: nota.title,
    datePublished: nota.date,
    author: {
      "@type": "Organization",
      name: nota.author,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "enblanco",
      url: `${siteUrl}/es`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/es/notas/${slug}`,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "inicio", item: `${siteUrl}/es` },
      { "@type": "ListItem", position: 2, name: "notas", item: `${siteUrl}/es/notas` },
      { "@type": "ListItem", position: 3, name: nota.title, item: `${siteUrl}/es/notas/${slug}` },
    ],
  };

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <article>
        <header className="mb-10">
          <p className="text-xs uppercase tracking-wide text-zinc-500">{nota.type}</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            {nota.title}
          </h1>
          <p className="mt-2 text-sm text-zinc-600">
            <time dateTime={nota.date}>{nota.date}</time>
            {nota.author && ` · ${nota.author}`}
          </p>
        </header>

        <div className="prose prose-zinc prose-sm max-w-none">
          <p className="text-zinc-700">
            Contenido de la nota. Sustituir por contenido real desde CMS o markdown.
            Criterios, decisiones y reflexiones aplicadas en el trabajo de enblanco.
          </p>
        </div>

        <footer className="mt-10 border-t border-zinc-200 pt-6 text-sm text-zinc-600">
          <p>
            Más en{" "}
            <Link href={withLang("es", "notas")} className="underline">notas</Link>,{" "}
            <Link href={withLang("es", "proyectos")} className="underline">proyectos</Link>,{" "}
            <Link href={withLang("es", "servicios")} className="underline">servicios</Link> y{" "}
            <Link href={withLang("es", "contacto")} className="underline">contacto</Link>.
          </p>
        </footer>
      </article>
    </main>
  );
}
