"use client";

import { differenceInDays, format } from "date-fns";
import { CreditCard, Sparkles, Timer } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DashboardOverview } from "@/types/dashboard.types";

type SubscriptionCardProps = {
  overview: DashboardOverview;
};

const SubscriptionCard = ({ overview }: SubscriptionCardProps) => {
  const subscription = overview.subscription;

  const daysRemaining = subscription.trialEndsAt
    ? differenceInDays(new Date(subscription.trialEndsAt), new Date())
    : null;

  const getUrgencyColor = (days: number) => {
    if (days <= 3) return "bg-red-500/20 text-red-400 border-red-500/20";
    if (days <= 7) return "bg-amber-500/20 text-amber-400 border-amber-500/20";
    return "bg-[#12B76A]/20 text-[#12B76A] border-[#12B76A]/20";
  };

  return (
    <Card className="border-white/10 bg-[#1D2939]/80 text-white shadow-[0_10px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg text-white">
          <CreditCard className="h-5 w-5 text-[#CBB5FF]" />
          Subscription
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="rounded-2xl border border-[#7F56D9]/20 bg-[#7F56D9]/10 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-[#94A3B8]">Current Plan</p>
              <h3 className="mt-1 text-2xl font-bold text-white">{subscription.effectivePlan}</h3>
            </div>

            <div className="rounded-xl bg-[#6941C6]/20 p-2">
              <Sparkles className="h-5 w-5 text-[#CBB5FF]" />
            </div>
          </div>

          {daysRemaining !== null && (
            <div
              className={`mt-4 flex items-center gap-2 rounded-xl border p-2.5 text-xs font-semibold backdrop-blur-md ${getUrgencyColor(
                daysRemaining
              )}`}
            >
              <Timer className="h-3.5 w-3.5" />
              <span>
                {daysRemaining > 0
                  ? `${daysRemaining} Days Remaining`
                  : daysRemaining === 0
                  ? "Last day of trial"
                  : "Trial Expired"}
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-[#667085]">Base Plan</p>
            <p className="mt-2 text-sm font-medium text-white">{subscription.basePlan}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-[#667085]">Trial Status</p>
            <p className="mt-2 text-sm font-medium text-white">
              {subscription.isTrialActive ? "Active Trial" : "Standard Billing"}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-[#667085]">Cycle Start</p>
            <p className="mt-2 text-sm font-medium text-white">
              {format(new Date(subscription.billingCycleStartsAt), "dd MMM yyyy")}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-[#667085]">Cycle End</p>
            <p className="mt-2 text-sm font-medium text-white">
              {format(new Date(subscription.billingCycleEndsAt), "dd MMM yyyy")}
            </p>
          </div>
        </div>

        {subscription.trialEndsAt ? (
          <div className="rounded-2xl border border-[#12B76A]/20 bg-[#12B76A]/10 p-4">
            <p className="text-sm text-[#D1FADF]">
              Trial ends on{" "}
              <span className="font-semibold text-white">
                {format(new Date(subscription.trialEndsAt), "dd MMM yyyy")}
              </span>
            </p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default SubscriptionCard;
