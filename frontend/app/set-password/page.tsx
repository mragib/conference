import { validateInvite } from "@/action/auth";
import { redirect } from "next/navigation";
import SetPasswordForm from "./SetPasswordForm";

const SetPasswordPage = async ({
  searchParams,
}: {
  searchParams: { token?: string };
}) => {
  const { token } = await searchParams;
  if (!token) {
    redirect("/invalid-link");
  }

  const isValidToken = await validateInvite(token);

  if (!isValidToken.success) {
    redirect("/invalid-link");
  }

  return <SetPasswordForm token={token} />;
};

export default SetPasswordPage;
