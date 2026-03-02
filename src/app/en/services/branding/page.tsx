import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/Seo/JsonLd";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

export const metadata: Metadata = {
  title: "branding",
  description:
    "we build brand systems: clear, durable, and easy to apply.",
  alternates: {
    canonical: "/en/services/branding",
    languages: {
      es: "/es/servicios/branding",
      en: "/en/services/branding",
      "x-default": "/es/servicios/branding",
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
      name: "branding",
      item: `${siteUrl}/en/services/branding`,
    },
  ],
};

export default function BrandingServicePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />

      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">branding</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          we build brand systems: clear, durable, and easy to apply.
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
          when a brand grows through disconnected assets, every channel tells a
          different story. branding brings a single idea, a visual system, and
          a tone that can be applied to any format.
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
          we work in clear layers: diagnosis, brand platform, and visual
          system. the goal is for internal teams and external partners to make
          quick decisions without losing consistency.
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
          depending on the context: brand platform, full visual identity,
          typography and color systems, key applications, and a concise
          guideline that explains how to use everything without relying on us.
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
          you can see branding applied in{" "}
          <Link href="/en/projects/branding" className="underline">
            branding projects
          </Link>{" "}
          and in specific contexts within{" "}
          <Link href="/en/areas" className="underline">
            areas
          </Link>
          .
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
          timing, deliverable formats, ongoing support, and updates: we usually
          clarify this in an initial call and write it down before starting.
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
          if you want to check whether a project fits this kind of work, you
          can reach us through the{" "}
          <Link href="/en/contact" className="underline">
            contact
          </Link>{" "}
          page or directly at{" "}
          <a href="mailto:hola@agenciaenblanco.com" className="underline">
            hola@agenciaenblanco.com
          </a>
          .
        </p>
      </section>
    </main>
  );
}

