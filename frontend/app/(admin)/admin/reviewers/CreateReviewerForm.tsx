"use client";

import FloatingInput from "@/components/ui/FloatingInput";
import { createReviewer } from "@/lib/data-service";
import { ReviewerUserSchema } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";

interface CreateReviewerFormProps {
  onCloseModal?: () => void;
  reviewerToEdit?: Partial<REVEIWER_USER>;
}

const CreateReviewerForm = ({
  reviewerToEdit = {},
  onCloseModal,
}: CreateReviewerFormProps) => {
  const [state, action, isPending] = useActionState(createReviewer, {
    success: false,
  });

  const [isTransitioning, startTransition] = useTransition();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors: rhfErrors, isSubmitSuccessful },
  } = useForm<z.output<typeof ReviewerUserSchema>>({
    resolver: zodResolver(ReviewerUserSchema),
    defaultValues: {},
    mode: "onTouched",
  });

  useEffect(() => {
    if (!state) return;
    if (!state.success && !state.errors) return;
    if (state?.success) {
      toast.success("Reviewer created successfully!");
      //   redirect("/dashboard/abstracts");
      onCloseModal?.();
      router.push("/admin/reviewers");
    }

    if (!state?.success && state?.errors) {
      if (typeof state.errors === "string") {
        toast.error(state.errors);
      } else if (Array.isArray(state.errors)) {
        toast.error(state.errors[0]);
      } else if (typeof state.errors === "object") {
        const firstError = Object.values(state.errors)[0];
        if (Array.isArray(firstError)) {
          toast.error(firstError[0]);
        } else {
          toast.error(firstError as string);
        }
      }
    }
  }, [state]);

  const isLoading = isPending || isTransitioning;
  const onsubmit = async (data: z.output<typeof ReviewerUserSchema>) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
    startTransition(() => {
      action(formData);
    });
  };
  function onError(errors: any) {
    console.log(errors);
  }
  return (
    <form
      onSubmit={handleSubmit(onsubmit, onError)}
      className="space-y-8 w-full"
    >
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-[#003366] border-b pb-2">
          Reviewer Information
        </h2>
        <div className="grid gap-8">
          {/* Reviewer Name */}
          <div className="space-y-1">
            <FloatingInput
              label="Reviewer Name"
              {...register("name", { required: true })}
              error={rhfErrors.name?.message}
            />
          </div>

          <div className="space-y-1">
            <FloatingInput
              label="Reviewer Email"
              {...register("email", { required: true })}
              error={rhfErrors.email?.message}
            />
          </div>

          <div className="space-y-1">
            <FloatingInput
              label="Reviewer Order"
              type="number"
              {...register("display_order", {
                required: true,
                valueAsNumber: true,
              })}
              error={rhfErrors.display_order?.message}
            />
          </div>
        </div>

        <button type="submit" className="btn-primary" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="animate-spin" size={14} />
          ) : (
            <Send size={14} />
          )}
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default CreateReviewerForm;
