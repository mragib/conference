"use client";
import FloatingInput from "@/components/ui/FloatingInput";
import FloatingSelect from "@/components/ui/FloatingSelect";
import FloatingTextArea from "@/components/ui/FloatingTextarea";
import { createAbstract } from "@/lib/data-service";
import { AbstractFormSchema, Topic } from "@/lib/type";
import { changeForSelectArray, getWordCount } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Trash } from "lucide-react";
import { redirect } from "next/navigation";
import { useActionState, useEffect, useTransition } from "react";
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

  const [isTransitioning, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    control,
    getValues,
    reset,
    watch,
    formState: { errors: rhfErrors, isSubmitSuccessful },
  } = useForm<z.output<typeof AbstractFormSchema>>({
    resolver: zodResolver(AbstractFormSchema),
    defaultValues: {
      purpose: "",
      methodology: "",
      findings: "",
      theoretical: "",
      practical: "",
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

  // useEffect(() => {
  //   if (isSubmitSuccessful && state?.success) {
  //     toast.success("Abstract created successfully!");
  //   }
  // }, [isSubmitSuccessful, state?.success]);
  useEffect(() => {
    if (state?.success) {
      toast.success("Abstract created successfully!");
      redirect("/dashboard/abstracts");
    }

    if (!state?.success && state?.errors) {
      if (Array.isArray(state.errors)) {
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
  const filterTopics = changeForSelectArray(topics);

  const onsubmit = async (data: z.output<typeof AbstractFormSchema>) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "topic") return;

      if (key === "co_authors") {
        formData.append("co_authors", JSON.stringify(value));
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    if (data.topic?.value) {
      formData.append("topicId", data.topic.value);
    }

    startTransition(() => {
      action(formData);
    });
  };

  function onError(errors: any) {
    console.log(errors);
  }

  const purpose = watch("purpose");
  const methodology = watch("methodology");
  const findings = watch("findings");
  const theoretical = watch("theoretical");
  const practical = watch("practical");
  const references = watch("references");

  const words = {
    purpose: getWordCount(purpose),
    methodology: getWordCount(methodology),
    findings: getWordCount(findings),
    theoretical: getWordCount(theoretical),
    practical: getWordCount(practical),
    references: getWordCount(references),
  };

  const total =
    words.purpose +
    words.methodology +
    words.findings +
    words.theoretical +
    words.practical +
    words.references;

  const isLoading = isPending || isTransitioning;

  return (
    <form
      onSubmit={handleSubmit(onsubmit, onError)}
      className="space-y-8 w-full"
    >
      {/* ===== Abstract INFO ===== */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-[#003366] border-b pb-2">
          Abstract Submission
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

          {/* Abstract */}
          <div className="grid gap-4 mb-4">
            <div className="relative space-y-3">
              <FloatingTextArea
                label="Purpose"
                {...register("purpose", { required: true })}
                error={rhfErrors.purpose?.message}
              />

              <div
                className={`absolute ${rhfErrors.purpose?.message ? " bottom-10" : " bottom-4 "} right-3 text-[11px] text-gray-500 bg-white px-1 pointer-events-none`}
              >
                {words.purpose} words
              </div>
            </div>
            <div className="relative space-y-3">
              <FloatingTextArea
                label="Methodology"
                {...register("methodology", { required: true })}
                error={rhfErrors.methodology?.message}
              />
              <div
                className={`absolute ${rhfErrors.methodology?.message ? " bottom-10" : " bottom-4 "} right-3 text-[11px] text-gray-500 bg-white px-1 pointer-events-none`}
              >
                {words.methodology} words
              </div>
            </div>
            <div className="relative space-y-3">
              <FloatingTextArea
                label="Findings"
                {...register("findings", { required: true })}
                error={rhfErrors.findings?.message}
              />
              <div
                className={`absolute ${rhfErrors.findings?.message ? " bottom-10" : " bottom-4 "} right-3 text-[11px] text-gray-500 bg-white px-1 pointer-events-none`}
              >
                {words.findings} words
              </div>
            </div>
            <div className="relative space-y-3">
              <FloatingTextArea
                label="Theoretical Implications"
                {...register("theoretical", { required: true })}
                error={rhfErrors.theoretical?.message}
              />
              <div
                className={`absolute ${rhfErrors.theoretical?.message ? " bottom-10" : " bottom-4 "} right-3 text-[11px] text-gray-500 bg-white px-1 pointer-events-none`}
              >
                {words.theoretical} words
              </div>
            </div>
            <div className="relative space-y-3">
              <FloatingTextArea
                label="Practical Implications"
                {...register("practical", { required: true })}
                error={rhfErrors.practical?.message}
              />
              <div
                className={`absolute ${rhfErrors.practical?.message ? " bottom-10" : " bottom-4 "} right-3 text-[11px] text-gray-500 bg-white px-1 pointer-events-none`}
              >
                {words.practical} words
              </div>
            </div>
            <div className="relative space-y-3">
              <FloatingTextArea
                label="References"
                {...register("references", { required: true })}
                error={rhfErrors.references?.message}
              />
              <div
                className={`absolute ${rhfErrors.references?.message ? " bottom-10" : " bottom-4 "} right-3 text-[11px] text-gray-500 bg-white px-1 pointer-events-none`}
              >
                {words.references} words
              </div>
            </div>
            <p
              className={`text-sm ${
                total > 750 ? "text-red-500 font-semibold" : "text-gray-500"
              }`}
            >
              {total > 750
                ? `Exceeded by ${total - 750} words`
                : `Remaining: ${750 - total} words`}
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
              Provide up to five relevant keywords that reflect the core themes
              of the study.(seperated by comma)
            </p>
          </div>
        </div>
      </div>

      {/* ===== CO-AUTHORS ===== */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h2 className="text-lg font-semibold text-[#003366] mb-6 border-b pb-2">
          Author&apos;s Information
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
            onClick={() => {
              reset({
                title: "",
                keyword: "",
                purpose: "",
                methodology: "",
                findings: "",
                theoretical: "",
                practical: "",
                references: "",
                topic: undefined,
                co_authors: [getValues().co_authors[0]],
              });
            }}
            className="px-5 py-2.5 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all cursor-pointer"
          >
            Reset Form
          </button>
        </div>
      </div>

      {/* ===== SUBMIT ===== */}
      <button type="submit" className="btn-primary" disabled={isLoading}>
        <Send size={18} /> Submit
      </button>
    </form>
  );
};

export default AbstractSubmitForm;
