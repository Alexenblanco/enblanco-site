import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "enblanco creative agency: branding, design, and direction with clear judgment",
  description:
    "enblanco is a creative agency for branding, design, and art direction that works with clear judgment and systems that hold up.",
  alternates: {
    canonical: "/en",
    languages: {
      es: "/es",
      en: "/en",
      "x-default": "/es",
    },
  },
  openGraph: {
    title:
      "enblanco creative agency: branding, design, and direction with clear judgment",
    description:
      "enblanco is a creative agency for branding, design, and art direction that works with clear judgment and systems that hold up.",
  },
};

const navItems = [
  { href: "/en/projects", label: "projects" },
  { href: "/en/areas", label: "areas" },
  { href: "/en/enblanco", label: "enblanco" },
  { href: "/en/notes", label: "notes" },
  { href: "/en/contact", label: "contact" },
] as const;

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-zinc-900 shadow">
        Skip to main content
      </a>

      <header className="border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/en" className="text-sm font-semibold tracking-tight">
            enblanco
          </Link>
          <nav aria-label="Primary navigation">
            <ul className="flex gap-4 text-sm">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-zinc-700 hover:text-zinc-900">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main id="main" className="mx-auto flex max-w-5xl flex-col gap-16 px-6 py-10">
        <section aria-labelledby="home-heading-en">
          <h1
            id="home-heading-en"
            className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight md:text-4xl"
          >
            enblanco creative agency: branding, design, and direction with clear judgment
          </h1>
        </section>

        <section id="what-we-do" aria-labelledby="what-we-do-heading">
          <h2 id="what-we-do-heading" className="text-base font-semibold tracking-tight">
            What we do
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-700">
            We work on brand, design, and communication systems so complex decisions can be made quickly and clearly.
          </p>
        </section>

        <section id="services" aria-labelledby="services-heading-en">
          <h2 id="services-heading-en" className="text-base font-semibold tracking-tight">
            Services
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-700">
            Branding, naming, brand consulting, art direction, creative strategy and campaigns, packaging, and web design.
          </p>
        </section>

        <section id="areas" aria-labelledby="areas-heading-en">
          <h2 id="areas-heading-en" className="text-base font-semibold tracking-tight">
            Areas
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-700">
            Retail, health, food, industry, startups & technology, culture. Priorities shift, the standard doesn&apos;t.
          </p>
        </section>

        <section id="projects" aria-labelledby="projects-heading-en">
          <h2 id="projects-heading-en" className="text-base font-semibold tracking-tight">
            Selected projects
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-700">
            A selection of work where you can clearly see how we apply judgment, systems, and execution in each context.
          </p>
        </section>

        <section id="enblanco" aria-labelledby="how-we-work-heading-en">
          <h2 id="how-we-work-heading-en" className="text-base font-semibold tracking-tight">
            How we work
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-700">
            We start with discovery, align positioning and message, design systems that can be applied, and stay close during rollout.
          </p>
        </section>

        <section aria-labelledby="faq-heading-en">
          <h2 id="faq-heading-en" className="text-base font-semibold tracking-tight">
            FAQ
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-700">
            Budgets, timelines, deliverables, and collaboration formats—written down so everything is clear from the start.
          </p>
        </section>

        <section id="notes" aria-labelledby="notes-heading-en">
          <h2 id="notes-heading-en" className="text-base font-semibold tracking-tight">
            Notes
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-700">
            Short notes on creativity, design, and brand process that come directly from enblanco&apos;s day-to-day work.
          </p>
        </section>

        <section id="contact" aria-labelledby="contact-heading-en">
          <h2 id="contact-heading-en" className="text-base font-semibold tracking-tight">
            Let&apos;s talk
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-700">
            For projects, collaborations, or just to say hello, write to{" "}
            <a href="mailto:hola@agenciaenblanco.com" className="underline">
              hola@agenciaenblanco.com
            </a>
            .
          </p>
        </section>
      </main>

      <footer className="mt-12 border-t border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-6 text-xs text-zinc-600 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} enblanco.</p>
          <nav aria-label="Legal links">
            <ul className="flex flex-wrap gap-3">
              <li>
                <Link href="/en/legal-notice" className="hover:text-zinc-900">
                  legal notice
                </Link>
              </li>
              <li>
                <Link href="/en/privacy" className="hover:text-zinc-900">
                  privacy
                </Link>
              </li>
              <li>
                <Link href="/en/cookies" className="hover:text-zinc-900">
                  cookies
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}
