"use client";

import { CreditCard, Sparkles, ArrowUpRight, Settings2 } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { DashboardOverview } from "@/types/dashboard.types";
import { usePrepareCheckout } from "@/components/features/billing/hooks/usePrepareCheckout";
import { useCustomerPortal } from "@/components/features/billing/hooks/useCustomerPortal";
import type { CheckoutBillingInterval } from "@/components/features/billing/types/billing.types";

type SubscriptionCardProps = {
  overview: DashboardOverview;
};

const SubscriptionCard = ({ overview }: SubscriptionCardProps) => {
  const subscription = overview.subscription;
  const workspaceRole = overview.workspace.role;

  const { mutateAsync: prepareCheckout, isPending: isPreparingCheckout } = usePrepareCheckout();
  const { mutateAsync: openPortal, isPending: isOpeningPortal } = useCustomerPortal();

  const [billingInterval] = useState<CheckoutBillingInterval>("month");

  if (!subscription) return null;

  const isOwner = workspaceRole === "OWNER";
  const isAdmin = workspaceRole === "ADMIN";

  const handleUpgradePlan = async () => {
    const result = await prepareCheckout({
      plan: "PRO",
      billingInterval,
      successUrl:
        typeof window !== "undefined" ? `${window.location.origin}/billing/success` : undefined,
      cancelUrl: typeof window !== "undefined" ? `${window.location.origin}/dashboard` : undefined,
    });

    if (result.checkoutUrl) {
      window.location.href = result.checkoutUrl;
    }
  };

  const handleManageBilling = async () => {
    const result = await openPortal({
      returnUrl: typeof window !== "undefined" ? `${window.location.origin}/billing` : undefined,
    });

    if (result.url) {
      window.location.href = result.url;
    }
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

        {isOwner ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Button
              onClick={handleUpgradePlan}
              disabled={isPreparingCheckout}
              className="bg-[#7F56D9] text-white hover:bg-[#6941C6]"
            >
              <ArrowUpRight className="mr-2 h-4 w-4" />
              {isPreparingCheckout ? "Preparing..." : "Upgrade Plan"}
            </Button>

            <Button
              onClick={handleManageBilling}
              disabled={isOpeningPortal}
              variant="outline"
              className="border-white/10 bg-white/3 text-white hover:bg-white/6"
            >
              <Settings2 className="mr-2 h-4 w-4" />
              {isOpeningPortal ? "Opening..." : "Manage Billing"}
            </Button>
          </div>
        ) : isAdmin ? (
          <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
            <p className="text-sm text-[#94A3B8]">Billing is managed by the workspace owner.</p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default SubscriptionCard;
