import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/Seo/JsonLd";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

export const metadata: Metadata = {
  title: "naming",
  description: "names that fit the strategy and work in real use.",
  alternates: {
    canonical: "/en/services/naming",
    languages: {
      es: "/es/servicios/naming",
      en: "/en/services/naming",
      "x-default": "/es/servicios/naming",
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
      name: "naming",
      item: `${siteUrl}/en/services/naming`,
    },
  ],
};

export default function NamingServicePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />

      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">naming</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          names that fit the strategy and work in real use.
        </p>
      </header>

      <section id="criteria" aria-labelledby="criteria-heading" className="mb-8">
        <h2
          id="criteria-heading"
          className="text-base font-semibold tracking-tight"
        >
          criteria
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          we work with clear criteria: strategic fit, language register,
          potential for extension, and basic availability checks. the name has
          to hold up in daily use, not only in a presentation.
        </p>
      </section>

      <section id="approach" aria-labelledby="approach-heading" className="mb-8">
        <h2
          id="approach-heading"
          className="text-base font-semibold tracking-tight"
        >
          approach
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          we combine light research, workshops with the team, and creative
          exploration sessions. the result is a reasoned shortlist, with real
          pros and cons so you can decide with context.
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
          name proposals with rationale, first availability checks, and
          recommendations for registration and domains. where relevant, we also
          leave a short usage guide.
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
          some naming work appears in{" "}
          <Link href="/en/projects/naming" className="underline">
            naming projects
          </Link>{" "}
          and in{" "}
          <Link href="/en/notes" className="underline">
            notes
          </Link>{" "}
          where we talk about criteria.
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
          what happens if no proposal fits, how we handle scope changes, and
          what timelines are realistic: we fix this in writing before starting.
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
          if you&apos;re considering a new name or a rename, you can reach us
          via{" "}
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

