import PlanBadge from "@/components/features/billing/components/PlanBadge";
import SubscriptionStatusBadge from "@/components/features/billing/components/SubscriptionStatusBadge";
import type { BillingSubscriptionData } from "@/components/features/billing/types/billing.types";

type CurrentPlanCardProps = {
  data: BillingSubscriptionData;
};

const formatDate = (value: string | null) => {
  if (!value) return "—";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
};

const CurrentPlanCard = ({ data }: CurrentPlanCardProps) => {
  const subscription = data.subscription;

  return (
    <div className="rounded-[24px] border border-white/10 bg-[#101828]/85 p-6 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="flex flex-wrap items-center gap-3">
        <PlanBadge plan={subscription?.plan ?? "FREE"} />
        <SubscriptionStatusBadge status={subscription?.status ?? "NONE"} />
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <p className="text-sm text-[#94A3B8]">Workspace</p>
          <p className="mt-1 text-xl font-semibold text-white">{data.workspace.name}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[#667085]">Billing interval</p>
            <p className="mt-2 text-base font-semibold text-white">
              {subscription?.billingInterval ?? "—"}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[#667085]">Period end</p>
            <p className="mt-2 text-base font-semibold text-white">
              {formatDate(subscription?.currentPeriodEnd ?? null)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentPlanCard;
