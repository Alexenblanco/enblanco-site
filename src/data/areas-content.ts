/**
 * Area page content: data only. Rendered via renderAreaSectionBody in lib/areas-render.tsx.
 * To add a new area: add slug to lib/areas-slugs, then add entry here and in areas-meta.ts.
 */

import type { EnAreaSlug, EsAreaSlug } from "@/lib/areas-slugs";

/** Section body: plain text, contact CTA (reused), or inline links. */
export type AreaSectionBody =
  | { type: "text"; text: string }
  | { type: "contact"; intro?: string }
  | { type: "links"; segments: Array<string | { path: string; label: string }> };

export type AreaSectionData = {
  id: string;
  heading: string;
  body: AreaSectionBody;
};

export type AreaContentRecord = {
  h1: string;
  sections: AreaSectionData[];
};

export type AreaLang = "en" | "es";

// —— EN ——

const CONTENT_EN: Record<EnAreaSlug, AreaContentRecord> = {
  retail: {
    h1: "retail: brand, packaging, and digital built for fast decisions",
    sections: [
      { id: "context-challenges", heading: "context challenges", body: { type: "text", text: "in retail, decision time is minimal: the customer chooses in seconds. the brand has to be clear on shelf and consistent online so the choice is quick and confident." } },
      { id: "recommended-services", heading: "recommended services", body: { type: "links", segments: ["", { path: "services/branding", label: "branding" }, ", ", { path: "services/packaging", label: "packaging" }, " and ", { path: "services/web-design", label: "web design" }, " fit this context best. also ", { path: "services/art-direction", label: "art direction" }, " when there are campaigns and multiple touchpoints."] } },
      { id: "how-we-approach-it", heading: "how we approach it", body: { type: "text", text: "we prioritize information hierarchy and consistency between physical and digital channels. the brand system has to withstand range extensions and seasonal updates without losing clarity." } },
      { id: "related-projects", heading: "related projects", body: { type: "links", segments: ["you can see retail cases in ", { path: "projects", label: "projects" }, " filtered by ", { path: "projects/packaging", label: "packaging" }, " or ", { path: "projects/branding", label: "branding" }, "."] } },
      { id: "faq", heading: "faq", body: { type: "text", text: "timelines, coordination with buying or store teams, and adaptation to different formats: we agree on this at the start of the project." } },
      { id: "contact", heading: "contact", body: { type: "contact", intro: "if you have a retail project in mind, reach us via " } },
    ],
  },
  culture: {
    h1: "culture: identity and art direction with narrative and judgment",
    sections: [
      { id: "context-challenges", heading: "context challenges", body: { type: "text", text: "in culture the identity has to connect with a narrative and a demanding audience. art direction isn't decoration: it has to support the discourse and stand out without feeling predictable." } },
      { id: "recommended-services", heading: "recommended services", body: { type: "links", segments: ["", { path: "services/art-direction", label: "art direction" }, ", ", { path: "services/branding", label: "branding" }, ", and ", { path: "services/creative-strategy-campaigns", label: "creative strategy & campaigns" }, ". sometimes ", { path: "services/naming", label: "naming" }, " for institutions or new initiatives."] } },
      { id: "how-we-approach-it", heading: "how we approach it", body: { type: "text", text: "we start from the narrative and the audience. identity and art direction have to be recognizable and consistent over time, without giving up distinctiveness or editorial judgment." } },
      { id: "related-projects", heading: "related projects", body: { type: "links", segments: ["cases in ", { path: "projects/art-direction", label: "art direction" }, " and ", { path: "projects", label: "projects" }, ". reflections in ", { path: "notes", label: "notes" }, "."] } },
      { id: "faq", heading: "faq", body: { type: "text", text: "timelines, coordination with content teams, and tight budgets: we discuss this transparently from the start." } },
      { id: "contact", heading: "contact", body: { type: "contact", intro: "for culture projects: " } },
    ],
  },
  food: {
    h1: "food: packaging and brand built to be chosen in seconds",
    sections: [
      { id: "context-challenges", heading: "context challenges", body: { type: "text", text: "in food, the pack competes on shelf and on screen. brand and packaging have to convey origin, quality, and difference in very little time and space." } },
      { id: "recommended-services", heading: "recommended services", body: { type: "links", segments: ["", { path: "services/packaging", label: "packaging" }, ", ", { path: "services/branding", label: "branding" }, ", and ", { path: "services/naming", label: "naming" }, " for brands and ranges. sometimes ", { path: "services/art-direction", label: "art direction" }, " for campaigns and content."] } },
      { id: "how-we-approach-it", heading: "how we approach it", body: { type: "text", text: "we hierarchy pack information: what the product is, who it's for, and why choose it. the identity has to work across multiple SKUs and formats without losing legibility or impact." } },
      { id: "related-projects", heading: "related projects", body: { type: "links", segments: ["examples in ", { path: "projects/packaging", label: "packaging projects" }, " and ", { path: "projects", label: "projects" }, ". more context in ", { path: "notes", label: "notes" }, "."] } },
      { id: "faq", heading: "faq", body: { type: "text", text: "food regulation, production timelines, and range extension: we agree on this at the start." } },
      { id: "contact", heading: "contact", body: { type: "contact", intro: "for food projects: " } },
    ],
  },
  health: {
    h1: "health: clarity, trust, and communication that holds up",
    sections: [
      { id: "context-challenges", heading: "context challenges", body: { type: "text", text: "in health, regulation and trust are paramount. communication has to be precise, accessible, and consistent over time—without slipping into jargon or empty messaging." } },
      { id: "recommended-services", heading: "recommended services", body: { type: "links", segments: ["", { path: "services/brand-consulting", label: "brand consulting" }, ", ", { path: "services/branding", label: "branding" }, ", and ", { path: "services/creative-strategy-campaigns", label: "creative strategy & campaigns" }, " to align message and tone before design."] } },
      { id: "how-we-approach-it", heading: "how we approach it", body: { type: "text", text: "we start from regulation and audience mapping. we define a language that balances rigor and approachability, and apply it consistently across all touchpoints." } },
      { id: "related-projects", heading: "related projects", body: { type: "links", segments: ["health cases in ", { path: "projects", label: "projects" }, " and in ", { path: "notes", label: "notes" }, " where we discuss sector communication."] } },
      { id: "faq", heading: "faq", body: { type: "text", text: "how we work with approval committees, validation timelines, and market adaptation: we define this from the outset." } },
      { id: "contact", heading: "contact", body: { type: "contact", intro: "for health communication projects: " } },
    ],
  },
  industry: {
    h1: "industry: a solid brand is clarity, consistency, and rigor",
    sections: [
      { id: "context-challenges", heading: "context challenges", body: { type: "text", text: "in B2B industry the brand is often invisible until it matters: tenders, partners, employees. the identity has to convey solidity and clarity without noise or trends." } },
      { id: "recommended-services", heading: "recommended services", body: { type: "links", segments: ["", { path: "services/brand-consulting", label: "brand consulting" }, ", ", { path: "services/branding", label: "branding" }, ", and ", { path: "services/web-design", label: "web design" }, " for consistent presence. often ", { path: "services/creative-strategy-campaigns", label: "creative strategy" }, " to communicate value to different audiences."] } },
      { id: "how-we-approach-it", heading: "how we approach it", body: { type: "text", text: "we align positioning and message before designing. the visual system has to last years, multiple divisions and channels, without feeling scattered or dated." } },
      { id: "related-projects", heading: "related projects", body: { type: "links", segments: ["industry cases in ", { path: "projects/brand-consulting", label: "consulting" }, " and ", { path: "projects", label: "projects" }, ". more in ", { path: "notes", label: "notes" }, "."] } },
      { id: "faq", heading: "faq", body: { type: "text", text: "internal team involvement, timelines, and long-term brand evolution: we define this from the start." } },
      { id: "contact", heading: "contact", body: { type: "contact", intro: "for industry projects: " } },
    ],
  },
  "startups-technology": {
    h1: "startups & technology: brand and product with system, without friction",
    sections: [
      { id: "context-challenges", heading: "context challenges", body: { type: "text", text: "in startups and tech the brand grows with the product. you need a system that scales: naming, identity, and digital presence that don't feel outdated in six months." } },
      { id: "recommended-services", heading: "recommended services", body: { type: "links", segments: ["", { path: "services/naming", label: "naming" }, ", ", { path: "services/branding", label: "branding" }, ", ", { path: "services/web-design", label: "web design" }, ", and sometimes ", { path: "services/brand-consulting", label: "brand consulting" }, " to align positioning before launch."] } },
      { id: "how-we-approach-it", heading: "how we approach it", body: { type: "text", text: "we define a solid base from the start: name, identity, and visual system that can grow without a full redesign every six months. the brand has to coexist with the product without competing with it." } },
      { id: "related-projects", heading: "related projects", body: { type: "links", segments: ["cases in ", { path: "projects/web-design", label: "web design" }, ", ", { path: "projects/naming", label: "naming" }, ", and ", { path: "projects", label: "projects" }, ". more in ", { path: "notes", label: "notes" }, "."] } },
      { id: "faq", heading: "faq", body: { type: "text", text: "timelines for MVP, coordination with product teams, and brand evolution: we discuss this in the first conversation." } },
      { id: "contact", heading: "contact", body: { type: "contact", intro: "for startups or technology projects: " } },
    ],
  },
};

