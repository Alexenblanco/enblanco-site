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
  if (!isValidLang(lang) || lang === "es") return {};
  return buildLegalMetadata({
    title: "Privacy policy",
    description: "Privacy policy for the enblanco website.",
    canonicalPath: "/en/privacy",
    esPath: "/es/privacidad",
    enPath: "/en/privacy",
  });
}

export default async function PrivacyPage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();
  if (lang === "es") redirect(withLang("es", "privacidad"));

  return (
    <LegalPageLayout lang="en" title="Privacy policy">
      <h2>1. Data controller</h2>
      <p>
        In accordance with Regulation (EU) 2016/679 of 27 April, the General
        Data Protection Regulation (GDPR), and Organic Law 3/2018 on Personal
        Data Protection and the guarantee of digital rights, please note that
        the controller of the data collected through this website is:
      </p>
      <ul>
        <li>
          <strong>Controller:</strong> {LEGAL_ENTITY_NAME}.
        </li>
        <li>
          <strong>Tax ID:</strong> {LEGAL_ENTITY_NIF}.
        </li>
        <li>
          <strong>Address:</strong> {LEGAL_ENTITY_ADDRESS}.
        </li>
        <li>
          <strong>Email:</strong> <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </li>
      </ul>

      <h2>2. What personal data is collected</h2>
      <p>
        Personal data may be collected through this website when users contact
        enblanco or interact with certain website services.
      </p>
      <p>The data that may be processed, depending on the case, is:</p>
      <ul>
        <li>Name.</li>
        <li>Email address.</li>
        <li>Telephone number, when provided optionally.</li>
        <li>Message or content of the enquiry.</li>
        <li>Interest or service selected in the form, where applicable.</li>
        <li>
          Minimum technical data associated with website use, security or
          incident management.
        </li>
      </ul>

      <h2>3. Purpose of the processing</h2>
      <p>The personal data will be processed for the following purposes:</p>
      <ul>
        <li>
          To handle contact requests, enquiries, comments or professional
          proposals submitted through the form or by email.
        </li>
        <li>
          To manage requests for information or quotations related to
          enblanco&apos;s services.
        </li>
        <li>
          To maintain the communications necessary following a prior request.
        </li>
        <li>
          To technically manage the proper functioning of the website, prevent
          incidents, detect errors and strengthen security.
        </li>
        <li>
          To analyse, where appropriate and with prior consent when required,
          website use and the effectiveness of measurement or marketing actions.
        </li>
      </ul>
      <p>
        enblanco will not use personal data to send unsolicited commercial
        communications or newsletters, as this website does not currently offer
        any subscription service.
      </p>

      <h2>4. Legal basis for the processing</h2>
      <p>
        The legal basis for processing the data will depend on the type of
        interaction carried out:
      </p>
      <ul>
        <li>
          <strong>Consent of the data subject</strong>, when the person
          voluntarily submits an enquiry, uses the contact form or accepts
          certain categories of cookies.
        </li>
        <li>
          <strong>Application of pre-contractual measures at the request of
          the data subject</strong>, when the enquiry is intended to request
          information about services, assess a possible engagement or ask for a
          quotation.
        </li>
        <li>
          <strong>Legitimate interest of the controller</strong>, when
          necessary to ensure website security, manage technical incidents or
          defend against possible claims arising from the use of the site or
          the relationship maintained.
        </li>
      </ul>

      <h2>5. Data retention</h2>
      <p>
        Personal data will be kept for as long as necessary to deal with the
        request, maintain the communication arising from it and, where
        appropriate, manage a possible pre-contractual or professional
        relationship.
      </p>
      <p>
        Once that purpose has ended, the data may be kept duly blocked for the
        periods required by the applicable regulations or for as long as legal
        liabilities may arise.
      </p>
      <p>
        In the case of technical records, logs or data linked to security or
        delivery incidents, they may be kept for the time strictly necessary
        for verification, diagnosis, fraud prevention, security and compliance
        with legal obligations.
      </p>

      <h2>6. Recipients, providers and processors</h2>
      <p>
        As a general rule, enblanco will not disclose personal data to third
        parties, except where required by law.
      </p>
      <p>
        However, for the proper provision of website services and the
        management of communications, enblanco may rely on providers acting as
        processors or service providers linked to the website activity,
        including:
      </p>
      <ul>
        <li>
          <strong>Vercel</strong>, as website hosting or infrastructure
          provider.
        </li>
        <li>
          <strong>Resend</strong>, as a technical service for sending forms or
          website communications.
        </li>
        <li>
          <strong>Google Workspace</strong>, as the environment for receiving
          and managing email.
        </li>
        <li>
          <strong>Google Analytics (GA4)</strong>, as a web analytics tool, if
          activated and always in accordance with the required consent.
        </li>
        <li>
          <strong>Google Tag Manager</strong>, as the website&apos;s tag
          management system.
        </li>
        <li>
          <strong>Meta Pixel / Meta Ads</strong>, as measurement, advertising
          tracking or remarketing tools, if activated and always in accordance
          with the required consent.
        </li>
      </ul>
      <p>
        These providers will process the data only following the
        controller&apos;s instructions and with the appropriate contractual and
        organisational safeguards where required.
      </p>

      <h2>7. International data transfers</h2>
      <p>
        Some providers used by this website may be located outside the European
        Economic Area or involve international data transfers, especially in
        relation to technology services provided by global platforms such as
        Google, Meta, Vercel or Resend.
      </p>
      <p>
        In such cases, enblanco will adopt the appropriate measures and
        safeguards required by data protection regulations to ensure a level of
        protection equivalent to that provided by European legislation.
      </p>

      <h2>8. Users&apos; rights</h2>
      <p>
        Data subjects may exercise, at any time and under the terms provided by
        the applicable regulations, their rights to:
      </p>
      <ul>
        <li>Access.</li>
        <li>Rectification.</li>
        <li>Erasure.</li>
        <li>Objection.</li>
        <li>Restriction of processing.</li>
        <li>Portability.</li>
        <li>
          Withdraw consent, where processing is based on consent, without
          affecting the lawfulness of the processing carried out beforehand.
        </li>
      </ul>
      <p>
        To do so, they may contact enblanco by written communication to{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>, indicating the
        right they wish to exercise and providing proof of identity where
        necessary.
      </p>

      <h2>9. Complaint to the supervisory authority</h2>
      <p>
        If the data subject believes that the processing of their data does not
        comply with current regulations, they may lodge a complaint with the
        Spanish Data Protection Agency (AEPD).
      </p>

      <h2>10. Social media</h2>
      <p>
        enblanco may maintain a presence on social media or professional
        platforms. Users&apos; interaction with enblanco profiles on such
        platforms shall be governed, in addition to this policy where
        applicable, by the terms of use, privacy policies and regulations of
        each social network.
      </p>
      <p>
        enblanco does not fully control the processing carried out by such
        platforms on users&apos; data outside the actions directly managed from
        its corporate profiles.
      </p>

      <h2>11. Security</h2>
      <p>
        enblanco applies reasonable technical and organisational measures to
        protect personal data and reduce the risk of loss, alteration,
        unauthorised access or improper processing, taking into account the
        nature of the data processed and the risks associated with the digital
        environment.
      </p>

      <h2>12. Updates to this policy</h2>
      <p>
        This privacy policy may be modified whenever necessary to adapt it to
        legal, technical or functional changes to the website. The version
        published at any given time shall be the current one.
      </p>
    </LegalPageLayout>
  );
}
