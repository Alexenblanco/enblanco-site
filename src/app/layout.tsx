import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import FloatingDock from "@/components/Dock/FloatingDock";
import SetLocaleLang from "@/components/SetLocaleLang";
import FooterSlot from "@/components/footer/FooterSlot";
import { objectSans } from "./fonts";
import { getSiteUrl } from "@/lib/seo";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site-config";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const locale = headersList.get("x-locale") === "en" ? "en" : "es";

  return (
    <html lang={locale} className={objectSans.variable} suppressHydrationWarning>
      <body className={`${geistMono.variable} antialiased`}>
        <SetLocaleLang />
        <div className="page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${siteUrl}/#organization`,
                  name: SITE_NAME,
                  url: siteUrl,
                  logo: {
                    "@type": "ImageObject",
                    url: logoUrl,
                  },
                  address: {
                    "@type": "PostalAddress",
                    streetAddress:
                      "Calle Ortega y Gasset, 9, Edificio Iberdrola 6ª 7ª",
                    addressLocality: "Murcia",
                    postalCode: "30009",
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
                    telephone: "+34619526784",
                    areaServed: "ES",
                    availableLanguage: ["Spanish", "English"],
                  },
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
        {children}
        <FooterSlot />
        <FloatingDock />
        </div>
      </body>
    </html>
  );
}
