import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/Seo/JsonLd";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

export const metadata: Metadata = {
  title: "areas",
  description: "contexts where priorities change—not the standard.",
  alternates: {
    canonical: "/en/areas",
    languages: {
      es: "/es/areas",
      en: "/en/areas",
      "x-default": "/es/areas",
    },
  },
};

const areas = [
  { slug: "retail", name: "retail", description: "brand, packaging, and digital built for fast decisions." },
  { slug: "health", name: "health", description: "clarity, trust, and communication that holds up." },
  { slug: "food", name: "food", description: "packaging and brand built to be chosen in seconds." },
  { slug: "industry", name: "industry", description: "a solid brand is clarity, consistency, and rigor." },
  { slug: "startups-technology", name: "startups & technology", description: "brand and product with system, without friction." },
  { slug: "culture", name: "culture", description: "identity and art direction with narrative and judgment." },
] as const;

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "home", item: `${siteUrl}/en` },
    { "@type": "ListItem", position: 2, name: "areas", item: `${siteUrl}/en/areas` },
  ],
};

export default function AreasPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />

      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">areas</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          contexts where priorities change—not the standard.
        </p>
      </header>

      <section aria-labelledby="areas-table-heading" className="mb-12">
        <h2 id="areas-table-heading" className="sr-only text-base font-semibold tracking-tight">
          areas list
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-t border-zinc-200 text-sm">
            <thead className="border-b border-zinc-200 text-left text-xs uppercase tracking-wide text-zinc-500">
              <tr>
                <th scope="col" className="py-3 pr-4">area</th>
                <th scope="col" className="py-3 pr-4">description</th>
                <th scope="col" className="py-3 pr-4">link</th>
              </tr>
            </thead>
            <tbody>
              {areas.map((area) => (
                <tr key={area.slug} className="border-b border-zinc-100 last:border-b-0">
                  <th scope="row" className="py-3 pr-4 text-sm font-medium text-zinc-900">
                    {area.name}
                  </th>
                  <td className="py-3 pr-4 text-sm text-zinc-700">{area.description}</td>
                  <td className="py-3 pr-4 text-sm">
                    <Link href={`/en/areas/${area.slug}`} className="text-zinc-900 underline">
                      view area
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="areas-relations-heading" className="mt-8">
        <h2 id="areas-relations-heading" className="text-base font-semibold tracking-tight">
          areas, services, and projects
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          each area connects with specific services and real projects. explore{" "}
          <Link href="/en/services" className="underline">services</Link>,{" "}
          <Link href="/en/projects" className="underline">projects</Link>, or{" "}
          <Link href="/en/notes" className="underline">notes</Link> to see how we apply judgment in each context.
        </p>
      </section>
    </main>
  );
}
