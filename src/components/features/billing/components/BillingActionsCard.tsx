"use client";

import { CreditCard, ExternalLink } from "lucide-react";

import UpgradePlanDialog from "@/components/features/billing/components/UpgradePlanDialog";
import { useCustomerPortal } from "@/components/features/billing/hooks/useCustomerPortal";
import { Button } from "@/components/ui/button";

const BillingActionsCard = () => {
  const { mutateAsync: openPortal, isPending } = useCustomerPortal();

  const handlePortal = async () => {
    const returnUrl =
      typeof window !== "undefined" ? `${window.location.origin}/billing` : undefined;

    const result = await openPortal({ returnUrl });
    window.location.href = result.url;
  };

  return (
    <div className="rounded-[24px] border border-white/10 bg-[#101828]/85 p-6 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <h2 className="text-lg font-semibold text-white">Billing actions</h2>
      <p className="mt-1 text-sm text-[#94A3B8]">
        Upgrade your workspace or open the Stripe customer portal.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-[20px] border border-white/10 bg-white/5 p-4">
          <CreditCard className="mb-3 h-5 w-5 text-[#CBB5FF]" />
          <p className="text-base font-semibold text-white">Upgrade workspace</p>
          <p className="mt-1 text-sm text-[#94A3B8]">
            Change your billing plan using Stripe checkout.
          </p>

          <div className="mt-4">
            <UpgradePlanDialog />
          </div>
        </div>

        <div className="rounded-[20px] border border-white/10 bg-white/5 p-4">
          <ExternalLink className="mb-3 h-5 w-5 text-[#CBB5FF]" />
          <p className="text-base font-semibold text-white">Open billing portal</p>
          <p className="mt-1 text-sm text-[#94A3B8]">
            Manage payment methods, invoices, and subscription settings.
          </p>

          <div className="mt-4">
            <Button
              onClick={handlePortal}
              disabled={isPending}
              variant="outline"
              className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              {isPending ? "Opening..." : "Open Billing Portal"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingActionsCard;
