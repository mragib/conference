import { getProfile, getTopics } from "@/lib/data-service";
import { redirect } from "next/navigation";
import AbstractSubmitForm from "./AbstractSubmitForm";

const SubmitPage = async () => {
  const { data: topics } = await getTopics();
  const profile = await getProfile();

  if (profile.statusCode === 404) redirect("/dashboard/profile");

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-12 custom-scrollbar bg-slate-50/30">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 shadow-2xl border border-slate-100 space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#003366] via-[#C5A059] to-[#003366]" />

          <AbstractSubmitForm topics={topics} />
        </div>
      </div>
    </div>
  );
};

export default SubmitPage;
