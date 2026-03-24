import Navbar from "@/components/Navbar";
import HireBox from "@/components/HireBox";
import DateTime from "@/components/DateTime";
import SocialIcons from "@/components/SocialIcons";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <HireBox />
      <DateTime />
      <SocialIcons />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}
