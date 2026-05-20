import FloatingInput from "@/components/ui/FloatingInput";
import FloatingSelect from "@/components/ui/FloatingSelect";
import Form from "@/components/ui/Form";
import { changeAbstractReviewer } from "@/lib/data-service";
import { AbstractReviewerChangeSchema, REVEIWER_USER_TYPE } from "@/lib/type";
import { parseError } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";

interface ChangeAbstractReviewerFormProps {
  onCloseModal?: () => void;

  abstract: any;
  reviewers: REVEIWER_USER_TYPE[];
}

export const ChangeAbstractReviewerForm = ({
  abstract,
  reviewers,
  onCloseModal,
}: ChangeAbstractReviewerFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors: rhfErrors, isSubmitSuccessful },
  } = useForm<z.output<typeof AbstractReviewerChangeSchema>>({
    resolver: zodResolver(AbstractReviewerChangeSchema),
    defaultValues: {
      abstractId: abstract.id,
    },
  });

  const [state, action, isPending] = useActionState(changeAbstractReviewer, {
    success: false,
  });
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "New Reviewer Assign");
      onCloseModal?.();
      router.push("/admin/abstracts");
    }

    if (!state?.success && state?.errors) {
      toast.error(parseError(state.errors));
    }
  }, [state]);

  const [isTransitioning, startTransition] = useTransition();

  const isLoading = isTransitioning || isPending;

  const filterdata = reviewers
    .filter((item) => item.is_active)
    .map((item) => {
      return {
        value: item.id,
        label: item.user.name,
      };
    });

  const onsubmit = async (
    data: z.output<typeof AbstractReviewerChangeSchema>,
  ) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "reviewerObj") return;
      else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    if (data.reviewerObj?.value) {
      formData.append("reviewerId", data.reviewerObj.value);
    }

    startTransition(() => {
      action(formData);
    });
  };

  function onError(errors: any) {
    console.log(errors);
    toast.error(parseError(errors));
  }

  return (
    <Form onSubmit={handleSubmit(onsubmit, onError)}>
      <div className="grid gap-8">
        <div className="space-y-3">
          <FloatingInput label="Abstract" value={abstract.title} readOnly />
        </div>
        <div className="space-y-3">
          <Controller
            name="reviewerObj"
            control={control}
            rules={{ required: "Reviewer is required" }}
            render={({ field }) => (
              <FloatingSelect
                label="Reviewer"
                options={filterdata}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>
        <button
          type="submit"
          className="btn-primary disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <Send size={18} /> Submit
            </>
          )}
        </button>
      </div>
    </Form>
  );
};
