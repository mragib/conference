import { cn } from "@/lib/utils";
import { useId, useRef } from "react";

type FloatingTextAreaProps = React.ComponentProps<"textarea"> & {
  label: string;
  error?: string;
};

const FloatingTextArea = ({
  label,
  className,
  error,
  id,
  onChange,
  ...props
}: FloatingTextAreaProps) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const ref = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="space-y-1">
      <div className="relative">
        <textarea
          id={inputId}
          ref={ref}
          placeholder=" "
          rows={3}
          className={cn(
            "peer block px-2.5 pb-2.5 pt-4 w-full text-sm bg-white rounded-lg border field-sizing-content min-h-24",
            "focus:outline-none focus:ring-0 resize-none overflow-hidden",
            error
              ? "border-red-500 focus:border-red-500"
              : "border-slate-300 focus:border-blue-600",
            className,
          )}
          onInput={(e) => {
            onChange?.(e);
          }}
          {...props}
        />

        <label
          htmlFor={inputId}
          className={cn(
            "absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-left bg-white px-2",
            error ? "text-red-500" : "text-gray-500 peer-focus:text-blue-600",
            "peer-placeholder-shown:scale-100",
            "peer-placeholder-shown:-translate-y-1/2",
            "peer-placeholder-shown:top-4",
            "peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1",
          )}
        >
          {label}
        </label>
      </div>

      {error && <p className="text-xs text-red-500 ml-1">{error}</p>}
    </div>
  );
};

export default FloatingTextArea;
