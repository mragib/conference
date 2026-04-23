import { SearchX } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <SearchX className="text-[#003366]" size={28} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-[#003366]">404</h1>

        <h2 className="text-lg font-semibold text-gray-800">Page Not Found</h2>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed">
          The page you are looking for doesn’t exist or may have been moved.
          Please check the URL or navigate back to a safe place.
        </p>

        {/* Actions */}
        <div className="space-y-3 pt-2">
          <Link
            href="/"
            className="block w-full py-3 rounded-xl bg-[#003366] text-white font-medium hover:bg-[#002244] transition"
          >
            Go to Home
          </Link>

          <Link
            href="/dashboard"
            className="block w-full py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
