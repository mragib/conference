import React, { FormHTMLAttributes, ReactNode } from "react";

type FormType = "regular" | "modal";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  type?: FormType;
  children: ReactNode;
}

const Form: React.FC<FormProps> = ({
  type = "regular",
  children,
  ...props
}) => {
  const baseClasses = "text-sm";

  const regularClasses =
    "p-6 bg-white border border-gray-200 rounded-md max-h-[80vh] overflow-y-auto";
  const modalClasses = "w-[80rem]";

  const classes = `${baseClasses} ${
    type === "modal" ? modalClasses : regularClasses
  }`;

  return (
    <form className={classes} {...props}>
      {children}
    </form>
  );
};

export default Form;
