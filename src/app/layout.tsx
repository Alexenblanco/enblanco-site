import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import FloatingDock from "@/components/Dock/FloatingDock";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.agenciaenblanco.com";
const ogImage = `${siteUrl}/og-default.jpg`;
const logoUrl = `${siteUrl}/logo.png`;

/* Object Sans: under src/app/fonts so next/font/local bundles it in production */
const objectSans = localFont({
  src: "./fonts/ObjectSans-Regular.otf",
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Enblanco", template: "%s — Enblanco" },
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
  themeColor: "#F2F1F1",
  applicationName: "Enblanco",
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: "Enblanco",
    url: siteUrl,
    title: "Enblanco",
    description:
      "Estudio de branding y diseño. Identidad visual, packaging y experiencias digitales.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Enblanco",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enblanco",
    description:
      "Estudio de branding y diseño. Identidad visual, packaging y experiencias digitales.",
    images: [ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={objectSans.variable}>
      <body className={`${geistMono.variable} antialiased`}>
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
                  name: "enblanco",
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
                    email: "hola@agenciaenblanco.com",
                    telephone: "+34619526784",
                    areaServed: "ES",
                    availableLanguage: ["Spanish", "English"],
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": `${siteUrl}/#website`,
                  url: siteUrl,
                  name: "enblanco",
                  publisher: {
                    "@id": `${siteUrl}/#organization`,
                  },
                },
              ],
            }),
          }}
        />
        {children}
        <FloatingDock />
        </div>
      </body>
    </html>
  );
}
