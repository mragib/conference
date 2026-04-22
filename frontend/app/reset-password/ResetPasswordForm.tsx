"use client";

import { resetPassword } from "@/action/auth";
import PasswordStrength from "@/components/PasswordStrength";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
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

      // 🔥 redirect to dashboard (AUTO LOGIN)
      router.push("/dashboard");
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
            <div className="relative">
              <input
                name="password"
                type={showPass ? "text" : "password"}
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl"
              />

              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-3 text-gray-500 cursor-pointer"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* 🔥 Strength */}
            <PasswordStrength password={password} />
          </div>

          {/* Confirm */}
          <div className="relative">
            <input
              name="confirm"
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl"
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-3 text-gray-500 cursor-pointer"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            disabled={isPending}
            className="w-full py-3 bg-[#003366] text-white rounded-xl cursor-pointer"
          >
            {isPending ? "Updating..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
