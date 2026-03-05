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
    title: isEn ? "enblanco, creative agency" : "enblanco, agencia creativa",
    description: isEn
      ? "enblanco is a creative agency for branding, design, and direction. Judgment, system, and execution."
      : "enblanco es una agencia creativa de branding, diseño y dirección. Criterio, sistema y ejecución.",
    alternates: {
      canonical: `/${lang}/enblanco`,
      languages: { es: "/es/enblanco", en: "/en/enblanco", "x-default": "/es/enblanco" },
    },
  };
}

export default async function EnblancoPage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();
  const isEn = lang === "en";

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isEn ? "home" : "inicio", item: `${siteUrl}/${lang}` },
      { "@type": "ListItem", position: 2, name: "enblanco", item: `${siteUrl}/${lang}/enblanco` },
    ],
  };

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />

      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">
          {isEn ? "enblanco, creative agency" : "enblanco, agencia creativa"}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">
          {isEn
            ? "We work on brand, design, and communication systems with clear judgment: clarity, order, and execution without noise."
            : "Trabajamos marca, diseño y sistemas de comunicación con criterio: claridad, orden y ejecución sin ruido."}
        </p>
      </header>

      <section id={isEn ? "what-we-do" : "que-hacemos"} aria-labelledby="section1-heading" className="mb-8">
        <h2 id="section1-heading" className="text-base font-semibold tracking-tight">
          {isEn ? "what we do" : "qué hacemos"}
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          {isEn
            ? "Branding, naming, brand consulting, art direction, creative strategy and campaigns, packaging, and web design. Every project starts with diagnosis and ends with an applicable system."
            : "Branding, naming, consultoría de marca, dirección de arte, estrategia creativa y campañas, packaging y diseño web. Cada proyecto parte de un diagnóstico y termina en un sistema aplicable."}
        </p>
        <p className="mt-2 text-sm text-zinc-700">
          <Link href={withLang(lang, isEn ? "services" : "servicios")} className="underline">
            {isEn ? "View services" : "Ver servicios"}
          </Link>{" "}
          {isEn ? "and" : "y"}{" "}
          <Link href={withLang(lang, "areas")} className="underline">
            {isEn ? "areas" : "áreas"}
          </Link>{" "}
          {isEn ? "of work." : "de trabajo."}
        </p>
      </section>

      <section id={isEn ? "how-we-think" : "como-pensamos"} aria-labelledby="section2-heading" className="mb-8">
        <h2 id="section2-heading" className="text-base font-semibold tracking-tight">
          {isEn ? "how we think" : "cómo pensamos"}
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          {isEn
            ? "We prioritize order before design: positioning, message, and priorities. From there we build identity and assets that hold up over time."
            : "Priorizamos orden antes de diseño: posicionamiento, mensaje y prioridades. A partir de ahí construimos identidad y piezas que se sostienen en el tiempo."}
        </p>
        <p className="mt-2 text-sm text-zinc-700">
          <Link href={withLang(lang, isEn ? "enblanco/methodology" : "enblanco/metodologia")} className="underline">
            {isEn ? "enblanco methodology" : "Metodología enblanco"}
          </Link>.
        </p>
      </section>

      <section id={isEn ? "services-and-areas" : "servicios-y-areas"} aria-labelledby="section3-heading" className="mb-8">
        <h2 id="section3-heading" className="text-base font-semibold tracking-tight">
          {isEn ? "services and areas" : "servicios y áreas"}
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          {isEn
            ? "We work by type of project (services) and by sector context (areas). Projects span both:"
            : "Trabajamos por tipo de encargo (servicios) y por contexto de sector (áreas). Los proyectos cruzan ambos:"}{" "}
          <Link href={withLang(lang, isEn ? "projects" : "proyectos")} className="underline">
            {isEn ? "projects" : "proyectos"}
          </Link>,{" "}
          <Link href={withLang(lang, isEn ? "services" : "servicios")} className="underline">
            {isEn ? "services" : "servicios"}
          </Link>,{" "}
          <Link href={withLang(lang, "areas")} className="underline">
            {isEn ? "areas" : "áreas"}
          </Link>.
        </p>
      </section>

      <section id="faq" aria-labelledby="faq-heading" className="mb-8">
        <h2 id="faq-heading" className="text-base font-semibold tracking-tight">
          {isEn ? "faq" : "preguntas frecuentes"}
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          {isEn
            ? "Timelines, budgets, deliverables, and ways of working. We clarify in a first conversation and put it in writing."
            : "Plazos, presupuestos, entregables y formas de colaboración. Lo resolvemos en una primera conversación y lo dejamos por escrito."}
        </p>
        <p className="mt-2 text-sm text-zinc-700">
          <Link href={withLang(lang, "enblanco/faq")} className="underline">
            {isEn ? "View FAQ" : "Ver preguntas frecuentes"}
          </Link>.
        </p>
      </section>

      <section id={isEn ? "contact" : "contacto"} aria-labelledby="contact-heading" className="mb-8">
        <h2 id="contact-heading" className="text-base font-semibold tracking-tight">
          {isEn ? "contact" : "contacto"}
        </h2>
        <p className="mt-2 text-sm text-zinc-700">
          {isEn
            ? "To tell us about a project or propose a collaboration:"
            : "Para contarnos un proyecto o proponer una colaboración:"}{" "}
          <Link href={withLang(lang, isEn ? "contact" : "contacto")} className="underline">
            {isEn ? "contact" : "contacto"}
          </Link>{" "}
          {isEn ? "or" : "o"}{" "}
          <a href="mailto:hola@agenciaenblanco.com" className="underline">hola@agenciaenblanco.com</a>.
        </p>
      </section>
    </main>
  );
}
