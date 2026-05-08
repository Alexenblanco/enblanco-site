import Link from "next/link";
import type { Dictionary } from "@/dictionaries";
import ContactGuidedFlow from "@/components/contact/ContactGuidedFlow";
import CopyEmailButton from "@/components/contact/CopyEmailButton";
import EditorialShell, {
  EditorialBlock,
  EditorialSubgrid,
} from "@/components/layout/EditorialShell";
import { withLang, type Locale } from "@/lib/i18n/path";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/site-config";

type Props = {
  dict: Dictionary["contact"];
  lang: Locale;
  privacyHref: string;
  pageUrl: string;
};

const OFFICES = [
  {
    city: "Murcia",
    address: ["Calle Ortega y Gasset 9,", "Planta 6, 30009"],
  },
  {
    city: "Madrid",
    address: ["Calle Ortega y Gasset 9,", "Planta 6, 30009"],
  },
];

function ContactPhone({ lang }: { lang: Locale }) {
  const formatted = CONTACT_PHONE.replace("+34 ", "");
  const copiedLabel = lang === "es" ? "Copiado" : "Copied";

  return (
    <>
      <a
        href={`tel:${CONTACT_PHONE.replace(/\s+/g, "")}`}
        className="contact-muted-link no-underline md:hidden"
      >
        <span className="contact-white !text-[#ffffff]">[+34]</span>
        <span>{` ${formatted}`}</span>
      </a>
      <CopyEmailButton
        textToCopy={CONTACT_PHONE}
        copiedLabel={copiedLabel}
        ariaLabel={lang === "es" ? "Copiar teléfono al portapapeles" : "Copy phone number to clipboard"}
        className="hidden md:inline-flex"
      >
        <span className="contact-white !text-[#ffffff]">[+34]</span>
        <span>{` ${formatted}`}</span>
      </CopyEmailButton>
    </>
  );
}

function OfficeList({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-8 md:flex-row md:items-start md:gap-[66px] ${className}`}>
      {OFFICES.map((office) => (
        <address
          key={office.city}
          className="w-[192px] not-italic text-[15px] leading-[19.5px] tracking-[-0.05em] md:text-[18px] md:leading-none"
        >
          <p className="mb-[30px] text-[18px] leading-none md:mb-[45px]">{office.city}</p>
          {office.address.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </address>
      ))}
    </div>
  );
}

export default function ContactLandingPage({ dict, lang, privacyHref, pageUrl }: Props) {
  const copy =
    lang === "es"
      ? {
          breadcrumb: "contacto",
          contact: "Contacto",
          offices: "Oficinas",
          homeHref: withLang("es", ""),
        }
      : {
          breadcrumb: "contact",
          contact: "Contact",
          offices: "Offices",
          homeHref: withLang("en", ""),
        };

  return (
    <EditorialShell
      as="main"
      id="main"
      className="contact-figma-page relative isolate overflow-hidden bg-[var(--color-bg)] pb-[124px] pt-8 md:h-[845px] md:min-h-[845px] md:pb-0 md:pt-[22px]"
    >
      <nav
        aria-label={lang === "es" ? "Migas de pan" : "Breadcrumb"}
        className="flex w-full items-start justify-between text-[15px] leading-none tracking-[-0.05em] md:hidden"
      >
        <Link href={copy.homeHref} className="contact-muted-link no-underline">
          home
        </Link>
        <span>{copy.breadcrumb}</span>
      </nav>

      <EditorialSubgrid
        as="nav"
        aria-label={lang === "es" ? "Migas de pan" : "Breadcrumb"}
        start="frame-start"
        end="frame-end"
        className="!hidden text-[14px] leading-[18px] tracking-[-0.05em] md:!grid"
        style={{ gridRow: "1" }}
      >
        <Link
          href={copy.homeHref}
          className="contact-muted-link no-underline"
          style={{ gridColumn: "guide-1 / guide-2" }}
        >
          home
        </Link>
        <span className="!text-[var(--color-text)]" style={{ gridColumn: "guide-4 / guide-5" }}>
          {copy.breadcrumb}
        </span>
        <span className="justify-self-end !text-[var(--color-text)]" style={{ gridColumn: "guide-5 / guide-6" }}>
          enblanco
        </span>
      </EditorialSubgrid>

      <div className="mt-[76px] flex flex-col gap-[100px] md:hidden">
        <section aria-labelledby="contact-details-heading-mobile" className="flex flex-col gap-8">
          <h2
            id="contact-details-heading-mobile"
            className="text-[20px] leading-none tracking-[-0.05em]"
          >
            {copy.contact}
          </h2>
          <div className="flex flex-col gap-6 text-[24px] leading-none tracking-[-0.05em]">
            <CopyEmailButton email={CONTACT_EMAIL} copiedLabel={lang === "es" ? "Copiado" : "Copied"} />
            <ContactPhone lang={lang} />
          </div>
        </section>

        <ContactGuidedFlow
          dict={dict}
          lang={lang}
          privacyHref={privacyHref}
          pageUrl={pageUrl}
        />

        <section aria-labelledby="contact-offices-heading-mobile" className="flex flex-col gap-12">
          <h2
            id="contact-offices-heading-mobile"
            className="text-[20px] leading-none tracking-[-0.05em]"
          >
            {copy.offices}
          </h2>
          <OfficeList />
        </section>
      </div>

      <EditorialBlock
        as="section"
        aria-labelledby="contact-details-heading"
        start="guide-1"
        end="guide-3"
        className="hidden flex-col gap-8 md:flex"
        style={{ gridRow: "1", marginTop: "397px" }}
      >
        <h2 id="contact-details-heading" className="text-[20px] leading-none tracking-[-0.05em]">
          {copy.contact}
        </h2>
        <div className="flex items-center justify-between gap-10 text-[24px] leading-none tracking-[-0.05em]">
          <CopyEmailButton email={CONTACT_EMAIL} copiedLabel={lang === "es" ? "Copiado" : "Copied"} />
          <ContactPhone lang={lang} />
        </div>
      </EditorialBlock>

      <EditorialBlock
        start="guide-4"
        end="guide-5"
        className="hidden md:block"
        style={{ gridRow: "1", marginTop: "277px" }}
      >
        <ContactGuidedFlow
          dict={dict}
          lang={lang}
          privacyHref={privacyHref}
          pageUrl={pageUrl}
        />
      </EditorialBlock>

      <EditorialBlock
        as="section"
        aria-labelledby="contact-offices-heading"
        start="guide-1"
        end="guide-2"
        className="hidden flex-col gap-8 md:flex"
        style={{ gridRow: "1", marginTop: "612px" }}
      >
        <h2 id="contact-offices-heading" className="text-[20px] leading-none tracking-[-0.05em]">
          {copy.offices}
        </h2>
        <OfficeList />
      </EditorialBlock>
    </EditorialShell>
  );
}
