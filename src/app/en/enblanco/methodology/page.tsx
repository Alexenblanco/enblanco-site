import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/Seo/JsonLd";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

export const metadata: Metadata = {
  title: "enblanco methodology",
  description:
    "Think clearly, design as a system. How we structure work at enblanco.",
  alternates: {
    canonical: "/en/enblanco/methodology",
    languages: {
      es: "/es/enblanco/metodologia",
      en: "/en/enblanco/methodology",
      "x-default": "/es/enblanco/metodologia",
    },
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "home", item: `${siteUrl}/en` },
    { "@type": "ListItem", position: 2, name: "enblanco", item: `${siteUrl}/en/enblanco` },
    { "@type": "ListItem", position: 3, name: "methodology", item: `${siteUrl}/en/enblanco/methodology` },
  ],
};

export default function MethodologyPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />

      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">
          enblanco methodology: think clearly, design as a system
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          How we structure work so the outcome is applicable and sustainable.
        </p>
      </header>

      <section id="discovery" aria-labelledby="discovery-heading" className="mb-8">
        <h2 id="discovery-heading" className="text-base font-semibold tracking-tight">
          discovery
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          We understand context, audiences, and goals. Short sessions, minimal documentation, and clear conclusions before moving to the next phase.
        </p>
      </section>

      <section id="strategy" aria-labelledby="strategy-heading" className="mb-8">
        <h2 id="strategy-heading" className="text-base font-semibold tracking-tight">
          strategy
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          Positioning, message, and priorities. What the brand should say and in what order, so design doesn&apos;t work in the dark.
        </p>
      </section>

      <section id="creativity-and-design" aria-labelledby="creativity-heading" className="mb-8">
        <h2 id="creativity-heading" className="text-base font-semibold tracking-tight">
          creativity &amp; design
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          Identity, visual system, and assets. All with reusable judgment: the client can keep applying the system without depending on us for every detail.
        </p>
      </section>

      <section id="production-and-launch" aria-labelledby="production-heading" className="mb-8">
        <h2 id="production-heading" className="text-base font-semibold tracking-tight">
          production &amp; launch
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          We support rollout: key applications, coordination with suppliers, and handover of guidelines so the internal team can continue.
        </p>
      </section>

      <section id="contact" aria-labelledby="contact-heading" className="mb-8">
        <h2 id="contact-heading" className="text-base font-semibold tracking-tight">
          contact
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          If you want to see how we&apos;d apply this to your project:{" "}
          <Link href="/en/contact" className="underline">contact</Link> or{" "}
          <a href="mailto:hola@agenciaenblanco.com" className="underline">hola@agenciaenblanco.com</a>.{" "}
          <Link href="/en/enblanco" className="underline">Back to enblanco</Link>.
        </p>
      </section>
    </main>
  );
}
