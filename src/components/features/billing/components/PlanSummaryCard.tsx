import type { BillingSubscriptionData } from "@/components/features/billing/types/billing.types";

type PlanSummaryCardProps = {
  data: BillingSubscriptionData;
};

const PlanSummaryCard = ({ data }: PlanSummaryCardProps) => {
  const capabilitiesToDisplay = Array.isArray(data.capabilities) ? data.capabilities : [];
  const enabledCapabilities = capabilitiesToDisplay.filter((item) => item.enabled);

  return (
    <div className="rounded-[24px] border border-white/10 bg-[#101828]/85 p-6 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <h2 className="text-lg font-semibold text-white">Plan summary</h2>
      <p className="mt-1 text-sm text-[#94A3B8]">
        Active capabilities and plan access for this workspace.
      </p>

      <div className="mt-5 space-y-3">
        {enabledCapabilities.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-[#94A3B8]">
            No capability data available.
          </div>
        ) : (
          enabledCapabilities.slice(0, 6).map((capability) => (
            <div
              key={capability.key}
              className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
            >
              <span className="text-sm text-white">{capability.label}</span>
              <span className="text-xs font-medium uppercase tracking-[0.14em] text-[#CBB5FF]">
                enabled
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PlanSummaryCard;
