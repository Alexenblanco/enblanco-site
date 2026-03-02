import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/Seo/JsonLd";
import { EN_SERVICE_SLUGS, EN_COLLECTION_TITLES, type EnProjectsCollectionSlug } from "@/lib/proyectos-collections";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";
const slug: EnProjectsCollectionSlug = "brand-consulting";
const title = EN_COLLECTION_TITLES[slug];

export const metadata: Metadata = {
  title,
  description: "enblanco brand consulting projects.",
  alternates: { canonical: `/en/projects/${slug}`, languages: { es: "/es/proyectos/consultoria-de-marca", en: `/en/projects/${slug}`, "x-default": "/es/proyectos/consultoria-de-marca" } },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "home", item: `${siteUrl}/en` },
    { "@type": "ListItem", position: 2, name: "projects", item: `${siteUrl}/en/projects` },
    { "@type": "ListItem", position: 3, name: title, item: `${siteUrl}/en/projects/${slug}` },
  ],
};

export default function Page() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />
      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          Explore by <Link href="/en/areas" className="underline">area</Link> or <Link href="/en/services/brand-consulting" className="underline">service</Link>.
        </p>
      </header>
      <section aria-labelledby="list-heading" className="mb-10">
        <h2 id="list-heading" className="sr-only">list</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-t border-zinc-200 text-sm">
            <thead className="border-b border-zinc-200 text-left text-xs uppercase text-zinc-500">
              <tr><th scope="col" className="py-3 pr-4">project</th><th scope="col" className="py-3 pr-4">client / context</th><th scope="col" className="py-3 pr-4">link</th></tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-100">
                <td className="py-3 pr-4 text-zinc-700">—</td>
                <td className="py-3 pr-4 text-zinc-500">Projects will be listed here.</td>
                <td className="py-3 pr-4"><Link href="/en/projects" className="underline">view all</Link></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <p className="text-sm text-zinc-600">
        {EN_SERVICE_SLUGS.filter((s) => s !== slug).map((s) => (
          <span key={s}><Link href={`/en/projects/${s}`} className="underline">{EN_COLLECTION_TITLES[s]}</Link> · </span>
        ))} <Link href="/en/projects" className="underline">projects</Link>.
      </p>
    </main>
  );
}
