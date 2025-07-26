import type React from "react";
import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "Dofus Guides - Guide des Donjons",
  description:
    "Découvrez tous les secrets des donjons de Dofus avec nos guides détaillés",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable} ${sora.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
