import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/Seo/JsonLd";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

export const metadata: Metadata = {
  title: "health",
  description: "clarity, trust, and communication that holds up.",
  alternates: {
    canonical: "/en/areas/health",
    languages: {
      es: "/es/areas/salud",
      en: "/en/areas/health",
      "x-default": "/es/areas/salud",
    },
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "home", item: `${siteUrl}/en` },
    { "@type": "ListItem", position: 2, name: "areas", item: `${siteUrl}/en/areas` },
    { "@type": "ListItem", position: 3, name: "health", item: `${siteUrl}/en/areas/health` },
  ],
};

export default function AreaHealthPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />

      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">
          health: clarity, trust, and communication that holds up
        </h1>
      </header>

      <section id="context-challenges" aria-labelledby="retos-heading" className="mb-8">
        <h2 id="retos-heading" className="text-base font-semibold tracking-tight">
          context challenges
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          in health, regulation and trust are paramount. communication has to be precise, accessible, and consistent over time—without slipping into jargon or empty messaging.
        </p>
      </section>

      <section id="recommended-services" aria-labelledby="servicios-heading" className="mb-8">
        <h2 id="servicios-heading" className="text-base font-semibold tracking-tight">
          recommended services
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          <Link href="/en/services/brand-consulting" className="underline">brand consulting</Link>,{" "}
          <Link href="/en/services/branding" className="underline">branding</Link>, and{" "}
          <Link href="/en/services/creative-strategy-campaigns" className="underline">creative strategy & campaigns</Link> to align message and tone before design.
        </p>
      </section>

      <section id="how-we-approach-it" aria-labelledby="abordamos-heading" className="mb-8">
        <h2 id="abordamos-heading" className="text-base font-semibold tracking-tight">
          how we approach it
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          we start from regulation and audience mapping. we define a language that balances rigor and approachability, and apply it consistently across all touchpoints.
        </p>
      </section>

      <section id="related-projects" aria-labelledby="proyectos-heading" className="mb-8">
        <h2 id="proyectos-heading" className="text-base font-semibold tracking-tight">
          related projects
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          health cases in{" "}
          <Link href="/en/projects" className="underline">projects</Link> and in{" "}
          <Link href="/en/notes" className="underline">notes</Link> where we discuss sector communication.
        </p>
      </section>

      <section id="faq" aria-labelledby="faq-heading" className="mb-8">
        <h2 id="faq-heading" className="text-base font-semibold tracking-tight">
          faq
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          how we work with approval committees, validation timelines, and market adaptation: we define this from the outset.
        </p>
      </section>

      <section id="contact" aria-labelledby="contacto-heading" className="mb-8">
        <h2 id="contacto-heading" className="text-base font-semibold tracking-tight">
          contact
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          for health communication projects:{" "}
          <Link href="/en/contact" className="underline">contact</Link> or{" "}
          <a href="mailto:hola@agenciaenblanco.com" className="underline">hola@agenciaenblanco.com</a>.
        </p>
      </section>
    </main>
  );
}
