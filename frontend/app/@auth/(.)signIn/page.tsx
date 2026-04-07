"use client";

import AuthModal from "@/components/AuthModal";

/**
 * Intercepted Login Route
 * This component renders when the user navigates to /login
 * from within the application.
 */
export default function InterceptedLoginPage() {
  return <AuthModal initialView="login" />;
}
