"use client";

import InvoicePaymentSummaryChart from "@/components/charts/InvoicePaymentSummaryChart";
import ProjectStatusChart from "@/components/charts/ProjectStatusChart";
import ProjectTaskTrendChart from "@/components/charts/ProjectTaskTrendChart";
import RevenueTrendChart from "@/components/charts/RevenueTrendChart";
import TaskStatusChart from "@/components/charts/TaskStatusChart";
import RecentActivityList from "@/components/features/dashboard/activity/RecentActivityList";
import { useDashboardActivity } from "@/components/features/dashboard/hooks/useDashboardActivity";
import { useDashboardMetrics } from "@/components/features/dashboard/hooks/useDashboardMetrics";
import { useDashboardOverview } from "@/components/features/dashboard/hooks/useDashboardOverview";
import OverviewStats from "@/components/features/dashboard/overview/OverviewStats";
import SubscriptionCard from "@/components/features/dashboard/overview/SubscriptionCard";
import NoTrendDataState from "@/components/shared/empty-state/NoTrendDataState";
import NoDashboardDataState from "@/components/shared/error-state/NoDashboardDataState";
import ProtectedPageErrorState from "@/components/shared/error-state/ProtectedPageErrorState";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardMetricsPeriod } from "@/types/dashboard.types";
import { useState } from "react";

const metricPeriods: { label: string; value: DashboardMetricsPeriod }[] = [
  { label: "7D", value: "last_7_days" },
  { label: "30D", value: "last_30_days" },
  { label: "3M", value: "last_3_months" },
  { label: "12M", value: "last_12_months" },
];

