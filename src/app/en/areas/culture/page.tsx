import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/Seo/JsonLd";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

export const metadata: Metadata = {
  title: "culture",
  description: "identity and art direction with narrative and judgment.",
  alternates: {
    canonical: "/en/areas/culture",
    languages: {
      es: "/es/areas/cultura",
      en: "/en/areas/culture",
      "x-default": "/es/areas/cultura",
    },
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "home", item: `${siteUrl}/en` },
    { "@type": "ListItem", position: 2, name: "areas", item: `${siteUrl}/en/areas` },
    { "@type": "ListItem", position: 3, name: "culture", item: `${siteUrl}/en/areas/culture` },
  ],
};

export default function AreaCulturePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />

      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">
          culture: identity and art direction with narrative and judgment
        </h1>
      </header>

      <section id="context-challenges" aria-labelledby="retos-heading" className="mb-8">
        <h2 id="retos-heading" className="text-base font-semibold tracking-tight">
          context challenges
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          in culture the identity has to connect with a narrative and a demanding audience. art direction isn&apos;t decoration: it has to support the discourse and stand out without feeling predictable.
        </p>
      </section>

      <section id="recommended-services" aria-labelledby="servicios-heading" className="mb-8">
        <h2 id="servicios-heading" className="text-base font-semibold tracking-tight">
          recommended services
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          <Link href="/en/services/art-direction" className="underline">art direction</Link>,{" "}
          <Link href="/en/services/branding" className="underline">branding</Link>, and{" "}
          <Link href="/en/services/creative-strategy-campaigns" className="underline">creative strategy & campaigns</Link>. sometimes{" "}
          <Link href="/en/services/naming" className="underline">naming</Link> for institutions or new initiatives.
        </p>
      </section>

      <section id="how-we-approach-it" aria-labelledby="abordamos-heading" className="mb-8">
        <h2 id="abordamos-heading" className="text-base font-semibold tracking-tight">
          how we approach it
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          we start from the narrative and the audience. identity and art direction have to be recognizable and consistent over time, without giving up distinctiveness or editorial judgment.
        </p>
      </section>

      <section id="related-projects" aria-labelledby="proyectos-heading" className="mb-8">
        <h2 id="proyectos-heading" className="text-base font-semibold tracking-tight">
          related projects
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          cases in{" "}
          <Link href="/en/projects/art-direction" className="underline">art direction</Link> and{" "}
          <Link href="/en/projects" className="underline">projects</Link>. reflections in{" "}
          <Link href="/en/notes" className="underline">notes</Link>.
        </p>
      </section>

      <section id="faq" aria-labelledby="faq-heading" className="mb-8">
        <h2 id="faq-heading" className="text-base font-semibold tracking-tight">
          faq
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          timelines, coordination with content teams, and tight budgets: we discuss this transparently from the start.
        </p>
      </section>

      <section id="contact" aria-labelledby="contacto-heading" className="mb-8">
        <h2 id="contacto-heading" className="text-base font-semibold tracking-tight">
          contact
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          for culture projects:{" "}
          <Link href="/en/contact" className="underline">contact</Link> or{" "}
          <a href="mailto:hola@agenciaenblanco.com" className="underline">hola@agenciaenblanco.com</a>.
        </p>
      </section>
    </main>
  );
}
