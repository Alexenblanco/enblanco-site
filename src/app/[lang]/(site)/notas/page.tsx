import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import JsonLd from "@/components/Seo/JsonLd";
import { withLang, isValidLang } from "@/lib/i18n/path";
import { NOTAS_ES } from "@/data/notes-index";
import { getSiteUrl } from "@/lib/seo";

const siteUrl = getSiteUrl();

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang) || lang === "en") return {};
  return {
    title: "notas",
    description:
      "Notas sobre creatividad, diseño y procesos de marca en enblanco. Decisiones, matices y criterios aplicados.",
    alternates: {
      canonical: "/es/notas",
      languages: { es: "/es/notas", en: "/en/notes", "x-default": "/es/notas" },
    },
  };
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "inicio", item: `${siteUrl}/es` },
    { "@type": "ListItem", position: 2, name: "notas", item: `${siteUrl}/es/notas` },
  ],
};

export default async function NotasPage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();
  if (lang === "en") redirect(withLang("en", "notes"));

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />
      <header className="mb-10 grid gap-6 md:grid-cols-2">
        <h1 className="text-2xl font-semibold tracking-tight">notas</h1>
        <div className="space-y-2 text-sm text-zinc-700">
          <p>notas sobre creatividad, diseño y procesos de marca en enblanco.</p>
          <p>una colección de decisiones, matices y criterios aplicados en el trabajo de enblanco.</p>
        </div>
      </header>
      <section aria-labelledby="indice-heading" className="mb-12">
        <h2 id="indice-heading" className="sr-only text-base font-semibold tracking-tight">índice de notas</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-t border-zinc-200 text-sm">
            <thead className="border-b border-zinc-200 text-left text-xs uppercase tracking-wide text-zinc-500">
              <tr>
                <th scope="col" className="w-16 py-3 pr-4">índice</th>
                <th scope="col" className="py-3 pr-4">tipo</th>
                <th scope="col" className="py-3 pr-4">título</th>
                <th scope="col" className="py-3 pr-4">fecha</th>
                <th scope="col" className="py-3 pr-4">autor</th>
              </tr>
            </thead>
            <tbody>
              {NOTAS_ES.length > 0 ? (
                NOTAS_ES.map((nota) => (
                  <tr key={nota.slug} className="border-b border-zinc-100 last:border-b-0">
                    <td className="py-3 pr-4 font-mono text-zinc-500">[{nota.index}]</td>
                    <td className="py-3 pr-4 text-zinc-700">{nota.type}</td>
                    <td className="py-3 pr-4 font-medium text-zinc-900">
                      <Link href={withLang("es", `notas/${nota.slug}`)} className="underline hover:no-underline">
                        {nota.title}
                      </Link>
                    </td>
                    <td className="py-3 pr-4 text-zinc-600"><time dateTime={nota.date}>{nota.date}</time></td>
                    <td className="py-3 pr-4 text-zinc-600">{nota.author}</td>
                  </tr>
                ))
              ) : (
                <tr className="border-b border-zinc-100">
                  <td colSpan={5} className="py-6 pr-4 text-center text-sm text-zinc-500">Las notas se listarán aquí.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
      <section aria-labelledby="relaciones-heading" className="mt-8">
        <h2 id="relaciones-heading" className="text-base font-semibold tracking-tight">más en enblanco</h2>
        <p className="mt-2 text-sm text-zinc-700">
          <Link href={withLang("es", "proyectos")} className="underline">proyectos</Link>,{" "}
          <Link href={withLang("es", "servicios")} className="underline">servicios</Link>,{" "}
          <Link href={withLang("es", "areas")} className="underline">áreas</Link>,{" "}
          <Link href={withLang("es", "enblanco")} className="underline">enblanco</Link>,{" "}
          <Link href={withLang("es", "contacto")} className="underline">contacto</Link>.
        </p>
      </section>
    </main>
  );
}
