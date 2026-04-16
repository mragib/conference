"use client";

import { googlesignin, signup } from "@/action/auth";
import { CheckCircle2, Eye, EyeOff, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [state, action] = useActionState(signup, undefined);
  const modalRef = useRef<HTMLDivElement>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!state) return;
    if (state.statusCode === 200) {
      toast.success(state.message || "Signup successful", { duration: 5000 });
      router.push("/dashboard");
    } else if (state.message || state.error) {
      toast.error(state.message || "Signup failed.", {
        duration: 5000,
      });
    }
  }, [state, router]);

  const handleClose = () => router.back();

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (formRef.current && !formRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  const formRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-[#001021] p-2 md:p-4"
      onClick={handleOutsideClick}
    >
      {/* HIDDEN SCROLLBAR STYLE */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Background Accents */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#C5A059]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#003366]/40 rounded-full blur-[120px] pointer-events-none" />

      <div
        ref={formRef}
        className="w-full max-w-[950px] max-h-[98vh] md:max-h-[90vh] bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-2xl overflow-hidden flex flex-col relative z-10 animate-in fade-in zoom-in duration-500 border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* THEMATIC HEADER - Shrink-0 prevents it from squishing */}
        <div className="w-full bg-[#003366] p-4 md:px-10 md:py-5 flex items-center justify-between border-b border-white/10 relative overflow-hidden shrink-0">
          <div className="flex items-center gap-4 md:gap-6 relative z-10">
            <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm border border-white/10 shrink-0">
              <img
                src="/images/logo.png"
                alt="Logo"
                className="h-8 md:h-10 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col text-left">
              <h2 className="text-white font-black text-sm md:text-lg leading-none tracking-tight uppercase">
                SCM <span className="text-[#C5A059]">CONFERENCE</span>
              </h2>
              {/* <span className="text-white/60 text-[8px] md:text-[10px] tracking-[0.2em] mt-1 font-bold uppercase">
                INTERNATIONAL 2026
              </span> */}
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-white/40 hover:text-white transition-colors p-2 cursor-pointer bg-white/5 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* LEFT PANEL */}
          <div className="hidden md:flex w-5/12 bg-[#003366] text-white flex-col justify-center p-12 relative overflow-hidden h-full shrink-0">
            <div className="flex items-center gap-3 mb-8 relative z-10">
              <Sparkles size={24} className="text-[#C5A059]" />
              <h2 className="text-2xl font-black uppercase tracking-tight">
                Portal
              </h2>
            </div>
            <ul className="space-y-6 text-[12px] font-black uppercase tracking-widest relative z-10">
              <li className="flex items-center gap-4">
                <CheckCircle2 size={20} className="text-[#C5A059]" /> Abstract
                Submission
              </li>
              <li className="flex items-center gap-4">
                <CheckCircle2 size={20} className="text-[#C5A059]" /> Peer
                Review Tracking
              </li>
              <li className="flex items-center gap-4">
                <CheckCircle2 size={20} className="text-[#C5A059]" /> Full Paper
                Submission
              </li>
            </ul>
          </div>

          {/* RIGHT PANEL - NO SCROLLBAR */}
          <div className="w-full md:w-7/12 p-6 md:p-10 md:pt-12 bg-white flex flex-col overflow-y-auto no-scrollbar">
            <div className="mb-6 shrink-0">
              {/* 🚀 FIXED: Standardized Title Size to prevent overlap */}
              <h3 className="text-xl md:text-2xl font-black text-[#003366] uppercase tracking-tighter leading-none">
                Create Account
              </h3>
              <p className="text-slate-400 text-[9px] font-bold uppercase italic tracking-wider mt-1.5">
                Join SCM Conference 2026
              </p>
            </div>

            <form action={googlesignin} className="shrink-0 mb-6">
              <button className="w-full cursor-pointer flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-black text-[10px] uppercase tracking-widest text-slate-700 active:scale-[0.98]">
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  className="w-4 h-4"
                  alt="G"
                />
                Continue with Google
              </button>
            </form>

            <form action={action} className="space-y-4">
              {/* 🚀 FIXED: Placeholder style only, Smaller Font size */}
              <input
                type="text"
                name="name"
                required
                placeholder="FULL NAME"
                className="w-full px-5 py-3 border border-slate-200 bg-slate-50/30 rounded-xl focus:ring-1 focus:ring-[#C5A059] outline-none text-xs font-bold text-slate-800 uppercase placeholder:text-[#003366]/30 placeholder:tracking-[0.15em]"
              />

              <input
                type="email"
                name="email"
                required
                placeholder="EMAIL ADDRESS"
                className="w-full px-5 py-3 border border-slate-200 bg-slate-50/30 rounded-xl focus:ring-1 focus:ring-[#C5A059] outline-none text-xs font-bold text-slate-800 uppercase placeholder:text-[#003366]/30 placeholder:tracking-[0.15em]"
              />

              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="PASSWORD"
                  className="w-full px-5 py-3 border border-slate-200 bg-slate-50/30 rounded-xl focus:ring-1 focus:ring-[#C5A059] outline-none text-xs font-bold text-slate-800 uppercase placeholder:text-[#003366]/30 placeholder:tracking-[0.15em]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-slate-400 hover:text-[#003366] cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <p className="text-[9px] text-slate-400 font-bold ml-1 uppercase leading-none tracking-tight">
                Hint: Min 8 chars, 1 Uppercase, 1 Number.
              </p>

              <div className="flex items-center gap-3">
                <div className="bg-[#003366] text-[#C5A059] px-4 py-2.5 rounded-xl border border-[#C5A059]/20 text-[11px] font-black shrink-0 shadow-md">
                  4 + 6 =
                </div>
                <input
                  type="number"
                  required
                  placeholder="SUM"
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black text-center text-[#003366] outline-none focus:ring-1 focus:ring-[#C5A059] transition-all placeholder:text-[#003366]/30"
                />
              </div>

              <div className="flex items-center gap-3 text-[10px] ml-1">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="cursor-pointer h-4 w-4 rounded border-slate-300 accent-[#003366]"
                />
                <label
                  className="text-slate-500 font-bold uppercase cursor-pointer"
                  htmlFor="terms"
                >
                  I agree to{" "}
                  <Link
                    href="/legal"
                    className="text-[#003366] underline decoration-[#C5A059] underline-offset-4 font-black"
                  >
                    Terms & Privacy
                  </Link>
                </label>
              </div>

              <button className="w-full py-4 mt-1 cursor-pointer bg-[#C5A059] text-[#003366] rounded-xl font-black uppercase text-xs md:text-sm tracking-[0.2em] hover:bg-[#003366] hover:text-white transition-all shadow-lg active:scale-95">
                Register
              </button>
            </form>

            <div className="mt-8 text-center border-t border-slate-100 pt-6 shrink-0">
              <Link
                href="/signin"
                className="text-[11px] text-[#C5A059] font-black uppercase tracking-widest hover:text-[#003366] transition-colors cursor-pointer"
              >
                Already have an account?{" "}
                <span className="underline underline-offset-4 font-black">
                  Sign In
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
