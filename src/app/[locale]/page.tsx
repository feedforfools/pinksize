import { setRequestLocale } from "next-intl/server";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Biography from "@/components/Biography";
import Events from "@/components/Events";
import Videos from "@/components/Videos";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-[rgb(var(--color-black-rgb))]">
      <Navigation />
      <Hero />
      <Biography />
      <Videos />
      <Events />
      <Contact />
      <Footer />
    </main>
  );
}
