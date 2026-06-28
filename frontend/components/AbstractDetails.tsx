"use client";
import { Role, type AbstractType, type User as UserType } from "@/lib/type";
import {
  Bookmark,
  BookOpen,
  Building2,
  Calendar,
  CheckCircle2,
  FileText,
  Lightbulb,
  Mail,
  Microscope,
  Target,
  TrendingUp,
  User as UserIcon,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SectionCard from "./SectionCard";
import StatusCard from "./StatusCard";

const AbstractDetails = ({
  abstract,

  user,
}: {
  abstract: AbstractType;

  user: UserType;
}) => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <button
          onClick={() => router.back()}
          className="mb-4 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          &larr; Back
        </button>
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
            <FileText className="w-4 h-4" />
            <span>Abstract Details</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(abstract.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <h1 className="text-md md:text-xl lg:text-2xl font-bold text-slate-900 dark:text-white leading-tight capitalize">
            {abstract.title}
          </h1>

          {/* Topic Badge */}
          {abstract.topic && (
            <div className="mt-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded-lg">
                <Bookmark className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-xs  text-indigo-700 dark:text-indigo-300">
                  {abstract.topic.name}
                </span>
              </div>
            </div>
          )}

          {/* Keywords */}
          {abstract.keyword && (
            <div className="flex flex-wrap gap-2 mt-4">
              {abstract.keyword.split(",").map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full"
                >
                  {keyword.trim()}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Purpose */}
            <SectionCard
              icon={Target}
              title="Purpose"
              content={abstract.purpose}
              color="blue"
            />

            {/* Methodology */}
            <SectionCard
              icon={Microscope}
              title="Methodology"
              content={abstract.methodology}
              color="purple"
            />

            {/* Findings */}
            <SectionCard
              icon={TrendingUp}
              title="Findings"
              content={abstract.findings}
              color="green"
            />

            {/* Theoretical Contribution */}
            <SectionCard
              icon={Lightbulb}
              title="Theoretical Implemention"
              content={abstract.theoretical}
              color="amber"
              compact
            />

            {/* Practical Contribution */}
            <SectionCard
              icon={Wrench}
              title="Practical Implemention"
              content={abstract.practical}
              color="teal"
              compact
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {user.role === Role.REVIEWER && (
              <>
                {/* Review Action Card */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                  <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-emerald-50 to-white dark:from-emerald-950/20 dark:to-slate-900">
                    <h2 className="font-semibold text-slate-700 dark:text-slate-300">
                      Review Actions
                    </h2>
                  </div>
                  <div className="p-4">
                    <Link
                      href={`/reviewer/abstracts/${abstract.id}/review`}
                      className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      {abstract.abstract_review
                        ? "View Review"
                        : "Submit Review"}
                    </Link>
                    <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-3">
                      {abstract.abstract_review
                        ? "You already reviewed"
                        : "Please complete your review by 15 Sep 2025"}
                    </p>
                  </div>
                </div>
              </>
            )}
            {(user.role === Role.ADMIN || user.role === Role.AUTHORITY) &&
              (abstract.status.id === 4 ||
                abstract.status.id === 2 ||
                abstract.status.id === 3) && (
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                  <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-indigo-50 to-white dark:from-indigo-950/20 dark:to-slate-900">
                    <h2 className="font-semibold text-slate-700 dark:text-slate-300">
                      Your Actions
                    </h2>
                  </div>

                  <div className="p-4 space-y-3">
                    <Link
                      href={`/${user.role === Role.ADMIN ? "admin" : "authority"}/abstracts/${abstract.id}/decision`}
                      className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      {abstract.status.id === 4
                        ? "Final Decision"
                        : "View Review"}
                    </Link>

                    <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                      {abstract.status.id === 4
                        ? "Review the abstract and choose whether to accept or reject it."
                        : "View the review result"}
                    </p>
                  </div>
                </div>
              )}
            {/* Status Card */}
            <StatusCard
              statusId={abstract.status.id}
              comment_to_author={abstract.abstract_review?.comment_to_author}
              updated_at={abstract.updated_at}
            />

            {/* Authors Card */}
            {abstract.co_authors && abstract.co_authors.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-900">
                  <UserIcon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  <h2 className="font-semibold text-slate-700 dark:text-slate-300">
                    Authors ({abstract.co_authors.length})
                  </h2>
                </div>
                <div className="p-4 space-y-3">
                  {abstract.co_authors
                    .sort((a, b) => a.display_order - b.display_order)
                    .map((author, index) => (
                      <div
                        key={author.id}
                        className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                          <UserIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm font-medium text-slate-900 dark:text-white">
                              {author.first_name} {author.last_name}
                            </p>
                          </div>
                          <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {author.email}
                            </span>
                            {author.organization && (
                              <span className="flex items-center gap-1">
                                <Building2 className="w-3 h-3" />
                                {author.organization}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex-shrink-0 text-xs text-slate-400 dark:text-slate-500">
                          #{author.display_order}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* References */}
            {abstract.references && (
              <SectionCard
                icon={BookOpen}
                title="References"
                content={abstract.references}
                color="slate"
                compact
              />
            )}

            {/* Metadata Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
              <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                Metadata
              </h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-slate-500 dark:text-slate-400">
                    Abstract ID
                  </dt>
                  <dd className="font-mono text-slate-700 dark:text-slate-300 text-xs">
                    {abstract.id}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500 dark:text-slate-400">
                    Created
                  </dt>
                  <dd className="text-slate-700 dark:text-slate-300">
                    {new Date(abstract.created_at).toLocaleString()}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbstractDetails;
