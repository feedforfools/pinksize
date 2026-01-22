import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "@/i18n";
import "../globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
};

export const metadata: Metadata = {
  title: "Pink Size - Pink Floyd Tribute Band",
  description:
    "Dal 2005 vi facciamo emozionare proponendo con grande passione le sonorità tipiche dei Pink Floyd a 360 gradi.",
  keywords: [
    "Pink Floyd",
    "tribute band",
    "Pink Size",
    "musica live",
    "Italia",
  ],
  openGraph: {
    title: "Pink Size - Pink Floyd Tribute Band",
    description:
      "Dal 2005 vi facciamo emozionare proponendo con grande passione le sonorità tipiche dei Pink Floyd a 360 gradi.",
    type: "website",
    locale: "it_IT",
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body className="font-sans antialiased bg-[rgb(var(--color-black-rgb))]">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
