import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { notFound } from "next/navigation";
import AboutContactCta from "@/components/about/AboutContactCta";
import AboutPageReveal, { AboutRevealItem } from "@/components/about/AboutPageReveal";
import EditorialShell, {
  EditorialBlock,
  EditorialSubgrid,
} from "@/components/layout/EditorialShell";
import JsonLd from "@/components/Seo/JsonLd";
import { withLang, isValidLang } from "@/lib/i18n/path";
import { getSiteUrl } from "@/lib/seo";

const siteUrl = getSiteUrl();

type Props = { params: Promise<{ lang: string }> };

const team = [
  {
    name: "Alex Ruiz",
    role: {
      es: "Co-Founder · Director Creativo",
      en: "Co-Founder · Creative Director",
    },
    image: "/about/alex-statue.png",
    alt: {
      es: "Busto escultórico de Alex Ruiz",
      en: "Sculptural bust of Alex Ruiz",
    },
  },
  {
    name: "Clara Miñarro",
    role: {
      es: "Co-Founder · Directora de Cuentas",
      en: "Co-Founder · Account Director",
    },
    image: "/about/clara-statue.png",
    alt: {
      es: "Busto escultórico de Clara Miñarro",
      en: "Sculptural bust of Clara Miñarro",
    },
  },
  {
    name: "Alicia Sánchez",
    role: {
      es: "Diseñadora Gráfica",
      en: "Graphic Designer",
    },
    image: "/about/alicia-statue.png",
    alt: {
      es: "Busto escultórico de Alicia Sánchez",
      en: "Sculptural bust of Alicia Sánchez",
    },
  },
] as const;

const serviceColumns = {
  es: [
    ["Estrategia de marca", "Posicionamiento de marca", "Naming", "Identidad verbal"],
    ["Identidad visual", "Dirección de arte", "Diseño editorial", "Diseño de packaging"],
    ["Diseño web", "Diseño UX/UI", "Diseño de producto digital", "E-commerce"],
    ["Estrategia de comunicación", "Campañas creativas", "Dirección de fotografía", "Diseño para redes sociales"],
  ],
  en: [
    ["Brand strategy", "Brand positioning", "Naming", "Verbal identity"],
    ["Visual identity", "Art direction", "Editorial design", "Packaging design"],
    ["Web design", "UX/UI design", "Digital product design", "E-commerce"],
    ["Communication strategy", "Creative campaigns", "Photography direction", "Social media design"],
  ],
} as const;

const processItems = {
  es: [
    {
      title: "Auditoría",
      aside: "Entender qué funciona, qué no, y por qué.",
      body: "Cada proyecto empieza observando. Estudiamos la marca desde dentro: su recorrido hasta aquí, las personas que la sostienen, los aciertos que conviene mantener y los puntos donde el sistema se ha quedado corto. Una auditoría de marca honesta es lo que nos permite saber dónde estamos antes de decidir hacia dónde vamos.",
    },
    {
      title: "Contexto",
      aside: "El a quién y el dónde son determinantes.",
      body: "Una marca solo cobra sentido en relación con su entorno. Investigamos el sector, el público y los referentes que rodean al proyecto para entender qué espacio puede ocupar y qué territorio merece la pena reclamar. De ese análisis nace el concepto: la idea que va a sostener cada decisión de diseño posterior y a darle al proyecto un posicionamiento propio.",
    },
    {
      title: "Ejecución",
      aside: "Después de pensar, toca construir.",
      body: "Con el concepto definido y las decisiones estratégicas tomadas, empezamos a darle forma al proyecto. Cada pieza se diseña pensando en cómo encaja con el resto, manteniendo la coherencia del sistema desde el primer detalle hasta la última aplicación. La ejecución no es una fase decorativa: es donde se comprueba si lo pensado se sostiene en la realidad.",
    },
    {
      title: "Proyección",
      aside: "¿Qué es lo siguiente?",
      body: "Entregar el proyecto no es cerrarlo. Acompañamos a la marca en los siguientes pasos: nuevas aplicaciones, comunicación y evolución del sistema. Para que lo construido siga teniendo sentido a medida que la empresa crece. Una identidad bien diseñada debería poder durar; nuestro trabajo es ayudar a que lo haga.",
    },
  ],
  en: [
    {
      title: "Audit",
      aside: "Understanding what works, what does not, and why.",
      body: "Every project starts by observing. We study the brand from the inside: how it got here, the people behind it, the strengths worth keeping and the points where the system has fallen short. An honest brand audit lets us understand where we are before deciding where to go.",
    },
    {
      title: "Context",
      aside: "The who and the where are decisive.",
      body: "A brand only makes sense in relation to its context. We research the sector, audience and references around the project to understand which space it can occupy and which territory is worth claiming. From that analysis comes the concept: the idea that will support every design decision and give the project its own position.",
    },
    {
      title: "Execution",
      aside: "After thinking, it is time to build.",
      body: "With the concept defined and strategic decisions made, we start shaping the project. Each piece is designed for how it fits with the rest, keeping the system coherent from the first detail to the final application. Execution is not decorative: it is where thinking proves whether it holds up in reality.",
    },
    {
      title: "Projection",
      aside: "What comes next?",
      body: "Delivering the project does not mean closing it. We accompany the brand through next steps: new applications, communication and system evolution. So what has been built keeps making sense as the company grows. A well-designed identity should last; our role is to help it do so.",
    },
  ],
} as const;

