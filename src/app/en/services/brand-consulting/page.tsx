import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/Seo/JsonLd";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

export const metadata: Metadata = {
  title: "brand consulting",
  description:
    "we align positioning, message, and priorities before design.",
  alternates: {
    canonical: "/en/services/brand-consulting",
    languages: {
      es: "/es/servicios/consultoria-de-marca",
      en: "/en/services/brand-consulting",
      "x-default": "/es/servicios/consultoria-de-marca",
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
      name: "brand consulting",
      item: `${siteUrl}/en/services/brand-consulting`,
    },
  ],
};

export default function BrandConsultingServicePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />

      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">
          brand consulting
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          we align positioning, message, and priorities before design.
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
          when a brand wants to be everywhere at once, focus is easy to lose.
          consulting helps decide what we say, to whom, and from which
          position, before investing in design or campaigns.
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
          we work with short sessions and minimal but clear documentation:
          stakeholders, positioning, key messages, and channel priorities. the
          focus is on practical decisions, not adding theory.
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
          a concise brand platform, message lines, and priorities per audience.
          it becomes the base for{" "}
          <Link href="/en/services/branding" className="underline">
            branding
          </Link>{" "}
          or{" "}
          <Link
            href="/en/services/creative-strategy-campaigns"
            className="underline"
          >
            creative strategy & campaigns
          </Link>
          .
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
          you can see projects where consulting was key in{" "}
          <Link
            href="/en/projects/brand-consulting"
            className="underline"
          >
            brand consulting projects
          </Link>{" "}
          and in{" "}
          <Link href="/en/areas" className="underline">
            areas
          </Link>{" "}
          like industry or startups.
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
          how much information we need, how to involve the team, and what
          happens if conclusions affect the brand architecture: we clarify this
          at the outset.
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
          if you&apos;re revisiting brand strategy or preparing a shift, you
          can write via{" "}
          <Link href="/en/contact" className="underline">
            contact
          </Link>{" "}
          or directly to{" "}
          <a href="mailto:hola@agenciaenblanco.com" className="underline">
            hola@agenciaenblanco.com
          </a>
          .
        </p>
      </section>
    </main>
  );
}

