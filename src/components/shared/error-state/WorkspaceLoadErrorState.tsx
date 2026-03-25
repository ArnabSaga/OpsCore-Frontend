"use client";

import { BriefcaseBusiness, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

type WorkspaceLoadErrorStateProps = {
  onRetry?: () => void;
};

const WorkspaceLoadErrorState = ({ onRetry }: WorkspaceLoadErrorStateProps) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#1D2939]/80 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7F56D9]/10">
          <BriefcaseBusiness className="h-6 w-6 text-[#CBB5FF]" />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">Workspace unavailable</h3>
          <p className="mt-2 text-sm leading-6 text-[#94A3B8]">
            We couldn&apos;t load your workspace data right now. Please try again.
          </p>

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

export default WorkspaceLoadErrorState;
