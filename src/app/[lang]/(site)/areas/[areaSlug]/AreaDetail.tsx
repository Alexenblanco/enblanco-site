import Link from "next/link";
import JsonLd from "@/components/Seo/JsonLd";
import { withLang } from "@/lib/i18n/path";
import type { EnAreaSlug, EsAreaSlug } from "@/lib/areas-slugs";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";

type Lang = "en" | "es";

type Props = { lang: Lang; areaSlug: EnAreaSlug | EsAreaSlug };

export function AreaDetail({ lang, areaSlug }: Props) {
  const isEn = lang === "en";
  const homeLabel = isEn ? "home" : "inicio";
  const areasLabel = isEn ? "areas" : "áreas";

  const baseUrl = `${siteUrl}/${lang}`;
  const areasUrl = `${baseUrl}/areas`;
  const areaUrl = `${areasUrl}/${areaSlug}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: homeLabel, item: baseUrl },
      { "@type": "ListItem", position: 2, name: areasLabel, item: areasUrl },
      { "@type": "ListItem", position: 3, name: areaSlug, item: areaUrl },
    ],
  };

  const content = getAreaContent(lang, areaSlug);

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <JsonLd data={breadcrumbJsonLd} />
      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">{content.h1}</h1>
      </header>
      {content.sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          aria-labelledby={`${section.id}-heading`}
          className="mb-8"
        >
          <h2 id={`${section.id}-heading`} className="text-base font-semibold tracking-tight">
            {section.heading}
          </h2>
          <div className="mt-2 text-sm text-zinc-700">{section.body}</div>
        </section>
      ))}
    </main>
  );
}

type Section = { id: string; heading: string; body: React.ReactNode };

function getAreaContent(
  lang: Lang,
  areaSlug: EnAreaSlug | EsAreaSlug
): { h1: string; sections: Section[] } {
  const w = (path: string) => withLang(lang, path);

  if (lang === "en") {
    switch (areaSlug as EnAreaSlug) {
      case "retail":
        return {
          h1: "retail: brand, packaging, and digital built for fast decisions",
          sections: [
            {
              id: "context-challenges",
              heading: "context challenges",
              body: (
                <p>
                  in retail, decision time is minimal: the customer chooses in seconds. the brand has to be clear on shelf and consistent online so the choice is quick and confident.
                </p>
              ),
            },
            {
              id: "recommended-services",
              heading: "recommended services",
              body: (
                <p>
                  <Link href={w("services/branding")} className="underline">branding</Link>,{" "}
                  <Link href={w("services/packaging")} className="underline">packaging</Link>, and{" "}
                  <Link href={w("services/web-design")} className="underline">web design</Link> fit this context best. also{" "}
                  <Link href={w("services/art-direction")} className="underline">art direction</Link> when there are campaigns and multiple touchpoints.
                </p>
              ),
            },
            {
              id: "how-we-approach-it",
              heading: "how we approach it",
              body: (
                <p>
                  we prioritize information hierarchy and consistency between physical and digital channels. the brand system has to withstand range extensions and seasonal updates without losing clarity.
                </p>
              ),
            },
            {
              id: "related-projects",
              heading: "related projects",
              body: (
                <p>
                  you can see retail cases in <Link href={w("projects")} className="underline">projects</Link> filtered by{" "}
                  <Link href={w("projects/packaging")} className="underline">packaging</Link> or{" "}
                  <Link href={w("projects/branding")} className="underline">branding</Link>.
                </p>
              ),
            },
            {
              id: "faq",
              heading: "faq",
              body: (
                <p>
                  timelines, coordination with buying or store teams, and adaptation to different formats: we agree on this at the start of the project.
                </p>
              ),
            },
            {
              id: "contact",
              heading: "contact",
              body: (
                <p>
                  if you have a retail project in mind, reach us via <Link href={w("contact")} className="underline">contact</Link> or at{" "}
                  <a href="mailto:hola@agenciaenblanco.com" className="underline">hola@agenciaenblanco.com</a>.
                </p>
              ),
            },
          ],
        };
      case "culture":
        return {
          h1: "culture: identity and art direction with narrative and judgment",
          sections: [
            {
              id: "context-challenges",
              heading: "context challenges",
              body: (
                <p>
                  in culture the identity has to connect with a narrative and a demanding audience. art direction isn&apos;t decoration: it has to support the discourse and stand out without feeling predictable.
                </p>
              ),
            },
            {
              id: "recommended-services",
              heading: "recommended services",
              body: (
                <p>
                  <Link href={w("services/art-direction")} className="underline">art direction</Link>,{" "}
                  <Link href={w("services/branding")} className="underline">branding</Link>, and{" "}
                  <Link href={w("services/creative-strategy-campaigns")} className="underline">creative strategy & campaigns</Link>. sometimes{" "}
                  <Link href={w("services/naming")} className="underline">naming</Link> for institutions or new initiatives.
                </p>
              ),
            },
            {
              id: "how-we-approach-it",
              heading: "how we approach it",
              body: (
                <p>
                  we start from the narrative and the audience. identity and art direction have to be recognizable and consistent over time, without giving up distinctiveness or editorial judgment.
                </p>
              ),
            },
            {
              id: "related-projects",
              heading: "related projects",
              body: (
                <p>
                  cases in <Link href={w("projects/art-direction")} className="underline">art direction</Link> and{" "}
                  <Link href={w("projects")} className="underline">projects</Link>. reflections in{" "}
                  <Link href={w("notes")} className="underline">notes</Link>.
                </p>
              ),
            },
            {
              id: "faq",
              heading: "faq",
              body: (
                <p>
                  timelines, coordination with content teams, and tight budgets: we discuss this transparently from the start.
                </p>
              ),
            },
            {
              id: "contact",
              heading: "contact",
              body: (
                <p>
                  for culture projects: <Link href={w("contact")} className="underline">contact</Link> or{" "}
                  <a href="mailto:hola@agenciaenblanco.com" className="underline">hola@agenciaenblanco.com</a>.
                </p>
              ),
            },
          ],
        };
      case "food":
        return {
          h1: "food: packaging and brand built to be chosen in seconds",
          sections: [
            {
              id: "context-challenges",
              heading: "context challenges",
              body: (
                <p>
                  in food, the pack competes on shelf and on screen. brand and packaging have to convey origin, quality, and difference in very little time and space.
                </p>
              ),
            },
            {
              id: "recommended-services",
              heading: "recommended services",
              body: (
                <p>
                  <Link href={w("services/packaging")} className="underline">packaging</Link>,{" "}
                  <Link href={w("services/branding")} className="underline">branding</Link>, and{" "}
                  <Link href={w("services/naming")} className="underline">naming</Link> for brands and ranges. sometimes{" "}
                  <Link href={w("services/art-direction")} className="underline">art direction</Link> for campaigns and content.
                </p>
              ),
            },
            {
              id: "how-we-approach-it",
              heading: "how we approach it",
              body: (
                <p>
                  we hierarchy pack information: what the product is, who it&apos;s for, and why choose it. the identity has to work across multiple SKUs and formats without losing legibility or impact.
                </p>
              ),
            },
            {
              id: "related-projects",
              heading: "related projects",
              body: (
                <p>
                  examples in <Link href={w("projects/packaging")} className="underline">packaging projects</Link> and{" "}
                  <Link href={w("projects")} className="underline">projects</Link>. more context in{" "}
                  <Link href={w("notes")} className="underline">notes</Link>.
                </p>
              ),
            },
            {
              id: "faq",
              heading: "faq",
              body: <p>food regulation, production timelines, and range extension: we agree on this at the start.</p>,
            },
            {
              id: "contact",
              heading: "contact",
              body: (
                <p>
                  for food projects: <Link href={w("contact")} className="underline">contact</Link> or{" "}
                  <a href="mailto:hola@agenciaenblanco.com" className="underline">hola@agenciaenblanco.com</a>.
                </p>
              ),
            },
          ],
        };
      case "health":
        return {
          h1: "health: clarity, trust, and communication that holds up",
          sections: [
            {
              id: "context-challenges",
              heading: "context challenges",
              body: (
                <p>
                  in health, regulation and trust are paramount. communication has to be precise, accessible, and consistent over time—without slipping into jargon or empty messaging.
                </p>
              ),
            },
            {
              id: "recommended-services",
              heading: "recommended services",
              body: (
                <p>
                  <Link href={w("services/brand-consulting")} className="underline">brand consulting</Link>,{" "}
                  <Link href={w("services/branding")} className="underline">branding</Link>, and{" "}
                  <Link href={w("services/creative-strategy-campaigns")} className="underline">creative strategy & campaigns</Link> to align message and tone before design.
                </p>
              ),
            },
            {
              id: "how-we-approach-it",
              heading: "how we approach it",
              body: (
                <p>
                  we start from regulation and audience mapping. we define a language that balances rigor and approachability, and apply it consistently across all touchpoints.
                </p>
              ),
            },
            {
              id: "related-projects",
              heading: "related projects",
              body: (
                <p>
                  health cases in <Link href={w("projects")} className="underline">projects</Link> and in{" "}
                  <Link href={w("notes")} className="underline">notes</Link> where we discuss sector communication.
                </p>
              ),
            },
            {
              id: "faq",
              heading: "faq",
              body: (
                <p>
                  how we work with approval committees, validation timelines, and market adaptation: we define this from the outset.
                </p>
              ),
            },
            {
              id: "contact",
              heading: "contact",
              body: (
                <p>
                  for health communication projects: <Link href={w("contact")} className="underline">contact</Link> or{" "}
                  <a href="mailto:hola@agenciaenblanco.com" className="underline">hola@agenciaenblanco.com</a>.
                </p>
              ),
            },
          ],
        };
      case "industry":
        return {
          h1: "industry: a solid brand is clarity, consistency, and rigor",
          sections: [
            {
              id: "context-challenges",
              heading: "context challenges",
              body: (
                <p>
                  in B2B industry the brand is often invisible until it matters: tenders, partners, employees. the identity has to convey solidity and clarity without noise or trends.
                </p>
              ),
            },
            {
              id: "recommended-services",
              heading: "recommended services",
              body: (
                <p>
                  <Link href={w("services/brand-consulting")} className="underline">brand consulting</Link>,{" "}
                  <Link href={w("services/branding")} className="underline">branding</Link>, and{" "}
                  <Link href={w("services/web-design")} className="underline">web design</Link> for consistent presence. often{" "}
                  <Link href={w("services/creative-strategy-campaigns")} className="underline">creative strategy</Link> to communicate value to different audiences.
                </p>
              ),
            },
            {
              id: "how-we-approach-it",
              heading: "how we approach it",
              body: (
                <p>
                  we align positioning and message before designing. the visual system has to last years, multiple divisions and channels, without feeling scattered or dated.
                </p>
              ),
            },
            {
              id: "related-projects",
              heading: "related projects",
              body: (
                <p>
                  industry cases in <Link href={w("projects/brand-consulting")} className="underline">consulting</Link> and{" "}
                  <Link href={w("projects")} className="underline">projects</Link>. more in{" "}
                  <Link href={w("notes")} className="underline">notes</Link>.
                </p>
              ),
            },
            {
              id: "faq",
              heading: "faq",
              body: (
                <p>
                  internal team involvement, timelines, and long-term brand evolution: we define this from the start.
                </p>
              ),
            },
            {
              id: "contact",
              heading: "contact",
              body: (
                <p>
                  for industry projects: <Link href={w("contact")} className="underline">contact</Link> or{" "}
                  <a href="mailto:hola@agenciaenblanco.com" className="underline">hola@agenciaenblanco.com</a>.
                </p>
              ),
            },
          ],
        };
      case "startups-technology":
        return {
          h1: "startups & technology: brand and product with system, without friction",
          sections: [
            {
              id: "context-challenges",
              heading: "context challenges",
              body: (
                <p>
                  in startups and tech the brand grows with the product. you need a system that scales: naming, identity, and digital presence that don&apos;t feel outdated in six months.
                </p>
              ),
            },
            {
              id: "recommended-services",
              heading: "recommended services",
              body: (
                <p>
                  <Link href={w("services/naming")} className="underline">naming</Link>,{" "}
                  <Link href={w("services/branding")} className="underline">branding</Link>,{" "}
                  <Link href={w("services/web-design")} className="underline">web design</Link>, and sometimes{" "}
                  <Link href={w("services/brand-consulting")} className="underline">brand consulting</Link> to align positioning before launch.
                </p>
              ),
            },
            {
              id: "how-we-approach-it",
              heading: "how we approach it",
              body: (
                <p>
                  we define a solid base from the start: name, identity, and visual system that can grow without a full redesign every six months. the brand has to coexist with the product without competing with it.
                </p>
              ),
            },
            {
              id: "related-projects",
              heading: "related projects",
              body: (
                <p>
                  cases in <Link href={w("projects/web-design")} className="underline">web design</Link>,{" "}
                  <Link href={w("projects/naming")} className="underline">naming</Link>, and{" "}
                  <Link href={w("projects")} className="underline">projects</Link>. more in{" "}
                  <Link href={w("notes")} className="underline">notes</Link>.
                </p>
              ),
            },
            {
              id: "faq",
              heading: "faq",
              body: (
                <p>
                  timelines for MVP, coordination with product teams, and brand evolution: we discuss this in the first conversation.
                </p>
              ),
            },
            {
              id: "contact",
              heading: "contact",
              body: (
                <p>
                  for startups or technology projects: <Link href={w("contact")} className="underline">contact</Link> or{" "}
                  <a href="mailto:hola@agenciaenblanco.com" className="underline">hola@agenciaenblanco.com</a>.
                </p>
              ),
            },
          ],
        };
      default:
        return { h1: String(areaSlug), sections: [] };
    }
  }

  // ES
  switch (areaSlug as EsAreaSlug) {
    case "retail":
      return {
        h1: "retail: marca, packaging y digital pensados para decidir rápido",
        sections: [
          {
            id: "retos-del-contexto",
            heading: "retos del contexto",
            body: (
              <p>
                en retail el tiempo de decisión es mínimo: el cliente elige en segundos. la marca tiene que ser clara en lineal y coherente en digital para que la elección sea rápida y segura.
              </p>
            ),
          },
          {
            id: "servicios-recomendados",
            heading: "servicios recomendados",
            body: (
              <p>
                <Link href={w("servicios/branding")} className="underline">branding</Link>,{" "}
                <Link href={w("servicios/packaging")} className="underline">packaging</Link> y{" "}
                <Link href={w("servicios/diseno-web")} className="underline">diseño web</Link> son los que más encajan con este contexto. también{" "}
                <Link href={w("servicios/direccion-de-arte")} className="underline">dirección de arte</Link> cuando hay campañas y puntos de contacto múltiples.
              </p>
            ),
          },
          {
            id: "como-lo-abordamos",
            heading: "cómo lo abordamos",
            body: (
              <p>
                priorizamos jerarquía de información y coherencia entre canal físico y digital. el sistema de marca tiene que resistir ampliaciones de gama y cambios de temporada sin perder claridad.
              </p>
            ),
          },
          {
            id: "proyectos-relacionados",
            heading: "proyectos relacionados",
            body: (
              <p>
                puedes ver casos de retail en <Link href={w("proyectos")} className="underline">proyectos</Link> filtrados por{" "}
                <Link href={w("proyectos/packaging")} className="underline">packaging</Link> o{" "}
                <Link href={w("proyectos/branding")} className="underline">branding</Link>.
              </p>
            ),
          },
          {
            id: "faq",
            heading: "preguntas frecuentes",
            body: (
              <p>
                plazos, coordinación con equipos de compras o tienda y adaptación a distintos formatos: lo acordamos al inicio del proyecto.
              </p>
            ),
          },
          {
            id: "contacto",
            heading: "contacto",
            body: (
              <p>
                si tienes un proyecto de retail en mente, escríbenos desde <Link href={w("contacto")} className="underline">contacto</Link> o a{" "}
                <a href="mailto:hola@agenciaenblanco.com" className="underline">hola@agenciaenblanco.com</a>.
              </p>
            ),
          },
        ],
      };
    case "cultura":
      return {
        h1: "cultura: identidad y dirección de arte con narrativa y criterio",
        sections: [
          {
            id: "retos-del-contexto",
            heading: "retos del contexto",
            body: (
              <p>
                en cultura la identidad tiene que conectar con un relato y un público exigente. la dirección de arte no es decoración: tiene que sostener el discurso y distinguir sin caer en lo previsible.
              </p>
            ),
          },
          {
            id: "servicios-recomendados",
            heading: "servicios recomendados",
            body: (
              <p>
                <Link href={w("servicios/direccion-de-arte")} className="underline">dirección de arte</Link>,{" "}
                <Link href={w("servicios/branding")} className="underline">branding</Link> y{" "}
                <Link href={w("servicios/estrategia-creativa-campanas")} className="underline">estrategia creativa y campañas</Link>. a veces{" "}
                <Link href={w("servicios/naming")} className="underline">naming</Link> para instituciones o proyectos nuevos.
              </p>
            ),
          },
          {
            id: "como-lo-abordamos",
            heading: "cómo lo abordamos",
            body: (
              <p>
                partimos del relato y del público. la identidad y la dirección de arte tienen que ser reconocibles y coherentes en el tiempo, sin renunciar a la singularidad ni al criterio editorial.
              </p>
            ),
          },
          {
            id: "proyectos-relacionados",
            heading: "proyectos relacionados",
            body: (
              <p>
                casos en <Link href={w("proyectos/direccion-de-arte")} className="underline">dirección de arte</Link> y{" "}
                <Link href={w("proyectos")} className="underline">proyectos</Link>. reflexiones en{" "}
                <Link href={w("notas")} className="underline">notas</Link>.
              </p>
            ),
          },
          {
            id: "faq",
            heading: "preguntas frecuentes",
            body: (
              <p>
                plazos, coordinación con equipos de contenido y presupuestos ajustados: lo hablamos con transparencia desde el inicio.
              </p>
            ),
          },
          {
            id: "contacto",
            heading: "contacto",
            body: (
              <p>
                para proyectos de cultura: <Link href={w("contacto")} className="underline">contacto</Link> o{" "}
                <a href="mailto:hola@agenciaenblanco.com" className="underline">hola@agenciaenblanco.com</a>.
              </p>
            ),
          },
        ],
      };
    case "alimentacion":
      return {
        h1: "alimentación: packaging y marca para elegir en segundos",
        sections: [
          {
            id: "retos-del-contexto",
            heading: "retos del contexto",
            body: (
              <p>
                en alimentación el pack compite en lineal y en pantalla. la marca y el packaging tienen que transmitir origen, calidad y diferencia en muy poco tiempo y espacio.
              </p>
            ),
          },
          {
            id: "servicios-recomendados",
            heading: "servicios recomendados",
            body: (
              <p>
                <Link href={w("servicios/packaging")} className="underline">packaging</Link>,{" "}
                <Link href={w("servicios/branding")} className="underline">branding</Link> y{" "}
                <Link href={w("servicios/naming")} className="underline">naming</Link> para marcas y gamas. a veces{" "}
                <Link href={w("servicios/direccion-de-arte")} className="underline">dirección de arte</Link> para campañas y contenido.
              </p>
            ),
          },
          {
            id: "como-lo-abordamos",
            heading: "cómo lo abordamos",
            body: (
              <p>
                ordenamos la información del pack: qué es el producto, para quién y por qué elegirlo. la identidad tiene que funcionar en múltiples referencias y formatos sin perder legibilidad ni impacto.
              </p>
            ),
          },
          {
            id: "proyectos-relacionados",
            heading: "proyectos relacionados",
            body: (
              <p>
                ejemplos en <Link href={w("proyectos/packaging")} className="underline">proyectos de packaging</Link> y{" "}
                <Link href={w("proyectos")} className="underline">proyectos</Link>. más contexto en{" "}
                <Link href={w("notas")} className="underline">notas</Link>.
              </p>
            ),
          },
          {
            id: "faq",
            heading: "preguntas frecuentes",
            body: <p>regulación alimentaria, plazos de producción y ampliación de gama: lo acordamos al inicio.</p>,
          },
          {
            id: "contacto",
            heading: "contacto",
            body: (
              <p>
                para proyectos de alimentación: <Link href={w("contacto")} className="underline">contacto</Link> o{" "}
                <a href="mailto:hola@agenciaenblanco.com" className="underline">hola@agenciaenblanco.com</a>.
              </p>
            ),
          },
        ],
      };
    case "salud":
      return {
        h1: "salud: claridad, confianza y comunicación que se sostiene",
        sections: [
          {
            id: "retos-del-contexto",
            heading: "retos del contexto",
            body: (
              <p>
                en salud la regulación y la confianza son prioritarias. la comunicación tiene que ser precisa, accesible y coherente en el tiempo, sin caer en jerga ni mensajes vacíos.
              </p>
            ),
          },
          {
            id: "servicios-recomendados",
            heading: "servicios recomendados",
            body: (
              <p>
                <Link href={w("servicios/consultoria-de-marca")} className="underline">consultoría de marca</Link>,{" "}
                <Link href={w("servicios/branding")} className="underline">branding</Link> y{" "}
                <Link href={w("servicios/estrategia-creativa-campanas")} className="underline">estrategia creativa y campañas</Link> para alinear mensaje y tono antes del diseño.
              </p>
            ),
          },
          {
            id: "como-lo-abordamos",
            heading: "cómo lo abordamos",
            body: (
              <p>
                partimos de la regulación y del mapa de audiencias. definimos un lenguaje que equilibra rigor y cercanía, y lo aplicamos con coherencia en todos los puntos de contacto.
              </p>
            ),
          },
          {
            id: "proyectos-relacionados",
            heading: "proyectos relacionados",
            body: (
              <p>
                casos de salud en <Link href={w("proyectos")} className="underline">proyectos</Link> y en{" "}
                <Link href={w("notas")} className="underline">notas</Link> donde hablamos de comunicación del sector.
              </p>
            ),
          },
          {
            id: "faq",
            heading: "preguntas frecuentes",
            body: (
              <p>
                cómo trabajamos con comités de aprobación, plazos de validación y adaptación al mercado: lo definimos desde el principio.
              </p>
            ),
          },
          {
            id: "contacto",
            heading: "contacto",
            body: (
              <p>
                para proyectos de comunicación en salud: <Link href={w("contacto")} className="underline">contacto</Link> o{" "}
                <a href="mailto:hola@agenciaenblanco.com" className="underline">hola@agenciaenblanco.com</a>.
              </p>
            ),
          },
        ],
      };
    case "industria":
      return {
        h1: "industria: una marca sólida es claridad, coherencia y rigor",
        sections: [
          {
            id: "retos-del-contexto",
            heading: "retos del contexto",
            body: (
              <p>
                en industria B2B la marca suele ser invisible hasta que importa: licitaciones, partners, empleados. la identidad tiene que transmitir solidez y claridad sin ruido ni tendencias.
              </p>
            ),
          },
          {
            id: "servicios-recomendados",
            heading: "servicios recomendados",
            body: (
              <p>
                <Link href={w("servicios/consultoria-de-marca")} className="underline">consultoría de marca</Link>,{" "}
                <Link href={w("servicios/branding")} className="underline">branding</Link> y{" "}
                <Link href={w("servicios/diseno-web")} className="underline">diseño web</Link> para presencia coherente. a menudo{" "}
                <Link href={w("servicios/estrategia-creativa-campanas")} className="underline">estrategia creativa</Link> para comunicar valor a distintas audiencias.
              </p>
            ),
          },
          {
            id: "como-lo-abordamos",
            heading: "cómo lo abordamos",
            body: (
              <p>
                alineamos posicionamiento y mensaje antes de diseñar. el sistema visual tiene que durar años, múltiples divisiones y canales, sin parecer disperso ni desactualizado.
              </p>
            ),
          },
          {
            id: "proyectos-relacionados",
            heading: "proyectos relacionados",
            body: (
              <p>
                casos de industria en <Link href={w("proyectos/consultoria-de-marca")} className="underline">consultoría</Link> y{" "}
                <Link href={w("proyectos")} className="underline">proyectos</Link>. más en{" "}
                <Link href={w("notas")} className="underline">notas</Link>.
              </p>
            ),
          },
          {
            id: "faq",
            heading: "preguntas frecuentes",
            body: (
              <p>
                implicación del equipo interno, plazos y evolución de marca a largo plazo: lo definimos desde el inicio.
              </p>
            ),
          },
          {
            id: "contacto",
            heading: "contacto",
            body: (
              <p>
                para proyectos de industria: <Link href={w("contacto")} className="underline">contacto</Link> o{" "}
                <a href="mailto:hola@agenciaenblanco.com" className="underline">hola@agenciaenblanco.com</a>.
              </p>
            ),
          },
        ],
      };
    case "startups-tecnologia":
      return {
        h1: "startups y tecnología: marca y producto con sistema, sin fricción",
        sections: [
          {
            id: "retos-del-contexto",
            heading: "retos del contexto",
            body: (
              <p>
                en startups y tecnología la marca crece con el producto. hace falta un sistema que escale: naming, identidad y presencia digital que no queden obsoletos en seis meses.
              </p>
            ),
          },
          {
            id: "servicios-recomendados",
            heading: "servicios recomendados",
            body: (
              <p>
                <Link href={w("servicios/naming")} className="underline">naming</Link>,{" "}
                <Link href={w("servicios/branding")} className="underline">branding</Link>,{" "}
                <Link href={w("servicios/diseno-web")} className="underline">diseño web</Link> y a veces{" "}
                <Link href={w("servicios/consultoria-de-marca")} className="underline">consultoría de marca</Link> para alinear posicionamiento antes del lanzamiento.
              </p>
            ),
          },
          {
            id: "como-lo-abordamos",
            heading: "cómo lo abordamos",
            body: (
              <p>
                definimos una base sólida desde el inicio: nombre, identidad y sistema visual que puedan crecer sin rediseño completo cada seis meses. la marca tiene que convivir con el producto sin competir con él.
              </p>
            ),
          },
          {
            id: "proyectos-relacionados",
            heading: "proyectos relacionados",
            body: (
              <p>
                casos en <Link href={w("proyectos/diseno-web")} className="underline">diseño web</Link>,{" "}
                <Link href={w("proyectos/naming")} className="underline">naming</Link> y{" "}
                <Link href={w("proyectos")} className="underline">proyectos</Link>. más en{" "}
                <Link href={w("notas")} className="underline">notas</Link>.
              </p>
            ),
          },
          {
            id: "faq",
            heading: "preguntas frecuentes",
            body: (
              <p>
                plazos para MVP, coordinación con equipos de producto y evolución de marca: lo hablamos en la primera conversación.
              </p>
            ),
          },
          {
            id: "contacto",
            heading: "contacto",
            body: (
              <p>
                para proyectos de startups o tecnología: <Link href={w("contacto")} className="underline">contacto</Link> o{" "}
                <a href="mailto:hola@agenciaenblanco.com" className="underline">hola@agenciaenblanco.com</a>.
              </p>
            ),
          },
        ],
      };
    default:
      return { h1: String(areaSlug), sections: [] };
  }
}
