"use client";

import CFPModal from "@/components/CFPModal";
import { useRouter } from "next/navigation";

export default function CFPInterceptedPage() {
  const router = useRouter();

  const handleStartSubmission = () => {
    // When in modal mode, we close the modal and move to signup
    router.dismiss(); // Or router.back()
    router.push("/signUp");
  };

  return <CFPModal onStartSubmission={handleStartSubmission} />;
}
