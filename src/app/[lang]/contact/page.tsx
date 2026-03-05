import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { withLang, isValidLang } from "@/lib/i18n/path";

type Props = { params: Promise<{ lang: string }> };

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

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <section aria-labelledby="contact-heading" className="mb-10">
        <h1 id="contact-heading" className="text-2xl font-semibold tracking-tight">talk?</h1>
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
      <section id="form" aria-labelledby="form-heading" className="border-t border-zinc-200 pt-8">
        <h2 id="form-heading" className="text-base font-semibold tracking-tight">Send us a message</h2>
        <form action="#" method="post" className="mt-4 flex flex-col gap-4" aria-label="Contact form">
          <div>
            <label htmlFor="contact-name" className="block text-sm font-medium text-zinc-800">Name</label>
            <input id="contact-name" type="text" name="name" required autoComplete="name" className="mt-1 w-full max-w-md rounded border border-zinc-300 px-3 py-2 text-sm text-zinc-900" />
          </div>
          <div>
            <label htmlFor="contact-email" className="block text-sm font-medium text-zinc-800">Email</label>
            <input id="contact-email" type="email" name="email" required autoComplete="email" className="mt-1 w-full max-w-md rounded border border-zinc-300 px-3 py-2 text-sm text-zinc-900" />
          </div>
          <div>
            <label htmlFor="contact-message" className="block text-sm font-medium text-zinc-800">Tell us</label>
            <textarea id="contact-message" name="message" rows={4} className="mt-1 w-full max-w-md rounded border border-zinc-300 px-3 py-2 text-sm text-zinc-900" />
          </div>
          <div className="flex items-start gap-2">
            <input id="contact-privacy" type="checkbox" name="privacy" required className="mt-1 rounded border-zinc-300" aria-describedby="contact-privacy-desc" />
            <label htmlFor="contact-privacy" id="contact-privacy-desc" className="text-sm text-zinc-700">
              I accept the <Link href={withLang("en", "privacy")} className="underline">privacy policy</Link>.
            </label>
          </div>
          <button type="submit" className="w-fit rounded bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800">Send</button>
        </form>
      </section>
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
