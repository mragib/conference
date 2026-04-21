"use client";
import { RichEditor } from "@/components/RichEditor";
import FloatingInput from "@/components/ui/FloatingInput";
import FloatingSelect from "@/components/ui/FloatingSelect";
import { createAbstract } from "@/lib/data-service";
import { AbstractFormSchema, Topic } from "@/lib/type";
import { changeForSelectArray } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Trash } from "lucide-react";
import { useActionState, useEffect, useRef } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";

const AbstractSubmitForm = ({
  topics,
  user,
}: {
  topics: Topic[];
  user: any;
}) => {
  const [state, action, isPending] = useActionState(createAbstract, {
    success: false,
  });

  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors: rhfErrors, isSubmitSuccessful },
  } = useForm<z.output<typeof AbstractFormSchema>>({
    resolver: zodResolver(AbstractFormSchema),
    defaultValues: {
      description: "",
      co_authors: [
        {
          first_name: user.data.first_name,
          last_name: user.data.last_name,
          email: user.email,
          organization: user.data.organization,
        },
      ],
    },
    mode: "onTouched",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "co_authors",
  });

  useEffect(() => {
    if (isSubmitSuccessful && state?.success) {
      toast.success("Abstract created successfully!");
    }
  }, [isSubmitSuccessful, state?.success]);

  const filterTopics = changeForSelectArray(topics);

  const onsubmit = async (data: z.output<typeof AbstractFormSchema>) => {
    console.log(data);
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "topic") return;

      // 3. Append strings/primitives
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    if (data.topic?.value) {
      formData.append("topicId", data.topic.value);
    }
  };

  function onError(error) {
    console.log(error);
  }

  return (
    <form
      onSubmit={handleSubmit(onsubmit, onError)}
      className="space-y-8 w-full"
    >
      {/* ===== BASIC INFO ===== */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-[#003366] border-b pb-2">
          Basic Information
        </h2>
        <div className="grid gap-8">
          {/* Title */}
          <div className="space-y-1">
            <FloatingInput
              label="Research Title"
              {...register("title", { required: true })}
              error={rhfErrors.title?.message}
            />

            <p className="text-xs text-slate-500 leading-relaxed">
              The title should be concise, informative and reflective of the
              main focus of the study
            </p>
          </div>

          {/* Topic */}
          <div className="space-y-1">
            <Controller
              name="topic"
              control={control}
              rules={{ required: "Sub theme is required" }}
              render={({ field }) => (
                <FloatingSelect
                  label="Sub Theme"
                  options={filterTopics}
                  value={field.value}
                  onChange={field.onChange}
                  error={rhfErrors.topic?.message}
                />
              )}
            />
            <p className="text-xs text-slate-500 leading-relaxed">
              Please select sub theme that describe your abstract
            </p>
          </div>

          {/* Keywords */}
          <div className="space-y-1">
            <FloatingInput
              label="Keywords"
              {...register("keyword", { required: true })}
              error={rhfErrors.keyword?.message}
            />
            <p className="text-xs text-slate-500 leading-relaxed">
              Provide up to six relevant keywords that reflect the core themes
              of the study.(seperated by comma)
            </p>
          </div>

          {/* Abstract */}
          {/* <div className="space-y-2">
          <label className="label">Abstract</label>
          <textarea
            {...register("description", { required: true, maxLength: 750 })}
            rows={5}
            placeholder="Write your abstract here..."
            className={`${errors.description ? "border-red-500" : "border-slate-100"} input-style resize-none`}
          />
          <p className="text-xs text-slate-500 leading-relaxed">
            A structured abstract (maximum 500-750 words) including the
            following elements: Purpose, Design/Methodology, Findings, Research
            Implications, Practical Implications
          </p>
        </div> */}
          <div className="space-y-3">
            <Controller
              name="description"
              control={control}
              rules={{ required: "Abstract is required" }}
              render={({ field }) => (
                <div className="space-y-2">
                  <RichEditor value={field.value} onChange={field.onChange} />
                  {rhfErrors.description && (
                    <p className="text-xs text-red-500">
                      {rhfErrors.description.message}
                    </p>
                  )}
                </div>
              )}
            />
            <ol className="text-xs list-disc text-slate-500 leading-relaxed list-inside">
              <li>Within 500-750 words</li>
              <li>Purpose</li>

              <li>Design/Methodology</li>
              <li>Findings</li>
              <li>Research Implications</li>
              <li>Practical Implications</li>
            </ol>
          </div>
        </div>
      </div>

      {/* ===== CO-AUTHORS ===== */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h2 className="text-lg font-semibold text-[#003366] mb-6 border-b pb-2">
          Authors
        </h2>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:shadow-sm transition
          grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_2fr_2fr_2fr_auto]"
            >
              <FloatingInput
                label="First Name"
                {...register(`co_authors.${index}.first_name`)}
              />

              <FloatingInput
                label="Last Name"
                {...register(`co_authors.${index}.last_name`)}
              />

              <FloatingInput
                label="Email"
                {...register(`co_authors.${index}.email`)}
              />

              <FloatingInput
                label="Organization"
                {...register(`co_authors.${index}.organization`)}
              />

              {index !== 0 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="flex items-center justify-center h-full px-3 rounded-lg text-red-500 hover:bg-red-100 transition cursor-pointer"
                >
                  <Trash size={18} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 mt-6 ">
          <button
            type="button"
            onClick={() =>
              append({
                first_name: "",
                last_name: "",
                email: "",
                organization: "",
              })
            }
            className="px-5 cursor-pointer py-2.5 rounded-xl bg-[#003366] text-white font-semibold hover:bg-[#002244] transition-all"
          >
            + Add Author
          </button>

          <button
            type="button"
            onClick={() =>
              reset({
                title: "",
                keyword: "",
                description: "",
                topic: undefined,
                co_authors: [
                  {
                    first_name: "",
                    last_name: "",
                    email: "",
                    organization: "",
                  },
                ],
              })
            }
            className="px-5 py-2.5 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all cursor-pointer"
          >
            Reset Form
          </button>
        </div>
      </div>

      {/* ===== SUBMIT ===== */}
      <button className="btn-primary">
        <Send size={18} /> Preview Submission
      </button>
    </form>
  );
};

export default AbstractSubmitForm;
