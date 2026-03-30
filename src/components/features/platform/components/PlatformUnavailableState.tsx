"use client";

import { AlertTriangle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type PlatformUnavailableStateProps = {
  title: string;
  description?: string;
  className?: string;
};

export default function PlatformUnavailableState({
  title,
  description = "This feature is currently being integrated with the backend and will be available soon.",
  className,
}: PlatformUnavailableStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-[450px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/3 p-8 text-center transition-all duration-300 hover:bg-white/5",
        className
      )}
    >
      <div className="relative mb-6">
        <div className="absolute -inset-4 rounded-full bg-[#7F56D9]/10 blur-xl" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-[#1D2939] shadow-2xl">
          <Clock className="h-10 w-10 text-[#CBB5FF]" />
        </div>
        <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-xl bg-[#1D2939] shadow-lg">
          <Badge
            variant="outline"
            className="border-none bg-[#7F56D9]/20 p-1.5 text-[#CBB5FF]"
          >
            <AlertTriangle className="h-4 w-4" />
          </Badge>
        </div>
      </div>

      <div className="max-w-md space-y-3">
        <div className="flex flex-col items-center gap-2">
          <Badge
            variant="secondary"
            className="border-[#7F56D9]/20 bg-[#7F56D9]/10 text-[10px] font-semibold uppercase tracking-wider text-[#CBB5FF]"
          >
            Backend Integration Pending
          </Badge>
          <h3 className="text-2xl font-bold tracking-tight text-white">{title}</h3>
        </div>
        
        <p className="text-sm leading-relaxed text-[#94A3B8]">
          {description}
        </p>

        <div className="mt-8 pt-6 border-t border-white/5">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#667085]">
            Reference Architecture Ready • Dormant until API available
          </p>
        </div>
      </div>
    </div>
  );
}
