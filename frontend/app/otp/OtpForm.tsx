import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const OtpForm = () => {
  const [otp, setOtp] = useState("");
  const [captcha, setCaptcha] = useState({ a: 0, b: 0, userAns: "" });

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isCaptchaCorrect =
      parseInt(captcha.userAns) === captcha.a + captcha.b;
    if (!isCaptchaCorrect) {
      toast.error("Mathematical verification failed.");
      generateCaptcha();
      return;
    }
    redirect("/reset-password");
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-black/70 p-4">
      <div className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="w-full bg-[#003366] p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-1.5 rounded-lg">
              <img
                src="/images/logo.png"
                alt="Logo"
                className="h-10 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-white font-black text-lg leading-none tracking-tight uppercase">
                CONFERENCE <span className="text-[#C5A059]">DBA</span>
              </h2>
              <span className="text-white/60 text-[10px] tracking-[0.15em] mt-1 font-medium uppercase">
                INTERNATIONAL 2026
              </span>
            </div>
          </div>
          <button className="text-white/50 hover:text-white p-2">X</button>
        </div>

        {/* Body */}
        <div className="p-8 flex flex-col justify-center">
          <h3 className="text-xl md:text-2xl font-black text-[#003366] uppercase tracking-tighter leading-none mb-2">
            Recover Password
          </h3>
          <p className="text-slate-500 text-xs font-medium mt-1 uppercase italic">
            Enter your email to reset your password
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <div className="relative group">
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Email Address"
                className="w-full pl-3 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#C5A059] outline-none text-xs font-bold text-[#003366]"
              />
            </div>

            {/* Math CAPTCHA */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-slate-100 shadow-sm shrink-0">
                <span className="text-sm font-black text-[#003366] tracking-widest">
                  {captcha.a} + {captcha.b} =
                </span>
              </div>
              <input
                type="number"
                placeholder="Sum"
                value={captcha.userAns}
                onChange={(e) =>
                  setCaptcha({ ...captcha, userAns: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#C5A059] outline-none text-sm font-bold text-center"
              />
              <button
                type="button"
                className="p-2 text-slate-400 hover:text-[#C5A059]"
              >
                ⟳
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl font-black shadow-xl transition-all flex items-center justify-center gap-2 bg-[#003366] text-white text-sm uppercase tracking-widest"
            >
              Send Link
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpForm;
