import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import JsonLd from "@/components/Seo/JsonLd";
import { withLang, isValidLang } from "@/lib/i18n/path";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

const SERVICES = [
  { slug: "branding", name: "branding", description: "we build brand systems: clear, durable, and easy to apply." },
  { slug: "naming", name: "naming", description: "names that fit the strategy and work in real use." },
  { slug: "brand-consulting", name: "brand consulting", description: "we align positioning, message, and priorities before design." },
  { slug: "art-direction", name: "art direction", description: "a system-led aesthetic: consistent across every piece and channel." },
  { slug: "creative-strategy-campaigns", name: "creative strategy & campaigns", description: "concept, message, and a system of assets that holds together." },
  { slug: "packaging", name: "packaging", description: "hierarchy, clarity, presence. the rest is noise." },
  { slug: "web-design", name: "web design", description: "structure, experience, and performance—without friction." },
];

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang) || lang === "es") return {};
  return {
    title: "services",
    description: "work areas where judgment and execution matter.",
    alternates: {
      canonical: "/en/services",
      languages: { es: "/es/servicios", en: "/en/services", "x-default": "/es/servicios" },
    },
  };
}

export default async function ServicesPage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();
  if (lang === "es") redirect(withLang("es", "servicios"));

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "home", item: `${siteUrl}/en` },
      { "@type": "ListItem", position: 2, name: "services", item: `${siteUrl}/en/services` },
    ],
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />
      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">services</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          work areas where judgment and execution matter.
        </p>
      </header>
      <section aria-labelledby="services-heading" className="mb-12">
        <h2 id="services-heading" className="sr-only text-base font-semibold tracking-tight">services list</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-t border-zinc-200 text-sm">
            <thead className="border-b border-zinc-200 text-left text-xs uppercase tracking-wide text-zinc-500">
              <tr>
                <th scope="col" className="py-3 pr-4">service</th>
                <th scope="col" className="py-3 pr-4">description</th>
                <th scope="col" className="py-3 pr-4">link</th>
              </tr>
            </thead>
            <tbody>
              {SERVICES.map((s) => (
                <tr key={s.slug} className="border-b border-zinc-100 last:border-b-0">
                  <th scope="row" className="py-3 pr-4 text-sm font-medium text-zinc-900">{s.name}</th>
                  <td className="py-3 pr-4 text-sm text-zinc-700">{s.description}</td>
                  <td className="py-3 pr-4 text-sm">
                    <Link href={withLang("en", "services/" + s.slug)} className="text-zinc-900 underline">view service</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section aria-labelledby="relations-heading" className="mt-8">
        <h2 id="relations-heading" className="text-base font-semibold tracking-tight">services, areas, and projects</h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          each service connects with specific contexts and projects. from here you can explore enblanco work by{" "}
          <Link href={withLang("en", "areas")} className="underline">areas</Link>, see{" "}
          <Link href={withLang("en", "projects")} className="underline">projects</Link> or read{" "}
          <Link href={withLang("en", "notes")} className="underline">notes</Link> where we share decisions and processes.
        </p>
      </section>
    </main>
  );
}
