"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle2,
  FileText,
  Lightbulb,
  Loader2,
  MessageSquare,
  Microscope,
  Send,
  Target,
  TrendingUp,
  Wrench,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { createAbstractReview, updateAbstractStatus } from "@/lib/data-service";
import {
  AbstractReviewFormType,
  AbstractReviewSchema,
  Role,
  User,
} from "@/lib/type";
import { parseError } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useConfirm } from "@/hooks/useConfirm";
import { AbstractStatusCode } from "@/lib/constants";

type ReviewCriteria = {
  id: string;
  type: string;
  name: string;
  value: number;
  description: string;
};

type AbstractData = {
  id: string;
  title: string;
  purpose: string;
  methodology: string;
  findings: string;
  theoretical: string;
  practical: string;
  topic?: {
    id: string;
    name: string;
  };
  abstract_review?: {
    purposeMarkId: string;
    methodologyMarkId: string;
    findingsMarkId: string;
    theoreticalMarkId: string;
    practicalMarkId: string;
    overallMarkId: string;
    comment_to_author: string;
  };
};

interface AbstractReviewFormProps {
  abstract: AbstractData;
  criteria: Record<string, ReviewCriteria[]>;
  user: User;
}

const sections = [
  {
    key: "purpose",
    title: "Purpose",
    description:
      "Evaluate the clarity and significance of the research objective or purpose of the study.",
    field: "purposeMarkId",
    icon: Target,
    color: "from-blue-500 to-cyan-500",
    bgLight: "bg-blue-50",
  },
  {
    key: "methodology",
    title: "Research Design and Methodology",
    description:
      "Evaluate the appropriateness, clarity, and rigor of the research design and methods.",
    field: "methodologyMarkId",
    icon: Microscope,
    color: "from-purple-500 to-pink-500",
    bgLight: "bg-purple-50",
  },
  {
    key: "findings",
    title: "Quality of Research Findings",

    field: "findingsMarkId",
    icon: TrendingUp,
    description:
      "Assess the clarity, relevance, and significance of the results or expected outcomes.",
    color: "from-green-500 to-emerald-500",
    bgLight: "bg-green-50",
  },
  {
    key: "theoretical",
    title: "Theoretical Implications",
    description:
      "Evaluate the contribution to academic theory or conceptual understanding.",
    field: "theoreticalMarkId",
    icon: Lightbulb,
    color: "from-orange-500 to-amber-500",
    bgLight: "bg-orange-50",
  },
  {
    key: "practical",
    title: "Practical Implications",
    field: "practicalMarkId",
    icon: Wrench,
    color: "from-teal-500 to-emerald-500",
    bgLight: "bg-teal-50",
    description:
      "Assess the usefulness and applicability of the study for practitioners, industry, or policy.",
  },
  {
    key: "overall",
    title: "Overall Recommendation",
    field: "overallMarkId",
    description: "Please provide an overall assessment of the submission.",
    icon: Send,
    color: "from-blue-500 to-cyan-500",
    bgLight: "bg-blue-50",
  },
] as const;

