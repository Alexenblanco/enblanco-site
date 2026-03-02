import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/Seo/JsonLd";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

export const metadata: Metadata = {
  title: "food",
  description: "packaging and brand built to be chosen in seconds.",
  alternates: {
    canonical: "/en/areas/food",
    languages: {
      es: "/es/areas/alimentacion",
      en: "/en/areas/food",
      "x-default": "/es/areas/alimentacion",
    },
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "home", item: `${siteUrl}/en` },
    { "@type": "ListItem", position: 2, name: "areas", item: `${siteUrl}/en/areas` },
    { "@type": "ListItem", position: 3, name: "food", item: `${siteUrl}/en/areas/food` },
  ],
};

export default function AreaFoodPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />

      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">
          food: packaging and brand built to be chosen in seconds
        </h1>
      </header>

      <section id="context-challenges" aria-labelledby="retos-heading" className="mb-8">
        <h2 id="retos-heading" className="text-base font-semibold tracking-tight">
          context challenges
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          in food, the pack competes on shelf and on screen. brand and packaging have to convey origin, quality, and difference in very little time and space.
        </p>
      </section>

      <section id="recommended-services" aria-labelledby="servicios-heading" className="mb-8">
        <h2 id="servicios-heading" className="text-base font-semibold tracking-tight">
          recommended services
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          <Link href="/en/services/packaging" className="underline">packaging</Link>,{" "}
          <Link href="/en/services/branding" className="underline">branding</Link>, and{" "}
          <Link href="/en/services/naming" className="underline">naming</Link> for brands and ranges. sometimes{" "}
          <Link href="/en/services/art-direction" className="underline">art direction</Link> for campaigns and content.
        </p>
      </section>

      <section id="how-we-approach-it" aria-labelledby="abordamos-heading" className="mb-8">
        <h2 id="abordamos-heading" className="text-base font-semibold tracking-tight">
          how we approach it
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          we hierarchy pack information: what the product is, who it&apos;s for, and why choose it. the identity has to work across multiple SKUs and formats without losing legibility or impact.
        </p>
      </section>

      <section id="related-projects" aria-labelledby="proyectos-heading" className="mb-8">
        <h2 id="proyectos-heading" className="text-base font-semibold tracking-tight">
          related projects
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          examples in{" "}
          <Link href="/en/projects/packaging" className="underline">packaging projects</Link> and{" "}
          <Link href="/en/projects" className="underline">projects</Link>. more context in{" "}
          <Link href="/en/notes" className="underline">notes</Link>.
        </p>
      </section>

      <section id="faq" aria-labelledby="faq-heading" className="mb-8">
        <h2 id="faq-heading" className="text-base font-semibold tracking-tight">
          faq
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          food regulation, production timelines, and range extension: we agree on this at the start.
        </p>
      </section>

      <section id="contact" aria-labelledby="contacto-heading" className="mb-8">
        <h2 id="contacto-heading" className="text-base font-semibold tracking-tight">
          contact
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          for food projects:{" "}
          <Link href="/en/contact" className="underline">contact</Link> or{" "}
          <a href="mailto:hola@agenciaenblanco.com" className="underline">hola@agenciaenblanco.com</a>.
        </p>
      </section>
    </main>
  );
}
