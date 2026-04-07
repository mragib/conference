"use client";

import AuthModal from "@/components/AuthModal";

/**
 * Intercepted SignUp Route
 * This component renders when the user navigates to /signUp
 * from within the application.
 */
export default function InterceptedSignUpPage() {
  return <AuthModal initialView="signup" />;
}
