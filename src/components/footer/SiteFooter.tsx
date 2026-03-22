import { withLang, type Locale } from "@/lib/i18n/path";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/site-config";
import InteractiveLogo from "@/components/logo/InteractiveLogo";
import EditorialShell, {
  EditorialBlock,
  EditorialSubgrid,
} from "@/components/layout/EditorialShell";
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
    <EditorialShell
      as="footer"
      className="enblanco-footer relative w-full overflow-hidden bg-[var(--color-bg)] pb-14 md:pb-16 lg:pb-20 [--interactive-logo-width:var(--editorial-frame-width)]"
    >
      {/* Por encima de .enblanco-footer-content (z-10); pointer-events-none en el logo permite clics en enlaces */}
      <InteractiveLogo className="z-20" />

      <EditorialBlock
        start="frame-start"
        end="frame-end"
        className="enblanco-footer-content relative z-10 grid gap-y-8 text-[14px] leading-[1.45] md:hidden"
      >
        <section className="min-w-0">
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

        <section className="min-w-0">
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

        <section className="min-w-0">
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

        <section className="min-w-0">
          <p className="!text-[#8A8A8A]">{copyrightText}</p>
        </section>

        <section className="min-w-0">
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
      </EditorialBlock>

      <EditorialSubgrid
        start="frame-start"
        end="frame-end"
        className="enblanco-footer-content relative z-10 hidden gap-y-10 text-[14px] leading-[1.45] md:grid"
      >
        <section className="min-w-0" style={{ gridColumn: "guide-1 / guide-2", gridRow: "1" }}>
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

        <section className="min-w-0" style={{ gridColumn: "guide-2 / guide-3", gridRow: "1" }}>
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

        <section
          className="min-w-0 whitespace-nowrap"
          style={{
            gridColumn: "guide-3 / guide-4",
            gridRow: "1",
            marginInlineStart: "var(--footer-contact-nudge-inline-start)",
          }}
        >
          <p className="mb-2 text-[14px] !text-[#8A8A8A]">
            {copy.headings.contact}
          </p>
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

        <section className="min-w-0 self-start" style={{ gridColumn: "guide-4 / guide-5", gridRow: "1" }}>
          <p className="mb-2 text-[14px] !text-[#8A8A8A]">{copyrightText}</p>
        </section>

        <section
          className="min-w-0 w-max self-start justify-self-end whitespace-nowrap"
          style={{ gridColumn: "guide-5 / guide-6", gridRow: "1" }}
        >
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
      </EditorialSubgrid>
    </EditorialShell>
  );
}
