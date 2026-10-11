import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Manrope, Spectral } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/content/site";
import { publicPath } from "@/lib/public-path";
import { businessSchema } from "@/lib/schema";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

const spectral = Spectral({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600"],
  variable: "--font-spectral",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "AVTO RAZUM — антикор и электрика в Минске",
    template: "%s — AVTO RAZUM",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "антикор кабин и рам",
    "автоэлектрика Минск",
    "покраска авто Минск",
    "ремонт ЭБУ",
    "отключение AdBlue",
    "пневмосиденья",
    "удаление DPF",
    "AVTO RAZUM",
  ],
  alternates: {
    canonical: site.url,
    languages: { ru: site.url },
  },
  openGraph: {
    type: "website",
    locale: "ru_BY",
    siteName: site.name,
    title: "AVTO RAZUM — антикор и электрика в Минске",
    description: site.description,
    url: site.url,
    images: [
      {
        url: "/images/services/antikor.jpg",
        width: 1280,
        height: 720,
        alt: "Антикор кабин и рам в AVTO RAZUM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AVTO RAZUM — антикор и электрика в Минске",
    description: site.description,
    images: ["/images/services/antikor.jpg"],
  },
  other: {
    "geo.region": site.regionCode,
    "geo.placename": site.locality,
  },
  icons: {
    icon: publicPath("/brand/icon.svg"),
  },
};

export const viewport: Viewport = {
  themeColor: "#08070b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ru" className={`${manrope.variable} ${spectral.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans text-foreground">
        <div className="grain" aria-hidden="true" />
        <a
          href="#content"
          className="absolute left-4 top-4 z-[60] -translate-y-24 bg-foreground px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-background focus:translate-y-0"
        >
          К содержанию
        </a>
        <JsonLd data={businessSchema()} />
        <Header />
        <main id="content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
