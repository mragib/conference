import { forgotPassword } from "@/action/auth";
import { redirect } from "next/navigation";

const OtpPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) => {
  const { email } = await searchParams;
  if (!email) redirect("/forgot-password");
  const data = await forgotPassword({ email });
  if (data.statusCode === 401) {
    redirect("/forgot-password?error=unauthorized");
  }

  return <div>Search results for: {email}</div>;
};

export default OtpPage;
