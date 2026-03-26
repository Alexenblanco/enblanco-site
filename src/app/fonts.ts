import localFont from "next/font/local";

/**
 * Object Sans: primary --font-sans. WOFF2 for smaller size and broad support; bundled via next/font/local.
 */
export const objectSans = localFont({
  src: "./fonts/ObjectSans-Regular.woff2",
  variable: "--font-sans",
  display: "swap",
});

export const objectSansThin = localFont({
  src: "./fonts/ObjectSans-Thin.otf",
  display: "swap",
});
