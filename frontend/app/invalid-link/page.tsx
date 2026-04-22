import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function InvalidLinkPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center space-y-5">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="text-red-600" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-[#003366]">
          Invalid or Expired Link
        </h1>

        {/* Message */}
        <p className="text-sm text-gray-600 leading-relaxed">
          This invitation link is either invalid, expired, or already used.
          Please request a new link from the administrator.
        </p>

        {/* Actions */}
        <div className="pt-2 space-y-3">
          <Link
            href="/signin"
            className="block w-full py-3 rounded-xl bg-[#003366] text-white font-medium hover:bg-[#002244] transition"
          >
            Go to Sign In
          </Link>

          <Link
            href="/"
            className="block text-sm text-gray-500 hover:text-gray-700 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
