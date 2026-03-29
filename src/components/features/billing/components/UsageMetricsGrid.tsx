import UsageMetricCard from "@/components/features/billing/components/UsageMetricCard";
import type { BillingUsageMetric } from "@/components/features/billing/types/billing.types";

type UsageMetricsGridProps = {
  metrics: BillingUsageMetric[];
};

const UsageMetricsGrid = ({ metrics }: UsageMetricsGridProps) => {
  return (
    <div className="rounded-[24px] border border-white/10 bg-[#101828]/85 p-6 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <h2 className="text-lg font-semibold text-white">Usage metrics</h2>
      <p className="mt-1 text-sm text-[#94A3B8]">
        Monitor usage against current workspace plan limits.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {metrics.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-10 text-center text-sm text-[#94A3B8] md:col-span-2 xl:col-span-3">
            No usage metrics available.
          </div>
        ) : (
          metrics.map((metric) => <UsageMetricCard key={metric.key} metric={metric} />)
        )}
      </div>
    </div>
  );
};

export default UsageMetricsGrid;
