"use client";

import { Lock } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

type Props = {
  title?: string;
  description?: string;
};

const WorkspaceAccessNotice = ({
  title = "Access restricted",
  description = "You do not have permission to view this section.",
}: Props) => {
  return (
    <Card className="rounded-[24px] border border-dashed border-white/10 bg-[#101828]/80 text-white shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <CardContent className="flex min-h-[260px] flex-col items-center justify-center px-6 py-10 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#7F56D9]/20 bg-[#7F56D9]/10">
          <Lock className="h-6 w-6 text-[#CBB5FF]" />
        </div>

        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-2 max-w-md text-sm leading-6 text-[#94A3B8]">{description}</p>
      </CardContent>
    </Card>
  );
};

export default WorkspaceAccessNotice;
