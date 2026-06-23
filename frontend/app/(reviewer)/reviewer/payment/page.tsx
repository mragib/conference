import { DashboardHeader } from "@/components/DashboardHeader";
import { getMyPayment, getProfile } from "@/lib/data-service";
import Link from "next/link";
import PaymentForm from "./PaymentForm";
import PaymentHistoryTable from "./PaymentHistory";

const PaymentPage = async () => {
  const { data: payments } = await getMyPayment();
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
          href="/reviewer/profile?forward=payment"
        >
          Create Profile
        </Link>
      </div>
    );

  return (
    <div className="overflow-y-hidden">
      <DashboardHeader menuName="Payments" />
      <div className="min-h-screen bg-[#F1F5F9]">
        <div className="flex justify-center pt-8">
          <PaymentForm />
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <PaymentHistoryTable payments={payments} />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
