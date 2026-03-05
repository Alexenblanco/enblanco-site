import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/Seo/JsonLd";
import { withLang, isValidLang } from "@/lib/i18n/path";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang)) return {};
  const isEn = lang === "en";
  return {
    title: isEn ? "faq" : "preguntas frecuentes",
    description: isEn
      ? "Timelines, budgets, deliverables, and ways of working at enblanco."
      : "Plazos, presupuestos, entregables y formas de colaboración en enblanco.",
    alternates: {
      canonical: `/${lang}/enblanco/faq`,
      languages: {
        es: "/es/enblanco/faq",
        en: "/en/enblanco/faq",
        "x-default": "/es/enblanco/faq",
      },
    },
  };
}

export default async function FaqPage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();
  const isEn = lang === "en";

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isEn ? "home" : "inicio", item: `${siteUrl}/${lang}` },
      { "@type": "ListItem", position: 2, name: "enblanco", item: `${siteUrl}/${lang}/enblanco` },
      { "@type": "ListItem", position: 3, name: isEn ? "faq" : "preguntas frecuentes", item: `${siteUrl}/${lang}/enblanco/faq` },
    ],
  };

  if (isEn) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-10">
        <JsonLd data={breadcrumbJsonLd} />
        <header className="mb-10">
          <h1 className="text-2xl font-semibold tracking-tight">faq</h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-700">
            What we&apos;re usually asked about timelines, budgets, deliverables, and collaboration.
          </p>
        </header>
        <section id="timelines" aria-labelledby="timelines-heading" className="mb-8">
          <h2 id="timelines-heading" className="text-base font-semibold tracking-tight">timelines</h2>
          <p className="mt-2 text-sm text-zinc-700">
            They depend on scope. A medium branding project can take 8 to 14 weeks; naming or consulting, less. We define it in the first proposal and put it in writing.
          </p>
        </section>
        <section id="budgets" aria-labelledby="budgets-heading" className="mb-8">
          <h2 id="budgets-heading" className="text-base font-semibold tracking-tight">budgets</h2>
          <p className="mt-2 text-sm text-zinc-700">
            We work per project, with a fixed scope. Not by the hour. The proposal includes phases, deliverables, and price; if scope changes, we revise.
          </p>
        </section>
        <section id="deliverables" aria-labelledby="deliverables-heading" className="mb-8">
          <h2 id="deliverables-heading" className="text-base font-semibold tracking-tight">deliverables</h2>
          <p className="mt-2 text-sm text-zinc-700">
            Each service has its deliverables: in branding, identity and guidelines; in naming, shortlist and rationale; in consulting, platform document. Everything is specified in the proposal.
          </p>
        </section>
        <section id="collaboration" aria-labelledby="collaboration-heading" className="mb-8">
          <h2 id="collaboration-heading" className="text-base font-semibold tracking-tight">ways of working</h2>
          <p className="mt-2 text-sm text-zinc-700">
            Fixed projects, retainer for ongoing support, or ad-hoc collaboration depending on the case. We discuss it in the first conversation.
          </p>
        </section>
        <section id="contact" aria-labelledby="contact-heading" className="mb-8">
          <h2 id="contact-heading" className="text-base font-semibold tracking-tight">contact</h2>
          <p className="mt-2 text-sm text-zinc-700">
            If your question isn&apos;t here: <Link href={withLang("en", "contact")} className="underline">contact</Link> or <a href="mailto:hola@agenciaenblanco.com" className="underline">hola@agenciaenblanco.com</a>. <Link href={withLang("en", "enblanco")} className="underline">Back to enblanco</Link>.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />
      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">preguntas frecuentes</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          Lo que suelen preguntarnos sobre plazos, presupuestos, entregables y colaboración.
        </p>
      </header>
      <section id="plazos" aria-labelledby="plazos-heading" className="mb-8">
        <h2 id="plazos-heading" className="text-base font-semibold tracking-tight">plazos</h2>
        <p className="mt-2 text-sm text-zinc-700">
          Dependen del alcance. Un proyecto de branding medio puede llevar entre 8 y 14 semanas; naming o consultoría, menos. Lo definimos en la primera propuesta y lo dejamos por escrito.
        </p>
      </section>
      <section id="presupuestos" aria-labelledby="presupuestos-heading" className="mb-8">
        <h2 id="presupuestos-heading" className="text-base font-semibold tracking-tight">presupuestos</h2>
        <p className="mt-2 text-sm text-zinc-700">
          Trabajamos por proyecto, con alcance cerrado. No por horas sueltas. La propuesta incluye fases, entregables y precio; si el alcance cambia, lo revisamos.
        </p>
      </section>
      <section id="entregables" aria-labelledby="entregables-heading" className="mb-8">
        <h2 id="entregables-heading" className="text-base font-semibold tracking-tight">entregables</h2>
        <p className="mt-2 text-sm text-zinc-700">
          Cada servicio tiene sus entregables: en branding, identidad y manual; en naming, shortlist y racional; en consultoría, documento de plataforma. Todo se detalla en la propuesta.
        </p>
      </section>
      <section id="colaboracion" aria-labelledby="colaboracion-heading" className="mb-8">
        <h2 id="colaboracion-heading" className="text-base font-semibold tracking-tight">formas de colaboración</h2>
        <p className="mt-2 text-sm text-zinc-700">
          Proyectos cerrados, retainer para soporte continuo o colaboración puntual según el caso. Lo hablamos en la primera conversación.
        </p>
      </section>
      <section id="contacto" aria-labelledby="contacto-heading" className="mb-8">
        <h2 id="contacto-heading" className="text-base font-semibold tracking-tight">contacto</h2>
        <p className="mt-2 text-sm text-zinc-700">
          Si tu pregunta no está aquí: <Link href={withLang("es", "contacto")} className="underline">contacto</Link> o <a href="mailto:hola@agenciaenblanco.com" className="underline">hola@agenciaenblanco.com</a>. <Link href={withLang("es", "enblanco")} className="underline">Volver a enblanco</Link>.
        </p>
      </section>
    </main>
  );
}
