import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { withLang, isValidLang } from "@/lib/i18n/path";
import { getDictionary } from "@/dictionaries";
import ContactGuidedFlow from "@/components/contact/ContactGuidedFlow";
import { getSiteUrl } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/site-config";

type Props = { params: Promise<{ lang: string }> };

const siteUrl = getSiteUrl();

/** Literal paths for Link hrefs to avoid Next 15 client router resolution errors (is-dynamic). */
const ES_HOME = "/es";
const ES_PROYECTOS = "/es/proyectos";
const ES_SERVICIOS = "/es/servicios";
const ES_NOTAS = "/es/notas";
const ES_PRIVACIDAD = "/es/privacidad";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang) || lang === "en") return {};
  return {
    title: "Contacto — enblanco",
    description:
      "Contacta con enblanco: Murcia y Madrid. Email, teléfono y formulario para proyectos y colaboraciones.",
    alternates: {
      canonical: "/es/contacto",
      languages: { es: "/es/contacto", en: "/en/contact", "x-default": "/es/contacto" },
    },
  };
}

export default async function ContactoPage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();
  if (lang === "en") redirect(withLang("en", "contact"));

  const dict = getDictionary("es");

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <section aria-labelledby="contacto-heading" className="mb-10">
        <h1 id="contacto-heading" className="text-2xl font-semibold tracking-tight">
          {dict.contact.heroTitle}
        </h1>
        <p className="mt-3 text-sm text-zinc-700">
          Para contarnos un proyecto, proponer una colaboración o simplemente saludar.
        </p>
      </section>
      <section id="datos-contacto" aria-labelledby="datos-heading" className="mb-10">
        <h2 id="datos-heading" className="text-base font-semibold tracking-tight">Datos de contacto</h2>
        <p className="mt-2 text-sm text-zinc-700">
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>
          {" · "}
          <a href="tel:+349681234567" className="underline">+34 968 12 34 56</a>
        </p>
      </section>
      <section id="oficinas" aria-labelledby="oficinas-heading" className="mb-10">
        <h2 id="oficinas-heading" className="text-base font-semibold tracking-tight">Oficinas</h2>
        <div className="mt-3 grid gap-6 text-sm text-zinc-700 sm:grid-cols-2">
          <address className="not-italic">
            <strong className="text-zinc-900">Murcia</strong><br />Calle ejemplo, 1<br />30001 Murcia
          </address>
          <address className="not-italic">
            <strong className="text-zinc-900">Madrid</strong><br />Calle ejemplo, 2<br />28001 Madrid
          </address>
        </div>
      </section>
      <ContactGuidedFlow
        dict={dict.contact}
        lang="es"
        privacyHref={ES_PRIVACIDAD}
        pageUrl={`${siteUrl}/es/contacto`}
      />
      <p className="mt-8 text-sm text-zinc-600">
        <Link href={ES_HOME} className="underline">inicio</Link>
        {" · "}
        <Link href={ES_PROYECTOS} className="underline">proyectos</Link>
        {" · "}
        <Link href={ES_SERVICIOS} className="underline">servicios</Link>
        {" · "}
        <Link href={ES_NOTAS} className="underline">notas</Link>
      </p>
    </main>
  );
}
