"use client";

import { setPassword } from "@/action/auth";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";

export default function SetPasswordForm({ token }: { token: string }) {
  const [password, setPass] = useState("");
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

      const res = await setPassword({ token, password });

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success("Account activated");

      router.push("/signin");
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black/70">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl">
        <h2 className="text-xl font-bold mb-4">Set Your Password</h2>

        <form action={handleSubmit} className="space-y-4">
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPass(e.target.value)}
            className="w-full p-3 border rounded-xl"
          />

          <input
            name="confirm"
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full p-3 border rounded-xl"
          />

          <button
            disabled={isPending}
            className="w-full py-3 bg-[#003366] text-white rounded-xl"
          >
            {isPending ? "Setting..." : "Set Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
