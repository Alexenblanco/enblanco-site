/**
 * Modelo de datos para páginas de detalle de proyectos.
 * Slug estable por proyecto (SEO). Relacionados por industria/servicio.
 */

import { projects, type Project } from "./projects";

export type ContentMedia = {
  type: "image" | "video";
  src: string;
  alt?: string;
  /** Para video: poster opcional */
  poster?: string;
  /** Ruta en viewport móvil; si no hay, se usa src */
  srcMobile?: string;
  /** Tipo en móvil si difiere (ej. desktop image, mobile video) */
  typeMobile?: "image" | "video";
  posterMobile?: string;
};

export type ContentSection = {
  /** H2 */
  heading: string;
  /** H3 / eyebrow (opcional) */
  eyebrow?: string;
  /** Título opcional dentro del bloque */
  title?: string;
  body: string;
  /** Media opcional (imagen o vídeo) asociada al bloque */
  media?: ContentMedia;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ProjectDetail = {
  /** Slug estable para la URL (ej. branding-acilica-studio) */
  slug: string;
  /** Coincide con Project.id o se usa para relacionar con el listado */
  projectId: string;
  title: string;
  year: string;
  industry: string;
  /** Servicio principal: para slug, SEO y relacionados */
  servicePrimary: string;
  /** Lista de servicios desarrollados (columna izquierda) */
  services: string[];
  coverImage: string;
  coverAlt: string;
  /** Portada móvil opcional; si no hay, se usa coverImage */
  coverImageMobile?: string;
  /** Introducción (columna derecha "Overview") */
  overview: string;
  /** Bloques de contenido (H2, H3, body, media opcional) */
  sections: ContentSection[];
  faqs: FaqItem[];
  /** Imagen OG opcional; si no hay, se usa coverImage */
  ogImage?: string;
};

const D = "/projects/acilica/desktop";
const M = "/projects/acilica/mobile";

const ACILICA_SECTIONS: ContentSection[] = [
  {
    heading: "Resumen del proyecto",
    body: "Acilica nace como el estudio-laboratorio de litografía de la artista Teresa de Artiñano. El encargo partía de una necesidad precisa: construir un naming contemporáneo capaz de expresar el carácter experimental y orgánico de la técnica, sin perder la dimensión purista y artesanal heredada del aprendizaje con maestros litógrafos.\n\nDesde enblanco abordamos el proyecto desde la materia misma. El objetivo no era simplemente nombrar un estudio, sino traducir la lógica interna de la litografía en un sistema conceptual coherente: nombre, identidad y lenguaje visual debían responder al propio proceso técnico que define la disciplina.",
    media: { type: "video", src: `${D}/acilica-1.mp4`, srcMobile: `${M}/acilica-1.mp4`, alt: "Acilica Studio — proceso litográfico" },
  },
  {
    heading: "El contexto",
    body: "La litografía es una técnica histórica basada en la interacción entre agua, grasa, piedra caliza y ácido. Su funcionamiento responde a principios químicos precisos, pero su resultado final es profundamente artístico.\n\nEl reto consistía en encontrar un nombre que no cayera en lo nostálgico ni en lo excesivamente técnico. Debía ser contemporáneo, abierto y conceptual, pero conectado a la materia y al proceso real de estampación.\n\nNo se trataba de construir una marca decorativa, sino de articular una identidad que dialogara con la técnica desde dentro.",
    media: { type: "image", src: `${D}/acilica-2.jpg`, srcMobile: `${M}/acilica-2.mp4`, typeMobile: "video", alt: "ACILICA STUDIO — construcción tipográfica y logos" },
  },
  {
    heading: "El naming",
    eyebrow: "Origen conceptual",
    body: "La propuesta fue ACILICA, una palabra inventada cuya sonoridad remite directamente a la piedra caliza —base tradicional de la litografía— y al ácido que activa las reacciones químicas necesarias para el grabado.\n\nEl nombre no describe la técnica. La contiene.",
    media: { type: "video", src: `${D}/acilica-3.mp4`, srcMobile: `${M}/acilica-3.jpg`, typeMobile: "image", alt: "Acilica — naming y concepto" },
  },
  {
    heading: "El naming",
    eyebrow: "Lógica estructural",
    body: "ACILICA es un palíndromo: se lee igual en ambos sentidos.\nEsta condición formal conecta directamente con la lógica de la estampación litográfica, donde la imagen final es el reflejo invertido de la piedra original.\n\nEl naming replica así, de forma conceptual, el propio gesto técnico de la litografía.\n\nLa simetría no es un recurso estético. Es una traducción estructural del proceso.",
    media: { type: "image", src: `${D}/acilica-4.jpg`, srcMobile: `${M}/acilica-4.mp4`, typeMobile: "video", alt: "ACILICA STUDIO — construcción tipográfica y logos" },
  },
  {
    heading: "Estrategia de marca",
    eyebrow: "Materia como núcleo simbólico",
    body: "La identidad parte de la litografía entendida como sistema químico y material. Agua y grasa se atraen y se repelen; la piedra actúa como soporte; el ácido desencadena la transformación.\n\nEste equilibrio entre fuerzas opuestas se interpreta como un ecosistema autónomo de partículas en tensión constante.",
    media: { type: "video", src: `${D}/acilica-5.mp4`, srcMobile: `${M}/acilica-5.jpg`, typeMobile: "image", alt: "Proceso de estampación litográfica" },
  },
  {
    heading: "Estrategia de marca",
    eyebrow: "Inversión como principio visual",
    body: "La litografía trabaja mediante inversión: lo que se dibuja se imprime invertido.\n\nA partir de esta lógica se construyó un sistema cromático basado en la dualidad.\nLos verdes encuentran su correspondencia en los púrpuras y viceversa, generando un código visual fundamentado en la inversión y la reciprocidad.",
    media: { type: "video", src: `${D}/acilica-6.mp4`, srcMobile: `${M}/acilica-6.jpg`, typeMobile: "image", alt: "Sistema cromático Acilica" },
  },
  {
    heading: "Estrategia de marca",
    eyebrow: "Replicación como identidad",
    body: "La técnica permite la producción seriada de obra.\nLa identidad incorpora este principio mediante sistemas modulares, repetición controlada y estructuras gráficas adaptables.\n\nLa marca se aleja así de la percepción tradicional de la litografía como técnica rígida, proyectando una visión dinámica y contemporánea.",
    media: { type: "image", src: `${D}/acilica-7.jpg`, srcMobile: `${M}/acilica-7.mp4`, typeMobile: "video", alt: "Sistemas modulares y repetición" },
  },
  {
    heading: "Sistema visual",
    body: "El sistema gráfico se construyó desde tres ejes:\n\n1. Simetría estructural (derivada del palíndromo).\n2. Dualidad cromática.\n3. Modulación y repetición.\n\nLa tipografía y la composición mantienen un equilibrio entre precisión técnica y sensibilidad artística, reforzando el carácter de estudio-laboratorio.",
    media: { type: "image", src: `${D}/acilica-8.jpg`, srcMobile: `${M}/acilica-8.jpg`, alt: "ACILICA STUDIO — identidad y sello" },
  },
  {
    heading: "Aplicaciones",
    body: "A partir del sistema se desarrollaron:\n\n- Dossier editorial\n- Tarjetas\n- Piezas gráficas impresas\n- Soportes de comunicación\n\nCada aplicación respeta la lógica conceptual de inversión, equilibrio y materia, garantizando coherencia sin rigidez formal.",
    media: { type: "image", src: `${D}/acilica-9.jpg`, srcMobile: `${M}/acilica-9.mp4`, typeMobile: "video", alt: "Aplicaciones editoriales ACILICA" },
  },
  {
    heading: "Impacto",
    body: "Acilica se posiciona como un espacio de experimentación contemporánea que honra la tradición técnica de la litografía sin quedar anclado en ella.\n\nEl naming y la identidad no actúan como envoltorio, sino como extensión directa del proceso artístico.\n\nLa marca no representa la técnica. La encarna.",
    media: { type: "image", src: `${D}/acilica-10.jpg`, srcMobile: `${M}/acilica-10.jpg`, alt: "Folleto y aplicaciones editoriales ACILICA" },
  },
  { heading: "", body: "", media: { type: "image", src: `${D}/acilica-11.jpg`, srcMobile: `${M}/acilica-11.mp4`, typeMobile: "video", alt: "Acilica Studio" } },
  { heading: "", body: "", media: { type: "image", src: `${D}/acilica-12.jpg`, srcMobile: `${M}/acilica-12.jpg`, alt: "Acilica Studio" } },
  { heading: "", body: "", media: { type: "video", src: `${D}/acilica-13.mp4`, srcMobile: `${M}/acilica-13.jpg`, typeMobile: "image", alt: "Acilica Studio" } },
  { heading: "", body: "", media: { type: "video", src: `${D}/acilica-14.mp4`, srcMobile: `${M}/acilica-14.mp4`, alt: "Acilica Studio" } },
  { heading: "", body: "", media: { type: "video", src: `${D}/acilica-15.mp4`, srcMobile: `${M}/acilica-15.mp4`, alt: "Acilica Studio" } },
  { heading: "", body: "", media: { type: "video", src: `${D}/acilica-16.mp4`, srcMobile: `${M}/acilica-16.jpg`, typeMobile: "image", alt: "Acilica Studio" } },
];

const ACILICA_FAQS: FaqItem[] = [
  {
    question: "¿Qué incluye un proceso de naming estratégico?",
    answer:
      "Incluye análisis conceptual, definición de criterios fonéticos y semánticos, exploración lingüística, validación conceptual y alineación con la estrategia de marca.",
  },
  {
    question: "¿Por qué es relevante que un naming tenga coherencia estructural?",
    answer:
      "Porque cuando el nombre incorpora la lógica interna del proyecto, la marca deja de ser superficial y se convierte en sistema.",
  },
  {
    question: "¿Cómo se traduce un proceso técnico en identidad visual?",
    answer:
      "Identificando sus principios estructurales y convirtiéndolos en reglas gráficas, cromáticas y compositivas.",
  },
];

export const PROJECT_DETAILS: ProjectDetail[] = [
  {
    slug: "branding-acilica-studio",
    projectId: "2",
    title: "Acilica",
    year: "2025",
    industry: "Arts & Culture",
    servicePrimary: "branding",
    services: [
      "Naming estratégico",
      "Brand Strategy",
      "Identidad visual",
      "Dirección de arte",
      "Sistema gráfico",
      "Aplicaciones editoriales",
    ],
    coverImage: "/projects/acilica/desktop/cover-desktop.jpg",
    coverAlt: "Acilica — estudio de litografía",
    coverImageMobile: "/projects/acilica/mobile/cover-mobile.png",
    overview:
      "Acilica nace como el estudio-laboratorio de litografía de la artista Teresa de Artiñano. El encargo partía de una necesidad precisa: construir un naming contemporáneo capaz de expresar el carácter experimental y orgánico de la técnica, sin perder la dimensión purista y artesanal heredada del aprendizaje con maestros litógrafos. Desde enblanco abordamos el proyecto desde la materia misma.",
    sections: ACILICA_SECTIONS,
    faqs: ACILICA_FAQS,
    ogImage: "/projects/acilica/desktop/cover-desktop.jpg",
  },
];

/** Obtiene el detalle de un proyecto por slug (solo slugs de detalle, no de colección). */
export function getProjectDetailBySlug(slug: string): ProjectDetail | null {
  return PROJECT_DETAILS.find((p) => p.slug === slug) ?? null;
}

/** Slug estable para un proyecto del listado (si tiene página de detalle). */
export function getDetailSlugForProject(project: Project): string | null {
  const detail = PROJECT_DETAILS.find((d) => d.projectId === project.id);
  return detail?.slug ?? null;
}

/** Proyectos relacionados por industria y/o servicio principal (3–6). Excluye el actual. */
export function getRelatedProjectDetails(
  current: ProjectDetail,
  limit = 6
): Project[] {
  const others = projects.filter((p) => p.id !== current.projectId);
  const byIndustry = others.filter(
    (p) => p.industry.toLowerCase() === current.industry.toLowerCase()
  );
  const byService = others.filter((p) =>
    p.services.some(
      (s) => s.toLowerCase() === current.servicePrimary.toLowerCase()
    )
  );
  const combined = new Map<string, Project>();
  [...byIndustry, ...byService].forEach((p) => combined.set(p.id, p));
  return Array.from(combined.values()).slice(0, limit);
}
