import { Button } from "@/components/ui/button";
import FloatingInput from "@/components/ui/FloatingInput";
import FloatingSelect from "@/components/ui/FloatingSelect";
import Form from "@/components/ui/Form";
import { ROLE_ARRAY } from "@/lib/constants";
import {
  addUserServiceForAdmin,
  updateUserServiceForAdmin,
} from "@/lib/data-service";
import { AdminUserCreateFormSchema, Role, User } from "@/lib/type";
import {
  changeForSelectArray,
  changeForSelectObject,
  parseError,
} from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { useActionState, useEffect, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";

interface CreateUserFormProps {
  onCloseModal?: () => void;
  userToEdit?: Partial<User>;
}

interface CreateUserFormFields {
  name: string;
  email: string;
  role: { label: string; value: string };
}

const CreateUserForm = ({
  userToEdit = {},
  onCloseModal,
}: CreateUserFormProps) => {
  const { id: editId, ...editData } = userToEdit;
  const isEditSession = Boolean(editId);

  const updateUserWithId = updateUserServiceForAdmin.bind(null, editId!);

  const [state, action, isPending] = useActionState(
    isEditSession ? updateUserWithId : addUserServiceForAdmin,
    {
      success: false,
    },
  );

  const [isTransitioning, startTransition] = useTransition();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors: rhfErrors, isSubmitSuccessful },
  } = useForm<z.output<typeof AdminUserCreateFormSchema>>({
    resolver: zodResolver(AdminUserCreateFormSchema),
    defaultValues: isEditSession
      ? {
          ...editData,
          roleObj: changeForSelectObject(
            ROLE_ARRAY.find((item) => item.id === editData.role),
          ),
          is_active: editData.is_active === true,
        }
      : {
          roleObj: changeForSelectObject(
            ROLE_ARRAY.find((item) => item.id === Role.REVIEWER),
          ),
          is_active: true,
        },
  });

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "Data is saved");
      router.push("/admin/users");
      onCloseModal?.();
    }

    if (!state?.success && state?.errors) {
      toast.error(parseError(state.errors));
    }
  }, [state, onCloseModal, router]);

  const onSubmit = async (data: Record<string, any>) => {
    startTransition(async () => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "roleObj") return;
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });
      if (data.roleObj?.value) {
        formData.append("role", data.roleObj.value);
      }
      action(formData);
    });
  };

  function onError(error) {
    toast.error(parseError(state.errors));
  }

  const filterRoles = changeForSelectArray(ROLE_ARRAY);

  const isLoading = isPending || isTransitioning;

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="grid gap-8">
        <div className="space-y-3">
          <FloatingInput
            label="Name"
            {...register("name", { required: true })}
            defaultValue={state?.fields?.name}
            readOnly={isLoading}
            error={rhfErrors.name?.message}
          />
        </div>

        <div className="space-y-3">
          <FloatingInput
            label="Email"
            {...register("email", { required: true })}
            defaultValue={state?.fields?.email}
            readOnly={isLoading || isEditSession}
            error={rhfErrors.email?.message}
          />
        </div>

        <div className="space-y-3">
          <Controller
            name="roleObj"
            control={control}
            rules={{ required: "Role is required" }}
            render={({ field }) => (
              <FloatingSelect
                label="Role"
                options={filterRoles}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <div className="flex gap-6 item-center">
          <label htmlFor="is_active">Active</label>
          <input type="checkbox" id="is_active" {...register("is_active")} />
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </Form>
  );
};

export default CreateUserForm;
