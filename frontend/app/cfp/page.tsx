"use client";

import CFPModal from "@/components/CFPModal";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

export default function CFPFullPage() {
  const router = useRouter();

  const handleStartSubmission = () => {
    // Logic for direct page submission
    router.push("/signUp");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="pt-24 pb-12">
        {/* We reuse the CFPModal component but without fixed-inset positioning 
            if you prefer a standard page layout, or simply render it as is. */}
        <div className="max-w-7xl mx-auto px-6">
          <CFPModal onStartSubmission={handleStartSubmission} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