// —— ES ——

const CONTENT_ES: Record<EsAreaSlug, AreaContentRecord> = {
  retail: {
    h1: "retail: marca, packaging y digital pensados para decidir rápido",
    sections: [
      { id: "retos-del-contexto", heading: "retos del contexto", body: { type: "text", text: "en retail el tiempo de decisión es mínimo: el cliente elige en segundos. la marca tiene que ser clara en lineal y coherente en digital para que la elección sea rápida y segura." } },
      { id: "servicios-recomendados", heading: "servicios recomendados", body: { type: "links", segments: ["", { path: "servicios/branding", label: "branding" }, ", ", { path: "servicios/packaging", label: "packaging" }, " y ", { path: "servicios/diseno-web", label: "diseño web" }, " son los que más encajan con este contexto. también ", { path: "servicios/direccion-de-arte", label: "dirección de arte" }, " cuando hay campañas y puntos de contacto múltiples."] } },
      { id: "como-lo-abordamos", heading: "cómo lo abordamos", body: { type: "text", text: "priorizamos jerarquía de información y coherencia entre canal físico y digital. el sistema de marca tiene que resistir ampliaciones de gama y cambios de temporada sin perder claridad." } },
      { id: "proyectos-relacionados", heading: "proyectos relacionados", body: { type: "links", segments: ["puedes ver casos de retail en ", { path: "proyectos", label: "proyectos" }, " filtrados por ", { path: "proyectos/packaging", label: "packaging" }, " o ", { path: "proyectos/branding", label: "branding" }, "."] } },
      { id: "faq", heading: "preguntas frecuentes", body: { type: "text", text: "plazos, coordinación con equipos de compras o tienda y adaptación a distintos formatos: lo acordamos al inicio del proyecto." } },
      { id: "contacto", heading: "contacto", body: { type: "contact", intro: "si tienes un proyecto de retail en mente, escríbenos desde " } },
    ],
  },
  cultura: {
    h1: "cultura: identidad y dirección de arte con narrativa y criterio",
    sections: [
      { id: "retos-del-contexto", heading: "retos del contexto", body: { type: "text", text: "en cultura la identidad tiene que conectar con un relato y un público exigente. la dirección de arte no es decoración: tiene que sostener el discurso y distinguir sin caer en lo previsible." } },
      { id: "servicios-recomendados", heading: "servicios recomendados", body: { type: "links", segments: ["", { path: "servicios/direccion-de-arte", label: "dirección de arte" }, ", ", { path: "servicios/branding", label: "branding" }, " y ", { path: "servicios/estrategia-creativa-campanas", label: "estrategia creativa y campañas" }, ". a veces ", { path: "servicios/naming", label: "naming" }, " para instituciones o proyectos nuevos."] } },
      { id: "como-lo-abordamos", heading: "cómo lo abordamos", body: { type: "text", text: "partimos del relato y del público. la identidad y la dirección de arte tienen que ser reconocibles y coherentes en el tiempo, sin renunciar a la singularidad ni al criterio editorial." } },
      { id: "proyectos-relacionados", heading: "proyectos relacionados", body: { type: "links", segments: ["casos en ", { path: "proyectos/direccion-de-arte", label: "dirección de arte" }, " y ", { path: "proyectos", label: "proyectos" }, ". reflexiones en ", { path: "notas", label: "notas" }, "."] } },
      { id: "faq", heading: "preguntas frecuentes", body: { type: "text", text: "plazos, coordinación con equipos de contenido y presupuestos ajustados: lo hablamos con transparencia desde el inicio." } },
      { id: "contacto", heading: "contacto", body: { type: "contact", intro: "para proyectos de cultura: " } },
    ],
  },
  alimentacion: {
    h1: "alimentación: packaging y marca para elegir en segundos",
    sections: [
      { id: "retos-del-contexto", heading: "retos del contexto", body: { type: "text", text: "en alimentación el pack compite en lineal y en pantalla. la marca y el packaging tienen que transmitir origen, calidad y diferencia en muy poco tiempo y espacio." } },
      { id: "servicios-recomendados", heading: "servicios recomendados", body: { type: "links", segments: ["", { path: "servicios/packaging", label: "packaging" }, ", ", { path: "servicios/branding", label: "branding" }, " y ", { path: "servicios/naming", label: "naming" }, " para marcas y gamas. a veces ", { path: "servicios/direccion-de-arte", label: "dirección de arte" }, " para campañas y contenido."] } },
      { id: "como-lo-abordamos", heading: "cómo lo abordamos", body: { type: "text", text: "ordenamos la información del pack: qué es el producto, para quién y por qué elegirlo. la identidad tiene que funcionar en múltiples referencias y formatos sin perder legibilidad ni impacto." } },
      { id: "proyectos-relacionados", heading: "proyectos relacionados", body: { type: "links", segments: ["ejemplos en ", { path: "proyectos/packaging", label: "proyectos de packaging" }, " y ", { path: "proyectos", label: "proyectos" }, ". más contexto en ", { path: "notas", label: "notas" }, "."] } },
      { id: "faq", heading: "preguntas frecuentes", body: { type: "text", text: "regulación alimentaria, plazos de producción y ampliación de gama: lo acordamos al inicio." } },
      { id: "contacto", heading: "contacto", body: { type: "contact", intro: "para proyectos de alimentación: " } },
    ],
  },
  salud: {
    h1: "salud: claridad, confianza y comunicación que se sostiene",
    sections: [
      { id: "retos-del-contexto", heading: "retos del contexto", body: { type: "text", text: "en salud la regulación y la confianza son prioritarias. la comunicación tiene que ser precisa, accesible y coherente en el tiempo, sin caer en jerga ni mensajes vacíos." } },
      { id: "servicios-recomendados", heading: "servicios recomendados", body: { type: "links", segments: ["", { path: "servicios/consultoria-de-marca", label: "consultoría de marca" }, ", ", { path: "servicios/branding", label: "branding" }, " y ", { path: "servicios/estrategia-creativa-campanas", label: "estrategia creativa y campañas" }, " para alinear mensaje y tono antes del diseño."] } },
      { id: "como-lo-abordamos", heading: "cómo lo abordamos", body: { type: "text", text: "partimos de la regulación y del mapa de audiencias. definimos un lenguaje que equilibra rigor y cercanía, y lo aplicamos con coherencia en todos los puntos de contacto." } },
      { id: "proyectos-relacionados", heading: "proyectos relacionados", body: { type: "links", segments: ["casos de salud en ", { path: "proyectos", label: "proyectos" }, " y en ", { path: "notas", label: "notas" }, " donde hablamos de comunicación del sector."] } },
      { id: "faq", heading: "preguntas frecuentes", body: { type: "text", text: "cómo trabajamos con comités de aprobación, plazos de validación y adaptación al mercado: lo definimos desde el principio." } },
      { id: "contacto", heading: "contacto", body: { type: "contact", intro: "para proyectos de comunicación en salud: " } },
    ],
  },
  industria: {
    h1: "industria: una marca sólida es claridad, coherencia y rigor",
    sections: [
      { id: "retos-del-contexto", heading: "retos del contexto", body: { type: "text", text: "en industria B2B la marca suele ser invisible hasta que importa: licitaciones, partners, empleados. la identidad tiene que transmitir solidez y claridad sin ruido ni tendencias." } },
      { id: "servicios-recomendados", heading: "servicios recomendados", body: { type: "links", segments: ["", { path: "servicios/consultoria-de-marca", label: "consultoría de marca" }, ", ", { path: "servicios/branding", label: "branding" }, " y ", { path: "servicios/diseno-web", label: "diseño web" }, " para presencia coherente. a menudo ", { path: "servicios/estrategia-creativa-campanas", label: "estrategia creativa" }, " para comunicar valor a distintas audiencias."] } },
      { id: "como-lo-abordamos", heading: "cómo lo abordamos", body: { type: "text", text: "alineamos posicionamiento y mensaje antes de diseñar. el sistema visual tiene que durar años, múltiples divisiones y canales, sin parecer disperso ni desactualizado." } },
      { id: "proyectos-relacionados", heading: "proyectos relacionados", body: { type: "links", segments: ["casos de industria en ", { path: "proyectos/consultoria-de-marca", label: "consultoría" }, " y ", { path: "proyectos", label: "proyectos" }, ". más en ", { path: "notas", label: "notas" }, "."] } },
      { id: "faq", heading: "preguntas frecuentes", body: { type: "text", text: "implicación del equipo interno, plazos y evolución de marca a largo plazo: lo definimos desde el inicio." } },
      { id: "contacto", heading: "contacto", body: { type: "contact", intro: "para proyectos de industria: " } },
    ],
  },
  "startups-tecnologia": {
    h1: "startups y tecnología: marca y producto con sistema, sin fricción",
    sections: [
      { id: "retos-del-contexto", heading: "retos del contexto", body: { type: "text", text: "en startups y tecnología la marca crece con el producto. hace falta un sistema que escale: naming, identidad y presencia digital que no queden obsoletos en seis meses." } },
      { id: "servicios-recomendados", heading: "servicios recomendados", body: { type: "links", segments: ["", { path: "servicios/naming", label: "naming" }, ", ", { path: "servicios/branding", label: "branding" }, ", ", { path: "servicios/diseno-web", label: "diseño web" }, " y a veces ", { path: "servicios/consultoria-de-marca", label: "consultoría de marca" }, " para alinear posicionamiento antes del lanzamiento."] } },
      { id: "como-lo-abordamos", heading: "cómo lo abordamos", body: { type: "text", text: "definimos una base sólida desde el inicio: nombre, identidad y sistema visual que puedan crecer sin rediseño completo cada seis meses. la marca tiene que convivir con el producto sin competir con él." } },
      { id: "proyectos-relacionados", heading: "proyectos relacionados", body: { type: "links", segments: ["casos en ", { path: "proyectos/diseno-web", label: "diseño web" }, ", ", { path: "proyectos/naming", label: "naming" }, " y ", { path: "proyectos", label: "proyectos" }, ". más en ", { path: "notas", label: "notas" }, "."] } },
      { id: "faq", heading: "preguntas frecuentes", body: { type: "text", text: "plazos para MVP, coordinación con equipos de producto y evolución de marca: lo hablamos en la primera conversación." } },
      { id: "contacto", heading: "contacto", body: { type: "contact", intro: "para proyectos de startups o tecnología: " } },
    ],
  },
};

export function getAreaContent(
  lang: AreaLang,
  areaSlug: EnAreaSlug | EsAreaSlug
): AreaContentRecord {
  if (lang === "en" && areaSlug in CONTENT_EN) return CONTENT_EN[areaSlug as EnAreaSlug];
  if (lang === "es" && areaSlug in CONTENT_ES) return CONTENT_ES[areaSlug as EsAreaSlug];
  return { h1: String(areaSlug), sections: [] };
}
