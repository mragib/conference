"use client";

import CFPModal from "@/components/CFPModal";
import { useRouter } from "next/navigation";

export default function CFPPage() {
  const router = useRouter();

  const handleStartSubmission = () => {
    // Standard navigation to signup
    router.push("/signup");
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB]">
      <CFPModal onStartSubmission={handleStartSubmission} isPage={true} />
    </div>
  );
}
