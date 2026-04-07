"use client";

import AuthModal from "@/components/AuthModal";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const handlePageClose = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
      {/* Rendering the signup view directly.
          Matches the modal's double-column layout for registration.
      */}
      <AuthModal initialView="signup" />

      <style jsx global>{`
        body {
          background-color: #f8fafc;
        }
      `}</style>
    </div>
  );
}
