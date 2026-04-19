"use client";

import { otp as otpAction } from "@/action/auth";
import { OtpFormSchema } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useRef } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const OtpForm = ({ email }: { email: string }) => {
  const [state, action] = useActionState(otpAction, {
    success: false,
  });

  const formRef = useRef<HTMLFormElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors: rhfErrors, isSubmitSuccessful },
  } = useForm<z.output<typeof OtpFormSchema>>({
    resolver: zodResolver(OtpFormSchema),
    defaultValues: {
      email,
    },
    mode: "onTouched",
  });

  const onsubmit = async (data: z.output<typeof OtpFormSchema>) => {
    const formData = new FormData();

    // 1. Map over all keys
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    // 6. Execute the action
    action(formData);
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
                SCM <span className="text-[#C5A059]">CONFERENCE</span>
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
            Otp
          </h3>
          <p className="text-slate-500 text-xs font-medium mt-1 uppercase italic">
            Enter your otp
          </p>

          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit(onsubmit)}
            className="space-y-4 mt-6"
          >
            <div className="relative group">
              <input
                type="text"
                placeholder="otp"
                {...register("otp")}
                className={`"${state?.errors?.otp || rhfErrors.otp?.message ? "border-red-500" : "border-slate-100"} w-full pl-3 pr-4 py-3 border  rounded-xl focus:ring-1 focus:ring-[#C5A059] outline-none text-xs font-bold text-[#003366]`}
              />
            </div>
            <div className="relative group">
              <input
                type="hidden"
                {...register("email")}
                className="w-full pl-3 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#C5A059] outline-none text-xs font-bold text-[#003366]"
              />
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer py-4 rounded-xl font-black shadow-xl transition-all flex items-center justify-center gap-2 bg-[#003366] text-white text-sm uppercase tracking-widest"
            >
              Verify otp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpForm;
