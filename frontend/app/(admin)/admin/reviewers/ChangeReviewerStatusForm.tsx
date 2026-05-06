import { Button } from "@/components/ui/button";
import Form from "@/components/ui/Form";
import FormRow from "@/components/ui/FormRow";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateReviewerStatus } from "@/lib/data-service";
import { REVEIWER_USER_TYPE } from "@/lib/type";
import { useActionState, useTransition } from "react";
import { useForm } from "react-hook-form";

const ChangeReviewerStatusForm = ({
  reviewer,
}: {
  reviewer: REVEIWER_USER_TYPE;
}) => {
  const [state, action, isPending] = useActionState(updateReviewerStatus, {
    success: false,
  });

  const [isTransitioning, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: Record<string, any>) => {
    const formData = new FormData();

    for (const key in data) {
      const value = data[key];

      // Handle other fields
      formData.append(key, String(value));
    }

    const result = null;
  };
  const isLoading = isPending || isTransitioning;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-1">
        <FormRow>
          <Label htmlFor="is_active">Status</Label>
          <Input type="checkbox" />
        </FormRow>
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
};

export default ChangeReviewerStatusForm;
