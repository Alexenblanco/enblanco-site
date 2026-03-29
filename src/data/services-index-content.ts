import type { Locale } from "@/lib/i18n/path";
import { withLang } from "@/lib/i18n/path";

export type ServicesIndexLink = {
  href: string;
  label: string;
};

export type ServicesIndexCapability = {
  number: string;
  titleLines: string[];
  description: string;
  groups: Array<string[]>;
  interestLink: ServicesIndexLink;
  examplesLink: ServicesIndexLink;
};

export type ServicesIndexQuestion = {
  label: string;
  href: string;
};

export type ServicesIndexContent = {
  heroIntro: string;
  capabilitiesEyebrow: string;
  capabilities: ServicesIndexCapability[];
  questions: ServicesIndexQuestion[];
};

function contactHref(lang: Locale) {
  return lang === "es" ? withLang("es", "contacto") : withLang("en", "contact");
}

function faqHref(lang: Locale) {
  return lang === "es" ? withLang("es", "enblanco/faq") : withLang("en", "enblanco/faq");
}

const CONTENT: Record<Locale, Omit<ServicesIndexContent, "capabilities" | "questions">> = {
  es: {
    heroIntro:
      "Trabajamos con marcas, ofreciendo servicios creativos, estratégicos y digitales adaptados a cada contexto.",
    capabilitiesEyebrow: "Servicios creativos",
  },
  en: {
    heroIntro:
      "We work with brands, offering creative, strategic, and digital services adapted to each context.",
    capabilitiesEyebrow: "Creative services",
  },
};

