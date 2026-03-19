import type { Metadata } from "next";
import { notFound } from "next/navigation";
import OpenCookiePreferencesButton from "@/components/cookies/OpenCookiePreferencesButton";
import LegalPageLayout from "@/components/legal/LegalPageLayout";
import { isValidLang } from "@/lib/i18n/path";
import { buildLegalMetadata } from "@/lib/legal-metadata";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang)) return {};
  return buildLegalMetadata({
    title: lang === "es" ? "Política de cookies" : "Cookie policy",
    description:
      lang === "es"
        ? "Política de cookies del sitio web de enblanco."
        : "Cookie policy for the enblanco website.",
    canonicalPath: `/${lang}/cookies`,
    esPath: "/es/cookies",
    enPath: "/en/cookies",
  });
}

export default async function CookiesPage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  const isEn = lang === "en";
  return (
    <LegalPageLayout lang={lang} title={isEn ? "Cookie policy" : "Política de cookies"}>
      {isEn ? (
        <>
          <h2>1. What cookies are</h2>
          <p>
            Cookies are small files or data storage and retrieval devices that
            are downloaded onto the user&apos;s device when accessing certain
            web pages. They allow, among other things, technical information to
            be stored, browsing habits to be recognised, preferences to be
            remembered or certain interactions with the website to be measured.
          </p>
          <h2>2. What types of cookies this website may use</h2>
          <p>
            This website may use first-party and third-party cookies for
            different purposes, depending on their technical necessity and the
            consent preferences granted by the user.
          </p>
          <h3>2.1 Technical or necessary cookies</h3>
          <p>
            These are essential for the website to function properly, allow
            navigation, manage basic options, protect forms or remember certain
            technical preferences. These cookies do not require consent when
            they are strictly necessary for the provision of the requested
            service.
          </p>
          <h3>2.2 Analytics or measurement cookies</h3>
          <p>
            These allow information to be obtained about website use, user
            browsing to be analysed, and the performance, structure and content
            of the website to be improved.
          </p>
          <p>
            This type of measurement may be carried out, among other means,
            through tools such as <strong>Google Analytics (GA4)</strong>,
            provided that the user has given prior consent where legally
            required.
          </p>
          <h3>2.3 Advertising or marketing cookies</h3>
          <p>
            These allow campaigns to be measured, adverts to be personalised,
            audiences to be created or remarketing actions to be carried out
            based on browsing.
          </p>
          <p>
            This type of technology may be used through tools such as{" "}
            <strong>Meta Pixel / Meta Ads</strong>, only when the user has
            expressly accepted this category of cookies.
          </p>
          <h2>3. First-party and third-party cookies</h2>
          <p>The cookies used on this website may be:</p>
          <ul>
            <li>
              <strong>First-party</strong>, when they are managed directly by
              the website itself.
            </li>
            <li>
              <strong>Third-party</strong>, when they are managed by external
              services integrated into the website.
            </li>
          </ul>
          <p>
            Some technical or measurement functionalities may also rely on
            tools such as <strong>Google Tag Manager</strong>, which acts as a
            tag manager or technical container and may be involved in the
            activation of certain services, without this meaning by itself that
            all tags are executed without consent.
          </p>
          <h2>4. Consent and activation of cookies</h2>
          <p>
            Non-essential cookies, in particular analytics and advertising or
            marketing cookies, will not be installed or activated until the
            user has given free, specific, informed and unambiguous consent.
          </p>
          <p>Through the website&apos;s cookie banner or settings panel, users may:</p>
          <ul>
            <li>Accept all cookies.</li>
            <li>Reject non-essential cookies.</li>
            <li>Configure their preferences by category.</li>
          </ul>
          <h2>5. How to withdraw or modify consent</h2>
          <p>
            Users may modify their preferences or withdraw their consent at any
            time through the cookie settings system enabled on the website,
            without affecting the lawfulness of processing carried out
            beforehand.
          </p>
          <h2>6. Managing cookies through the browser</h2>
          <p>
            In addition to the website settings panel, users may restrict,
            block or delete cookies through their browser settings. However,
            disabling certain technical cookies may affect the proper
            functioning of some parts of the website.
          </p>
          <h2>7. Updating the cookie policy</h2>
          <p>
            This cookie policy may be updated whenever necessary to adapt it to
            legal, technical or functional changes, as well as to the
            implementation or removal of specific measurement or marketing
            tools. The version published at any given time shall be the current
            one.
          </p>
        </>
      ) : (
        <>
          <h2>1. Qué son las cookies</h2>
          <p>
            Las cookies son pequeños archivos o dispositivos de almacenamiento y
            recuperación de datos que se descargan en el equipo de la persona
            usuaria al acceder a determinadas páginas web. Permiten, entre
            otras cosas, almacenar información técnica, reconocer hábitos de
            navegación, recordar preferencias o medir determinadas interacciones
            con el sitio.
          </p>
          <h2>2. Qué tipos de cookies puede utilizar este sitio web</h2>
          <p>
            Este sitio web puede utilizar cookies propias y de terceros con
            distintas finalidades, en función de su necesidad técnica y de las
            preferencias de consentimiento otorgadas por la persona usuaria.
          </p>
          <h3>2.1 Cookies técnicas o necesarias</h3>
          <p>
            Son aquellas imprescindibles para que el sitio web funcione
            correctamente, permita la navegación, gestione opciones básicas,
            proteja formularios o recuerde determinadas preferencias técnicas.
            Estas cookies no requieren consentimiento cuando resultan
            estrictamente necesarias para la prestación del servicio solicitado.
          </p>
          <h3>2.2 Cookies de análisis o medición</h3>
          <p>
            Son aquellas que permiten obtener información sobre el uso del sitio
            web, analizar la navegación de las personas usuarias y mejorar el
            rendimiento, la estructura y los contenidos del sitio.
          </p>
          <p>
            Este tipo de medición podrá realizarse, entre otros medios,
            mediante herramientas como <strong>Google Analytics (GA4)</strong>,
            siempre que la persona usuaria haya prestado previamente su
            consentimiento cuando este resulte legalmente exigible.
          </p>
          <h3>2.3 Cookies publicitarias o de marketing</h3>
          <p>
            Son aquellas que permiten medir campañas, personalizar anuncios,
            crear audiencias o realizar acciones de remarketing basadas en la
            navegación.
          </p>
          <p>
            Este tipo de tecnologías podrá utilizarse mediante herramientas
            como <strong>Meta Pixel / Meta Ads</strong>, únicamente cuando la
            persona usuaria haya aceptado expresamente esta categoría de
            cookies.
          </p>
          <h2>3. Cookies propias y de terceros</h2>
          <p>Las cookies utilizadas en este sitio web pueden ser:</p>
          <ul>
            <li>
              <strong>Propias</strong>, cuando se gestionan directamente por el
              propio sitio web.
            </li>
            <li>
              <strong>De terceros</strong>, cuando son gestionadas por servicios
              externos integrados en la web.
            </li>
          </ul>
          <p>
            Algunas funcionalidades técnicas o de medición pueden apoyarse
            también en herramientas como <strong>Google Tag Manager</strong>,
            que actúa como gestor de etiquetas o contenedor técnico y puede
            intervenir en la activación de determinados servicios, sin que ello
            implique por sí mismo que todas las etiquetas se ejecuten sin
            consentimiento.
          </p>
          <h2>4. Consentimiento y activación de cookies</h2>
          <p>
            Las cookies no necesarias, en particular las analíticas y las
            publicitarias o de marketing, no se instalarán ni activarán
            mientras la persona usuaria no haya prestado su consentimiento de
            forma libre, específica, informada e inequívoca.
          </p>
          <p>
            A través del banner o panel de configuración de cookies, la persona
            usuaria podrá:
          </p>
          <ul>
            <li>Aceptar todas las cookies.</li>
            <li>Rechazar las cookies no necesarias.</li>
            <li>Configurar sus preferencias por categorías.</li>
          </ul>
          <h2>5. Cómo retirar o modificar el consentimiento</h2>
          <p>
            La persona usuaria podrá modificar sus preferencias o retirar su
            consentimiento en cualquier momento a través del sistema de
            configuración de cookies habilitado en el sitio web, sin que ello
            afecte a la licitud del tratamiento realizado con anterioridad.
          </p>
          <h2>6. Gestión de cookies desde el navegador</h2>
          <p>
            Además del panel de configuración del sitio, la persona usuaria
            puede restringir, bloquear o eliminar cookies mediante la
            configuración de su navegador. No obstante, la desactivación de
            determinadas cookies técnicas puede afectar al funcionamiento
            correcto de algunas partes de la web.
          </p>
          <h2>7. Actualización de la política de cookies</h2>
          <p>
            Esta política de cookies podrá actualizarse cuando sea necesario
            para adaptarla a cambios normativos, técnicos o funcionales del
            sitio web, así como a la implantación o retirada de herramientas
            concretas de medición o marketing. La versión publicada en cada
            momento será la vigente.
          </p>
        </>
      )}
      <div className="mt-8">
        <OpenCookiePreferencesButton
          label={isEn ? "Open cookie settings" : "Configurar cookies"}
          className="rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-800"
        />
      </div>
    </LegalPageLayout>
  );
}
