"use client";

import { verifyOtp } from "@/action/auth";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

export default function OtpForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const otp = formData.get("otp") as string;

      const res = await verifyOtp(otp);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success("OTP verified");
      router.push("/reset-password");
    });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-black/70 p-4">
      <div className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#003366] p-4 text-white font-bold">Verify OTP</div>

        <div className="p-8">
          <form action={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              name="otp"
              className={`w-full px-4 py-3 border rounded-xl outline-none border-slate-200`}
            />

            <button
              disabled={isPending}
              className="w-full py-3 bg-[#003366] text-white rounded-xl"
            >
              {isPending ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
