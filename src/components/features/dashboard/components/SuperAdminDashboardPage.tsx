"use client";

import GrowthTrendChart from "@/components/charts/GrowthTrendChart";
import RevenueTrendChart from "@/components/charts/RevenueTrendChart";
import RecentActivityList from "@/components/features/dashboard/activity/RecentActivityList";
import { usePlatformDashboardActivity } from "@/components/features/dashboard/hooks/usePlatformDashboardActivity";
import { usePlatformDashboardMetrics } from "@/components/features/dashboard/hooks/usePlatformDashboardMetrics";
import { usePlatformDashboardOverview } from "@/components/features/dashboard/hooks/usePlatformDashboardOverview";
import NoTrendDataState from "@/components/shared/empty-state/NoTrendDataState";
import NoDashboardDataState from "@/components/shared/error-state/NoDashboardDataState";
import ProtectedPageErrorState from "@/components/shared/error-state/ProtectedPageErrorState";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { PlatformMetricsPeriod } from "@/types/dashboard.types";
import { ArrowUpRight, Briefcase, CreditCard, Receipt, Sparkles, Users } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";

const metricPeriods: { label: string; value: PlatformMetricsPeriod }[] = [
  { label: "7D", value: "last_7_days" },
  { label: "30D", value: "last_30_days" },
  { label: "3M", value: "last_3_months" },
  { label: "12M", value: "last_12_months" },
];

type GrowthMetricLike = {
  value?: number;
  created?: number;
  paid?: number;
};

const resolveMetricValue = (point?: GrowthMetricLike | null) => {
  if (!point) return 0;
  if (typeof point.value === "number") return point.value;
  if (typeof point.created === "number") return point.created;
  if (typeof point.paid === "number") return point.paid;
  return 0;
};

