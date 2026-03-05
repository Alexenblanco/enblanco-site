import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { withLang, isValidLang } from "@/lib/i18n/path";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== "es") return {};
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
  if (!isValidLang(lang) || lang !== "es") notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <section aria-labelledby="contacto-heading" className="mb-10">
        <h1 id="contacto-heading" className="text-2xl font-semibold tracking-tight">¿hablamos?</h1>
        <p className="mt-3 text-sm text-zinc-700">
          Para contarnos un proyecto, proponer una colaboración o simplemente saludar.
        </p>
      </section>
      <section id="datos-contacto" aria-labelledby="datos-heading" className="mb-10">
        <h2 id="datos-heading" className="text-base font-semibold tracking-tight">Datos de contacto</h2>
        <p className="mt-2 text-sm text-zinc-700">
          <a href="mailto:hola@agenciaenblanco.com" className="underline">hola@agenciaenblanco.com</a>
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
      <section id="formulario" aria-labelledby="form-heading" className="border-t border-zinc-200 pt-8">
        <h2 id="form-heading" className="text-base font-semibold tracking-tight">Envíanos un mensaje</h2>
        <form action="#" method="post" className="mt-4 flex flex-col gap-4" aria-label="Formulario de contacto">
          <div>
            <label htmlFor="contacto-nombre" className="block text-sm font-medium text-zinc-800">Nombre</label>
            <input id="contacto-nombre" type="text" name="nombre" required autoComplete="name" className="mt-1 w-full max-w-md rounded border border-zinc-300 px-3 py-2 text-sm text-zinc-900" />
          </div>
          <div>
            <label htmlFor="contacto-email" className="block text-sm font-medium text-zinc-800">Email</label>
            <input id="contacto-email" type="email" name="email" required autoComplete="email" className="mt-1 w-full max-w-md rounded border border-zinc-300 px-3 py-2 text-sm text-zinc-900" />
          </div>
          <div>
            <label htmlFor="contacto-mensaje" className="block text-sm font-medium text-zinc-800">Cuéntanos</label>
            <textarea id="contacto-mensaje" name="mensaje" rows={4} className="mt-1 w-full max-w-md rounded border border-zinc-300 px-3 py-2 text-sm text-zinc-900" />
          </div>
          <div className="flex items-start gap-2">
            <input id="contacto-privacidad" type="checkbox" name="privacidad" required className="mt-1 rounded border-zinc-300" aria-describedby="contacto-privacidad-desc" />
            <label htmlFor="contacto-privacidad" id="contacto-privacidad-desc" className="text-sm text-zinc-700">
              Acepto la <Link href={withLang("es", "privacidad")} className="underline">política de privacidad</Link>.
            </label>
          </div>
          <button type="submit" className="w-fit rounded bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800">Enviar</button>
        </form>
      </section>
      <p className="mt-8 text-sm text-zinc-600">
        <Link href={withLang("es", "")} className="underline">inicio</Link>
        {" · "}
        <Link href={withLang("es", "proyectos")} className="underline">proyectos</Link>
        {" · "}
        <Link href={withLang("es", "servicios")} className="underline">servicios</Link>
        {" · "}
        <Link href={withLang("es", "notas")} className="underline">notas</Link>
      </p>
    </main>
  );
}
