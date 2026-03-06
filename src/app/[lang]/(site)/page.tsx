import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { withLang, isValidLang } from "@/lib/i18n/path";
import { CONTACT_EMAIL } from "@/lib/site-config";

type Props = { params: Promise<{ lang: string }> };

const ES_NAV = [
  { path: "proyectos", label: "proyectos" },
  { path: "areas", label: "áreas" },
  { path: "enblanco", label: "enblanco" },
  { path: "notas", label: "notas" },
  { path: "contacto", label: "contacto" },
] as const;

const EN_NAV = [
  { path: "projects", label: "projects" },
  { path: "areas", label: "areas" },
  { path: "enblanco", label: "enblanco" },
  { path: "notes", label: "notes" },
  { path: "contact", label: "contact" },
] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang)) return {};
  const isEn = lang === "en";
  return {
    title: isEn
      ? "enblanco creative agency: branding, design, and direction with clear judgment"
      : "Agencia creativa enblanco: branding, diseño y dirección con criterio",
    description: isEn
      ? "enblanco is a creative agency for branding, design, and art direction that works with clear judgment and systems that hold up."
      : "enblanco es una agencia creativa de branding, diseño y dirección que trabaja con criterio: sistemas claros, ejecutados sin ruido.",
    alternates: {
      canonical: `/${lang}`,
      languages: { es: "/es", en: "/en", "x-default": "/es" },
    },
    openGraph: {
      title: isEn
        ? "enblanco creative agency: branding, design, and direction with clear judgment"
        : "Agencia creativa enblanco: branding, diseño y dirección con criterio",
      description: isEn
        ? "enblanco is a creative agency for branding, design, and art direction that works with clear judgment and systems that hold up."
        : "enblanco es una agencia creativa de branding, diseño y dirección que trabaja con criterio: sistemas claros, ejecutados sin ruido.",
    },
  };
}

