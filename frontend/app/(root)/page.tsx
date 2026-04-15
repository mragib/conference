import About from "@/components/About";
import Committee from "@/components/Committee";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Guidelines from "@/components/Guidelines";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import KeyDates from "@/components/ImportantDates";
import Marquee from "@/components/Marquee";
import Partners from "@/components/Partners";
import Pricing from "@/components/Pricing";

export default function Home() {
  return (
    <>
      <section id="home">
        <Hero />
      </section>
      <Marquee />
      <section id="about" className="scroll-mt-20">
        <About />
      </section>

      <section id="highlights" className="scroll-mt-20">
        <Highlights />
      </section>

      <section id="important-dates" className="scroll-mt-20">
        <KeyDates />
      </section>

      <section id="guidelines" className="scroll-mt-20">
        <Guidelines />
      </section>
      {/* 
      <section id="speakers" className="scroll-mt-20">
        <Speakers />
      </section> */}

      <section id="committee" className="scroll-mt-20">
        <Committee />
      </section>

      <section id="pricing" className="scroll-mt-20">
        <Pricing />
      </section>

      <section id="partners">
        <Partners />
      </section>

      <section id="faq" className="scroll-mt-20">
        <FAQ />
      </section>

      <section id="contact" className="scroll-mt-20">
        <Contact />
      </section>

      <Footer />
    </>
  );
}
