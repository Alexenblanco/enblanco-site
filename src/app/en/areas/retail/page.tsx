import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/Seo/JsonLd";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

export const metadata: Metadata = {
  title: "retail",
  description: "brand, packaging, and digital built for fast decisions.",
  alternates: {
    canonical: "/en/areas/retail",
    languages: {
      es: "/es/areas/retail",
      en: "/en/areas/retail",
      "x-default": "/es/areas/retail",
    },
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "home", item: `${siteUrl}/en` },
    { "@type": "ListItem", position: 2, name: "areas", item: `${siteUrl}/en/areas` },
    { "@type": "ListItem", position: 3, name: "retail", item: `${siteUrl}/en/areas/retail` },
  ],
};

export default function AreaRetailPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />

      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">
          retail: brand, packaging, and digital built for fast decisions
        </h1>
      </header>

      <section id="context-challenges" aria-labelledby="retos-heading" className="mb-8">
        <h2 id="retos-heading" className="text-base font-semibold tracking-tight">
          context challenges
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          in retail, decision time is minimal: the customer chooses in seconds. the brand has to be clear on shelf and consistent online so the choice is quick and confident.
        </p>
      </section>

      <section id="recommended-services" aria-labelledby="servicios-heading" className="mb-8">
        <h2 id="servicios-heading" className="text-base font-semibold tracking-tight">
          recommended services
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          <Link href="/en/services/branding" className="underline">branding</Link>,{" "}
          <Link href="/en/services/packaging" className="underline">packaging</Link>, and{" "}
          <Link href="/en/services/web-design" className="underline">web design</Link> fit this context best. also{" "}
          <Link href="/en/services/art-direction" className="underline">art direction</Link> when there are campaigns and multiple touchpoints.
        </p>
      </section>

      <section id="how-we-approach-it" aria-labelledby="abordamos-heading" className="mb-8">
        <h2 id="abordamos-heading" className="text-base font-semibold tracking-tight">
          how we approach it
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          we prioritize information hierarchy and consistency between physical and digital channels. the brand system has to withstand range extensions and seasonal updates without losing clarity.
        </p>
      </section>

      <section id="related-projects" aria-labelledby="proyectos-heading" className="mb-8">
        <h2 id="proyectos-heading" className="text-base font-semibold tracking-tight">
          related projects
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          you can see retail cases in{" "}
          <Link href="/en/projects" className="underline">projects</Link> filtered by{" "}
          <Link href="/en/projects/packaging" className="underline">packaging</Link> or{" "}
          <Link href="/en/projects/branding" className="underline">branding</Link>.
        </p>
      </section>

      <section id="faq" aria-labelledby="faq-heading" className="mb-8">
        <h2 id="faq-heading" className="text-base font-semibold tracking-tight">
          faq
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          timelines, coordination with buying or store teams, and adaptation to different formats: we agree on this at the start of the project.
        </p>
      </section>

      <section id="contact" aria-labelledby="contacto-heading" className="mb-8">
        <h2 id="contacto-heading" className="text-base font-semibold tracking-tight">
          contact
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          if you have a retail project in mind, reach us via{" "}
          <Link href="/en/contact" className="underline">contact</Link> or at{" "}
          <a href="mailto:hola@agenciaenblanco.com" className="underline">hola@agenciaenblanco.com</a>.
        </p>
      </section>
    </main>
  );
}
