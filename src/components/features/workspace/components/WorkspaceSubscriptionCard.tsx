"use client";

import { CreditCard, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { BillingSubscriptionResponse } from "@/types/workspace.types";
import WorkspaceSectionCard from "./WorkspaceSectionCard";

type Props = {
  subscription: BillingSubscriptionResponse;
};

const WorkspaceSubscriptionCard = ({ subscription }: Props) => {
  const plan = subscription.planSummary?.effectivePlan ?? subscription.subscription.plan;
  const trialActive = subscription.planSummary?.isTrialActive;

  return (
    <WorkspaceSectionCard
      title="Current subscription"
      description="Overview of your active workspace plan, trial state, and billing period."
      icon={<CreditCard className="h-4 w-4" />}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-[#94A3B8]">Plan</p>
          <p className="mt-2 text-xl font-semibold text-white">{plan}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-[#94A3B8]">Status</p>
          <p className="mt-2 text-xl font-semibold text-white">
            {subscription.subscription.status}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-[#94A3B8]">Billing period</p>
          <p className="mt-2 text-sm font-medium text-white">
            {new Intl.DateTimeFormat("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }).format(new Date(subscription.planSummary.billingCycleStartsAt))}
            {" - "}
            {new Intl.DateTimeFormat("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }).format(new Date(subscription.planSummary.billingCycleEndsAt))}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-[#94A3B8]">Trial</p>
          <div className="mt-2 flex items-center gap-2">
            <p className="text-sm font-medium text-white">
              {trialActive ? "Active" : "Not active"}
            </p>
            {trialActive ? (
              <Badge className="rounded-full bg-[#12B76A]/15 text-[#6CE9A6] hover:bg-[#12B76A]/15">
                <Sparkles className="mr-1 h-3 w-3" />
                Trial
              </Badge>
            ) : null}
          </div>
        </div>
      </div>
    </WorkspaceSectionCard>
  );
};

export default WorkspaceSubscriptionCard;
