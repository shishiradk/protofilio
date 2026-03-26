import { getPortfolioData } from "@/lib/data";
import { PortfolioProvider } from "@/context/PortfolioContext";
import Navbar from "@/components/Navbar";
import HireBox from "@/components/HireBox";
import DateTime from "@/components/DateTime";
import SocialIcons from "@/components/SocialIcons";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export default function Home() {
  const data = getPortfolioData();

  return (
    <PortfolioProvider data={data}>
      <HireBox />
      <DateTime />
      <SocialIcons />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </PortfolioProvider>
  );
}
