import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import LegalPageLayout from "@/components/legal/LegalPageLayout";
import { withLang, isValidLang } from "@/lib/i18n/path";
import {
  CONTACT_EMAIL,
  LEGAL_ENTITY_ADDRESS,
  LEGAL_ENTITY_NAME,
  LEGAL_ENTITY_NIF,
} from "@/lib/site-config";
import { buildLegalMetadata } from "@/lib/legal-metadata";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang) || lang === "en") return {};
  return buildLegalMetadata({
    title: "Política de privacidad",
    description: "Política de privacidad del sitio web de enblanco.",
    canonicalPath: "/es/privacidad",
    esPath: "/es/privacidad",
    enPath: "/en/privacy",
  });
}

export default async function PrivacidadPage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();
  if (lang === "en") redirect(withLang("en", "privacy"));

  return (
    <LegalPageLayout lang="es" title="Política de privacidad">
      <h2>1. Responsable del tratamiento</h2>
      <p>
        De conformidad con el Reglamento (UE) 2016/679, de 27 de abril,
        General de Protección de Datos (RGPD), y la Ley Orgánica 3/2018, de
        Protección de Datos Personales y garantía de los derechos digitales
        (LOPDGDD), se informa de que el responsable del tratamiento de los
        datos recabados a través de este sitio web es:
      </p>
      <ul>
        <li>
          <strong>Responsable:</strong> {LEGAL_ENTITY_NAME}.
        </li>
        <li>
          <strong>NIF:</strong> {LEGAL_ENTITY_NIF}.
        </li>
        <li>
          <strong>Domicilio:</strong> {LEGAL_ENTITY_ADDRESS}.
        </li>
        <li>
          <strong>Correo electrónico:</strong>{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </li>
      </ul>

      <h2>2. Qué datos personales se recogen</h2>
      <p>
        A través de este sitio web pueden recabarse datos personales cuando la
        persona usuaria contacta con enblanco o interactúa con determinados
        servicios del sitio.
      </p>
      <p>Los datos que pueden tratarse son, en función del caso:</p>
      <ul>
        <li>Nombre.</li>
        <li>Dirección de correo electrónico.</li>
        <li>Número de teléfono, cuando se facilite de forma opcional.</li>
        <li>Mensaje o contenido de la consulta.</li>
        <li>
          Interés o servicio seleccionado en el formulario, cuando exista este
          campo.
        </li>
        <li>
          Datos técnicos mínimos asociados al uso del sitio, la seguridad o la
          gestión de incidencias.
        </li>
      </ul>

      <h2>3. Finalidad del tratamiento</h2>
      <p>Los datos personales serán tratados con las siguientes finalidades:</p>
      <ul>
        <li>
          Atender solicitudes de contacto, consultas, comentarios o propuestas
          profesionales remitidas a través del formulario o por correo
          electrónico.
        </li>
        <li>
          Gestionar solicitudes de información o de presupuesto relacionadas con
          los servicios de enblanco.
        </li>
        <li>
          Mantener las comunicaciones necesarias derivadas de una solicitud
          previa.
        </li>
        <li>
          Gestionar técnicamente el correcto funcionamiento del sitio web,
          prevenir incidencias, detectar errores y reforzar la seguridad.
        </li>
        <li>
          Analizar, en su caso y previo consentimiento cuando sea necesario, el
          uso del sitio web y la eficacia de acciones de medición o marketing.
        </li>
      </ul>
      <p>
        enblanco no utilizará los datos personales para remitir comunicaciones
        comerciales no solicitadas ni newsletters, ya que actualmente este
        sitio web no dispone de servicio de suscripción.
      </p>

      <h2>4. Base jurídica del tratamiento</h2>
      <p>
        La base jurídica para el tratamiento de los datos dependerá del tipo de
        interacción realizada:
      </p>
      <ul>
        <li>
          <strong>Consentimiento de la persona interesada</strong>, cuando esta
          remite voluntariamente una consulta, utiliza el formulario de
          contacto o acepta determinadas categorías de cookies.
        </li>
        <li>
          <strong>
            Aplicación de medidas precontractuales a petición de la persona
            interesada
          </strong>
          , cuando la consulta tenga por objeto solicitar información sobre
          servicios, valorar una posible contratación o pedir un presupuesto.
        </li>
        <li>
          <strong>Interés legítimo del responsable</strong>, cuando resulte
          necesario para garantizar la seguridad del sitio, gestionar
          incidencias técnicas o defender posibles reclamaciones derivadas del
          uso del sitio o de la relación mantenida.
        </li>
      </ul>

      <h2>5. Conservación de los datos</h2>
      <p>
        Los datos personales se conservarán durante el tiempo necesario para
        atender la solicitud, mantener la comunicación derivada de la misma y,
        en su caso, gestionar una posible relación precontractual o
        profesional.
      </p>
      <p>
        Una vez finalizada esa finalidad, los datos podrán conservarse
        debidamente bloqueados durante los plazos exigidos por la normativa
        aplicable o mientras puedan derivarse responsabilidades legales.
      </p>
      <p>
        En el caso de registros técnicos, logs o datos vinculados a incidencias
        de seguridad o entrega, estos podrán conservarse durante el tiempo
        estrictamente necesario para la verificación, diagnóstico, prevención
        de fraude, seguridad y cumplimiento de obligaciones legales.
      </p>

      <h2>6. Destinatarios, proveedores y encargados de tratamiento</h2>
      <p>
        Con carácter general, enblanco no cederá los datos personales a
        terceros, salvo obligación legal.
      </p>
      <p>
        No obstante, para la correcta prestación de servicios del sitio web y
        la gestión de las comunicaciones, enblanco puede contar con proveedores
        que actúan como encargados del tratamiento o prestadores de servicios
        vinculados a la actividad del sitio, entre ellos:
      </p>
      <ul>
        <li>
          <strong>Vercel</strong>, como proveedor de alojamiento o
          infraestructura del sitio web.
        </li>
        <li>
          <strong>Resend</strong>, como servicio de envío técnico de formularios
          o comunicaciones desde la web.
        </li>
        <li>
          <strong>Google Workspace</strong>, como entorno de recepción y
          gestión del correo electrónico.
        </li>
        <li>
          <strong>Google Analytics (GA4)</strong>, como herramienta de
          analítica web, en caso de activarse y siempre conforme al
          consentimiento exigible.
        </li>
        <li>
          <strong>Google Tag Manager</strong>, como sistema de gestión de
          etiquetas técnicas del sitio.
        </li>
        <li>
          <strong>Meta Pixel / Meta Ads</strong>, como herramientas de
          medición, seguimiento publicitario o remarketing, en caso de
          activarse y siempre conforme al consentimiento exigible.
        </li>
      </ul>
      <p>
        Estos proveedores tratarán los datos únicamente siguiendo instrucciones
        del responsable y con las garantías contractuales y organizativas
        adecuadas, cuando así resulte exigible.
      </p>

      <h2>7. Transferencias internacionales de datos</h2>
      <p>
        Algunos de los proveedores utilizados por este sitio web pueden estar
        ubicados fuera del Espacio Económico Europeo o implicar transferencias
        internacionales de datos, especialmente en relación con servicios
        tecnológicos prestados por plataformas globales como Google, Meta,
        Vercel o Resend.
      </p>
      <p>
        En estos casos, enblanco adoptará las medidas y garantías adecuadas
        exigidas por la normativa de protección de datos para asegurar un nivel
        de protección equivalente al previsto por la legislación europea.
      </p>

      <h2>8. Derechos de las personas usuarias</h2>
      <p>
        La persona interesada puede ejercer, en cualquier momento y en los
        términos previstos por la normativa vigente, sus derechos de:
      </p>
      <ul>
        <li>Acceso.</li>
        <li>Rectificación.</li>
        <li>Supresión.</li>
        <li>Oposición.</li>
        <li>Limitación del tratamiento.</li>
        <li>Portabilidad.</li>
        <li>
          Retirada del consentimiento, cuando el tratamiento se base en este,
          sin que ello afecte a la licitud del tratamiento previo.
        </li>
      </ul>
      <p>
        Para ello podrá dirigirse a enblanco mediante comunicación escrita al
        correo electrónico <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>,
        indicando el derecho que desea ejercer y acreditando su identidad cuando
        resulte necesario.
      </p>

      <h2>9. Reclamación ante la autoridad de control</h2>
      <p>
        Si la persona interesada considera que el tratamiento de sus datos no
        se ajusta a la normativa vigente, podrá presentar una reclamación ante
        la Agencia Española de Protección de Datos (AEPD).
      </p>

      <h2>10. Redes sociales</h2>
      <p>
        enblanco puede mantener presencia en redes sociales o plataformas
        profesionales. La interacción de las personas usuarias con los perfiles
        de enblanco en dichas plataformas se regirá, además de por esta
        política cuando proceda, por las condiciones de uso, políticas de
        privacidad y normativa propia de cada red social.
      </p>
      <p>
        enblanco no controla de forma plena el tratamiento realizado por dichas
        plataformas sobre los datos de las personas usuarias fuera de las
        acciones directamente gestionadas desde sus perfiles corporativos.
      </p>

      <h2>11. Seguridad</h2>
      <p>
        enblanco aplica medidas técnicas y organizativas razonables para
        proteger los datos personales y reducir el riesgo de pérdida,
        alteración, acceso no autorizado o tratamiento indebido, teniendo en
        cuenta la naturaleza de los datos tratados y los riesgos asociados al
        entorno digital.
      </p>

      <h2>12. Actualización de esta política</h2>
      <p>
        La presente política de privacidad podrá ser modificada cuando resulte
        necesario para adaptarla a cambios normativos, técnicos o funcionales
        del sitio web. La versión publicada en cada momento será la vigente.
      </p>
    </LegalPageLayout>
  );
}
