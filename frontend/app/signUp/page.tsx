"use client";

import { googlesignin, signup } from "@/action/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [state, action] = useActionState(signup, undefined);

  useEffect(() => {
    if (!state) return;

    if (state.statusCode === 200) {
      toast.success(state.message || "Signup successful", {
        duration: 5000,
      });

      router.push("/dashboard"); // ✅ correct
    } else if (state.message) {
      toast.error(state.message || "Signup failed. Please try again.", {
        duration: 5000,
      });
    }
  }, [state?.message, state?.statuscode]);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center px-4 py-10">
      {/* --- THEMATIC HEADER --- */}
      <div className="w-full max-w-[900px] bg-[#003366] p-6 md:px-10 md:py-8 rounded-t-[2rem] flex items-center justify-between border-b border-white/10 shadow-2xl">
        <div className="flex items-center gap-3 md:gap-5">
          <div className="bg-white/10 p-1.5 rounded-xl backdrop-blur-sm border border-white/10 shrink-0">
            <img
              src="/images/logo.png"
              alt="EWU Logo"
              className="h-8 md:h-12 w-auto object-contain"
            />
          </div>
          <div className="flex flex-col text-left">
            <h2 className="text-white font-black text-sm md:text-xl leading-none tracking-tight uppercase">
              SCM <span className="text-[#C5A059]">CONFERENCE</span>
            </h2>
            <span className="text-white/60 text-[8px] md:text-[11px] tracking-[0.3em] mt-1 font-bold uppercase">
              INTERNATIONAL 2026
            </span>
          </div>
        </div>
        <div className="hidden sm:block">
          <p className="text-[#C5A059] text-[9px] font-black uppercase tracking-[0.2em]">
            Institutional Access
          </p>
        </div>
      </div>

      <div className="w-full max-w-[900px] bg-white rounded-b-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* LEFT PANEL */}
        <div className="hidden md:flex w-5/12 bg-[#003366] text-white flex-col justify-center p-10 relative overflow-hidden">
          {/* Subtle Background Accent */}
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none"></div>

          <h2 className="text-xl font-black uppercase mb-6 relative z-10">
            Researcher Portal
          </h2>

          <ul className="space-y-4 text-xs font-bold uppercase relative z-10">
            <li className="flex items-center gap-2">✓ Abstract Submission</li>
            <li className="flex items-center gap-2">✓ Peer Review Tracking</li>
            <li className="flex items-center gap-2">✓ Full Paper Submission</li>
          </ul>

          <p className="text-[10px] text-white/50 mt-10 uppercase relative z-10">
            © SCM Conference 2026
          </p>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full md:w-7/12 p-6 md:p-10">
          {/* Title */}
          <h3 className="text-xl md:text-2xl font-black text-[#003366] mb-2 uppercase">
            Create Account
          </h3>
          <p className="text-slate-500 text-xs mb-6 uppercase italic">
            Register for SCM Conference 2026
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
                <div className="text-red-500 text-[10px] mt-1 font-bold uppercase">
                  {state.error.name}
                </div>
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
                <div className="text-red-500 text-[10px] mt-1 font-bold uppercase">
                  {state.error.email}
                </div>
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
                <div className="text-red-500 text-[10px] mt-1 font-bold uppercase">
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
                className=" px-2 py-2 border border-slate-200 rounded-lg text-xs text-center flex-grow"
              />
            </div>

            {/* Terms & Legal Link */}
            <div className="flex items-center gap-2 text-[11px]">
              <input
                type="checkbox"
                id="terms"
                className="cursor-pointer h-3 w-3 accent-[#C5A059]"
              />
              <label className="text-slate-600 cursor-pointer" htmlFor="terms">
                I agree to{" "}
                <Link
                  href="/legal"
                  className="text-[#003366] font-bold underline hover:text-[#C5A059] transition-colors"
                >
                  Terms & Privacy
                </Link>
              </label>
            </div>

            {/* Button */}
            <button className="w-full py-3 cursor-pointer bg-[#C5A059] text-[#003366] rounded-xl font-black uppercase text-xs tracking-widest hover:bg-[#003366] hover:text-white transition-all shadow-lg active:scale-95">
              Register
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <Link
              href="/signin"
              className="text-xs text-[#C5A059] font-bold uppercase hover:text-[#003366] transition-colors"
            >
              Already have an account? Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
