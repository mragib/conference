import { getPublicSession } from "@/lib/session";
import { redirect } from "next/navigation";
import SignupForm from "./signupForm";

export default async function SignupPage() {
  const session = await getPublicSession();
  if (session) {
    redirect("/dashboard");
  }
  return <SignupForm />;
}
