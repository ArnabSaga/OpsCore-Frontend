"use client";

import { Button } from "@/components/ui/button";
import { env } from '@/env';
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("OpsCore Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B0B0B] px-4">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#1D2939]/80 p-8 text-center backdrop-blur-xl">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#7F56D9]/10">
            <AlertTriangle className="h-8 w-8 text-[#7F56D9]" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-white">Something went wrong</h1>

        {/* Description */}
        <p className="mt-2 text-sm text-[#94A3B8]">
          An unexpected error occurred. Please try again or go back to the dashboard.
        </p>

        {/* Error message (only helpful during dev) */}
        {env.NODE_ENV !== "production" && (
          <div className="mt-4 rounded-lg border border-white/10 bg-black/40 p-3 text-left text-xs text-red-400">
            {error.message}
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          {/* Retry */}
          <Button
            onClick={() => reset()}
            className="flex items-center gap-2 bg-[#7F56D9] hover:bg-[#6941C6]"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>

          {/* Go Home */}
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/dashboard")}
            className="flex items-center gap-2 border-white/10 text-white hover:bg-white/5"
          >
            <Home className="h-4 w-4" />
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
