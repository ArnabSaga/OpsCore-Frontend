"use client";

import gsap from "gsap";
import { useEffect, useMemo, useRef } from "react";

import ActivityLogCard from "@/components/features/activity-log/components/ActivityLogCard";
import ActivityLogEmptyState from "@/components/features/activity-log/components/ActivityLogEmptyState";
import ActivityLogListSkeleton from "@/components/features/activity-log/components/ActivityLogListSkeleton";
import ActivityLogPageHero from "@/components/features/activity-log/components/ActivityLogPageHero";
import ActivityLogTable from "@/components/features/activity-log/components/ActivityLogTable";
import ActivityLogToolbar from "@/components/features/activity-log/components/ActivityLogToolbar";
import { useActivityLogFilters } from "@/components/features/activity-log/hooks/useActivityLogFilters";
import { useActivityLogs } from "@/components/features/activity-log/hooks/useActivityLogs";
import { Button } from "@/components/ui/button";

const ActivityLogListPageContent = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const {
    page,
    limit,
    action,
    entityType,
    userId,
    from,
    to,
    params,
    setPage,
    setLimit,
    setAction,
    setEntityType,
    setUserId,
    setFrom,
    setTo,
    resetFilters,
  } = useActivityLogFilters();

  const { data, isLoading, isError, isFetching } = useActivityLogs({ params });

  const logs = useMemo(() => data?.data ?? [], [data]);
  const meta = data?.meta;

  const uniqueActors = useMemo(() => {
    return new Set(logs.map((log) => log.userId)).size;
  }, [logs]);

  useEffect(() => {
    if (!containerRef.current || isLoading) return;

    const ctx = gsap.context((self) => {
      // 1. Stable shell elements (hero and toolbar) - these always animate
      gsap.fromTo(
        "[data-activity-log-hero]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );

      gsap.fromTo(
        "[data-activity-log-toolbar]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.45, delay: 0.05, ease: "power3.out" }
      );

      // 2. Conditional card stagger (only runs if cards are present in current view)
      const cardNodes = self.selector?.("[data-activity-log-card]");
      if (cardNodes && cardNodes.length > 0) {
        gsap.fromTo(
          cardNodes,
          { opacity: 0, y: 22, scale: 0.985 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.42,
            stagger: 0.05,
            delay: 0.08,
            ease: "power3.out",
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading, page, logs.length]);

  return (
    <div ref={containerRef} className="space-y-8">
      <ActivityLogPageHero
        totalLogs={meta?.total ?? logs.length}
        uniqueActors={uniqueActors}
        filteredLogs={logs.length}
      />

      <div data-activity-log-toolbar>
        <ActivityLogToolbar
          action={action}
          entityType={entityType}
          userId={userId}
          from={from}
          to={to}
          limit={limit}
          onActionChange={setAction}
          onEntityTypeChange={setEntityType}
          onUserIdChange={setUserId}
          onFromChange={setFrom}
          onToChange={setTo}
          onLimitChange={setLimit}
          onClearFilters={resetFilters}
        />
      </div>

      {isLoading ? (
        <ActivityLogListSkeleton />
      ) : isError ? (
        <div className="flex flex-col items-center justify-center p-20 text-center rounded-[32px] border border-red-500/10 bg-[#140C1D]/60 backdrop-blur-xl">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
            <div className="w-8 h-8 text-red-400">⚠️</div>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Something went wrong</h3>
          <p className="text-[#94A3B8] max-w-md">Failed to load activity logs. Please reload the page or contact support.</p>
        </div>
      ) : logs.length > 0 ? (
        <>
          <div className="hidden xl:block">
            <ActivityLogTable logs={logs} />
          </div>

          <div className="grid gap-4 xl:hidden">
            {logs.map((log) => (
              <ActivityLogCard key={log.id} log={log} />
            ))}
          </div>

          <div className="flex flex-col gap-4 rounded-[24px] border border-white/10 bg-[#101828]/80 p-5 text-white shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-[#94A3B8]">
              Showing page <span className="font-semibold text-white">{meta?.page ?? page}</span> of{" "}
              <span className="font-semibold text-white">{meta?.totalPages ?? 1}</span>
              {typeof meta?.total === "number" ? (
                <>
                  {" "}
                  • <span className="font-semibold text-white">{meta.total}</span> logs total
                </>
              ) : null}
              {isFetching ? <span className="ml-2 text-[#CBB5FF]">Refreshing…</span> : null}
            </div>

            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                disabled={(meta?.page ?? page) <= 1}
                onClick={() => setPage(Math.max(page - 1, 1))}
                className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
              >
                Previous
              </Button>

              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white">
                {meta?.page ?? page} / {meta?.totalPages ?? 1}
              </div>

              <Button
                type="button"
                variant="outline"
                disabled={(meta?.page ?? page) >= (meta?.totalPages ?? 1)}
                onClick={() => setPage(page + 1)}
                className="rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
              >
                Next
              </Button>
            </div>
          </div>
        </>
      ) : (
        <ActivityLogEmptyState />
      )}
    </div>
  );
};

export default ActivityLogListPageContent;
