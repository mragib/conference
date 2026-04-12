"use client";

import CFPModal from "@/components/CFPModal";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

export default function CFPPage() {
  const router = useRouter();

  const handleStartSubmission = () => {
    // Standard navigation to signup
    router.push("/signup");
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB]">
      <Navbar />
      <main className="pt-20 pb-12">
        {/* We reuse the UI logic but pass a handler that works for a page */}
        <CFPModal onStartSubmission={handleStartSubmission} isPage={true} />
      </main>
      <Footer />
    </div>
  );
}
