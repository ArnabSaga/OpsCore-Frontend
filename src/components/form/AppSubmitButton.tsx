"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface AppSubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isSubmitting?: boolean;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

const AppSubmitButton = ({
  isSubmitting = false,
  variant = "default",
  children,
  className,
  type = "submit",
  ...props
}: AppSubmitButtonProps) => {
  return (
    <Button
      type={type}
      variant={variant}
      disabled={isSubmitting || props.disabled}
      className={cn(
        variant === "default" && "bg-[#7F56D9] hover:bg-[#6941C6] shadow-[0_10px_30px_rgba(127,86,217,0.35)] hover:shadow-[0_14px_36px_rgba(127,86,217,0.45)] text-white",
        "h-12 w-full rounded-xl font-semibold",
        "transition-all duration-300",
        "disabled:cursor-not-allowed disabled:opacity-70",
        className
      )}
      {...props}
    >
      {isSubmitting ? (
        <span className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          Processing...
        </span>
      ) : (
        children
      )}
    </Button>
  );
};

export default AppSubmitButton;
