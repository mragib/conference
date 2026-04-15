"use client";

import { RotateCcw, Send, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [captcha, setCaptcha] = useState({ a: 0, b: 0, userAns: "" });
  const formRef = useRef<HTMLDivElement>(null);

  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (params.get("error") === "unauthorized") {
      toast.error("Invalid email", { duration: 5000 });
    }
  }, [params]);

  const generateCaptcha = () => {
    setCaptcha({
      a: Math.floor(Math.random() * 10) + 1,
      b: Math.floor(Math.random() * 10) + 1,
      userAns: "",
    });
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleClose = () => {
    router.back(); // Or router.push('/signin')
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (formRef.current && !formRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isCaptchaCorrect =
      parseInt(captcha.userAns) === captcha.a + captcha.b;

    if (!isCaptchaCorrect) {
      toast.error("Mathematical verification failed.");
      return;
    }

    router.push(`/otp?email=${email}`);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-black/70 p-4 backdrop-blur-sm transition-all duration-300"
      onClick={handleOutsideClick}
    >
      <div
        ref={formRef}
        className="bg-white w-full max-w-md rounded-[1.5rem] md:rounded-[2rem] shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300"
      >
        {/* Header */}
        <div className="w-full bg-[#003366] p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-1.5 rounded-lg">
              <img
                src="/images/logo.png"
                alt="Logo"
                className="h-8 md:h-10 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-white font-black text-sm md:text-lg leading-none tracking-tight uppercase">
                SCM <span className="text-[#C5A059]">CONFERENCE</span>
              </h2>
              {/* <span className="text-white/60 text-[8px] md:text-[10px] tracking-[0.15em] mt-1 font-medium uppercase">
                INTERNATIONAL 2026
              </span> */}
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-white/50 hover:text-white transition-colors p-2 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 flex flex-col justify-center">
          <h3 className="text-xl md:text-2xl font-black text-[#003366] uppercase tracking-tighter leading-none mb-2">
            Recover Password
          </h3>
          <p className="text-slate-500 text-[10px] md:text-xs font-medium mt-1 uppercase italic">
            Enter your email to reset your password
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <div className="relative group">
              <input
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Email Address"
                className="w-full pl-4 pr-4 py-3 md:py-4 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#C5A059] focus:border-[#C5A059] outline-none text-xs md:text-sm font-bold text-[#003366] transition-all"
              />
            </div>

            {/* Math CAPTCHA */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-slate-100 shadow-sm shrink-0">
                <span className="text-xs md:text-sm font-black text-[#003366] tracking-widest">
                  {captcha.a} + {captcha.b} =
                </span>
              </div>
              <input
                type="number"
                required
                placeholder="Sum"
                value={captcha.userAns}
                onChange={(e) =>
                  setCaptcha({ ...captcha, userAns: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#C5A059] outline-none text-xs md:text-sm font-bold text-center transition-all"
              />
              <button
                type="button"
                onClick={generateCaptcha}
                className="p-2 text-slate-400 hover:text-[#C5A059] transition-colors cursor-pointer"
                title="Refresh Captcha"
              >
                <RotateCcw size={18} />
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 md:py-4 rounded-xl font-black shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 bg-[#003366] text-white text-xs md:text-sm uppercase tracking-widest cursor-pointer active:scale-[0.98] hover:bg-[#002147]"
            >
              <Send size={16} />
              Send Link
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
