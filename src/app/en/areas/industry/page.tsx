import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/Seo/JsonLd";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

export const metadata: Metadata = {
  title: "industry",
  description: "a solid brand is clarity, consistency, and rigor.",
  alternates: {
    canonical: "/en/areas/industry",
    languages: {
      es: "/es/areas/industria",
      en: "/en/areas/industry",
      "x-default": "/es/areas/industria",
    },
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "home", item: `${siteUrl}/en` },
    { "@type": "ListItem", position: 2, name: "areas", item: `${siteUrl}/en/areas` },
    { "@type": "ListItem", position: 3, name: "industry", item: `${siteUrl}/en/areas/industry` },
  ],
};

export default function AreaIndustryPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />

      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">
          industry: a solid brand is clarity, consistency, and rigor
        </h1>
      </header>

      <section id="context-challenges" aria-labelledby="retos-heading" className="mb-8">
        <h2 id="retos-heading" className="text-base font-semibold tracking-tight">
          context challenges
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          in B2B industry the brand is often invisible until it matters: tenders, partners, employees. the identity has to convey solidity and clarity without noise or trends.
        </p>
      </section>

      <section id="recommended-services" aria-labelledby="servicios-heading" className="mb-8">
        <h2 id="servicios-heading" className="text-base font-semibold tracking-tight">
          recommended services
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          <Link href="/en/services/brand-consulting" className="underline">brand consulting</Link>,{" "}
          <Link href="/en/services/branding" className="underline">branding</Link>, and{" "}
          <Link href="/en/services/web-design" className="underline">web design</Link> for consistent presence. often{" "}
          <Link href="/en/services/creative-strategy-campaigns" className="underline">creative strategy</Link> to communicate value to different audiences.
        </p>
      </section>

      <section id="how-we-approach-it" aria-labelledby="abordamos-heading" className="mb-8">
        <h2 id="abordamos-heading" className="text-base font-semibold tracking-tight">
          how we approach it
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          we align positioning and message before designing. the visual system has to last years, multiple divisions and channels, without feeling scattered or dated.
        </p>
      </section>

      <section id="related-projects" aria-labelledby="proyectos-heading" className="mb-8">
        <h2 id="proyectos-heading" className="text-base font-semibold tracking-tight">
          related projects
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          industry cases in{" "}
          <Link href="/en/projects/brand-consulting" className="underline">consulting</Link> and{" "}
          <Link href="/en/projects" className="underline">projects</Link>. more in{" "}
          <Link href="/en/notes" className="underline">notes</Link>.
        </p>
      </section>

      <section id="faq" aria-labelledby="faq-heading" className="mb-8">
        <h2 id="faq-heading" className="text-base font-semibold tracking-tight">
          faq
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          internal team involvement, timelines, and long-term brand evolution: we define this from the start.
        </p>
      </section>

      <section id="contact" aria-labelledby="contacto-heading" className="mb-8">
        <h2 id="contacto-heading" className="text-base font-semibold tracking-tight">
          contact
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          for industry projects:{" "}
          <Link href="/en/contact" className="underline">contact</Link> or{" "}
          <a href="mailto:hola@agenciaenblanco.com" className="underline">hola@agenciaenblanco.com</a>.
        </p>
      </section>
    </main>
  );
}
