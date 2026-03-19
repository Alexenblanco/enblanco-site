import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Geist_Mono } from "next/font/google";
import "../globals.css";
import FloatingDock from "@/components/Dock/FloatingDock";
import CookieConsentManager from "@/components/cookies/CookieConsentManager";
import FooterSlot from "@/components/footer/FooterSlot";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import { NoteTransitionProvider } from "@/contexts/NoteTransitionContext";
import { ProjectTransitionProvider } from "@/contexts/ProjectTransitionContext";
import { objectSans } from "../fonts";
import { getSiteUrl } from "@/lib/seo";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  LEGAL_ENTITY_ADDRESS,
  LEGAL_ENTITY_NAME,
  LEGAL_ENTITY_NIF,
  SITE_NAME,
} from "@/lib/site-config";
import { isValidLang } from "@/lib/i18n/path";

type Props = { children: React.ReactNode; params: Promise<{ lang: string }> };

const siteUrl = getSiteUrl();
const ogImage = `${siteUrl}/og-default.jpg`;
const logoUrl = `${siteUrl}/logo.png`;

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  adjustFontFallback: false,
});

export const viewport = {
  themeColor: "#F2F1F1",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "enblanco", template: "%s — enblanco" },
  description:
    "Estudio de branding y diseño. Identidad visual, packaging y experiencias digitales.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      {
        url: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  applicationName: "enblanco",
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: "enblanco",
    url: siteUrl,
    title: "enblanco",
    description:
      "Estudio de branding y diseño. Identidad visual, packaging y experiencias digitales.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "enblanco",
      },
    ],
  },
};

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  return (
    <html lang={lang} className={objectSans.variable}>
      <body className={`${geistMono.variable} antialiased`}>
        <div className="page">
          <SmoothScrollProvider />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                  {
                    "@type": "Organization",
                    "@id": `${siteUrl}/#organization`,
                    name: LEGAL_ENTITY_NAME,
                    alternateName: SITE_NAME,
                    url: siteUrl,
                    taxID: LEGAL_ENTITY_NIF,
                    logo: {
                      "@type": "ImageObject",
                      url: logoUrl,
                    },
                    address: {
                      "@type": "PostalAddress",
                      streetAddress: "Plaza Santa Catalina 4, Escalera 3, 3ºH",
                      addressLocality: "Murcia",
                      postalCode: "30004",
                      addressRegion: "Murcia",
                      addressCountry: "ES",
                    },
                    areaServed: "ES",
                    sameAs: [
                      "https://www.instagram.com/enbl_nco/",
                      "https://www.behance.net/enbl_nco",
                      "https://www.linkedin.com/company/agenciaenblanco/",
                    ],
                    contactPoint: {
                      "@type": "ContactPoint",
                      contactType: "customer support",
                      email: CONTACT_EMAIL,
                      telephone: CONTACT_PHONE.replace(/\s+/g, ""),
                      areaServed: "ES",
                      availableLanguage: ["Spanish", "English"],
                    },
                    description: LEGAL_ENTITY_ADDRESS,
                  },
                  {
                    "@type": "WebSite",
                    "@id": `${siteUrl}/#website`,
                    url: siteUrl,
                    name: SITE_NAME,
                    publisher: {
                      "@id": `${siteUrl}/#organization`,
                    },
                  },
                ],
              }),
            }}
          />
          <ProjectTransitionProvider>
            <NoteTransitionProvider>{children}</NoteTransitionProvider>
          </ProjectTransitionProvider>
          <FooterSlot />
          <FloatingDock />
          <CookieConsentManager />
        </div>
      </body>
    </html>
  );
}
