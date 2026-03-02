import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/Seo/JsonLd";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

export const metadata: Metadata = {
  title: "preguntas frecuentes",
  description:
    "Plazos, presupuestos, entregables y formas de colaboración en enblanco.",
  alternates: {
    canonical: "/es/enblanco/faq",
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
    { "@type": "ListItem", position: 1, name: "inicio", item: `${siteUrl}/es` },
    { "@type": "ListItem", position: 2, name: "enblanco", item: `${siteUrl}/es/enblanco` },
    { "@type": "ListItem", position: 3, name: "preguntas frecuentes", item: `${siteUrl}/es/enblanco/faq` },
  ],
};

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />

      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">
          preguntas frecuentes
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          Lo que suelen preguntarnos sobre plazos, presupuestos, entregables y colaboración.
        </p>
      </header>

      <section id="plazos" aria-labelledby="plazos-heading" className="mb-8">
        <h2 id="plazos-heading" className="text-base font-semibold tracking-tight">
          plazos
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          Dependen del alcance. Un proyecto de branding medio puede llevar entre 8 y 14 semanas; naming o consultoría, menos. Lo definimos en la primera propuesta y lo dejamos por escrito.
        </p>
      </section>

      <section id="presupuestos" aria-labelledby="presupuestos-heading" className="mb-8">
        <h2 id="presupuestos-heading" className="text-base font-semibold tracking-tight">
          presupuestos
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          Trabajamos por proyecto, con alcance cerrado. No por horas sueltas. La propuesta incluye fases, entregables y precio; si el alcance cambia, lo revisamos.
        </p>
      </section>

      <section id="entregables" aria-labelledby="entregables-heading" className="mb-8">
        <h2 id="entregables-heading" className="text-base font-semibold tracking-tight">
          entregables
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          Cada servicio tiene sus entregables: en branding, identidad y manual; en naming, shortlist y racional; en consultoría, documento de plataforma. Todo se detalla en la propuesta.
        </p>
      </section>

      <section id="colaboracion" aria-labelledby="colaboracion-heading" className="mb-8">
        <h2 id="colaboracion-heading" className="text-base font-semibold tracking-tight">
          formas de colaboración
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          Proyectos cerrados, retainer para soporte continuo o colaboración puntual según el caso. Lo hablamos en la primera conversación.
        </p>
      </section>

      <section id="contacto" aria-labelledby="contacto-heading" className="mb-8">
        <h2 id="contacto-heading" className="text-base font-semibold tracking-tight">
          contacto
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          Si tu pregunta no está aquí:{" "}
          <Link href="/es/contacto" className="underline">contacto</Link> o{" "}
          <a href="mailto:hola@agenciaenblanco.com" className="underline">hola@agenciaenblanco.com</a>.{" "}
          <Link href="/es/enblanco" className="underline">Volver a enblanco</Link>.
        </p>
      </section>
    </main>
  );
}
