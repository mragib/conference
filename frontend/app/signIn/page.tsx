import { getPublicSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { SigninForm } from "./signinForm";

const SignInPage = async () => {
  const session = await getPublicSession();
  if (session) {
    redirect("/dashboard");
  }
  return <SigninForm />;
};

export default SignInPage;
