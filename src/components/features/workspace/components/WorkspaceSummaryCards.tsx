"use client";

import { CreditCard, MailPlus, ShieldCheck, Users } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { WorkspaceDetails } from "@/types/workspace.types";

type Props = {
  workspace: WorkspaceDetails;
  membersCount: number;
  pendingInvitationsCount: number;
};

const WorkspaceSummaryCards = ({ workspace, membersCount, pendingInvitationsCount }: Props) => {
  const planLabel = workspace.planMeta?.effectivePlan
    ? workspace.planMeta.effectivePlan.charAt(0) +
      workspace.planMeta.effectivePlan.slice(1).toLowerCase()
    : "Unknown";

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <Card className="rounded-[24px] border border-white/10 bg-[#1D2939]/80 text-white shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
        <CardContent className="p-5">
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-[#101828]">
            <Users className="h-4 w-4 text-[#CBB5FF]" />
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#94A3B8]">Members</p>
          <p className="mt-3 text-3xl font-semibold text-white">{membersCount}</p>
        </CardContent>
      </Card>

      <Card className="rounded-[24px] border border-white/10 bg-[#1D2939]/80 text-white shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
        <CardContent className="p-5">
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-[#101828]">
            <MailPlus className="h-4 w-4 text-[#CBB5FF]" />
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#94A3B8]">
            Pending Invitations
          </p>
          <p className="mt-3 text-3xl font-semibold text-white">{pendingInvitationsCount}</p>
        </CardContent>
      </Card>

      <Card className="rounded-[24px] border border-white/10 bg-[#1D2939]/80 text-white shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
        <CardContent className="p-5">
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-[#101828]">
            <CreditCard className="h-4 w-4 text-[#CBB5FF]" />
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#94A3B8]">
            Effective Plan
          </p>
          <p className="mt-3 text-3xl font-semibold text-white">{planLabel}</p>
        </CardContent>
      </Card>

      <Card className="rounded-[24px] border border-white/10 bg-[#1D2939]/80 text-white shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
        <CardContent className="p-5">
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-[#101828]">
            <ShieldCheck className="h-4 w-4 text-[#CBB5FF]" />
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#94A3B8]">
            Trial Status
          </p>
          <p className="mt-3 text-lg font-semibold text-white">
            {workspace.planMeta?.isTrialActive ? "Active Trial" : "No Active Trial"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkspaceSummaryCards;
