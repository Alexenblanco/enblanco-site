import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { withLang, isValidLang } from "@/lib/i18n/path";
import { getDictionary } from "@/dictionaries";
import ContactGuidedFlow from "@/components/contact/ContactGuidedFlow";

type Props = { params: Promise<{ lang: string }> };

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang) || lang === "es") return {};
  return {
    title: "Contact — enblanco",
    description:
      "Get in touch with enblanco: Murcia and Madrid. Email, phone, and contact form for projects and collaborations.",
    alternates: {
      canonical: "/en/contact",
      languages: { es: "/es/contacto", en: "/en/contact", "x-default": "/es/contacto" },
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();
  if (lang === "es") redirect(withLang("es", "contacto"));

  const dict = getDictionary("en");

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <section aria-labelledby="contact-heading" className="mb-10">
        <h1 id="contact-heading" className="text-2xl font-semibold tracking-tight">
          {dict.contact.heroTitle}
        </h1>
        <p className="mt-3 text-sm text-zinc-700">
          To tell us about a project, propose a collaboration, or just say hello.
        </p>
      </section>
      <section id="contact-details" aria-labelledby="details-heading" className="mb-10">
        <h2 id="details-heading" className="text-base font-semibold tracking-tight">Contact details</h2>
        <p className="mt-2 text-sm text-zinc-700">
          <a href="mailto:hola@agenciaenblanco.com" className="underline">hola@agenciaenblanco.com</a>
          {" · "}
          <a href="tel:+349681234567" className="underline">+34 968 12 34 56</a>
        </p>
      </section>
      <section id="offices" aria-labelledby="offices-heading" className="mb-10">
        <h2 id="offices-heading" className="text-base font-semibold tracking-tight">Offices</h2>
        <div className="mt-3 grid gap-6 text-sm text-zinc-700 sm:grid-cols-2">
          <address className="not-italic">
            <strong className="text-zinc-900">Murcia</strong><br />Example street, 1<br />30001 Murcia
          </address>
          <address className="not-italic">
            <strong className="text-zinc-900">Madrid</strong><br />Example street, 2<br />28001 Madrid
          </address>
        </div>
      </section>
      <ContactGuidedFlow
        dict={dict.contact}
        lang="en"
        privacyHref={withLang("en", "privacy")}
        pageUrl={`${SITE_URL}/en/contact`}
      />
      <p className="mt-8 text-sm text-zinc-600">
        <Link href={withLang("en", "")} className="underline">home</Link>
        {" · "}
        <Link href={withLang("en", "projects")} className="underline">projects</Link>
        {" · "}
        <Link href={withLang("en", "services")} className="underline">services</Link>
        {" · "}
        <Link href={withLang("en", "notes")} className="underline">notes</Link>
      </p>
    </main>
  );
}
