"use client";

import AuthModal from "@/components/AuthModal";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  /**
   * On a standalone page, closing the "modal" UI
   * should redirect the user back to the main site.
   */
  const handlePageClose = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
      {/* We reuse the AuthModal component. 
          The UI and logic remain 100% identical to your provided code.
      */}
      <AuthModal initialView="login" />

      <style jsx global>{`
        /* Ensure the fixed background of the modal doesn't clash with the page */
        body {
          background-color: #f8fafc;
        }
      `}</style>
    </div>
  );
}
