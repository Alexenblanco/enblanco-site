import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/Seo/JsonLd";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

export const metadata: Metadata = {
  title: "web design",
  description:
    "structure, experience, and performance—without friction.",
  alternates: {
    canonical: "/en/services/web-design",
    languages: {
      es: "/es/servicios/diseno-web",
      en: "/en/services/web-design",
      "x-default": "/es/servicios/diseno-web",
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
      name: "web design",
      item: `${siteUrl}/en/services/web-design`,
    },
  ],
};

export default function WebDesignServicePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />

      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">web design</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          structure, experience, and performance—without friction.
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
          websites that grow by accumulation become hard to use and maintain.
          web design aligns structure, content, and functionality so the site
          makes sense for visitors and for the team behind it.
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
          we combine information architecture, interaction design, and the
          visual system. we care about load times and long-term maintenance so
          the site stays useful, not just impressive at launch.
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
          navigation maps, wireframes, key page designs, and component systems.
          we can also coordinate implementation with your technical team.
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
          you can see web design work in{" "}
          <Link href="/en/projects/web-design" className="underline">
            web design projects
          </Link>{" "}
          and in{" "}
          <Link href="/en/areas/startups-technology" className="underline">
            startups &amp; technology
          </Link>{" "}
          or{" "}
          <Link href="/en/areas/culture" className="underline">
            culture
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
          which technologies we usually work with, how we coordinate in-house
          and external teams, and what happens with maintenance: we define this
          clearly before we begin.
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
          if you&apos;re considering a new site or a redesign, you can reach us
          through{" "}
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

