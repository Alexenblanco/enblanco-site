import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/Seo/JsonLd";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

export const metadata: Metadata = {
  title: "startups & technology",
  description: "brand and product with system, without friction.",
  alternates: {
    canonical: "/en/areas/startups-technology",
    languages: {
      es: "/es/areas/startups-tecnologia",
      en: "/en/areas/startups-technology",
      "x-default": "/es/areas/startups-tecnologia",
    },
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "home", item: `${siteUrl}/en` },
    { "@type": "ListItem", position: 2, name: "areas", item: `${siteUrl}/en/areas` },
    { "@type": "ListItem", position: 3, name: "startups & technology", item: `${siteUrl}/en/areas/startups-technology` },
  ],
};

export default function AreaStartupsTechnologyPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />

      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">
          startups &amp; technology: brand and product with system, without friction
        </h1>
      </header>

      <section id="context-challenges" aria-labelledby="retos-heading" className="mb-8">
        <h2 id="retos-heading" className="text-base font-semibold tracking-tight">
          context challenges
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          in startups and tech the brand grows with the product. you need a system that scales: naming, identity, and digital presence that don&apos;t feel outdated in six months.
        </p>
      </section>

      <section id="recommended-services" aria-labelledby="servicios-heading" className="mb-8">
        <h2 id="servicios-heading" className="text-base font-semibold tracking-tight">
          recommended services
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          <Link href="/en/services/naming" className="underline">naming</Link>,{" "}
          <Link href="/en/services/branding" className="underline">branding</Link>,{" "}
          <Link href="/en/services/web-design" className="underline">web design</Link>, and sometimes{" "}
          <Link href="/en/services/brand-consulting" className="underline">brand consulting</Link> to align positioning before launch.
        </p>
      </section>

      <section id="how-we-approach-it" aria-labelledby="abordamos-heading" className="mb-8">
        <h2 id="abordamos-heading" className="text-base font-semibold tracking-tight">
          how we approach it
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          we define a solid base from the start: name, identity, and visual system that can grow without a full redesign every six months. the brand has to coexist with the product without competing with it.
        </p>
      </section>

      <section id="related-projects" aria-labelledby="proyectos-heading" className="mb-8">
        <h2 id="proyectos-heading" className="text-base font-semibold tracking-tight">
          related projects
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          cases in{" "}
          <Link href="/en/projects/web-design" className="underline">web design</Link>,{" "}
          <Link href="/en/projects/naming" className="underline">naming</Link>, and{" "}
          <Link href="/en/projects" className="underline">projects</Link>. more in{" "}
          <Link href="/en/notes" className="underline">notes</Link>.
        </p>
      </section>

      <section id="faq" aria-labelledby="faq-heading" className="mb-8">
        <h2 id="faq-heading" className="text-base font-semibold tracking-tight">
          faq
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          timelines for MVP, coordination with product teams, and brand evolution: we discuss this in the first conversation.
        </p>
      </section>

      <section id="contact" aria-labelledby="contacto-heading" className="mb-8">
        <h2 id="contacto-heading" className="text-base font-semibold tracking-tight">
          contact
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          for startups or technology projects:{" "}
          <Link href="/en/contact" className="underline">contact</Link> or{" "}
          <a href="mailto:hola@agenciaenblanco.com" className="underline">hola@agenciaenblanco.com</a>.
        </p>
      </section>
    </main>
  );
}
