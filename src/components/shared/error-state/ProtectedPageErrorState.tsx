"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

type ProtectedPageErrorStateProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
};

const ProtectedPageErrorState = ({
  title = "Something went wrong",
  description = "We couldn’t load this protected area properly. Please try again.",
  onRetry,
}: ProtectedPageErrorStateProps) => {
  return (
    <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/15">
          <AlertTriangle className="h-6 w-6 text-red-300" />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-[#94A3B8]">{description}</p>

          {onRetry ? (
            <Button onClick={onRetry} className="mt-4 bg-[#7F56D9] text-white hover:bg-[#6941C6]">
              <RefreshCw className="mr-2 h-4 w-4" />
              Retry
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProtectedPageErrorState;
