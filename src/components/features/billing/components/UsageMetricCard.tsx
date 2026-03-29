import type { BillingUsageMetric } from "@/components/features/billing/types/billing.types";

type UsageMetricCardProps = {
  metric: BillingUsageMetric;
};

const UsageMetricCard = ({ metric }: UsageMetricCardProps) => {
  const percentage =
    metric.unlimited || metric.limit === null || metric.limit === 0
      ? 0
      : Math.min((metric.usage / metric.limit) * 100, 100);

  return (
    <div className="rounded-[20px] border border-white/10 bg-white/5 p-4">
      <p className="text-sm font-medium text-white">{metric.label}</p>

      <div className="mt-3 flex items-end justify-between gap-4">
        <div>
          <p className="text-2xl font-semibold text-white">{metric.usage}</p>
          <p className="mt-1 text-sm text-[#94A3B8]">
            {metric.unlimited
              ? "Unlimited plan access"
              : `${metric.remaining ?? 0} remaining of ${metric.limit}`}
          </p>
        </div>

        {!metric.unlimited ? (
          <span className="text-sm font-medium text-[#CBB5FF]">{percentage.toFixed(0)}%</span>
        ) : null}
      </div>

      {!metric.unlimited ? (
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-[#7F56D9]" style={{ width: `${percentage}%` }} />
        </div>
      ) : null}
    </div>
  );
};

export default UsageMetricCard;
