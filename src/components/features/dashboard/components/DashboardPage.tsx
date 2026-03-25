"use client";

import ProjectStatusChart from '@/components/charts/ProjectStatusChart';
import TaskStatusChart from '@/components/charts/TaskStatusChart';
import RecentActivityList from "@/components/features/dashboard/activity/RecentActivityList";
import { useDashboardActivity } from "@/components/features/dashboard/hooks/useDashboardActivity";
import { useDashboardOverview } from "@/components/features/dashboard/hooks/useDashboardOverview";
import OverviewStats from "@/components/features/dashboard/overview/OverviewStats";
import SubscriptionCard from "@/components/features/dashboard/overview/SubscriptionCard";
import NoDashboardDataState from "@/components/shared/error-state/NoDashboardDataState";
import ProtectedPageErrorState from "@/components/shared/error-state/ProtectedPageErrorState";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardPage = () => {
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

  if (isOverviewLoading) {
    return (
      <div className="space-y-6">
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="rounded-2xl border border-white/10 bg-[#1D2939]/80 p-5">
              <Skeleton className="mb-4 h-4 w-24 bg-white/10" />
              <Skeleton className="mb-3 h-8 w-20 bg-white/10" />
              <Skeleton className="h-4 w-28 bg-white/5" />
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-[#1D2939]/80 p-5">
            <Skeleton className="mb-4 h-5 w-40 bg-white/10" />
            <Skeleton className="h-[320px] w-full bg-white/5" />
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#1D2939]/80 p-5">
            <Skeleton className="mb-4 h-5 w-40 bg-white/10" />
            <Skeleton className="h-[320px] w-full bg-white/5" />
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2 rounded-2xl border border-white/10 bg-[#1D2939]/80 p-5">
            <Skeleton className="mb-4 h-5 w-40 bg-white/10" />
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-20 w-full rounded-2xl bg-white/5" />
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#1D2939]/80 p-5">
            <Skeleton className="mb-4 h-5 w-32 bg-white/10" />
            <Skeleton className="h-[320px] w-full bg-white/5" />
          </div>
        </section>
      </div>
    );
  }

  if (isOverviewError) {
    return (
      <ProtectedPageErrorState
        title="Unable to load dashboard"
        description="We couldn’t fetch your dashboard overview right now."
        onRetry={() => {
          refetchOverview();
          refetchActivity();
        }}
      />
    );
  }

  if (!overview) {
    return <NoDashboardDataState />;
  }

  const activities = activityResponse?.data ?? [];

  return (
    <div className="space-y-6">
      <OverviewStats overview={overview} />

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <TaskStatusChart overview={overview} />
        <ProjectStatusChart overview={overview} />
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
