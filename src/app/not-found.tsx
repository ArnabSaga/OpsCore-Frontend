"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, ShieldAlert } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B0B0B] px-4">
      <div className="relative w-full max-w-xl rounded-2xl border border-white/10 bg-[#1D2939]/80 p-10 text-center backdrop-blur-xl">
        {/* Glow Effect */}
        <div className="absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-[#7F56D9]/20 blur-3xl" />

        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#7F56D9]/10">
            <ShieldAlert className="h-8 w-8 text-[#7F56D9]" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-white">404 — Not Found</h1>

        {/* Subtitle */}
        <p className="mt-3 text-sm text-[#94A3B8]">
          The page you are looking for does not exist or you don’t have permission to access it.
        </p>

        {/* Extra hint */}
        <p className="mt-1 text-xs text-[#667085]">
          Please check the URL or return to a safe page.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          {/* Go Dashboard */}
          <Link href="/dashboard">
            <Button className="flex w-full items-center justify-center gap-2 bg-[#7F56D9] hover:bg-[#6941C6] sm:w-auto">
              <Home className="h-4 w-4" />
              Go to Dashboard
            </Button>
          </Link>

          {/* Go Back */}
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="flex w-full items-center justify-center gap-2 border-white/10 text-white hover:bg-white/5 sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
