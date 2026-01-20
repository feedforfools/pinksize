import type { Metadata, Viewport } from "next";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="scroll-smooth">
      <body className="font-sans antialiased bg-[rgb(var(--color-black-rgb))]">
        {children}
      </body>
    </html>
  );
}
