import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ResetPasswordForm from "./ResetPasswordForm";

export default async function ResetPasswordPage() {
  const cookieStore = await cookies();

  const resetToken = cookieStore.get("reset_token")?.value;

  // 🚨 If no valid reset session → block access
  if (!resetToken) {
    redirect("/forgot-password");
  }

  return <ResetPasswordForm />;
}
