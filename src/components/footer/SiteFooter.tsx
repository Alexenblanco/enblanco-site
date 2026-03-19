import { withLang, type Locale } from "@/lib/i18n/path";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/site-config";
import FooterInteractiveLogo from "./FooterInteractiveLogo";
import FooterRevealLink from "./FooterRevealLink";

type SiteFooterProps = {
  lang: Locale;
};

export default function SiteFooter({ lang }: SiteFooterProps) {
  const currentYear = new Date().getFullYear();
  const copyrightText =
    lang === "es"
      ? `©${currentYear} enblanco. Murcia | Madrid`
      : `©${currentYear} enblanco. Murcia | Madrid`;

  const copy =
    lang === "es"
      ? {
          headings: {
            menu: "menú",
            social: "social",
            contact: "contact",
            legal: "legal",
          },
          menuLinks: [
            { label: "proyectos", href: withLang("es", "proyectos") },
            { label: "áreas", href: withLang("es", "areas") },
            { label: "enblanco", href: withLang("es", "enblanco") },
            { label: "notas", href: withLang("es", "notas") },
            { label: "contacto", href: withLang("es", "contacto") },
          ],
          legalLinks: [
            { label: "política de privacidad", href: withLang("es", "privacidad") },
            { label: "aviso legal", href: withLang("es", "aviso-legal") },
            { label: "política de cookies", href: withLang("es", "cookies") },
          ],
        }
      : {
          headings: {
            menu: "menu",
            social: "social",
            contact: "contact",
            legal: "legal",
          },
          menuLinks: [
            { label: "projects", href: withLang("en", "projects") },
            { label: "areas", href: withLang("en", "areas") },
            { label: "enblanco", href: withLang("en", "enblanco") },
            { label: "notes", href: withLang("en", "notes") },
            { label: "contact", href: withLang("en", "contact") },
          ],
          legalLinks: [
            { label: "privacy policy", href: withLang("en", "privacy") },
            { label: "legal notice", href: withLang("en", "legal-notice") },
            { label: "cookie policy", href: withLang("en", "cookies") },
          ],
        };

  const socialLinks = [
    { label: "instagram", href: "https://www.instagram.com/enbl_nco/" },
    { label: "behance", href: "https://www.behance.net/enbl_nco" },
    { label: "linkedin", href: "https://www.linkedin.com/company/agenciaenblanco/" },
  ];

  return (
    <footer className="enblanco-footer relative w-full overflow-hidden bg-[var(--color-bg)] pb-14 md:pb-16 lg:pb-20">
      <FooterInteractiveLogo />

      <div className="enblanco-footer-content relative z-10 mx-auto w-full">
        <div className="enblanco-footer-grid text-[14px] leading-[1.45]">
          <section className="enblanco-footer-section enblanco-footer-menu order-1">
            <p className="mb-2 text-[14px] !text-[#8A8A8A]">{copy.headings.menu}</p>
            <nav aria-label="menu">
              <ul className="space-y-0.5">
                {copy.menuLinks.map((item) => (
                  <li key={item.label}>
                    <FooterRevealLink href={item.href}>
                      {item.label}
                    </FooterRevealLink>
                  </li>
                ))}
              </ul>
            </nav>
          </section>

          <section className="enblanco-footer-section enblanco-footer-social order-2">
            <p className="mb-2 text-[14px] !text-[#8A8A8A]">{copy.headings.social}</p>
            <nav aria-label="social">
              <ul className="space-y-0.5">
                {socialLinks.map((item) => (
                  <li key={item.label}>
                    <FooterRevealLink href={item.href} external openInNewTab>
                      {item.label}
                    </FooterRevealLink>
                  </li>
                ))}
              </ul>
            </nav>
          </section>

          <section className="enblanco-footer-section enblanco-footer-contact order-3">
            <p className="mb-2 text-[14px] !text-[#8A8A8A]">{copy.headings.contact}</p>
            <ul className="space-y-0.5">
              <li>
                <FooterRevealLink href={`mailto:${CONTACT_EMAIL}`} external>
                  {CONTACT_EMAIL}
                </FooterRevealLink>
              </li>
              <li>
                <FooterRevealLink href={`tel:${CONTACT_PHONE.replace(/\s+/g, "")}`} external>
                  {CONTACT_PHONE}
                </FooterRevealLink>
              </li>
            </ul>
          </section>

          <section className="enblanco-footer-section enblanco-footer-copyright order-5 md:order-4">
            <p className="!text-[#8A8A8A]">{copyrightText}</p>
          </section>

          <section className="enblanco-footer-section enblanco-footer-legal order-4 md:order-5">
            <p className="mb-2 text-[14px] !text-[#8A8A8A]">{copy.headings.legal}</p>
            <nav aria-label="legal">
              <ul className="space-y-0.5">
                {copy.legalLinks.map((item) => (
                  <li key={item.label}>
                    <FooterRevealLink href={item.href}>
                      {item.label}
                    </FooterRevealLink>
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
