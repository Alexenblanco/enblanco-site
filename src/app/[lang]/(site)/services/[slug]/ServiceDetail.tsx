import Link from "next/link";
import JsonLd from "@/components/Seo/JsonLd";
import { withLang } from "@/lib/i18n/path";
import type { EnServicePageSlug, EsServicePageSlug } from "@/lib/services-slugs";
import { getSiteUrl } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/site-config";

const siteUrl = getSiteUrl();

type Lang = "en" | "es";
type Props = { lang: Lang; slug: EnServicePageSlug | EsServicePageSlug };

export function ServiceDetail({ lang, slug }: Props) {
  const isEn = lang === "en";
  const baseUrl = `${siteUrl}/${lang}`;
  const servicesPath = isEn ? "services" : "servicios";
  const servicesUrl = `${baseUrl}/${servicesPath}`;
  const serviceUrl = `${servicesUrl}/${slug}`;
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isEn ? "home" : "inicio", item: baseUrl },
      { "@type": "ListItem", position: 2, name: isEn ? "services" : "servicios", item: servicesUrl },
      { "@type": "ListItem", position: 3, name: slug, item: serviceUrl },
    ],
  };
  const content = getServiceContent(lang, slug);
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />
      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">{content.h1}</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700">{content.subtitle}</p>
      </header>
      {content.sections.map((s) => (
        <section key={s.id} id={s.id} aria-labelledby={`${s.id}-heading`} className="mb-8">
          <h2 id={`${s.id}-heading`} className="text-base font-semibold tracking-tight">{s.heading}</h2>
          <div className="mt-2 text-sm text-zinc-700">{s.body}</div>
        </section>
      ))}
    </main>
  );
}

type Section = { id: string; heading: string; body: React.ReactNode };

function getServiceContent(lang: Lang, slug: EnServicePageSlug | EsServicePageSlug): { h1: string; subtitle: string; sections: Section[] } {
  const w = (path: string) => withLang(lang, path);

  if (lang === "en" && slug === "branding") {
    return {
      h1: "branding",
      subtitle: "we build brand systems: clear, durable, and easy to apply.",
      sections: [
        {
          id: "what-it-solves",
          heading: "what it solves",
          body: (
            <p>
              when a brand grows through disconnected assets, every channel tells a different story. branding brings a single idea, a visual system, and a tone that can be applied to any format.
            </p>
          ),
        },
        {
          id: "approach",
          heading: "approach",
          body: (
            <p>
              we work in clear layers: diagnosis, brand platform, and visual system. the goal is for internal teams and external partners to make quick decisions without losing consistency.
            </p>
          ),
        },
        {
          id: "deliverables",
          heading: "deliverables",
          body: (
            <p>
              depending on the context: brand platform, full visual identity, typography and color systems, key applications, and a concise guideline that explains how to use everything without relying on us.
            </p>
          ),
        },
        {
          id: "related-work",
          heading: "related work",
          body: (
            <p>
              you can see branding applied in <Link href={w("projects/branding")} className="underline">branding projects</Link> and in specific contexts within <Link href={w("areas")} className="underline">areas</Link>.
            </p>
          ),
        },
        {
          id: "faq",
          heading: "faq",
          body: (
            <p>
              timing, deliverable formats, ongoing support, and updates: we usually clarify this in an initial call and write it down before starting.
            </p>
          ),
        },
        {
          id: "contact",
          heading: "contact",
          body: (
            <p>
              if you want to check whether a project fits this kind of work, you can reach us through the <Link href={w("contact")} className="underline">contact</Link> page or directly at <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>.
            </p>
          ),
        },
      ],
    };
  }

  if (lang === "es" && slug === "branding") {
    return {
      h1: "branding",
      subtitle: "construimos sistemas de marca: claros, sostenibles y fáciles de aplicar.",
      sections: [
        {
          id: "que-resuelve",
          heading: "qué resuelve",
          body: (
            <p>
              cuando la marca crece a base de piezas sueltas, cada canal cuenta una historia distinta. el branding pone orden: una idea clara, un sistema visual y un tono aplicable a cualquier formato.
            </p>
          ),
        },
        {
          id: "enfoque",
          heading: "enfoque",
          body: (
            <p>
              trabajamos en capas claras: diagnóstico, plataforma de marca y sistema visual. el objetivo es que equipos internos y partners tomen decisiones rápidas sin perder coherencia.
            </p>
          ),
        },
        {
          id: "entregables",
          heading: "entregables",
          body: (
            <p>
              según el contexto: plataforma de marca, identidad visual completa, sistemas de tipografía y color, aplicaciones clave y una guía concisa que explique cómo usar todo sin depender de nosotros.
            </p>
          ),
        },
        {
          id: "trabajo-relacionado",
          heading: "trabajo relacionado",
          body: (
            <p>
              puedes ver branding aplicado en <Link href={w("proyectos/branding")} className="underline">proyectos de branding</Link> y en contextos concretos en <Link href={w("areas")} className="underline">áreas</Link>.
            </p>
          ),
        },
        {
          id: "faq",
          heading: "preguntas frecuentes",
          body: (
            <p>
              plazos, formatos de entrega, soporte continuo y actualizaciones: lo aclaramos en una primera llamada y lo dejamos por escrito antes de empezar.
            </p>
          ),
        },
        {
          id: "contacto",
          heading: "contacto",
          body: (
            <p>
              si quieres comprobar si un proyecto encaja con este tipo de trabajo, puedes contactarnos en <Link href={w("contacto")} className="underline">contacto</Link> o en <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>.
            </p>
          ),
        },
      ],
    };
  }

  const isEn = lang === "en";
  const contactPath = isEn ? "contact" : "contacto";
  const contactLabel = isEn ? "contact" : "contacto";
  const defaultSections: Section[] = [
    { id: "overview", heading: isEn ? "overview" : "resumen", body: <p>{isEn ? "Content for this service." : "Contenido de este servicio."}</p> },
    {
      id: "contact",
      heading: contactLabel,
      body: (
        <p>
          <Link href={w(contactPath)} className="underline">{contactLabel}</Link> or <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>.
        </p>
      ),
    },
  ];
  return {
    h1: String(slug),
    subtitle: isEn ? "Service description." : "Descripción del servicio.",
    sections: defaultSections,
  };
}
