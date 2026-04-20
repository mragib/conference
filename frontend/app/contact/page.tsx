import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function KeyDatesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-20">
        {" "}
        {/* Padding top to clear the fixed navbar */}
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
