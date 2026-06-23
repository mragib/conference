import { getTransactionStatus } from "@/lib/data-service";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ tran_id?: string }>;
}) {
  const tranId = (await searchParams).tran_id;
  const { data: transaction } = await getTransactionStatus(tranId);

  if (!transaction || transaction.status !== "SUCCESS") {
    redirect("/dashboard/payment/fail");
  }
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-[2rem] shadow-2xl p-10 text-center">
        <div className="flex justify-center mb-6">
          <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="h-14 w-14 text-green-600" />
          </div>
        </div>

        <p className="text-xs uppercase tracking-[0.3em] text-green-600 font-black mb-3">
          Payment Successful
        </p>

        <h1 className="text-3xl font-black text-slate-900 mb-4">
          Registration Confirmed
        </h1>

        <p className="text-slate-500 leading-relaxed mb-8">
          Your conference registration payment has been successfully processed.
          A confirmation email will be sent shortly.
        </p>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 bg-[#003366] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#001A41] transition-all"
        >
          Go to Dashboard
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
