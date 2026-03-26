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
import { BarChart3, CreditCard, Layers3, Sparkles, TrendingUp } from "lucide-react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const metricPeriods: { label: string; value: DashboardMetricsPeriod }[] = [
  { label: "7D", value: "last_7_days" },
  { label: "30D", value: "last_30_days" },
  { label: "3M", value: "last_3_months" },
  { label: "12M", value: "last_12_months" },
];

const WorkspaceDashboardPage = () => {
  const rootRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ws-hero",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      );

      gsap.fromTo(
        ".ws-section",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.15,
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  if (isOverviewLoading) {
    return (
      <div className="space-y-6">
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="rounded-[24px] border border-white/10 bg-[#1D2939]/80 p-5">
              <Skeleton className="mb-4 h-4 w-24 bg-white/10" />
              <Skeleton className="mb-3 h-8 w-20 bg-white/10" />
              <Skeleton className="h-4 w-28 bg-white/5" />
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="rounded-[24px] border border-white/10 bg-[#1D2939]/80 p-5">
            <Skeleton className="mb-4 h-5 w-40 bg-white/10" />
            <Skeleton className="h-[320px] w-full bg-white/5" />
          </div>
          <div className="rounded-[24px] border border-white/10 bg-[#1D2939]/80 p-5">
            <Skeleton className="mb-4 h-5 w-52 bg-white/10" />
            <Skeleton className="mb-6 h-[220px] w-full bg-white/5" />
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-white/5 bg-white/5 p-3">
                  <Skeleton className="mb-2 h-3 w-16 bg-white/10" />
                  <Skeleton className="h-5 w-8 bg-white/10" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (isOverviewError) {
    console.error("Dashboard overview error:", isOverviewError);
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
    <div ref={rootRef} className="relative space-y-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-8%] top-0 h-72 w-72 rounded-full bg-[#7F56D9]/18 blur-3xl" />
        <div className="absolute right-[-10%] top-24 h-72 w-72 rounded-full bg-[#6941C6]/18 blur-3xl" />
      </div>

      <section className="ws-hero relative overflow-hidden rounded-[28px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl sm:p-7">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(127,86,217,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(105,65,198,0.14),transparent_35%)]" />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-[#C7D7FE]">
              <Sparkles className="h-3.5 w-3.5 text-[#7F56D9]" />
              Workspace analytics
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Workspace Operations Dashboard
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#94A3B8] sm:text-base">
              Track execution, billing, revenue movement, project delivery, and operational activity
              across your workspace.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-[#101828]/70 px-4 py-3">
              <Layers3 className="h-4 w-4 text-[#7F56D9]" />
              <p className="mt-2 text-xs text-[#667085]">Operations</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#101828]/70 px-4 py-3">
              <BarChart3 className="h-4 w-4 text-[#B692F6]" />
              <p className="mt-2 text-xs text-[#667085]">Insights</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#101828]/70 px-4 py-3">
              <CreditCard className="h-4 w-4 text-[#12B76A]" />
              <p className="mt-2 text-xs text-[#667085]">Billing</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#101828]/70 px-4 py-3">
              <TrendingUp className="h-4 w-4 text-[#F79009]" />
              <p className="mt-2 text-xs text-[#667085]">Growth</p>
            </div>
          </div>
        </div>
      </section>

      <div className="ws-section">
        <OverviewStats overview={overview} />
      </div>

      <section className="ws-section grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-[24px] border border-white/10 bg-[#1D2939]/40 p-1 backdrop-blur-xl">
          <TaskStatusChart overview={overview} />
        </div>
        <div className="rounded-[24px] border border-white/10 bg-[#1D2939]/40 p-1 backdrop-blur-xl">
          <ProjectStatusChart overview={overview} />
        </div>
      </section>

      <section className="ws-section">
        <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#111827]/75 p-1 shadow-[0_10px_40px_rgba(0,0,0,0.24)] backdrop-blur-xl">
          <InvoicePaymentSummaryChart overview={overview} />
        </div>
      </section>

      <section className="ws-section space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Performance Trends</h2>
            <p className="text-sm text-[#94A3B8]">
              Revenue and project/task activity over the selected period.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-1 backdrop-blur">
            {metricPeriods.map((period) => (
              <Button
                key={period.value}
                type="button"
                variant="ghost"
                onClick={() => setMetricPeriod(period.value)}
                className={
                  metricPeriod === period.value
                    ? "rounded-xl bg-[#7F56D9] text-white shadow-[0_0_20px_rgba(127,86,217,0.35)] hover:bg-[#6941C6]"
                    : "rounded-xl text-[#94A3B8] hover:bg-white/10 hover:text-white"
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
              <div className="rounded-[24px] border border-white/10 bg-[#1D2939]/80 p-5">
                <Skeleton className="mb-4 h-5 w-40 bg-white/10" />
                <Skeleton className="h-[320px] w-full bg-white/5" />
              </div>
              <div className="rounded-[24px] border border-white/10 bg-[#1D2939]/80 p-5">
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
                <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#111827]/80 p-1 shadow-[0_10px_40px_rgba(0,0,0,0.24)] backdrop-blur-xl">
                  <RevenueTrendChart data={metrics?.revenue ?? []} />
                </div>
              ) : (
                <NoTrendDataState title="Revenue trend not available" />
              )}

              {hasProjectTaskTrend ? (
                <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#111827]/80 p-1 shadow-[0_10px_40px_rgba(0,0,0,0.24)] backdrop-blur-xl">
                  <ProjectTaskTrendChart
                    projects={metrics?.projects ?? []}
                    tasks={metrics?.tasks ?? []}
                  />
                </div>
              ) : (
                <NoTrendDataState title="Project/task trend not available" />
              )}
            </>
          )}
        </div>
      </section>

      <section className="ws-section grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          {isActivityError ? (
            <ProtectedPageErrorState
              title="Unable to load recent activity"
              description="We couldn’t fetch activity right now."
              onRetry={() => refetchActivity()}
            />
          ) : isActivityLoading ? (
            <div className="rounded-[24px] border border-white/10 bg-[#1D2939]/80 p-5">
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
          <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#1D2939]/75 shadow-[0_10px_40px_rgba(0,0,0,0.24)] backdrop-blur-xl">
            <SubscriptionCard overview={overview} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkspaceDashboardPage;
