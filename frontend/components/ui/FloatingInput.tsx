import { cn } from "@/lib/utils";
import { useId } from "react";

type FloatingInputProps = React.ComponentProps<"input"> & {
  label: string;
  error?: string;
};

const FloatingInput = ({
  label,
  className,
  type = "text",
  error,
  id,
  ...props
}: FloatingInputProps) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className="space-y-1">
      <div className="relative">
        <input
          id={inputId}
          type={type}
          placeholder=" "
          className={cn(
            "peer block px-2.5 pb-2.5 pt-4 w-full text-sm bg-white rounded-lg border appearance-none focus:outline-none focus:ring-0",
            error
              ? "border-red-500 focus:border-red-500"
              : "border-slate-300 focus:border-blue-600",
            className,
          )}
          {...props}
        />

        <label
          htmlFor={inputId}
          className={cn(
            "absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-left bg-white px-2",
            error ? "text-red-500" : "text-gray-500 peer-focus:text-blue-600",
            "peer-placeholder-shown:scale-100",
            "peer-placeholder-shown:-translate-y-1/2",
            "peer-placeholder-shown:top-1/2",
            "peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1",
          )}
        >
          {label}
        </label>
      </div>

      {/* 🔴 Error text */}
      {error && <p className="text-xs text-red-500 ml-1">{error}</p>}
    </div>
  );
};

export default FloatingInput;
