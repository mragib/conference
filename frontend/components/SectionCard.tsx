interface SectionCardProps {
  icon: React.ElementType;
  title: string;
  content: string;
  color: "blue" | "purple" | "green" | "amber" | "teal" | "slate";
  compact?: boolean;
}

export default function SectionCard({
  icon: Icon,
  title,
  content,
  color,
  compact = false,
}: SectionCardProps) {
  const colorClasses = {
    blue: {
      bg: "bg-blue-50 dark:bg-blue-950/30",
      border: "border-blue-200 dark:border-blue-800",
      icon: "text-blue-600 dark:text-blue-400",
      title: "text-blue-700 dark:text-blue-300",
    },
    purple: {
      bg: "bg-purple-50 dark:bg-purple-950/30",
      border: "border-purple-200 dark:border-purple-800",
      icon: "text-purple-600 dark:text-purple-400",
      title: "text-purple-700 dark:text-purple-300",
    },
    green: {
      bg: "bg-green-50 dark:bg-green-950/30",
      border: "border-green-200 dark:border-green-800",
      icon: "text-green-600 dark:text-green-400",
      title: "text-green-700 dark:text-green-300",
    },
    amber: {
      bg: "bg-amber-50 dark:bg-amber-950/30",
      border: "border-amber-200 dark:border-amber-800",
      icon: "text-amber-600 dark:text-amber-400",
      title: "text-amber-700 dark:text-amber-300",
    },
    teal: {
      bg: "bg-teal-50 dark:bg-teal-950/30",
      border: "border-teal-200 dark:border-teal-800",
      icon: "text-teal-600 dark:text-teal-400",
      title: "text-teal-700 dark:text-teal-300",
    },
    slate: {
      bg: "bg-slate-50 dark:bg-slate-800/50",
      border: "border-slate-200 dark:border-slate-700",
      icon: "text-slate-600 dark:text-slate-400",
      title: "text-slate-700 dark:text-slate-300",
    },
  };

  const classes = colorClasses[color];

  return (
    <div
      className={`${classes.bg} ${classes.border} border rounded-xl overflow-hidden transition-all hover:shadow-md`}
    >
      <div
        className={`px-5 py-3 border-b ${classes.border} flex items-center gap-2`}
      >
        <Icon className={`w-5 h-5 ${classes.icon}`} />
        <h2 className={`font-semibold ${classes.title}`}>{title}</h2>
      </div>
      <div className={`px-5 ${compact ? "py-4" : "py-5"}`}>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
          {content}
        </p>
      </div>
    </div>
  );
}
