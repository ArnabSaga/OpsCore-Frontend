"use client";

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
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const metricPeriods: { label: string; value: PlatformMetricsPeriod }[] = [
  { label: "7D", value: "last_7_days" },
  { label: "30D", value: "last_30_days" },
  { label: "3M", value: "last_3_months" },
  { label: "12M", value: "last_12_months" },
];

const SuperAdminDashboardPage = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const [metricPeriod, setMetricPeriod] = useState<PlatformMetricsPeriod>("last_30_days");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

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
        date: string;
        label: string;
        users?: number;
        workspaces?: number;
        subscriptions?: number;
      }
    >();

    metrics.users.forEach((u) => {
      mergeMap.set(u.date, {
        date: u.date,
        label: u.label,
        users: u.created as number,
        workspaces: 0,
        subscriptions: 0,
      });
    });

    metrics.workspaces.forEach((w) => {
      const existing = mergeMap.get(w.date) || {
        date: w.date,
        label: w.label,
        users: 0,
        workspaces: 0,
        subscriptions: 0,
      };
      existing.workspaces = w.created as number;
      mergeMap.set(w.date, existing);
    });

    metrics.subscriptions.forEach((s) => {
      const existing = mergeMap.get(s.date) || {
        date: s.date,
        label: s.label,
        users: 0,
        workspaces: 0,
        subscriptions: 0,
      };
      existing.subscriptions = s.paid as number;
      mergeMap.set(s.date, existing);
    });

    return Array.from(mergeMap.values()).sort((a, b) => a.date.localeCompare(b.date));
  }, [metrics]);

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

  useEffect(() => {
    if (!growthData.length || !chartRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chartRef.current,
        { opacity: 0, scale: 0.985, y: 18 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );

      gsap.fromTo(
        ".recharts-bar-rectangle",
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.04,
          ease: "power3.out",
          delay: 0.12,
        }
      );
    }, chartRef);

    return () => ctx.revert();
  }, [growthData]);

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
  const hasGrowthTrend =
    (metrics?.workspaces?.length ?? 0) > 0 ||
    (metrics?.users?.length ?? 0) > 0 ||
    (metrics?.subscriptions?.length ?? 0) > 0;

  const statCards = [
    {
      label: "Total Workspaces",
      value: overview.workspaces?.total ?? 0,
      icon: Briefcase,
      color: "text-[#9E77ED]",
      ring: "from-[#7F56D9]/25 to-transparent",
      subLabel: `${overview.workspaces?.active ?? 0} active`,
    },
    {
      label: "Active Users",
      value: overview.users?.active ?? 0,
      icon: Users,
      color: "text-[#12B76A]",
      ring: "from-[#12B76A]/20 to-transparent",
      subLabel: `out of ${overview.users?.total ?? 0} total`,
    },
    {
      label: "Active Subscriptions",
      value: overview.subscriptions?.active ?? 0,
      icon: CreditCard,
      color: "text-[#B692F6]",
      ring: "from-[#B692F6]/20 to-transparent",
      subLabel: `MRR: $${(overview.subscriptions?.revenue ?? 0).toLocaleString()}`,
    },
    {
      label: "Total Invoices",
      value: overview.invoices?.total ?? 0,
      icon: Receipt,
      color: "text-[#F79009]",
      ring: "from-[#F79009]/20 to-transparent",
      subLabel: `${overview.invoices?.paid ?? 0} paid`,
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
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#94A3B8] sm:text-base">
              Monitor workspace growth, user adoption, subscription movement, and platform-wide
              activity from a unified operational dashboard.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-[#101828]/70 px-4 py-3">
              <p className="text-xs text-[#667085]">Total Revenue</p>
              <p className="mt-1 text-lg font-semibold">
                ${(overview.subscriptions?.revenue ?? 0).toLocaleString()}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#101828]/70 px-4 py-3">
              <p className="text-xs text-[#667085]">Workspace Health</p>
              <p className="mt-1 text-lg font-semibold text-[#12B76A]">
                {overview.workspaces?.active ?? 0} Active
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#101828]/70 px-4 py-3">
              <p className="text-xs text-[#667085]">Invoices Paid</p>
              <p className="mt-1 text-lg font-semibold">{overview.invoices?.paid ?? 0}</p>
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
              Revenue and growth metrics over the selected period.
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
                <div
                  ref={chartRef}
                  className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(127,86,217,0.12),transparent_30%),linear-gradient(180deg,rgba(17,24,39,0.96)_0%,rgba(12,17,29,0.98)_100%)] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl"
                >
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-1/2 top-[55%] h-28 w-28 -translate-x-1/2 rounded-full bg-[#FF4DDF]/20 blur-3xl" />
                    <div className="absolute left-1/2 top-[58%] h-16 w-40 -translate-x-1/2 rounded-full bg-[#7F56D9]/20 blur-2xl" />
                    <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-[#7F56D9]/12 to-transparent" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-size-[32px_32px] opacity-20" />
                  </div>

                  <div className="relative mb-6 flex items-start justify-between gap-4">
                    <div>
                      <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#C7D7FE]">
                        <span className="h-2 w-2 rounded-full bg-[#FF4DDF] shadow-[0_0_12px_#FF4DDF]" />
                        Analytics
                      </div>
                      <h3 className="text-lg font-semibold tracking-tight text-white">
                        Growth Trends
                      </h3>
                      <p className="mt-1 text-sm text-[#94A3B8]">
                        New users, workspaces, and paid subscriptions
                      </p>
                    </div>

                    <div className="hidden rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-right backdrop-blur md:block">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-[#667085]">
                        Live View
                      </p>
                      <p className="mt-1 text-sm font-semibold text-white">
                        {metricPeriods.find((p) => p.value === metricPeriod)?.label}
                      </p>
                    </div>
                  </div>

                  <div className="relative h-[340px] w-full">
                    <div className="pointer-events-none absolute inset-x-8 bottom-10 h-10 rounded-full bg-[#FF4DDF]/25 blur-2xl" />
                    <div className="pointer-events-none absolute inset-x-12 bottom-9 h-[2px] bg-linear-to-r from-transparent via-[#FF4DDF]/80 to-transparent opacity-70" />

                    {mounted && (
                      <ResponsiveContainer
                        width="100%"
                        height="100%"
                        minWidth={0}
                        minHeight={0}
                        debounce={100}
                      >
                        <BarChart
                        data={growthData}
                        margin={{ top: 16, right: 8, left: -20, bottom: 8 }}
                        barGap={14}
                        barCategoryGap="18%"
                      >
                        <defs>
                          <linearGradient id="usersNeonBar" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#C084FC" stopOpacity={0.95} />
                            <stop offset="55%" stopColor="#8B5CF6" stopOpacity={0.88} />
                            <stop offset="100%" stopColor="#2A133D" stopOpacity={0.35} />
                          </linearGradient>

                          <linearGradient id="workspaceNeonBar" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#F472B6" stopOpacity={1} />
                            <stop offset="55%" stopColor="#D946EF" stopOpacity={0.92} />
                            <stop offset="100%" stopColor="#3B0D2E" stopOpacity={0.35} />
                          </linearGradient>

                          <linearGradient id="subscriptionNeonBar" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#E9D5FF" stopOpacity={0.95} />
                            <stop offset="55%" stopColor="#A855F7" stopOpacity={0.85} />
                            <stop offset="100%" stopColor="#24103A" stopOpacity={0.3} />
                          </linearGradient>

                          <filter id="pinkGlow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="4" result="blur" />
                            <feMerge>
                              <feMergeNode in="blur" />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                        </defs>

                        <CartesianGrid
                          vertical={false}
                          stroke="rgba(255,255,255,0.05)"
                          strokeDasharray="4 6"
                        />

                        <XAxis
                          dataKey="label"
                          stroke="#667085"
                          fontSize={11}
                          tickLine={false}
                          axisLine={false}
                          dy={10}
                        />

                        <YAxis
                          stroke="#667085"
                          fontSize={11}
                          tickLine={false}
                          axisLine={false}
                          allowDecimals={false}
                        />

                        <Tooltip
                          cursor={{ fill: "rgba(255,255,255,0.04)" }}
                          contentStyle={{
                            background: "rgba(12, 17, 29, 0.88)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: "18px",
                            boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
                            backdropFilter: "blur(16px)",
                            color: "#FFFFFF",
                          }}
                          labelStyle={{ color: "#E2E8F0", marginBottom: "6px" }}
                          itemStyle={{ color: "#C7D7FE" }}
                        />

                        <Legend
                          wrapperStyle={{ paddingTop: "18px" }}
                          iconType="circle"
                          formatter={(value) => (
                            <span className="text-xs font-medium text-[#94A3B8]">{value}</span>
                          )}
                        />

                        <Bar
                          dataKey="users"
                          name="Users"
                          fill="url(#usersNeonBar)"
                          radius={[10, 10, 4, 4]}
                          maxBarSize={28}
                          filter="url(#pinkGlow)"
                        />
                        <Bar
                          dataKey="workspaces"
                          name="Workspaces"
                          fill="url(#workspaceNeonBar)"
                          radius={[10, 10, 4, 4]}
                          maxBarSize={28}
                          filter="url(#pinkGlow)"
                        />
                        <Bar
                          dataKey="subscriptions"
                          name="Subscriptions"
                          fill="url(#subscriptionNeonBar)"
                          radius={[10, 10, 4, 4]}
                          maxBarSize={28}
                          filter="url(#pinkGlow)"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                    )}
                  </div>
                </div>
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
