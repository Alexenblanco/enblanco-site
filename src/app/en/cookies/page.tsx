import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookies — enblanco",
  description: "Cookie policy of the enblanco website.",
  alternates: {
    canonical: "/en/cookies",
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
          This site may use technical and, where applicable, analytical or third-party cookies for proper operation and to improve the user experience. Here you can find out which cookies we use and how to manage them.
        </p>
        <p>
          Placeholder content. Replace with the detailed cookie policy and consent mechanism if non-essential cookies are added.
        </p>
      </div>
      <p className="mt-8 text-sm text-zinc-600">
        <Link href="/en/legal-notice" className="underline">legal notice</Link>
        {" · "}
        <Link href="/en/privacy" className="underline">privacy</Link>
        {" · "}
        <Link href="/en" className="underline">home</Link>
      </p>
    </main>
  );
}
