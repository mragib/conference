"use client";

import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import FloatingInput from "@/components/ui/FloatingInput";
import FloatingSelect from "@/components/ui/FloatingSelect";
import { useConfirm } from "@/hooks/useConfirm";
import { COUNTRY_NAME, USER_TYPE_ARRAY } from "@/lib/constants";
import { createProfile } from "@/lib/data-service";
import { ProfileFormSchema, USER_TYPE } from "@/lib/type";
import { changeForSelectArray } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save, User } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";

import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";

const filterCountry = changeForSelectArray(COUNTRY_NAME);
const filterUserType = changeForSelectArray(USER_TYPE_ARRAY);
const ProfileForm = ({
  userEmail,
  user,
  userName,
  forward,
}: {
  userEmail: string;
  userName?: string;
  user?: any;
  forward?: string;
}) => {
  const [state, action, isPending] = useActionState(createProfile, {
    success: false,
  });

  const formRef = useRef<HTMLFormElement>(null);

  const names = userName && userName.trim().split(/\s+/);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors: rhfErrors, isSubmitSuccessful },
  } = useForm<z.output<typeof ProfileFormSchema>>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      ...user,
      first_name:
        !user && names ? names.slice(0, -1).join(" ") : user.first_name,
      last_name: !user && names ? names[names?.length - 1] : user.last_name,
      email: userEmail,
      countryObj: filterCountry.find((c) => c.value === "BD"),
      user_typeObj: filterUserType.find((c) => c.value === USER_TYPE.ACADEMIC),
      ...(state?.fields ?? {}),
    },
    mode: "onTouched",
  });

  const { confirm, open, options, handleConfirm, handleCancel, setOpen } =
    useConfirm();
  const [isDisable, setIsDisable] = useState(!!user);

  const router = useRouter();

  useEffect(() => {
    if (isSubmitSuccessful && state?.success) {
      toast.success("Profile updated successfully!");
      if (forward) router.push(forward);
    }
  }, [isSubmitSuccessful, state?.success, router, forward]);

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
      Object.entries(data).forEach(([key, value]) => {
        if (key === "countryObj" || key === "user_typeObj") return;
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });
      if (data.countryObj?.value) {
        formData.append("country", data.countryObj.value);
      }
      if (data.user_typeObj?.value) {
        formData.append("user_type", data.user_typeObj.value);
      }
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
            <div className="space-y-3">
              <FloatingInput
                label="First Name"
                {...register("first_name", { required: true })}
                defaultValue={state?.fields?.first_name}
                readOnly={isDisable}
                error={rhfErrors.first_name?.message}
              />
            </div>
            <div className="space-y-3">
              <FloatingInput
                label="Last Name"
                {...register("last_name", { required: true })}
                defaultValue={state?.fields?.last_name}
                readOnly={isDisable}
                error={rhfErrors.last_name?.message}
              />
            </div>

            <div className="space-y-3">
              <FloatingInput
                label="Email"
                {...register("email", { required: true })}
                defaultValue={state?.fields?.email}
                readOnly={true}
                error={rhfErrors.email?.message}
              />
            </div>

            <div className="space-y-3">
              <FloatingInput
                label="Contact Number"
                {...register("contact_number", { required: true })}
                defaultValue={state?.fields?.contact_number}
                readOnly={isDisable}
                error={rhfErrors.contact_number?.message}
              />
            </div>

            <div className="space-y-3">
              <FloatingInput
                label="Organization"
                {...register("organization", { required: true })}
                defaultValue={state?.fields?.organization}
                readOnly={isDisable}
                error={rhfErrors.organization?.message}
              />
            </div>

            <div className="space-y-3">
              <FloatingInput
                label="Designation"
                {...register("designation", { required: true })}
                defaultValue={state?.fields?.designation}
                readOnly={isDisable}
                error={rhfErrors.designation?.message}
              />
            </div>

            <div className="space-y-2">
              <Controller
                name="countryObj"
                control={control}
                rules={{ required: "Country is required" }}
                render={({ field }) => (
                  <FloatingSelect
                    label="Country"
                    options={filterCountry}
                    value={field.value}
                    onChange={field.onChange}
                    isDisabled={isDisable}
                    error={rhfErrors.countryObj?.message}
                  />
                )}
              />
            </div>

            <div className="space-y-2">
              <Controller
                name="user_typeObj"
                control={control}
                rules={{ required: "Participant Group  is required" }}
                render={({ field }) => (
                  <FloatingSelect
                    label="Participant Group "
                    options={filterUserType}
                    value={field.value}
                    onChange={field.onChange}
                    isDisabled={isDisable}
                    error={rhfErrors.countryObj?.message}
                  />
                )}
              />
            </div>

            {/* <div className="space-y-2">
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
            </div> */}
          </div>
        </div>

        <button
          disabled={isPending || isDisable}
          className="w-full cursor-pointer py-5 bg-[#001A41] text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl shadow-2xl hover:bg-[#C5A059] hover:text-[#001A41] active:scale-[0.98] transition-all flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
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
