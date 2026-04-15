"use client";

import { googlesignin, signin } from "@/action/auth";
import { Eye, EyeOff, Lock, Mail, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [state, action] = useActionState(signin, undefined);
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (state?.message) {
      toast.error(state.message, {
        duration: 5000,
      });
    }
  }, [state?.message]);

  const handleClose = () => {
    router.back();
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  return (
    <div
      className="min-h-screen p-4 flex items-center justify-center relative overflow-hidden bg-[#001021]"
      onClick={handleOutsideClick}
    >
      {/* Thematic Background Accents */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#C5A059]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#003366]/40 rounded-full blur-[120px] pointer-events-none" />

      <div
        ref={modalRef}
        className="w-full max-w-[450px] bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-2xl overflow-hidden relative z-10 animate-in fade-in zoom-in duration-500 border border-white/10"
      >
        {/* Header */}
        <div className="w-full bg-[#003366] p-4 flex items-center justify-between border-b border-white/10 relative overflow-hidden shrink-0">
          <img
            src="/images/logo.png"
            className="absolute -right-2 -bottom-2 w-16 h-16 opacity-5 pointer-events-none"
            alt=""
          />

          <div className="flex items-center gap-3 relative z-10">
            <div className="bg-white/10 p-1.5 rounded-lg border border-white/10 backdrop-blur-md">
              <img
                src="/images/logo.png"
                alt="Logo"
                className="h-8 md:h-10 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-white font-black text-sm md:text-lg uppercase tracking-tight leading-none">
                SCM <span className="text-[#C5A059]">CONFERENCE</span>
              </h2>
              <span className="text-white/60 text-[8px] md:text-[10px] tracking-[0.15em] mt-1 uppercase font-medium">
                INTERNATIONAL 2026
              </span>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="text-white/40 hover:text-white transition-colors p-2 cursor-pointer bg-white/5 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 md:p-10 flex flex-col justify-center">
          <div className="mb-6 text-center shrink-0">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Sparkles size={14} className="text-[#C5A059]" />
              <h3 className="text-xl md:text-2xl font-black text-[#003366] uppercase tracking-tighter leading-none">
                Login
              </h3>
            </div>
            <div className="w-8 h-1 bg-[#C5A059] mx-auto rounded-full mb-2" />
            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider italic">
              Access your researcher dashboard
            </p>
          </div>

          <form action={googlesignin} className="shrink-0 mb-4">
            <button className="w-full cursor-pointer flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-[#C5A059]/30 transition-all font-black text-[10px] uppercase tracking-widest text-slate-700 shadow-sm active:scale-[0.98]">
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                className="w-4 h-4"
                alt="G"
              />
              Continue with Google
            </button>
          </form>

          <form action={action} className="space-y-4">
            {state?.message && (
              <p className="text-red-500 text-[11px] font-bold text-center bg-red-50 py-2 rounded-lg border border-red-100">
                {state.message}
              </p>
            )}

            {/* Email - Label integrated inside box */}
            <div className="relative px-4 py-2.5 border border-slate-100 bg-slate-50/50 rounded-xl focus-within:ring-2 focus-within:ring-[#C5A059]/20 focus-within:border-[#C5A059] transition-all group">
              <label className="block text-[9px] font-black text-[#003366] uppercase tracking-widest mb-0.5 ml-1">
                Email Address
              </label>
              <div className="flex items-center">
                <Mail className="text-slate-400 group-focus-within:text-[#C5A059] w-4 h-4 mr-3" />
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-transparent outline-none text-[11px] md:text-xs font-bold text-[#003366]"
                />
              </div>
            </div>

            {/* Password - Label integrated inside box + Eye Toggle */}
            <div className="relative px-4 py-2.5 border border-slate-100 bg-slate-50/50 rounded-xl focus-within:ring-2 focus-within:ring-[#C5A059]/20 focus-within:border-[#C5A059] transition-all group">
              <div className="flex justify-between items-center mb-0.5 ml-1">
                <label className="text-[9px] font-black text-[#003366] uppercase tracking-widest">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[9px] font-black text-[#C5A059] hover:text-[#003366] uppercase cursor-pointer"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="flex items-center">
                <Lock className="text-slate-400 group-focus-within:text-[#C5A059] w-4 h-4 mr-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  name="password"
                  className="w-full bg-transparent outline-none text-[11px] md:text-xs font-bold text-[#003366]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-[#003366] cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Captcha */}
            <div className="flex items-center gap-3 p-1.5 bg-slate-50 border border-slate-100 rounded-xl">
              <div className="bg-[#003366] text-[#C5A059] px-3 py-1.5 rounded-lg border border-[#C5A059]/20 text-[10px] font-black shrink-0 shadow-md">
                3 + 5 =
              </div>
              <input
                type="number"
                required
                placeholder="SUM"
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-black text-center text-[#003366] outline-none focus:ring-1 focus:ring-[#C5A059] transition-all placeholder:text-[#003366]/30"
              />
            </div>

            <button className="w-full py-4 rounded-xl bg-[#003366] text-white font-black text-xs uppercase tracking-widest shadow-[0_10px_20px_rgba(0,51,102,0.2)] hover:bg-[#002147] transition-all cursor-pointer active:scale-[0.98]">
              Login to Dashboard
            </button>
          </form>

          <div className="mt-6 text-center border-t border-slate-50 pt-4 shrink-0">
            <Link
              href="/signup"
              className="text-[10px] font-black text-[#C5A059] hover:text-[#003366] uppercase tracking-wider transition-colors cursor-pointer"
            >
              New researcher?{" "}
              <span className="underline decoration-dotted underline-offset-4">
                Create Account
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
