import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import JsonLd from "@/components/Seo/JsonLd";
import { withLang, isValidLang } from "@/lib/i18n/path";
import { getSiteUrl } from "@/lib/seo";

const siteUrl = getSiteUrl();

const SERVICIOS = [
  { slug: "branding" as const, name: "branding", description: "construimos sistemas de marca: claros, sostenibles y fáciles de aplicar." },
  { slug: "naming" as const, name: "naming", description: "nombres que encajan con la estrategia y funcionan en la realidad." },
  { slug: "consultoria-de-marca" as const, name: "consultoría de marca", description: "ordenamos posicionamiento, mensaje y prioridades antes de diseñar." },
  { slug: "direccion-de-arte" as const, name: "dirección de arte", description: "una estética con sistema: coherente en cada pieza y cada canal." },
  { slug: "estrategia-creativa-campanas" as const, name: "estrategia creativa y campañas", description: "concepto, mensaje y un sistema de piezas que se sostiene en el tiempo." },
  { slug: "packaging" as const, name: "packaging", description: "jerarquía, claridad y presencia. lo demás es ruido." },
  { slug: "diseno-web" as const, name: "diseño web", description: "estructura, experiencia y rendimiento, sin fricción." },
];

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang) || lang === "en") return {};
  return {
    title: "servicios",
    description: "áreas de trabajo donde el criterio y la ejecución marcan la diferencia.",
    alternates: {
      canonical: "/es/servicios",
      languages: { es: "/es/servicios", en: "/en/services", "x-default": "/es/servicios" },
    },
  };
}

export default async function ServiciosPage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();
  if (lang === "en") redirect(withLang("en", "services"));

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "inicio", item: `${siteUrl}/es` },
      { "@type": "ListItem", position: 2, name: "servicios", item: `${siteUrl}/es/servicios` },
    ],
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />
      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">servicios</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          áreas de trabajo donde el criterio y la ejecución marcan la diferencia.
        </p>
      </header>
      <section aria-labelledby="servicios-heading" className="mb-12">
        <h2 id="servicios-heading" className="sr-only text-base font-semibold tracking-tight">listado de servicios</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-t border-zinc-200 text-sm">
            <thead className="border-b border-zinc-200 text-left text-xs uppercase tracking-wide text-zinc-500">
              <tr>
                <th scope="col" className="py-3 pr-4">servicio</th>
                <th scope="col" className="py-3 pr-4">descripción</th>
                <th scope="col" className="py-3 pr-4">enlace</th>
              </tr>
            </thead>
            <tbody>
              {SERVICIOS.map((service) => (
                <tr key={service.slug} className="border-b border-zinc-100 last:border-b-0">
                  <th scope="row" className="py-3 pr-4 text-sm font-medium text-zinc-900">{service.name}</th>
                  <td className="py-3 pr-4 text-sm text-zinc-700">{service.description}</td>
                  <td className="py-3 pr-4 text-sm">
                    <Link href={withLang("es", `servicios/${service.slug}`)} className="text-zinc-900 underline">
                      ver servicio
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section aria-labelledby="relations-heading" className="mt-8">
        <h2 id="relations-heading" className="text-base font-semibold tracking-tight">servicios, áreas y proyectos</h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          cada servicio se cruza con contextos y proyectos distintos. desde aquí puedes explorar el trabajo de enblanco por{" "}
          <Link href={withLang("es", "areas")} className="underline">áreas</Link>, revisar{" "}
          <Link href={withLang("es", "proyectos")} className="underline">proyectos</Link> o leer{" "}
          <Link href={withLang("es", "notas")} className="underline">notas</Link> donde contamos decisiones y procesos.
        </p>
      </section>
    </main>
  );
}
