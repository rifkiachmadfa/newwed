import type { Metadata } from "next";
import "./globals.css";
import { Caveat, Nunito } from "next/font/google";
import { cn } from "@/lib/utils";

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Undangan Pernikahan Nana & Yono",
  description: "Kami dengan penuh kebahagiaan mengundang Anda untuk menyaksikan momen sakral pernikahan kami.",
  openGraph: {
    title: "Undangan Pernikahan Nana & Yono",
    description: "Minggu, 16 Agustus 2026 — Bandung, Jawa Barat",
    images: [
      {
        url: "https://res.cloudinary.com/dzjydhoc7/image/upload/v1784378310/couple_rwujja.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={cn(caveat.variable, nunito.variable)}>
      <body className="font-body">{children}</body>
    </html>
  );
}