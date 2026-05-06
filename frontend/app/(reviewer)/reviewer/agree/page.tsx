import { reviewerGetAgree } from "@/lib/data-service";
import { redirect } from "next/navigation";

type AgreePageProps = {
  searchParams: {
    token?: string;
  };
};
const AgreePage = async ({ searchParams }: AgreePageProps) => {
  const { token } = await searchParams;

  if (!token) redirect("/reviewer");

  const agree = await reviewerGetAgree(token);

  if (agree.success) redirect("/reviewer/abstracts");

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-red-600 text-xl font-semibold">
          {agree.errors || "Something went wrong"}
        </h1>
      </div>
    </div>
  );
};

export default AgreePage;
