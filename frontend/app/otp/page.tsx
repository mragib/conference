import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import OtpForm from "./OtpForm";

const OtpPage = async () => {
  const cookieStore = await cookies();
  const email = cookieStore.get("reset_email");

  if (!email) {
    redirect("/forgot-password");
  }
  return (
    <Suspense fallback={null}>
      <OtpForm />
    </Suspense>
  );
};

export default OtpPage;