const DashboardPage = () => {
  const [metricPeriod, setMetricPeriod] = useState<DashboardMetricsPeriod>("last_30_days");

  const {
    data: overview,
    isLoading: isOverviewLoading,
    isError: isOverviewError,
    refetch: refetchOverview,
  } = useDashboardOverview();

  const {
    data: activityResponse,
    isLoading: isActivityLoading,
    isError: isActivityError,
    refetch: refetchActivity,
  } = useDashboardActivity({ page: 1, limit: 8 });

  const {
    data: metrics,
    isLoading: isMetricsLoading,
    isError: isMetricsError,
    refetch: refetchMetrics,
  } = useDashboardMetrics(metricPeriod);

  if (isOverviewLoading) {
    return (
      <div className="space-y-6">
        {/* Stat Cards Skeleton */}
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="rounded-2xl border border-white/10 bg-[#1D2939]/80 p-5">
              <Skeleton className="mb-4 h-4 w-24 bg-white/10" />
              <Skeleton className="mb-3 h-8 w-20 bg-white/10" />
              <Skeleton className="h-4 w-28 bg-white/5" />
            </div>
          ))}
        </section>

        {/* Improved Status Charts Skeleton */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-[#1D2939]/80 p-5">
            <Skeleton className="mb-4 h-5 w-40 bg-white/10" />
            <Skeleton className="h-[320px] w-full bg-white/5" />
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#1D2939]/80 p-5">
            <Skeleton className="mb-4 h-5 w-52 bg-white/10" />
            <Skeleton className="mb-6 h-[220px] w-full bg-white/5" />
            {/* Project Status Nested Cards */}
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-white/5 bg-white/2 p-3">
                  <Skeleton className="mb-2 h-3 w-16 bg-white/10" />
                  <Skeleton className="h-5 w-8 bg-white/10" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Improved Invoice Summary Skeleton */}
        <section className="rounded-2xl border border-white/10 bg-[#1D2939]/80 p-5">
          <Skeleton className="mb-6 h-5 w-48 bg-white/10" />
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_220px]">
            <Skeleton className="h-[300px] w-full bg-white/5" />
            <div className="flex flex-col justify-center space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-white/5 bg-white/2 p-4">
                  <Skeleton className="mb-2 h-3 w-20 bg-white/10" />
                  <Skeleton className="h-6 w-16 bg-white/10" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trends Section Skeleton */}
        <section className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <Skeleton className="h-6 w-48 bg-white/10" />
              <Skeleton className="h-4 w-64 bg-white/5" />
            </div>
            <div className="flex gap-2 p-1 rounded-2xl border border-white/10 bg-white/3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-9 w-12 rounded-xl bg-white/5" />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-[#1D2939]/80 p-5">
              <Skeleton className="mb-4 h-5 w-40 bg-white/10" />
              <Skeleton className="h-[320px] w-full bg-white/5" />
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#1D2939]/80 p-5">
              <Skeleton className="mb-4 h-5 w-52 bg-white/10" />
              <Skeleton className="h-[320px] w-full bg-white/5" />
            </div>
          </div>
        </section>

        {/* Improved Activity + Subscription Skeleton */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2 rounded-2xl border border-white/10 bg-[#1D2939]/80 p-5">
            <Skeleton className="mb-6 h-5 w-40 bg-white/10" />
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 shrink-0 rounded-full bg-white/10" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-full bg-white/10" />
                    <Skeleton className="h-3 w-1/2 bg-white/5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#1D2939]/80 shadow-[0_10px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl p-5">
            <Skeleton className="mb-4 h-5 w-36 bg-white/10" />
            <Skeleton className="mb-6 h-4 w-full bg-white/5" />
            <Skeleton className="mb-8 h-20 w-full rounded-2xl bg-white/5" />
            <Skeleton className="h-12 w-full rounded-xl bg-[#7F56D9]/20" />
          </div>
        </section>
      </div>
    );
  }

  if (isOverviewError) {
    return (
      <ProtectedPageErrorState
        title="Unable to load dashboard"
        description="We couldn&apos;t fetch your dashboard overview right now."
        onRetry={() => {
          refetchOverview();
          refetchActivity();
          refetchMetrics();
        }}
      />
    );
  }

  if (!overview) {
    return <NoDashboardDataState />;
  }

  const activities = activityResponse?.data ?? [];
  const hasRevenueTrend = (metrics?.revenue?.length ?? 0) > 0;
  const hasProjectTaskTrend =
    (metrics?.projects?.length ?? 0) > 0 || (metrics?.tasks?.length ?? 0) > 0;

  return (
    <div className="space-y-6">
      <OverviewStats overview={overview} />

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <TaskStatusChart overview={overview} />
        <ProjectStatusChart overview={overview} />
      </section>

      <section>
        <InvoicePaymentSummaryChart overview={overview} />
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Performance Trends</h2>
            <p className="text-sm text-[#94A3B8]">
              Revenue and project/task activity over the selected period.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/3 p-1">
            {metricPeriods.map((period) => (
              <Button
                key={period.value}
                type="button"
                variant="ghost"
                onClick={() => setMetricPeriod(period.value)}
                className={
                  metricPeriod === period.value
                    ? "bg-[#7F56D9] text-white hover:bg-[#6941C6]"
                    : "text-[#94A3B8] hover:bg-white/6 hover:text-white"
                }
              >
                {period.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {isMetricsLoading ? (
            <>
              <div className="rounded-2xl border border-white/10 bg-[#1D2939]/80 p-5">
                <Skeleton className="mb-4 h-5 w-40 bg-white/10" />
                <Skeleton className="h-[320px] w-full bg-white/5" />
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#1D2939]/80 p-5">
                <Skeleton className="mb-4 h-5 w-52 bg-white/10" />
                <Skeleton className="h-[320px] w-full bg-white/5" />
              </div>
            </>
          ) : isMetricsError ? (
            <>
              <ProtectedPageErrorState
                title="Unable to load revenue trend"
                description="We couldn’t fetch revenue trend data right now."
                onRetry={() => refetchMetrics()}
              />
              <ProtectedPageErrorState
                title="Unable to load activity trend"
                description="We couldn’t fetch project/task trend data right now."
                onRetry={() => refetchMetrics()}
              />
            </>
          ) : (
            <>
              {hasRevenueTrend ? (
                <RevenueTrendChart data={metrics?.revenue ?? []} />
              ) : (
                <NoTrendDataState title="Revenue trend not available" />
              )}

              {hasProjectTaskTrend ? (
                <ProjectTaskTrendChart
                  projects={metrics?.projects ?? []}
                  tasks={metrics?.tasks ?? []}
                />
              ) : (
                <NoTrendDataState title="Project/task trend not available" />
              )}
            </>
          )}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          {isActivityError ? (
            <ProtectedPageErrorState
              title="Unable to load recent activity"
              description="We couldn’t fetch activity right now."
              onRetry={() => refetchActivity()}
            />
          ) : isActivityLoading ? (
            <div className="rounded-2xl border border-white/10 bg-[#1D2939]/80 p-5">
              <Skeleton className="mb-4 h-5 w-40 bg-white/10" />
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-20 w-full rounded-2xl bg-white/5" />
                ))}
              </div>
            </div>
          ) : (
            <RecentActivityList activities={activities} />
          )}
        </div>

        <div>
          <SubscriptionCard overview={overview} />
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
