import { validateInvite } from "@/action/auth";
import { redirect } from "next/navigation";

const SetPasswordPage = async ({
  searchParams,
}: {
  searchParams: { token?: string };
}) => {
  const token = searchParams.token;
  if (!token) {
    redirect("/invalid-link");
  }

  const isValidToken = await validateInvite(token);

  console.log("isValidToken", isValidToken);

  return <div>SetPasswordPage</div>;
};

export default SetPasswordPage;
