import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/Seo/JsonLd";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

export const metadata: Metadata = {
  title: "faq",
  description:
    "Timelines, budgets, deliverables, and ways of working at enblanco.",
  alternates: {
    canonical: "/en/enblanco/faq",
    languages: {
      es: "/es/enblanco/faq",
      en: "/en/enblanco/faq",
      "x-default": "/es/enblanco/faq",
    },
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "home", item: `${siteUrl}/en` },
    { "@type": "ListItem", position: 2, name: "enblanco", item: `${siteUrl}/en/enblanco` },
    { "@type": "ListItem", position: 3, name: "faq", item: `${siteUrl}/en/enblanco/faq` },
  ],
};

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />

      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">
          faq
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          What we&apos;re usually asked about timelines, budgets, deliverables, and collaboration.
        </p>
      </header>

      <section id="timelines" aria-labelledby="timelines-heading" className="mb-8">
        <h2 id="timelines-heading" className="text-base font-semibold tracking-tight">
          timelines
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          They depend on scope. A medium branding project can take 8 to 14 weeks; naming or consulting, less. We define it in the first proposal and put it in writing.
        </p>
      </section>

      <section id="budgets" aria-labelledby="budgets-heading" className="mb-8">
        <h2 id="budgets-heading" className="text-base font-semibold tracking-tight">
          budgets
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          We work per project, with a fixed scope. Not by the hour. The proposal includes phases, deliverables, and price; if scope changes, we revise.
        </p>
      </section>

      <section id="deliverables" aria-labelledby="deliverables-heading" className="mb-8">
        <h2 id="deliverables-heading" className="text-base font-semibold tracking-tight">
          deliverables
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          Each service has its deliverables: in branding, identity and guidelines; in naming, shortlist and rationale; in consulting, platform document. Everything is specified in the proposal.
        </p>
      </section>

      <section id="collaboration" aria-labelledby="collaboration-heading" className="mb-8">
        <h2 id="collaboration-heading" className="text-base font-semibold tracking-tight">
          ways of working
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          Fixed projects, retainer for ongoing support, or ad-hoc collaboration depending on the case. We discuss it in the first conversation.
        </p>
      </section>

      <section id="contact" aria-labelledby="contact-heading" className="mb-8">
        <h2 id="contact-heading" className="text-base font-semibold tracking-tight">
          contact
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          If your question isn&apos;t here:{" "}
          <Link href="/en/contact" className="underline">contact</Link> or{" "}
          <a href="mailto:hola@agenciaenblanco.com" className="underline">hola@agenciaenblanco.com</a>.{" "}
          <Link href="/en/enblanco" className="underline">Back to enblanco</Link>.
        </p>
      </section>
    </main>
  );
}