export default function AbstractReviewForm({
  abstract,
  criteria,
  user,
}: AbstractReviewFormProps) {
  const router = useRouter();

  const [state, action, isPending] = useActionState(createAbstractReview, {
    success: false,
  });

  const [isTransitioning, startTransition] = useTransition();

  const { confirm, open, options, handleConfirm, handleCancel, setOpen } =
    useConfirm();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<AbstractReviewFormType>({
    resolver: zodResolver(AbstractReviewSchema),
    mode: "onTouched",
    defaultValues: {
      abstractId: abstract.id,
      purposeMarkId: abstract.abstract_review?.purposeMarkId ?? "",
      methodologyMarkId: abstract.abstract_review?.methodologyMarkId ?? "",
      findingsMarkId: abstract.abstract_review?.findingsMarkId ?? "",
      theoreticalMarkId: abstract.abstract_review?.theoreticalMarkId ?? "",
      practicalMarkId: abstract.abstract_review?.practicalMarkId ?? "",
      overallMarkId: abstract.abstract_review?.overallMarkId ?? "",
      comment_to_author: abstract.abstract_review?.comment_to_author ?? "",
    },
  });

  const watched = sections.map((s) => watch(s.field as any));
  const completedCount = watched.filter(Boolean).length;
  const progress = (completedCount / sections.length) * 100;

  useEffect(() => {
    if (state?.success) {
      toast.success("Review submitted successfully");
      router.push("/reviewer/abstracts");
    }

    if (!state?.success && state?.errors) {
      toast.error(parseError(state.errors));
    }
  }, [state, router]);

  const onSubmit = (data: AbstractReviewFormType) => {
    const formData = new FormData();
    Object.entries(data).forEach(([k, v]) => formData.append(k, String(v)));

    startTransition(() => action(formData));
  };

  const isLoading = isPending || isTransitioning;

  const should_disable =
    user.role === Role.ADMIN ||
    user.role === Role.AUTHORITY ||
    (user.role === Role.REVIEWER && abstract.abstract_review);

  const handleStatus = async (status: number) => {
    const ok = await confirm({
      title: "Submit Final Decision",
      description:
        "Are you sure you want to submit the final decision? This action cannot be undone.",
      confirmText: "Final Decision",
    });

    if (!ok) return;

    startTransition(async () => {
      const res = await updateAbstractStatus(abstract.id, status);

      if (res.success) {
        toast.success("Abstract Status Updated.");
        router.refresh();
      } else {
        toast.error(parseError(res.errors));
      }
    });
  };

  return (
    <div className="container mx-auto max-w-7xl px-4">
      <button
        onClick={() => router.back()}
        className="mb-4 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
      >
        &larr; Back
      </button>
      <ConfirmDialog
        open={open}
        setOpen={setOpen}
        options={options}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        disabled={isPending}
      />
      <form
        className="space-y-8 bg-slate-50/40 p-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input type="hidden" {...register("abstractId")} />

        {/* ================= HEADER ================= */}
        <Card className="border bg-white shadow-sm">
          <CardContent className="flex flex-col gap-5 p-6  lg:flex-row lg:items-start lg:justify-between">
            <div>
              <Badge className="mb-2 bg-indigo-50 text-indigo-700 border-indigo-200">
                Abstract Review
              </Badge>

              <h2 className="text-2xl font-semibold text-slate-900 capitalize max-w-3xl text-balance">
                {abstract.title}
              </h2>

              <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                <FileText className="h-4 w-4" />
                <span>Sub Theme: {abstract.topic?.name}</span>
              </div>
            </div>

            {user.role === Role.REVIEWER && (
              <div className="w-full lg:w-72 space-y-2">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Progress</span>
                  <span>
                    {completedCount}/{sections.length}
                  </span>
                </div>

                <Progress value={progress} className="h-2" />

                <p className="text-xs text-slate-500">
                  {progress === 100
                    ? "Ready to submit"
                    : `${Math.round(progress)}% complete`}
                </p>
              </div>
            )}
            {(user.role === Role.ADMIN || user.role === Role.AUTHORITY) &&
              abstract.status.id === 4 && (
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                  <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-indigo-50 to-white dark:from-indigo-950/20 dark:to-slate-900">
                    <h2 className="font-semibold text-slate-700 dark:text-slate-300">
                      Final Action
                    </h2>
                  </div>

                  <div className="p-4 space-y-3">
                    <button
                      type="button"
                      onClick={() => handleStatus(AbstractStatusCode.ACCEPTED)}
                      className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Accept Abstract
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStatus(AbstractStatusCode.REJECTED)}
                      className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject Abstract
                    </button>

                    <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                      Review the abstract and choose whether to accept or reject
                      it.
                    </p>
                  </div>
                </div>
              )}
          </CardContent>
        </Card>

        {/* ================= SECTIONS ================= */}
        {sections.map((section) => {
          const fieldError = errors[section.field];
          const selected = watch(section.field);

          return (
            <Card
              key={section.key}
              className="overflow-hidden border bg-white shadow-sm hover:shadow-md transition"
            >
              <div className={`h-1 bg-gradient-to-r ${section.color}`} />

              <CardContent className="p-6">
                {/* HEADER */}
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`rounded-lg ${section.bgLight} p-2.5`}>
                      <section.icon className="h-5 w-5 text-slate-700" />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 capitalize">
                        {section.title}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {section.description}
                      </p>
                    </div>
                  </div>

                  {selected && (
                    <Badge className="bg-green-50 text-green-700 border-green-200">
                      Completed
                    </Badge>
                  )}
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                  {/* CONTENT */}
                  {section.key !== "overall" && (
                    <div className="rounded-xl border bg-slate-50 p-5">
                      <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">
                        {abstract[section.key as keyof AbstractData] ||
                          "Not provided"}
                      </p>
                    </div>
                  )}

                  {/* EVALUATION */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-semibold uppercase text-slate-500">
                      Evaluation
                    </h4>

                    <Controller
                      control={control}
                      name={section.field}
                      render={({ field }) => (
                        <RadioGroup
                          value={field.value}
                          disabled={should_disable}
                          onValueChange={field.onChange}
                          className="space-y-3"
                        >
                          {criteria[section.key]?.map((item) => {
                            const isSelected = field.value === item.id;
                            return (
                              <div
                                key={item.id}
                                className={`cursor-pointer rounded-xl border p-4 transition ${
                                  isSelected
                                    ? `border-indigo-500 bg-indigo-50 shadow-sm`
                                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  <RadioGroupItem
                                    value={item.id}
                                    id={`${section.key}-${item.id}`}
                                    className="mt-1 text-blue-600 border-blue-600"
                                  />
                                  <Label
                                    htmlFor={`${section.key}-${item.id}`}
                                    className="flex-1 cursor-pointer"
                                  >
                                    <div className="flex-1">
                                      <div className="flex justify-between">
                                        <span className="font-medium text-slate-900">
                                          {item.name}
                                        </span>

                                        <span className="text-indigo-600 text-sm font-semibold">
                                          {item.value}/4
                                        </span>
                                      </div>

                                      <p className="mt-2 text-sm text-slate-500">
                                        {item.description}
                                      </p>
                                    </div>
                                  </Label>
                                </div>
                              </div>
                            );
                          })}
                        </RadioGroup>
                      )}
                    />

                    {fieldError && (
                      <p className="text-sm text-red-500">
                        {fieldError.message}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {/* ================= COMMENTS ================= */}
        <Card className="border bg-white shadow-sm">
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-indigo-600" />
              <h3 className="text-lg font-semibold">Comments to Author</h3>
            </div>

            <Textarea
              rows={7}
              placeholder="Write constructive feedback..."
              {...register("comment_to_author")}
              disabled={isLoading || should_disable}
            />

            {errors.comment_to_author && (
              <p className="text-sm text-red-500">
                {errors.comment_to_author.message}
              </p>
            )}
          </CardContent>
        </Card>

        {/* ================= SUBMIT ================= */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isLoading || should_disable}
            className="min-w-[200px] bg-indigo-600 hover:bg-indigo-700"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="mr-2 h-4 w-4" />
            )}
            Submit Review
          </Button>
        </div>
      </form>
    </div>
  );
}
