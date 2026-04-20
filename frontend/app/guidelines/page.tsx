import Footer from "@/components/Footer";
import Guidelines from "@/components/Guidelines";
import Navbar from "@/components/Navbar";

export default function KeyDatesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-20">
        {" "}
        {/* Padding top to clear the fixed navbar */}
        <Guidelines />
        <Footer />
      </div>
    </main>
  );
}
