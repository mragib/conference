"use client";
import { Button } from "@/components/button";
import { Topic } from "@/lib/type";
import { FileText, Trash } from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

const AbstractSubmitForm = ({ topics }: { topics: Topic[] }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      abstract: "",
      subTheme: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "co-authors",
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-3 md:col-span-2">
        <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
          <FileText size={14} className="text-[#C5A059]" /> Research Title
        </label>
        <input
          type="text"
          placeholder="Full title of your research paper..."
          className={`w-full px-6 py-4 rounded-2xl bg-slate-50 border transition-all outline-none font-bold text-[#003366] border-slate-100 focus:ring-2 focus:ring-[#C5A059]`}
        />
      </div>
      <div className="bg-zinc-300 p-4 border col-span-1 lg:col-span-2 border-primary shadow-md rounded-md hover:shadow-2xl transition-all delay-75">
        <h5 className="text-lg font-semibold text-center py-2">Products</h5>
        {fields.map((field, index) => (
          <div
            className={`grid my-2 md:my-0 border md:border-none md:p-0 rounded-lg p-6 border-lime-700 hover:shadow-lg transition-all delay-75 gap-x-7 gap-y-5 items-center grid-cols-1 md:grid-cols-[2fr_2fr_1fr_1fr_.5fr]`}
            key={field.id}
          >
            <Controller
              name={`co-authors[${index}].first_name`}
              control={control}
              placeholder="Co-Author First Name"
              rules={{ required: "This is required" }}
              render={({ field: { ref, onChange, ...field } }) => (
                <input
                  type="text"
                  placeholder="Full title of your research paper..."
                  className={`w-full px-6 py-4 rounded-2xl bg-slate-50 border transition-all outline-none font-bold text-[#003366] border-slate-100 focus:ring-2 focus:ring-[#C5A059]`}
                />
              )}
            />

            {fields.length > 1 && (
              <div className="flex items-center gap-2">
                <Button
                  variation="danger"
                  sizes="small"
                  onClick={() => {
                    setProductDetails((prev) => {
                      const updatedDetails = [...prev];
                      updatedDetails.splice(index, 1);
                      return updatedDetails;
                    });

                    return remove(index);
                  }}
                >
                  <Trash />
                </Button>
              </div>
            )}
          </div>
        ))}
        <div className="flex items-center gap-2">
          <Button>Add Product</Button>
          <button
            className="border-none px-4 py-2 rounded-sm text-red-100 bg-red-700 hover:bg-red-800 shadow-sm"
            type="reset"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default AbstractSubmitForm;
