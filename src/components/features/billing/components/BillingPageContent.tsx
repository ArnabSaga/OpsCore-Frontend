"use client";

import gsap from "gsap";
import { useEffect, useMemo, useRef } from "react";

import BillingActionsCard from "@/components/features/billing/components/BillingActionsCard";
import BillingEmptyState from "@/components/features/billing/components/BillingEmptyState";
import BillingHero from "@/components/features/billing/components/BillingHero";
import BillingHistoryTable from "@/components/features/billing/components/BillingHistoryTable";
import BillingPageSkeleton from "@/components/features/billing/components/BillingPageSkeleton";
import CurrentPlanCard from "@/components/features/billing/components/CurrentPlanCard";
import PlanSummaryCard from "@/components/features/billing/components/PlanSummaryCard";
import UsageMetricsGrid from "@/components/features/billing/components/UsageMetricsGrid";
import { useBillingHistory } from "@/components/features/billing/hooks/useBillingHistory";
import { useBillingHistoryFilters } from "@/components/features/billing/hooks/useBillingHistoryFilters";
import { useBillingSubscription } from "@/components/features/billing/hooks/useBillingSubscription";
import { useBillingUsage } from "@/components/features/billing/hooks/useBillingUsage";
import ProtectedPageErrorState from "@/components/shared/error-state/ProtectedPageErrorState";

const BillingPageContent = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { params, setStartingAfter } = useBillingHistoryFilters();

  const {
    data: subscriptionResponse,
    isLoading: subscriptionLoading,
    isError: subscriptionError,
    refetch: refetchSubscription,
  } = useBillingSubscription();

  const {
    data: historyResponse,
    isLoading: historyLoading,
    isError: historyError,
    refetch: refetchHistory,
  } = useBillingHistory({ params });

  const {
    data: usageResponse,
    isLoading: usageLoading,
    isError: usageError,
    refetch: refetchUsage,
  } = useBillingUsage();

  const isLoading = subscriptionLoading || historyLoading || usageLoading;
  const isError = subscriptionError || historyError || usageError;

  const subscriptionData = subscriptionResponse?.data;
  const historyData = historyResponse?.data;
  const usageData = usageResponse?.data;

  const isEmpty = useMemo(() => {
    return (
      !subscriptionData &&
      (historyData?.invoices?.length ?? 0) === 0 &&
      (usageData?.metrics?.length ?? 0) === 0
    );
  }, [subscriptionData, historyData?.invoices, usageData?.metrics]);

  useEffect(() => {
    if (!containerRef.current || isLoading || !subscriptionData) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-billing-hero]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );

      gsap.fromTo(
        "[data-billing-section]",
        { opacity: 0, y: 22, scale: 0.99 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.42,
          stagger: 0.06,
          delay: 0.06,
          ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading, subscriptionData]);

  if (isLoading) {
    return <BillingPageSkeleton />;
  }

  if (isError) {
    return (
      <ProtectedPageErrorState
        title="Unable to load billing"
        description="We couldn't fetch the billing workspace right now."
        onRetry={() => {
          void refetchSubscription();
          void refetchHistory();
          void refetchUsage();
        }}
      />
    );
  }

  if (!subscriptionData || !historyData || !usageData || isEmpty) {
    return <BillingEmptyState />;
  }

  return (
    <div ref={containerRef} className="space-y-8">
      <BillingHero workspaceName={subscriptionData.workspace.name} />

      <div className="grid gap-6 xl:grid-cols-2">
        <div data-billing-section>
          <CurrentPlanCard data={subscriptionData} />
        </div>

        <div data-billing-section>
          <PlanSummaryCard data={subscriptionData} />
        </div>
      </div>

      <div data-billing-section>
        <BillingActionsCard />
      </div>

      <div data-billing-section>
        <UsageMetricsGrid metrics={usageData.metrics} />
      </div>

      <div data-billing-section>
        <BillingHistoryTable
          invoices={historyData.invoices}
          hasMore={historyData.hasMore}
          onLoadMore={
            historyData.hasMore && historyData.nextCursor
              ? () => setStartingAfter(historyData.nextCursor || "")
              : undefined
          }
        />
      </div>
    </div>
  );
};

export default BillingPageContent;
