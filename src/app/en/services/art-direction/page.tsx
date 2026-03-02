import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/Seo/JsonLd";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

export const metadata: Metadata = {
  title: "art direction",
  description:
    "a system-led aesthetic: consistent across every piece and channel.",
  alternates: {
    canonical: "/en/services/art-direction",
    languages: {
      es: "/es/servicios/direccion-de-arte",
      en: "/en/services/art-direction",
      "x-default": "/es/servicios/direccion-de-arte",
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
      name: "art direction",
      item: `${siteUrl}/en/services/art-direction`,
    },
  ],
};

export default function ArtDirectionServicePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />

      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">
          art direction
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          a system-led aesthetic: consistent across every piece and channel.
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
          when every campaign looks like it belongs to a different brand, art
          direction sets clear rules: what repeats, what can change, and what
          never does. the brand is recognized even before the logo appears.
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
          we start from the brand platform and translate it into decisions:
          imagery, layout rhythm, color usage, and visual tone. we look for a
          language that works the same in on and offline channels.
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
          art direction guidelines, key templates, photography and illustration
          references, and examples across campaigns, social, and editorial
          pieces.
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
          you can see projects where art direction is central in{" "}
          <Link href="/en/projects/art-direction" className="underline">
            art direction projects
          </Link>{" "}
          and in{" "}
          <Link href="/en/areas/culture" className="underline">
            culture
          </Link>{" "}
          or{" "}
          <Link href="/en/areas/retail" className="underline">
            retail
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
          how we work with in-house teams, what happens if other agencies are
          already involved, and how art direction travels across markets: we
          define it case by case.
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
          if you need art direction that connects campaign, product, and
          digital, you can reach us through{" "}
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

