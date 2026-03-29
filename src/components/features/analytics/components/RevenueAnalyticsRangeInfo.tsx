import type { AnalyticsRange } from "@/components/features/analytics/types/analytics.types";

type RevenueAnalyticsRangeInfoProps = {
  range: AnalyticsRange;
};

const formatRangeDate = (value: string | null) => {
  if (!value) return "Not set";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
};

const RevenueAnalyticsRangeInfo = ({ range }: RevenueAnalyticsRangeInfoProps) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#94A3B8]">
      Showing revenue analytics from{" "}
      <span className="font-medium text-white">{formatRangeDate(range.from)}</span> to{" "}
      <span className="font-medium text-white">{formatRangeDate(range.to)}</span>.
    </div>
  );
};

export default RevenueAnalyticsRangeInfo;
