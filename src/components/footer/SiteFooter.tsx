import Link from "next/link";
import { withLang, type Locale } from "@/lib/i18n/path";

type SiteFooterProps = {
  lang: Locale;
};

const copyrightText = "©2026 enblanco. Murcia y Madrid";

export default function SiteFooter({ lang }: SiteFooterProps) {
  const menuLinks = [
    { label: "proyectos", href: withLang(lang, lang === "es" ? "proyectos" : "projects") },
    { label: "áreas", href: withLang(lang, "areas") },
    { label: "enblanco", href: withLang(lang, "enblanco") },
    { label: "notas", href: withLang(lang, lang === "es" ? "notas" : "notes") },
    { label: "contacto", href: withLang(lang, lang === "es" ? "contacto" : "contact") },
  ];

  const socialLinks = [
    { label: "instagram", href: "https://www.instagram.com/enbl_nco/" },
    { label: "behance", href: "https://www.behance.net/enbl_nco" },
    { label: "linkedin", href: "https://www.linkedin.com/company/agenciaenblanco/" },
  ];

  const legalLinks = [
    { label: "política de privacidad", href: withLang(lang, lang === "es" ? "privacidad" : "privacy") },
    { label: "términos y condiciones", href: withLang(lang, lang === "es" ? "aviso-legal" : "legal-notice") },
    { label: "política de cookies", href: withLang(lang, "cookies") },
  ];

  return (
    <footer className="enblanco-footer relative w-full overflow-hidden bg-[var(--color-bg)] pt-16 pb-14 md:pt-20 md:pb-16 lg:pt-24 lg:pb-20">
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center" aria-hidden>
        <div className="enblanco-footer-logo-mask absolute top-6 aspect-[99.4/18.3] w-[calc(100vw-64px)] max-w-none md:top-8 lg:top-10" />
      </div>

      <div className="relative z-10 mx-auto w-full px-8 pt-[108px] md:pt-[132px] lg:pt-[178px]">
        <div className="grid w-full grid-cols-1 gap-y-8 text-[14px] leading-[1.45] md:grid-cols-[19fr_18fr_23fr_18fr_22fr] md:items-start md:gap-x-8 md:gap-y-0 lg:gap-x-12">
          <section className="order-1">
            <p className="mb-2 text-[14px] !text-[#8A8A8A]">menú</p>
            <nav aria-label="menu">
              <ul className="space-y-0.5">
                {menuLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="footer-link-pill inline-block cursor-pointer whitespace-nowrap !text-[#1A1C1F]">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </section>

          <section className="order-2">
            <p className="mb-2 text-[14px] !text-[#8A8A8A]">social</p>
            <nav aria-label="social">
              <ul className="space-y-0.5">
                {socialLinks.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="footer-link-pill inline-block cursor-pointer !text-[#1A1C1F]"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </section>

          <section className="order-3">
            <p className="mb-2 text-[14px] !text-[#8A8A8A]">contact</p>
            <ul className="space-y-0.5">
              <li>
                <a href="mailto:hola@agenciaenblanco.com" className="footer-link-pill inline-block cursor-pointer !text-[#1A1C1F]">
                  hola@agenciaenblanco.com
                </a>
              </li>
              <li>
                <a href="tel:+34619526784" className="footer-link-pill inline-block cursor-pointer !text-[#1A1C1F]">
                  +34 619 52 67 84
                </a>
              </li>
            </ul>
          </section>

          <section className="order-5 md:order-4">
            <p className="!text-[#8A8A8A]">{copyrightText}</p>
          </section>

          <section className="order-4 md:order-5">
            <p className="mb-2 text-[14px] !text-[#8A8A8A]">legal</p>
            <nav aria-label="legal">
              <ul className="space-y-0.5">
                {legalLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="footer-link-pill inline-block cursor-pointer !text-[#1A1C1F]">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </section>
        </div>
      </div>
    </footer>
  );
}
