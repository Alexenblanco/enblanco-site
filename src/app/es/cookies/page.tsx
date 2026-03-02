import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookies — enblanco",
  description: "Política de cookies del sitio web de enblanco.",
  alternates: {
    canonical: "/es/cookies",
    languages: {
      es: "/es/cookies",
      en: "/en/cookies",
      "x-default": "/es/cookies",
    },
  },
};

export default function CookiesPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Cookies</h1>
      <div className="prose prose-zinc prose-sm mt-6 max-w-none text-zinc-700">
        <p>
          Este sitio puede utilizar cookies técnicas y, en su caso, analíticas o de terceros, para el correcto funcionamiento y la mejora de la experiencia de uso. Aquí puedes conocer qué cookies usamos y cómo gestionarlas.
        </p>
        <p>
          Contenido placeholder. Sustituir por la política de cookies detallada y el mecanismo de consentimiento si se incorporan cookies no esenciales.
        </p>
      </div>
      <p className="mt-8 text-sm text-zinc-600">
        <Link href="/es/aviso-legal" className="underline">aviso legal</Link>
        {" · "}
        <Link href="/es/privacidad" className="underline">privacidad</Link>
        {" · "}
        <Link href="/es" className="underline">inicio</Link>
      </p>
    </main>
  );
}
