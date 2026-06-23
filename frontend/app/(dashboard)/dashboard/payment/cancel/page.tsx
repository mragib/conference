import { ArrowLeft, CircleSlash2 } from "lucide-react";
import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-[2rem] shadow-2xl p-10 text-center">
        <div className="flex justify-center mb-6">
          <div className="h-24 w-24 rounded-full bg-amber-100 flex items-center justify-center">
            <CircleSlash2 className="h-14 w-14 text-amber-600" />
          </div>
        </div>

        <p className="text-xs uppercase tracking-[0.3em] text-amber-600 font-black mb-3">
          Payment Cancelled
        </p>

        <h1 className="text-3xl font-black text-slate-900 mb-4">
          Payment Was Cancelled
        </h1>

        <p className="text-slate-500 leading-relaxed mb-8">
          You cancelled the payment process before completion. You can return
          anytime and complete your registration.
        </p>

        <Link
          href="/dashboard/payment"
          className="inline-flex items-center gap-2 bg-amber-500 text-white px-8 py-4 rounded-2xl font-bold hover:bg-amber-600 transition-all"
        >
          <ArrowLeft size={18} />
          Back to Payment
        </Link>
      </div>
    </div>
  );
}
