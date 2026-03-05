import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import JsonLd from "@/components/Seo/JsonLd";
import { withLang, isValidLang } from "@/lib/i18n/path";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang) || lang === "en") return {};
  return {
    title: "equipo",
    description:
      "El equipo de enblanco: branding, diseño y dirección con criterio.",
    alternates: {
      canonical: "/es/enblanco/equipo",
      languages: {
        es: "/es/enblanco/equipo",
        en: "/en/enblanco/team",
        "x-default": "/es/enblanco/equipo",
      },
    },
  };
}

export default async function EquipoPage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();
  if (lang === "en") redirect(withLang("en", "enblanco/team"));

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "inicio", item: `${siteUrl}/es` },
      { "@type": "ListItem", position: 2, name: "enblanco", item: `${siteUrl}/es/enblanco` },
      { "@type": "ListItem", position: 3, name: "equipo", item: `${siteUrl}/es/enblanco/equipo` },
    ],
  };

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />
      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">equipo</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          Las personas detrás de enblanco. Trabajamos desde Murcia y Madrid.
        </p>
      </header>
      <section id="equipo" aria-labelledby="equipo-heading" className="mb-8">
        <h2 id="equipo-heading" className="text-base font-semibold tracking-tight">
          enblanco
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          Equipo multidisciplinar: estrategia, diseño y dirección de arte. La información de equipo se actualizará aquí.
        </p>
      </section>
      <section id="contacto" aria-labelledby="contacto-heading" className="mb-8">
        <h2 id="contacto-heading" className="text-base font-semibold tracking-tight">
          contacto
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          <Link href={withLang("es", "contacto")} className="underline">Contacto</Link> o{" "}
          <a href="mailto:hola@agenciaenblanco.com" className="underline">hola@agenciaenblanco.com</a>.{" "}
          <Link href={withLang("es", "enblanco")} className="underline">Volver a enblanco</Link>.
        </p>
      </section>
    </main>
  );
}
