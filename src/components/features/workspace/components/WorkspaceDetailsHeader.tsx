"use client";

import {
  ArrowLeft,
  ArrowRightLeft,
  BriefcaseBusiness,
  Crown,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";
import type { WorkspaceDetails, WorkspaceSummary } from "@/types/workspace.types";

type Props = {
  workspace: WorkspaceDetails;
  workspaceSummary: WorkspaceSummary | null;
  isActive: boolean;
  isSwitching: boolean;
};

const formatPlan = (plan?: string) => {
  if (!plan) return "Unknown";
  return plan.charAt(0) + plan.slice(1).toLowerCase();
};

const formatRole = (role?: string) => {
  if (!role) return "Member";
  return role.charAt(0) + role.slice(1).toLowerCase();
};

const WorkspaceDetailsHeader = ({
  workspace,
  workspaceSummary,
  isActive,
  isSwitching,
}: Props) => {
  const { switchWorkspace } = useWorkspaceContext();

  return (
    <Card className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#101828] text-white shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(127,86,217,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(105,65,198,0.16),transparent_30%)]" />

      <CardContent className="relative z-10 p-6 md:p-8">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#7F56D9]/20 bg-[#7F56D9]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#CBB5FF]">
              <Sparkles className="h-3.5 w-3.5" />
              Workspace Overview
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#0C111D] shadow-[0_14px_30px_rgba(0,0,0,0.28)]">
                <BriefcaseBusiness className="h-6 w-6 text-[#CBB5FF]" />
              </div>

              <div className="min-w-0">
                <h1 className="truncate text-3xl font-bold tracking-tight text-white md:text-4xl">
                  {workspace.name}
                </h1>
                <p className="mt-2 text-sm text-[#94A3B8] md:text-base">/{workspace.slug}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {isActive ? (
                    <Badge className="rounded-full bg-[#12B76A]/15 text-[#6CE9A6] hover:bg-[#12B76A]/15">
                      Active Workspace
                    </Badge>
                  ) : null}

                  <Badge
                    variant="outline"
                    className="rounded-full border-[#7F56D9]/25 bg-[#7F56D9]/10 text-[#CBB5FF]"
                  >
                    {formatPlan(workspace.planMeta?.effectivePlan)}
                  </Badge>

                  <Badge
                    variant="outline"
                    className="rounded-full border-white/10 bg-white/5 text-[#D0D5DD]"
                  >
                    <Crown className="mr-1 h-3.5 w-3.5" />
                    {formatRole(workspaceSummary?.role)}
                  </Badge>

                  {workspace.planMeta?.isTrialActive ? (
                    <Badge
                      variant="outline"
                      className="rounded-full border-[#12B76A]/25 bg-[#12B76A]/10 text-[#6CE9A6]"
                    >
                      Trial Active
                    </Badge>
                  ) : null}
                </div>

                {workspace.planMeta?.isTrialActive && workspace.planMeta?.trialEndsAt ? (
                  <p className="mt-3 text-sm text-[#94A3B8]">
                    Trial ends{" "}
                    {new Intl.DateTimeFormat("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }).format(new Date(workspace.planMeta.trialEndsAt))}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row xl:justify-end">
            {!isActive ? (
              <Button
                onClick={() => switchWorkspace(workspace.id)}
                disabled={isSwitching}
                className="rounded-xl bg-[#7F56D9] text-white hover:bg-[#6941C6]"
              >
                <ArrowRightLeft className="mr-2 h-4 w-4" />
                {isSwitching ? "Switching..." : "Switch Workspace"}
              </Button>
            ) : null}

            <Button
              asChild
              variant="outline"
              className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              <Link href="/workspaces">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Workspaces
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              <Link href={`/workspaces/${workspace.id}/settings/general`}>
                <ShieldCheck className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkspaceDetailsHeader;
