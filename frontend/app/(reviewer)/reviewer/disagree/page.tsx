import { reviewerGetDisAgree } from "@/lib/data-service";
import { redirect } from "next/navigation";

type DisagreePageProps = {
  searchParams: {
    token?: string;
  };
};
const DisagreePage = async ({ searchParams }: DisagreePageProps) => {
  const { token } = await searchParams;

  if (!token) redirect("/reviewer");

  const disagree = await reviewerGetDisAgree(token);

  if (disagree.success) redirect("/reviewer/abstracts");

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-red-600 text-xl font-semibold">
          {disagree.errors || "Something went wrong"}
        </h1>
      </div>
    </div>
  );
};

export default DisagreePage;
