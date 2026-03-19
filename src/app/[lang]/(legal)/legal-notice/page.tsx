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
    title: "Legal notice",
    description: "Legal notice for the enblanco website and general terms of use.",
    canonicalPath: "/en/legal-notice",
    esPath: "/es/aviso-legal",
    enPath: "/en/legal-notice",
  });
}

export default async function LegalNoticePage({ params }: Props) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();
  if (lang === "es") redirect(withLang("es", "aviso-legal"));

  return (
    <LegalPageLayout lang="en" title="Legal notice">
      <h2>1. Website owner</h2>
      <p>
        In compliance with Law 34/2002, of 11 July, on Information Society
        Services and Electronic Commerce (LSSI-CE), the following identifying
        details of the owner of this website are provided:
      </p>
      <ul>
        <li>
          <strong>Owner:</strong> {LEGAL_ENTITY_NAME}.
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
      <p>
        This website is intended to present enblanco&apos;s professional
        services in branding, design and advertising, as well as to facilitate
        contact with individuals, brands and organisations interested in its
        services.
      </p>

      <h2>2. Terms of use</h2>
      <p>
        Access to and use of this website grants the status of user and implies
        acceptance of the conditions set out herein.
      </p>
      <p>
        Users undertake to use this website, its contents and its services in
        accordance with the law, good faith, public order and these conditions.
        Use of the website for unlawful purposes, harmful purposes or purposes
        that may prejudice, damage or hinder the normal operation of the site
        is prohibited.
      </p>

      <h2>3. Intellectual and industrial property</h2>
      <p>
        All website content, including but not limited to texts, images,
        designs, graphic elements, logos, videos, structure, source code and
        other creative or technical elements, is owned by enblanco or used with
        sufficient authorisation, and is protected by current intellectual and
        industrial property regulations.
      </p>
      <p>
        Reproduction, distribution, transformation, public communication,
        making available or any other form of exploitation, in whole or in
        part, is prohibited without the prior express authorisation of the
        owner, except where legally permitted.
      </p>

      <h2>4. Liability</h2>
      <p>
        enblanco does not guarantee the permanent availability of the website
        or the absence of errors in access or content, although it will adopt
        reasonable measures to avoid or correct them where appropriate.
      </p>
      <p>
        enblanco shall not be liable for any damages that may arise from the
        use of the website, service interruptions, the presence of viruses or
        other harmful elements, or the use that users make of the information
        contained therein.
      </p>

      <h2>5. Third-party links</h2>
      <p>
        This website may include links to third-party pages or resources in
        order to expand information or facilitate access to other content.
        enblanco does not control and assumes no responsibility for such
        external sites, their policies, content or availability.
      </p>

      <h2>6. Modifications</h2>
      <p>
        enblanco reserves the right to modify, update or delete, at any time
        and without prior notice, the contents of this website, as well as this
        legal notice, in order to adapt it to legal, technical or operational
        changes.
      </p>

      <h2>7. Applicable law and jurisdiction</h2>
      <p>
        The relationship between the user and the owner of the website shall be
        governed by current Spanish law. In the event of any conflict or
        dispute that must be resolved in court, both parties shall submit to
        the courts and tribunals that are competent in accordance with the
        applicable regulations.
      </p>
    </LegalPageLayout>
  );
}
