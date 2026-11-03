import { Providers } from "@/components/providers";
import { SkipToContent } from "@/components/skip-to-content";
import { baseMetadata } from "@/lib/metadata";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import type { ReactNode } from "react";
import "../globals.css";
import { I18nProvider } from "@/components/i18n-provider";
import { en, bg } from "@/lib/i18n/dictionaries";
import { LOCALES, isLocale } from "@/lib/i18n/config";
import { notFound } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const dynamicParams = false;
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? baseMetadata(locale) : {};
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f0e8" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0d0c" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>): Promise<ReactNode> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = locale === "bg" ? bg : en;
  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body
        className={`bg-background text-foreground min-h-screen font-sans antialiased`}
      >
        <I18nProvider locale={locale}>
          <Providers>
            <SkipToContent label={t.skip} />
            {children}
          </Providers>
        </I18nProvider>
      </body>
    </html>
  );
}
