"use client";

import { googlesignin, signup } from "@/action/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

export default function SignupPage() {
  const [state, action] = useActionState(signup, undefined);

  useEffect(() => {
    if (state?.statuscode === 200) {
      toast.success(state.message, {
        duration: 5000,
      });
      redirect("/dashboard");
    } else if (state?.message) {
      toast.error(state?.message || "Signup failed. Please try again.", {
        duration: 5000,
      });
    }
  }, [state?.message]);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[900px] bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* LEFT PANEL */}
        <div className="hidden md:flex w-5/12 bg-[#003366] text-white flex-col justify-center p-10">
          <h2 className="text-xl font-black uppercase mb-6">
            Researcher Portal
          </h2>

          <ul className="space-y-4 text-xs font-bold uppercase">
            <li className="flex items-center gap-2">✓ Abstract Submission</li>
            <li className="flex items-center gap-2">✓ Peer Review Tracking</li>
            <li className="flex items-center gap-2">✓ Full Paper Submission</li>
          </ul>

          <p className="text-[10px] text-white/50 mt-10 uppercase">
            © DBA Conference 2026
          </p>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full md:w-7/12 p-6 md:p-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <img src="/images/logo.png" className="h-10" alt="Logo" />
            <div>
              <h2 className="text-[#003366] font-black uppercase text-lg">
                DBA <span className="text-[#C5A059]">CONFERENCE</span>
              </h2>
              <p className="text-[10px] text-slate-500 uppercase">
                INTERNATIONAL 2026
              </p>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-black text-[#003366] mb-2 uppercase">
            Create Account
          </h3>
          <p className="text-slate-500 text-xs mb-6 uppercase italic">
            Register for DBA Conference 2026
          </p>
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
            {/* Name */}
            <div className="relative group">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full pl-4 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#C5A059] outline-none text-sm"
              />
              {state?.error?.name && (
                <div className="text-red-500 text-sm">{state.error.name}</div>
              )}
            </div>

            {/* Email */}
            <div className="relative group">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full pl-4 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#C5A059] outline-none text-sm"
              />
              {state?.error?.email && (
                <div className="text-red-500 text-sm">{state.error.email}</div>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full pl-4 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#C5A059] outline-none text-sm"
              />
              {state?.error?.password && (
                <div className="text-red-500 text-xs mt-1 space-y-1">
                  {state.error.password}
                </div>
              )}
            </div>

            {/* Captcha */}
            <div className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="bg-white px-3 py-2 rounded-lg border text-xs font-bold text-[#003366]">
                4 + 6 =
              </div>
              <input
                type="number"
                placeholder="Sum"
                className=" px-2 py-2 border border-slate-200 rounded-lg text-xs text-center"
              />
            </div>

            {/* Terms */}
            <div className="flex items-center gap-2 text-xs">
              <input type="checkbox" id="terms" className="cursor-pointer" />
              <label className="text-slate-600 cursor-pointer" htmlFor="terms">
                I agree to Terms & Privacy
              </label>
            </div>

            {/* Button */}
            <button className="w-full py-3 cursor-pointer bg-[#C5A059] text-[#003366] rounded-xl font-black uppercase text-xs tracking-widest">
              Register
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <Link
              href="/signin"
              className="text-xs text-[#C5A059] font-bold uppercase"
            >
              Already have an account? Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
