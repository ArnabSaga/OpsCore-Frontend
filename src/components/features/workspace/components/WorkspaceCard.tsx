"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ArrowRight, BriefcaseBusiness, CheckCircle2, Crown, Loader2, Users } from "lucide-react";

import type { WorkspaceSummary } from "@/types/workspace.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useWorkspaceContext } from "@/hooks/useWorkspaceContext";
import { cn } from "@/lib/utils";

type Props = {
  workspace: WorkspaceSummary;
};

const formatPlan = (plan?: string) => {
  if (!plan) return "Unknown";
  return plan.charAt(0) + plan.slice(1).toLowerCase();
};

const formatRole = (role?: string) => {
  if (!role) return "Member";
  return role.charAt(0) + role.slice(1).toLowerCase();
};

const formatStatus = (status?: string) => {
  if (!status) return "Active";
  return status.charAt(0) + status.slice(1).toLowerCase();
};

const WorkspaceCard = ({ workspace }: Props) => {
  const { activeWorkspaceId, switchingWorkspaceId, switchWorkspace } = useWorkspaceContext();

  const isActive = workspace.id === activeWorkspaceId || workspace.isActiveWorkspace;
  const memberCount = workspace._count?.members ?? 0;
  const planLabel = formatPlan(workspace.planMeta?.effectivePlan);
  const roleLabel = formatRole(workspace.role);
  const statusLabel = formatStatus(workspace.status);
  const isSwitching = !!switchingWorkspaceId;
  const isCurrentSwitchTarget = switchingWorkspaceId === workspace.id;

  const updatedAt = useMemo(() => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(workspace.updatedAt));
  }, [workspace.updatedAt]);

  return (
    <Card className="rounded-[24px] border border-white/10 bg-[#1D2939]/80 text-white shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#7F56D9]/30 hover:shadow-[0_24px_80px_rgba(127,86,217,0.18)]">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#0C111D] shadow-[0_14px_30px_rgba(0,0,0,0.28)]">
              <BriefcaseBusiness className="h-5 w-5 text-[#CBB5FF]" />
            </div>

            <div className="min-w-0">
              <CardTitle className="truncate text-lg font-semibold text-white">
                {workspace.name}
              </CardTitle>
              <CardDescription className="mt-1 truncate text-sm text-[#94A3B8]">
                /{workspace.slug}
              </CardDescription>
            </div>
          </div>

          {isActive ? (
            <Badge className="rounded-full bg-[#12B76A]/15 px-2.5 py-1 text-[#6CE9A6] hover:bg-[#12B76A]/15">
              Active
            </Badge>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge
            variant="outline"
            className="rounded-full border-[#7F56D9]/25 bg-[#7F56D9]/10 text-[#CBB5FF]"
          >
            {planLabel}
          </Badge>

          <Badge
            variant="outline"
            className="rounded-full border-white/10 bg-white/5 text-[#D0D5DD]"
          >
            {roleLabel}
          </Badge>

          {workspace.planMeta?.isTrialActive && workspace.planMeta?.trialEndsAt ? (
            <div className="flex flex-col gap-1">
              <Badge
                variant="outline"
                className="w-fit rounded-full border-[#12B76A]/25 bg-[#12B76A]/10 text-[#6CE9A6]"
              >
                Trial Active
              </Badge>
              <p className="px-1 text-[10px] text-[#94A3B8]">
                Ends{" "}
                {new Intl.DateTimeFormat("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }).format(new Date(workspace.planMeta.trialEndsAt))}
              </p>
            </div>
          ) : workspace.planMeta?.isTrialActive ? (
            <Badge
              variant="outline"
              className="rounded-full border-[#12B76A]/25 bg-[#12B76A]/10 text-[#6CE9A6]"
            >
              Trial Active
            </Badge>
          ) : null}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/10 bg-[#101828]/80 p-4">
            <div className="mb-2 flex items-center gap-2 text-[#94A3B8]">
              <Users className="h-4 w-4" />
              <span className="text-xs font-medium uppercase tracking-[0.16em]">Members</span>
            </div>
            <p className="text-2xl font-semibold text-white">{memberCount}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#101828]/80 p-4">
            <div className="mb-2 flex items-center gap-2 text-[#94A3B8]">
              <Crown className="h-4 w-4" />
              <span className="text-xs font-medium uppercase tracking-[0.16em]">Updated</span>
            </div>
            <p className="text-sm font-medium text-white">{updatedAt}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-[#94A3B8]">Workspace status</span>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-white">
              <CheckCircle2 className="h-4 w-4 text-[#12B76A]" />
              {statusLabel}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row">
        <Button
          onClick={() => switchWorkspace(workspace.id)}
          disabled={isActive || isSwitching}
          className={cn(
            "w-full rounded-xl text-white sm:flex-1",
            isActive ? "bg-[#12B76A]/15 hover:bg-[#12B76A]/15" : "bg-[#7F56D9] hover:bg-[#6941C6]"
          )}
        >
          {isCurrentSwitchTarget ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {isActive ? "Current Workspace" : "Switch Workspace"}
        </Button>

        <Button
          asChild
          variant="outline"
          className="w-full rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10 sm:flex-1"
        >
          <Link href={`/workspaces/${workspace.id}`}>
            View Details
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WorkspaceCard;
