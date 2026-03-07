import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { CONTACT_EMAIL } from "@/lib/site-config";
import { withLang, isValidLang } from "@/lib/i18n/path";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLang(lang) || lang === "es") return {};
  return {
    title: "Legal notice — enblanco",
    description: "Legal notice and terms of use for the enblanco website.",
    alternates: {
      canonical: "/en/legal-notice",
      languages: { es: "/es/aviso-legal", en: "/en/legal-notice", "x-default": "/es/aviso-legal" },
    },
  };
}

export default async function LegalNoticePage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();
  if (lang === "es") redirect(withLang("es", "aviso-legal"));

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Legal notice</h1>
      <div className="prose prose-zinc prose-sm mt-6 max-w-none text-zinc-700">
        <p>
          De acuerdo con lo establecido en el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016, relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos personales y a la libre circulación de estos datos (RGPD) y LO 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD), les informamos sobre el tratamiento de los datos personales que nos facilitan a través de esta Web.
        </p>

        <h2 className="mt-8 text-lg font-semibold text-zinc-900">¿Quién es el responsable del tratamiento de sus datos personales?</h2>
        <p>
          Razón Social: ENBLANCO OEAR<br />
          CIF: E42886374<br />
          Dirección Postal: Avenida Juan Carlos I 53 4ª, 30800 Lorca, Murcia<br />
          Email de contacto: <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>
        </p>

        <h2 className="mt-8 text-lg font-semibold text-zinc-900">¿Con qué finalidad trataremos sus datos personales?</h2>
        <p><strong>Como Usuario de la Web</strong> (formulario de contacto / mails remitidos a las direcciones de correo que aparecen en la página): Tus datos serán utilizados para dar respuestas a tus solicitudes de información, comentarios o sugerencias, a través del apartado de contacto o de las direcciones de correo que aparezcan en nuestra página y mantener la comunicación con el interesado.</p>
        <p><strong>Como seguidor en RRSS:</strong> Los datos que hayas facilitado a la red social serán usados para mantener un seguimiento mutuo de nuestras cuentas y poder contactar contigo siempre a través de la red social elegida. Gestionaremos las comunicaciones mediante las mismas de acuerdo con los términos y condiciones de cada red social. La información siempre la recibirá a través de la red social en cuestión y mientras sea seguidor del responsable en la misma. Cada una de esas redes sociales cuenta con unos términos y condiciones propios y son entidades ajenas a nosotros.</p>
        <p><strong>Como cliente o proveedor:</strong> Sus datos personales serán conservados mientras dure la relación establecida con la persona jurídica en la que presta sus servicios y una vez finalizada ésta, se conservarán en base a los plazos legales de conservación y en base a la prescripción de las responsabilidades nacidas del tratamiento de sus datos.</p>

        <h2 className="mt-8 text-lg font-semibold text-zinc-900">¿Cuál es la legitimación para el tratamiento de sus datos personales?</h2>
        <p><strong>Como Usuario de la Web:</strong> Consentimiento/solicitud de medidas precontractuales (solicitud de presupuesto o de información concreta sobre un producto o servicio) conforme a los Art. 6.1.a) y Art. 6.1.b) del RGPD respectivamente.</p>
        <p><strong>Como seguidor en RRSS:</strong> Consentimiento del interesado Art. 6.1.a) del RGPD.</p>
        <p><strong>Como cliente o proveedor:</strong> Los datos identificativos y de contacto necesarios para el desarrollo de la actividad contractual establecida con clientes y proveedores y cuya finalidad sea establecer relaciones de cualquier índole con ellos a fin de dar contenido a esa relación y en especial a las obligaciones de facturación, cobros y pagos, contabilidad y fiscalidad se basan en el interés legítimo del responsable conforme al art. 6.1 f) del RGPD y al art. 19 de la LOPD-GDD.</p>

        <h2 className="mt-8 text-lg font-semibold text-zinc-900">¿Por cuánto tiempo conservaremos sus datos personales?</h2>
        <p><strong>Como Usuario de la Web:</strong> Conservados hasta cumplir su finalidad o hasta que nos revoque el consentimiento prestado.</p>
        <p><strong>Como seguidor en RRSS:</strong> Serán conservados hasta que nos revoque el consentimiento prestado o dejes de seguirnos o marques ya no me gusta.</p>
        <p><strong>Como cliente o proveedor:</strong> Sus datos personales serán conservados mientras dure la relación establecida con la persona jurídica en la que presta sus servicios y una vez finalizada ésta, se conservarán en base a los plazos legales de conservación y en base a la prescripción de las responsabilidades nacidas del tratamiento de sus datos.</p>

        <h2 className="mt-8 text-lg font-semibold text-zinc-900">¿Cederemos sus datos personales?</h2>
        <p><strong>Como Usuario de la Web:</strong> Sus datos personales no serán cedidos salvo por obligación legal.</p>
        <p><strong>Como seguidor en RRSS:</strong> Sus datos personales no serán cedidos salvo por obligación legal.</p>
        <p><strong>Como cliente o proveedor:</strong> Sus datos personales no serán cedidos salvo por obligación legal.</p>
      </div>
      <p className="mt-8 text-sm text-zinc-600">
        <Link href={withLang("en", "privacy")} className="underline">privacy</Link>
        {" · "}
        <Link href={withLang("en", "cookies")} className="underline">cookies</Link>
        {" · "}
        <Link href={withLang("en", "")} className="underline">home</Link>
      </p>
    </main>
  );
}
