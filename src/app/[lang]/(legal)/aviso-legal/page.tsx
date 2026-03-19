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
    title: "Aviso legal",
    description: "Aviso legal del sitio web de enblanco y condiciones generales de uso.",
    canonicalPath: "/es/aviso-legal",
    esPath: "/es/aviso-legal",
    enPath: "/en/legal-notice",
  });
}

export default async function AvisoLegalPage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();
  if (lang === "en") redirect(withLang("en", "legal-notice"));

  return (
    <LegalPageLayout lang="es" title="Aviso legal">
      <h2>1. Titular del sitio web</h2>
      <p>
        En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la
        Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se
        informa de los siguientes datos identificativos del titular de este
        sitio web:
      </p>
      <ul>
        <li>
          <strong>Titular:</strong> {LEGAL_ENTITY_NAME}.
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
      <p>
        Este sitio web tiene por objeto la presentación de los servicios
        profesionales de enblanco en el ámbito del branding, el diseño y la
        publicidad, así como facilitar el contacto con personas, marcas y
        organizaciones interesadas en sus servicios.
      </p>

      <h2>2. Condiciones de uso</h2>
      <p>
        El acceso y uso de este sitio web atribuye la condición de usuario e
        implica la aceptación de las condiciones aquí recogidas.
      </p>
      <p>
        La persona usuaria se compromete a utilizar este sitio web, sus
        contenidos y sus servicios de conformidad con la ley, la buena fe, el
        orden público y las presentes condiciones. Queda prohibido el uso del
        sitio web con fines ilícitos, lesivos o que puedan perjudicar, dañar o
        impedir el normal funcionamiento del sitio.
      </p>

      <h2>3. Propiedad intelectual e industrial</h2>
      <p>
        Todos los contenidos del sitio web, incluyendo, entre otros, textos,
        imágenes, diseños, elementos gráficos, logotipos, vídeos, estructura,
        código fuente y demás elementos creativos o técnicos, son titularidad
        de enblanco o se utilizan con autorización suficiente, y están
        protegidos por la normativa vigente en materia de propiedad intelectual
        e industrial.
      </p>
      <p>
        Queda prohibida su reproducción, distribución, transformación,
        comunicación pública, puesta a disposición o cualquier otra forma de
        explotación, total o parcial, sin autorización previa y expresa del
        titular, salvo en los supuestos legalmente permitidos.
      </p>

      <h2>4. Responsabilidad</h2>
      <p>
        enblanco no garantiza la disponibilidad permanente del sitio web ni la
        inexistencia de errores en el acceso o en sus contenidos, aunque
        adoptará medidas razonables para evitarlos o corregirlos cuando
        proceda.
      </p>
      <p>
        enblanco no se responsabiliza de los daños o perjuicios que pudieran
        derivarse del uso del sitio web, de interrupciones del servicio, de la
        presencia de virus u otros elementos lesivos, ni del uso que las
        personas usuarias hagan de la información contenida en el mismo.
      </p>

      <h2>5. Enlaces a terceros</h2>
      <p>
        Este sitio web puede incluir enlaces a páginas o recursos de terceros
        con la finalidad de ampliar información o facilitar el acceso a otros
        contenidos. enblanco no controla ni asume responsabilidad alguna sobre
        dichos sitios externos, sus políticas, sus contenidos o su
        disponibilidad.
      </p>

      <h2>6. Modificaciones</h2>
      <p>
        enblanco se reserva el derecho a modificar, actualizar o eliminar, en
        cualquier momento y sin previo aviso, los contenidos de este sitio web,
        así como el presente aviso legal, para adaptarlo a cambios normativos,
        técnicos o de funcionamiento.
      </p>

      <h2>7. Legislación aplicable y jurisdicción</h2>
      <p>
        La relación entre la persona usuaria y el titular del sitio web se
        regirá por la legislación española vigente. En caso de conflicto o
        controversia que deba resolverse judicialmente, ambas partes se
        someterán a los juzgados y tribunales que resulten competentes conforme
        a la normativa aplicable.
      </p>
    </LegalPageLayout>
  );
}