const manifesto = {
  es: [
    "Pensar antes de ejecutar",
    "Una marca es un sistema bien montado",
    "Una decisión visual debería poder explicarse",
    "La coherencia se percibe antes de justificarla",
    "Una buena marca no necesita levantar la voz",
    "La estética sin intención envejece rápido",
    "Quitar también es construir",
  ],
  en: [
    "Think before executing",
    "A brand is a well-built system",
    "A visual decision should be explainable",
    "Coherence is felt before it is justified",
    "A good brand does not need to raise its voice",
    "Aesthetics without intention age quickly",
    "Removing is also building",
  ],
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang)) return {};
  const isEn = lang === "en";
  const title = isEn ? "About enblanco" : "About enblanco";
  const description = isEn
    ? "enblanco is a compact creative agency for brands in defining moments: strategy, identity, direction and digital design."
    : "enblanco es una agencia creativa compacta para marcas en momentos definitorios: estrategia, identidad, dirección y diseño digital.";
  const canonical = `/${lang}/enblanco`;
  const ogUrl = `${siteUrl}${canonical}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: { es: "/es/enblanco", en: "/en/enblanco", "x-default": "/es/enblanco" },
    },
    openGraph: {
      title: `${title} — enblanco`,
      description,
      url: ogUrl,
      siteName: "enblanco",
      images: [{ url: `${siteUrl}/og-default.jpg`, width: 1200, height: 630, alt: "enblanco" }],
    },
    robots: { index: true, follow: true },
  };
}

export default async function EnblancoPage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();
  const isEn = lang === "en";

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isEn ? "home" : "inicio", item: `${siteUrl}/${lang}` },
      { "@type": "ListItem", position: 2, name: "enblanco", item: `${siteUrl}/${lang}/enblanco` },
    ],
  };

  const copy = isEn
    ? {
        breadcrumb: "about",
        home: "home",
        hero: [
          "We are a creative agency focused on",
          "rebuilding, deconstructing and building brands",
          "with sensitivity, creativity and intention.",
        ],
        teamLabel: "enblanco team",
        teamIntro: ["We are a compact team,", "involved in every detail of the process"],
        focusTitle: "Rebuild, deconstruct, build.",
        focusText: "We work with brands in defining moments. Projects that are just starting, brands that need to be reordered and challenges that require a new point of view.",
        servicesIntro: "At enblanco we create the visual, verbal and conceptual universe of each brand through ",
        servicesStrong: "branding, creative direction and digital design.",
        servicesLink: "View all services →",
        processLabel: "Our way of working",
        years: "For 5 years, enblanco has worked with brands in defining moments: companies that are starting, brands that need to be reordered and projects that require a new point of view.",
        manifestoTitle: "Manifesto",
        ctaLine1: "Tell us",
        ctaLine2: "what",
        ctaLine3: "creating",
        ctaAreYou: "you're",
        contactHref: withLang("en", "contact"),
        servicesHref: withLang("en", "services"),
      }
    : {
        breadcrumb: "about",
        home: "home",
        hero: [
          "Somos una agencia creativa enfocada en",
          "reconstruir, deconstruir y construir marcas",
          "desde la sensibilidad, la creatividad y la intención.",
        ],
        teamLabel: "Equipo enblanco",
        teamIntro: ["Somos un equipo compacto,", "involucrado en cada detalle del proceso"],
        focusTitle: "Reconstruir, deconstruir, construir.",
        focusText: "Trabajamos con marcas en momentos definitorios. Proyectos que arrancan, marcas que necesitan reordenarse y retos que requieren una mirada nueva.",
        servicesIntro: "En enblanco creamos el universo visual, verbal y conceptual de cada marca a través del ",
        servicesStrong: "branding, la dirección creativa y el diseño digital.",
        servicesLink: "Ver todos los servicios →",
        processLabel: "Nuestra forma de trabajo",
        years: "Desde hace 5 años, enblanco trabaja con marcas en momentos definitorios: empresas que arrancan, marcas que necesitan reordenarse y proyectos que requieren una mirada nueva.",
        manifestoTitle: "Manifiesto",
        ctaLine1: "Cuéntanos",
        ctaLine2: "qué",
        ctaLine3: "creando",
        ctaAreYou: "estás",
        contactHref: withLang("es", "contacto"),
        servicesHref: withLang("es", "servicios"),
      };

  return (
    <EditorialShell
      as="main"
      id="main"
      className="about-page overflow-hidden bg-[var(--color-bg)]"
    >
      <JsonLd data={breadcrumbJsonLd} />

      <AboutPageReveal>
        <EditorialSubgrid
          as="nav"
          aria-label={isEn ? "Breadcrumb" : "Migas de pan"}
          start="frame-start"
          end="frame-end"
          className="about-breadcrumbs"
        >
          <Link href={withLang(lang, "")}>{copy.home}</Link>
          <span>{copy.breadcrumb}</span>
          <span>enblanco</span>
        </EditorialSubgrid>

        <EditorialBlock as="header" start="guide-1" end="guide-5" className="about-hero">
          <AboutRevealItem>
            <h1>
              {copy.hero.map((line, index) => (
                <Fragment key={line}>
                  {index > 0 ? <br /> : null}
                  {line}
                </Fragment>
              ))}
            </h1>
          </AboutRevealItem>
        </EditorialBlock>

        <EditorialSubgrid as="section" start="frame-start" end="frame-end" className="about-team-intro" aria-labelledby="about-team-heading">
          <AboutRevealItem>
            <p className="about-eyebrow">{copy.teamLabel}</p>
            <h2 id="about-team-heading">
              {copy.teamIntro.map((line, index) => (
                <Fragment key={line}>
                  {index > 0 ? <br /> : null}
                  {line}
                </Fragment>
              ))}
            </h2>
          </AboutRevealItem>
        </EditorialSubgrid>

        <EditorialBlock as="section" start="guide-1" end="guide-6" className="about-team" aria-label={copy.teamLabel}>
          {team.map((member, index) => (
            <AboutRevealItem key={member.name}>
              <article className="about-team-card">
                <div className="about-team-card__image" aria-hidden="true">
                  <Image
                    src={member.image}
                    alt=""
                    width={896}
                    height={1200}
                    priority={index === 0}
                    sizes="(max-width: 767px) 85vw, 26vw"
                  />
                </div>
                <div className="about-team-card__meta">
                  <h3>{member.name}</h3>
                  <p>[ {member.role[lang]} ]</p>
                </div>
              </article>
            </AboutRevealItem>
          ))}
        </EditorialBlock>

        <EditorialSubgrid
          as="section"
          start="frame-start"
          end="frame-end"
          className="about-services"
          aria-labelledby="about-services-heading"
        >
          <AboutRevealItem className="about-services__intro-cell">
            <div className="about-services__intro">
              <h2 id="about-services-heading">
                {copy.servicesIntro}
                <span>{copy.servicesStrong}</span>
              </h2>
              <Link href={copy.servicesHref}>{copy.servicesLink}</Link>
            </div>
          </AboutRevealItem>
          <AboutRevealItem className="about-services__lists-cell">
            <div className="about-services__lists" aria-label={isEn ? "Services" : "Servicios"}>
              {serviceColumns[lang].map((column) => (
                <ul key={column.join("-")}>
                  {column.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
              ))}
            </div>
          </AboutRevealItem>
        </EditorialSubgrid>

        <EditorialSubgrid as="section" start="frame-start" end="frame-end" className="about-focus" aria-labelledby="about-focus-heading">
          <AboutRevealItem className="about-focus__heading-cell">
            <h2 id="about-focus-heading">
              {copy.focusTitle.split(" ").map((word, index) => (
                <Fragment key={word}>
                  {index > 0 ? <br /> : null}
                  {word}
                </Fragment>
              ))}
            </h2>
          </AboutRevealItem>
          <AboutRevealItem className="about-focus__body-cell">
            <p>{copy.focusText}</p>
          </AboutRevealItem>
        </EditorialSubgrid>

        <EditorialBlock as="section" start="guide-1" end="guide-6" className="about-studio" aria-label={isEn ? "Studio interior" : "Interior del estudio"}>
          <AboutRevealItem>
            <Image
              src="/about/studio-interior.png"
              alt={isEn ? "Minimal creative studio interior with a work table" : "Interior minimalista de un estudio creativo con mesa de trabajo"}
              width={1264}
              height={848}
              sizes="(max-width: 767px) 92vw, 96vw"
            />
          </AboutRevealItem>
        </EditorialBlock>

        <EditorialSubgrid as="section" start="frame-start" end="frame-end" className="about-process" aria-labelledby="about-process-heading">
          <AboutRevealItem>
            <p className="about-eyebrow">{copy.processLabel}</p>
          </AboutRevealItem>
          <div className="about-process__items">
            {processItems[lang].map((item, index) => (
              <AboutRevealItem key={item.title} className="about-process__item">
                <article className={`about-process-row about-process-row--${index + 1}`}>
                  <h2 id={item.title === processItems[lang][0].title ? "about-process-heading" : undefined}>
                    {item.title}
                  </h2>
                  <p className="about-process-row__aside">{item.aside}</p>
                  <p className="about-process-row__body">{item.body}</p>
                </article>
              </AboutRevealItem>
            ))}
          </div>
        </EditorialSubgrid>

        <EditorialBlock as="section" start="guide-1" end="guide-6" className="about-years">
          <AboutRevealItem>
            <p>{copy.years}</p>
          </AboutRevealItem>
        </EditorialBlock>

        <EditorialSubgrid as="section" start="frame-start" end="frame-end" className="about-manifesto" aria-labelledby="about-manifesto-heading">
          <AboutRevealItem>
            <h2 id="about-manifesto-heading">{copy.manifestoTitle}</h2>
          </AboutRevealItem>
          <AboutRevealItem>
            <ol>
              {manifesto[lang].map((item, index) => (
                <li key={item} className={`about-manifesto__item about-manifesto__item--${index + 1}`}>
                  <span>[ {index + 1} ]</span> [ {item} ]
                </li>
              ))}
            </ol>
          </AboutRevealItem>
        </EditorialSubgrid>

        <EditorialBlock as="section" start="guide-1" end="guide-6" className="about-cta" aria-label={isEn ? "Contact enblanco" : "Contactar con enblanco"}>
          <AboutRevealItem>
            <AboutContactCta
              href={copy.contactHref}
              ariaLabel={isEn ? "Go to contact" : "Ir a contacto"}
              trigger={copy.ctaLine1}
              what={copy.ctaLine2}
              areYou={copy.ctaAreYou}
              creating={copy.ctaLine3}
            />
          </AboutRevealItem>
        </EditorialBlock>
      </AboutPageReveal>
    </EditorialShell>
  );
}
