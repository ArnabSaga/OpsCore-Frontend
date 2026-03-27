"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface AppSubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isSubmitting?: boolean;
}

const AppSubmitButton = ({
  isSubmitting = false,
  children,
  className,
  type = "submit",
  ...props
}: AppSubmitButtonProps) => {
  return (
    <Button
      type={type}
      disabled={isSubmitting || props.disabled}
      className={cn(
        "h-12 w-full rounded-xl bg-[#7F56D9] font-semibold text-white",
        "shadow-[0_10px_30px_rgba(127,86,217,0.35)] transition-all duration-300",
        "hover:bg-[#6941C6] hover:shadow-[0_14px_36px_rgba(127,86,217,0.45)]",
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
