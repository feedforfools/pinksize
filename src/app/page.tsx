import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Biography from "@/components/Biography";
import Events from "@/components/Events";
// Video section variants - uncomment the one you want to use:
import Videos from "@/components/Videos";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
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
