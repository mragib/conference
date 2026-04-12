"use client";

import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { useConfirm } from "@/hooks/useConfirm";
import {
  COUNTRY_NAME,
  customSelectStyles,
  USER_TYPE_ARRAY,
} from "@/lib/constants";
import { createProfile } from "@/lib/data-service";
import { ProfileFormSchema, USER_TYPE } from "@/lib/type";
import { changeForSelectArray } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail, Save, User } from "lucide-react";
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";

import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "react-select";
import z from "zod";

const filterCountry = changeForSelectArray(COUNTRY_NAME);
const filterUserType = changeForSelectArray(USER_TYPE_ARRAY);
const ProfileForm = ({
  userEmail,
  user,
}: {
  userEmail: string;
  user?: any;
}) => {
  const [state, action, isPending] = useActionState(createProfile, {
    success: false,
  });

  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors: rhfErrors, isSubmitSuccessful },
  } = useForm<z.output<typeof ProfileFormSchema>>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      ...user,
      countryObj: filterCountry.find((c) => c.value === "BD"),
      user_typeObj: filterUserType.find((c) => c.value === USER_TYPE.ACADEMIC),
      ...(state?.fields ?? {}),
    },
    mode: "onTouched",
  });

  const { confirm, open, options, handleConfirm, handleCancel, setOpen } =
    useConfirm();
  const [isDisable, setIsDisable] = useState(!!user);

  useEffect(() => {
    if (isSubmitSuccessful && state?.success) {
      toast.success("Profile updated successfully!");
    }
  }, [isSubmitSuccessful, state?.success]);

  const onsubmit = async (data: z.output<typeof ProfileFormSchema>) => {
    const ok = await confirm({
      title: "Update Profile",
      description:
        "Are you sure you want to update your profile? This action cannot be undone.",
      confirmText: "Update",
    });

    if (!ok) return;
    startTransition(async () => {
      const formData = new FormData();

      // 1. Map over all keys
      Object.entries(data).forEach(([key, value]) => {
        // 2. Skip the fields that are objects (react-select)
        if (key === "countryObj" || key === "user_typeObj") return;

        // 3. Append strings/primitives
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });

      // 4. Manually append the specific .value from the Select objects
      if (data.countryObj?.value) {
        formData.append("country", data.countryObj.value);
      }
      if (data.user_typeObj?.value) {
        formData.append("user_type", data.user_typeObj.value);
      }

      // 6. Execute the action
      action(formData);
      setIsDisable(true);
    });
  };

  return (
    <>
      <ConfirmDialog
        open={open}
        setOpen={setOpen}
        options={options}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        disabled={isPending}
      />
      <form
        ref={formRef}
        onSubmit={handleSubmit(onsubmit)}
        className="max-w-4xl mx-auto bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 space-y-12 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#003366] via-[#C5A059] to-[#003366]" />

        {/* --- Basic Info --- */}
        <div className="space-y-8">
          <h2 className="text-xl font-black text-[#003366] uppercase tracking-tighter flex items-center gap-3">
            <User size={22} className="text-[#C5A059]" /> Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label
                className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1"
                htmlFor="first_name"
              >
                First Name
              </label>
              <input
                required
                type="text"
                readOnly={isDisable}
                id="first_name"
                {...register("first_name", { required: true })}
                defaultValue={state?.fields?.first_name}
                className={`${state?.errors?.first_name || rhfErrors.first_name?.message ? "border-red-500" : "border-slate-100"} input-style resize-none`}
              />
            </div>

            <div className="space-y-3">
              <label
                className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1"
                htmlFor="last_name"
              >
                Last Name
              </label>
              <input
                required
                type="text"
                readOnly={isDisable}
                id="last_name"
                defaultValue={state?.fields?.last_name}
                {...register("last_name", { required: true })}
                className={`${state?.errors?.last_name || rhfErrors.last_name?.message ? "border-red-500" : "border-slate-100"} input-style resize-none`}
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Email (Immutable)
              </label>
              <div className="w-full px-6 py-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-400 flex items-center gap-3 cursor-not-allowed font-bold">
                <Mail size={16} /> {userEmail}
              </div>
            </div>
            <div className="space-y-3">
              <label
                className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1"
                htmlFor="organization"
              >
                Organization
              </label>
              <input
                required
                type="text"
                readOnly={isDisable}
                id="organization"
                {...register("organization", { required: true })}
                defaultValue={state?.fields?.organization}
                className={`${state?.errors?.organization || rhfErrors.organization?.message ? "border-red-500" : "border-slate-100"} input-style resize-none`}
              />
            </div>

            <div className="space-y-3">
              <label
                className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1"
                htmlFor="designation"
              >
                Designation
              </label>
              <input
                required
                type="text"
                id="designation"
                readOnly={isDisable}
                {...register("designation", { required: true })}
                defaultValue={state?.fields?.designation}
                className={`${state?.errors?.designation || rhfErrors.designation?.message ? "border-red-500" : "border-slate-100"} input-style resize-none`}
              />
            </div>

            <div className="space-y-2">
              <label className="label" htmlFor="country">
                Country
              </label>
              <Controller
                name="countryObj"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    instanceId="country"
                    {...field}
                    options={filterCountry}
                    isMulti={false}
                    isDisabled={isDisable}
                    styles={customSelectStyles}
                  />
                )}
              />
            </div>

            <div className="space-y-2">
              <label className="label">User Type</label>
              <Controller
                name="user_typeObj"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    instanceId="user_type"
                    {...field}
                    options={filterUserType}
                    isMulti={false}
                    styles={customSelectStyles}
                    isDisabled={isDisable}
                  />
                )}
              />
            </div>
          </div>
        </div>

        <button
          disabled={isPending || isDisable}
          className="w-full py-5 bg-[#001A41] text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl shadow-2xl hover:bg-[#C5A059] hover:text-[#001A41] active:scale-[0.98] transition-all flex items-center justify-center gap-4 disabled:opacity-50"
        >
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <Save size={20} /> Update Profile
            </>
          )}
        </button>
      </form>
    </>
  );
};

export default ProfileForm;
