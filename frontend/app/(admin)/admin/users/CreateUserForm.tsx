import { Button } from "@/components/ui/button";
import Form from "@/components/ui/Form";
import FormRow from "@/components/ui/FormRow";
import { Input } from "@/components/ui/input";
import { addReviewerService } from "@/lib/data-service";
import { ApiResponse, APIStatus, REVEIWER_USER, Topic } from "@/lib/type";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface CreateUserFormProps {
  onCloseModal?: () => void;
  userToEdit?: Partial<REVEIWER_USER>;
  topics: Topic[];
}

const CreateUserForm = ({
  userToEdit = {},
  onCloseModal,
  topics,
}: CreateUserFormProps) => {
  const [state, setState] = useState<ApiResponse>();

  const { id: editId, ...editData } = userToEdit;
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: isEditSession
      ? { ...editData, topic: editData.topic?.map((t) => t.id) }
      : {},
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

    let selectedTopics: any[] = [];

    if (Array.isArray(data.topic)) {
      selectedTopics = topics
        .filter((t) => data.topic.includes(t.id))
        .map((t) => ({
          id: t.id,
          name: t.name,
        }));
    }

    for (const key in data) {
      const value = data[key];
      if (key === "topic") continue;

      // Handle other fields
      formData.append(key, String(value));
    }
    formData.append("topic", JSON.stringify(selectedTopics));
    const result = await addReviewerService(undefined, formData);

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

      {topics.length > 0 &&
        topics.map((topic) => (
          <FormRow key={topic.id} label={topic.name} htmlFor={topic.id}>
            <Input
              type="checkbox"
              id={topic.id}
              value={topic.id}
              {...register("topic")}
            />

            {state?.error?.is_active && (
              <p className="text-red-500 text-sm">{state.error.is_active}</p>
            )}
          </FormRow>
        ))}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
};

export default CreateUserForm;
