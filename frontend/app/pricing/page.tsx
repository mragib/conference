import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";

export default function KeyDatesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-20">
        {" "}
        {/* Padding top to clear the fixed navbar */}
        <Pricing />
        <Footer />
      </div>
    </main>
  );
}
