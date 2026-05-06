import { Button } from "@/components/ui/button";
import Form from "@/components/ui/Form";
import FormRow from "@/components/ui/FormRow";
import { Input } from "@/components/ui/input";
import { addReviewerService, updateReviewerService } from "@/lib/data-service";
import { ApiResponse, APIStatus, User } from "@/lib/type";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface CreateUserFormProps {
  onCloseModal?: () => void;
  userToEdit?: Partial<User>;
}

interface CreateUserFormFields {
  name: string;
  email: string;
}

const CreateUserForm = ({
  userToEdit = {},
  onCloseModal,
}: CreateUserFormProps) => {
  const [state, setState] = useState<ApiResponse>();

  const { id: editId, ...editData } = userToEdit;
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserFormFields>({
    defaultValues: isEditSession ? { ...editData } : {},
  });

  useEffect(() => {
    if (state?.status === APIStatus.SUCCESS) {
      toast.success(state.message || "User saved successfully");
      onCloseModal?.();
    } else if (state?.error || state?.status === APIStatus.FAIL) {
      toast.error(state?.message || "Failed to save User");
    }
  }, [state, onCloseModal]);

  const onSubmit = async (data: Record<string, any>) => {
    const formData = new FormData();

    for (const key in data) {
      const value = data[key];

      // Handle other fields
      formData.append(key, String(value));
    }

    const result = editId
      ? await updateReviewerService(undefined, editId, formData)
      : await addReviewerService(undefined, formData);

    setState(result);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Name" error={state?.error?.name}>
        <Input type="text" id="name" {...register("name")} />
      </FormRow>
      <FormRow label="Email" error={state?.error?.email}>
        <Input type="email" id="email" {...register("email")} />
      </FormRow>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
};

export default CreateUserForm;
