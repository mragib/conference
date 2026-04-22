import { cn } from "@/lib/utils";
import { useId, useState } from "react";
import Select from "react-select";

type FloatingSelectProps = {
  label: string;
  error?: string;
  value: any;
  onChange: (val: any) => void;
  options: any[];
  isDisabled?: boolean;
};

const FloatingSelect = ({
  label,
  error,
  value,
  onChange,
  options,
  isDisabled,
}: FloatingSelectProps) => {
  const id = useId();
  const [isFocused, setIsFocused] = useState(false);

  const isFloating = isFocused || value;

  return (
    <div className="space-y-1">
      <div className="relative">
        <Select
          instanceId={id}
          inputId={id}
          value={value}
          onChange={onChange}
          options={options}
          isDisabled={isDisabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          styles={{
            control: (base) => ({
              ...base,
              minHeight: "56px",
              borderRadius: "0.5rem",
              borderColor: error ? "#ef4444" : "#d1d5db",
              boxShadow: "none",
              "&:hover": {
                borderColor: error ? "#ef4444" : "#2563eb",
              },
            }),
            menu: (base) => ({
              ...base,
              zIndex: 9999,
            }),
          }}
        />

        {/* Floating Label */}
        <label
          htmlFor={id}
          className={cn(
            "absolute left-2 px-2 bg-white duration-300 origin-left",
            isFloating
              ? "top-0 text-xs -translate-y-1/2 scale-75"
              : "top-1/2 -translate-y-1/2 text-sm",
            error ? "text-red-500" : "text-gray-500",
          )}
        >
          {label}
        </label>
      </div>

      {/* Error */}
      {error && <p className="text-xs text-red-500 ml-1">{error}</p>}
    </div>
  );
};

export default FloatingSelect;
