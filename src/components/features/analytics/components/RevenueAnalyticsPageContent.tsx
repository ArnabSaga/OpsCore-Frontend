"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

import InvoicePaymentSummaryChart from "@/components/features/analytics/components/InvoicePaymentSummaryChart";
import RevenueAnalyticsEmptyState from "@/components/features/analytics/components/RevenueAnalyticsEmptyState";
import RevenueAnalyticsHero from "@/components/features/analytics/components/RevenueAnalyticsHero";
import RevenueAnalyticsRangeInfo from "@/components/features/analytics/components/RevenueAnalyticsRangeInfo";
import RevenueAnalyticsSkeleton from "@/components/features/analytics/components/RevenueAnalyticsSkeleton";
import RevenueAnalyticsToolbar from "@/components/features/analytics/components/RevenueAnalyticsToolbar";
import RevenueCurrencyTable from "@/components/features/analytics/components/RevenueCurrencyTable";
import RevenueOverviewStats from "@/components/features/analytics/components/RevenueOverviewStats";
import RevenueTrendChart from "@/components/features/analytics/components/RevenueTrendChart";
import { useRevenueAnalytics } from "@/components/features/analytics/hooks/useRevenueAnalytics";
import { useRevenueAnalyticsFilters } from "@/components/features/analytics/hooks/useRevenueAnalyticsFilters";
import FeatureRestrictedState from "@/components/shared/error-state/FeatureRestrictedState";
import ProtectedPageErrorState from "@/components/shared/error-state/ProtectedPageErrorState";

const RevenueAnalyticsPageContent = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { from, to, currency, params, setFrom, setTo, setCurrency, resetFilters } =
    useRevenueAnalyticsFilters();

  const { data, isLoading, error, isError, refetch } = useRevenueAnalytics({
    params,
  });

  const analytics = data?.data;

  useEffect(() => {
    if (!containerRef.current || isLoading || !analytics) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-revenue-analytics-hero]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );

      gsap.fromTo(
        "[data-revenue-analytics-toolbar]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.45, delay: 0.06, ease: "power3.out" }
      );

      gsap.fromTo(
        "[data-revenue-analytics-section]",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, delay: 0.08, ease: "power3.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading, analytics]);

  if (isLoading) {
    return <RevenueAnalyticsSkeleton />;
  }

  if (isError || !analytics) {
    const isRestricted = (error as Error & { status?: number })?.status === 403;

    if (isRestricted) {
      return (
        <FeatureRestrictedState
          title="Revenue Analytics Restricted"
          description="Detailed revenue insights and financial trends are available on our PRO and Enterprise plans. Upgrade your workspace to unlock these features."
        />
      );
    }

    return (
      <ProtectedPageErrorState
        title="Unable to load revenue analytics"
        description="We couldn't fetch workspace revenue analytics right now."
        onRetry={() => void refetch()}
      />
    );
  }

  if (analytics.summary.totalInvoices === 0 && analytics.totalsByCurrency.length === 0) {
    return <RevenueAnalyticsEmptyState />;
  }

  return (
    <div ref={containerRef} className="space-y-8">
      <RevenueAnalyticsHero
        totalInvoices={analytics.summary.totalInvoices}
        paidInvoices={analytics.summary.paidInvoices}
        overdueInvoices={analytics.summary.overdueInvoices}
      />

      <div data-revenue-analytics-toolbar>
        <RevenueAnalyticsToolbar
          from={from}
          to={to}
          currency={currency}
          onFromChange={setFrom}
          onToChange={setTo}
          onCurrencyChange={setCurrency}
          onReset={resetFilters}
        />
      </div>

      <div data-revenue-analytics-section>
        <RevenueAnalyticsRangeInfo range={analytics.range} />
      </div>

      <div data-revenue-analytics-section>
        <RevenueOverviewStats data={analytics} />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div data-revenue-analytics-section>
          <RevenueTrendChart series={analytics.monthlySeries} />
        </div>

        <div data-revenue-analytics-section>
          <InvoicePaymentSummaryChart summary={analytics.summary} />
        </div>
      </div>

      <div data-revenue-analytics-section>
        <RevenueCurrencyTable items={analytics.totalsByCurrency} />
      </div>
    </div>
  );
};

export default RevenueAnalyticsPageContent;
