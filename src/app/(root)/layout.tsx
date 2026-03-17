import { Geist_Mono } from "next/font/google";
import "../globals.css";
import { objectSans } from "../fonts";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  adjustFontFallback: false,
});

export default function RedirectRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={objectSans.variable}>
      <body className={`${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
