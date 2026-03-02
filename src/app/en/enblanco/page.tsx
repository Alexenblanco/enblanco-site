import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/Seo/JsonLd";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

export const metadata: Metadata = {
  title: "enblanco, creative agency",
  description:
    "enblanco is a creative agency for branding, design, and direction. Judgment, system, and execution.",
  alternates: {
    canonical: "/en/enblanco",
    languages: {
      es: "/es/enblanco",
      en: "/en/enblanco",
      "x-default": "/es/enblanco",
    },
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "home", item: `${siteUrl}/en` },
    { "@type": "ListItem", position: 2, name: "enblanco", item: `${siteUrl}/en/enblanco` },
  ],
};

export default function EnblancoPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />

      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">
          enblanco, creative agency
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          We work on brand, design, and communication systems with clear judgment: clarity, order, and execution without noise.
        </p>
      </header>

      <section id="what-we-do" aria-labelledby="what-we-do-heading" className="mb-8">
        <h2 id="what-we-do-heading" className="text-base font-semibold tracking-tight">
          what we do
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          Branding, naming, brand consulting, art direction, creative strategy and campaigns, packaging, and web design. Every project starts with diagnosis and ends with an applicable system.
        </p>
        <p className="mt-2 text-sm text-zinc-700">
          <Link href="/en/services" className="underline">View services</Link> and{" "}
          <Link href="/en/areas" className="underline">areas</Link> of work.
        </p>
      </section>

      <section id="how-we-think" aria-labelledby="how-we-think-heading" className="mb-8">
        <h2 id="how-we-think-heading" className="text-base font-semibold tracking-tight">
          how we think
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          We prioritize order before design: positioning, message, and priorities. From there we build identity and assets that hold up over time.
        </p>
        <p className="mt-2 text-sm text-zinc-700">
          <Link href="/en/enblanco/methodology" className="underline">enblanco methodology</Link>.
        </p>
      </section>

      <section id="services-and-areas" aria-labelledby="services-areas-heading" className="mb-8">
        <h2 id="services-areas-heading" className="text-base font-semibold tracking-tight">
          services and areas
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          We work by type of project (services) and by sector context (areas). Projects span both:{" "}
          <Link href="/en/projects" className="underline">projects</Link>,{" "}
          <Link href="/en/services" className="underline">services</Link>,{" "}
          <Link href="/en/areas" className="underline">areas</Link>.
        </p>
      </section>

      <section id="faq" aria-labelledby="faq-heading" className="mb-8">
        <h2 id="faq-heading" className="text-base font-semibold tracking-tight">
          faq
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          Timelines, budgets, deliverables, and ways of working. We clarify in a first conversation and put it in writing.
        </p>
        <p className="mt-2 text-sm text-zinc-700">
          <Link href="/en/enblanco/faq" className="underline">View FAQ</Link>.
        </p>
      </section>

      <section id="contact" aria-labelledby="contact-heading" className="mb-8">
        <h2 id="contact-heading" className="text-base font-semibold tracking-tight">
          contact
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          To tell us about a project or propose a collaboration:{" "}
          <Link href="/en/contact" className="underline">contact</Link> or{" "}
          <a href="mailto:hola@agenciaenblanco.com" className="underline">hola@agenciaenblanco.com</a>.
        </p>
      </section>
    </main>
  );
}
