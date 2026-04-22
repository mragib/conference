"use client";

import { resetPassword } from "@/action/auth";
import PasswordStrength from "@/components/PasswordStrength";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const password = formData.get("password") as string;
      const confirm = formData.get("confirm") as string;

      if (password !== confirm) {
        toast.error("Passwords do not match");
        return;
      }

      const res = await resetPassword(password);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success("Password updated");
      router.push("/signin");
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black/70">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-[#003366]">
          Reset Password
        </h2>

        <form action={handleSubmit} className="space-y-4">
          {/* Password */}
          <div>
            <input
              name="password"
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl"
            />

            {/* 🔥 LIVE STRENGTH UI */}
            <PasswordStrength password={password} />
          </div>

          {/* Confirm */}
          <input
            name="confirm"
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl"
          />

          <button
            disabled={isPending}
            className="w-full py-3 bg-[#003366] text-white rounded-xl"
          >
            {isPending ? "Updating..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