export default async function LangHomePage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  const isEn = lang === "en";
  const navItems = isEn ? EN_NAV : ES_NAV;

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-zinc-900 shadow">
        {isEn ? "Skip to main content" : "Saltar al contenido principal"}
      </a>
      <header className="border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href={withLang(lang, "")} className="text-sm font-semibold tracking-tight">
            enblanco
          </Link>
          <nav aria-label={isEn ? "Primary navigation" : "Navegación principal"}>
            <ul className="flex gap-4 text-sm">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link href={withLang(lang, item.path)} className="text-zinc-700 hover:text-zinc-900">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <main id="main" className="mx-auto flex max-w-5xl flex-col gap-16 px-6 py-10">
        {isEn ? (
          <>
            <section aria-labelledby="home-heading-en">
              <h1 id="home-heading-en" className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                enblanco creative agency: branding, design, and direction with clear judgment
              </h1>
            </section>
            <section id="what-we-do" aria-labelledby="what-we-do-heading">
              <h2 id="what-we-do-heading" className="text-base font-semibold tracking-tight">What we do</h2>
              <p className="mt-2 max-w-2xl text-sm text-zinc-700">
                We work on brand, design, and communication systems so complex decisions can be made quickly and clearly.
              </p>
            </section>
            <section id="services" aria-labelledby="services-heading-en">
              <h2 id="services-heading-en" className="text-base font-semibold tracking-tight">Services</h2>
              <p className="mt-2 max-w-2xl text-sm text-zinc-700">
                Branding, naming, brand consulting, art direction, creative strategy and campaigns, packaging, and web design.
              </p>
            </section>
            <section id="areas" aria-labelledby="areas-heading-en">
              <h2 id="areas-heading-en" className="text-base font-semibold tracking-tight">Areas</h2>
              <p className="mt-2 max-w-2xl text-sm text-zinc-700">
                Retail, health, food, industry, startups & technology, culture. Priorities shift, the standard doesn&apos;t.
              </p>
            </section>
            <section id="projects" aria-labelledby="projects-heading-en">
              <h2 id="projects-heading-en" className="text-base font-semibold tracking-tight">Selected projects</h2>
              <p className="mt-2 max-w-2xl text-sm text-zinc-700">
                A selection of work where you can clearly see how we apply judgment, systems, and execution in each context.
              </p>
            </section>
            <section id="enblanco" aria-labelledby="how-we-work-heading-en">
              <h2 id="how-we-work-heading-en" className="text-base font-semibold tracking-tight">How we work</h2>
              <p className="mt-2 max-w-2xl text-sm text-zinc-700">
                We start with discovery, align positioning and message, design systems that can be applied, and stay close during rollout.
              </p>
            </section>
            <section aria-labelledby="faq-heading-en">
              <h2 id="faq-heading-en" className="text-base font-semibold tracking-tight">FAQ</h2>
              <p className="mt-2 max-w-2xl text-sm text-zinc-700">
                Budgets, timelines, deliverables, and collaboration formats—written down so everything is clear from the start.
              </p>
            </section>
            <section id="notes" aria-labelledby="notes-heading-en">
              <h2 id="notes-heading-en" className="text-base font-semibold tracking-tight">Notes</h2>
              <p className="mt-2 max-w-2xl text-sm text-zinc-700">
                Short notes on creativity, design, and brand process that come directly from enblanco&apos;s day-to-day work.
              </p>
            </section>
            <section id="contact" aria-labelledby="contact-heading-en">
              <h2 id="contact-heading-en" className="text-base font-semibold tracking-tight">Let&apos;s talk</h2>
              <p className="mt-2 max-w-2xl text-sm text-zinc-700">
                For projects, collaborations, or just to say hello, write to{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>.
              </p>
            </section>
          </>
        ) : (
          <>
            <section aria-labelledby="home-heading">
              <h1 id="home-heading" className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                Agencia creativa enblanco: branding, diseño y dirección con criterio
              </h1>
            </section>
            <section id="que-hacemos" aria-labelledby="que-hacemos-heading">
              <h2 id="que-hacemos-heading" className="text-base font-semibold tracking-tight">Qué hacemos</h2>
              <p className="mt-2 max-w-2xl text-sm text-zinc-700">
                Trabajamos marca, diseño y sistemas de comunicación para que decisiones complejas se tomen rápido y con claridad.
              </p>
            </section>
            <section id="servicios" aria-labelledby="servicios-heading">
              <h2 id="servicios-heading" className="text-base font-semibold tracking-tight">Servicios</h2>
              <p className="mt-2 max-w-2xl text-sm text-zinc-700">
                Branding, naming, consultoría de marca, dirección de arte, estrategia creativa y campañas, packaging y diseño web.
              </p>
            </section>
            <section id="areas" aria-labelledby="areas-heading">
              <h2 id="areas-heading" className="text-base font-semibold tracking-tight">Áreas</h2>
              <p className="mt-2 max-w-2xl text-sm text-zinc-700">
                Retail, salud, alimentación, industria, startups y tecnología, cultura. Cambian las prioridades, no el estándar.
              </p>
            </section>
            <section id="proyectos" aria-labelledby="proyectos-heading">
              <h2 id="proyectos-heading" className="text-base font-semibold tracking-tight">Proyectos seleccionados</h2>
              <p className="mt-2 max-w-2xl text-sm text-zinc-700">
                Una selección de trabajos donde se ve claro cómo aplicamos criterio, sistema y ejecución en cada contexto.
              </p>
            </section>
            <section id="enblanco" aria-labelledby="como-trabajamos-heading">
              <h2 id="como-trabajamos-heading" className="text-base font-semibold tracking-tight">Cómo trabajamos</h2>
              <p className="mt-2 max-w-2xl text-sm text-zinc-700">
                Partimos de una fase de descubrimiento, ordenamos posicionamiento y mensaje, diseñamos sistemas aplicables y acompañamos el despliegue.
              </p>
            </section>
            <section aria-labelledby="faq-heading">
              <h2 id="faq-heading" className="text-base font-semibold tracking-tight">Preguntas frecuentes</h2>
              <p className="mt-2 max-w-2xl text-sm text-zinc-700">
                Presupuestos, plazos, entregables y formas de colaboración; lo dejamos por escrito para que todo sea claro desde el inicio.
              </p>
            </section>
            <section id="notas" aria-labelledby="notas-heading">
              <h2 id="notas-heading" className="text-base font-semibold tracking-tight">Notas</h2>
              <p className="mt-2 max-w-2xl text-sm text-zinc-700">
                Notas breves sobre creatividad, diseño y procesos de marca que salen del trabajo diario en enblanco.
              </p>
            </section>
            <section id="contacto" aria-labelledby="contacto-heading">
              <h2 id="contacto-heading" className="text-base font-semibold tracking-tight">Hablemos</h2>
              <p className="mt-2 max-w-2xl text-sm text-zinc-700">
                Para contarnos un proyecto, proponer una colaboración o simplemente saludar, escríbenos a{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>.
              </p>
            </section>
          </>
        )}
      </main>
      <footer className="mt-12 border-t border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-6 text-xs text-zinc-600 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} enblanco.</p>
          <nav aria-label={isEn ? "Legal links" : "Enlaces legales"}>
            <ul className="flex flex-wrap gap-3">
              <li>
                <Link href={withLang(lang, isEn ? "legal-notice" : "aviso-legal")} className="hover:text-zinc-900">
                  {isEn ? "legal notice" : "aviso legal"}
                </Link>
              </li>
              <li>
                <Link href={withLang(lang, isEn ? "privacy" : "privacidad")} className="hover:text-zinc-900">
                  {isEn ? "privacy" : "privacidad"}
                </Link>
              </li>
              <li>
                <Link href={withLang(lang, "cookies")} className="hover:text-zinc-900">
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