export function getServicesIndexContent(lang: Locale): ServicesIndexContent {
  const interest = {
    href: contactHref(lang),
    label: lang === "es" ? "Me interesa" : "I'm interested",
  };

  const faq = faqHref(lang);

  if (lang === "es") {
    return {
      ...CONTENT.es,
      capabilities: [
        {
          number: "[ 1 ]",
          titleLines: ["Branding y", "Consultoría"],
          description:
            "Construimos marcas con base estratégica, criterio visual y capacidad real de implantación. Desde la definición inicial hasta su expresión en distintos puntos de contacto, trabajamos la marca como un sistema sólido, reconocible y preparado para crecer.",
          groups: [
            [
              "Consultoría de marca",
              "Auditoría y diagnóstico de marca",
              "Estrategia de marca",
              "Posicionamiento de marca",
              "Arquitectura de marca",
              "Identidad verbal",
              "Identidad visual",
              "Naming",
            ],
          ],
          interestLink: interest,
          examplesLink: {
            href: withLang("es", "proyectos/branding"),
            label: "Ver ejemplos",
          },
        },
        {
          number: "[ 2 ]",
          titleLines: ["Diseño web", "y digital"],
          description:
            "Diseñamos experiencias digitales que traducen mejor la marca, ordenan el contenido y mejoran la relación entre negocio, mensaje y usuario.",
          groups: [
            [
              "Consultoría digital",
              "Arquitectura de contenidos",
              "UX y journeys",
            ],
            [
              "Diseño web",
              "Landings y campañas",
              "Sistemas editoriales",
            ],
          ],
          interestLink: interest,
          examplesLink: {
            href: withLang("es", "proyectos/diseno-web"),
            label: "Ver ejemplos",
          },
        },
        {
          number: "[ 3 ]",
          titleLines: ["Marketing y", "publicidad"],
          description:
            "Construimos campañas con base estratégica, criterio visual y capacidad real de implantación. Desde la idea hasta su despliegue, conectamos mensaje, piezas y canales para que la marca se entienda y se recuerde.",
          groups: [
            [
              "Posicionamiento de marca",
              "Estrategia de marketing",
              "Estrategia de contenidos",
            ],
            [
              "Concepto creativo",
              "Campañas",
              "Dirección de arte",
            ],
          ],
          interestLink: interest,
          examplesLink: {
            href: withLang("es", "proyectos/estrategia-creativa"),
            label: "Ver ejemplos",
          },
        },
        {
          number: "[ 4 ]",
          titleLines: ["Aplicación", "de marca"],
          description:
            "Llevamos la marca a soportes, piezas y experiencias donde tiene que funcionar de verdad. Trabajamos la aplicación como una extensión natural del sistema, no como una capa añadida.",
          groups: [
            [
              "Packaging",
              "Sistemas de piezas",
              "Presentaciones y ventas",
            ],
            [
              "Campañas y contenidos",
              "Señalética y espacios",
              "Brand roll-out",
            ],
          ],
          interestLink: interest,
          examplesLink: {
            href: withLang("es", "proyectos/packaging"),
            label: "Ver ejemplos",
          },
        },
      ],
      questions: [
        { label: "¿No sabes qué necesita tu marca todavía?", href: faq },
        { label: "¿Ofrecéis también marketing y paid media?", href: faq },
        { label: "¿Qué opciones de pago tenéis?", href: faq },
        { label: "¿Cómo es el proceso de trabajo con enblanco?", href: faq },
        { label: "¿Podéis ayudar aunque la marca ya exista?", href: faq },
        { label: "¿Podéis ayudar con packaging?", href: faq },
      ],
    };
  }

  return {
    ...CONTENT.en,
    capabilities: [
      {
        number: "[ 1 ]",
        titleLines: ["Branding and", "Consulting"],
        description:
          "We build brands on strategic foundations, visual judgment, and real implementation capacity. From the initial definition to its expression across touchpoints, we work on brand as a solid, recognizable system prepared to grow.",
        groups: [
          [
            "Brand consulting",
            "Brand audit and diagnosis",
            "Brand strategy",
            "Brand positioning",
          ],
          [
            "Brand architecture",
            "Verbal identity",
            "Visual identity",
            "Naming",
          ],
        ],
        interestLink: interest,
        examplesLink: {
          href: withLang("en", "projects/branding"),
          label: "See examples",
        },
      },
      {
        number: "[ 2 ]",
        titleLines: ["Web and", "digital design"],
        description:
          "We design digital experiences that translate the brand more clearly, organize content, and improve the relationship between business, message, and user.",
        groups: [
          [
            "Digital consulting",
            "Content architecture",
            "UX and journeys",
          ],
          [
            "Web design",
            "Landing pages and campaigns",
            "Editorial systems",
          ],
        ],
        interestLink: interest,
        examplesLink: {
          href: withLang("en", "projects/web-design"),
          label: "See examples",
        },
      },
      {
        number: "[ 3 ]",
        titleLines: ["Marketing and", "advertising"],
        description:
          "We build campaigns on strategic foundations, visual judgment, and real implementation capacity. From the idea to the rollout, we connect message, assets, and channels so the brand is understood and remembered.",
        groups: [
          [
            "Brand positioning",
            "Marketing strategy",
            "Content strategy",
          ],
          [
            "Creative concept",
            "Campaigns",
            "Art direction",
          ],
        ],
        interestLink: interest,
        examplesLink: {
          href: withLang("en", "projects/creative-strategy"),
          label: "See examples",
        },
      },
      {
        number: "[ 4 ]",
        titleLines: ["Brand", "application"],
        description:
          "We take the brand into assets, pieces, and experiences where it needs to work for real. We approach application as a natural extension of the system, not as an extra layer added afterwards.",
        groups: [
          [
            "Packaging",
            "Asset systems",
            "Sales materials",
          ],
          [
            "Campaigns and content",
            "Signage and spaces",
            "Brand roll-out",
          ],
        ],
        interestLink: interest,
        examplesLink: {
          href: withLang("en", "projects/packaging"),
          label: "See examples",
        },
      },
    ],
    questions: [
      { label: "Not sure what your brand needs yet?", href: faq },
      { label: "Do you also offer marketing and paid media?", href: faq },
      { label: "What payment options do you offer?", href: faq },
      { label: "What is the working process with enblanco?", href: faq },
      { label: "Can you help if the brand already exists?", href: faq },
      { label: "Can you help with packaging?", href: faq },
    ],
  };
}
