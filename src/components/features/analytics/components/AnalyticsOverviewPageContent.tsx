"use client";

import gsap from "gsap";
import {
  ArrowRight,
  BadgeDollarSign,
  BarChart3,
  BriefcaseBusiness,
  CircleDollarSign,
  Layers3,
  ListChecks,
  Lock,
  Wallet2,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";

import { useProjectsAnalytics } from "@/components/features/analytics/hooks/useProjectsAnalytics";
import { useRevenueAnalytics } from "@/components/features/analytics/hooks/useRevenueAnalytics";
import FeatureRestrictedState from "@/components/shared/error-state/FeatureRestrictedState";
import ProtectedPageErrorState from "@/components/shared/error-state/ProtectedPageErrorState";
import { Button } from "@/components/ui/button";

const formatMoney = (value: string | number, currency = "USD") => {
  const numericValue = Number(value);

  if (Number.isNaN(numericValue)) {
    return `${currency} ${value}`;
  }

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(numericValue);
  } catch {
    return `${currency} ${numericValue.toFixed(2)}`;
  }
};

const formatRangeDate = (value: string | null) => {
  if (!value) return "Not set";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
};

const AnalyticsOverviewPageContent = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const {
    data: projectsResponse,
    isLoading: isProjectsLoading,
    isError: isProjectsError,
    refetch: refetchProjects,
  } = useProjectsAnalytics({
    params: { limit: 5 },
  });

  const {
    data: revenueResponse,
    isLoading: isRevenueLoading,
    error: revenueError,
    isError: isRevenueError,
    refetch: refetchRevenue,
  } = useRevenueAnalytics();

  const projects = projectsResponse?.data;
  const revenue = revenueResponse?.data;

  const isLoading = isProjectsLoading || isRevenueLoading;
  const isRevenueRestricted = (revenueError as Error & { status?: number })?.status === 403;

  const topCurrency = useMemo(() => {
    const first = revenue?.totalsByCurrency?.[0];
    if (!first) return null;

    return {
      currency: first.currency,
      collected: formatMoney(first.collectedAmount, first.currency),
      outstanding: formatMoney(first.outstandingAmount, first.currency),
      overdue: formatMoney(first.overdueAmount, first.currency),
    };
  }, [revenue?.totalsByCurrency]);

  const topProjectPreview = useMemo(() => {
    return projects?.topProjects?.slice(0, 3) ?? [];
  }, [projects?.topProjects]);

  const projectsCompletionRate = projects?.summary.tasks.completionRate ?? 0;
  const totalProjects = projects?.summary.projects.total ?? 0;
  const activeProjects = projects?.summary.projects.active ?? 0;
  const totalTasks = projects?.summary.tasks.total ?? 0;

  const totalInvoices = revenue?.summary.totalInvoices ?? 0;
  const paidInvoices = revenue?.summary.paidInvoices ?? 0;
  const overdueInvoices = revenue?.summary.overdueInvoices ?? 0;

  useEffect(() => {
    if (!containerRef.current || isLoading || !projects || !revenue) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-analytics-overview-hero]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );

      gsap.fromTo(
        "[data-analytics-overview-section]",
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
  }, [isLoading, projects, revenue]);

  if (isProjectsError && !projects) {
    return (
      <ProtectedPageErrorState
        title="Unable to load analytics overview"
        description="We couldn't load the core project analytics. Please try again."
        onRetry={() => {
          void refetchProjects();
          void refetchRevenue();
        }}
      />
    );
  }

  return (
    <div ref={containerRef} className="space-y-8">
      <section
        data-analytics-overview-hero
        className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#101828] px-6 py-7 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:px-8"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(127,86,217,0.24),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(105,65,198,0.16),transparent_30%)]" />

        <div className="relative z-10 flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#7F56D9]/20 bg-[#7F56D9]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#CBB5FF]">
              <BarChart3 className="h-3.5 w-3.5" />
              Analytics overview
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                One place to review project execution and revenue health
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-[#94A3B8] md:text-base">
                This overview combines your current workspace project and revenue analytics into a
                single leadership-friendly snapshot.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild className="rounded-xl bg-[#7F56D9] text-white hover:bg-[#6941C6]">
                <Link href="/analytics/projects">
                  Open Projects Analytics
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
              >
                <Link href="/analytics/revenue">
                  Open Revenue Analytics
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 xl:w-[360px]">
            <p className="text-xs uppercase tracking-[0.16em] text-[#667085]">Current ranges</p>
            <div className="mt-4 space-y-3 text-sm text-[#94A3B8]">
              <div>
                <p className="font-medium text-white">Projects</p>
                <p>
                  {isProjectsLoading ? (
                    <span className="animate-pulse opacity-50 italic">Loading range...</span>
                  ) : projects ? (
                    `${formatRangeDate(projects.range.from)} → ${formatRangeDate(projects.range.to)}`
                  ) : (
                    "Not available"
                  )}
                </p>
              </div>
              <div>
                <p className="font-medium text-white">Revenue</p>
                <p>
                  {isRevenueLoading ? (
                    <span className="animate-pulse opacity-50 italic">Loading range...</span>
                  ) : isRevenueRestricted ? (
                    <span className="text-[#CBB5FF]/60 italic font-normal">Restricted by plan</span>
                  ) : revenue ? (
                    `${formatRangeDate(revenue.range.from)} → ${formatRangeDate(revenue.range.to)}`
                  ) : (
                    "Not available"
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section data-analytics-overview-section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[24px] border border-white/10 bg-[#101828]/85 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          <BriefcaseBusiness className="mb-3 h-5 w-5 text-[#CBB5FF]" />
          <p className="text-xs uppercase tracking-[0.16em] text-[#667085]">Total projects</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {isProjectsLoading ? "..." : totalProjects}
          </p>
          <p className="mt-2 text-sm text-[#94A3B8]">
            {isProjectsLoading ? "Syncing summary..." : `${activeProjects} currently active`}
          </p>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-[#101828]/85 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          <ListChecks className="mb-3 h-5 w-5 text-[#CBB5FF]" />
          <p className="text-xs uppercase tracking-[0.16em] text-[#667085]">Tracked tasks</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {isProjectsLoading ? "..." : totalTasks}
          </p>
          <p className="mt-2 text-sm text-[#94A3B8]">
            {isProjectsLoading ? "Calculating rate..." : `${projectsCompletionRate.toFixed(1)}% completion rate`}
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#101828]/85 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          {isRevenueRestricted && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#101828]/60 backdrop-blur-[2px] p-4 text-center">
              <Lock className="h-4 w-4 text-[#CBB5FF] mb-1" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-white">Restricted</p>
            </div>
          )}
          <BadgeDollarSign className="mb-3 h-5 w-5 text-[#CBB5FF]" />
          <p className="text-xs uppercase tracking-[0.16em] text-[#667085]">Total invoices</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {isRevenueLoading ? "..." : totalInvoices}
          </p>
          <p className="mt-2 text-sm text-[#94A3B8]">
            {isRevenueLoading ? "Syncing invoices..." : `${paidInvoices} marked paid`}
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#101828]/85 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          {isRevenueRestricted && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#101828]/60 backdrop-blur-[2px] p-4 text-center">
              <Lock className="h-4 w-4 text-[#CBB5FF] mb-1" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-white">Restricted</p>
            </div>
          )}
          <Wallet2 className="mb-3 h-5 w-5 text-[#CBB5FF]" />
          <p className="text-xs uppercase tracking-[0.16em] text-[#667085]">Overdue invoices</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {isRevenueLoading ? "..." : overdueInvoices}
          </p>
          <p className="mt-2 text-sm text-[#94A3B8]">
            {isRevenueLoading ? "Analyzing health..." : "Based on revenue summary"}
          </p>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <section
          data-analytics-overview-section
          className="rounded-[24px] border border-white/10 bg-[#101828]/85 p-6 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#CBB5FF]">
                <Layers3 className="h-3.5 w-3.5" />
                Projects preview
              </div>
              <h2 className="mt-4 text-xl font-semibold text-white">
                Recently active project leaders
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#94A3B8]">
                Quick view of the top recently active projects returned by the analytics service.
              </p>
            </div>

            <Button
              asChild
              variant="outline"
              className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              <Link href="/analytics/projects">View all</Link>
            </Button>
          </div>

          <div className="mt-6 space-y-4">
            {topProjectPreview.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-10 text-center text-sm text-[#94A3B8]">
                No top project rows available.
              </div>
            ) : (
              topProjectPreview.map((project) => (
                <div
                  key={project.projectId}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-base font-semibold text-white">{project.name}</p>
                      <p className="mt-1 text-sm text-[#94A3B8]">{project.status}</p>
                    </div>

                    <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#CBB5FF]">
                      {project.membersCount} members
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-xl border border-white/10 bg-[#0C111D]/70 px-3 py-3">
                      <p className="text-xs uppercase tracking-[0.14em] text-[#667085]">Tasks</p>
                      <p className="mt-1 text-lg font-semibold text-white">{project.tasks.total}</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-[#0C111D]/70 px-3 py-3">
                      <p className="text-xs uppercase tracking-[0.14em] text-[#667085]">Done</p>
                      <p className="mt-1 text-lg font-semibold text-white">{project.tasks.done}</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-[#0C111D]/70 px-3 py-3">
                      <p className="text-xs uppercase tracking-[0.14em] text-[#667085]">
                        Completion
                      </p>
                      <p className="mt-1 text-lg font-semibold text-white">
                        {project.tasks.completionRate.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section
          data-analytics-overview-section
          className="rounded-[24px] border border-white/10 bg-[#101828]/85 p-6 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#CBB5FF]">
                <CircleDollarSign className="h-3.5 w-3.5" />
                Revenue preview
              </div>
              <h2 className="mt-4 text-xl font-semibold text-white">Leading currency snapshot</h2>
              <p className="mt-2 text-sm leading-6 text-[#94A3B8]">
                Quick revenue insight from the first currency bucket returned by the current
                analytics response.
              </p>
            </div>

            <Button
              asChild
              variant="outline"
              className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              <Link href="/analytics/revenue">View all</Link>
            </Button>
          </div>

          <div className="mt-6 flex-1 flex flex-col min-h-[220px]">
            {isRevenueLoading ? (
              <div className="flex-1 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-8 text-center animate-pulse">
                <CircleDollarSign className="h-8 w-8 text-[#94A3B8] mb-3 opacity-20" />
                <p className="text-sm text-[#667085]">Loading revenue data...</p>
              </div>
            ) : isRevenueRestricted ? (
              <FeatureRestrictedState 
                variant="section-compact"
                title="Revenue Privacy"
                description="Revenue analytics are not available on your current plan. Upgrade to view financial health."
                icon={CircleDollarSign}
                className="flex-1"
              />
            ) : isRevenueError ? (
              <div className="flex-1 flex flex-col items-center justify-center rounded-2xl border border-red-500/10 bg-red-500/5 p-8 text-center">
                <p className="text-sm text-red-400 font-medium">Failed to load revenue</p>
                <Button 
                  variant="ghost" 
                  size="xs" 
                  onClick={() => void refetchRevenue()}
                  className="mt-2 text-red-300 hover:text-red-200"
                >
                  Try again
                </Button>
              </div>
            ) : !topCurrency ? (
              <div className="flex-1 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-10 text-center text-sm text-[#94A3B8]">
                No currency totals available.
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-[#667085]">Currency</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{topCurrency.currency}</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-white/10 bg-[#0C111D]/70 px-4 py-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-[#667085]">Collected</p>
                    <p className="mt-2 text-lg font-semibold text-white">{topCurrency.collected}</p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-[#0C111D]/70 px-4 py-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-[#667085]">
                      Outstanding
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {topCurrency.outstanding}
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-[#0C111D]/70 px-4 py-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-[#667085]">Overdue</p>
                    <p className="mt-2 text-lg font-semibold text-white">{topCurrency.overdue}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AnalyticsOverviewPageContent;
