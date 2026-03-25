"use client";

import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";

const AuthSessionErrorState = () => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#1D2939]/80 p-8 text-center shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10">
          <ShieldAlert className="h-7 w-7 text-red-300" />
        </div>

        <h2 className="mt-5 text-2xl font-semibold text-white">Session unavailable</h2>
        <p className="mt-3 text-sm leading-6 text-[#94A3B8]">
          Your session could not be verified. Please log in again to continue.
        </p>

        <Button
          onClick={() => {
            window.location.href = "/login";
          }}
          className="mt-6 bg-[#7F56D9] text-white hover:bg-[#6941C6]"
        >
          Go to Login
        </Button>
      </div>
    </div>
  );
};

export default AuthSessionErrorState;
