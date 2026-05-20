import { getProfile, getTopics } from "@/lib/data-service";

import Link from "next/link";
import AbstractSubmitForm from "./AbstractSubmitForm";

const SubmitPage = async () => {
  const { data: topics } = await getTopics();
  const profile = await getProfile();

  if (profile.statusCode === 404)
    return (
      <div className="text-center py-12 shadow-lg rounded-lg bg-white border border-slate-200">
        <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
        <p className="text-gray-600">
          Please create your profile before submitting an abstract.
        </p>
        <Link
          className="inline-flex items-center gap-2 mt-6 px-4 py-2  text-white bg-emerald-500 rounded hover:bg-emerald-600 transition"
          href="/dashboard/profile"
        >
          Create Profile
        </Link>
      </div>
    );

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-12 custom-scrollbar bg-slate-50/30">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 shadow-2xl border border-slate-100 space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#003366] via-[#C5A059] to-[#003366]" />

          <AbstractSubmitForm topics={topics} user={profile} />
        </div>
      </div>
    </div>
  );
};

export default SubmitPage;
