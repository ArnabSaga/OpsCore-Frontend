"use client";

import { ExternalLink, Rocket } from "lucide-react";

import { useCustomerPortal } from "@/components/features/billing/hooks/useCustomerPortal";
import { usePrepareCheckout } from "@/components/features/billing/hooks/usePrepareCheckout";
import { Button } from "@/components/ui/button";
import type { BillingSubscriptionResponse } from "@/types/workspace.types";
import WorkspaceSectionCard from "./WorkspaceSectionCard";

type Props = {
  subscription: BillingSubscriptionResponse;
};

const WorkspaceBillingActions = ({ subscription }: Props) => {
  const { mutateAsync: prepareCheckout, isPending: isCheckoutPending } = usePrepareCheckout();
  const { mutateAsync: openPortal, isPending: isPortalPending } = useCustomerPortal();

  return (
    <WorkspaceSectionCard
      title="Billing actions"
      description="Upgrade plan or manage billing details through your workspace billing tools."
    >
      <div className="flex flex-wrap gap-3">
        {subscription.capabilities.canCheckout ? (
          <Button
            onClick={() =>
              prepareCheckout({
                plan: "PRO",
                billingInterval: "month",
              })
            }
            disabled={isCheckoutPending}
            className="rounded-xl bg-[#7F56D9] text-white hover:bg-[#6941C6]"
          >
            <Rocket className="mr-2 h-4 w-4" />
            Upgrade Plan
          </Button>
        ) : null}

        {subscription.capabilities.canOpenCustomerPortal ? (
          <Button
            variant="outline"
            onClick={() => openPortal()}
            disabled={isPortalPending}
            className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Open Billing Portal
          </Button>
        ) : null}
      </div>
    </WorkspaceSectionCard>
  );
};

export default WorkspaceBillingActions;
