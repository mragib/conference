import { getPublicSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { SigninForm } from "./signinForm";

interface PageProps {
  searchParams: Promise<{ callbackUrl?: string }>;
}

const SignInPage = async ({ searchParams }: PageProps) => {
  const session = await getPublicSession();
  const { callbackUrl } = await searchParams;
  if (session) {
    const destination = callbackUrl
      ? decodeURIComponent(callbackUrl)
      : "/dashboard";
    redirect(destination);
  }
  return <SigninForm callbackUrl={callbackUrl} />;
};

export default SignInPage;
