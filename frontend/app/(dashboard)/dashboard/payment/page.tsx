"use client";
import { getPaymentAmount, inititePayment } from "@/lib/data-service";
import { RegistrationCategory } from "@/lib/type";
import { parseError } from "@/lib/utils";
import { ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const PaymentPage = () => {
  const [state, action, isPending] = useActionState(getPaymentAmount, {
    success: false,
  });
  const [paymentState, paymentAction, paymentPending] = useActionState(
    inititePayment,
    {
      success: false,
    },
  );
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors: rhfErrors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      registration_category: RegistrationCategory.WITHOUT_PAPER,
    },
  });
  const [isTransitioning, startTransition] = useTransition();

  const category = watch("registration_category");

  useEffect(() => {
    if (!category) return;

    const formData = new FormData();
    formData.append("registration_category", category);

    startTransition(() => {
      action(formData);
    });
  }, [category]);

  const router = useRouter();

  useEffect(() => {
    if (paymentState?.success) {
      toast.success("Transaction Created successfully!");
      if (paymentState.data?.gatewayUrl) {
        window.location.href = paymentState.data.gatewayUrl;
      }
    }

    if (!paymentState?.success && paymentState?.errors) {
      toast.error(parseError(paymentState.errors));
    }
  }, [paymentState, router]);

  const onsubmit = () => {
    const formData = new FormData();
    formData.append("registrationFeeId", String(state.data?.id));
    formData.append("registration_type", String(state.data?.registration_type));

    formData.append("amount", String(state.data?.amount));
    formData.append("currency", state.data?.currency ?? "");
    formData.append(
      "registration_category",
      state.data?.registration_category ?? "",
    );

    startTransition(() => {
      paymentAction(formData);
    });
  };

  const processing = isTransitioning || isPending;
  return (
    <div className="min-h-screen bg-[#F1F5F9] flex items-center justify-center p-6 font-sans">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-200">
        {/* Order Summary */}
        <div className="bg-[#001A41] p-12 text-white relative">
          <h2 className="text-[10px] font-black text-[#C5A059] uppercase tracking-[0.3em] mb-12">
            Checkout Summary
          </h2>
          <div className="space-y-6">
            <div>
              <p className="text-[9px] font-black uppercase text-slate-400 mb-1">
                Service
              </p>
              <p className="text-lg font-black uppercase tracking-tight">
                Conference Registration Fee
              </p>
            </div>
            <div className="pt-6 border-t border-white/10 flex justify-between items-end">
              {/* <label htmlFor="without_paper" className="cursor-pointer">
                Without Paper
              </label>
              <input
                type="radio"
                id="without_paper"
                value={RegistrationCategory.WITHOUT_PAPER}
                {...register("registration_category")}
              />
              <label className="cursor-pointer" htmlFor="with_paper">
                With Paper
              </label>

              <input
                type="radio"
                id="with_paper"
                value={RegistrationCategory.WITH_PAPER}
                {...register("registration_category")}
              /> */}
              <div className="">
                <p className="text-[9px] font-black uppercase text-slate-400 mb-4 tracking-widest">
                  Registration Category
                </p>

                <div className="space-y-3">
                  <label
                    htmlFor="without_paper"
                    className={`flex items-center justify-between p-5 rounded-2xl border cursor-pointer transition-all
      ${
        category === RegistrationCategory.WITHOUT_PAPER
          ? "border-[#C5A059] bg-white/10"
          : "border-white/10 hover:border-white/30"
      }`}
                  >
                    <div>
                      <p className="font-black uppercase tracking-wide text-sm">
                        Without Paper
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Attend conference only
                      </p>
                    </div>

                    <input
                      type="radio"
                      id="without_paper"
                      value={RegistrationCategory.WITHOUT_PAPER}
                      {...register("registration_category")}
                      className="h-5 w-5 accent-[#C5A059]"
                    />
                  </label>

                  <label
                    htmlFor="with_paper"
                    className={`flex items-center justify-between p-5 rounded-2xl border cursor-pointer transition-all
      ${
        category === RegistrationCategory.WITH_PAPER
          ? "border-[#C5A059] bg-white/10"
          : "border-white/10 hover:border-white/30"
      }`}
                  >
                    <div>
                      <p className="font-black uppercase tracking-wide text-sm">
                        With Paper
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Includes paper presentation
                      </p>
                    </div>

                    <input
                      type="radio"
                      id="with_paper"
                      value={RegistrationCategory.WITH_PAPER}
                      {...register("registration_category")}
                      className="h-5 w-5 accent-[#C5A059]"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 p-6 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-4">
            <ShieldCheck className="text-[#C5A059]" size={24} />
            <p className="text-[9px] font-medium leading-relaxed uppercase tracking-widest opacity-60">
              Secured by SSL Commerz 256-bit encryption protocol. Your
              transaction is safe.
            </p>
          </div>
        </div>

        {/* Payment Selection */}

        <div className="p-12 flex flex-col justify-center">
          <div className="mb-8">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-3">
              Registration Fee
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8">
              <p className="text-sm font-semibold text-slate-500 mb-2">
                Total Amount
              </p>

              <div className="flex items-end gap-2">
                <h2 className="text-5xl font-black text-[#003366] leading-none">
                  {state.data?.amount?.toLocaleString() || "—"}
                </h2>

                <span className="text-lg font-bold text-slate-500 mb-1">
                  {state.data?.currency || "BDT"}
                </span>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Category</span>
                  <span className="font-bold text-[#003366]">
                    {state.data?.registration_category?.replaceAll("_", " ")}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">User Type</span>
                  <span className="font-bold text-[#003366]">
                    {state.data?.user_type}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Registration Type</span>
                  <span className="font-bold text-[#003366]">
                    {state.data?.registration_type}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit(onsubmit)}>
            <button
              disabled={processing || !state.data?.amount}
              className="w-full py-5 bg-[#003366] text-white rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] shadow-xl hover:bg-[#C5A059] hover:text-[#001A41] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {processing ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  Initialize Payment
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
          <p className="text-center text-xs text-slate-400 mt-4">
            Secure payment powered by SSLCommerz
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
