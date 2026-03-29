"use client";

import { useMemo } from "react";

import BillingIntervalToggle from "@/components/features/billing/components/BillingIntervalToggle";
import PlanSelector from "@/components/features/billing/components/PlanSelector";
import { useBillingPlanSelection } from "@/components/features/billing/hooks/useBillingPlanSelection";
import { usePrepareCheckout } from "@/components/features/billing/hooks/usePrepareCheckout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type UpgradePlanDialogProps = {
  triggerLabel?: string;
};

const UpgradePlanDialog = ({ triggerLabel = "Upgrade Plan" }: UpgradePlanDialogProps) => {
  const { mutateAsync: prepareCheckout, isPending } = usePrepareCheckout();

  const successUrl = useMemo(() => {
    if (typeof window === "undefined") return undefined;
    return `${window.location.origin}/billing/success`;
  }, []);

  const cancelUrl = useMemo(() => {
    if (typeof window === "undefined") return undefined;
    return `${window.location.origin}/billing/cancel`;
  }, []);

  const {
    selectedPlan,
    selectedBillingInterval,
    checkoutPayload,
    setSelectedPlan,
    setSelectedBillingInterval,
  } = useBillingPlanSelection({
    successUrl,
    cancelUrl,
  });

  const handleUpgrade = async () => {
    const result = await prepareCheckout(checkoutPayload);
    window.location.href = result.checkoutUrl;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-xl bg-[#7F56D9] text-white hover:bg-[#6941C6]">
          {triggerLabel}
        </Button>
      </DialogTrigger>

      <DialogContent className="border-white/10 bg-[#101828] text-white sm:max-w-[620px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">
            Upgrade billing plan
          </DialogTitle>
          <DialogDescription className="text-[#94A3B8]">
            Choose your paid plan and billing interval, then continue to Stripe checkout.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <p className="mb-3 text-sm font-medium text-white">Select plan</p>
            <PlanSelector value={selectedPlan} onChange={setSelectedPlan} />
          </div>

          <div>
            <p className="mb-3 text-sm font-medium text-white">Billing interval</p>
            <BillingIntervalToggle
              value={selectedBillingInterval}
              onChange={setSelectedBillingInterval}
            />
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-[#94A3B8]">
            You selected <span className="font-medium text-white">{selectedPlan}</span> on{" "}
            <span className="font-medium text-white">
              {selectedBillingInterval === "month" ? "Monthly" : "Yearly"}
            </span>.
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleUpgrade}
              disabled={isPending}
              className="rounded-xl bg-[#7F56D9] text-white hover:bg-[#6941C6]"
            >
              {isPending ? "Preparing checkout..." : "Continue to Stripe"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpgradePlanDialog;
