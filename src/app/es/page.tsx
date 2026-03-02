import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Agencia creativa enblanco: branding, diseño y dirección con criterio",
  description:
    "enblanco es una agencia creativa de branding, diseño y dirección que trabaja con criterio: sistemas claros, ejecutados sin ruido.",
  alternates: {
    canonical: "/es",
    languages: {
      es: "/es",
      en: "/en",
      "x-default": "/es",
    },
  },
  openGraph: {
    title:
      "Agencia creativa enblanco: branding, diseño y dirección con criterio",
    description:
      "enblanco es una agencia creativa de branding, diseño y dirección que trabaja con criterio: sistemas claros, ejecutados sin ruido.",
  },
};

const navItems = [
  { href: "#proyectos", label: "proyectos" },
  { href: "#areas", label: "áreas" },
  { href: "#enblanco", label: "enblanco" },
  { href: "#notas", label: "notas" },
  { href: "#contacto", label: "contacto" },
] as const;

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-zinc-900 shadow">
        Saltar al contenido principal
      </a>

      <header className="border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/es" className="text-sm font-semibold tracking-tight">
            enblanco
          </Link>
          <nav aria-label="Navegación principal">
            <ul className="flex gap-4 text-sm">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-zinc-700 hover:text-zinc-900">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main id="main" className="mx-auto flex max-w-5xl flex-col gap-16 px-6 py-10">
        <section aria-labelledby="home-heading">
          <h1
            id="home-heading"
            className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight md:text-4xl"
          >
            Agencia creativa enblanco: branding, diseño y dirección con criterio
          </h1>
        </section>

        <section id="que-hacemos" aria-labelledby="que-hacemos-heading">
          <h2 id="que-hacemos-heading" className="text-base font-semibold tracking-tight">
            Qué hacemos
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-700">
            Trabajamos marca, diseño y sistemas de comunicación para que decisiones complejas se tomen rápido y con claridad.
          </p>
        </section>

        <section id="servicios" aria-labelledby="servicios-heading">
          <h2 id="servicios-heading" className="text-base font-semibold tracking-tight">
            Servicios
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-700">
            Branding, naming, consultoría de marca, dirección de arte, estrategia creativa y campañas, packaging y diseño web.
          </p>
        </section>

        <section id="areas" aria-labelledby="areas-heading">
          <h2 id="areas-heading" className="text-base font-semibold tracking-tight">
            Áreas
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-700">
            Retail, salud, alimentación, industria, startups y tecnología, cultura. Cambian las prioridades, no el estándar.
          </p>
        </section>

        <section id="proyectos" aria-labelledby="proyectos-heading">
          <h2 id="proyectos-heading" className="text-base font-semibold tracking-tight">
            Proyectos seleccionados
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-700">
            Una selección de trabajos donde se ve claro cómo aplicamos criterio, sistema y ejecución en cada contexto.
          </p>
        </section>

        <section id="enblanco" aria-labelledby="como-trabajamos-heading">
          <h2 id="como-trabajamos-heading" className="text-base font-semibold tracking-tight">
            Cómo trabajamos
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-700">
            Partimos de una fase de descubrimiento, ordenamos posicionamiento y mensaje, diseñamos sistemas aplicables y acompañamos el despliegue.
          </p>
        </section>

        <section aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-base font-semibold tracking-tight">
            Preguntas frecuentes
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-700">
            Presupuestos, plazos, entregables y formas de colaboración; lo dejamos por escrito para que todo sea claro desde el inicio.
          </p>
        </section>

        <section id="notas" aria-labelledby="notas-heading">
          <h2 id="notas-heading" className="text-base font-semibold tracking-tight">
            Notas
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-700">
            Notas breves sobre creatividad, diseño y procesos de marca que salen del trabajo diario en enblanco.
          </p>
        </section>

        <section id="contacto" aria-labelledby="contacto-heading">
          <h2 id="contacto-heading" className="text-base font-semibold tracking-tight">
            Hablemos
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-700">
            Para contarnos un proyecto, proponer una colaboración o simplemente saludar, escríbenos a{" "}
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
          <nav aria-label="Enlaces legales">
            <ul className="flex flex-wrap gap-3">
              <li>
                <Link href="/es/aviso-legal" className="hover:text-zinc-900">
                  aviso legal
                </Link>
              </li>
              <li>
                <Link href="/es/privacidad" className="hover:text-zinc-900">
                  privacidad
                </Link>
              </li>
              <li>
                <Link href="/es/cookies" className="hover:text-zinc-900">
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
