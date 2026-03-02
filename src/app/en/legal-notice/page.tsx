import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Legal notice — enblanco",
  description: "Legal notice and terms of use of enblanco website.",
  alternates: {
    canonical: "/en/legal-notice",
    languages: {
      es: "/es/aviso-legal",
      en: "/en/legal-notice",
      "x-default": "/es/aviso-legal",
    },
  },
};

export default function LegalNoticePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Legal notice</h1>
      <div className="prose prose-zinc prose-sm mt-6 max-w-none text-zinc-700">
        <p>
          This legal notice governs the use of the enblanco website. The site owner is the entity stated as responsible in the footer. Access and use of the site implies acceptance of these terms.
        </p>
        <p>
          Placeholder content. Replace with the final legal text drafted or reviewed by a professional.
        </p>
      </div>
      <p className="mt-8 text-sm text-zinc-600">
        <Link href="/en/privacy" className="underline">privacy</Link>
        {" · "}
        <Link href="/en/cookies" className="underline">cookies</Link>
        {" · "}
        <Link href="/en" className="underline">home</Link>
      </p>
    </main>
  );
}
