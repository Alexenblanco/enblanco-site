import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { withLang, isValidLang } from "@/lib/i18n/path";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang)) return {};
  return {
    title: "Cookies — enblanco",
    description: lang === "es" ? "Política de cookies del sitio web de enblanco." : "Cookie policy for enblanco website.",
    alternates: {
      canonical: `/${lang}/cookies`,
      languages: { es: "/es/cookies", en: "/en/cookies", "x-default": "/es/cookies" },
    },
  };
}

export default async function CookiesPage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  const isEn = lang === "en";
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Cookies</h1>
      <div className="prose prose-zinc prose-sm mt-6 max-w-none text-zinc-700">
        {isEn ? (
          <p>This site may use technical and, where applicable, analytics or third-party cookies for proper operation and improved experience. Here you can find out what cookies we use and how to manage them. Placeholder content. Replace with detailed cookie policy and consent mechanism if non-essential cookies are added.</p>
        ) : (
          <>
            <p>Este sitio puede utilizar cookies técnicas y, en su caso, analíticas o de terceros, para el correcto funcionamiento y la mejora de la experiencia de uso. Aquí puedes conocer qué cookies usamos y cómo gestionarlas.</p>
            <p>Contenido placeholder. Sustituir por la política de cookies detallada y el mecanismo de consentimiento si se incorporan cookies no esenciales.</p>
          </>
        )}
      </div>
      <p className="mt-8 text-sm text-zinc-600">
        <Link href={withLang(lang, isEn ? "legal-notice" : "aviso-legal")} className="underline">{isEn ? "legal notice" : "aviso legal"}</Link>
        {" · "}
        <Link href={withLang(lang, isEn ? "privacy" : "privacidad")} className="underline">{isEn ? "privacy" : "privacidad"}</Link>
        {" · "}
        <Link href={withLang(lang, "")} className="underline">{isEn ? "home" : "inicio"}</Link>
      </p>
    </main>
  );
}
