"use client";
import { Topic } from "@/lib/type";
import { changeForSelectArray } from "@/lib/utils";
import { Send, Trash } from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import Select from "react-select";

interface abstractForm {
  title: string;
  description: string;
  keyword: string;
  remarks: string;
  topic: Topic;
  co_authors: {
    first_name: string;
    last_name: string;
    email: string;
    organization: string;
  }[];
}

const AbstractSubmitForm = ({ topics }: { topics: Topic[] }) => {
  const {
    register,
    handleSubmit,
    control,

    reset,
    formState: { errors },
  } = useForm<abstractForm>({
    defaultValues: {
      co_authors: [
        {
          first_name: "",
          last_name: "",
          email: "",
          organization: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "co_authors",
  });

  const filterTopics = changeForSelectArray(topics);

  function onsubmit(data) {
    console.log("data", data);
  }
  function onerror(error) {
    console.log(error);
  }
  return (
    <form
      onSubmit={handleSubmit(onsubmit, onerror)}
      className="space-y-8 w-full"
    >
      {/* ===== BASIC INFO ===== */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-lg font-semibold text-[#003366] border-b pb-2">
          Basic Information
        </h2>

        {/* Title */}
        <div className="space-y-2">
          <label className="label">Research Title</label>
          <input
            {...register("title", { required: true })}
            placeholder="Full title of your research paper..."
            className={`${errors.title ? "border-red-500" : "border-slate-100"} input-style resize-none`}
          />
          <p className="text-xs text-slate-500 leading-relaxed">
            The title should be concise, informative and reflective of the main
            focus of the study
          </p>
        </div>

        {/* Topic */}
        <div className="space-y-2">
          <label className="label">Sub Theme</label>
          <Controller
            name="topic"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                options={filterTopics}
                isMulti={false}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    backgroundColor: "#f8fafc", // bg-slate-50
                    borderRadius: "16px",
                    padding: "6px 10px",
                    borderColor: state.isFocused ? "#C5A059" : "#e2e8f0",
                    boxShadow: state.isFocused
                      ? "0 0 0 2px rgba(197,160,89,0.4)"
                      : "none",
                    "&:hover": {
                      borderColor: "#C5A059",
                    },
                    fontWeight: "700",
                    color: "#003366",
                  }),
                  menu: (base) => ({
                    ...base,
                    borderRadius: "12px",
                    overflow: "hidden",
                    zIndex: 50,
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isFocused
                      ? "#f1f5f9"
                      : state.isSelected
                        ? "#C5A059"
                        : "white",
                    color: state.isSelected ? "white" : "#003366",
                    fontWeight: 600,
                    cursor: "pointer",
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: "#003366",
                    fontWeight: "700",
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: "#94a3b8",
                    fontWeight: "600",
                  }),
                }}
              />
            )}
          />
          <p className="text-xs text-slate-500 leading-relaxed">
            Please select sub theme that describe your abstract
          </p>
        </div>

        {/* Keywords */}
        <div className="space-y-2">
          <label className="label">Keywords</label>
          <input
            {...register("keyword", { required: true })}
            placeholder="e.g. AI, Machine Learning, NLP"
            className={`${errors.keyword ? "border-red-500" : "border-slate-100"} input-style resize-none`}
          />
          <p className="text-xs text-slate-500 leading-relaxed">
            Provide up to six relevant keywords that reflect the core themes of
            the study.(seperated by comma)
          </p>
        </div>

        {/* Abstract */}
        <div className="space-y-2">
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
              <input
                {...register(`co_authors.${index}.first_name`)}
                placeholder="First Name"
                className="input-style"
              />

              <input
                {...register(`co_authors.${index}.last_name`)}
                placeholder="Last Name"
                className="input-style"
              />

              <input
                {...register(`co_authors.${index}.email`)}
                type="email"
                placeholder="Email"
                className="input-style"
              />

              <input
                {...register(`co_authors.${index}.organization`)}
                placeholder="Organization"
                className="input-style"
              />

              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="flex items-center justify-center h-full px-3 rounded-lg text-red-500 hover:bg-red-100 transition"
                >
                  <Trash size={18} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 mt-6">
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
            className="px-5 py-2.5 rounded-xl bg-[#003366] text-white font-semibold hover:bg-[#002244] transition-all"
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
            className="px-5 py-2.5 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all"
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
