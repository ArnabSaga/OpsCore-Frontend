"use client";

import Link from "next/link";
import { BriefcaseBusiness, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const NoWorkspaceState = () => {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#1D2939]/80 p-8 text-center shadow-[0_10px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#7F56D9]/10">
        <BriefcaseBusiness className="h-7 w-7 text-[#CBB5FF]" />
      </div>

      <h2 className="mt-5 text-2xl font-semibold text-white">No workspace found</h2>
      <p className="mt-3 text-sm leading-6 text-[#94A3B8]">
        You don&apos;t have an active workspace yet. Create one to start managing operations.
      </p>

      <Button asChild className="mt-6 bg-[#7F56D9] text-white hover:bg-[#6941C6]">
        <Link href="/workspaces/create">
          <Plus className="mr-2 h-4 w-4" />
          Create Workspace
        </Link>
      </Button>
    </div>
  );
};

export default NoWorkspaceState;
