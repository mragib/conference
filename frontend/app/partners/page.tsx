import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Partners from "@/components/Partners";

export default function KeyDatesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-20">
        {" "}
        {/* Padding top to clear the fixed navbar */}
        <Partners />
        <Footer />
      </div>
    </main>
  );
}