const SuperAdminDashboardPage = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [metricPeriod, setMetricPeriod] = useState<PlatformMetricsPeriod>("last_30_days");

  const {
    data: overview,
    isLoading: isOverviewLoading,
    isError: isOverviewError,
    refetch: refetchOverview,
  } = usePlatformDashboardOverview();

  const {
    data: metrics,
    isLoading: isMetricsLoading,
    isError: isMetricsError,
    refetch: refetchMetrics,
  } = usePlatformDashboardMetrics(metricPeriod);

   const {
    data: activityResponse,
    isLoading: isActivityLoading,
    isError: isActivityError,
    refetch: refetchActivity,
  } = usePlatformDashboardActivity({ page: 1, limit: 10 });

  const growthData = useMemo(() => {
    if (!metrics) return [];

    const mergeMap = new Map<
      string,
      {
        key: string;
        label: string;
        users: number;
        workspaces: number;
        subscriptions: number;
      }
    >();

    metrics.users.forEach((u) => {
      const k = u.key as string;
      mergeMap.set(k, {
        key: k,
        label: u.label as string,
        users: resolveMetricValue(u),
        workspaces: 0,
        subscriptions: 0,
      });
    });

    metrics.workspaces.forEach((w) => {
      const k = w.key as string;
      const existing = mergeMap.get(k) || {
        key: k,
        label: w.label as string,
        users: 0,
        workspaces: 0,
        subscriptions: 0,
      };
      existing.workspaces = resolveMetricValue(w);
      mergeMap.set(k, existing);
    });

    metrics.subscriptions.forEach((s) => {
      const k = s.key as string;
      const existing = mergeMap.get(k) || {
        key: k,
        label: s.label as string,
        users: 0,
        workspaces: 0,
        subscriptions: 0,
      };
      existing.subscriptions = resolveMetricValue(s);
      mergeMap.set(k, existing);
    });

    return Array.from(mergeMap.values()).sort((a, b) => a.key.localeCompare(b.key));
  }, [metrics]);

  const hasGrowthTrend = useMemo(() => {
    return growthData.some(
      (p) => (p.users ?? 0) > 0 || (p.workspaces ?? 0) > 0 || (p.subscriptions ?? 0) > 0
    );
  }, [growthData]);

  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sa-hero",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      );

      gsap.fromTo(
        ".sa-stat-card",
        { opacity: 0, y: 28, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.15,
        }
      );

      gsap.fromTo(
        ".sa-section",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.25,
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
            <Skeleton className="h-[320px] w-full bg-white/5" />
          </div>
        </section>
      </div>
    );
  }

  if (isOverviewError) {
    return (
      <ProtectedPageErrorState
        title="Unable to load platform overview"
        description="We couldn’t fetch the platform overview right now."
        onRetry={() => {
          refetchOverview();
          refetchMetrics();
          refetchActivity();
        }}
      />
    );
  }

  if (!overview) {
    return <NoDashboardDataState />;
  }

  const hasRevenueTrend = (metrics?.revenue?.length ?? 0) > 0;

  const statCards = [
    {
      label: "Total Workspaces",
      value: overview.workspaces.total,
      icon: Briefcase,
      color: "text-[#9E77ED]",
      ring: "from-[#7F56D9]/25 to-transparent",
      subLabel: `${overview.workspaces.active} active (+${overview.workspaces.newThisMonth} this month)`,
    },
    {
      label: "Active Users",
      value: overview.users.active,
      icon: Users,
      color: "text-[#12B76A]",
      ring: "from-[#12B76A]/20 to-transparent",
      subLabel: `out of ${overview.users.total} total (+${overview.users.newThisMonth} this month)`,
    },
    {
      label: "Active Subscriptions",
      value: overview.subscriptions.paid,
      icon: CreditCard,
      color: "text-[#B692F6]",
      ring: "from-[#B692F6]/20 to-transparent",
      subLabel: `Est. Revenue: $${(overview.invoices.subscriptionRevenueEstimate ?? 0).toLocaleString()}`,
    },
    {
      label: "Manual Invoices",
      value: overview.invoices.paid,
      icon: Receipt,
      color: "text-[#F79009]",
      ring: "from-[#F79009]/20 to-transparent",
      subLabel: `Paid Revenue: $${(overview.invoices.manualInvoiceRevenue ?? 0).toLocaleString()}`,
    },
  ];

  return (
    <div ref={rootRef} className="relative space-y-6 overflow-hidden text-white">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-0 h-72 w-72 rounded-full bg-[#7F56D9]/20 blur-3xl" />
        <div className="absolute right-[-10%] top-20 h-72 w-72 rounded-full bg-[#6941C6]/20 blur-3xl" />
      </div>

      <section className="sa-hero relative overflow-hidden rounded-[28px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl sm:p-7">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(127,86,217,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(105,65,198,0.14),transparent_35%)]" />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-[#C7D7FE]">
              <Sparkles className="h-3.5 w-3.5 text-[#7F56D9]" />
              Platform intelligence
            </div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Super Admin Control Center
            </h1>
            <h1 style={{ display: 'none' }}>Broadway Dashboard</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#94A3B8] sm:text-base">
              Monitor workspace growth, user adoption, subscription movement, and platform-wide
              activity from a unified operational dashboard.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-[#101828]/70 px-4 py-3">
              <p className="text-xs text-[#667085]">Total Revenue</p>
              <p className="mt-1 text-lg font-semibold">
                ${(overview.invoices.totalPlatformRevenue ?? 0).toLocaleString()}
              </p>
              <p className="mt-0.5 text-[10px] text-[#94A3B8]/80 uppercase tracking-wider">Estimated Total</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#101828]/70 px-4 py-3">
              <p className="text-xs text-[#667085]">Workspace Health</p>
              <p className="mt-1 text-lg font-semibold text-[#12B76A]">
                {overview.workspaces.active} Active
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#101828]/70 px-4 py-3">
              <p className="text-xs text-[#667085]">Invoices Paid</p>
              <p className="mt-1 text-lg font-semibold">{overview.invoices.paid}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="sa-stat-card group relative overflow-hidden rounded-[24px] border border-white/10 bg-[#1D2939]/70 p-5 shadow-[0_8px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-[#243244]/80"
            >
              <div
                className={`absolute inset-x-0 top-0 h-28 bg-linear-to-b ${stat.ring} opacity-90`}
              />
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-[#94A3B8]">{stat.label}</p>
                  <h3 className="mt-4 text-3xl font-bold tracking-tight text-white">
                    {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
                  </h3>
                  <p className="mt-2 text-sm text-[#94A3B8]">{stat.subLabel}</p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>

              <div className="relative mt-5 flex items-center gap-2 text-xs font-medium text-[#C7D7FE] opacity-80 transition-opacity group-hover:opacity-100">
                <span>Operational insight</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </div>
          );
        })}
      </section>

      <section className="sa-section space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Platform Trends</h2>
            <p className="text-sm text-[#94A3B8]">
              Estimated revenue and growth metrics over the selected period.
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
                title="Unable to load growth trend"
                description="We couldn’t fetch workspace/user trend data right now."
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

              {hasGrowthTrend ? (
                <GrowthTrendChart 
                  data={growthData} 
                  periodLabel={metricPeriods.find((p) => p.value === metricPeriod)?.label || ""} 
                />
              ) : (
                <NoTrendDataState title="Growth trend not available" />
              )}
            </>
          )}
        </div>
      </section>

      <section className="sa-section">
        {isActivityError ? (
          <ProtectedPageErrorState
            title="Unable to load platform activity"
            description="We couldn't fetch activity right now."
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
          <RecentActivityList activities={activityResponse?.data ?? []} />
        )}
      </section>
    </div>
  );
};

export default SuperAdminDashboardPage;
