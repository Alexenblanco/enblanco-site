import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/Seo/JsonLd";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

export const metadata: Metadata = {
  title: "creative strategy & campaigns",
  description:
    "concept, message, and a system of assets that holds together.",
  alternates: {
    canonical: "/en/services/creative-strategy-campaigns",
    languages: {
      es: "/es/servicios/estrategia-creativa-campanas",
      en: "/en/services/creative-strategy-campaigns",
      "x-default": "/es/servicios/estrategia-creativa-campanas",
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
      name: "creative strategy & campaigns",
      item: `${siteUrl}/en/services/creative-strategy-campaigns`,
    },
  ],
};

export default function CreativeStrategyServicePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />

      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">
          creative strategy &amp; campaigns
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          concept, message, and a system of assets that holds together.
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
          when every campaign starts from scratch, energy is lost debating
          basics. creative strategy defines the frame: concept, message, and
          the role of each channel.
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
          we combine context, goals, and brand to reach a clear concept. from
          there, we define visual and narrative territories and the logic of
          assets and formats.
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
          concept documents, message lines, campaign structure, and examples of
          key assets. when needed, we also handle creative production and
          coordination with media.
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
          you can see examples of creative strategy in{" "}
          <Link
            href="/en/projects/creative-strategy"
            className="underline"
          >
            creative strategy projects
          </Link>{" "}
          and in{" "}
          <Link href="/en/notes" className="underline">
            notes
          </Link>{" "}
          where we talk about campaigns.
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
          how we work with marketing teams, what information we need, and how
          we look at results: we agree on this at the start of the project.
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
          if you&apos;re planning a campaign or launch, you can reach us via{" "}
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

