import { RefreshCw, XCircle } from "lucide-react";
import Link from "next/link";

export default function PaymentFailPage() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-[2rem] shadow-2xl p-10 text-center">
        <div className="flex justify-center mb-6">
          <div className="h-24 w-24 rounded-full bg-red-100 flex items-center justify-center">
            <XCircle className="h-14 w-14 text-red-600" />
          </div>
        </div>

        <p className="text-xs uppercase tracking-[0.3em] text-red-600 font-black mb-3">
          Payment Failed
        </p>

        <h1 className="text-3xl font-black text-slate-900 mb-4">
          Transaction Unsuccessful
        </h1>

        <p className="text-slate-500 leading-relaxed mb-8">
          We could not complete your payment. No registration has been
          confirmed. Please try again.
        </p>

        <Link
          href="/dashboard/payment"
          className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-red-700 transition-all"
        >
          Retry Payment
          <RefreshCw size={18} />
        </Link>
      </div>
    </div>
  );
}
