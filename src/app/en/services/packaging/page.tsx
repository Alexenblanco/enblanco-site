import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/Seo/JsonLd";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

export const metadata: Metadata = {
  title: "packaging",
  description: "hierarchy, clarity, presence. the rest is noise.",
  alternates: {
    canonical: "/en/services/packaging",
    languages: {
      es: "/es/servicios/packaging",
      en: "/en/services/packaging",
      "x-default": "/es/servicios/packaging",
    },
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "home",
      item: `${siteUrl}/en`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "services",
      item: `${siteUrl}/en/services`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "packaging",
      item: `${siteUrl}/en/services/packaging`,
    },
  ],
};

export default function PackagingServicePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />

      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">packaging</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          hierarchy, clarity, presence. the rest is noise.
        </p>
      </header>

      <section
        id="what-it-solves"
        aria-labelledby="what-it-solves-heading"
        className="mb-8"
      >
        <h2
          id="what-it-solves-heading"
          className="text-base font-semibold tracking-tight"
        >
          what it solves
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          on shelf or online, decision time is minimal. packaging organizes
          information so it&apos;s clear what it is, who it&apos;s for, and why
          to choose it.
        </p>
      </section>

      <section
        id="approach"
        aria-labelledby="approach-heading"
        className="mb-8"
      >
        <h2
          id="approach-heading"
          className="text-base font-semibold tracking-tight"
        >
          approach
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          we work with clear hierarchies: brand, category, benefit, and proof.
          we cross physical and digital context so the piece works both in hand
          and on screen.
        </p>
      </section>

      <section
        id="deliverables"
        aria-labelledby="deliverables-heading"
        className="mb-8"
      >
        <h2
          id="deliverables-heading"
          className="text-base font-semibold tracking-tight"
        >
          deliverables
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          range architecture proposals, pack designs, key format adaptations,
          and guidelines for brand and claims in packaging.
        </p>
      </section>

      <section
        id="related-work"
        aria-labelledby="related-work-heading"
        className="mb-8"
      >
        <h2
          id="related-work-heading"
          className="text-base font-semibold tracking-tight"
        >
          related work
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          you can see examples in{" "}
          <Link href="/en/projects/packaging" className="underline">
            packaging projects
          </Link>{" "}
          and in{" "}
          <Link href="/en/areas/food" className="underline">
            food
          </Link>{" "}
          and{" "}
          <Link href="/en/areas/retail" className="underline">
            retail
          </Link>{" "}
          contexts.
        </p>
      </section>

      <section id="faq" aria-labelledby="faq-heading" className="mb-8">
        <h2
          id="faq-heading"
          className="text-base font-semibold tracking-tight"
        >
          faq
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          how we handle regulatory changes, range extensions, and market
          adaptations: we factor this into the project from the start.
        </p>
      </section>

      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="mb-8"
      >
        <h2
          id="contact-heading"
          className="text-base font-semibold tracking-tight"
        >
          contact
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          if you&apos;re rethinking a brand or category&apos;s packaging, you
          can reach us through{" "}
          <Link href="/en/contact" className="underline">
            contact
          </Link>{" "}
          or at{" "}
          <a href="mailto:hola@agenciaenblanco.com" className="underline">
            hola@agenciaenblanco.com
          </a>
          .
        </p>
      </section>
    </main>
  );
}

