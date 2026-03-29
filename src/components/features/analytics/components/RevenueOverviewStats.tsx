import AnalyticsSectionCard from "@/components/features/analytics/components/AnalyticsSectionCard";
import AnalyticsStatCard from "@/components/features/analytics/components/AnalyticsStatCard";
import type { RevenueAnalyticsData } from "@/components/features/analytics/types/analytics.types";

type RevenueOverviewStatsProps = {
  data: RevenueAnalyticsData;
};

const RevenueOverviewStats = ({ data }: RevenueOverviewStatsProps) => {
  const { summary } = data;

  return (
    <AnalyticsSectionCard
      title="Invoice payment summary"
      description="Headline invoice state distribution for the selected analytics range."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AnalyticsStatCard label="Pending" value={summary.pendingInvoices} />
        <AnalyticsStatCard label="Overdue" value={summary.overdueInvoices} />
        <AnalyticsStatCard label="Canceled" value={summary.canceledInvoices} />
        <AnalyticsStatCard label="Paid" value={summary.paidInvoices} />
      </div>
    </AnalyticsSectionCard>
  );
};

export default RevenueOverviewStats;
