import { Button } from "@/components/ui/button";
import { IconType } from "react-icons";

interface ButtonIconProps {
  icon: IconType;
  children?: React.ReactNode;
  onClick?: () => void;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const ButtonIcon = ({
  icon: Icon,
  children,
  onClick,
  variant = "ghost",
  size,
  className = "",
}: ButtonIconProps) => {
  const buttonSize = children ? "default" : size || "icon";

  return (
    <Button
      variant={variant}
      size={buttonSize}
      onClick={onClick}
      className={`inline-flex items-center gap-2 ${className}`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {children && <span>{children}</span>}
    </Button>
  );
};

export default ButtonIcon;
