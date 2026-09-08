import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Amiri, Cormorant_Garamond, Nunito } from "next/font/google";
import { cn } from "@/lib/utils";

// Elegant display serif for names, headings and accents — replaces the
// earlier casual "Caveat" handwriting font, which read as a whiteboard
// doodle rather than the refined Luxury 2 reference. Kept on the same
// --font-display variable so every section (they all already reference
// var(--font-display)) upgrades from one place.
const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
});

// Used for the Arabic ayat in QuotesSection (previously fell back to a
// generic system serif since --font-amiri was never defined anywhere).
const amiri = Amiri({
  subsets: ["arabic", "latin"],
  variable: "--font-amiri",
  weight: ["400", "700"],
});

const siteUrl = "https://weddinginvnana.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Undangan Pernikahan Khaharani & Yono",
    template: "%s | Undangan Khaharani & Yono",
  },
  description:
    "Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Anda untuk menyaksikan momen sakral pernikahan Khaharani & Yono.",
  keywords: ["undangan pernikahan", "wedding invitation", "Khaharani", "Yono", "undangan digital"],
  authors: [{ name: "Khaharani & Yono" }],
  category: "wedding invitation",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Undangan Pernikahan Khaharani & Yono",
    description: "Minggu, 16 Agustus 2026 — Bandung, Jawa Barat",
    url: siteUrl,
    siteName: "Undangan Khaharani & Yono",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: "https://res.cloudinary.com/dzjydhoc7/image/upload/v1784378310/couple_rwujja.png",
        width: 1200,
        height: 630,
        alt: "Khaharani & Yono",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f7f2e6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={cn(displayFont.variable, nunito.variable, amiri.variable)}>
      <body className="font-body">{children}</body>
    </html>
  );
}