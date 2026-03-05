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
  if (!isValidLang(lang) || lang === "es") return {};
  return {
    title: "team",
    description:
      "The enblanco team: branding, design, and direction with clear judgment.",
    alternates: {
      canonical: "/en/enblanco/team",
      languages: {
        es: "/es/enblanco/equipo",
        en: "/en/enblanco/team",
        "x-default": "/es/enblanco/equipo",
      },
    },
  };
}

export default async function TeamPage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();
  if (lang === "es") redirect(withLang("es", "enblanco/equipo"));

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "home", item: `${siteUrl}/en` },
      { "@type": "ListItem", position: 2, name: "enblanco", item: `${siteUrl}/en/enblanco` },
      { "@type": "ListItem", position: 3, name: "team", item: `${siteUrl}/en/enblanco/team` },
    ],
  };

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />
      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">team</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          The people behind enblanco. We work from Murcia and Madrid.
        </p>
      </header>
      <section id="team" aria-labelledby="team-heading" className="mb-8">
        <h2 id="team-heading" className="text-base font-semibold tracking-tight">
          enblanco
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          Multidisciplinary team: strategy, design, and art direction. Team information will be updated here.
        </p>
      </section>
      <section id="contact" aria-labelledby="contact-heading" className="mb-8">
        <h2 id="contact-heading" className="text-base font-semibold tracking-tight">
          contact
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          <Link href={withLang("en", "contact")} className="underline">Contact</Link> or{" "}
          <a href="mailto:hola@agenciaenblanco.com" className="underline">hola@agenciaenblanco.com</a>.{" "}
          <Link href={withLang("en", "enblanco")} className="underline">Back to enblanco</Link>.
        </p>
      </section>
    </main>
  );
}
