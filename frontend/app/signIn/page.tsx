"use client";

import { googlesignin, signin } from "@/action/auth";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [state, action] = useActionState(signin, undefined);

  useEffect(() => {
    if (state?.message) {
      toast.error(state.message, {
        duration: 5000,
      });
    }
  }, [state?.message]);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
      <div className="w-full max-w-[450px] bg-white rounded-[2rem] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="w-full bg-[#003366] p-4 flex items-center gap-3 border-b border-white/10">
          <div className="bg-white/10 p-1.5 rounded-lg">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="h-8 md:h-10 w-auto object-contain"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-white font-black text-sm md:text-lg uppercase tracking-tight">
              DBA <span className="text-[#C5A059]">CONFERENCE</span>
            </h2>
            <span className="text-white/60 text-[8px] md:text-[10px] tracking-[0.15em] mt-1 uppercase">
              INTERNATIONAL 2026
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 md:p-10">
          {/* Title */}
          <div className="mb-6 text-center">
            <h3 className="text-xl md:text-2xl font-black text-[#003366] uppercase">
              Researcher Login
            </h3>
            <p className="text-slate-500 text-[10px] mt-1 uppercase italic">
              Access your dashboard
            </p>
          </div>

          {/* Google Button */}
          <form action={googlesignin} className="space-y-4">
            <button className="w-full cursor-pointer flex items-center justify-center gap-3 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-black text-[9px] uppercase tracking-widest text-slate-700 mb-4">
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                className="w-4 h-4"
                alt="G"
              />
              Continue with Google
            </button>
          </form>
          {/* Form */}
          <form action={action} className="space-y-4">
            {state?.message && (
              <p className="text-red-500 text-sm">{state.message}</p>
            )}
            {/* Email */}
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#C5A059] w-4 h-4" />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#C5A059] outline-none text-[11px] font-bold text-[#003366]"
              />
              {state?.error?.email && (
                <div className="text-red-500 text-sm">{state.error.email}</div>
              )}
            </div>

            {/* Password */}
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#C5A059] w-4 h-4" />

              <input
                type="password"
                placeholder="Password"
                name="password"
                className={`${state?.error?.password ? "border-red-500" : "border-slate-200"} w-full pl-10 pr-10 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#C5A059] outline-none text-[11px] font-bold text-[#003366]`}
              />
              {state?.error?.password && (
                <div className="text-red-500 text-sm">
                  {state.error.password}
                </div>
              )}
            </div>

            {/* Forgot */}
            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-[9px] font-black text-[#C5A059] hover:text-[#003366] uppercase cursor-pointer"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Captcha */}
            <div className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="bg-white px-3 py-2 rounded-lg border text-xs font-black text-[#003366]">
                3 + 5 =
              </div>
              <input
                type="number"
                placeholder="Sum"
                className="px-2 py-2 border border-slate-200 rounded-lg text-xs font-bold text-center outline-none"
              />
            </div>

            {/* Button */}
            <button className="w-full py-3 rounded-xl bg-[#003366] text-white font-black text-xs uppercase tracking-widest shadow-xl hover:opacity-90 transition">
              Login
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <Link
              href="/signup"
              className="text-[10px] font-black text-[#C5A059] uppercase"
            >
              New researcher? Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
